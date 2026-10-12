import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { projects, projectBySlug } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  return pageMetadata({
    title: `${project.name} — Project Case Study`,
    description: project.summary,
    path: `/projects/${project.slug}/`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find adjacent projects for next/prev navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const isHealthcare = project.category.toLowerCase().includes("hospital") || project.category.toLowerCase().includes("public");
  const isIndustrial = project.category.toLowerCase().includes("industrial");
  const isMulti = project.category.toLowerCase().includes("housing") || project.category.toLowerCase().includes("apartment");

  const categoryDot = isHealthcare
    ? "bg-forest"
    : isIndustrial
    ? "bg-concrete"
    : isMulti
    ? "bg-cherry"
    : "bg-gold";

  const categoryText = isHealthcare
    ? "text-forest-accent"
    : isIndustrial
    ? "text-concrete"
    : isMulti
    ? "text-cherry-accent"
    : "text-gold";

  return (
    <div className="relative pt-[76px]">
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-warm/10 bg-charcoal">
        <div className="container-x py-4 flex items-center justify-between text-xs text-concrete">
          <Link
            href="/projects/"
            className="inline-flex items-center gap-1.5 hover:text-gold transition-colors uppercase tracking-wider font-semibold"
          >
            <ArrowLeft className="size-3.5" />
            Back to Projects Portfolio
          </Link>
          {project.isPlaceholder && <PlaceholderTag tone="cherry">Sample Project Record</PlaceholderTag>}
        </div>
      </div>

      {/* Hero Presentation */}
      <section className="relative py-16 lg:py-24 bg-charcoal border-b border-warm/10">
        <div className="container-x">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest mb-4">
              <span className={`inline-flex items-center gap-1.5 font-semibold ${categoryText}`}>
                <span className={`size-1.5 rounded-full ${categoryDot}`} aria-hidden />
                {project.category}
              </span>
              <span className="text-warm/40">•</span>
              <span className="text-concrete">{project.year}</span>
            </div>

            <h1 className="display-hero text-3xl sm:text-5xl lg:text-6xl text-warm tracking-tight">
              {project.name}
            </h1>

            <p className="mt-6 text-base sm:text-lg text-warm/75 leading-relaxed font-sans max-w-2xl">
              {project.summary}
            </p>
          </div>

          {/* Main Architectural Hero Drawing/Image */}
          <div className="mt-12 relative aspect-[16/9] w-full overflow-hidden border border-warm/15 bg-charcoal-2">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Metadata Specifications Strip */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 border-t border-warm/10 pt-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-concrete block">Location</span>
              <p className="text-sm font-semibold text-warm mt-1">{project.location}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-concrete block">Category</span>
              <p className="text-sm font-semibold text-warm mt-1 capitalize">{project.category}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-concrete block">Year</span>
              <p className="text-sm font-semibold text-warm mt-1">{project.year}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-concrete block">Engineering Scope</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {project.scope.map((tag) => (
                  <span key={tag} className="border border-warm/15 px-2 py-0.5 text-xs text-warm/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative & Detail Gallery */}
      <section className="py-20 lg:py-28 bg-charcoal-2 border-b border-warm/10">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Project Narrative */}
            <div className="lg:col-span-6 space-y-6 text-sm text-warm/75 leading-relaxed">
              <h2 className="display-h3 text-warm">Project Overview &amp; Execution</h2>
              <p>{project.description}</p>
              <p>
                From initial ground preparation and foundation reinforcement to structural casting,
                supervision of services, and final architectural finishing, {project.name} demonstrates
                the systematic civil workflow employed by Pioneer Builders.
              </p>
              <div className="p-4 border border-warm/15 bg-charcoal text-xs text-concrete">
                Note: This record serves as a structural template. Final technical specifications, actual site
                drawings, and real photographic archives will be provided upon client verification.
              </div>

              <div className="pt-6">
                <ButtonLink href="/contact/" variant="primary">
                  Discuss a Similar Project
                </ButtonLink>
              </div>
            </div>

            {/* Gallery Details */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="display-h3 text-warm">Structural &amp; Detail Studies</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {project.gallery.map((item, idx) => (
                  <div
                    key={item.src + idx}
                    className="relative aspect-[4/3] w-full overflow-hidden border border-warm/15 bg-charcoal"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Footer Bar */}
      {nextProject && (
        <section className="py-12 bg-charcoal border-b border-warm/10">
          <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-widest text-concrete">Next Project in Portfolio</span>
            <Link
              href={`/projects/${nextProject.slug}/`}
              className="inline-flex items-center gap-2 display-h3 text-warm hover:text-gold transition-colors"
            >
              {nextProject.name}
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
