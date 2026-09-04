"use client";

import { useCallback, useRef, useState } from "react";
import { playbook } from "@/lib/content";
import { BezelPanel } from "@/components/ui/bezel-panel";
import { FormationMap } from "@/components/formation-map";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * PlaybookOverview (UX-Blueprint §6.3).
 * Formation map left, tablist selector right; stacked on mobile.
 * Full tab keyboard support: arrows, Home, End, roving tabindex.
 */
export function PlaybookOverview() {
  const modes = playbook.modes;
  const [activeId, setActiveId] = useState(modes[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activateMode = useCallback((id: string, focus?: boolean) => {
    setActiveId(id);
    if (focus) {
      const idx = modes.findIndex((m) => m.id === id);
      tabRefs.current[idx]?.focus();
    }
  }, [modes]);

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const count = modes.length;
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
    activateMode(modes[target].id, true);
  };

  const activeMode = modes.find((m) => m.id === activeId) ?? modes[0];

  return (
    <section
      id="system"
      className="mx-auto w-full max-w-[1440px] border-t border-line px-5 py-24 md:px-12 lg:px-[72px] lg:py-32"
    >
      <SectionHeader heading={playbook.heading} intro={playbook.intro} />

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        {/* Formation map */}
        <Reveal>
          <BezelPanel innerClassName="p-4 md:p-6">
            <FormationMap modes={modes} activeId={activeId} />
          </BezelPanel>
        </Reveal>

        {/* Mode selector */}
        <Reveal delay={120}>
          <div>
          <div
            role="tablist"
            aria-label="Playbook modes"
            aria-orientation="vertical"
            className="flex flex-col gap-3"
          >
            {modes.map((mode, index) => {
              const isActive = mode.id === activeId;
              return (
                <button
                  key={mode.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`playbook-tab-${mode.id}`}
                  aria-selected={isActive}
                  aria-controls={`playbook-panel-${mode.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => activateMode(mode.id)}
                  onKeyDown={(e) => onTabKeyDown(e, index)}
                  className={`group w-full rounded-panel border p-5 text-left transition-all duration-300 ease-snap md:p-6 ${
                    isActive
                      ? "border-accent-line bg-raised"
                      : "border-line bg-surface hover:border-line-strong hover:bg-raised/60"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span
                      className={`text-xl font-semibold transition-colors duration-200 ${
                        isActive ? "text-frost" : "text-muted group-hover:text-frost"
                      }`}
                    >
                      {mode.label}
                    </span>
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.14em] ${
                        isActive ? "text-accent" : "text-dim"
                      }`}
                    >
                      {mode.headline}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active mode detail — single tabpanel region */}
          <div
            role="tabpanel"
            id={`playbook-panel-${activeMode.id}`}
            aria-labelledby={`playbook-tab-${activeMode.id}`}
            className="mt-6 rounded-panel border border-line bg-surface p-6"
          >
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {activeMode.copy}
            </p>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
