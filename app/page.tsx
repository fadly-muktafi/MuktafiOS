const sections = [
  { id: "home", label: "Hero Command Center" },
  { id: "system", label: "Playbook Overview" },
  { id: "work", label: "Selected Plays" },
  { id: "stack", label: "System Modules" },
  { id: "logs", label: "Match Logs" },
  { id: "contact", label: "Final Play" },
] as const;

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">Ahmad Fadly Muktafi - Fullstack Developer</h1>
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="grid min-h-dvh place-items-center border-b border-line"
        >
          <div className="text-center">
            <p className="font-mono text-xs text-dim">[{section.id}]</p>
            <p className="mt-2 text-2xl text-muted">{section.label}</p>
          </div>
        </section>
      ))}
    </main>
  );
}
