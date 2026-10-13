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

const C = "/images/categories";
const P = "/images/placeholders";

export const projects: Project[] = [
  {
    slug: "sample-apartment-tower",
    name: "Sample Apartment Tower",
    category: "apartments",
    location: "Location to be confirmed",
    year: "2023",
    scope: ["Structure", "Finishing", "Services coordination"],
    summary: "Placeholder record for a multi-storey apartment project.",
    description:
      "This is a dummy project record used to demonstrate the layout of a project page. Replace it with the real project brief, scope of work, key challenges and outcome once verified.",
    image: `${C}/apartments.jpg`,
    imageAlt: "High-rise residential apartment towers with architectural concrete and evening lighting",
    gallery: [
      { src: `${C}/residential.jpg`, alt: "Residential facade detail" },
      { src: `${P}/detail-structure.svg`, alt: "Structural detail" },
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
    year: "2023",
    scope: ["Structure", "Services coordination", "Phased handover"],
    summary: "Placeholder record for a healthcare building.",
    description:
      "This is a dummy project record. Replace it with the real project brief, scope, constraints and outcome once verified.",
    image: `${C}/hospitals.jpg`,
    imageAlt: "Modern healthcare center with curved glass facade and drop-off entrance portico",
    gallery: [
      { src: `${C}/public.jpg`, alt: "Public healthcare campus plaza" },
      { src: `${P}/crane-site.svg`, alt: "Construction site engineering" },
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
    year: "2023",
    scope: ["Custom residence", "Detailed finishing"],
    summary: "Placeholder record for an individual villa.",
    description:
      "This is a dummy project record. Replace it with the real project brief, scope and outcome once verified.",
    image: `${C}/villas.jpg`,
    imageAlt: "Luxury modern architectural villa with cantilevered slabs and infinity pool",
    gallery: [
      { src: `${C}/residential.jpg`, alt: "Residential architectural detail" },
      { src: `${P}/detail-structure.svg`, alt: "Structural engineering detail" },
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
    year: "2023",
    scope: ["Multi-block construction", "Phased delivery"],
    summary: "Placeholder record for a multi-building housing project.",
    description:
      "This is a dummy project record. Replace it with the real project brief, scope and outcome once verified.",
    image: `${C}/group-housing.jpg`,
    imageAlt: "Master-planned group housing community with landscaped courtyards and terraces",
    gallery: [
      { src: `${C}/apartments.jpg`, alt: "Residential housing blocks" },
      { src: `${P}/detail-structure.svg`, alt: "Structural foundation detail" },
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
    year: "2023",
    scope: ["Industrial shed", "Foundations and flooring"],
    summary: "Placeholder record for an industrial building.",
    description:
      "This is a dummy project record. Replace it with the real project brief, scope and outcome once verified.",
    image: `${C}/industrial.jpg`,
    imageAlt: "High-tech industrial manufacturing and logistics facility with structural steel framing",
    gallery: [
      { src: `${P}/detail-structure.svg`, alt: "Structural column detail" },
      { src: `${P}/crane-site.svg`, alt: "Erection and site coordination" },
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
    year: "2023",
    scope: ["Institutional building", "Public-use facilities"],
    summary: "Placeholder record for a public project.",
    description:
      "This is a dummy project record. Replace it with the real project brief, scope and outcome once verified.",
    image: `${C}/public.jpg`,
    imageAlt: "Grand public institutional building with concrete colonnade and civic plaza",
    gallery: [
      { src: `${P}/detail-facade.svg`, alt: "Facade detail" },
      { src: `${P}/detail-structure.svg`, alt: "Structural detail" },
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
    year: "2023",
    scope: ["Structure", "Finishing"],
    summary: "Placeholder record for a residential building.",
    description:
      "This is a dummy project record. Replace it with the real project brief, scope and outcome once verified.",
    image: `${C}/residential.jpg`,
    imageAlt: "Contemporary multi-story residential building with cast concrete balconies and timber louvers",
    gallery: [
      { src: `${C}/villas.jpg`, alt: "Bespoke residential finishing" },
      { src: `${P}/crane-site.svg`, alt: "Construction execution" },
    ],
    aspect: "square",
    featured: false,
    isPlaceholder: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const galleryImages: { src: string; alt: string; span: string }[] = [
  { src: "/images/hero/hero-building.jpg", alt: "Signature contemporary civil engineering structure", span: "md:col-span-7 md:row-span-2" },
  { src: `${C}/residential.jpg`, alt: "Multi-story residential complex facade", span: "md:col-span-5" },
  { src: `${C}/industrial.jpg`, alt: "Industrial structural steel warehouse and logistics facility", span: "md:col-span-5" },
  { src: `${C}/villas.jpg`, alt: "Luxury modern architectural villa residence", span: "md:col-span-4" },
  { src: `${C}/hospitals.jpg`, alt: "Modern healthcare center with curved glass facade", span: "md:col-span-4" },
  { src: `${C}/public.jpg`, alt: "Grand public institutional building with concrete colonnade", span: "md:col-span-4" },
];
