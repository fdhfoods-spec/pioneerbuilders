import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MobileServicesCarousel } from "./MobileServicesCarousel";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-charcoal border-b border-warm/10 overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="CAPABILITIES & SERVICES"
            title="From Design to Delivery."
          >
            <p>
              From architectural design to construction execution, Pioneer Builders brings ideas,
              planning, and practical building expertise together to deliver thoughtfully designed,
              well-executed spaces across residential, industrial, and public developments.
            </p>
          </SectionHeading>
          <div className="shrink-0 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border border-[#44d62c]/40 bg-[#44d62c]/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-[#44d62c]">
              <span className="size-1.5 rounded-full bg-[#44d62c]" aria-hidden />
              {services.length} Core Disciplines
            </span>
          </div>
        </div>

        {/* Mobile Swipeable Carousel (< 768px) */}
        <MobileServicesCarousel services={services} />

        {/* Desktop & Tablet Varied Bento Grid (>= 768px) */}
        <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {services.map((service, i) => {
            const isArch = service.slug === "architectural-design";

            // Span variation for 8 items: 7+5 (hero row), 4+4+4 (mid row), 4+4+4 (bottom row)
            const spanClass =
              i === 0
                ? "lg:col-span-7"
                : i === 1
                ? "lg:col-span-5"
                : "lg:col-span-4";

            const sectorTheme = isArch
              ? {
                  badge: "border-[#44d62c]/40 text-[#44d62c] bg-[#44d62c]/10",
                  dot: "bg-[#44d62c]",
                  hover: "hover:border-[#44d62c]/60",
                  label: "Architecture",
                }
              : service.slug === "hospitals" || service.slug === "public"
              ? {
                  badge: "border-forest/40 text-forest-accent bg-forest/15",
                  dot: "bg-forest",
                  hover: "hover:border-forest/60",
                  label: service.slug === "hospitals" ? "Healthcare" : "Civic",
                }
              : service.slug === "industrial"
              ? {
                  badge: "border-concrete/40 text-concrete bg-concrete/15",
                  dot: "bg-concrete",
                  hover: "hover:border-concrete/60",
                  label: "Industrial",
                }
              : service.slug === "group-housing" || service.slug === "apartments"
              ? {
                  badge: "border-cherry/40 text-cherry-accent bg-cherry/15",
                  dot: "bg-cherry",
                  hover: "hover:border-cherry/60",
                  label: "Multi-Unit",
                }
              : {
                  badge: "border-gold/40 text-gold bg-gold/15",
                  dot: "bg-gold",
                  hover: "hover:border-gold/60",
                  label: "Residential",
                };

            return (
              <div
                key={service.slug}
                data-reveal
                data-delay={i * 0.04}
                className={`group relative flex flex-col justify-between border border-warm/15 bg-charcoal-2 p-6 sm:p-8 transition-colors duration-300 ${sectorTheme.hover} ${spanClass}`}
              >
                {/* Subtle top indicator bar */}
                <div
                  className={`absolute top-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${sectorTheme.dot}`}
                />

                <div>
                  <div className="flex items-center justify-between text-xs text-concrete uppercase tracking-widest mb-6">
                    <span className="font-semibold text-gold">0{i + 1}</span>
                    <span
                      className={`inline-flex items-center gap-1.5 border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${sectorTheme.badge}`}
                    >
                      <span className={`size-1.5 rounded-full ${sectorTheme.dot}`} aria-hidden />
                      {sectorTheme.label}
                    </span>
                  </div>

                  {/* Thumbnail Asset */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden border border-warm/10 mb-6 bg-charcoal">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {service.headline && (
                    <p className="text-xs uppercase tracking-widest font-semibold text-gold mb-1">
                      {service.headline}
                    </p>
                  )}

                  <h3 className="display-h3 text-warm group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-warm/70 leading-relaxed max-w-[50ch]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-warm/10 flex items-center justify-between">
                  <span className="text-xs text-concrete line-clamp-1 max-w-[60%]">
                    {service.scope[0]}
                  </span>
                  <Link
                    href={isArch ? "/contact/" : `/services/#${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-warm group-hover:text-[#44d62c] transition-colors"
                  >
                    {service.cta ?? "View Scope"}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
