/**
 * Single source of truth for company facts.
 *
 * VERIFIED (supplied by client): name, establishment year, registered office,
 * leader's name and qualification wording (spelling/wording still to be confirmed).
 *
 * NOT YET SUPPLIED: domain, email, phone, WhatsApp, admin office, leader's designation.
 * Contact channels are configured via environment variables (see .env.example)
 * so the real values can be added at deploy time without touching code.
 */

export const company = {
  name: "Pioneer Builders",
  descriptor: "Civil Construction",
  established: 1987,
  tagline: "Building with experience. Creating what lasts.",
  description:
    "Pioneer Builders is a civil construction company established in 1987, building residential, industrial and public structures.",

  /** Final domain is unconfirmed. Leave null until confirmed. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,

  registeredOffice: {
    label: "Registered Office",
    lines: [
      "B702, 7th Floor, Sipani Viveza",
      "2nd Cross, Electronic City Phase 1",
      "Bangalore – 560100",
    ],
    street: "B702, 7th Floor, Sipani Viveza, 2nd Cross, Electronic City Phase 1",
    locality: "Bangalore",
    postalCode: "560100",
    country: "IN",
  },

  /** Handwritten address is awaiting verification. */
  adminOffice: {
    label: "Admin Office",
    lines: ["Address to be confirmed"] as string[],
    verified: false,
  },

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null,
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? null,
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? null,
  },

  leadership: {
    name: "P.T. Selvakumar",
    qualification: "B.Tech, Civil",
    /** Designation not supplied. Do not invent one. */
    designation: null as string | null,
    verified: false,
  },
} as const;

export type Company = typeof company;
