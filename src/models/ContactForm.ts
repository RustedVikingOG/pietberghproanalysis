/**
 * Interface for contact form data and validation
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}

export interface ContactFormValidation {
  isValid: boolean;
  errors: ContactFormErrors;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
  phone?: string;
}

export interface ContactFormSubmissionResult {
  success: boolean;
  message: string;
  error?: string;
}