import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
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

            {/* Placeholder Metrics: Honest Disclosures */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-warm/10 pt-8">
              {experienceMetrics.map((m) => (
                <div key={m.label} data-reveal className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="display-h3 text-gold">{m.value}</span>
                    <PlaceholderTag>{m.note}</PlaceholderTag>
                  </div>
                  <p className="text-xs text-concrete uppercase tracking-wider">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
