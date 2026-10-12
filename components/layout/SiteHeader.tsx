"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { enquiryCta, mainNav } from "@/content/navigation";
import { cn } from "@/lib/cn";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Solid surface once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll lock, Escape to close, focus trap while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab") return;
      const focusables = [toggleRef.current, ...(menuRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [])].filter(
        (el): el is HTMLElement => Boolean(el),
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // Close if the viewport grows past the mobile breakpoint.
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-warm/10 bg-charcoal/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-[68px] items-center justify-between gap-6 lg:h-[76px]">
        <Link href="/" aria-label="Pioneer Builders, home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300",
                      active ? "text-gold after:scale-x-100" : "text-warm/80 hover:text-warm hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ButtonLink href={enquiryCta.href} className="hidden !py-2.5 sm:inline-flex">
            {enquiryCta.label}
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 sm:size-11 items-center justify-center border border-warm/25 text-warm transition-colors hover:border-gold hover:text-gold lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close(false) : setOpen(true))}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto bg-charcoal lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col justify-between gap-10 py-10">
          <ul className="flex flex-col">
            {mainNav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-warm/10">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 py-5 font-display text-3xl font-semibold tracking-tight",
                      active ? "text-gold" : "text-warm",
                    )}
                  >
                    <span className="text-xs font-medium tracking-[0.2em] text-concrete">0{i + 1}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border border-warm/15 p-4 bg-charcoal-2">
              <span className="text-xs uppercase tracking-widest text-concrete font-semibold">Theme Appearance</span>
              <ThemeToggle showLabel />
            </div>
            <ButtonLink href={enquiryCta.href} className="w-full">
              {enquiryCta.label}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
