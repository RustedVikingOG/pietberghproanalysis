import { ref, reactive, computed, readonly, type Ref } from 'vue';
import { ContactController } from '../controllers/ContactController';
import type { ContactFormData, ContactFormSubmissionResult } from '../models/ContactForm';

/**
 * Composable for form validation and submission logic
 */
export function useContactForm() {
  const contactController = new ContactController();
  
  // Form data state
  const formData: Ref<ContactFormData> = ref({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    phone: ''
  });

  // Form state
  const isSubmitting = ref(false);
  const isSubmitted = ref(false);
  const submissionResult: Ref<ContactFormSubmissionResult | null> = ref(null);
  const fieldErrors = reactive<Record<string, string>>({});
  const isDirty = ref(false);

  // Computed properties
  const isFormValid = computed(() => {
    const validation = contactController.validateForm(formData.value);
    return validation.isValid;
  });

  const hasErrors = computed(() => {
    return Object.keys(fieldErrors).length > 0;
  });

  const submitButtonText = computed(() => {
    if (isSubmitting.value) return 'Sending...';
    if (isSubmitted.value && submissionResult.value?.success) return 'Sent Successfully';
    return 'Send Message';
  });

  const submitButtonDisabled = computed(() => {
    return isSubmitting.value || !isFormValid.value || !isDirty.value;
  });

  /**
   * Update form field value and validate
   * @param field - Field name to update
   * @param value - New field value
   */
  const updateField = (field: keyof ContactFormData, value: string): void => {
    formData.value[field] = value;
    isDirty.value = true;
    
    // Clear previous error for this field
    delete fieldErrors[field];
    
    // Validate field if it has content or was previously validated
    if (value.trim() || fieldErrors[field]) {
      validateField(field);
    }
  };

  /**
   * Validate a specific field
   * @param field - Field to validate
   */
  const validateField = (field: keyof ContactFormData): void => {
    const result = contactController.validateField(field, formData.value[field] || '');
    
    if (!result.isValid && result.error) {
      fieldErrors[field] = result.error;
    } else {
      delete fieldErrors[field];
    }
  };

  /**
   * Validate all form fields
   */
  const validateAllFields = (): boolean => {
    const validation = contactController.validateForm(formData.value);
    
    // Clear all previous errors
    Object.keys(fieldErrors).forEach(key => delete fieldErrors[key]);
    
    // Set new errors
    if (!validation.isValid) {
      validation.errors.forEach(error => {
        const [field, message] = error.split(': ');
        if (field && message) {
          fieldErrors[field.toLowerCase()] = message;
        }
      });
    }
    
    return validation.isValid;
  };

  /**
   * Submit the contact form
   */
  const submitForm = async (): Promise<void> => {
    if (!validateAllFields()) {
      return;
    }

    try {
      isSubmitting.value = true;
      submissionResult.value = await contactController.submitContactForm(formData.value);
      isSubmitted.value = true;
      
      if (submissionResult.value.success) {
        // Reset form on successful submission
        resetForm();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      submissionResult.value = {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      isSubmitting.value = false;
    }
  };

  /**
   * Reset form to initial state
   */
  const resetForm = (): void => {
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
      company: '',
      phone: ''
    };
    
    // Clear all errors
    Object.keys(fieldErrors).forEach(key => delete fieldErrors[key]);
    
    isDirty.value = false;
    isSubmitted.value = false;
    submissionResult.value = null;
  };

  /**
   * Set form field values (for pre-filling)
   * @param data - Partial form data to set
   */
  const setFormData = (data: Partial<ContactFormData>): void => {
    Object.entries(data).forEach(([key, value]) => {
      if (key in formData.value && value !== undefined) {
        (formData.value as any)[key] = value;
      }
    });
    isDirty.value = true;
  };

  /**
   * Get field error message
   * @param field - Field name
   * @returns Error message or empty string
   */
  const getFieldError = (field: keyof ContactFormData): string => {
    return fieldErrors[field] || '';
  };

  /**
   * Check if field has error
   * @param field - Field name
   * @returns Boolean indicating if field has error
   */
  const hasFieldError = (field: keyof ContactFormData): boolean => {
    return !!fieldErrors[field];
  };

  /**
   * Get subject suggestions from controller
   * @returns Array of suggested subjects
   */
  const getSubjectSuggestions = (): string[] => {
    return contactController.getSubjectSuggestions();
  };

  /**
   * Auto-fill subject from suggestion
   * @param subject - Subject to set
   */
  const selectSubjectSuggestion = (subject: string): void => {
    updateField('subject', subject);
  };

  /**
   * Get contact information for display
   */
  const getContactInfo = () => {
    return contactController.getContactInfo();
  };

  /**
   * Handle form submission with Enter key
   * @param event - Keyboard event
   */
  const handleFormKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      if (isFormValid.value && !isSubmitting.value) {
        submitForm();
      }
    }
  };

  /**
   * Focus management for accessibility
   * @param field - Field to focus
   */
  const focusField = (field: keyof ContactFormData): void => {
    const element = document.querySelector(`[name="${field}"]`) as HTMLElement;
    if (element) {
      element.focus();
    }
  };

  /**
   * Get form progress as percentage
   * @returns Progress percentage (0-100)
   */
  const getFormProgress = (): number => {
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const filledFields = requiredFields.filter(field => 
      formData.value[field as keyof ContactFormData]?.trim()
    );
    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  return {
    // Form data
    formData: readonly(formData),
    
    // Form state
    isSubmitting: readonly(isSubmitting),
    isSubmitted: readonly(isSubmitted),
    submissionResult: readonly(submissionResult),
    fieldErrors: readonly(fieldErrors),
    isDirty: readonly(isDirty),
    
    // Computed properties
    isFormValid,
    hasErrors,
    submitButtonText,
    submitButtonDisabled,
    
    // Form methods
    updateField,
    validateField,
    validateAllFields,
    submitForm,
    resetForm,
    setFormData,
    
    // Field validation
    getFieldError,
    hasFieldError,
    
    // Subject suggestions
    getSubjectSuggestions,
    selectSubjectSuggestion,
    
    // Contact info
    getContactInfo,
    
    // Event handlers
    handleFormKeydown,
    
    // Utility methods
    focusField,
    getFormProgress
  };
}