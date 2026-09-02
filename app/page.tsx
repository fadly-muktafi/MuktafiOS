import { ArrowUpRight, Download } from "@phosphor-icons/react/dist/ssr";
import { Hero } from "@/components/hero";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeader } from "@/components/ui/section-header";
import {
  contact,
  matchLogs,
  playbook,
  selectedPlays,
  systemModules,
} from "@/lib/content";

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

      {/* #system - Playbook Overview (Phase 2D) */}
      <section
        id="system"
        className="mx-auto max-w-5xl border-t border-line px-5 py-24 md:px-12"
      >
        <SectionHeader heading={playbook.heading} intro={playbook.intro} />
        <ul className="mt-12 space-y-6">
          {playbook.modes.map((mode) => (
            <li key={mode.id} className="rounded-panel border border-line p-6">
              <p className="font-mono text-xs text-dim">{mode.id}</p>
              <h3 className="mt-2 text-xl font-semibold text-frost">
                {mode.label} - {mode.headline}
              </h3>
              <p className="mt-2 max-w-xl text-muted">{mode.copy}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* #work - Selected Plays (Phase 2E) */}
      <section
        id="work"
        className="mx-auto max-w-5xl border-t border-line px-5 py-24 md:px-12"
      >
        <SectionHeader
          heading={selectedPlays.heading}
          intro={selectedPlays.intro}
        />
        <ul className="mt-12 space-y-8">
          {selectedPlays.plays.map((play) => (
            <li
              key={play.id}
              className="rounded-panel border border-line bg-surface p-6 md:p-8"
            >
              <p className="font-mono text-xs text-dim">{play.number}</p>
              <h3 className="mt-2 text-2xl font-semibold text-frost">
                {play.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {play.context} &middot; {play.role}
              </p>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="font-mono text-xs text-dim">Problem</dt>
                  <dd className="mt-1 text-muted">{play.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-dim">Move</dt>
                  <dd className="mt-1 text-muted">{play.move}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-dim">System</dt>
                  <dd className="mt-1 text-muted">{play.system}</dd>
                </div>
              </dl>
              <ul className="mt-6 flex flex-wrap gap-2">
                {play.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* #stack - System Modules (Phase 2F) */}
      <section
        id="stack"
        className="mx-auto max-w-5xl border-t border-line px-5 py-24 md:px-12"
      >
        <SectionHeader
          heading={systemModules.heading}
          intro={systemModules.intro}
        />
        <ul className="mt-12 space-y-6">
          {systemModules.layers.map((layer) => (
            <li key={layer.id} className="rounded-panel border border-line p-6">
              <h3 className="text-xl font-semibold text-frost">{layer.label}</h3>
              <p className="mt-1 text-sm text-muted">{layer.use}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {layer.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* #logs - Match Logs (Phase 2G) */}
      <section
        id="logs"
        className="mx-auto max-w-5xl border-t border-line px-5 py-24 md:px-12"
      >
        <SectionHeader heading={matchLogs.heading} intro={matchLogs.intro} />
        <ul className="mt-12 space-y-6">
          {matchLogs.entries.map((entry) => (
            <li
              key={entry.id}
              className="grid gap-2 rounded-panel border border-line p-6 md:grid-cols-[120px_1fr]"
            >
              <p className="font-mono text-xs text-dim">{entry.years}</p>
              <div>
                <h3 className="text-lg font-semibold text-frost">{entry.org}</h3>
                <p className="text-sm text-muted">
                  {entry.role} &middot; {entry.period}
                </p>
                <p className="mt-2 text-muted">{entry.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

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
