import type { Testimonial } from '@/models/Testimonial';

export class TestimonialService {
  static async fetchTestimonials(): Promise<Testimonial[]> {
    const response = await fetch('/api/testimonials');
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return await response.json() as Testimonial[];
  }
}