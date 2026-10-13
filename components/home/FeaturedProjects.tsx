import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { featuredProjects } from "@/content/projects";

export function FeaturedProjects() {
  return (
    <section className="relative py-24 lg:py-32 bg-charcoal-2 border-b border-warm/10">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading
            eyebrow="PORTFOLIO"
            title="Our Work Speaks Through the Structures We Build."
          >
            <p>
              An editorial selection of residential, healthcare, and industrial scale building projects.
              All records below are sample templates awaiting verified project data.
            </p>
          </SectionHeading>
          <div className="shrink-0">
            <ButtonLink href="/projects/" variant="outline">
              View All Projects
            </ButtonLink>
          </div>
        </div>

        {/* Varied Proportion Editorial Layout */}
        <div className="grid gap-8 lg:grid-cols-12">
          {featuredProjects.slice(0, 4).map((project, idx) => {
            // Asymmetric layout cadence: project 0 is wide 7-col, project 1 is 5-col; project 2 is 5-col, project 3 is 7-col
            const colSpan =
              idx === 0
                ? "lg:col-span-7"
                : idx === 1
                ? "lg:col-span-5"
                : idx === 2
                ? "lg:col-span-5"
                : "lg:col-span-7";

            const aspectClass =
              project.aspect === "portrait"
                ? "aspect-[3/4]"
                : project.aspect === "square"
                ? "aspect-square"
                : "aspect-[16/10]";

            const isArch = project.category.toLowerCase().includes("architectural");
            const isHealthcare = project.category.toLowerCase().includes("hospital") || project.category.toLowerCase().includes("public");
            const isIndustrial = project.category.toLowerCase().includes("industrial");
            const isMulti = project.category.toLowerCase().includes("housing") || project.category.toLowerCase().includes("apartment");

            const categoryDot = isArch
              ? "bg-[#44d62c]"
              : isHealthcare
              ? "bg-forest"
              : isIndustrial
              ? "bg-concrete"
              : isMulti
              ? "bg-cherry"
              : "bg-gold";

            const categoryText = isArch
              ? "text-[#44d62c]"
              : isHealthcare
              ? "text-forest-accent"
              : isIndustrial
              ? "text-concrete"
              : isMulti
              ? "text-cherry-accent"
              : "text-gold";

            return (
              <article
                key={project.slug}
                data-reveal
                data-delay={idx * 0.08}
                className={`group flex flex-col justify-between border border-warm/15 bg-charcoal p-6 sm:p-8 hover:border-gold/50 transition-colors ${colSpan}`}
              >
                <div>
                  {/* Top Metadata Strip */}
                  <div className="flex items-center justify-between text-xs text-concrete uppercase tracking-widest mb-5">
                    <span className={`flex items-center gap-1.5 font-semibold uppercase ${categoryText}`}>
                      <span className={`size-1.5 rounded-full ${categoryDot}`} aria-hidden />
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>{project.year}</span>
                      <PlaceholderTag>Sample</PlaceholderTag>
                    </div>
                  </div>

                  {/* Image Presentation */}
                  <div className={`relative ${aspectClass} w-full overflow-hidden border border-warm/10 bg-charcoal-3 mb-6`}>
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Title & Scope */}
                  <h3 className="display-h3 text-warm group-hover:text-gold transition-colors">
                    <Link href={`/projects/${project.slug}/`}>
                      {project.name}
                    </Link>
                  </h3>

                  <p className="mt-3 text-sm text-warm/70 leading-relaxed max-w-[55ch]">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-warm/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-concrete">
                    {project.scope.map((tag) => (
                      <span key={tag} className="border border-warm/10 px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${project.slug}/`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-warm group-hover:text-gold transition-colors"
                  >
                    View Project
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
