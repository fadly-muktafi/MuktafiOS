"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Briefcase,
  ClockCounterClockwise,
  Command,
  Download,
  Graph,
  PaperPlaneTilt,
  Stack,
} from "@phosphor-icons/react";
import { commandActions } from "@/lib/content";
import { useCommandPalette } from "@/lib/command-palette-context";
import { BezelPanel } from "@/components/ui/bezel-panel";

const ACTION_ICONS: Record<string, typeof Briefcase> = {
  "View Work": Briefcase,
  "Open System Modules": Stack,
  "Read Match Logs": ClockCounterClockwise,
  "See How the System Moves": Graph,
  "Download CV": Download,
  "Contact Ahmad": PaperPlaneTilt,
};

function hintFor(href: string) {
  if (href.endsWith(".pdf")) return "PDF";
  return "Section";
}

/**
 * CommandPalette (UX-Blueprint §7, Visual-System §9.2).
 * Centered double-bezel modal (not terminal cosplay) with a real
 * combobox: type to filter, arrows/Home/End to move, Enter runs,
 * Esc/backdrop closes, focus returns to the trigger.
 */
export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const triggerRef = useRef<HTMLElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...commandActions];
    return commandActions.filter((a) => a.label.toLowerCase().includes(q));
  }, [query]);

  // Reset selection + query when the palette (re)opens — the
  // "adjust state during render" pattern (no effect needed).
  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    setQuery("");
    setActiveIndex(0);
  }

  // Focus management: remember trigger, focus input on open,
  // return focus on close, lock body scroll while open.
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes even if focus is on an option link.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  if (!open) return null;

  const onListKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(filtered.length - 1);
        break;
      case "Enter":
        event.preventDefault();
        itemRefs.current[activeIndex]?.click();
        break;
      default:
        break;
    }
  };

  const activeId =
    filtered.length > 0 ? `command-option-${filtered[activeIndex].label}` : undefined;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[16vh] animate-[fade-in_180ms_ease]"
      role="presentation"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-lg animate-[content-in_220ms_var(--ease-snap)]"
        onClick={(e) => e.stopPropagation()}
      >
        <BezelPanel innerClassName="overflow-hidden p-0">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-line px-4 py-1">
            <Command size={16} className="shrink-0 text-dim" aria-hidden="true" />
            <label htmlFor="command-input" className="sr-only">
              Search MuktafiOS commands
            </label>
            <input
              ref={inputRef}
              id="command-input"
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls="command-listbox"
              aria-activedescendant={activeId}
              aria-autocomplete="list"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onListKeyDown}
              placeholder="Search MuktafiOS..."
              autoComplete="off"
              className="h-12 w-full bg-transparent text-sm text-frost placeholder:text-dim focus:outline-none"
            />
            <kbd className="shrink-0 rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim">
              ESC
            </kbd>
          </div>

          {/* Options */}
          <div className="max-h-[320px] overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-dim">
                No matching commands.
              </p>
            ) : (
              <div id="command-listbox" role="listbox" aria-label="Available commands">
                {filtered.map((action, index) => {
                  const Icon = ACTION_ICONS[action.label] ?? Graph;
                  const isActive = index === activeIndex;
                  const isDownload = action.href.endsWith(".pdf");
                  return (
                    <div key={action.label} className="relative">
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-2 left-0 w-[2px] rounded-full bg-accent transition-opacity duration-150 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <a
                        ref={(el) => {
                          itemRefs.current[index] = el;
                        }}
                        id={`command-option-${action.label}`}
                        role="option"
                        aria-selected={isActive}
                        href={action.href}
                        download={isDownload || undefined}
                        onClick={() => setOpen(false)}
                        onMouseEnter={() => setActiveIndex(index)}
                        onKeyDown={onListKeyDown}
                        tabIndex={-1}
                        className={`flex min-h-11 items-center gap-3 rounded-inner px-3 py-2.5 text-sm transition-colors ${
                          isActive ? "bg-accent-soft text-frost" : "text-muted"
                        }`}
                      >
                        <Icon
                          size={16}
                          weight={isActive ? "bold" : "regular"}
                          className={isActive ? "text-accent" : "text-dim"}
                          aria-hidden="true"
                        />
                        <span className="flex-1">{action.label}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
                          {hintFor(action.href)}
                        </span>
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="flex items-center gap-4 border-t border-line px-4 py-2.5">
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-dim">
              <kbd className="rounded border border-line px-1">↑↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-dim">
              <kbd className="rounded border border-line px-1">↵</kbd> run
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-dim">
              <kbd className="rounded border border-line px-1">esc</kbd> close
            </span>
          </div>
        </BezelPanel>
      </div>
    </div>
  );
}
