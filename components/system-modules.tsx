"use client";

import { useCallback, useRef, useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { BezelPanel } from "@/components/ui/bezel-panel";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { systemModules } from "@/lib/content";

/**
 * SystemModules (UX-Blueprint §6.5, Visual-System §9.6).
 * Desktop: layer stack (left) + double-bezel detail panel (right).
 * Mobile: accordion. No progress bars, skills always visible.
 */
export function SystemModules() {
  const layers = systemModules.layers;
  const [activeId, setActiveId] = useState(layers[0].id);
  const [openId, setOpenId] = useState<string | null>(layers[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = layers.findIndex((l) => l.id === activeId);
  const activeLayer = layers[activeIndex] ?? layers[0];

  const onTabKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      const count = layers.length;
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
      setActiveId(layers[target].id);
      tabRefs.current[target]?.focus();
    },
    [layers]
  );

  return (
    <section
      id="stack"
      className="mx-auto w-full max-w-[1440px] border-t border-line px-5 py-24 md:px-12 lg:px-[72px] lg:py-32"
    >
      <SectionHeader
        heading={systemModules.heading}
        intro={systemModules.intro}
      />

      {/* Desktop: layer stack + detail panel */}
      <Reveal>
      <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-14">
        {/* Layer stack */}
        <div
          role="tablist"
          aria-label="System layers"
          aria-orientation="vertical"
          className="flex flex-col gap-3 lg:sticky lg:top-28"
        >
          {layers.map((layer, index) => {
            const isActive = layer.id === activeId;
            return (
              <button
                key={layer.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`layer-tab-${layer.id}`}
                aria-selected={isActive}
                aria-controls="layer-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(layer.id)}
                onKeyDown={(e) => onTabKeyDown(e, index)}
                className={`relative flex min-h-14 items-center gap-4 rounded-control border px-5 py-4 text-left transition-all duration-200 ease-snap ${
                  isActive
                    ? "border-line-strong bg-raised"
                    : "border-line bg-surface hover:border-line-strong hover:bg-raised/60"
                }`}
              >
                {/* Active edge line */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-3 left-0 w-[3px] rounded-full bg-accent transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <span className="font-mono text-[11px] text-dim">
                  L{index + 1}
                </span>
                <span
                  className={`flex-1 text-base font-semibold tracking-tight transition-colors ${
                    isActive ? "text-frost" : "text-muted"
                  }`}
                >
                  {layer.label}
                </span>
                <span className="font-mono text-xs text-dim">
                  {layer.skills.length} skills
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <BezelPanel innerClassName="p-6 md:p-8">
          <div
            key={activeLayer.id}
            role="tabpanel"
            id="layer-panel"
            aria-labelledby={`layer-tab-${activeLayer.id}`}
            className="animate-[content-in_320ms_var(--ease-out-heavy)]"
          >
            <p className="font-mono text-[11px] tracking-[0.14em] text-dim">
              L{activeIndex + 1} / {activeLayer.label.toUpperCase()}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-frost md:text-3xl">
              {activeLayer.label}
            </h3>
            <p className="mt-3 max-w-md leading-relaxed text-muted">
              {activeLayer.use}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {activeLayer.skills.map((skill, i) => (
                <li
                  key={skill}
                  className="animate-[content-in_360ms_var(--ease-out-heavy)_both] rounded-full border border-line bg-surface px-4 py-2 font-mono text-sm text-muted"
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </BezelPanel>
      </div>
      </Reveal>

      {/* Mobile: accordion */}
      <Reveal delay={80} className="lg:hidden">
      <div className="mt-10 flex flex-col gap-3 lg:hidden">
        {layers.map((layer, index) => {
          const open = openId === layer.id;
          return (
            <div
              key={layer.id}
              className={`rounded-panel border transition-colors duration-200 ${
                open ? "border-line-strong bg-raised" : "border-line bg-surface"
              }`}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`layer-acc-${layer.id}`}
                id={`layer-acc-btn-${layer.id}`}
                onClick={() => setOpenId(open ? null : layer.id)}
                className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left"
              >
                <span className="font-mono text-[11px] text-dim">
                  L{index + 1}
                </span>
                <span className="flex-1 font-semibold tracking-tight text-frost">
                  {layer.label}
                </span>
                <span className="font-mono text-xs text-dim">
                  {layer.skills.length}
                </span>
                {open ? (
                  <Minus size={16} className="text-muted" aria-hidden="true" />
                ) : (
                  <Plus size={16} className="text-muted" aria-hidden="true" />
                )}
              </button>
              {open ? (
                <div
                  id={`layer-acc-${layer.id}`}
                  role="region"
                  aria-labelledby={`layer-acc-btn-${layer.id}`}
                  className="border-t border-line px-4 pb-5 pt-4"
                >
                  <p className="text-sm leading-relaxed text-muted">
                    {layer.use}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {layer.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      </Reveal>
    </section>
  );
}
