/**
 * FormationMap — 4-mode tactical formation visual (UX-Blueprint §6.3).
 *
 * Mechanic: the active mode always occupies the "point" slot;
 * the other three fill the remaining slots in order. Edge geometry
 * (point -> each other slot) is therefore constant, and only node
 * positions swap — animated via CSS transform transitions.
 *
 * Purely visual reinforcement of the mode selector: aria-hidden.
 */

type SlotKey = "point" | "left" | "right" | "anchor";

const SLOTS: Record<SlotKey, { x: number; y: number }> = {
  point: { x: 320, y: 118 },
  left: { x: 150, y: 265 },
  right: { x: 490, y: 265 },
  anchor: { x: 320, y: 395 },
};

/** Order in which non-active modes fill the remaining slots. */
const FILL_ORDER: SlotKey[] = ["left", "right", "anchor"];

function slotFor(
  modeId: string,
  modes: readonly { id: string }[],
  activeId: string
): { x: number; y: number } {
  if (modeId === activeId) return SLOTS.point;
  const others = modes.filter((m) => m.id !== activeId);
  const idx = others.findIndex((m) => m.id === modeId);
  return SLOTS[FILL_ORDER[idx] ?? "anchor"];
}

type FormationMapProps = {
  modes: readonly { id: string; label: string }[];
  activeId: string;
};

export function FormationMap({ modes, activeId }: FormationMapProps) {
  const point = SLOTS.point;

  return (
    <svg
      viewBox="0 0 640 480"
      aria-hidden="true"
      className="block aspect-[4/3] w-full select-none"
    >
      {/* Court geometry — echoes the hero court */}
      <g
        stroke="var(--color-line)"
        strokeWidth="1"
        fill="none"
      >
        <rect x="24" y="24" width="592" height="432" rx="16" />
        <line x1="24" y1="240" x2="616" y2="240" />
        <circle cx="320" cy="240" r="64" />
      </g>

      {/* Slot markers — dashed rings showing where players can sit */}
      <g
        stroke="var(--color-line)"
        strokeWidth="1"
        strokeDasharray="3 6"
        fill="none"
      >
        {Object.values(SLOTS).map((slot) => (
          <circle key={`${slot.x}-${slot.y}`} cx={slot.x} cy={slot.y} r={36} />
        ))}
      </g>

      {/* Constant edges: point -> each outer slot */}
      <g stroke="var(--color-accent-line)" strokeWidth="1.2" fill="none">
        {(["left", "right", "anchor"] as const).map((slot) => (
          <line
            key={slot}
            x1={point.x}
            y1={point.y}
            x2={SLOTS[slot].x}
            y2={SLOTS[slot].y}
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* Mode nodes — positions animate via transform transition */}
      {modes.map((mode) => {
        const pos = slotFor(mode.id, modes, activeId);
        const isActive = mode.id === activeId;
        return (
          <g
            key={mode.id}
            className="transition-transform duration-[420ms] ease-snap"
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          >
            <circle
              r="32"
              fill={isActive ? "var(--color-accent-soft)" : "var(--color-surface)"}
              stroke={
                isActive ? "var(--color-accent-line)" : "var(--color-line-strong)"
              }
              strokeWidth={isActive ? 1.5 : 1}
              style={{ transition: "fill 300ms ease, stroke 300ms ease" }}
            />
            <circle
              r="4"
              fill={isActive ? "var(--color-accent)" : "var(--color-dim)"}
              style={{ transition: "fill 300ms ease" }}
            />
            <text
              y="52"
              textAnchor="middle"
              fill={isActive ? "var(--color-accent)" : "var(--color-dim)"}
              className="font-mono text-[11px] uppercase"
              style={{ letterSpacing: "0.14em", transition: "fill 300ms ease" }}
            >
              {mode.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
