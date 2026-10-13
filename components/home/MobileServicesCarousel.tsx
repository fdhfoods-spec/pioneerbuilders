"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";

interface Props {
  services: Service[];
}

export function MobileServicesCarousel({ services }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : 1;
    const gap = 16;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(newIndex, 0), services.length - 1));
  }, [services.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const children = el.children;
    if (children[index]) {
      (children[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handlePrev = () => {
    scrollToIndex(Math.max(activeIndex - 1, 0));
  };

  const handleNext = () => {
    scrollToIndex(Math.min(activeIndex + 1, services.length - 1));
  };

  return (
    <div className="md:hidden relative w-full overflow-hidden">
      {/* Horizontal Swipeable Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-1 no-scrollbar touch-pan-x"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {services.map((service, i) => {
          const isArch = service.slug === "architectural-design";

          const sectorTheme = isArch
            ? {
                badge: "border-[#44d62c]/40 text-[#44d62c] bg-[#44d62c]/10",
                dot: "bg-[#44d62c]",
                hover: "border-[#44d62c]/60",
                label: "Architecture",
              }
            : service.slug === "hospitals" || service.slug === "public"
            ? {
                badge: "border-forest/40 text-forest-accent bg-forest/15",
                dot: "bg-forest",
                hover: "border-forest/60",
                label: service.slug === "hospitals" ? "Healthcare" : "Civic",
              }
            : service.slug === "industrial"
            ? {
                badge: "border-concrete/40 text-concrete bg-concrete/15",
                dot: "bg-concrete",
                hover: "border-concrete/60",
                label: "Industrial",
              }
            : service.slug === "group-housing" || service.slug === "apartments"
            ? {
                badge: "border-cherry/40 text-cherry-accent bg-cherry/15",
                dot: "bg-cherry",
                hover: "border-cherry/60",
                label: "Multi-Unit",
              }
            : {
                badge: "border-gold/40 text-gold bg-gold/15",
                dot: "bg-gold",
                hover: "border-gold/60",
                label: "Residential",
              };

          return (
            <div
              key={service.slug}
              className={`w-[84vw] max-w-[340px] shrink-0 snap-center flex flex-col justify-between border border-warm/15 bg-charcoal-2 p-6 transition-colors duration-300 relative ${sectorTheme.hover}`}
            >
              {/* Top Accent Indicator */}
              <div className={`absolute top-0 inset-x-0 h-0.5 ${sectorTheme.dot}`} />

              <div>
                <div className="flex items-center justify-between text-xs text-concrete uppercase tracking-widest mb-4">
                  <span className="font-semibold text-gold">0{i + 1}</span>
                  <span
                    className={`inline-flex items-center gap-1.5 border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${sectorTheme.badge}`}
                  >
                    <span className={`size-1.5 rounded-full ${sectorTheme.dot}`} aria-hidden />
                    {sectorTheme.label}
                  </span>
                </div>

                {/* Thumbnail Visual */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-warm/10 mb-5 bg-charcoal">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="85vw"
                    className="object-cover"
                  />
                </div>

                {service.headline && (
                  <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-gold mb-1">
                    {service.headline}
                  </p>
                )}

                <h3 className="font-display font-semibold text-xl text-warm tracking-tight">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs text-warm/75 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-warm/10 flex items-center justify-between">
                <span className="text-[0.68rem] text-concrete line-clamp-1 max-w-[55%]">
                  {service.scope[0]}
                </span>
                <Link
                  href={isArch ? "/contact/" : `/services/#${service.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#44d62c] hover:underline"
                >
                  {service.cta ?? "View Scope"}
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Restrained Carousel Controls & Pagination Dots */}
      <div className="flex items-center justify-between pt-4 px-1">
        {/* Subtle Counter */}
        <span className="text-xs font-mono text-concrete uppercase tracking-wider">
          0{activeIndex + 1} / 0{services.length}
        </span>

        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Services carousel slides">
          {services.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => scrollToIndex(idx)}
              className={`size-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-6 bg-[#44d62c]"
                  : "bg-warm/25 hover:bg-warm/50"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next Nav Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous service"
            disabled={activeIndex === 0}
            onClick={handlePrev}
            className="flex size-8 items-center justify-center border border-warm/20 bg-charcoal text-warm disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#44d62c] hover:text-[#44d62c] transition-colors"
          >
            <ArrowLeft className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label="Next service"
            disabled={activeIndex === services.length - 1}
            onClick={handleNext}
            className="flex size-8 items-center justify-center border border-warm/20 bg-charcoal text-warm disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#44d62c] hover:text-[#44d62c] transition-colors"
          >
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
