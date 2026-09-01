import type { ComponentPropsWithoutRef } from "react";

/**
 * MagneticButton — static base version (Phase 2A).
 * Magnetic hover physics arrive in Phase 2K; the API already
 * accepts them so call sites will not change.
 *
 * Visual-System §9.3:
 * - full pill shape
 * - primary: accent background + dark text
 * - secondary: dark surface + muted line
 * - trailing icon sits in its own circular island
 */

type CommonProps = {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  children: React.ReactNode;
};

type LinkProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & {
    href: string;
  };

const baseClasses =
  "group inline-flex min-h-11 items-center gap-3 rounded-full px-5 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 ease-snap active:scale-[0.98]";

const variantClasses: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-accent text-bg hover:bg-accent/90",
  secondary:
    "border border-line bg-surface text-frost hover:border-line-strong hover:bg-raised",
};

const islandClasses: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-black/15 text-bg",
  secondary: "bg-raised text-muted group-hover:text-frost",
};

export function MagneticButton({
  variant = "primary",
  icon,
  children,
  className,
  ...props
}: LinkProps) {
  return (
    <a
      className={`${baseClasses} ${variantClasses[variant]} ${className ?? ""}`}
      {...props}
    >
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden="true"
          className={`grid size-7 place-items-center rounded-full transition-transform duration-200 ease-snap group-hover:translate-x-0.5 ${islandClasses[variant]}`}
        >
          {icon}
        </span>
      ) : null}
    </a>
  );
}
