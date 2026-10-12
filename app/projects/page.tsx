import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Civil Construction Projects Portfolio",
  description:
    "Explore Pioneer Builders' project portfolio across residential, industrial, healthcare, villa, and public building categories.",
  path: "/projects/",
});

export default function ProjectsPage() {
  return (
    <div className="relative pt-[76px]">
      {/* Header */}
      <section className="relative py-20 lg:py-28 bg-charcoal border-b border-warm/10">
        <div className="container-x">
          <div className="flex items-center gap-3 mb-6">
            <span className="eyebrow text-gold">Civil Project Portfolio</span>
            <PlaceholderTag>Sample Records</PlaceholderTag>
          </div>
          <h1 className="display-hero text-4xl sm:text-6xl lg:text-7xl text-warm max-w-4xl tracking-tight">
            STRUCTURES IN FOCUS.
          </h1>
          <p className="mt-8 max-w-2xl text-base sm:text-lg text-warm/75 leading-relaxed font-sans">
            Filter our civil construction work across sectors. All records below represent sample
            architectural records designed to illustrate the portfolio layout until verified company
            photography and project documentation are uploaded.
          </p>
        </div>
      </section>

      {/* Projects Grid Section with Interactive Filtering */}
      <section className="py-20 lg:py-28 bg-charcoal-2 border-b border-warm/10">
        <div className="container-x">
          <ProjectGrid />
        </div>
      </section>
    </div>
  );
}
