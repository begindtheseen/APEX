#!/bin/sh
# Runs once, as the postgres superuser, on first init of an empty data volume.
# Creates the Supabase-style roles + auth scaffolding + the APEX data table.
# Role passwords are pinned to POSTGRES_PASSWORD so PostgREST/GoTrue can log in.
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-SQL
  -- ── Roles (Supabase model) ──────────────────────────────────────────
  -- anon/authenticated: the two API personas PostgREST switches into.
  -- authenticator: the login role PostgREST connects as, then SET ROLEs.
  -- service_role: bypasses RLS for admin/server work.
  CREATE ROLE anon NOLOGIN NOINHERIT;
  CREATE ROLE authenticated NOLOGIN NOINHERIT;
  CREATE ROLE service_role NOLOGIN NOINHERIT BYPASSRLS;
  CREATE ROLE authenticator NOINHERIT LOGIN PASSWORD '${POSTGRES_PASSWORD}';
  GRANT anon, authenticated, service_role TO authenticator;

  -- GoTrue's own admin role; it owns + migrates the auth schema.
  CREATE ROLE supabase_auth_admin NOINHERIT LOGIN CREATEROLE PASSWORD '${POSTGRES_PASSWORD}';
  CREATE SCHEMA IF NOT EXISTS auth AUTHORIZATION supabase_auth_admin;
  GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
  GRANT USAGE ON SCHEMA auth TO anon, authenticated, service_role;

  -- ── auth.uid(): the current user's id, pulled from the verified JWT ──
  CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE AS \$\$
      SELECT NULLIF(current_setting('request.jwt.claims', true)::json ->> 'sub', '')::uuid;
  \$\$;
  GRANT EXECUTE ON FUNCTION auth.uid() TO anon, authenticated, service_role;

  -- ── APEX state: one JSON document per user (mirrors localStorage) ────
  CREATE TABLE public.apex_state (
    user_id    uuid PRIMARY KEY DEFAULT auth.uid(),
    data       jsonb NOT NULL DEFAULT '{}'::jsonb,
    updated_at timestamptz NOT NULL DEFAULT now()
  );

  ALTER TABLE public.apex_state ENABLE ROW LEVEL SECURITY;

  -- A signed-in user can only ever see/touch their own row.
  CREATE POLICY apex_state_select ON public.apex_state
    FOR SELECT TO authenticated USING (user_id = auth.uid());
  CREATE POLICY apex_state_write ON public.apex_state
    FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

  -- ── Grants so PostgREST can expose the table ────────────────────────
  GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
  GRANT SELECT, INSERT, UPDATE, DELETE ON public.apex_state TO authenticated, service_role;
SQL

echo "APEX: database roles + schema initialised."
