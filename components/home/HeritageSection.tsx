import { SectionHeading } from "@/components/ui/SectionHeading";
import { company, companyTimeline } from "@/content/company";

export function HeritageSection() {
  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-charcoal border-b border-warm/10">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center mb-10 sm:mb-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="OUR JOURNEY"
              title="Built Through Time. Rooted in Experience."
            >
              <p>
                Our story began in Coimbatore in 1987. Over the years, we built our experience through
                approximately 25 years of work in Chennai before establishing our present base in
                Bangalore. Every chapter of our journey has strengthened our approach to planning,
                construction quality, site supervision, and lasting client relationships.
              </p>
            </SectionHeading>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <div
              data-reveal
              className="border-l-4 border-l-cherry border-y border-r border-warm/15 bg-charcoal-2 p-8 sm:p-10 relative overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-warm/5 to-transparent pointer-events-none"
              />

              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 border border-cherry/40 bg-cherry/15 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cherry-accent">
                  <span className="size-1.5 rounded-full bg-cherry animate-pulse" />
                  Three Chapters
                </span>
              </div>

              <p className="display-hero text-4xl sm:text-6xl text-warm tracking-tighter">
                SINCE <span className="text-gold">{company.established}</span>
              </p>

              <p className="mt-3 text-xs sm:text-sm text-warm/75 font-mono uppercase tracking-wider">
                {company.journey}
              </p>

              <div className="mt-6 pt-5 border-t border-warm/10 flex items-center justify-between text-xs text-concrete uppercase tracking-widest">
                <span className="text-concrete">Origins: Coimbatore</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-forest" aria-hidden />
                  Present Base: Bangalore
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Three-Stage Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative pt-4" data-reveal>
          {/* Desktop horizontal architectural datum connector line */}
          <div
            aria-hidden
            className="hidden md:block absolute top-[2.25rem] left-8 right-8 h-px bg-gradient-to-r from-gold/30 via-cherry/30 to-forest/30 z-0"
          />

          <div className="relative z-10 grid gap-6 md:grid-cols-3">
            {companyTimeline.map((stage, idx) => {
              const borderAccent =
                idx === 0
                  ? "border-t-2 border-t-gold hover:border-gold/60"
                  : idx === 1
                  ? "border-t-2 border-t-cherry-accent hover:border-cherry/60"
                  : "border-t-2 border-t-forest-accent hover:border-forest/60";

              const badgeColor =
                idx === 0
                  ? "text-gold border-gold/30 bg-gold/10"
                  : idx === 1
                  ? "text-cherry-accent border-cherry/30 bg-cherry/10"
                  : "text-forest-accent border-forest/30 bg-forest/10";

              return (
                <div
                  key={stage.location}
                  className={`relative flex flex-col justify-between border border-warm/15 bg-charcoal-2 p-6 sm:p-8 transition-colors duration-300 ${borderAccent}`}
                >
                  <div>
                    {/* Header with marker and badge */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="flex size-7 items-center justify-center rounded-none border border-warm/25 bg-charcoal font-mono text-xs font-bold text-warm">
                          {stage.phase}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-widest text-concrete">
                          Chapter {stage.phase}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center border px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider ${badgeColor}`}
                      >
                        {stage.badge}
                      </span>
                    </div>

                    {/* Location Title & Subtitle */}
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-warm">
                      {stage.location}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">
                      {stage.subtitle}
                    </p>

                    {/* Factual Description */}
                    <p className="mt-4 text-sm text-warm/75 leading-relaxed font-sans">
                      {stage.description}
                    </p>
                  </div>

                  {/* Subtle footer benchmark datum */}
                  <div className="mt-6 pt-4 border-t border-warm/10 flex items-center justify-between text-[0.68rem] uppercase tracking-wider text-concrete">
                    <span>Stage {stage.phase} of 03</span>
                    <span className="text-warm/50 font-mono">
                      {idx === 0 ? "Est. 1987" : idx === 1 ? "25 Yrs On-Site" : "Active HQ"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
