"use client";

import { useEffect, useRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

/**
 * MagneticButton / MagneticActionButton (Visual-System §9.3).
 * Full pill; primary accent, secondary dark surface; icon island.
 * Magnetic pull is pointer-proximity driven via refs + a rAF loop
 * with lerp — never React state. Skipped for touch/reduced-motion.
 */

type CommonProps = {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const baseClasses =
  "relative inline-flex min-h-11 items-center gap-3 rounded-full px-5 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 ease-snap active:scale-[0.98]";

const variantClasses: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-accent text-bg hover:bg-accent/90",
  secondary:
    "border border-line bg-surface text-frost hover:border-line-strong hover:bg-raised",
};

const islandClasses: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-black/15 text-bg",
  secondary: "bg-raised text-muted group-hover:text-frost",
};

function PillContent({
  variant,
  icon,
  children,
}: { variant: NonNullable<CommonProps["variant"]> } & Pick<
  CommonProps,
  "icon" | "children"
>) {
  return (
    <>
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden="true"
          className={`grid size-7 place-items-center rounded-full transition-transform duration-200 ease-snap group-hover:translate-x-0.5 ${islandClasses[variant]}`}
        >
          {icon}
        </span>
      ) : null}
    </>
  );
}

/** Shared magnetic hover driver — refs + rAF, zero setState. */
function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const running = useRef(false);
  const enabled = useRef(false);

  const startLoop = () => {
    if (running.current) return;
    running.current = true;
    const tick = () => {
      const el = ref.current;
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.18;
      current.current.y += dy * 0.18;

      const settled =
        Math.abs(current.current.x - target.current.x) < 0.1 &&
        Math.abs(current.current.y - target.current.y) < 0.1 &&
        target.current.x === 0 &&
        target.current.y === 0;

      if (el) {
        el.style.transform = `translate(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px)`;
      }
      if (settled) {
        current.current = { x: 0, y: 0 };
        if (el) el.style.transform = "translate(0px, 0px)";
        running.current = false;
        return;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    enabled.current =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const onPointerMove = (event: React.PointerEvent) => {
    if (!enabled.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    // Soft pull — max 7px (subtle, never disorienting)
    const MAX = 7;
    const dist = Math.hypot(relX, relY) || 1;
    const strength = Math.min(1, dist / 120) * MAX * (dist > 0 ? 1 : 0);
    target.current = { x: (relX / dist) * strength, y: (relY / dist) * strength };
    startLoop();
  };

  const onPointerLeave = () => {
    target.current = { x: 0, y: 0 };
    startLoop();
  };

  return { ref, onPointerMove, onPointerLeave };
}

export type MagneticButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps | "href"> & {
    href: string;
  };

export function MagneticButton({
  variant = "primary",
  icon,
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const { ref, onPointerMove, onPointerLeave } = useMagnetic<HTMLSpanElement>();

  return (
    // Outer span receives the magnetic transform; the <a> inside keeps
    // its own active:scale press without transform conflicts.
    <span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="inline-block will-change-transform"
    >
      <a
        className={`${baseClasses} ${variantClasses[variant]} group ${className ?? ""}`}
        {...props}
      >
        <PillContent variant={variant} icon={icon}>
          {children}
        </PillContent>
      </a>
    </span>
  );
}

export type MagneticActionButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps>;

export function MagneticActionButton({
  variant = "primary",
  icon,
  children,
  className,
  type,
  ...props
}: MagneticActionButtonProps) {
  const { ref, onPointerMove, onPointerLeave } =
    useMagnetic<HTMLSpanElement>();

  return (
    <span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="inline-block will-change-transform"
    >
      <button
        type={type ?? "button"}
        className={`${baseClasses} ${variantClasses[variant]} group ${className ?? ""}`}
        {...props}
      >
        <PillContent variant={variant} icon={icon}>
          {children}
        </PillContent>
      </button>
    </span>
  );
}
