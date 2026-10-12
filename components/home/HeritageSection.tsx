import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/content/company";

export function HeritageSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-charcoal border-b border-warm/10">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="OUR HERITAGE"
              title="Experience Behind Every Structure."
            >
              <p>
                Founded in Bangalore with roots dating back to {company.established}, {company.name} has
                built its reputation on foundational discipline, disciplined engineering, and
                unwavering structural integrity.
              </p>
              <p className="mt-4">
                From residential developments to industrial facilities and institutional complexes,
                our work is guided by decades of on-site experience, rigorous quality oversight, and
                enduring client partnerships.
              </p>
            </SectionHeading>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <div
              data-reveal
              className="border-l-4 border-l-cherry border-y border-r border-warm/15 bg-charcoal-2 p-8 sm:p-12 relative overflow-hidden"
            >
              {/* Subtle architectural background line */}
              <div
                aria-hidden
                className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-warm/5 to-transparent pointer-events-none"
              />

              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 border border-cherry/40 bg-cherry/15 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cherry-accent">
                  <span className="size-1.5 rounded-full bg-cherry animate-pulse" />
                  Heritage Landmark
                </span>
              </div>

              <p className="display-hero text-5xl sm:text-7xl lg:text-8xl text-warm tracking-tighter">
                SINCE
                <br />
                <span className="text-gold">{company.established}</span>
              </p>

              <div className="mt-8 pt-6 border-t border-warm/10 flex items-center justify-between text-xs text-concrete uppercase tracking-widest">
                <span className="text-concrete">Civil Construction</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-forest" aria-hidden />
                  Bangalore, Karnataka
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
