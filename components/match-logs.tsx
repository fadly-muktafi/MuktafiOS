"use client";

import { useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { matchLogs } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * MatchLogs (UX-Blueprint §6.6, Visual-System §9.7).
 * Named <details> group: only one entry open at a time.
 * Rail sync reads the settled DOM (details[open]) instead of
 * trusting toggle-event payloads — immune to event ordering.
 */
export function MatchLogs() {
  const entries = matchLogs.entries;
  const [openId, setOpenId] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);

  const syncOpenId = () => {
    const open = listRef.current?.querySelector("details[open]");
    setOpenId(open?.getAttribute("data-log-id") ?? null);
  };

  return (
    <section
      id="logs"
      className="mx-auto w-full max-w-[1440px] border-t border-line px-5 py-24 md:px-12 lg:px-[72px] lg:py-32"
    >
      <SectionHeader heading={matchLogs.heading} intro={matchLogs.intro} />

      <Reveal>
      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,160px)_minmax(0,1fr)] lg:gap-16">
        {/* Year rail (desktop) */}
        <div className="hidden lg:block">
          <ol className="sticky top-28 space-y-1 border-l border-line">
            {entries.map((entry) => {
              const isOpen = openId === entry.id;
              return (
                <li key={entry.id} className="relative pl-6">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-px top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full transition-colors duration-300 ${
                      isOpen ? "bg-accent" : "bg-line"
                    }`}
                  />
                  <span
                    className={`font-mono text-xs tracking-[0.14em] transition-colors duration-300 ${
                      isOpen ? "text-accent" : "text-dim"
                    }`}
                  >
                    {entry.years}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Log entries */}
        <ol
          ref={listRef}
          className="flex flex-col gap-4 border-l border-line pl-5 lg:border-l-0 lg:pl-0"
        >
          {entries.map((entry) => (
            <li key={entry.id}>
              <details
                name="match-logs"
                data-log-id={entry.id}
                onToggle={syncOpenId}
                className="group rounded-panel border border-line bg-surface transition-colors duration-300 open:border-line-strong open:bg-raised"
              >
                <summary className="flex min-h-14 cursor-pointer items-start gap-4 p-5 md:p-6">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] tracking-[0.14em] text-dim">
                      {entry.period} &middot; {entry.kind}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-frost md:text-xl">
                      {entry.org}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">{entry.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {entry.summary}
                    </p>
                  </div>
                  <CaretDown
                    size={18}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-dim transition-transform duration-300 ease-snap group-open:rotate-180"
                  />
                </summary>

                <div className="border-t border-line px-5 pb-5 pt-4 md:px-6">
                  <ul className="space-y-2">
                    {entry.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 rounded-full bg-line-strong"
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>
      </Reveal>
    </section>
  );
}
