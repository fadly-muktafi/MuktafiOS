import type { ReactNode } from "react";

type BezelPanelProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

/**
 * BezelPanel — double-bezel surface (Visual-System §7.2).
 * Outer metal shell with a hairline highlight + darker inner core.
 * Reserved for major panels: tactical court frame, play sheet,
 * command palette, module detail, contact panel.
 */
export function BezelPanel({
  children,
  className = "",
  innerClassName = "",
}: BezelPanelProps) {
  return (
    <div
      className={`rounded-panel border border-line bg-metal p-2 shadow-[inset_0_1px_0_rgba(244,247,245,0.06)] ${className}`}
    >
      <div
        className={`h-full rounded-inner border border-line bg-raised shadow-[inset_0_1px_0_rgba(244,247,245,0.04)] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
