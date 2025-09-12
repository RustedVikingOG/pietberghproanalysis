import type { ContactFormData, ContactFormSubmissionResult } from '../models/ContactForm';

/**
 * Service for handling Gmail integration and email submission
 */
export class EmailService {
  private static readonly GMAIL_ENDPOINT = 'mailto:pietbergh.proanalysis@gmail.com';
  
  /**
   * Submit contact form via Gmail integration
   * @param formData - The contact form data to submit
   * @returns Promise with submission result
   */
  static async submitContactForm(formData: ContactFormData): Promise<ContactFormSubmissionResult> {
    try {
      // Create mailto URL with form data
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        (formData.company ? `Company: ${formData.company}\n` : '') +
        (formData.phone ? `Phone: ${formData.phone}\n` : '') +
        `\nMessage:\n${formData.message}`
      );
      
      const mailtoUrl = `${this.GMAIL_ENDPOINT}?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.open(mailtoUrl, '_blank');
      
      return {
        success: true,
        message: 'Email client opened successfully. Please send the email to complete your inquiry.'
      };
    } catch (error) {
      console.error('Email submission error:', error);
      return {
        success: false,
        message: 'Failed to open email client. Please contact pietbergh.proanalysis@gmail.com directly.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Validate email format
   * @param email - Email address to validate
   * @returns Boolean indicating if email is valid
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}