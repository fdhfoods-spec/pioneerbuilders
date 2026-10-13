import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/testimonials";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";

export function TrustSection() {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 lg:py-32 bg-charcoal-2 border-b border-warm/10 overflow-hidden">
      <div className="container-x">
        <SectionHeading
          eyebrow="CLIENT PERSPECTIVES"
          title="What People Tell About Us."
        >
          <p>
            Genuine reflections from homeowners, industrial facility managers, and institutional
            partners built through decades of civil construction and architectural coordination
            across Coimbatore, Chennai, and Bangalore.
          </p>
        </SectionHeading>

        <div className="mt-14" data-reveal>
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
}
