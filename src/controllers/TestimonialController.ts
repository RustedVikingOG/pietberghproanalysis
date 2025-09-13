import { TestimonialService } from '@/services/TestimonialService';
import type { Testimonial } from '@/models/Testimonial';

export class TestimonialController {
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      return await TestimonialService.fetchTestimonials();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}