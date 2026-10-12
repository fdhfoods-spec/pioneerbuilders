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
    image: "/images/categories/residential.jpg",
    imageAlt: "Contemporary multi-story residential building with cast concrete balconies and timber louvers",
  },
  {
    slug: "industrial",
    title: "Industrial Buildings",
    description:
      "Production, storage and logistics structures designed around load, span and workflow.",
    scope: ["Industrial sheds and frames", "Foundations and flooring", "Utilities coordination"],
    image: "/images/categories/industrial.jpg",
    imageAlt: "High-tech industrial manufacturing and logistics facility with structural steel framing",
  },
  {
    slug: "public",
    title: "Public Buildings",
    description:
      "Civic and institutional structures built to serve communities and to last.",
    scope: ["Institutional buildings", "Public-use facilities", "Compliance-led execution"],
    image: "/images/categories/public.jpg",
    imageAlt: "Grand public institutional building with concrete colonnade and civic plaza",
  },
  {
    slug: "group-housing",
    title: "Group Housing",
    description:
      "Coordinated residential communities delivered as multi-building projects.",
    scope: ["Multi-block construction", "Phased delivery planning", "Common infrastructure"],
    image: "/images/categories/group-housing.jpg",
    imageAlt: "Master-planned group housing community with landscaped courtyards and terraces",
  },
  {
    slug: "villas",
    title: "Villas",
    description:
      "Individually detailed homes where space, light and finish receive close attention.",
    scope: ["Custom residences", "Detailed finishing", "Landscape-ready sites"],
    image: "/images/categories/villas.jpg",
    imageAlt: "Luxury modern architectural villa with cantilevered slabs and infinity pool",
  },
  {
    slug: "hospitals",
    title: "Hospitals",
    description:
      "Healthcare buildings that call for careful coordination of services, access and safety.",
    scope: ["Healthcare facilities", "Services and MEP coordination", "Phased handover"],
    image: "/images/categories/hospitals.jpg",
    imageAlt: "Modern healthcare center with curved glass facade and drop-off entrance portico",
  },
  {
    slug: "apartments",
    title: "Apartments",
    description:
      "Multi-storey residential buildings delivered with structural discipline and orderly execution.",
    scope: ["Mid- and high-rise frames", "Vertical circulation and cores", "Quality inspection"],
    image: "/images/categories/apartments.jpg",
    imageAlt: "High-rise residential apartment towers with architectural concrete and evening lighting",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
