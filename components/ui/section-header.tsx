type SectionHeaderProps = {
  heading: string;
  intro?: string;
  className?: string;
};

/**
 * Shared section header: headline + optional intro.
 * Deliberately minimal — no small uppercase eyebrow labels
 * (Visual-System §5.3: use them rarely).
 */
export function SectionHeader({ heading, intro, className }: SectionHeaderProps) {
  return (
    <header className={className}>
      <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-frost md:text-5xl">
        {heading}
      </h2>
      {intro ? (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {intro}
        </p>
      ) : null}
    </header>
  );
}
