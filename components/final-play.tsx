"use client";

import { useState } from "react";
import { ArrowUpRight, Download, MapPin, PaperPlaneTilt } from "@phosphor-icons/react";
import { ContactForm } from "@/components/contact-form";
import { CopyEmailButton } from "@/components/copy-email-button";
import { HomeBaseCard } from "@/components/home-base-card";
import { BezelPanel } from "@/components/ui/bezel-panel";
import {
  MagneticActionButton,
  MagneticButton,
} from "@/components/ui/magnetic-button";
import { contact, contactForm, contactToggle } from "@/lib/content";

const CTA_ID = "contact-cta";
const NAME_FIELD_ID = "cf-name";

/**
 * Final Play (UX-Blueprint §6.7, Visual-System §9.8).
 * Left: copy + CTAs. Right: Home Base card that crossfades
 * into the contact form when toggled. The toggle button
 * switches label between "Contact Ahmad" and "My Place".
 * All motion is transform/opacity only — no layout animation.
 */
export function FinalPlay() {
  const [formOpen, setFormOpen] = useState(false);

  function toggleForm() {
    const next = !formOpen;
    setFormOpen(next);
    if (next) {
      window.setTimeout(() => {
        document.getElementById(NAME_FIELD_ID)?.focus();
      }, 350);
    }
    // When closing, focus naturally stays on the toggle button.
  }

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[1440px] border-t border-line px-5 pb-16 pt-24 md:px-12 lg:px-[72px] lg:pb-20 lg:pt-40"
    >
      <BezelPanel innerClassName="overflow-hidden px-6 py-12 md:px-10 md:py-16 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-14">
          {/* Copy column — always on the left */}
          <div className="w-full max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
              Final Play
            </p>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-frost md:text-5xl">
              {contact.heading}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              {contact.body}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticActionButton
                id={CTA_ID}
                onClick={toggleForm}
                aria-expanded={formOpen}
                aria-controls={contactForm.id}
                icon={
                  formOpen ? (
                    <MapPin size={14} weight="bold" />
                  ) : (
                    <PaperPlaneTilt size={14} weight="bold" />
                  )
                }
              >
                <span
                  key={formOpen ? "place" : "form"}
                  className="inline-block animate-[content-in_220ms_var(--ease-snap)]"
                >
                  {formOpen ? contactToggle.showPlace : contactToggle.showForm}
                </span>
              </MagneticActionButton>

              <MagneticButton
                href={contact.secondaryCta.href}
                variant="secondary"
                download
                icon={<Download size={14} weight="bold" />}
              >
                {contact.secondaryCta.label}
              </MagneticButton>
            </div>
          </div>

          {/* Right column — overlay stack: Home Base <-> Contact Form */}
          <div className="grid">
            <div
              aria-hidden={formOpen}
              className={`col-start-1 row-start-1 h-full transition-all duration-500 ease-snap ${
                formOpen
                  ? "pointer-events-none -translate-x-8 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <HomeBaseCard />
            </div>

            <div
              inert={!formOpen}
              aria-hidden={!formOpen}
              className={`col-start-1 row-start-1 h-full transition-all duration-500 ease-snap ${
                formOpen
                  ? "translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-8 opacity-0"
              }`}
            >
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Contact links — always full width below */}
        <ul
          aria-label="Contact links"
          className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 border-t border-line pt-8"
        >
          {contact.links.map((link, index) => (
            <li key={link.label} className="flex items-center">
              {index > 0 ? (
                <span aria-hidden="true" className="mx-3 h-4 w-px bg-line" />
              ) : null}
              {"copy" in link ? (
                <CopyEmailButton value={link.value} />
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-frost"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim transition-colors group-hover:text-accent">
                    {link.label}
                  </span>
                  <span>{link.value}</span>
                  <ArrowUpRight
                    size={12}
                    weight="bold"
                    aria-hidden="true"
                    className="text-dim transition-all duration-200 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              )}
            </li>
          ))}
        </ul>
      </BezelPanel>

      <footer className="mt-10 flex items-center justify-center">
        <p className="font-mono text-[11px] tracking-[0.14em] text-dim">
          &copy; 2026 AHMAD FADLY MUKTAFI &middot; MUKTAFIOS
        </p>
      </footer>
    </section>
  );
}
