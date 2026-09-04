"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { selectedPlays, type Play } from "@/lib/content";
import { BezelPanel } from "@/components/ui/bezel-panel";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { PlayDrawer } from "@/components/play-drawer";

/**
 * SelectedPlays (UX-Blueprint §6.4).
 * Desktop: sticky active play sheet + vertical play index.
 * Mobile: stacked play cards. "Open Play" opens PlayDrawer.
 * Content stays text-first — no fake screenshots (Visual-System §11).
 */
export function SelectedPlays() {
  const plays = selectedPlays.plays;
  const [activeId, setActiveId] = useState(plays[0].id);
  const [drawerPlay, setDrawerPlay] = useState<Play | null>(null);
  const indexRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activePlay = plays.find((p) => p.id === activeId) ?? plays[0];

  const onIndexKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      const count = plays.length;
      let target: number | null = null;
      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          target = (index + 1) % count;
          break;
        case "ArrowUp":
        case "ArrowLeft":
          target = (index - 1 + count) % count;
          break;
        case "Home":
          target = 0;
          break;
        case "End":
          target = count - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      const next = plays[target];
      setActiveId(next.id);
      indexRefs.current[target]?.focus();
    },
    [plays]
  );

  return (
    <section
      id="work"
      className="mx-auto w-full max-w-[1440px] border-t border-line px-5 py-24 md:px-12 lg:px-[72px] lg:py-32"
    >
      <SectionHeader
        heading={selectedPlays.heading}
        intro={selectedPlays.intro}
      />

      {/* Desktop: sticky play sheet + play index */}
      <Reveal>
      <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <BezelPanel innerClassName="p-6 md:p-8">
            <article
              key={activePlay.id}
              aria-labelledby="active-play-title"
              className="animate-[content-in_360ms_var(--ease-out-heavy)]"
            >
              <p className="font-mono text-[11px] tracking-[0.14em] text-dim">
                PLAY {activePlay.number}
              </p>
              <h3
                id="active-play-title"
                className="mt-3 text-2xl font-semibold tracking-tight text-frost md:text-3xl"
              >
                {activePlay.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {activePlay.context} &middot; {activePlay.role}
              </p>

              <dl className="mt-8 space-y-6">
                {(
                  [
                    ["Problem", activePlay.problem],
                    ["Move", activePlay.move],
                    ["System", activePlay.system],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1 border-l border-line pl-4 md:grid-cols-[96px_1fr] md:gap-6"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim md:pt-1">
                      {label}
                    </dt>
                    <dd className="leading-relaxed text-muted">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setDrawerPlay(activePlay)}
                  className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-line bg-surface px-5 py-2 text-sm font-medium text-frost transition-colors duration-200 ease-snap hover:border-line-strong hover:bg-raised"
                >
                  Open Play
                  <span
                    aria-hidden="true"
                    className="grid size-7 place-items-center rounded-full bg-raised text-muted transition-all duration-200 ease-snap group-hover:bg-accent group-hover:text-bg"
                  >
                    <ArrowUpRight size={14} weight="bold" />
                  </span>
                </button>
              </div>
            </article>
          </BezelPanel>
        </div>

        {/* Play index */}
        <div
          role="listbox"
          aria-label="Play index"
          className="flex flex-col gap-3 lg:sticky lg:top-28"
        >
          {plays.map((play, index) => {
            const isActive = play.id === activeId;
            return (
              <button
                key={play.id}
                ref={(el) => {
                  indexRefs.current[index] = el;
                }}
                type="button"
                role="option"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(play.id)}
                onKeyDown={(e) => onIndexKeyDown(e, index)}
                className={`rounded-panel border p-5 text-left transition-all duration-300 ease-snap ${
                  isActive
                    ? "border-accent-line bg-raised"
                    : "border-line bg-surface hover:border-line-strong hover:bg-raised/60"
                }`}
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-dim">
                  {play.number}
                </span>
                <span
                  className={`mt-1 block font-semibold tracking-tight transition-colors ${
                    isActive ? "text-frost" : "text-muted"
                  }`}
                >
                  {play.title}
                </span>
                <span className="mt-0.5 block text-xs text-dim">
                  {play.context}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      </Reveal>

      {/* Mobile: stacked play cards */}
      <Reveal delay={80} className="lg:hidden">
      <ul className="mt-10 flex flex-col gap-5 lg:hidden">
        {plays.map((play) => (
          <li key={play.id} className="rounded-panel border border-line bg-surface p-5">
            <p className="font-mono text-[11px] tracking-[0.14em] text-dim">
              PLAY {play.number}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-frost">
              {play.title}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {play.context} &middot; {play.role}
            </p>

            <dl className="mt-5 space-y-4">
              {(
                [
                  ["Problem", play.problem],
                  ["Move", play.move],
                  ["System", play.system],
                ] as const
              ).map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={() => setDrawerPlay(play)}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-frost transition-colors hover:border-line-strong hover:bg-raised"
            >
              Open Play
              <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      </Reveal>

      <PlayDrawer play={drawerPlay} onClose={() => setDrawerPlay(null)} />
    </section>
  );
}
