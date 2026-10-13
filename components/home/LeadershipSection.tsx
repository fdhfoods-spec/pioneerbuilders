import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/content/company";

export function LeadershipSection() {
  const { leadership } = company;

  return (
    <section className="relative py-24 lg:py-32 bg-charcoal-2 border-b border-warm/10">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* Portrait of P.T. Selvakumar */}
          <div className="lg:col-span-5">
            <div data-reveal className="relative aspect-[4/5] w-full max-w-md mx-auto border border-warm/15 bg-charcoal overflow-hidden shadow-2xl">
              <Image
                src="/images/leadership/pt-selvakumar.jpg"
                alt="P.T. Selvakumar — Founder, Pioneer Builders"
                fill
                sizes="(min-width: 1024px) 35vw, 85vw"
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

          {/* Details & Factual Integrity */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="FOUNDER & EXECUTIVE LEADERSHIP"
              title="Leadership Grounded in Engineering Reality."
            >
              <p>
                Guided by formal civil engineering expertise and decades of hands-on site oversight,
                shaping {company.name}&apos;s enduring standard of construction quality.
              </p>
            </SectionHeading>

            <div className="mt-8 space-y-5 text-sm text-warm/75 leading-relaxed border-t border-warm/10 pt-8 font-sans">
              <p>
                As the <strong className="text-warm font-semibold">Founder of {company.name}</strong>,{" "}
                <strong className="text-warm font-bold text-base">{leadership.name}</strong> ({leadership.qualification})
                has guided the firm since its inception in Coimbatore in 1987. Bringing deep technical training and over three decades of on-site engineering leadership across Tamil Nadu and Karnataka, he established the core foundation of structural precision and dependable execution that defines Pioneer Builders today.
              </p>
              <p>
                Under his direct stewardship, {company.name} bridges architectural vision with site-level discipline—maintaining active coordination with structural consultants, site engineers, and clients from initial layouts through structural completion.
              </p>
            </div>

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
  );
}
