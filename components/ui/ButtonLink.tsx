import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "outline-dark" | "ghost" | "parrot";

const base =
  "group items-center justify-center gap-2.5 whitespace-nowrap px-6 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.14em] transition-[background-color,color,border-color,transform] duration-300 ease-out active:translate-y-px active:scale-[0.99]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#44d62c] text-[#111311] border border-[#44d62c] hover:bg-[#38be23] hover:border-[#38be23] hover:text-[#111311] dark:bg-[#44d62c] dark:text-[#111311] dark:border-[#44d62c] dark:hover:bg-[#38be23] dark:hover:border-[#38be23] dark:hover:text-[#111311] shadow-sm font-bold",
  parrot:
    "bg-[#44d62c] text-[#111311] border border-[#44d62c] hover:bg-[#38be23] hover:border-[#38be23] hover:text-[#111311] dark:bg-[#44d62c] dark:text-[#111311] dark:border-[#44d62c] dark:hover:bg-[#38be23] dark:hover:border-[#38be23] dark:hover:text-[#111311] shadow-sm font-bold",
  outline:
    "bg-[#44d62c] text-[#111311] border border-[#44d62c] hover:bg-[#38be23] hover:border-[#38be23] hover:text-[#111311] dark:bg-[#44d62c] dark:text-[#111311] dark:border-[#44d62c] dark:hover:bg-[#38be23] dark:hover:border-[#38be23] dark:hover:text-[#111311] shadow-sm font-bold",
  "outline-dark":
    "bg-[#44d62c] text-[#111311] border border-[#44d62c] hover:bg-[#38be23] hover:border-[#38be23] hover:text-[#111311] dark:bg-[#44d62c] dark:text-[#111311] dark:border-[#44d62c] dark:hover:bg-[#38be23] dark:hover:border-[#38be23] dark:hover:text-[#111311] shadow-sm font-bold",
  ghost: "text-[#44d62c] hover:text-[#38be23] px-0 font-bold",
};

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  icon?: boolean;
  onClick?: () => void;
}

export function ButtonLink({ href, children, variant = "primary", className, external, icon = true, onClick }: Props) {
  const hasDisplay = className && /\b(hidden|flex|inline-flex|block|inline-block)\b/.test(className);
  const displayClass = hasDisplay ? "" : "inline-flex";
  const cls = cn(base, displayClass, variants[variant], className);
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
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
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
