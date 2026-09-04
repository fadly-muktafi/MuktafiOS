"use client";

import { useRef, useState } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { contactForm } from "@/lib/content";

type SendStatus = "idle" | "sending" | "success" | "error";

type ContactFormProps = {
  className?: string;
};

const inputClasses =
  "mt-2 w-full rounded-control border border-line bg-bg px-4 text-sm text-frost placeholder:text-dim/60 transition-colors focus:border-accent-line focus:outline-none";

/**
 * ContactForm — sends via Web3Forms (no backend needed).
 * Real labels on every field (PRD §18), honeypot anti-spam,
 * and full idle/sending/success/error states.
 */
export function ContactForm({ className = "" }: ContactFormProps) {
  const [status, setStatus] = useState<SendStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      return;
    }

    const payload = {
      access_key: accessKey,
      subject: "MuktafiOS — New message",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      botcheck:
        (form.elements.namedItem("botcheck") as HTMLInputElement | null)
          ?.checked ?? false,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      id={contactForm.id}
      onSubmit={handleSubmit}
      aria-label="Contact form"
      className={`flex h-full w-full scroll-mt-28 flex-col rounded-inner border border-line bg-surface p-5 text-left md:p-6 ${className}`}
    >
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <label
            htmlFor="cf-name"
            className="block font-mono text-[11px] uppercase tracking-[0.14em] text-dim"
          >
            {contactForm.name.label}
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={contactForm.name.placeholder}
            className={`${inputClasses} h-12`}
          />
        </div>

        <div>
          <label
            htmlFor="cf-email"
            className="block font-mono text-[11px] uppercase tracking-[0.14em] text-dim"
          >
            {contactForm.email.label}
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={contactForm.email.placeholder}
            className={`${inputClasses} h-12`}
          />
        </div>

        <div>
          <label
            htmlFor="cf-message"
            className="block font-mono text-[11px] uppercase tracking-[0.14em] text-dim"
          >
            {contactForm.message.label}
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={4}
            placeholder={contactForm.message.placeholder}
            className={`${inputClasses} resize-y py-3`}
          />
        </div>
      </div>

      {/* Honeypot — must stay hidden from humans */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 size-0 opacity-0"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-all duration-200 ease-snap hover:brightness-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? contactForm.sending : contactForm.submit}
        <PaperPlaneTilt size={15} weight="bold" aria-hidden="true" />
      </button>

      <p aria-live="polite" role="status" className="mt-4 text-center text-sm">
        {status === "success" ? (
          <span className="text-accent">{contactForm.success}</span>
        ) : null}
        {status === "error" ? (
          <span className="text-danger">{contactForm.error}</span>
        ) : null}
      </p>
    </form>
  );
}
