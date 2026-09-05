"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { CourtMarkings } from "@/components/court-markings";
import {
  COURT_H,
  COURT_W,
  OFFENSE_NODES,
  PASS_LANES,
  BALL_POS,
  ROLL_ARROWS,
  SCREEN_ARROWS,
  OFFENSE_NODE_BY_ID,
} from "@/lib/court-geometry";

/**
 * TacticalCourt — 5-out offense formation (Visual-System §9.4).
 * Vertical half-court view with the basket at top, PG (UI) holding
 * the ball at the top of the arc, wings and forwards spread.
 *
 * Interactions:
 * - pointer proximity pulls nodes (refs + rAF, no React state)
 * - hover / focus / tap highlights a node + its pass lane
 * - reduced motion: static map, interactions still legible
 */

const VB_W = COURT_W;
const VB_H = COURT_H;
const NODES = OFFENSE_NODES;
const EDGES = PASS_LANES;
const nodeById = OFFENSE_NODE_BY_ID;

export function TacticalCourt() {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const nodeEls = useRef<Record<string, SVGGElement | null>>({});
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const offsetsRef = useRef<Record<string, { x: number; y: number }>>({});

  // Proximity pull — fine pointers only, rAF loop writing styles directly.
  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;

    const tick = () => {
      const svg = svgRef.current;
      if (svg) {
        const rect = svg.getBoundingClientRect();
        const pointer = pointerRef.current;

        for (const node of NODES) {
          const el = nodeEls.current[node.id];
          if (!el) continue;

          const current = offsetsRef.current[node.id] ?? { x: 0, y: 0 };
          let targetX = 0;
          let targetY = 0;

          if (pointer) {
            const px = ((pointer.x - rect.left) / rect.width) * VB_W;
            const py = ((pointer.y - rect.top) / rect.height) * VB_H;
            const dx = px - node.x;
            const dy = py - node.y;
            const dist = Math.hypot(dx, dy);
            const RADIUS = 150;
            const PULL = 14;

            if (dist > 0.01 && dist < RADIUS) {
              const force = (1 - dist / RADIUS) ** 2;
              targetX = (dx / dist) * force * PULL;
              targetY = (dy / dist) * force * PULL;
            }
          }

          const nx = current.x + (targetX - current.x) * 0.16;
          const ny = current.y + (targetY - current.y) * 0.16;
          offsetsRef.current[node.id] = { x: nx, y: ny };

          if (Math.abs(nx) > 0.05 || Math.abs(ny) > 0.05 || pointer) {
            el.style.transform = `translate(${nx.toFixed(2)}px, ${ny.toFixed(2)}px)`;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      role="group"
      aria-label="Tactical 5-out offense formation: UI at point, Team and API at wings, DB and Deploy at forwards"
      className="block aspect-[4/3] w-full select-none"
      onPointerMove={(event) => {
        pointerRef.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerLeave={() => {
        pointerRef.current = null;
      }}
    >
      <CourtMarkings />

      {/* Pass lanes — dashed, light up when a teammate is active */}
      <g fill="none" className="court-edges transition-opacity duration-300" aria-hidden="true">
        {EDGES.map(([from, to]) => {
          const a = nodeById.get(from)!;
          const b = nodeById.get(to)!;
          const lit = activeId === from || activeId === to;
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={lit ? "var(--color-accent)" : "var(--color-dim)"}
              strokeWidth={lit ? 1.4 : 1}
              strokeDasharray="7 7"
              strokeLinecap="round"
              opacity={lit ? 0.9 : 0.55}
              style={{
                transition: "stroke 200ms ease, opacity 200ms ease",
              }}
            />
          );
        })}
      </g>

      {/* Roll + down-screen arrows (schematic, from the reference board) */}
      <g
        stroke="var(--color-line-strong)"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="5 5"
        aria-hidden="true"
      >
        {[...ROLL_ARROWS, ...SCREEN_ARROWS].map((a) => (
          <path key={a.id} d={a.d} markerEnd="url(#arrowhead)" opacity={0.6} />
        ))}
      </g>

      <defs>
        <marker
          id="arrowhead"
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0 0 L7 3.5 L0 7 z" fill="var(--color-line-strong)" />
        </marker>
      </defs>

      {/* The ball — accent dot with seam lines, sitting by the PG */}
      <g aria-hidden="true" className="court-node" style={{ "--gate-delay": "330ms" } as CSSProperties}>
        <circle cx={BALL_POS.x} cy={BALL_POS.y} r="9" fill="var(--color-accent)" />
        <path
          d={`M ${BALL_POS.x - 8} ${BALL_POS.y} Q ${BALL_POS.x} ${BALL_POS.y - 4} ${BALL_POS.x + 8} ${BALL_POS.y} M ${BALL_POS.x} ${BALL_POS.y - 9} Q ${BALL_POS.x + 4} ${BALL_POS.y} ${BALL_POS.x} ${BALL_POS.y + 9}`}
          stroke="#080a0c"
          strokeWidth="1.4"
          fill="none"
          opacity="0.55"
        />
      </g>

      {/* Players (nodes) — number circles with role labels */}
      {NODES.map((node, index) => {
        const isActive = activeId === node.id;
        return (
          <g
            key={node.id}
            ref={(el) => {
              nodeEls.current[node.id] = el;
            }}
            tabIndex={0}
            aria-label={`${node.label} (${["point guard","slot","slot","wing","wing"][index]})`}
            onPointerEnter={() => setActiveId(node.id)}
            onPointerLeave={() => setActiveId((cur) => (cur === node.id ? null : cur))}
            onFocus={() => setActiveId(node.id)}
            onBlur={() => setActiveId((cur) => (cur === node.id ? null : cur))}
            onClick={() =>
              setActiveId((cur) => (cur === node.id ? null : node.id))
            }
            className="court-node cursor-pointer outline-none"
            style={{ "--gate-delay": `${300 + index * 80}ms` } as CSSProperties}
          >
            {/* focus/active halo */}
            <circle
              cx={node.x}
              cy={node.y}
              r="26"
              fill={isActive ? "var(--color-accent-soft)" : "var(--color-surface)"}
              stroke={isActive ? "var(--color-accent)" : "var(--color-line-strong)"}
              strokeWidth={isActive ? 1.8 : 1.2}
              style={{ transition: "stroke 200ms ease, fill 200ms ease" }}
            />
            {/* jersey number */}
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill={isActive ? "var(--color-accent)" : "var(--color-frost)"}
              className="font-mono text-[15px] font-semibold"
              style={{ transition: "fill 200ms ease" }}
            >
              {node.num}
            </text>
            {/* role label under the circle */}
            <text
              x={node.x}
              y={node.y + 42}
              textAnchor="middle"
              fill={isActive ? "var(--color-accent)" : "var(--color-dim)"}
              className="font-mono text-[11px] uppercase"
              style={{ letterSpacing: "0.16em", transition: "fill 200ms ease" }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
