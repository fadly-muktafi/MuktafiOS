"use client";

import { Command } from "@phosphor-icons/react";
import { nav } from "@/lib/content";
import { useActiveSection, useScrolled } from "@/lib/use-active-section";
import { useCommandPalette } from "@/lib/command-palette-context";

/**
 * FloatingDock — desktop navigation (Visual-System §9.1).
 * Smoked metal pill, floats 24px from the top, compresses on
 * scroll, active section shown with a green underline.
 */
export function FloatingDock() {
  const active = useActiveSection();
  const scrolled = useScrolled();
  const { toggle } = useCommandPalette();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-6 z-50 hidden justify-center md:flex">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto flex items-center gap-1 rounded-full border border-line bg-metal/40 shadow-[inset_0_1px_0_0_rgba(244,247,245,0.06)] backdrop-blur-md transition-all duration-300 ease-snap ${
          scrolled ? "px-2 py-1.5 bg-metal/70" : "px-3 py-2"
        }`}
      >
        <a
          href="#home"
          className="flex min-h-11 items-center rounded-full px-4 font-semibold tracking-tight text-frost transition-colors hover:text-accent"
        >
          MuktafiOS
        </a>
        <span aria-hidden="true" className="h-5 w-px bg-line" />
        <ul className="flex items-center gap-1">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex min-h-11 items-center rounded-full px-4 text-sm transition-colors duration-200 ${
                    isActive ? "text-frost" : "text-muted hover:text-frost"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-4 bottom-2 h-0.5 rounded-full bg-accent transition-transform duration-300 ease-snap ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
        <span aria-hidden="true" className="h-5 w-px bg-line" />
        <button
          type="button"
          onClick={toggle}
          aria-label="Open command palette"
          title="Command palette"
          className="flex min-h-11 items-center gap-2 rounded-full px-3 text-muted transition-colors hover:bg-raised hover:text-frost"
        >
          <Command size={16} aria-hidden="true" />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim">
            ⌘K
          </kbd>
        </button>
      </nav>
    </header>
  );
}
