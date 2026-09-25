/* ============================================================================
   LAUNCHPAD — one icon per layer
   ----------------------------------------------------------------------------
   The realm gave every layer its own glyph (a page, a chip, a wrench, a spark,
   a branch, a network, a server, a briefcase, a badge). These are the nearest
   in ORBIT's icon set, so a layer looks the same on the dashboard, its own
   page, the sidebar and the guide.
   ========================================================================== */
import type { ReactNode } from 'react'
import {
  IconBlocks,
  IconBriefcase,
  IconBulb,
  IconDoc,
  IconLayers,
  IconRoute,
  IconSignal,
  IconStar,
  IconTerminal,
  type IconProps,
} from '@/components/icons'
import type { TrackId } from '@/curriculum/types'

export const LAYER_ICON: Record<TrackId, (p: IconProps) => ReactNode> = {
  contract: IconDoc,
  machine: IconBlocks,
  'craft-1': IconTerminal,
  'ai-core': IconBulb,
  'craft-2': IconRoute,
  'ai-layer': IconSignal,
  product: IconLayers,
  market: IconBriefcase,
  employed: IconStar,
}
