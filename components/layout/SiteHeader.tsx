"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { company } from "@/content/company";
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

  // Solid surface once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll lock, Escape to close, focus trap while mobile menu is open
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const body = document.body;
    const prevRoot = root.style.overflow;
    const prevBody = body.style.overflow;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab") return;
      const focusables = [
        toggleRef.current,
        ...(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []),
      ].filter((el): el is HTMLElement => Boolean(el));
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

    // Auto-close if the viewport grows past the mobile breakpoint (1024px)
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    document.addEventListener("keydown", onKey);

    return () => {
      root.style.overflow = prevRoot;
      body.style.overflow = prevBody;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        open
          ? "border-b border-warm/10 bg-charcoal shadow-2xl"
          : scrolled
          ? "border-b border-warm/10 bg-charcoal/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-16 sm:h-[68px] lg:h-[76px] items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo */}
        <Link
          href="/"
          aria-label="Pioneer Builders, home"
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#44d62c]"
          onClick={() => open && close(false)}
        >
          <Logo />
        </Link>

        {/* Desktop Navigation (>= 1024px) */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-8 2xl:gap-9">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[0.76rem] xl:text-[0.82rem] font-semibold uppercase tracking-[0.14em] xl:tracking-[0.16em] transition-colors",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[#44d62c] after:transition-transform after:duration-300",
                      active
                        ? "text-[#44d62c] after:scale-x-100 font-bold"
                        : "text-warm/80 hover:text-warm hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />

          {/* Enquiry Button: visible on desktop (>= 1024px) */}
          <div className="hidden lg:block">
            <ButtonLink
              href={enquiryCta.href}
              variant="parrot"
              className="!py-2.5 !px-4 lg:!px-5 text-xs font-bold"
            >
              {enquiryCta.label}
            </ButtonLink>
          </div>

          {/* Hamburger Menu Toggle (mobile & tablet < 1024px) */}
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 sm:size-11 items-center justify-center border border-warm/25 bg-charcoal-2 text-warm transition-colors hover:border-[#44d62c] hover:text-[#44d62c] lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#44d62c] shrink-0"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? (
              <X aria-hidden className="size-5 transition-transform duration-200" />
            ) : (
              <Menu aria-hidden className="size-5 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={cn(
          "fixed inset-x-0 top-16 sm:top-[68px] h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-68px)] z-40 overflow-y-auto overscroll-contain bg-charcoal border-t border-warm/10 lg:hidden transition-all duration-300 ease-out",
          open
            ? "visible opacity-100 translate-y-0"
            : "invisible opacity-0 -translate-y-2 pointer-events-none",
        )}
      >
        <nav
          aria-label="Mobile"
          className="container-x flex min-h-full flex-col justify-between gap-8 py-6 pb-[calc(3rem+env(safe-area-inset-bottom,0px))]"
        >
          {/* Top In-Drawer Status & Close Control */}
          <div className="flex items-center justify-between pb-3 border-b border-warm/10">
            <span className="text-[0.68rem] uppercase tracking-widest text-concrete font-semibold">
              Navigation Menu
            </span>
            <button
              type="button"
              onClick={() => close(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-warm hover:text-[#44d62c] border border-warm/20 hover:border-[#44d62c] transition-colors"
              aria-label="Close menu"
            >
              <X className="size-3.5" />
              <span>Close</span>
            </button>
          </div>

          {/* Main Navigation Links */}
          <ul className="flex flex-col divide-y divide-warm/10">
            {mainNav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => close(false)}
                    className={cn(
                      "group flex items-center justify-between py-4 sm:py-5 font-display text-2xl sm:text-3xl font-semibold tracking-tight transition-colors",
                      active ? "text-[#44d62c]" : "text-warm hover:text-[#44d62c]",
                    )}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-xs font-medium tracking-[0.2em] text-concrete">
                        0{i + 1}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className={cn(
                        "size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                        active ? "text-[#44d62c] opacity-100" : "text-concrete opacity-60",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick Info & Actions Area */}
          <div className="flex flex-col gap-4 pt-4">
            {/* Architectural benchmark card with consistent journey data */}
            <div className="flex items-center justify-between border border-warm/15 bg-charcoal-2 px-4 py-3 text-xs text-concrete uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-forest animate-pulse" aria-hidden />
                <span>Est. {company.established} • Coimbatore</span>
              </span>
              <span className="text-[#44d62c] font-semibold">Base: Bangalore</span>
            </div>

            {/* Theme Toggle in drawer */}
            <div className="flex items-center justify-between border border-warm/15 p-4 bg-charcoal-2">
              <span className="text-xs uppercase tracking-widest text-concrete font-semibold">
                Theme Appearance
              </span>
              <ThemeToggle showLabel />
            </div>

            {/* Quick Connect (Instagram, Email, YouTube) */}
            <div className="flex items-center justify-around border border-warm/15 bg-charcoal-2 px-3 py-2.5 text-xs text-warm/80">
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors font-medium"
              >
                Instagram
              </a>
              <span className="text-warm/25">•</span>
              <a
                href={`mailto:${company.contact.email}`}
                className="hover:text-gold transition-colors font-medium"
              >
                Email
              </a>
              <span className="text-warm/25">•</span>
              <a
                href={company.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors font-medium"
              >
                YouTube
              </a>
            </div>

            {/* Full-width CTA */}
            <ButtonLink
              href={enquiryCta.href}
              variant="parrot"
              className="w-full text-center font-bold !py-3.5"
              onClick={() => close(false)}
            >
              {enquiryCta.label}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
