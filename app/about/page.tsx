import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { company, companyTimeline } from "@/content/company";
import { approachPoints } from "@/content/process";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us — Civil Engineering & Architectural Legacy Since 1987",
  description:
    "Founded in Coimbatore in 1987, Pioneer Builders has developed decades of construction experience through Chennai and its present base in Bangalore.",
  path: "/about/",
});

export default function AboutPage() {
  const { leadership } = company;

  return (
    <div className="relative pt-[76px]">
      {/* Page Hero Header */}
      <section className="relative py-20 lg:py-28 bg-charcoal border-b border-warm/10">
        <div className="container-x">
          <p className="eyebrow text-gold mb-6 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-gold" />
            COMPANY PROFILE &amp; HISTORY
          </p>
          <h1 className="display-hero text-4xl sm:text-6xl lg:text-7xl text-warm max-w-4xl tracking-tight">
            BUILT ON EXPERIENCE.
            <br />
            COMMITTED TO STRUCTURE.
          </h1>
          <p className="mt-8 max-w-3xl text-base sm:text-lg text-warm/80 leading-relaxed font-sans">
            Founded in Coimbatore in 1987, Pioneer Builders has developed its construction experience
            through approximately 25 years of work in Chennai and its present base in Bangalore. Our
            approach combines engineering discipline, structural integrity, practical site supervision,
            architectural design, and a commitment to delivering dependable built environments.
          </p>
        </div>
      </section>

      {/* Heritage Narrative Section — Three Chapters */}
      <section className="py-20 lg:py-28 bg-charcoal-2 border-b border-warm/10">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center mb-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="OUR FOUNDATION"
                title="A Legacy Built Across Three Chapters."
              >
                <p>
                  Our story began in Coimbatore in 1987. Over the years, we built our experience through
                  approximately 25 years of work in Chennai before establishing our present base in
                  Bangalore. Every chapter of our journey has strengthened our approach to planning,
                  construction quality, site supervision, architectural design, and lasting client relationships.
                </p>
                <p className="mt-4">
                  Over decades of evolving architectural standards, our approach has remained consistent:
                  rigorous site evaluation, transparent estimation, coordinated structural and services planning,
                  and direct supervisory oversight on the construction floor.
                </p>
              </SectionHeading>

              <div className="mt-8 pt-6 border-t border-warm/10 flex items-center gap-4 text-xs text-concrete uppercase tracking-wider">
                <span>Founded: Coimbatore, 1987</span>
                <span>•</span>
                <span>Present Base: Bangalore</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border-l-4 border-l-cherry border-y border-r border-warm/15 bg-charcoal p-8 sm:p-10 relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 border border-cherry/40 bg-cherry/15 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cherry-accent">
                    <span className="size-1.5 rounded-full bg-cherry" aria-hidden />
                    Civil Milestone
                  </span>
                </div>
                <p className="display-h2 text-warm">SINCE {company.established}</p>
                <p className="mt-3 text-xs font-mono uppercase tracking-wider text-gold">
                  {company.journey}
                </p>
                <p className="mt-4 text-sm text-warm/70 leading-relaxed font-sans">
                  Decades of building structures that stand the test of time, weather, and usage across South India.
                </p>
                <div className="mt-8 pt-6 border-t border-warm/10 flex items-center justify-between text-xs text-concrete">
                  <span>Registered in Karnataka, India</span>
                  <span className="flex items-center gap-1.5 text-forest-accent font-semibold">
                    <span className="size-1.5 rounded-full bg-forest" aria-hidden />
                    Active Practice
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Three-Stage Timeline Grid */}
          <div className="grid gap-6 md:grid-cols-3 pt-6 border-t border-warm/10">
            {companyTimeline.map((stage, idx) => {
              const borderAccent =
                idx === 0
                  ? "border-t-2 border-t-gold"
                  : idx === 1
                  ? "border-t-2 border-t-cherry-accent"
                  : "border-t-2 border-t-forest-accent";

              const badgeColor =
                idx === 0
                  ? "text-gold border-gold/30 bg-gold/10"
                  : idx === 1
                  ? "text-cherry-accent border-cherry/30 bg-cherry/10"
                  : "text-forest-accent border-forest/30 bg-forest/10";

              return (
                <div
                  key={stage.location}
                  className={`border border-warm/15 bg-charcoal p-6 sm:p-8 flex flex-col justify-between ${borderAccent}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="flex size-7 items-center justify-center rounded-none border border-warm/25 bg-charcoal-2 font-mono text-xs font-bold text-warm">
                        {stage.phase}
                      </span>
                      <span
                        className={`inline-flex items-center border px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider ${badgeColor}`}
                      >
                        {stage.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold tracking-tight text-warm">
                      {stage.location}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">
                      {stage.subtitle}
                    </p>

                    <p className="mt-4 text-sm text-warm/75 leading-relaxed font-sans">
                      {stage.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-warm/10 flex items-center justify-between text-[0.68rem] uppercase tracking-wider text-concrete">
                    <span>Chapter {stage.phase} of 03</span>
                    <span className="text-warm/50 font-mono">
                      {idx === 0 ? "1987" : idx === 1 ? "~25 Yrs" : "Present"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Profile Section */}
      <section className="py-20 lg:py-28 bg-charcoal border-b border-warm/10">
        <div className="container-x">
          <SectionHeading
            eyebrow="FOUNDER & EXECUTIVE LEADERSHIP"
            title="Leadership Grounded in Engineering Reality."
          >
            <p>
              Founded and guided by formal civil engineering qualifications, active site supervision,
              and thirty-five years of hands-on construction practice.
            </p>
          </SectionHeading>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Leadership Portrait */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto border border-warm/15 bg-charcoal-2 overflow-hidden shadow-2xl">
                <Image
                  src="/images/leadership/pt-selvakumar.jpg"
                  alt="P.T. Selvakumar — Founder, Pioneer Builders"
                  fill
                  sizes="(min-width: 1024px) 35vw, 90vw"
                  className="object-cover object-[center_20%]"
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 bg-charcoal/90 border border-warm/15 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-warm tracking-tight">
                      {leadership.name}
                    </span>
                    <span className="text-[0.65rem] font-mono font-bold text-gold uppercase tracking-wider border border-gold/40 bg-gold/15 px-2 py-0.5">
                      Founder
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1.5 border border-forest/40 bg-forest/20 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-forest-accent">
                      <span className="size-1.5 rounded-full bg-forest" aria-hidden />
                      {leadership.qualification}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm text-warm/75 leading-relaxed font-sans">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold block mb-1">
                  Founder
                </span>
                <h3 className="display-h3 text-warm font-bold">{leadership.name}</h3>
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-accent border border-forest/30 bg-forest/10 px-3 py-1 mt-3">
                  <span className="size-1.5 rounded-full bg-forest" />
                  {leadership.qualification}
                </p>
              </div>

              <p>
                As the <strong className="text-warm font-semibold">Founder of Pioneer Builders</strong>,{" "}
                <strong className="text-warm font-bold text-base">{leadership.name}</strong> ({leadership.qualification}) established the company in Coimbatore in 1987 with a foundational commitment to structural integrity, engineering discipline, and dependable execution.
              </p>

              <p>
                Bringing formal civil engineering training and more than three decades of site-level construction practice—including approximately 25 years of extensive project delivery in Chennai and present operations headquartered in Bangalore—he directs the technical standards, architectural coordination, and structural oversight across every engagement.
              </p>

              <p>
                Under his leadership, Pioneer Builders operates on a culture where client communication is directly paired with technical honesty—collaborating closely with architectural consultants, structural engineers, and skilled trades to turn plans into durable, high-quality structures.
              </p>

              <div className="mt-8 pt-6 border-t border-warm/10 flex flex-wrap items-center gap-6 text-xs text-concrete uppercase tracking-wider">
                <div>
                  <span className="text-gold font-bold block">Role</span>
                  <span className="text-warm font-semibold">Founder</span>
                </div>
                <span className="text-warm/20">•</span>
                <div>
                  <span className="text-forest-accent font-bold block">Education</span>
                  <span>{leadership.qualification}</span>
                </div>
                <span className="text-warm/20">•</span>
                <div>
                  <span className="text-cherry-accent font-bold block">Discipline</span>
                  <span>Civil Construction &amp; Engineering</span>
                </div>
                <span className="text-warm/20">•</span>
                <div>
                  <span className="text-warm/60 font-bold block">Present Base</span>
                  <span>Bangalore, Karnataka</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Approach Section */}
      <section className="py-20 lg:py-28 bg-charcoal-2 border-b border-warm/10">
        <div className="container-x">
          <SectionHeading
            eyebrow="METHODOLOGY"
            title="Our Three Operating Principles."
          >
            <p>The core disciplines governing every foundation, column, and finish we deliver.</p>
          </SectionHeading>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {approachPoints.map((item, idx) => (
              <div
                key={item.title}
                className="border border-warm/15 bg-charcoal p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-4">
                    Principle 0{idx + 1}
                  </span>
                  <h3 className="display-h3 text-warm">{item.title}</h3>
                  <p className="mt-4 text-sm text-warm/70 leading-relaxed font-sans">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <ButtonLink href="/contact/" variant="primary">
              Initiate a Project Consultation
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
