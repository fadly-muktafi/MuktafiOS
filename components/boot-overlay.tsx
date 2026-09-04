"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { bootSequence, hero } from "@/lib/content";

// Timing budget: total stays under the 2.5s PRD limit.
const BEAT_MS = 500; // delay between status beats
const EXIT_AT_MS = 2500; // when the mask reveal starts
const EXIT_MS = 2500; // reveal duration, then unmount
const REDUCED_TOTAL_MS = 500; // static flash for reduced-motion users

/**
 * BootOverlay (PRD §11.1, UX-Blueprint §6.1).
 * OS-style intro rendered from the first paint (no flash of
 * page content behind it), shows on every load. Skippable via
 * click/key/Skip button, exits with a vertical mask reveal.
 * Reduced-motion users get a near-instant static flash.
 * Scroll lock is tied to overlay lifetime and always restored.
 */
export function BootOverlay() {
  const [mounted, setMounted] = useState(true);
  const [step, setStep] = useState(-1);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
  }, []);

  const finish = useCallback(() => {
    setLeaving(true);
    // Unlock the Phase 2K entrance gates as the mask lifts.
    document.documentElement.classList.add("boot-done");
    const id = window.setTimeout(() => setMounted(false), EXIT_MS);
    timers.current.push(id);
  }, []);

  // Boot timeline: beats -> exit (or a short static flash if reduced motion)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      timers.current.push(window.setTimeout(finish, REDUCED_TOTAL_MS));
    } else {
      bootSequence.forEach((_, i) => {
        timers.current.push(
          window.setTimeout(() => setStep(i), BEAT_MS * (i + 1))
        );
      });
      timers.current.push(window.setTimeout(finish, EXIT_AT_MS));
    }

    return () => clearTimers();
  }, [clearTimers, finish]);

  // Scroll lock lives and dies with the overlay's presence.
  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  // Skip via any key press while visible.
  useEffect(() => {
    if (!mounted || leaving) return;
    function onKeyDown() {
      clearTimers();
      finish();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, leaving, clearTimers, finish]);

  if (!mounted) return null;

  return (
    <div
      id="boot-overlay"
      role="dialog"
      aria-label="MuktafiOS loading screen"
      onClick={() => {
        if (!leaving) {
          clearTimers();
          finish();
        }
      }}
      className={`fixed inset-0 z-[90] flex items-center justify-center bg-bg transition-transform duration-[550ms] ease-snap will-change-transform ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Court lines drawing in */}
      <svg
        viewBox="0 0 640 360"
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 mx-auto w-[min(88vw,640px)] -translate-y-1/2 opacity-60"
      >
        <g
          stroke="var(--color-line)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        >
          <line x1="24" y1="180" x2="616" y2="180" className="boot-line" />
          <circle cx="320" cy="180" r="56" className="boot-circle" />
          <line
            x1="320"
            y1="60"
            x2="320"
            y2="300"
            className="boot-line"
            style={{ animationDelay: "150ms" }}
          />
        </g>
      </svg>

      {/* Brand + status beats */}
      <div className="relative flex flex-col items-center text-center">
        <p className="text-3xl font-bold tracking-tight text-frost md:text-4xl">
          {hero.brand}
        </p>
        <p className="mt-2 font-mono text-xs tracking-[0.18em] text-dim">
          {hero.headline.toUpperCase()}
        </p>

        <div className="mt-10 flex h-24 flex-col items-center gap-1.5 font-mono text-xs">
          {bootSequence.map((line, i) =>
            step >= i ? (
              <p
                key={line}
                className={`animate-[content-in_220ms_var(--ease-snap)] ${
                  step === i ? "text-accent" : "text-dim"
                }`}
              >
                {line}
              </p>
            ) : null
          )}
        </div>

        <button
          type="button"
          aria-hidden={leaving}
          tabIndex={leaving ? -1 : 0}
          onClick={(e) => {
            e.stopPropagation();
            clearTimers();
            finish();
          }}
          className="pointer-events-auto mt-6 min-h-11 rounded-full border border-line px-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-line-strong hover:text-frost"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
