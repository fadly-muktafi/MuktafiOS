"use client";

import { useMemo } from "react";
import { CourtMarkings } from "@/components/court-markings";
import { ZONE_CYCLE, ZONE_EDGES, type ZoneSlot } from "@/lib/court-geometry";

/**
 * FormationMap — 2-3 zone defense shell (UX-Blueprint §6.3).
 * Five modes, five zone slots. The active mode always holds the
 * paint (anchor). Selecting a new mode rotates everyone around
 * the zone in the same direction — no crossing paths.
 */

type FormationMapProps = {
  modes: readonly { id: string; label: string }[];
  activeId: string;
};

/** Cyclic rotation: mode i sits at ZONE_CYCLE[(i - activeIndex) mod N]. */
function slotAssignments(
  modes: readonly { id: string }[],
  activeId: string
): Map<string, ZoneSlot> {
  const n = modes.length;
  const activeIndex = Math.max(0, modes.findIndex((m) => m.id === activeId));
  const assignments = new Map<string, ZoneSlot>();
  modes.forEach((mode, i) => {
    const slotIndex = (((i - activeIndex) % n) + n) % n;
    assignments.set(mode.id, ZONE_CYCLE[slotIndex]);
  });
  return assignments;
}

export function FormationMap({ modes, activeId }: FormationMapProps) {
  const assignments = useMemo(
    () => slotAssignments(modes, activeId),
    [modes, activeId]
  );

  return (
    <svg
      viewBox="0 0 640 480"
      aria-hidden="true"
      className="block aspect-[4/3] w-full select-none"
    >
      <CourtMarkings />

      {/* Zone shell edges — constant geometry */}
      <g
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth="1.1"
        strokeDasharray="5 6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {ZONE_EDGES.map(([a, b], i) => (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
        ))}
      </g>

      {/* Slot markers — faint rings at each coverage position */}
      <g
        stroke="var(--color-line)"
        strokeWidth="1"
        strokeDasharray="2 6"
        fill="none"
        aria-hidden="true"
      >
        {ZONE_CYCLE.map((slot) => (
          <circle key={slot.key} cx={slot.x} cy={slot.y} r={30} />
        ))}
      </g>

      {/* Mode players — rotate cyclically around the zone */}
      {modes.map((mode) => {
        const slot = assignments.get(mode.id)!;
        const isActive = mode.id === activeId;
        return (
          <g
            key={mode.id}
            className="transition-transform duration-[420ms] ease-snap"
            style={{ transform: `translate(${slot.x}px, ${slot.y}px)` }}
          >
            <circle
              r="26"
              fill={isActive ? "var(--color-accent-soft)" : "var(--color-surface)"}
              stroke={isActive ? "var(--color-accent)" : "var(--color-line-strong)"}
              strokeWidth={isActive ? 1.8 : 1.2}
              style={{ transition: "fill 300ms ease, stroke 300ms ease" }}
            />
            <text
              y="5"
              textAnchor="middle"
              fill={isActive ? "var(--color-accent)" : "var(--color-frost)"}
              className="font-mono text-[15px] font-semibold"
              style={{ transition: "fill 300ms ease" }}
            >
              {slot.num}
            </text>
            <text
              y="42"
              textAnchor="middle"
              fill={isActive ? "var(--color-accent)" : "var(--color-dim)"}
              className="font-mono text-[11px] uppercase"
              style={{ letterSpacing: "0.16em", transition: "fill 300ms ease" }}
            >
              {mode.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
