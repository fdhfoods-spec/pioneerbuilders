import { cn } from "@/lib/cn";

/** Marks content that is dummy / unverified so it can never be mistaken for fact. */
export function PlaceholderTag({
  children = "Placeholder",
  className,
  tone = "gold",
}: {
  children?: string;
  className?: string;
  tone?: "gold" | "cherry" | "forest" | "concrete" | "dark" | "light";
}) {
  const toneClasses = {
    gold: "border-gold/40 text-gold bg-gold/10",
    dark: "border-gold/40 text-gold bg-gold/10",
    cherry: "border-cherry/40 text-cherry-accent bg-cherry/10",
    forest: "border-forest/40 text-forest-accent bg-forest/10",
    light: "border-forest/40 text-forest-accent bg-forest/10",
    concrete: "border-concrete/40 text-concrete bg-concrete/10",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em]",
        toneClasses,
        className,
      )}
    >
      {children}
    </span>
  );
}
