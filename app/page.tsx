import { ArrowUpRight, Download } from "@phosphor-icons/react/dist/ssr";
import { Hero } from "@/components/hero";
import { MatchLogs } from "@/components/match-logs";
import { PlaybookOverview } from "@/components/playbook";
import { SelectedPlays } from "@/components/selected-plays";
import { SystemModules } from "@/components/system-modules";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeader } from "@/components/ui/section-header";
import { contact } from "@/lib/content";

/**
 * Phase 2A: content skeleton.
 * Every section renders its final copy from lib/content.ts
 * inside a plain wrapper. Each section gets upgraded to its
 * real design in Phases 2C-2H.
 */
export default function Home() {
  return (
    <main>
      <h1 className="sr-only">Ahmad Fadly Muktafi - Fullstack Developer</h1>

      {/* #home - Hero Command Center */}
      <Hero />

      {/* #system - Playbook Overview */}
      <PlaybookOverview />

      {/* #work - Selected Plays */}
      <SelectedPlays />

      {/* #stack - System Modules */}
      <SystemModules />

      {/* #logs - Match Logs */}
      <MatchLogs />

      {/* #contact - Final Play (Phase 2H) */}
      <section
        id="contact"
        className="mx-auto max-w-5xl border-t border-line px-5 py-24 md:px-12"
      >
        <SectionHeader heading={contact.heading} />
        <p className="mt-4 max-w-xl text-lg text-muted">{contact.body}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton
            href={contact.primaryCta.href}
            icon={<ArrowUpRight weight="bold" />}
          >
            {contact.primaryCta.label}
          </MagneticButton>
          <MagneticButton
            href={contact.secondaryCta.href}
            variant="secondary"
            download
            icon={<Download />}
          >
            {contact.secondaryCta.label}
          </MagneticButton>
        </div>
        <ul className="mt-12 space-y-2">
          {contact.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="group inline-flex min-h-11 items-center gap-3 text-muted transition-colors hover:text-frost"
              >
                <span className="font-mono text-xs text-dim">{link.label}</span>
                <span>{link.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
