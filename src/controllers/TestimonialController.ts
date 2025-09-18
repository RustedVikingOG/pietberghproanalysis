import { ContentService } from '@/services/ContentService';
import type { Testimonial } from '@/models/Testimonial';

export class TestimonialController {
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      return ContentService.getTestimonials();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Get featured testimonial for hero display
   * @returns Single featured testimonial
   */
  async getFeaturedTestimonial(): Promise<Testimonial | null> {
    try {
      const testimonials = ContentService.getTestimonials();
      // Return the first testimonial or one with the longest message
      if (testimonials.length === 0) return null;
      
      return testimonials.reduce((featured, current) => 
        current.message.length > featured.message.length ? current : featured
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Get testimonial statistics
   * @returns Object with testimonial metrics
   */
  async getTestimonialStats(): Promise<{
    totalTestimonials: number;
    averageRating: string;
    clientSatisfaction: string;
  }> {
    try {
      const testimonials = ContentService.getTestimonials();
      return {
        totalTestimonials: testimonials.length,
        averageRating: '5.0', // Placeholder - could be calculated if ratings exist
        clientSatisfaction: '100%'
      };
    } catch (error) {
      console.error(error);
      return {
        totalTestimonials: 0,
        averageRating: '0.0',
        clientSatisfaction: '0%'
      };
    }
  }
}