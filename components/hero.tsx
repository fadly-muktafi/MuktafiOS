import type { CSSProperties } from "react";
import { ArrowDown, Play } from "@phosphor-icons/react/dist/ssr";
import { hero } from "@/lib/content";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BezelPanel } from "@/components/ui/bezel-panel";
import { TacticalCourt } from "@/components/tactical-court";

/**
 * Hero Command Center (UX-Blueprint §6.2).
 * Asymmetric split: copy + CTAs left, tactical court right.
 * Mobile: copy first, CTAs, then the court below (tap-based).
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col justify-center px-5 pb-20 pt-32 md:px-12 lg:px-[72px] lg:pt-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        {/* Copy column — gated entrance, staggered */}
        <div>
          <p
            data-gate
            className="font-mono text-xs tracking-[0.2em] text-dim"
          >
            {hero.brand}
          </p>
          <p
            data-gate
            style={{ "--gate-delay": "60ms" } as CSSProperties}
            className="mt-3 font-mono text-sm text-muted"
          >
            {hero.name} &mdash; {hero.role}
          </p>
          <h2
            data-gate
            style={
              {
                "--gate-delay": "120ms",
                fontSize: "clamp(2.75rem, 6vw, 5.5rem)",
              } as CSSProperties
            }
            className="mt-6 font-bold leading-[0.98] tracking-tight text-frost"
          >
            A Playbook for Building Digital Systems
          </h2>
          <p
            data-gate
            style={{ "--gate-delay": "200ms" } as CSSProperties}
            className="mt-6 max-w-md text-lg leading-relaxed text-muted"
          >
            {hero.subtext}
          </p>
          <div
            data-gate
            style={{ "--gate-delay": "280ms" } as CSSProperties}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href={hero.primaryCta.href}
              icon={<Play size={14} weight="fill" />}
            >
              {hero.primaryCta.label}
            </MagneticButton>
            <MagneticButton
              href={hero.secondaryCta.href}
              variant="secondary"
              icon={<ArrowDown size={14} weight="bold" />}
            >
              {hero.secondaryCta.label}
            </MagneticButton>
          </div>
        </div>

        {/* Tactical court column — enters last in the sequence */}
        <div
          data-gate
          style={{ "--gate-delay": "360ms" } as CSSProperties}
        >
          <BezelPanel className="w-full" innerClassName="p-4 md:p-6">
            <figure>
              <TacticalCourt />
              <figcaption className="mt-2 flex items-center justify-between px-1 font-mono text-[11px] tracking-[0.14em] text-dim">
                <span>FORMATION 5-0</span>
                <span>LIVE FORMATION MAP</span>
              </figcaption>
            </figure>
          </BezelPanel>
        </div>
      </div>
    </section>
  );
}
