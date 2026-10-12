export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
}

/**
 * Intentionally empty. No customer quotes, ratings or logos have been supplied.
 * The <Testimonials /> component renders nothing while this list is empty,
 * so the section is omitted from the production page until verified content exists.
 */
export const testimonials: Testimonial[] = [];
