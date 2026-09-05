/**
 * Shared tactical court geometry (Visual-System §9.4).
 * Vertical half-court playbook sheet (basket at top), 640x480.
 *
 * - OFFENSE (Hero / TacticalCourt): 5-out spread from the user's
 *   reference — PG (1) with the ball at the top of the arc,
 *   3/2 at the slots, 4/5 on the wings; passing lanes + down-screen
 *   and roll arrows as schematic decoration.
 * - DEFENSE (Playbook / FormationMap): 2-3 zone from the user's
 *   reference — two guards up top (5/4), two wings midcourt (2/3),
 *   anchor (1) holding the paint.
 */

export const COURT_W = 640;
export const COURT_H = 480;

// ---------------------------------------------------------------------------
// OFFENSE — 5-out (hero)
// ---------------------------------------------------------------------------

export type CourtNode = {
  id: string;
  label: string;
  /** jersey number shown inside the circle (reference diagrams) */
  num: string;
  x: number;
  y: number;
};

export const OFFENSE_NODES: readonly CourtNode[] = [
  { id: "ui", label: "UI", num: "1", x: 320, y: 332 },
  { id: "team", label: "Team", num: "3", x: 170, y: 128 },
  { id: "api", label: "API", num: "2", x: 470, y: 128 },
  { id: "db", label: "DB", num: "4", x: 118, y: 262 },
  { id: "deploy", label: "Deploy", num: "5", x: 522, y: 262 },
] as const;

export const OFFENSE_NODE_BY_ID = new Map(OFFENSE_NODES.map((n) => [n.id, n]));

/** Pass lanes out of the PG — dashed, like the reference board. */
export const PASS_LANES: ReadonlyArray<[string, string]> = [
  ["ui", "team"],
  ["ui", "api"],
  ["ui", "db"],
  ["ui", "deploy"],
];

/** "Roll" hints from the slots toward the free-throw area. */
export const ROLL_ARROWS = [
  { d: "M 178 140 Q 236 156 272 196", id: "roll-left" },
  { d: "M 462 140 Q 404 156 368 196", id: "roll-right" },
] as const;

/** "Down screen" hints from the wings toward the corners. */
export const SCREEN_ARROWS = [
  { d: "M 118 278 Q 110 330 84 372", id: "screen-left" },
  { d: "M 522 278 Q 530 330 556 372", id: "screen-right" },
] as const;

export const BALL_POS = { x: 350, y: 344 } as const;

// ---------------------------------------------------------------------------
// DEFENSE — 2-3 zone (playbook formation map)
// ---------------------------------------------------------------------------

export type ZoneSlot = { key: string; num: string; x: number; y: number };

/**
 * Rotation cycle of zone slots. The active mode always holds the
 * anchor (index 0); every other mode sits at a cyclic offset from it,
 * so switching modes rotates everyone the same direction around the
 * zone instead of swapping across the court.
 */
export const ZONE_CYCLE: readonly ZoneSlot[] = [
  { key: "anchor", num: "1", x: 320, y: 286 }, // paint anchor
  { key: "w-left", num: "2", x: 164, y: 258 }, // wing left
  { key: "g-left", num: "5", x: 236, y: 152 }, // guard left
  { key: "g-right", num: "4", x: 404, y: 152 }, // guard right
  { key: "w-right", num: "3", x: 476, y: 258 }, // wing right
] as const;

/** Zone shell edges — constant geometry drawn between actual slots. */
export const ZONE_EDGES = [
  [ZONE_CYCLE[2], ZONE_CYCLE[3]], // g-left <-> g-right (top)
  [ZONE_CYCLE[2], ZONE_CYCLE[1]], // g-left <-> w-left (left wall)
  [ZONE_CYCLE[3], ZONE_CYCLE[4]], // g-right <-> w-right (right wall)
  [ZONE_CYCLE[1], ZONE_CYCLE[0]], // w-left <-> anchor
  [ZONE_CYCLE[4], ZONE_CYCLE[0]], // w-right <-> anchor
] as const;
