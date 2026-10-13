"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { company } from "@/content/company";
import { MQ, gsap, registerGsap } from "@/lib/motion/gsap";
import { initHeroParallax } from "@/lib/motion/heroParallax";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    registerGsap();
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      initHeroParallax(root);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-charcoal pt-20 sm:pt-24 lg:pt-28"
    >
      {/* Layer 1: Background Atmospheric Sky Canvas */}
      <div
        data-hero-layer="sky"
        className="absolute -inset-y-[12%] inset-x-0 z-0 bg-gradient-to-b from-[var(--hero-sky-from,#161a16)] via-charcoal to-charcoal pointer-events-none"
      />

      {/* Layer 2: Subtle Foreground Blueprint Grid & Alignment Geometry */}
      <div
        data-hero-layer="geometry"
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none bg-blueprint opacity-60"
      >
        <div className="container-x h-full flex justify-between">
          <div className="w-px h-full bg-warm/5" />
          <div className="w-px h-full bg-warm/5 hidden md:block" />
          <div className="w-px h-full bg-warm/5" />
        </div>
      </div>

      {/* Layer 3: Main Architectural 2-Column Hero Grid */}
      <div
        data-hero-layer="content"
        className="container-x relative z-10 my-auto py-10 lg:py-16"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14 lg:items-center">
          {/* Left Column: Typography, Story, Metric Badges & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p
              data-hero-in
              className="eyebrow mb-5 sm:mb-6 flex items-center gap-3 text-gold"
            >
              <span aria-hidden className="h-px w-8 bg-gold" />
              Civil Construction Since {company.established}
            </p>

            <h1
              data-hero-in
              className="display-hero text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] tracking-tight text-warm leading-[0.98]"
            >
              BUILDING WITH EXPERIENCE.
              <br />
              <span className="text-warm/90">CREATING WHAT LASTS.</span>
            </h1>

            <p
              data-hero-in
              className="mt-6 max-w-xl text-base sm:text-lg text-warm/75 font-sans leading-relaxed"
            >
              Founded in Coimbatore in 1987, Pioneer Builders has grown through decades of hands-on construction experience. From our beginnings in Coimbatore to approximately 25 years of work in Chennai and our present base in Bangalore, our journey reflects a lasting commitment to structural quality, engineering discipline, and dependable execution.
            </p>

            {/* Architectural Trust Datum Metrics */}
            <div
              data-hero-in
              className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 border-y border-warm/15 py-4 max-w-xl"
            >
              <div className="min-w-0">
                <span className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-gold block leading-tight tracking-tight tabular-nums">
                  35+
                </span>
                <span className="text-[0.68rem] uppercase tracking-wider text-concrete font-medium block mt-0.5 truncate">
                  Years Heritage
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-forest-accent block leading-tight tracking-tight tabular-nums">
                  10+
                </span>
                <span className="text-[0.68rem] uppercase tracking-wider text-concrete font-medium block mt-0.5 truncate">
                  Work Categories
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-cherry-accent block leading-tight tracking-tight tabular-nums">
                  100+
                </span>
                <span className="text-[0.68rem] uppercase tracking-wider text-concrete font-medium block mt-0.5 truncate">
                  Projects Delivered
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div
              data-hero-in
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <ButtonLink href="/projects/" variant="primary">
                Explore Projects
              </ButtonLink>
              <ButtonLink href="/contact/" variant="outline">
                Discuss Your Project
              </ButtonLink>
            </div>
          </div>

          {/* Right Column: Architectural Hero Building Showcase */}
          <div className="lg:col-span-5" data-hero-in>
            <div className="relative group mx-auto w-full max-w-lg lg:max-w-none">
              {/* Outer Architectural Framing Accents */}
              <div
                aria-hidden
                className="absolute -inset-2 border border-warm/10 pointer-events-none hidden sm:block"
              />
              <div
                aria-hidden
                className="absolute -top-3 -left-3 size-6 border-t-2 border-l-2 border-gold pointer-events-none z-20"
              />
              <div
                aria-hidden
                className="absolute -bottom-3 -right-3 size-6 border-b-2 border-r-2 border-gold pointer-events-none z-20"
              />

              {/* Main Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] xl:aspect-[5/6] w-full overflow-hidden border border-warm/20 bg-charcoal-2 shadow-2xl">
                <Image
                  src="/images/hero/hero-building.jpg"
                  alt="Pioneer Builders signature contemporary civil architectural building"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80" />

                {/* Top architectural stamp */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-widest text-warm z-10">
                  <span className="inline-flex items-center gap-1.5 border border-warm/20 bg-charcoal/80 px-2.5 py-1 backdrop-blur-md">
                    <span className="size-1.5 rounded-full bg-forest animate-pulse" aria-hidden />
                    Civil Engineering
                  </span>
                  <span className="border border-warm/20 bg-charcoal/80 px-2 py-1 backdrop-blur-md text-gold">
                    Est. 1987
                  </span>
                </div>

                {/* Bottom glassmorphic architectural card */}
                <div className="absolute bottom-4 left-4 right-4 border border-warm/20 bg-charcoal/90 p-4 sm:p-5 backdrop-blur-md z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] uppercase tracking-widest text-gold font-bold">
                      Flagship Civil Architecture
                    </span>
                    <span className="text-[0.65rem] text-concrete font-mono">12.97° N, 77.59° E</span>
                  </div>
                  <h3 className="display-h3 text-warm text-lg sm:text-xl mt-1 group-hover:text-gold transition-colors flex items-center justify-between">
                    <span>Engineered for Permanence</span>
                    <ArrowUpRight className="size-4 text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <div className="mt-2.5 pt-2 border-t border-warm/15 flex items-center justify-between text-[0.65rem] text-concrete uppercase tracking-wider">
                    <span>Concrete • Steel • Glass</span>
                    <span className="text-forest-accent font-semibold">Bangalore HQ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Anchor Strip */}
      <div className="relative z-10 border-t border-warm/15 bg-charcoal/80 backdrop-blur-sm">
        <div className="container-x py-3 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs tracking-wider text-concrete">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-2 font-semibold uppercase text-gold">
              <span className="size-2 rounded-full bg-forest animate-pulse" aria-hidden />
              HQ Bangalore
            </span>
            <span className="hidden sm:inline text-warm/40">•</span>
            <span className="hidden sm:inline uppercase text-concrete">Civil Engineering Excellence</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="inline-flex items-center gap-1.5 border border-cherry/40 bg-cherry/15 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-cherry-accent">
              <span className="size-1.5 rounded-full bg-cherry" aria-hidden />
              Est. {company.established}
            </span>
            <span className="text-warm/40">•</span>
            <span className="uppercase text-warm/80">Residential &amp; Commercial Scale</span>
          </div>
        </div>
      </div>
    </section>
  );
}
