"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { bootSequence, hero } from "@/lib/content";

// Timing budget: total stays under the 2.5s PRD limit.
const BEAT_MS = 550; // delay between status beats
const EXIT_AT_MS = 1750; // when the mask reveal starts
const EXIT_MS = 550; // reveal duration, then unmount
const REDUCED_TOTAL_MS = 450; // static flash for reduced-motion users

/**
 * BootOverlay (PRD §11.1, UX-Blueprint §6.1).
 * OS-style intro: brand + tagline + three status beats over
 * drawing court lines. Skippable via click/key, exits with a
 * vertical mask reveal, remembered per session (boot_seen).
 * Reduced-motion users get a near-instant static flash.
 */
export function BootOverlay() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(-1);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
  }, []);

  const finish = useCallback(() => {
    setLeaving(true);
    const id = window.setTimeout(() => {
      setMounted(false);
      try {
        sessionStorage.setItem("boot_seen", "1");
      } catch {
        // storage unavailable (private mode) — boot shows again next visit
      }
    }, EXIT_MS);
    timers.current.push(id);
  }, []);

  useEffect(() => {
    // Client-only gate: sessionStorage decides first-visit vs returning.
    let seen = false;
    try {
      seen = sessionStorage.getItem("boot_seen") === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Defer mount to the next frame — keeps the browser's first paint
    // untouched and satisfies the no-sync-setState-in-effect rule.
    const raf = requestAnimationFrame(() => {
      setMounted(true);
      document.body.style.overflow = "hidden";

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
    });

    return () => {
      cancelAnimationFrame(raf);
      clearTimers();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      role="presentation"
      aria-hidden="true"
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

        {/* Skip — real affordance even though overlay aria-hidden */}
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
