import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import type { Project } from "@/content/projects";

interface Props {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className = "" }: Props) {
  const aspectClass = "aspect-[16/10]";

  const isArch = project.category.includes("architectural");
  const isHealthcare = project.category.includes("hospital") || project.category.includes("public");
  const isIndustrial = project.category.includes("industrial");
  const isMulti = project.category.includes("housing") || project.category.includes("apartment");

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
      data-reveal
      className={`group flex flex-col justify-between border border-warm/15 bg-charcoal-2 p-6 sm:p-8 transition-colors duration-300 hover:border-gold/60 ${className}`}
    >
      <div>
        <div className="flex items-center justify-between text-xs text-concrete uppercase tracking-widest mb-5">
          <span className={`flex items-center gap-1.5 font-semibold uppercase ${categoryText}`}>
            <span className={`size-1.5 rounded-full ${categoryDot}`} aria-hidden />
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            <span>{project.year}</span>
            {project.isPlaceholder && <PlaceholderTag>Sample</PlaceholderTag>}
          </div>
        </div>

        <div className={`relative ${aspectClass} w-full overflow-hidden border border-warm/10 bg-charcoal mb-6`}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <h3 className="display-h3 text-warm group-hover:text-gold transition-colors">
          <Link href={`/projects/${project.slug}/`}>
            {project.name}
          </Link>
        </h3>

        <p className="mt-3 text-sm text-warm/70 leading-relaxed line-clamp-2">
          {project.summary}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-warm/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-concrete">
          {project.scope.slice(0, 2).map((tag) => (
            <span key={tag} className="border border-warm/10 px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}/`}
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-warm group-hover:text-gold transition-colors"
        >
          Details
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
