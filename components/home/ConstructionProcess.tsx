import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { processSteps } from "@/content/process";

export function ConstructionProcess() {
  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-charcoal border-b border-warm/10">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <SectionHeading
            title="From Foundation to Completion."
          >
            <p>
              A disciplined, stage-gated methodology ensuring technical clarity, financial control, and
              structural quality across each phase of the build.
            </p>
          </SectionHeading>
          <div className="shrink-0">
            <PlaceholderTag>Proposed Methodology</PlaceholderTag>
          </div>
        </div>

        {/* 6-Step Construction Methodology Sequence */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, idx) => {
            const isGold = idx < 2;
            const isCherry = idx >= 2 && idx < 4;
            const isForest = idx >= 4;

            const accentText = isGold ? "text-gold" : isCherry ? "text-cherry-accent" : "text-forest-accent";
            const accentBar = isGold
              ? "bg-gold/40 group-hover:bg-gold"
              : isCherry
              ? "bg-cherry/50 group-hover:bg-cherry"
              : "bg-forest/50 group-hover:bg-forest";
            const borderHover = isGold
              ? "hover:border-gold/60"
              : isCherry
              ? "hover:border-cherry/60"
              : "hover:border-forest/60";

            return (
              <div
                key={step.title}
                data-reveal
                data-delay={idx * 0.06}
                className={`group border border-warm/15 bg-charcoal-2 p-8 flex flex-col justify-between transition-colors ${borderHover}`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-warm/10 pb-4 mb-6">
                    <span className={`font-display font-semibold text-2xl ${accentText}`}>
                      0{idx + 1}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-widest text-concrete">
                      Stage 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="display-h3 text-warm group-hover:text-gold transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm text-warm/70 leading-relaxed">
                    {step.text}
                  </p>
                </div>

                <div className="mt-8 pt-4 flex items-center gap-2">
                  <span className={`h-0.5 w-6 group-hover:w-12 transition-all duration-300 ${accentBar}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
