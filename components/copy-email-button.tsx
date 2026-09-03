"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

type CopyEmailButtonProps = {
  value: string;
};

/**
 * CopyEmailButton — Email row for the contact links.
 * Copies the address to the clipboard, then shows a short
 * confirmation (visual + aria-live announcement).
 */
export function CopyEmailButton({ value }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Legacy fallback for browsers without the async Clipboard API.
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
      } catch {
        setCopied(false);
      }
      document.body.removeChild(textarea);
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      aria-label={
        copied ? "Email address copied" : `Copy email address ${value}`
      }
      className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-frost"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim transition-colors group-hover:text-accent">
        Email
      </span>
      <span>{copied ? "Copied" : value}</span>
      {copied ? (
        <Check size={13} weight="bold" className="text-accent" aria-hidden="true" />
      ) : (
        <Copy
          size={13}
          aria-hidden="true"
          className="text-dim transition-colors group-hover:text-accent"
        />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
}
