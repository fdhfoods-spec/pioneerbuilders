import { company } from "@/content/company";
import { absoluteUrl, hasConfirmedUrl } from "./site";

/**
 * Organization structured data using ONLY supplied, verified facts:
 * name, founding year and registered office address. No ratings, coordinates,
 * hours, awards or invented contact points. URL/email/phone are included only if configured.
 */
export function organizationJsonLd() {
  const { registeredOffice: a, contact } = company;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    description: company.description,
    foundingDate: String(company.established),
    ...(hasConfirmedUrl ? { url: absoluteUrl("/") } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.locality,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
  };
}
