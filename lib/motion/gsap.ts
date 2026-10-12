import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins exactly once, on the client only. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return { gsap, ScrollTrigger };
  gsap.registerPlugin(ScrollTrigger);
  // Never fight the browser's own scroll restoration / native scrolling.
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
  return { gsap, ScrollTrigger };
}

export const MQ = {
  /** Motion is allowed. */
  motion: "(prefers-reduced-motion: no-preference)",
  /** Motion allowed and viewport wide enough for pinned scenes. */
  desktopMotion: "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
  /** Motion allowed on tablet and up (used for image parallax). */
  tabletMotion: "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
} as const;

export { gsap, ScrollTrigger };
