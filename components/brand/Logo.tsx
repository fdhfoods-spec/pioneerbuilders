import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface LogoMarkProps {
  className?: string;
  /** "light" = letters in warm white; "dark" = letters in charcoal; "auto" = adapts to current theme via currentColor. */
  tone?: "light" | "dark" | "auto";
  title?: string;
}

/**
 * PB lettermark built from squared, chamfered structural geometry
 * (columns, beams, a foundation line). Filled shapes only, no hairlines,
 * so it survives at favicon size. Vector, transparent background.
 */
export function LogoMark({ className, tone = "auto", title }: LogoMarkProps) {
  const ink = tone === "light" ? "#F5F2EB" : tone === "dark" ? "#111311" : "currentColor";
  return (
    <svg
      viewBox="0 0 72 68"
      className={cn("h-9 w-auto text-warm", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {/* P */}
      <path
        fill={ink}
        fillRule="evenodd"
        d="M4 6H28L38 16V30L28 40H14V58H4ZM14 16V30H25L28 27V19L25 16Z"
      />
      {/* B */}
      <path
        fill={ink}
        fillRule="evenodd"
        d="M42 6H62L70 14V27L65 32L70 37V50L62 58H42ZM52 16V27H59L61 25V18L59 16ZM52 37V48H59L61 46V39L59 37Z"
      />
      {/* Foundation line (Gold beam with Forest Green structural benchmark datum) */}
      <rect x="4" y="62" width="56" height="3.5" fill="var(--color-gold, #D4AF62)" />
      <rect x="62" y="62" width="8" height="3.5" fill="var(--color-forest, #1D4938)" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  tone?: "light" | "dark" | "auto";
  /** Hide the wordmark and show only the mark. */
  markOnly?: boolean;
}

/** Mark + HTML wordmark (uses the site's display font) + "SINCE 1987". */
export function Logo({ className, tone = "auto", markOnly = false }: LogoProps): ReactNode {
  const text = tone === "dark" ? "text-[#111311]" : tone === "light" ? "text-[#f5f2eb]" : "text-warm";
  return (
    <span className={cn("inline-flex items-center gap-2 sm:gap-3", className)}>
      <LogoMark tone={tone} />
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span
            className={cn("font-display text-[0.92rem] sm:text-[1.05rem] font-bold uppercase tracking-[0.05em] sm:tracking-[0.06em]", text)}
            style={{ fontVariationSettings: '"wdth" 112' }}
          >
            Pioneer Builders
          </span>
          <span className="mt-1 flex items-center text-[0.6rem] sm:text-[0.62rem] font-semibold uppercase tracking-[0.28em] sm:tracking-[0.34em] text-gold">
            <span className="inline-block size-1.5 rounded-full bg-cherry mr-1.5 shrink-0" aria-hidden />
            Since 1987
          </span>
        </span>
      )}
    </span>
  );
}
