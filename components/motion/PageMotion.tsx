"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MQ, ScrollTrigger, gsap, registerGsap } from "@/lib/motion/gsap";
import { initReveals } from "@/lib/motion/reveals";
import { initParallax } from "@/lib/motion/parallax";

/**
 * Orchestrates the generic, page-level motion (reveals + image parallax).
 * Scene-specific motion (hero, blueprint, process) lives in its own component.
 *
 * - Re-initialises on every route change and fully reverts on cleanup, so
 *   triggers are never duplicated (also safe under React strict-mode double effects).
 * - Everything sits inside gsap.matchMedia(): with prefers-reduced-motion,
 *   nothing is created and content simply stays visible.
 * - If anything throws, the `motion-ok` class is removed so content can't stay hidden.
 */
export function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    registerGsap();
    const mm = gsap.matchMedia();

    try {
      mm.add(MQ.motion, () => {
        initReveals(document);
      });
      mm.add(MQ.tabletMotion, () => {
        initParallax(document);
      });
    } catch (error) {
      console.error("[PageMotion] motion disabled:", error);
      document.documentElement.classList.remove("motion-ok");
      mm.revert();
      return;
    }

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
