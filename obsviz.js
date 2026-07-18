// ============================================================
// APEX — OBSIDIAN mechanism diagrams (Markets Module)
// ============================================================
// window.OBSIDIAN_VIZ maps topic id → an inline animated SVG string,
// rendered in the lesson view under "MECHANISM DIAGRAM". Diagrams are
// self-contained SMIL-animated SVG (no external assets, works offline).
//
// Visual language (fixed semantic roles — never decorative):
//   #ffb020 gold  = money / the flow being traced
//   #00e5a0 green = receiver / benefit / up
//   #ff4455 red   = payer / cost / down
//   #e8e8e8 strokes = structure · #a9a9a9/#737373 = labels
// Every colored element carries a text label; color never stands alone.
// All SVG ids are prefixed per-topic (v<topicid>_) to avoid collisions.
window.OBSIDIAN_VIZ = {};
