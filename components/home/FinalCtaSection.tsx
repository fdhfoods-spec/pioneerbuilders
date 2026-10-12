import { ButtonLink, DisabledButton } from "@/components/ui/ButtonLink";
import { company } from "@/content/company";
import { hasWhatsapp, whatsappHref } from "@/lib/contact";

export function FinalCtaSection() {
  const wa = whatsappHref("Hello Pioneer Builders, I would like to discuss a construction project.");

  return (
    <section className="relative py-28 lg:py-36 bg-charcoal-2 border-t border-warm/15">
      <div className="container-x">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <p
            data-reveal
            className="eyebrow text-gold mb-6 flex items-center justify-center gap-3"
          >
            <span aria-hidden className="h-px w-8 bg-gold" />
            Project Engagement
            <span aria-hidden className="h-px w-8 bg-gold" />
          </p>

          <h2
            data-reveal
            data-delay={0.08}
            className="display-hero text-3xl sm:text-5xl lg:text-6xl text-warm tracking-tight"
          >
            YOUR NEXT PROJECT STARTS
            <br />
            WITH A CONVERSATION.
          </h2>

          <p
            data-reveal
            data-delay={0.16}
            className="mt-6 max-w-xl text-base sm:text-lg text-warm/75 font-sans leading-relaxed"
          >
            Tell us about your construction requirements and connect with our team.
          </p>

          <div
            data-reveal
            data-delay={0.24}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <ButtonLink href="/contact/" variant="primary">
              Send an Enquiry
            </ButtonLink>

            {hasWhatsapp && wa ? (
              <ButtonLink href={wa} variant="outline" external>
                WhatsApp Us
              </ButtonLink>
            ) : (
              <DisabledButton reason="WhatsApp number to be configured" className="border-warm/25">
                WhatsApp Us
              </DisabledButton>
            )}
          </div>

          <p
            data-reveal
            data-delay={0.32}
            className="mt-12 text-xs text-concrete uppercase tracking-widest"
          >
            {company.name} • Electronic City Phase 1, Bangalore • Est. {company.established}
          </p>
        </div>
      </div>
    </section>
  );
}
