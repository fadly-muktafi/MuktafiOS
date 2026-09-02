"use client";

import { useEffect, useState } from "react";

export const SECTION_IDS = [
  "home",
  "work",
  "system",
  "stack",
  "logs",
  "contact",
] as const;

/**
 * Tracks which page section currently dominates the viewport.
 * Uses IntersectionObserver instead of a scroll listener
 * (Visual-System §10.2 motion rules).
 */
export function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return active;
}

/**
 * True once the page has scrolled past a 1px sentinel at the
 * top of the document (rendered as #nav-sentinel in the layout).
 * Used to compress the dock / give the mobile bar a surface.
 */
export function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "0px" }
    );
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  return scrolled;
}
