import emailjs from '@emailjs/browser';
import type { ContactFormData, ContactFormSubmissionResult } from '../models/ContactForm';
import { EMAIL_CONFIG, type EmailTemplateParams } from '../config/email.config';

/**
 * Service for handling email submission via EmailJS
 */
export class EmailService {
  private static readonly CONFIG = EMAIL_CONFIG;
  
  /**
   * Initialize EmailJS with public key
   */
  private static initializeEmailJS(): void {
    console.log('ENV DEBUG:', {
      SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      TO_EMAIL: import.meta.env.VITE_EMAILJS_TO_EMAIL,
      FROM_NAME: import.meta.env.VITE_EMAILJS_FROM_NAME,
      allEnvVars: import.meta.env
    });
    
    if (!this.CONFIG.PUBLIC_KEY) {
      throw new Error('EmailJS public key not configured. Please update email.config.ts');
    }
    emailjs.init(this.CONFIG.PUBLIC_KEY);
  }

  /**
   * Submit contact form via EmailJS
   * @param formData - The contact form data to submit
   * @returns Promise with submission result
   */
  static async submitContactForm(formData: ContactFormData): Promise<ContactFormSubmissionResult> {
    try {
      this.initializeEmailJS();

      // Check rate limiting
      if (!this.checkRateLimit()) {
        return {
          success: false,
          message: 'Too many emails sent recently. Please wait before sending another message.',
          error: 'Rate limit exceeded'
        };
      }

      // Generate reference number once
      const referenceNumber = this.generateReferenceNumber();

      // Prepare email template parameters
      const templateParams: EmailTemplateParams = {
        to_email: this.CONFIG.TO_EMAIL,
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        company: formData.company ? formData.company : "",
        phone: formData.phone ? formData.phone : "",
        reference_number: referenceNumber
      };

      // Send email via EmailJS
      const response = await emailjs.send(
        this.CONFIG.SERVICE_ID,
        this.CONFIG.TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        this.updateRateLimit();
        return {
          success: true,
          message: `Message sent successfully! Reference: ${referenceNumber}. We'll respond within 24 hours.`
        };
      } else {
        throw new Error(`EmailJS responded with status ${response.status}`);
      }

    } catch (error) {
      console.error('Email submission error:', error);
      
      let errorMessage = 'Failed to send message. ';
      
      if (error instanceof Error) {
        if (error.message.includes('public key not configured')) {
          errorMessage += 'Service configuration error. Please contact support.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage += 'Please check your internet connection and try again.';
        } else {
          errorMessage += 'Please try again or contact pietbergh.proanalysis@gmail.com directly.';
        }
      }

      return {
        success: false,
        message: errorMessage,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Format email message with structured content
   * @param formData - Contact form data
   * @param referenceNumber - Unique reference number for this submission
   * @returns Formatted email message
   */


  /**
   * Generate unique reference number for tracking
   * @returns Reference number string
   */
  private static generateReferenceNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `PBA-${timestamp}-${random}`;
  }

  /**
   * Check if user has exceeded rate limit
   * @returns Boolean indicating if submission is allowed
   */
  private static checkRateLimit(): boolean {
    try {
      const lastSubmissions = this.getRecentSubmissions();
      const now = Date.now();
      const oneHourAgo = now - (60 * 60 * 1000);
      
      // Check hourly limit
      const recentSubmissions = lastSubmissions.filter(time => time > oneHourAgo);
      if (recentSubmissions.length >= this.CONFIG.MAX_EMAILS_PER_HOUR) {
        return false;
      }
      
      // Check cooldown period
      const lastSubmission = Math.max(...lastSubmissions);
      const cooldownMs = this.CONFIG.COOLDOWN_MINUTES * 60 * 1000;
      if (lastSubmission && (now - lastSubmission) < cooldownMs) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.warn('Rate limit check failed:', error);
      return true; // Allow submission if rate limit check fails
    }
  }

  /**
   * Update rate limit tracking
   */
  private static updateRateLimit(): void {
    try {
      const submissions = this.getRecentSubmissions();
      submissions.push(Date.now());
      
      // Keep only last 20 submissions
      if (submissions.length > 20) {
        submissions.splice(0, submissions.length - 20);
      }
      
      localStorage.setItem('email_submissions', JSON.stringify(submissions));
    } catch (error) {
      console.warn('Could not update rate limit:', error);
    }
  }

  /**
   * Get recent submission timestamps
   * @returns Array of submission timestamps
   */
  private static getRecentSubmissions(): number[] {
    try {
      const stored = localStorage.getItem('email_submissions');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }
}