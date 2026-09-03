import { ArrowUpRight, Download, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/contact-form";
import { CopyEmailButton } from "@/components/copy-email-button";
import { BezelPanel } from "@/components/ui/bezel-panel";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { contact } from "@/lib/content";

/**
 * Final Play (UX-Blueprint §6.7, Visual-System §9.8).
 * Centered conversion panel: one headline, two CTAs max,
 * inline contact form (Web3Forms), copy-to-clipboard email,
 * then a quiet footer line.
 */
export function FinalPlay() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[1440px] border-t border-line px-5 pb-16 pt-24 md:px-12 lg:px-[72px] lg:pb-20 lg:pt-40"
    >
      <BezelPanel innerClassName="px-6 py-16 text-center md:px-12 md:py-24">
        <div className="mx-auto max-w-2xl animate-[content-in_400ms_var(--ease-out-heavy)]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
            Final Play
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-frost md:text-6xl">
            {contact.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted">
            {contact.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={contact.primaryCta.href}
              icon={<PaperPlaneTilt size={14} weight="bold" />}
            >
              {contact.primaryCta.label}
            </MagneticButton>
            <MagneticButton
              href={contact.secondaryCta.href}
              variant="secondary"
              download
              icon={<Download size={14} weight="bold" />}
            >
              {contact.secondaryCta.label}
            </MagneticButton>
          </div>

          <ContactForm />

          {/* Contact links — Email copies to clipboard, others open externally */}
          <ul
            aria-label="Contact links"
            className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-3"
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
        </div>
      </BezelPanel>

      <footer className="mt-10 flex items-center justify-center">
        <p className="font-mono text-[11px] tracking-[0.14em] text-dim">
          &copy; 2026 AHMAD FADLY MUKTAFI &middot; MUKTAFIOS
        </p>
      </footer>
    </section>
  );
}
