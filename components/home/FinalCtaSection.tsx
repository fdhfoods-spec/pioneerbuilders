import { ButtonLink } from "@/components/ui/ButtonLink";
import { company } from "@/content/company";
import { hasEmail, mailHref } from "@/lib/contact";
import { InstagramIcon, EmailIcon } from "@/components/ui/SocialIcons";

export function FinalCtaSection() {
  const mail = mailHref("Civil Construction Enquiry - Pioneer Builders", "Hello Pioneer Builders team,\n\nI would like to discuss a construction project.\n");

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-charcoal-2 border-t border-warm/15">
      <div className="container-x">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <p
            data-reveal
            className="eyebrow text-gold mb-5 flex items-center justify-center gap-3"
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
            className="mt-5 max-w-xl text-base sm:text-lg text-warm/75 font-sans leading-relaxed"
          >
            Tell us about your construction requirements and connect with our team.
          </p>

          <div
            data-reveal
            data-delay={0.24}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <ButtonLink href="/contact/" variant="primary">
              Send an Enquiry
            </ButtonLink>

            {hasEmail && mail && (
              <ButtonLink href={mail} variant="outline" className="inline-flex items-center gap-2">
                <EmailIcon className="size-4 shrink-0" />
                Email Our Team
              </ButtonLink>
            )}

            <ButtonLink
              href={company.social.instagram}
              variant="outline"
              external
              className="inline-flex items-center gap-2"
            >
              <InstagramIcon className="size-4 shrink-0" />
              Follow @{company.social.instagramHandle}
            </ButtonLink>
          </div>

          <p
            data-reveal
            data-delay={0.32}
            className="mt-10 text-xs text-concrete uppercase tracking-widest"
          >
            {company.name} • Electronic City Phase 1, Bangalore • Est. {company.established}
          </p>
        </div>
      </div>
    </section>
  );
}
