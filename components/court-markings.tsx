/**
 * CourtMarkings — shared vertical half-court lines (basket at top).
 * Used by both the hero offense court and the playbook zone map.
 * Hairline strokes only; all coordinates in the 640x480 space from
 * lib/court-geometry.ts.
 */
export function CourtMarkings() {
  return (
    <g
      stroke="var(--color-line)"
      strokeWidth="1.2"
      fill="none"
      aria-hidden="true"
    >
      {/* outer boundary */}
      <rect x="24" y="24" width="592" height="432" rx="10" />
      {/* backboard + rim (top center) */}
      <line x1="292" y1="46" x2="348" y2="46" strokeWidth="2.4" stroke="var(--color-line-strong)" />
      <circle cx="320" cy="66" r="14" />
      {/* key (paint area) */}
      <path d="M 268 64 L 268 208 M 372 64 L 372 208 M 268 208 L 372 208" />
      {/* free-throw circle */}
      <circle cx="320" cy="208" r="58" />
      {/* restricted arc under rim */}
      <path d="M 288 74 A 34 34 0 0 1 352 74" />
      {/* three-point arc: corner lines then the big arc */}
      <line x1="40" y1="196" x2="40" y2="400" />
      <line x1="600" y1="196" x2="600" y2="400" />
      <path d="M 40 400 A 285 285 0 0 0 600 400" />
      {/* half-court logo arc at the bottom edge (subtle) */}
      <circle cx="320" cy="456" r="30" />
    </g>
  );
}
