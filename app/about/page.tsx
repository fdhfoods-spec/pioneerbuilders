import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { company } from "@/content/company";
import { approachPoints } from "@/content/process";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us — Civil Engineering Legacy Since 1987",
  description:
    "Learn about Pioneer Builders, established in 1987 in Bangalore. Decades of civil construction discipline, structural oversight, and architectural execution.",
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
            Company Profile &amp; History
          </p>
          <h1 className="display-hero text-4xl sm:text-6xl lg:text-7xl text-warm max-w-4xl tracking-tight">
            BUILT ON EXPERIENCE.
            <br />
            COMMITTED TO STRUCTURE.
          </h1>
          <p className="mt-8 max-w-2xl text-base sm:text-lg text-warm/75 leading-relaxed font-sans">
            {company.name} is a civil construction organisation established in {company.established} in
            Bangalore. For decades, our work has centred on engineering discipline, structural
            soundness, and hands-on site management across residential, commercial, industrial, and public sectors.
          </p>
        </div>
      </section>

      {/* Heritage Narrative Section */}
      <section className="py-20 lg:py-28 bg-charcoal-2 border-b border-warm/10">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="OUR FOUNDATION"
                title="A Legacy of Engineering Discipline."
              >
                <p>
                  Established in {company.established}, {company.name} was founded on the fundamental principle
                  that enduring buildings require uncompromised structural integrity and deep technical
                  understanding.
                </p>
                <p className="mt-4">
                  Over decades of evolving architectural standards, our approach has remained consistent:
                  rigorous site evaluation, transparent estimation, coordinated structural and services planning,
                  and direct supervisory oversight on the construction floor.
                </p>
              </SectionHeading>

              <div className="mt-8 pt-6 border-t border-warm/10 flex items-center gap-4 text-xs text-concrete uppercase tracking-wider">
                <span>Verified Establishment: {company.established}</span>
                <span>•</span>
                <span>Bangalore Headquarters</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border-l-4 border-l-cherry border-y border-r border-warm/15 bg-charcoal p-8 sm:p-10 relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 border border-cherry/40 bg-cherry/15 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#d96677] dark:text-[#f3a4af]">
                    <span className="size-1.5 rounded-full bg-cherry" aria-hidden />
                    Civil Milestone
                  </span>
                </div>
                <p className="display-h2 text-warm">SINCE {company.established}</p>
                <p className="mt-4 text-sm text-warm/70 leading-relaxed">
                  Decades of building structures that stand the test of time, weather, and usage.
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
        </div>
      </section>

      {/* Leadership Profile Section */}
      <section className="py-20 lg:py-28 bg-charcoal border-b border-warm/10">
        <div className="container-x">
          <SectionHeading
            eyebrow="EXECUTIVE LEADERSHIP"
            title="Technical Leadership & Governance."
          >
            <p>
              Leadership grounded in formal civil engineering qualifications and active site-level
              supervision.
            </p>
          </SectionHeading>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full max-w-md border border-warm/15 bg-charcoal-2 overflow-hidden">
                <Image
                  src="/images/placeholders/portrait.svg"
                  alt="Portrait placeholder for leadership"
                  fill
                  sizes="(min-width: 1024px) 35vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-charcoal/90 border border-warm/15 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-semibold text-warm">{leadership.name}</span>
                    <PlaceholderTag>Verified Principal</PlaceholderTag>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="inline-flex items-center gap-1.5 border border-forest/40 bg-forest/20 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-[#3db888] dark:text-[#6ee2b3]">
                      <span className="size-1.5 rounded-full bg-forest" aria-hidden />
                      {leadership.qualification}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm text-warm/75 leading-relaxed">
              <h3 className="display-h3 text-warm">{leadership.name}</h3>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-accent border border-forest/30 bg-forest/10 px-3 py-1">
                <span className="size-1.5 rounded-full bg-forest" />
                {leadership.qualification} (Civil Engineering)
              </p>

              <p>
                With foundational technical training in civil engineering, {leadership.name} oversees the
                structural, programmatic, and engineering execution across all Pioneer Builders projects.
              </p>

              <p>
                Our operational philosophy ensures that client communication is directly paired with
                engineering reality. We work in tandem with architects, structural consultants, and MEP
                specialists to deliver projects that adhere strictly to code, schedule, and architectural intent.
              </p>

              <div className="p-4 border border-warm/15 bg-charcoal-2 text-xs text-concrete">
                Note: Formal executive designation and complete biographical archives will be verified upon
                final administrative sign-off.
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
                  <p className="mt-4 text-sm text-warm/70 leading-relaxed">{item.text}</p>
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
