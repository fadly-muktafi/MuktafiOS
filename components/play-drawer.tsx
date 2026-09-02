"use client";

import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";
import type { Play } from "@/lib/content";

type PlayDrawerProps = {
  play: Play | null;
  onClose: () => void;
};

/**
 * PlayDrawer — case detail drawer (UX-Blueprint §6.4).
 * Native <dialog>: showModal() gives a focus trap, inert
 * background, Esc close, and focus return for free.
 * Desktop: right-side sheet. Mobile: bottom sheet.
 */
export function PlayDrawer({ play, onClose }: PlayDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && play && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }
  }, [play]);

  if (!play) return null;
  const shown = play;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="play-drawer-title"
      onClose={onClose}
      onClick={(event) => {
        // Backdrop click closes (dialog padding area = backdrop).
        if (event.target === dialogRef.current) {
          dialogRef.current?.close();
        }
      }}
      className="fixed inset-0 z-[80] m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/60 open:animate-[fade-in_200ms_ease]"
    >
      <div
        className="absolute inset-y-0 right-0 flex w-full max-w-lg flex-col overflow-y-auto border-l border-line bg-raised open:animate-[drawer-in-x_360ms_var(--ease-snap)]
        max-md:inset-x-0 max-md:top-auto max-md:max-h-[85dvh] max-md:max-w-none max-md:rounded-t-panel max-md:border-l-0 max-md:border-t max-md:open:animate-[drawer-in-y_360ms_var(--ease-snap)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 md:px-8">
          <div className="min-w-0">
            <p className="font-mono text-[11px] tracking-[0.14em] text-dim">
              PLAY {shown.number}
            </p>
            <h3
              id="play-drawer-title"
              className="mt-1 text-xl font-semibold tracking-tight text-frost md:text-2xl"
            >
              {shown.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close play detail"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-frost"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <dl className="flex flex-col gap-6 px-6 py-6 md:px-8">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
              Context
            </dt>
            <dd className="mt-1 text-frost">{shown.context}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
              Role
            </dt>
            <dd className="mt-1 text-frost">{shown.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
              Stack
            </dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-2">
                {shown.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
              Contribution
            </dt>
            <dd className="mt-1 leading-relaxed text-muted">
              {shown.contribution}
            </dd>
          </div>
        </dl>
      </div>
    </dialog>
  );
}
