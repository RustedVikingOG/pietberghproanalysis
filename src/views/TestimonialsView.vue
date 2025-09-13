<template>
  <div class="min-h-screen bg-white">

    <div class="h-10"></div>
    <!-- Testimonials Hero Section -->
    <TestimonialsHero 
      :featured-testimonial="featuredTestimonial"
      :testimonial-stats="testimonialStats"
      @view-all-testimonials="scrollToTestimonials"
    />

    <!-- Testimonials List -->
    <section id="testimonials-list" class="section-padding">
      <div class="container-section">
        <h2 class="heading-section text-center mb-8">What Our Clients Say</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard v-for="testimonial in testimonials" :key="testimonial.id" :testimonial="testimonial" />
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="section-padding bg-primary-50">
      <div class="container-section text-center">
        <h2 class="heading-section mb-4">Want to Share Your Experience?</h2>
        <p class="text-slate-600 mb-8">Contact us to leave your testimonial and inspire others.</p>
        <button @click="handleContact" class="btn-primary">Contact Us</button>
      </div>
    </section>

    <!-- Footer -->
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TestimonialsHero from '@/components/TestimonialsHero.vue';
import TestimonialCard from '@/components/TestimonialCard.vue';
import FooterSection from '@/components/FooterSection.vue';
import { TestimonialController } from '@/controllers/TestimonialController';
import type { Testimonial } from '@/models/Testimonial';

// Router for navigation
const router = useRouter();

const testimonials = ref<Testimonial[]>([]);
const featuredTestimonial = ref<Testimonial | null>(null);
const testimonialStats = ref({
  totalTestimonials: 0,
  averageRating: '0.0',
  clientSatisfaction: '0%'
});

const controller = new TestimonialController();

onMounted(async () => {
  // Load all testimonials
  testimonials.value = await controller.getTestimonials();
  
  // Load featured testimonial and stats for hero
  featuredTestimonial.value = await controller.getFeaturedTestimonial();
  testimonialStats.value = await controller.getTestimonialStats();
});

// Scroll to testimonials section
const scrollToTestimonials = () => {
  const testimonialsSection = document.getElementById('testimonials-list');
  if (testimonialsSection) {
    testimonialsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const handleContact = () => {
  router.push('/contact');
};
</script>