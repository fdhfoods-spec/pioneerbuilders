"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { testimonials, Testimonial } from "@/content/testimonials";
import { ArrowLeft, ArrowRight, Quote, Star, MapPin, Building } from "lucide-react";

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const total = testimonials.length;

  // Dynamically calculate visible cards count based on viewport width:
  // Desktop (>= 1024px): 3 cards visible
  // Tablet (>= 640px): 2 cards visible
  // Mobile (< 640px): 1 card visible
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, total - visibleCount);

  // If resize reduced maxIndex below currentIndex, clamp it
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Automatic fancy carousel timer (4.8s per advance)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4800);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Touch swipe gesture support for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches && e.touches.length > 0 && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
      touchDeltaX.current = 0;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null && e.touches && e.touches.length > 0 && e.touches[0]) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };

  const onTouchEnd = () => {
    if (touchStartX.current !== null) {
      if (touchDeltaX.current < -40) {
        handleNext();
      } else if (touchDeltaX.current > 40) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Step translation: 100% / visibleCount per card advance
  const stepPercent = 100 / visibleCount;
  const translateX = currentIndex * stepPercent;

  return (
    <div
      className="relative w-full"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Client Testimonials Carousel"
    >

      {/* Multi-Card Carousel Track Container */}
      <div className="relative overflow-hidden p-1 sm:p-2 -mx-2 sm:-mx-3">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: `translateX(-${translateX}%)`,
          }}
        >
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-2 sm:px-3 flex flex-col"
              aria-hidden={idx < currentIndex || idx >= currentIndex + visibleCount}
            >
              <TestimonialCard
                item={item}
                isActive={idx >= currentIndex && idx < currentIndex + visibleCount}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation & Progress Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-warm/15 pt-6">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`group relative h-2 transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-8 sm:w-10 bg-[#44d62c] shadow-[0_0_12px_rgba(68,214,44,0.5)]"
                    : "w-2 sm:w-2.5 bg-warm/25 hover:bg-warm/50"
                }`}
              >
                <span className="sr-only">Slide {idx + 1}</span>
              </button>
            );
          })}
          <span className="ml-3 font-mono text-xs text-concrete">
            0{currentIndex + 1} <span className="text-warm/30">/</span> 0{maxIndex + 1}
          </span>
        </div>

        {/* Arrow Controls & Auto-play status */}
        <div className="flex items-center gap-3">
          <span className="text-[0.68rem] uppercase font-mono tracking-wider text-concrete mr-2 hidden sm:inline">
            {isPaused ? "Paused" : "Auto-playing"}
          </span>

          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="group flex size-10 sm:size-11 items-center justify-center border border-warm/20 bg-charcoal/80 text-warm backdrop-blur-md transition-all duration-200 hover:border-[#44d62c] hover:bg-charcoal hover:text-[#44d62c] active:scale-95"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="group flex size-10 sm:size-11 items-center justify-center border border-warm/20 bg-charcoal/80 text-warm backdrop-blur-md transition-all duration-200 hover:border-[#44d62c] hover:bg-charcoal hover:text-[#44d62c] active:scale-95"
          >
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact Frosted Glass Card with Hover Glare:
 * Tailored for a multi-card row (minimum 3 cards visible simultaneously on desktop).
 */
function TestimonialCard({ item, isActive }: { item: Testimonial; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden transition-all duration-500 rounded-none w-full h-full
        border border-warm/20 bg-charcoal/75 backdrop-blur-xl
        p-5 sm:p-6 lg:p-6
        shadow-[0_8px_30px_rgba(0,0,0,0.32)]
        hover:border-warm/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.48)]
        flex flex-col justify-between min-h-[360px]
        ${isActive ? "opacity-100" : "opacity-75"}
      `}
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
    >
      {/* Glass gradient highlight sheen */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/20 pointer-events-none"
      />

      {/* Dynamic Hover Glare: Follows mouse cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `
            radial-gradient(
              320px circle at var(--mouse-x) var(--mouse-y),
              rgba(255, 255, 255, 0.12),
              transparent 70%
            ),
            radial-gradient(
              180px circle at var(--mouse-x) var(--mouse-y),
              rgba(68, 214, 44, 0.12),
              transparent 60%
            )
          `,
        }}
      />

      {/* Card Header: Discipline, Location, and 5-Star Rating */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 border border-forest/40 bg-forest/20 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-forest-accent truncate">
            <Building className="size-2.5 shrink-0" />
            <span className="truncate">{item.discipline}</span>
          </span>

          {/* 5 Architectural Grade Stars */}
          <div className="flex items-center gap-0.5 shrink-0" aria-label="5 star rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-3 fill-gold text-gold shrink-0" />
            ))}
          </div>
        </div>

        <div className="text-xs text-gold/90 font-medium flex items-center gap-1">
          <MapPin className="size-3 shrink-0 text-gold" />
          <span className="truncate">{item.location}</span>
        </div>
      </div>

      {/* Quote Body with Architectural Icon */}
      <div className="relative z-10 my-4 flex-grow flex flex-col justify-start">
        <Quote className="size-5 text-gold/30 mb-2 shrink-0" aria-hidden="true" />
        <blockquote className="text-xs sm:text-[0.82rem] lg:text-[0.84rem] text-warm/90 leading-relaxed font-sans font-normal italic">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      </div>

      {/* Card Footer: Client Identity & Project Scope */}
      <div className="relative z-10 pt-4 border-t border-warm/15 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <h4 className="font-display font-bold text-sm sm:text-base text-warm tracking-tight truncate">
            {item.name}
          </h4>
          <p className="text-[0.68rem] text-concrete mt-0.5 truncate">{item.role}</p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[0.58rem] font-mono uppercase tracking-wider text-concrete block">
            Scope
          </span>
          <span className="text-[0.7rem] font-semibold text-warm/90">
            {item.projectType.length > 20 ? item.projectType.slice(0, 18) + "…" : item.projectType}
          </span>
        </div>
      </div>
    </div>
  );
}
