import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Civil Construction & Architectural Design Services",
  description:
    "Comprehensive civil construction and architectural design capabilities by Pioneer Builders: Architectural Design, Residential, Industrial, Public Buildings, Group Housing, Villas, Hospitals, and Apartments.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <div className="relative pt-[76px]">
      {/* Header */}
      <section className="relative py-20 lg:py-28 bg-charcoal border-b border-warm/10">
        <div className="container-x">
          <div className="flex items-center gap-3 mb-6">
            <span className="eyebrow text-gold">Design &amp; Construction Capabilities</span>
            <span className="inline-flex items-center gap-1.5 border border-[#44d62c]/40 bg-[#44d62c]/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[#44d62c]">
              <span className="size-1.5 rounded-full bg-[#44d62c]" aria-hidden />
              {services.length} Disciplines
            </span>
          </div>
          <h1 className="display-hero text-4xl sm:text-6xl lg:text-7xl text-warm max-w-4xl tracking-tight">
            FROM CONCEPT
            <br />
            TO CONCRETE.
          </h1>
          <p className="mt-8 max-w-3xl text-base sm:text-lg text-warm/75 leading-relaxed font-sans">
            From architectural design to construction execution, Pioneer Builders brings ideas,
            planning, and practical building expertise together to deliver thoughtfully designed,
            well-executed spaces across residential, industrial, commercial, and public developments.
          </p>
        </div>
      </section>

      {/* Services List with Anchors */}
      <section className="py-20 lg:py-28 bg-charcoal-2">
        <div className="container-x space-y-20 sm:space-y-24">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            const isArch = service.slug === "architectural-design";

            const sectorTheme = isArch
              ? {
                  badge: "border-[#44d62c]/40 text-[#44d62c] bg-[#44d62c]/15",
                  dot: "bg-[#44d62c]",
                  hover: "hover:border-[#44d62c]/60",
                  borderLeft: "border-l-4 border-l-[#44d62c]",
                  label: "Architecture",
                }
              : service.slug === "hospitals" || service.slug === "public"
              ? {
                  badge: "border-forest/40 text-forest-accent bg-forest/15",
                  dot: "bg-forest",
                  hover: "hover:border-forest/60",
                  borderLeft: "border-l-4 border-l-forest",
                  label: service.slug === "hospitals" ? "Healthcare" : "Civic",
                }
              : service.slug === "industrial"
              ? {
                  badge: "border-concrete/40 text-concrete bg-concrete/15",
                  dot: "bg-concrete",
                  hover: "hover:border-concrete/60",
                  borderLeft: "border-l-4 border-l-concrete",
                  label: "Industrial",
                }
              : service.slug === "group-housing" || service.slug === "apartments"
              ? {
                  badge: "border-cherry/40 text-cherry-accent bg-cherry/15",
                  dot: "bg-cherry",
                  hover: "hover:border-cherry/60",
                  borderLeft: "border-l-4 border-l-cherry",
                  label: "Multi-Unit",
                }
              : {
                  badge: "border-gold/40 text-gold bg-gold/15",
                  dot: "bg-gold",
                  hover: "hover:border-gold/60",
                  borderLeft: "border-l-4 border-l-gold",
                  label: "Residential",
                };

            return (
              <div
                key={service.slug}
                id={service.slug}
                className={`scroll-mt-28 ${sectorTheme.borderLeft} border-y border-r border-warm/15 bg-charcoal p-6 sm:p-10 lg:p-12 transition-colors ${sectorTheme.hover}`}
              >
                <div className="grid gap-10 lg:gap-14 lg:grid-cols-12 lg:items-center">
                  {/* Visual Elevation Drawing / Render */}
                  <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-warm/15 bg-charcoal-3">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 95vw"
                        className="object-cover"
                        priority={idx === 0}
                      />
                    </div>
                  </div>

                  {/* Content & Scope */}
                  <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="flex items-center justify-between text-xs text-concrete uppercase tracking-widest mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${sectorTheme.dot}`} aria-hidden />
                        <span className="font-semibold text-gold">Category 0{idx + 1}</span>
                      </div>
                      <span
                        className={`inline-flex items-center border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${sectorTheme.badge}`}
                      >
                        {sectorTheme.label}
                      </span>
                    </div>

                    {service.headline && (
                      <p className="text-xs uppercase tracking-widest font-semibold text-gold mb-1">
                        {service.headline}
                      </p>
                    )}

                    <h2 className="display-h2 text-warm">{service.title}</h2>

                    <p className="mt-4 text-base text-warm/75 leading-relaxed max-w-[55ch] font-sans">
                      {service.description}
                    </p>

                    <div className="mt-8 border-t border-warm/10 pt-6">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-concrete mb-4">
                        {isArch ? "Core Architectural Scope" : "Typical Engineering Scope"}
                      </h3>
                      <ul className="grid gap-2.5 sm:grid-cols-2">
                        {service.scope.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-warm/80">
                            <span className="size-1.5 bg-gold shrink-0 mt-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-warm/10 flex flex-wrap items-center gap-6">
                      <ButtonLink href="/contact/" variant="primary">
                        {service.cta ?? `Discuss ${service.title}`}
                      </ButtonLink>

                      <Link
                        href={`/projects/`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-warm hover:text-gold transition-colors"
                      >
                        Browse Projects
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
