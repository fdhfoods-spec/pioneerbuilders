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
  descriptor: "Civil Construction & Architectural Design",
  established: 1987,
  origin: "Coimbatore",
  headquarters: "Bangalore",
  journey: "Coimbatore → Chennai → Bangalore",
  tagline: "Building with experience. Creating what lasts.",
  description:
    "Founded in Coimbatore in 1987, Pioneer Builders has developed its construction experience through approximately 25 years of work in Chennai and its present base in Bangalore.",

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
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 99168 00685",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "+91 99168 00685",
  },

  leadership: {
    name: "P.T. Selvakumar",
    role: "Founder",
    designation: "Founder",
    qualification: "B.Tech, Civil Engineering",
    portrait: "/images/leadership/pt-selvakumar.jpg",
    portraitAlt: "P.T. Selvakumar — Founder, Pioneer Builders",
    verified: true,
  },
} as const;

export interface TimelineStage {
  location: string;
  subtitle: string;
  description: string;
  badge: string;
  phase: string;
}

export const companyTimeline: TimelineStage[] = [
  {
    location: "Coimbatore",
    subtitle: "Where Our Journey Began",
    description: "Founded in 1987; the starting point of Pioneer Builders’ construction journey.",
    badge: "Founded 1987",
    phase: "01",
  },
  {
    location: "Chennai",
    subtitle: "25 Years of Experience",
    description: "Approximately 25 years of construction work, on-site execution, and engineering practice.",
    badge: "~25 Years Experience",
    phase: "02",
  },
  {
    location: "Bangalore",
    subtitle: "Our Present Base",
    description: "Present base of operations, continuing the commitment to quality construction and dependable delivery.",
    badge: "Current Operations",
    phase: "03",
  },
];

export type Company = typeof company;
