export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  linkedInUrl?: string;
}

// Driven by data file; empty by default and renders nothing when empty.
// Do not add placeholder quotes per hiring SEO guidelines.
export const testimonials: Testimonial[] = [];
