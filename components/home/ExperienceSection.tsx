import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { experienceMetrics, approachPoints } from "@/content/process";

export function ExperienceSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-charcoal-2 border-b border-warm/10">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* Architectural Image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ParallaxImage
              src="/images/placeholders/detail-structure.svg"
              alt="Structural columns and concrete reinforcement"
              className="aspect-[4/5] w-full border border-warm/15"
              sizes="(min-width: 1024px) 40vw, 90vw"
              speed={0.05}
            />
          </div>

          {/* Editorial Content & Approach Points */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <SectionHeading
              title="Built on Experience. Focused on Execution."
            >
              <p>
                Civil construction demands disciplined coordination across site conditions, engineering
                specifications, and scheduling constraints. We ensure clarity at every phase.
              </p>
            </SectionHeading>

            {/* Approach Discipline Points */}
            <div className="mt-10 space-y-6 border-t border-warm/10 pt-8">
              {approachPoints.map((item, idx) => {
                const colorCls = idx === 0 ? "text-gold" : idx === 1 ? "text-cherry-accent" : "text-forest-accent";
                return (
                  <div key={item.title} data-reveal data-delay={idx * 0.08} className="flex gap-4">
                    <span className={`text-xs font-semibold uppercase tracking-widest mt-1 ${colorCls}`}>
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-warm tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-warm/70 leading-relaxed max-w-[55ch]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Confirmed Experience Metrics */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3.5 lg:gap-4 border-t border-warm/10 pt-8">
              {experienceMetrics.map((m, idx) => {
                const accentColor =
                  idx === 0 ? "text-gold" : idx === 1 ? "text-forest-accent" : "text-cherry-accent";

                return (
                  <div
                    key={m.label}
                    data-reveal
                    data-delay={idx * 0.1}
                    className="border border-warm/15 bg-charcoal p-4 sm:p-3.5 md:p-4 lg:p-5 flex flex-col justify-between min-w-0 overflow-hidden"
                  >
                    <div className="min-w-0">
                      <span
                        className={`text-[1.75rem] sm:text-[1.35rem] md:text-2xl lg:text-[1.75rem] xl:text-3xl ${accentColor} block font-extrabold font-display leading-tight tracking-tight tabular-nums`}
                      >
                        {m.value}
                      </span>
                      <h4 className="text-[0.72rem] sm:text-[0.68rem] md:text-xs font-bold uppercase tracking-wider text-warm mt-2 sm:mt-2.5 leading-snug">
                        {m.label}
                      </h4>
                      <p className="text-xs text-concrete leading-relaxed mt-2 font-sans">
                        {m.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
