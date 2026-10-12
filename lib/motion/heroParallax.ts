import { gsap } from "./gsap";

/**
 * Layered Hero Parallax and Entrance System.
 *
 * Implements architectural depth with controlled, restrained motion:
 * - Entrance reveal on mount (headline, eyebrow, subtext, CTAs)
 * - Multi-layer scroll parallax:
 *   1. [data-hero-layer="sky"] -> slow background travel (14%)
 *   2. [data-hero-layer="crane"] -> medium structure/crane silhouette travel (26%)
 *   3. [data-hero-layer="geometry"] -> subtle foreground structural lines (8%)
 *   4. [data-hero-layer="content"] -> stable headline block, gentle fade on exit
 *
 * Scoped inside gsap.context/matchMedia for automatic cleanup and reduced-motion safety.
 */
export function initHeroParallax(root: HTMLElement) {
  const sky = root.querySelector<HTMLElement>('[data-hero-layer="sky"]');
  const crane = root.querySelector<HTMLElement>('[data-hero-layer="crane"]');
  const geometry = root.querySelector<HTMLElement>('[data-hero-layer="geometry"]');
  const content = root.querySelector<HTMLElement>('[data-hero-layer="content"]');
  const heroElements = root.querySelectorAll<HTMLElement>("[data-hero-in]");

  // 1. Entrance choreography
  if (heroElements.length > 0) {
    gsap.fromTo(
      heroElements,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      },
    );
  }

  // 2. Controlled scroll parallax
  const scrollConfig = {
    trigger: root,
    start: "top top",
    end: "bottom top",
    scrub: 0.5,
  };

  if (sky) {
    gsap.to(sky, { yPercent: 14, ease: "none", scrollTrigger: scrollConfig });
  }

  if (crane) {
    gsap.to(crane, { yPercent: 26, ease: "none", scrollTrigger: scrollConfig });
  }

  if (geometry) {
    gsap.to(geometry, { yPercent: 8, ease: "none", scrollTrigger: scrollConfig });
  }

  if (content) {
    gsap.to(content, {
      opacity: 0.25,
      y: -32,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "35% top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}
