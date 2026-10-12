import { gsap } from "./gsap";

/**
 * Scroll-triggered reveals for any element carrying `data-reveal`.
 *   data-reveal            fade + rise
 *   data-reveal="image"    clip-path wipe (+ slight settle on the media inside)
 *   data-delay="0.15"      optional delay in seconds
 *
 * Must be called inside gsap.context()/matchMedia() so everything reverts on cleanup.
 * Uses transforms, opacity and clip-path only: no layout shift.
 */
export function initReveals(root: ParentNode = document) {
  const els = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-reveal]"));

  els.forEach((el) => {
    const delay = Number(el.dataset.delay ?? 0);
    const trigger = { trigger: el, start: "top 90%", once: true } as const;

    if (el.dataset.reveal === "image") {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "power3.inOut", delay, scrollTrigger: trigger },
      );
      const media = el.querySelector<HTMLElement>("img, svg, [data-reveal-media]");
      if (media) {
        gsap.fromTo(
          media,
          { scale: 1.12 },
          { scale: 1, duration: 1.8, ease: "power2.out", delay, scrollTrigger: trigger },
        );
      }
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay, scrollTrigger: trigger },
    );
  });
}
