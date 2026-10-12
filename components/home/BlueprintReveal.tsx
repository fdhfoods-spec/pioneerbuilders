"use client";

import { useEffect, useRef } from "react";
import { BuildingElevation } from "@/components/art/BuildingElevation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MQ, gsap, registerGsap } from "@/lib/motion/gsap";
import { initBlueprint } from "@/lib/motion/blueprint";

const stages = [
  { n: "01", title: "Drawing", text: "Every building starts as a set of drawings: grids, levels and dimensions agreed before work begins." },
  { n: "02", title: "Framework", text: "The structure rises: columns and slabs establish the frame that carries everything else." },
  { n: "03", title: "Completed building", text: "Cladding, glazing and services complete the building and hand it over for use." },
] as const;

/**
 * Signature interaction. Three states of the same building.
 *  - Desktop + motion allowed: one pinned, scroll-scrubbed scene (.bp-pinned).
 *  - Mobile / tablet / reduced motion / no JS: three static figures (.bp-static).
 * Visibility of the two variants is pure CSS (see globals.css), so there is no layout jump.
 */
export function BlueprintReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    registerGsap();
    const mm = gsap.matchMedia();
    mm.add(MQ.desktopMotion, () => {
      initBlueprint(root);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} aria-labelledby="blueprint-heading" className="relative bg-charcoal-2">
      {/* Static variant */}
      <div className="bp-static container-x py-24 lg:py-32">
        <SectionHeading title={<span id="blueprint-heading">From drawing to building.</span>}>
          <p>Every structure moves through the same three states: drawn, framed and completed.</p>
        </SectionHeading>
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {stages.map((s, i) => (
            <li key={s.n} data-reveal data-delay={i * 0.08}>
              <div className="bg-blueprint border border-warm/10 bg-charcoal p-4">
                <BuildingElevation
                  stage={i === 0 ? "drawing" : i === 1 ? "frame" : "complete"}
                  label={`${s.title} stage of a building elevation`}
                />
              </div>
              <p className="mt-5 text-xs font-semibold tracking-[0.22em] text-gold">{s.n}</p>
              <h3 className="display-h3 mt-2">{s.title}</h3>
              <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-warm/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Pinned variant */}
      <div className="bp-pinned">
        <div data-bp-scene className="bg-blueprint relative h-[100dvh] min-h-[640px] overflow-hidden">
          <div className="container-x grid h-full items-center gap-8 lg:grid-cols-12">
            <div className="relative z-10 flex h-full flex-col justify-center lg:col-span-5">
              <h2 className="display-h2" aria-hidden>
                From drawing to building.
              </h2>
              <p className="mt-5 max-w-[44ch] text-warm/70">
                Every structure moves through the same three states: drawn, framed and completed.
              </p>

              <div className="relative mt-12 min-h-[9.5rem]">
                {stages.map((s) => (
                  <div key={s.n} data-bp-caption className="absolute inset-x-0 top-0">
                    <p className="text-xs font-semibold tracking-[0.22em] text-gold">{s.n} / 03</p>
                    <h3 className="display-h3 mt-2">{s.title}</h3>
                    <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-warm/75">{s.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 max-w-sm">
                <div className="h-px w-full bg-warm/15">
                  <div data-bp-bar className="h-px origin-left scale-x-0 bg-gold" />
                </div>
                <ul className="mt-3 flex justify-between text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-warm/50">
                  {stages.map((s) => (
                    <li key={s.n}>{s.title.split(" ")[0]}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative lg:col-span-7">
              <BuildingElevation stage="all" label="Building elevation: drawing, framework and completed stages" className="mx-auto max-h-[78dvh] w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
