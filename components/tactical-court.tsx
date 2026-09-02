"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * TacticalCourt — abstract playbook formation map (Visual-System §9.4).
 * SVG-based (Phases 2C); a lazy-loaded 3D version enhances it in 2L.
 *
 * Interactions:
 * - fine-pointer proximity pulls nodes gently (refs + rAF, no React state)
 * - hover / focus / tap highlights a node and its connected lines
 * - reduced motion: static map, highlight interactions still work
 */

const VB_W = 640;
const VB_H = 480;

type CourtNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

const NODES: CourtNode[] = [
  { id: "ui", label: "UI", x: 320, y: 96 },
  { id: "team", label: "Team", x: 128, y: 240 },
  { id: "api", label: "API", x: 512, y: 240 },
  { id: "db", label: "DB", x: 320, y: 344 },
  { id: "deploy", label: "Deploy", x: 500, y: 420 },
];

const EDGES: Array<[string, string]> = [
  ["ui", "team"],
  ["ui", "api"],
  ["team", "db"],
  ["api", "db"],
  ["db", "deploy"],
];

const nodeById = new Map(NODES.map((node) => [node.id, node]));

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
            el.style.transform = `translate(${nx.toFixed(2)}px, ${ny.toFixed(
              2
            )}px)`;
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
      aria-label="Tactical formation map connecting UI, Team, API, DB, and Deploy"
      className="block aspect-[4/3] w-full select-none"
      onPointerMove={(event) => {
        pointerRef.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerLeave={() => {
        pointerRef.current = null;
      }}
    >
      {/* Court geometry — hairline, non decorative-clutter (Visual-System §7.3) */}
      <g
        stroke="var(--color-line)"
        strokeWidth="1"
        fill="none"
        aria-hidden="true"
      >
        <rect x="24" y="24" width="592" height="432" rx="16" />
        <line x1="24" y1="240" x2="616" y2="240" />
        <circle cx="320" cy="240" r="64" />
      </g>

      {/* Formation edges */}
      <g fill="none" aria-hidden="true">
        {EDGES.map(([from, to]) => {
          const a = nodeById.get(from)!;
          const b = nodeById.get(to)!;
          const isActive = activeId === from || activeId === to;
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={
                isActive ? "var(--color-accent-line)" : "var(--color-line-strong)"
              }
              strokeWidth={isActive ? 1.5 : 1}
              strokeDasharray={isActive ? undefined : "1 5"}
              strokeLinecap="round"
              style={{ transition: "stroke 200ms ease" }}
            />
          );
        })}
      </g>

      {/* Nodes */}
      {NODES.map((node) => {
        const isActive = activeId === node.id;
        return (
          <g
            key={node.id}
            ref={(el) => {
              nodeEls.current[node.id] = el;
            }}
            tabIndex={0}
            aria-label={`${node.label} node`}
            onPointerEnter={() => setActiveId(node.id)}
            onPointerLeave={() => setActiveId((cur) => (cur === node.id ? null : cur))}
            onFocus={() => setActiveId(node.id)}
            onBlur={() => setActiveId((cur) => (cur === node.id ? null : cur))}
            onClick={() =>
              setActiveId((cur) => (cur === node.id ? null : node.id))
            }
            className="outline-none"
          >
            {/* focus/active ring */}
            <circle
              cx={node.x}
              cy={node.y}
              r="28"
              fill={isActive ? "var(--color-accent-soft)" : "var(--color-surface)"}
              stroke={
                isActive ? "var(--color-accent-line)" : "var(--color-line-strong)"
              }
              strokeWidth={isActive ? 1.5 : 1}
              style={{ transition: "stroke 200ms ease, fill 200ms ease" }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="4"
              fill={isActive ? "var(--color-accent)" : "var(--color-dim)"}
              style={{ transition: "fill 200ms ease" }}
              aria-hidden="true"
            />
            <text
              x={node.x}
              y={node.y + 48}
              textAnchor="middle"
              fill={isActive ? "var(--color-accent)" : "var(--color-dim)"}
              className="font-mono text-[11px] uppercase"
              style={{ letterSpacing: "0.14em", transition: "fill 200ms ease" }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
