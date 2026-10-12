export type ServiceSlug =
  | "residential"
  | "industrial"
  | "public"
  | "group-housing"
  | "villas"
  | "hospitals"
  | "apartments";

export interface Service {
  slug: ServiceSlug;
  title: string;
  /** Provisional copy until the real service scope is verified. */
  description: string;
  /** Provisional scope points. */
  scope: string[];
  image: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    slug: "residential",
    title: "Residential Buildings",
    description:
      "Homes and residential structures planned for everyday living and built for the long term.",
    scope: ["Civil and structural construction", "Finishing and services coordination", "Site supervision"],
    image: "/images/placeholders/residential.svg",
    imageAlt: "Placeholder elevation drawing of a residential building",
  },
  {
    slug: "industrial",
    title: "Industrial Buildings",
    description:
      "Production, storage and logistics structures designed around load, span and workflow.",
    scope: ["Industrial sheds and frames", "Foundations and flooring", "Utilities coordination"],
    image: "/images/placeholders/industrial.svg",
    imageAlt: "Placeholder elevation drawing of an industrial shed",
  },
  {
    slug: "public",
    title: "Public Buildings",
    description:
      "Civic and institutional structures built to serve communities and to last.",
    scope: ["Institutional buildings", "Public-use facilities", "Compliance-led execution"],
    image: "/images/placeholders/public.svg",
    imageAlt: "Placeholder elevation drawing of a public building with a colonnade",
  },
  {
    slug: "group-housing",
    title: "Group Housing",
    description:
      "Coordinated residential communities delivered as multi-building projects.",
    scope: ["Multi-block construction", "Phased delivery planning", "Common infrastructure"],
    image: "/images/placeholders/group-housing.svg",
    imageAlt: "Placeholder elevation drawing of a row of group housing blocks",
  },
  {
    slug: "villas",
    title: "Villas",
    description:
      "Individually detailed homes where space, light and finish receive close attention.",
    scope: ["Custom residences", "Detailed finishing", "Landscape-ready sites"],
    image: "/images/placeholders/villa.svg",
    imageAlt: "Placeholder elevation drawing of a modern villa",
  },
  {
    slug: "hospitals",
    title: "Hospitals",
    description:
      "Healthcare buildings that call for careful coordination of services, access and safety.",
    scope: ["Healthcare facilities", "Services and MEP coordination", "Phased handover"],
    image: "/images/placeholders/hospital.svg",
    imageAlt: "Placeholder elevation drawing of a hospital building",
  },
  {
    slug: "apartments",
    title: "Apartments",
    description:
      "Multi-storey residential buildings delivered with structural discipline and orderly execution.",
    scope: ["Mid- and high-rise frames", "Vertical circulation and cores", "Quality inspection"],
    image: "/images/placeholders/apartments.svg",
    imageAlt: "Placeholder elevation drawing of an apartment tower",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
