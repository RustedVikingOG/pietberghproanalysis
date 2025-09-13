<template>
  <div class="bg-white rounded-xl shadow-lg p-8">
    <h3 class="text-2xl font-bold text-slate-900 mb-6">Send a Message</h3>
    
    <!-- Success/Error Messages -->
    <div v-if="submissionResult" class="mb-6">
      <div 
        :class="[
          'p-4 rounded-lg',
          submissionResult.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        ]"
      >
        {{ submissionResult.message }}
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Name Field -->
      <div>
        <label for="name" class="block text-sm font-semibold text-slate-700 mb-2">
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          :value="formData.name"
          @input="updateField('name', ($event.target as HTMLInputElement).value)"
          @blur="validateField('name')"
          :class="[
            'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
            fieldErrors.name ? 'border-red-500 bg-red-50' : 'border-slate-300'
          ]"
          placeholder="Enter your full name"
          required
        />
        <p v-if="fieldErrors.name" class="mt-1 text-sm text-red-600">
          {{ fieldErrors.name }}
        </p>
      </div>

      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-semibold text-slate-700 mb-2">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          :value="formData.email"
          @input="updateField('email', ($event.target as HTMLInputElement).value)"
          @blur="validateField('email')"
          :class="[
            'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
            fieldErrors.email ? 'border-red-500 bg-red-50' : 'border-slate-300'
          ]"
          placeholder="Enter your email address"
          required
        />
        <p v-if="fieldErrors.email" class="mt-1 text-sm text-red-600">
          {{ fieldErrors.email }}
        </p>
      </div>

      <!-- Company Field (Optional) -->
      <div>
        <label for="company" class="block text-sm font-semibold text-slate-700 mb-2">
          Company
        </label>
        <input
          id="company"
          type="text"
          :value="formData.company"
          @input="updateField('company', ($event.target as HTMLInputElement).value)"
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Your company name (optional)"
        />
      </div>

      <!-- Phone Field (Optional) -->
      <div>
        <label for="phone" class="block text-sm font-semibold text-slate-700 mb-2">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          :value="formData.phone"
          @input="updateField('phone', ($event.target as HTMLInputElement).value)"
          @blur="validateField('phone')"
          :class="[
            'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
            fieldErrors.phone ? 'border-red-500 bg-red-50' : 'border-slate-300'
          ]"
          placeholder="Your phone number (optional)"
        />
        <p v-if="fieldErrors.phone" class="mt-1 text-sm text-red-600">
          {{ fieldErrors.phone }}
        </p>
      </div>

      <!-- Subject Field -->
      <div>
        <label for="subject" class="block text-sm font-semibold text-slate-700 mb-2">
          Subject *
        </label>
        <input
          id="subject"
          type="text"
          :value="formData.subject"
          @input="updateField('subject', ($event.target as HTMLInputElement).value)"
          @blur="validateField('subject')"
          :class="[
            'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
            fieldErrors.subject ? 'border-red-500 bg-red-50' : 'border-slate-300'
          ]"
          placeholder="Brief description of your inquiry"
          required
        />
        <p v-if="fieldErrors.subject" class="mt-1 text-sm text-red-600">
          {{ fieldErrors.subject }}
        </p>
      </div>

      <!-- Message Field -->
      <div>
        <label for="message" class="block text-sm font-semibold text-slate-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          :value="formData.message"
          @input="updateField('message', ($event.target as HTMLTextAreaElement).value)"
          @blur="validateField('message')"
          :class="[
            'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y',
            fieldErrors.message ? 'border-red-500 bg-red-50' : 'border-slate-300'
          ]"
          rows="6"
          placeholder="Please describe your inquiry or project requirements in detail..."
          required
        ></textarea>
        <p v-if="fieldErrors.message" class="mt-1 text-sm text-red-600">
          {{ fieldErrors.message }}
        </p>
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          :disabled="submitButtonDisabled"
          :class="[
            'w-full px-6 py-4 text-white font-semibold rounded-lg transition-all duration-200',
            submitButtonDisabled
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transform hover:scale-[1.02]'
          ]"
        >
          {{ submitButtonText }}
        </button>
      </div>

      <p class="text-sm text-slate-500 text-center mt-4">
        Fields marked with * are required. Your information will be used only to respond to your inquiry.
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useContactForm } from '@/composables/useContactForm';

/**
 * ContactForm Component - Handles contact form display, validation, and submission
 * Purely presentational with no business logic
 */

// Use the contact form composable for all form logic
const {
  formData,
  fieldErrors,
  submissionResult,
  submitButtonText,
  submitButtonDisabled,
  updateField,
  validateField,
  submitForm
} = useContactForm();

/**
 * Handle form submission
 */
const handleSubmit = async (): Promise<void> => {
  await submitForm();
};
</script>