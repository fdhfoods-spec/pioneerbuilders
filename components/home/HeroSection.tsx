"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
      className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-charcoal pt-24 lg:pt-32"
    >
      {/* Layer 1: Background Atmospheric Sky Canvas */}
      <div
        data-hero-layer="sky"
        className="absolute -inset-y-[12%] inset-x-0 z-0 bg-gradient-to-b from-[var(--hero-sky-from,#161a16)] via-charcoal to-charcoal pointer-events-none"
      />

      {/* Layer 2: Main Structural & Crane Silhouette */}
      <div
        data-hero-layer="crane"
        className="absolute -inset-y-[15%] inset-x-0 z-0 opacity-40 pointer-events-none"
      >
        <Image
          src="/images/placeholders/crane-site.svg"
          alt="Architectural construction site rendering"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/50 to-transparent" />
      </div>

      {/* Layer 3: Foreground Blueprint Grid & Alignment Geometry */}
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

      {/* Layer 4: Stable Typography & Action Layer */}
      <div
        data-hero-layer="content"
        className="container-x relative z-10 my-auto py-12 lg:py-16"
      >
        <div className="max-w-4xl">
          <p
            data-hero-in
            className="eyebrow mb-6 flex items-center gap-3 text-gold"
          >
            <span aria-hidden className="h-px w-8 bg-gold" />
            Civil Construction Since {company.established}
          </p>

          <h1
            data-hero-in
            className="display-hero text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-warm leading-[0.98]"
          >
            BUILDING WITH EXPERIENCE.
            <br />
            <span className="text-warm/90">CREATING WHAT LASTS.</span>
          </h1>

          <p
            data-hero-in
            className="mt-6 max-w-xl text-base sm:text-lg text-warm/75 font-sans leading-relaxed"
          >
            A construction company with a legacy dating back to {company.established}, focused on
            creating spaces and structures for the future.
          </p>

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
      </div>

      {/* Bottom Architectural Anchor Strip */}
      <div className="relative z-10 border-t border-warm/15 bg-charcoal/80 backdrop-blur-sm">
        <div className="container-x py-4 sm:py-5 flex flex-wrap items-center justify-between gap-4 text-xs tracking-wider text-concrete">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 font-semibold uppercase text-gold">
              <span className="size-2 rounded-full bg-forest animate-pulse" aria-hidden />
              HQ Bangalore
            </span>
            <span className="hidden sm:inline text-warm/40">•</span>
            <span className="hidden sm:inline uppercase text-concrete">Civil Engineering Excellence</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 border border-cherry/40 bg-cherry/15 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-[#d96677] dark:text-[#f3a4af]">
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
