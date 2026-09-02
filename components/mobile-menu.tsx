"use client";

import { useEffect, useRef, useState } from "react";
import { Download, List, X } from "@phosphor-icons/react";
import { contact, nav } from "@/lib/content";
import { useActiveSection, useScrolled } from "@/lib/use-active-section";

/**
 * MobileMenu — mobile shell (UX-Blueprint §4.2).
 * Compact top bar plus a full-screen command overlay with
 * staggered links, focus trap, Esc close, and focus return.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const scrolled = useScrolled();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc to close + focus trap inside the overlay.
  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const overlay = document.getElementById("mobile-menu-overlay");
      if (!overlay) return;
      const focusables = overlay.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Return focus to the trigger after close.
  useEffect(() => {
    if (!open) triggerRef.current?.focus();
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Top bar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-5 transition-colors duration-300 md:hidden ${
          scrolled && !open
            ? "border-b border-line bg-bg/90 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <a
          href="#home"
          className="flex min-h-11 items-center font-semibold tracking-tight text-frost"
          onClick={close}
        >
          MuktafiOS
        </a>
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu-overlay"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-full border border-line bg-surface/60 text-frost transition-colors hover:bg-raised"
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </header>

      {/* Full-screen overlay */}
      {open ? (
        <div
          id="mobile-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-bg px-5 pb-8 pt-24 md:hidden"
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="absolute right-5 top-3 grid size-11 place-items-center rounded-full border border-line bg-surface/60 text-frost transition-colors hover:bg-raised"
          >
            <X size={20} />
          </button>

          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {nav.map((item, index) => (
                <li
                  key={item.href}
                  className="animate-[menu-item_400ms_var(--ease-out-heavy)_both] opacity-0"
                  style={{ animationDelay: `${80 + index * 60}ms` }}
                >
                  <a
                    href={item.href}
                    onClick={close}
                    aria-current={
                      active === item.href.slice(1) ? "true" : undefined
                    }
                    className="flex min-h-14 items-center border-b border-line text-3xl font-semibold tracking-tight text-frost transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={contact.secondaryCta.href}
            download
            onClick={close}
            className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-5 font-medium text-bg animate-[menu-item_400ms_var(--ease-out-heavy)_both] opacity-0"
            style={{ animationDelay: `${80 + nav.length * 60}ms` }}
          >
            <Download size={18} weight="bold" />
            {contact.secondaryCta.label}
          </a>
        </div>
      ) : null}
    </>
  );
}
