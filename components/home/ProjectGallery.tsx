import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryImages } from "@/content/projects";

export function ProjectGallery() {
  return (
    <section className="relative py-24 lg:py-32 bg-charcoal border-b border-warm/10">
      <div className="container-x">
        <div className="mb-16">
          <SectionHeading
            title="Architectural Perspective."
          >
            <p>
              A visual record of site geometry, structural formwork, and elevation studies across
              diverse civil categories.
            </p>
          </SectionHeading>
        </div>

        {/* Spacious Architectural Gallery Grid */}
        <div className="grid gap-6 md:grid-cols-12">
          {galleryImages.map((img, idx) => (
            <div
              key={img.src + idx}
              data-reveal
              data-delay={idx * 0.05}
              className={`relative overflow-hidden border border-warm/15 bg-charcoal-2 aspect-[16/10] ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/20 hover:bg-transparent transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
