import type { ContactFormData, ContactFormValidation, ContactFormErrors } from '../models/ContactForm';

/**
 * Form validation utilities for contact forms and other inputs
 */
export class ValidationUtils {
  /**
   * Validate email format using RFC 5322 compliant regex
   * @param email - Email address to validate
   * @returns Boolean indicating if email is valid
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format (South African and international)
   * @param phone - Phone number to validate
   * @returns Boolean indicating if phone is valid
   */
  static validatePhone(phone: string): boolean {
    // Remove all non-numeric characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    
    // South African mobile: 10 digits starting with 0
    // International format: 8-15 digits
    return cleanPhone.length >= 8 && cleanPhone.length <= 15;
  }

  /**
   * Validate required string field
   * @param value - String value to validate
   * @param minLength - Minimum required length (default: 1)
   * @param maxLength - Maximum allowed length (default: 1000)
   * @returns Boolean indicating if string is valid
   */
  static validateRequiredString(value: string, minLength: number = 1, maxLength: number = 1000): boolean {
    const trimmed = value.trim();
    return trimmed.length >= minLength && trimmed.length <= maxLength;
  }

  /**
   * Validate contact form data
   * @param formData - Contact form data to validate
   * @returns Validation result with errors
   */
  static validateContactForm(formData: ContactFormData): ContactFormValidation {
    const errors: ContactFormErrors = {};
    let isValid = true;

    // Validate name
    if (!this.validateRequiredString(formData.name, 2, 100)) {
      errors.name = 'Name must be between 2 and 100 characters';
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!this.validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate subject
    if (!this.validateRequiredString(formData.subject, 5, 200)) {
      errors.subject = 'Subject must be between 5 and 200 characters';
      isValid = false;
    }

    // Validate message
    if (!this.validateRequiredString(formData.message, 10, 2000)) {
      errors.message = 'Message must be between 10 and 2000 characters';
      isValid = false;
    }

    // Validate optional company field
    if (formData.company && !this.validateRequiredString(formData.company, 1, 200)) {
      errors.company = 'Company name must be less than 200 characters';
      isValid = false;
    }

    // Validate optional phone field
    if (formData.phone && !this.validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    return {
      isValid,
      errors
    };
  }

  /**
   * Sanitize string input to prevent XSS
   * @param input - String to sanitize
   * @returns Sanitized string
   */
  static sanitizeString(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Validate and sanitize form data
   * @param formData - Raw form data
   * @returns Sanitized form data
   */
  static sanitizeContactForm(formData: ContactFormData): ContactFormData {
    return {
      name: this.sanitizeString(formData.name.trim()),
      email: formData.email.trim().toLowerCase(),
      subject: this.sanitizeString(formData.subject.trim()),
      message: this.sanitizeString(formData.message.trim()),
      company: formData.company ? this.sanitizeString(formData.company.trim()) : undefined,
      phone: formData.phone ? formData.phone.replace(/\s+/g, '') : undefined
    };
  }

  /**
   * Generate validation error messages for UI display
   * @param errors - Validation errors object
   * @returns Array of error messages for display
   */
  static formatErrorMessages(errors: ContactFormErrors): string[] {
    const messages: string[] = [];
    
    Object.entries(errors).forEach(([field, message]) => {
      if (message) {
        messages.push(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${message}`);
      }
    });
    
    return messages;
  }
}