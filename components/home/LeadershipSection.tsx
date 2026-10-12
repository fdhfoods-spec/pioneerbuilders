import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { company } from "@/content/company";

export function LeadershipSection() {
  const { leadership } = company;

  return (
    <section className="relative py-24 lg:py-32 bg-charcoal-2 border-b border-warm/10">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* Portrait Placeholder */}
          <div className="lg:col-span-5">
            <div data-reveal className="relative aspect-[4/5] w-full max-w-md mx-auto border border-warm/15 bg-charcoal overflow-hidden">
              <Image
                src="/images/placeholders/portrait.svg"
                alt="Portrait silhouette placeholder for company leadership"
                fill
                sizes="(min-width: 1024px) 35vw, 85vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-charcoal/90 border border-warm/15 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold text-warm">{leadership.name}</span>
                  <PlaceholderTag>Pending Verification</PlaceholderTag>
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

          {/* Details & Factual Integrity */}
          <div className="lg:col-span-7">
            <SectionHeading
              title="Leadership and Experience."
            >
              <p>
                Civil construction leadership rooted in technical training and site-level supervision.
                Guiding {company.name}&apos;s engineering standards and project delivery.
              </p>
            </SectionHeading>

            <div className="mt-8 space-y-6 text-sm text-warm/75 leading-relaxed border-t border-warm/10 pt-8">
              <p>
                Under the technical stewardship of {leadership.name} ({leadership.qualification}),
                {company.name} emphasizes structural precision, hands-on oversight, and close
                coordination with architectural and structural consultants.
              </p>
              <p className="text-concrete text-xs">
                Note: Exact executive designation, personal biography, and specific corporate credentials
                will be updated upon final verification of formal company records.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-warm/10 flex flex-wrap items-center gap-6 text-xs text-concrete uppercase tracking-wider">
              <div>
                <span className="text-gold font-semibold block">Education</span>
                <span>{leadership.qualification}</span>
              </div>
              <span className="text-warm/20">•</span>
              <div>
                <span className="text-forest-accent font-semibold block">Discipline</span>
                <span>Civil Engineering</span>
              </div>
              <span className="text-warm/20">•</span>
              <div>
                <span className="text-cherry-accent font-semibold block">Headquarters</span>
                <span>Bangalore, Karnataka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
