import type { ServiceSlug } from "./services";

/**
 * ALL RECORDS BELOW ARE DUMMY PLACEHOLDERS.
 * They are not real Pioneer Builders projects. Replace names, locations, years,
 * scope, copy and images with verified project data before launch.
 * `isPlaceholder` drives the visible "Sample" marker in the UI; set it to false
 * (per record) once the data and photography are real.
 */
export interface Project {
  slug: string;
  name: string;
  category: ServiceSlug;
  location: string;
  year: string;
  scope: string[];
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  aspect: "landscape" | "portrait" | "square";
  featured: boolean;
  isPlaceholder: boolean;
}

const P = "/images/placeholders";

export const projects: Project[] = [
  {
    slug: "sample-apartment-tower",
    name: "Sample Apartment Tower",
    category: "apartments",
    location: "Location to be confirmed",
    year: "20XX",
    scope: ["Structure", "Finishing", "Services coordination"],
    summary: "Placeholder record for a multi-storey apartment project.",
    description:
      "This is a dummy project record used to demonstrate the layout of a project page. Replace it with the real project brief, scope of work, key challenges and outcome once verified.",
    image: `${P}/apartments.svg`,
    imageAlt: "Placeholder drawing of an apartment tower",
    gallery: [
      { src: `${P}/detail-facade.svg`, alt: "Placeholder facade detail" },
      { src: `${P}/detail-structure.svg`, alt: "Placeholder structural detail" },
    ],
    aspect: "portrait",
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "sample-hospital-block",
    name: "Sample Hospital Block",
    category: "hospitals",
    location: "Location to be confirmed",
    year: "20XX",
    scope: ["Structure", "Services coordination", "Phased handover"],
    summary: "Placeholder record for a healthcare building.",
    description:
      "This is a dummy project record. Replace it with the real project brief, scope, constraints and outcome once verified.",
    image: `${P}/hospital.svg`,
    imageAlt: "Placeholder drawing of a hospital building",
    gallery: [
      { src: `${P}/detail-facade.svg`, alt: "Placeholder facade detail" },
      { src: `${P}/crane-site.svg`, alt: "Placeholder construction site drawing" },
    ],
    aspect: "landscape",
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "sample-villa-residence",
    name: "Sample Villa Residence",
    category: "villas",
    location: "Location to be confirmed",
    year: "20XX",
    scope: ["Custom residence", "Detailed finishing"],
    summary: "Placeholder record for an individual villa.",
    description:
      "This is a dummy project record. Replace it with the real project brief, scope and outcome once verified.",
    image: `${P}/villa.svg`,
    imageAlt: "Placeholder drawing of a modern villa",
    gallery: [
      { src: `${P}/detail-facade.svg`, alt: "Placeholder facade detail" },
      { src: `${P}/detail-structure.svg`, alt: "Placeholder structural detail" },
    ],
    aspect: "square",
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "sample-group-housing",
    name: "Sample Group Housing Community",
    category: "group-housing",
    location: "Location to be confirmed",
    year: "20XX",
    scope: ["Multi-block construction", "Phased delivery"],
    summary: "Placeholder record for a multi-building housing project.",
    description:
      "This is a dummy project record. Replace it with the real project brief, scope and outcome once verified.",
    image: `${P}/group-housing.svg`,
    imageAlt: "Placeholder drawing of group housing blocks",
    gallery: [
      { src: `${P}/crane-site.svg`, alt: "Placeholder construction site drawing" },
      { src: `${P}/detail-structure.svg`, alt: "Placeholder structural detail" },
    ],
    aspect: "landscape",
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "sample-industrial-facility",
    name: "Sample Industrial Facility",
    category: "industrial",
    location: "Location to be confirmed",
    year: "20XX",
    scope: ["Industrial shed", "Foundations and flooring"],
    summary: "Placeholder record for an industrial building.",
    description:
      "This is a dummy project record. Replace it with the real project brief, scope and outcome once verified.",
    image: `${P}/industrial.svg`,
    imageAlt: "Placeholder drawing of an industrial facility",
    gallery: [
      { src: `${P}/detail-structure.svg`, alt: "Placeholder structural detail" },
      { src: `${P}/crane-site.svg`, alt: "Placeholder construction site drawing" },
    ],
    aspect: "portrait",
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "sample-public-building",
    name: "Sample Public Building",
    category: "public",
    location: "Location to be confirmed",
    year: "20XX",
    scope: ["Institutional building", "Public-use facilities"],
    summary: "Placeholder record for a public project.",
    description:
      "This is a dummy project record. Replace it with the real project brief, scope and outcome once verified.",
    image: `${P}/public.svg`,
    imageAlt: "Placeholder drawing of a public building",
    gallery: [
      { src: `${P}/detail-facade.svg`, alt: "Placeholder facade detail" },
      { src: `${P}/detail-structure.svg`, alt: "Placeholder structural detail" },
    ],
    aspect: "landscape",
    featured: false,
    isPlaceholder: true,
  },
  {
    slug: "sample-residential-building",
    name: "Sample Residential Building",
    category: "residential",
    location: "Location to be confirmed",
    year: "20XX",
    scope: ["Structure", "Finishing"],
    summary: "Placeholder record for a residential building.",
    description:
      "This is a dummy project record. Replace it with the real project brief, scope and outcome once verified.",
    image: `${P}/residential.svg`,
    imageAlt: "Placeholder drawing of a residential building",
    gallery: [
      { src: `${P}/detail-facade.svg`, alt: "Placeholder facade detail" },
      { src: `${P}/crane-site.svg`, alt: "Placeholder construction site drawing" },
    ],
    aspect: "square",
    featured: false,
    isPlaceholder: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const galleryImages: { src: string; alt: string; span: string }[] = [
  { src: `${P}/crane-site.svg`, alt: "Placeholder drawing of a construction site with a tower crane", span: "md:col-span-7 md:row-span-2" },
  { src: `${P}/detail-facade.svg`, alt: "Placeholder detail of a building facade", span: "md:col-span-5" },
  { src: `${P}/detail-structure.svg`, alt: "Placeholder detail of structural columns and beams", span: "md:col-span-5" },
  { src: `${P}/villa.svg`, alt: "Placeholder drawing of a modern villa", span: "md:col-span-4" },
  { src: `${P}/hospital.svg`, alt: "Placeholder drawing of a hospital building", span: "md:col-span-4" },
  { src: `${P}/public.svg`, alt: "Placeholder drawing of a public building", span: "md:col-span-4" },
];
