import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/testimonials";

export function TrustSection() {
  // If verified content is unavailable, omit the testimonial section from the production release.
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 lg:py-32 bg-charcoal border-b border-warm/10">
      <div className="container-x">
        <SectionHeading
          title="Built on Relationships."
        >
          <p>Verified endorsements from clients and project stakeholders.</p>
        </SectionHeading>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              data-reveal
              className="border border-warm/15 bg-charcoal-2 p-8 flex flex-col justify-between"
            >
              <blockquote className="text-sm text-warm/80 leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-6 pt-4 border-t border-warm/10">
                <p className="font-semibold text-warm text-sm">{item.name}</p>
                <p className="text-xs text-concrete">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
