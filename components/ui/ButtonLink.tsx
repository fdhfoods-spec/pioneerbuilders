import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "outline-dark" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap px-6 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.14em] transition-[background-color,color,border-color,transform] duration-300 ease-out active:translate-y-px active:scale-[0.99]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#111311] text-[#f5f2eb] border border-[#111311] hover:bg-[#705314] hover:border-[#705314] hover:text-[#ffffff] dark:bg-gold dark:text-[#111311] dark:border-gold dark:hover:bg-[#f5f2eb] dark:hover:border-[#f5f2eb] dark:hover:text-[#111311]",
  outline:
    "border border-warm/40 text-warm hover:border-warm hover:bg-[#111311] hover:text-[#f5f2eb] dark:hover:bg-warm dark:hover:text-[#111311]",
  "outline-dark":
    "border border-warm/60 text-warm hover:border-warm hover:bg-[#111311] hover:text-[#f5f2eb] dark:hover:bg-warm dark:hover:text-[#111311]",
  ghost: "text-warm hover:text-gold px-0",
};

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  icon?: boolean;
}

export function ButtonLink({ href, children, variant = "primary", className, external, icon = true }: Props) {
  const cls = cn(base, variants[variant], className);
  const inner = (
    <>
      {children}
      {icon && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** A non-interactive button shown when a destination (e.g. WhatsApp) has not been configured. */
export function DisabledButton({ children, reason, className }: { children: ReactNode; reason: string; className?: string }) {
  return (
    <span className="inline-flex flex-col items-start gap-1.5">
      <span
        role="link"
        aria-disabled="true"
        className={cn(base, "cursor-not-allowed border border-warm/20 text-warm/45", className)}
      >
        {children}
      </span>
      <span className="text-xs text-concrete">{reason}</span>
    </span>
  );
}
