import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: ReactNode;
  eyebrow?: string;
  children?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
  /** Max width of the whole block. */
  maxWidth?: string;
}

/** Stacked heading block (eyebrow optional, used sparingly). */
export function SectionHeading({ title, eyebrow, children, tone = "dark", className, as: Tag = "h2", maxWidth = "max-w-3xl" }: SectionHeadingProps) {
  return (
    <div className={cn(maxWidth, className)}>
      {eyebrow && (
        <p
          data-reveal
          className={cn("eyebrow mb-5 flex items-center gap-4", tone === "dark" ? "text-gold" : "text-forest")}
        >
          <span aria-hidden className="h-px w-10 bg-current" />
          {eyebrow}
        </p>
      )}
      <Tag data-reveal data-delay={eyebrow ? 0.08 : 0} className={cn("display-h2", tone === "dark" ? "text-warm" : "text-charcoal")}>
        {title}
      </Tag>
      {children && (
        <div
          data-reveal
          data-delay={0.16}
          className={cn("mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed", tone === "dark" ? "text-warm/72" : "text-charcoal/75")}
        >
          {children}
        </div>
      )}
    </div>
  );
}
