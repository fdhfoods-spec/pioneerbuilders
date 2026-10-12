import { gsap } from "./gsap";

/**
 * Blueprint → framework → completed building.
 * Pinned, scrubbed scene (desktop + motion allowed only; the caller gates this
 * with gsap.matchMedia). Native scroll is never hijacked: we pin and scrub, we
 * do not intercept wheel events.
 *
 * Markup contract: see <BlueprintReveal />.
 */
export function initBlueprint(root: HTMLElement) {
  const scene = root.querySelector<HTMLElement>("[data-bp-scene]");
  const draw = root.querySelectorAll<SVGPathElement>('[data-bp="draw"] path');
  const frame = root.querySelector<SVGGElement>('[data-bp="frame"]');
  const done = root.querySelector<SVGGElement>('[data-bp="done"]');
  const drawGroup = root.querySelector<SVGGElement>('[data-bp="draw"]');
  const captions = root.querySelectorAll<HTMLElement>("[data-bp-caption]");
  const steps = root.querySelectorAll<HTMLElement>("[data-bp-step]");
  const bar = root.querySelector<HTMLElement>("[data-bp-bar]");
  if (!scene || !frame || !done || !drawGroup || captions.length !== 3) return;

  // Initial (stage 1) state
  gsap.set(draw, { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(frame, { clipPath: "inset(100% 0 0 0)" });
  gsap.set(done, { clipPath: "inset(100% 0 0 0)" });
  gsap.set(captions, { autoAlpha: 0, y: 16 });
  gsap.set(captions[0] ?? [], { autoAlpha: 1, y: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: "+=240%",
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Stage 1: drawing (0 → 1)
  tl.to(draw, { strokeDashoffset: 0, duration: 1, stagger: { each: 0.04, from: "end" } }, 0);
  tl.to(bar, { scaleX: 1 / 3, duration: 1, transformOrigin: "left center" }, 0);

  // Stage 2: framework (1 → 2)
  tl.to(captions[0] ?? [], { autoAlpha: 0, y: -16, duration: 0.25 }, 1);
  tl.fromTo(captions[1] ?? [], { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 1.15);
  tl.to(frame, { clipPath: "inset(0% 0 0 0)", duration: 0.9 }, 1.05);
  tl.to(drawGroup, { opacity: 0.35, duration: 0.9 }, 1.05);
  tl.to(bar, { scaleX: 2 / 3, duration: 1, transformOrigin: "left center" }, 1);

  // Stage 3: completed (2 → 3)
  tl.to(captions[1] ?? [], { autoAlpha: 0, y: -16, duration: 0.25 }, 2);
  tl.fromTo(captions[2] ?? [], { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 2.15);
  tl.to(done, { clipPath: "inset(0% 0 0 0)", duration: 0.9 }, 2.05);
  tl.to(frame, { opacity: 0.0, duration: 0.5 }, 2.6);
  tl.to(bar, { scaleX: 1, duration: 1, transformOrigin: "left center" }, 2);

  // Step labels highlight (cheap class toggles, no React state)
  steps.forEach((el, i) => {
    tl.to(el, { opacity: 1, duration: 0.2 }, i);
  });
}
