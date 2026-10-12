import { gsap } from "./gsap";

/**
 * Subtle image parallax. Markup contract (see <ParallaxImage />):
 *   <div class="relative overflow-hidden">                     <- frame (trigger)
 *     <div data-parallax data-speed="0.06" class="absolute inset-x-0 -inset-y-[8%]"> <- media layer
 * The media layer is taller than the frame so it never exposes an edge.
 * `speed` is a fraction of the layer height; keep it <= 0.07.
 */
export function initParallax(root: ParentNode = document) {
  const layers = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-parallax]"));

  layers.forEach((layer) => {
    const speed = Math.min(Number(layer.dataset.speed ?? 0.05), 0.07);
    gsap.fromTo(
      layer,
      { yPercent: -speed * 100 },
      {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: layer.parentElement ?? layer,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}
