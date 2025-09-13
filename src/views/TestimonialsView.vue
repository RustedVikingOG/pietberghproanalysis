<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <HeroSection :hero-data="heroData" />

    <!-- Testimonials List -->
    <section class="section-padding">
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
import HeroSection from '@/components/HeroSection.vue';
import TestimonialCard from '@/components/TestimonialCard.vue';
import FooterSection from '@/components/FooterSection.vue';
import { TestimonialController } from '@/controllers/TestimonialController';
import type { Testimonial } from '@/models/Testimonial';

const testimonials = ref<Testimonial[]>([]);
const heroData = {
  mainTitle: 'Testimonials',
  subtitle: 'Hear from our satisfied clients',
  description: 'Discover how our services have positively impacted our clients.',
  tagline: 'Real stories, real results.',
  callToAction: 'Contact us to share your experience.',
};

const controller = new TestimonialController();

onMounted(async () => {
  testimonials.value = await controller.getTestimonials();
});

const handleContact = () => {
  // Navigate to contact page
};
</script>