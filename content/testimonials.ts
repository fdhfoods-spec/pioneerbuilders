export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  projectType: string;
  discipline: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "narayanan-villa",
    name: "K. Narayanan",
    role: "Homeowner",
    location: "Electronic City, Bangalore",
    projectType: "Custom Villa Residence",
    discipline: "Residential Villas",
    quote:
      "Building our family home with Pioneer Builders was a remarkably reassuring experience. Mr. Selvakumar and his engineering team brought rigorous discipline to the foundation and RCC frame. Their site supervision was meticulous, with zero compromise on concrete quality, curing schedules, and finishing tolerances.",
  },
  {
    id: "sundararajan-industrial",
    name: "R. Sundararajan",
    role: "Managing Director, Precision Components",
    location: "Chennai (Ambattur)",
    projectType: "Industrial Facility & Machine Pits",
    discipline: "Industrial Construction",
    quote:
      "We engaged Pioneer Builders for our factory floor extension and heavy equipment foundations. Their adherence to structural load specifications and strict milestone schedules ensured our machinery installations proceeded without delay. Solid, dependable builders with decades of real factory site experience.",
  },
  {
    id: "hegde-apartments",
    name: "Deepak Hegde",
    role: "Trustee, Residential Apartment Board",
    location: "Bangalore",
    projectType: "Multi-Unit Residential Block",
    discipline: "Apartments & Group Housing",
    quote:
      "From architectural layout coordination to final waterproofing inspection, Pioneer Builders delivered our multi-unit building with complete engineering clarity. What stands out most is their transparent communication—no hidden surprises, no corners cut, and direct engineer-to-client accountability.",
  },
  {
    id: "mohanraj-hospital",
    name: "Dr. S. Mohanraj",
    role: "Director, Clinical Diagnostic Facility",
    location: "Coimbatore",
    projectType: "Diagnostic Care Center",
    discipline: "Hospitals & Public Buildings",
    quote:
      "Our association with Pioneer Builders reflects their deep roots in Coimbatore. When expanding our specialized diagnostic center, their grasp of structural vibration dampening, clean core layouts, and MEP coordination proved invaluable. They build structures engineered to endure.",
  },
  {
    id: "varma-turnkey",
    name: "Priya & Anand Varma",
    role: "Homeowners",
    location: "Whitefield, Bangalore",
    projectType: "Contemporary Duplex Residence",
    discipline: "Architectural Design & Execution",
    quote:
      "Having Pioneer Builders coordinate both the architectural design and the civil execution eliminated the friction between architect and contractor. Space planning, elevation articulation, and daylit courtyards were realized on site exactly as designed. The finish quality speaks for itself.",
  },
];
