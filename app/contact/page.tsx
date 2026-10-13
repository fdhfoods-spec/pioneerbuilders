import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { company } from "@/content/company";
import { hasEmail, hasPhone, hasWhatsapp, mailHref, telHref, whatsappHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact & Project Enquiry",
  description:
    "Connect with Pioneer Builders in Electronic City, Bangalore. Submit your civil construction enquiry or connect directly via verified contact channels.",
  path: "/contact/",
});

export default function ContactPage() {
  const mail = mailHref();
  const tel = telHref();
  const wa = whatsappHref();

  return (
    <div className="relative pt-[76px]">
      {/* Page Header */}
      <section className="relative py-20 lg:py-28 bg-charcoal border-b border-warm/10">
        <div className="container-x">
          <p className="eyebrow text-gold mb-6 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-gold" />
            Direct Engagement
          </p>
          <h1 className="display-hero text-4xl sm:text-6xl lg:text-7xl text-warm max-w-4xl tracking-tight">
            CONNECT WITH OUR
            <br />
            PROJECT TEAM.
          </h1>
          <p className="mt-8 max-w-2xl text-base sm:text-lg text-warm/75 leading-relaxed font-sans">
            Whether planning an upcoming civil project, scheduling an initial architectural consultation,
            or seeking structural estimation, our Bangalore office is ready to assist.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Office Details */}
      <section className="py-20 lg:py-28 bg-charcoal-2 border-b border-warm/10">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>

            {/* Office & Direct Contact Column */}
            <div className="lg:col-span-5 space-y-10">
              {/* Registered Office */}
              <div className="border-l-4 border-l-forest border-y border-r border-warm/15 bg-charcoal p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="eyebrow text-forest-accent flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-forest" aria-hidden />
                    Official Location
                  </span>
                  <span className="text-[0.68rem] font-mono text-concrete uppercase tracking-widest">Active</span>
                </div>
                <h3 className="display-h3 text-warm mb-3">{company.registeredOffice.label}</h3>
                <address className="not-italic text-sm text-warm/80 leading-relaxed font-sans">
                  {company.registeredOffice.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <div className="mt-6 pt-4 border-t border-warm/10 text-xs text-concrete">
                  Electronic City Phase 1 • Bangalore 560100
                </div>
              </div>

              {/* Admin Office */}
              <div className="border-l-4 border-l-concrete border-y border-r border-warm/15 bg-charcoal p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="eyebrow text-concrete">{company.adminOffice.label}</span>
                  <PlaceholderTag tone="concrete">Pending Verification</PlaceholderTag>
                </div>
                <h3 className="display-h3 text-warm mb-3">Administrative Facility</h3>
                <p className="text-sm text-warm/60 leading-relaxed">
                  {company.adminOffice.lines.join(", ")}
                </p>
                <p className="text-xs text-concrete mt-4 pt-4 border-t border-warm/10">
                  Address details will be published following handwriting confirmation.
                </p>
              </div>

              {/* Direct Channels */}
              <div className="border-l-4 border-l-gold border-y border-r border-warm/15 bg-charcoal p-8">
                <span className="eyebrow text-gold block mb-4">Direct Channels</span>
                <ul className="space-y-4 text-sm">
                  <li className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-concrete">Email</span>
                    {hasEmail && mail ? (
                      <a href={mail} className="text-warm hover:text-gold font-semibold transition-colors mt-1">
                        {company.contact.email}
                      </a>
                    ) : (
                      <span className="text-concrete mt-1">Email address to be configured</span>
                    )}
                  </li>

                  <li className="flex flex-col pt-3 border-t border-warm/10">
                    <span className="text-xs uppercase tracking-wider text-concrete">Phone</span>
                    {hasPhone && tel ? (
                      <a href={tel} className="text-warm hover:text-gold font-semibold transition-colors mt-1">
                        {company.contact.phone}
                      </a>
                    ) : (
                      <span className="text-concrete mt-1">Telephone number to be configured</span>
                    )}
                  </li>

                  <li className="flex flex-col pt-3 border-t border-warm/10">
                    <span className="text-xs uppercase tracking-wider text-concrete">WhatsApp</span>
                    {hasWhatsapp && wa ? (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest-accent hover:text-warm font-semibold transition-colors mt-1 flex items-center gap-1.5"
                      >
                        <span className="size-1.5 rounded-full bg-forest" aria-hidden />
                        {company.contact.whatsapp} (WhatsApp)
                      </a>
                    ) : (
                      <span className="text-concrete mt-1">WhatsApp number to be configured</span>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
