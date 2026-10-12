"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");

    const observer = new MutationObserver(() => {
      const currentLight = document.documentElement.classList.contains("light");
      setTheme(currentLight ? "light" : "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    const root = document.documentElement;
    if (nextTheme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      try {
        localStorage.setItem("pb-theme", "light");
      } catch {}
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("pb-theme", "dark");
      } catch {}
    }
  };

  const isLight = mounted && theme === "light";
  const label = isLight ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 border border-warm/20 bg-charcoal-2 text-warm transition-[background-color,border-color,color] duration-300 hover:border-gold hover:text-gold active:translate-y-px",
        showLabel ? "px-3.5 py-2 text-xs uppercase tracking-wider" : "size-10 sm:size-11 shrink-0",
        className,
      )}
    >
      {isLight ? (
        <Moon aria-hidden className="size-4 sm:size-4.5 transition-transform duration-300 group-hover:rotate-12" />
      ) : (
        <Sun aria-hidden className="size-4 sm:size-4.5 transition-transform duration-300 group-hover:rotate-45" />
      )}
      {showLabel && (
        <span className="font-semibold">{isLight ? "Dark Mode" : "Light Mode"}</span>
      )}
    </button>
  );
}
