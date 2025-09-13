import type { ContactFormData, ContactFormSubmissionResult } from '../models/ContactForm';
import { EmailService } from '../services/EmailService';
import { ValidationUtils } from '../utils/validationUtils';

/**
 * Controller for handling contact form submission and Gmail integration
 */
export class ContactController {
  /**
   * Submit contact form with validation and email integration
   * @param formData - Contact form data
   * @returns Promise with submission result
   */
  async submitContactForm(formData: ContactFormData): Promise<ContactFormSubmissionResult> {
    try {
      // Sanitize form data
      const sanitizedData = ValidationUtils.sanitizeContactForm(formData);
      
      // Validate form data
      const validation = ValidationUtils.validateContactForm(sanitizedData);
      
      if (!validation.isValid) {
        const errorMessages = ValidationUtils.formatErrorMessages(validation.errors);
        return {
          success: false,
          message: 'Please correct the following errors: ' + errorMessages.join(', '),
          error: 'Validation failed'
        };
      }

      // Submit via email service
      const result = await EmailService.submitContactForm(sanitizedData);
      
      // Log submission for analytics (in production, you might want to use a proper analytics service)
      this.logSubmission(sanitizedData);

      return result;    } catch (error) {
      console.error('Contact form submission error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again or contact pietbergh.proanalysis@gmail.com directly.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Validate form data without submitting
   * @param formData - Contact form data to validate
   * @returns Validation result
   */
  validateForm(formData: ContactFormData): { isValid: boolean; errors: string[] } {
    const validation = ValidationUtils.validateContactForm(formData);
    const errorMessages = ValidationUtils.formatErrorMessages(validation.errors);
    
    return {
      isValid: validation.isValid,
      errors: errorMessages
    };
  }

  /**
   * Get form field validation status
   * @param field - Field name to validate
   * @param value - Field value
   * @returns Validation status for the field
   */
  validateField(field: keyof ContactFormData, value: string): { isValid: boolean; error?: string } {
    switch (field) {
      case 'name': {
        const isNameValid = ValidationUtils.validateRequiredString(value, 2, 100);
        return {
          isValid: isNameValid,
          error: isNameValid ? undefined : 'Name must be between 2 and 100 characters'
        };
      }
        
      case 'email': {
        if (!value.trim()) {
          return { isValid: false, error: 'Email is required' };
        }
        const isEmailValid = ValidationUtils.validateEmail(value);
        return {
          isValid: isEmailValid,
          error: isEmailValid ? undefined : 'Please enter a valid email address'
        };
      }
        
      case 'subject': {
        const isSubjectValid = ValidationUtils.validateRequiredString(value, 5, 200);
        return {
          isValid: isSubjectValid,
          error: isSubjectValid ? undefined : 'Subject must be between 5 and 200 characters'
        };
      }
        
      case 'message': {
        const isMessageValid = ValidationUtils.validateRequiredString(value, 10, 2000);
        return {
          isValid: isMessageValid,
          error: isMessageValid ? undefined : 'Message must be between 10 and 2000 characters'
        };
      }
        
      case 'company': {
        if (!value) return { isValid: true }; // Optional field
        const isCompanyValid = ValidationUtils.validateRequiredString(value, 1, 200);
        return {
          isValid: isCompanyValid,
          error: isCompanyValid ? undefined : 'Company name must be less than 200 characters'
        };
      }
        
      case 'phone': {
        if (!value) return { isValid: true }; // Optional field
        const isPhoneValid = ValidationUtils.validatePhone(value);
        return {
          isValid: isPhoneValid,
          error: isPhoneValid ? undefined : 'Please enter a valid phone number'
        };
      }
        
      default:
        return { isValid: true };
    }
  }

  /**
   * Get contact information for display
   * @returns Contact information object
   */
  getContactInfo(): {
    email: string;
    phone: string;
    linkedin: string;
    businessHours: string;
    responseTime: string;
  } {
    return {
      email: 'pietbergh.proanalysis@gmail.com',
      phone: '+27 71 181 8582',
      linkedin: 'linkedin.com/in/pietbergh',
      businessHours: 'Monday - Friday: 8:00 AM - 5:00 PM (SAST)',
      responseTime: 'We typically respond within 24 hours'
    };
  }

  /**
   * Get subject line suggestions for common inquiries
   * @returns Array of suggested subjects
   */
  getSubjectSuggestions(): string[] {
    return [
      'Evidence Analysis Inquiry',
      'Process Reengineering Consultation',
      'Translation Services Request',
      'Expert Testimony Required',
      'General Business Inquiry',
      'Partnership Opportunity'
    ];
  }

  /**
   * Generate inquiry reference number
   * @returns Unique reference number
   */
  generateReferenceNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `PBA-${timestamp}-${random}`;
  }

  /**
   * Log form submission for analytics
   * @param formData - Sanitized form data
   */
  private logSubmission(formData: ContactFormData): void {
    // In a production environment, you might send this to an analytics service
    const logData = {
      timestamp: new Date().toISOString(),
      referenceNumber: this.generateReferenceNumber(),
      subject: formData.subject,
      hasCompany: !!formData.company,
      hasPhone: !!formData.phone,
      messageLength: formData.message.length
    };
    
    console.log('Contact form submission logged:', logData);
    
    // Store in localStorage for client-side analytics
    try {
      const existingLogs = localStorage.getItem('contactSubmissions');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.push(logData);
      
      // Keep only last 10 submissions
      if (logs.length > 10) {
        logs.splice(0, logs.length - 10);
      }
      
      localStorage.setItem('contactSubmissions', JSON.stringify(logs));
    } catch (error) {
      console.warn('Could not store submission log:', error);
    }
  }

  /**
   * Get submission statistics (for admin/analytics purposes)
   * @returns Submission statistics from localStorage
   */
  getSubmissionStats(): {
    totalSubmissions: number;
    lastSubmission?: string;
    commonSubjects: Array<{ subject: string; count: number }>;
  } {
    try {
      const existingLogs = localStorage.getItem('contactSubmissions');
      if (!existingLogs) {
        return { totalSubmissions: 0, commonSubjects: [] };
      }
      
      const logs = JSON.parse(existingLogs);
      const subjectCounts: Record<string, number> = {};
      
      logs.forEach((log: any) => {
        if (log.subject) {
          subjectCounts[log.subject] = (subjectCounts[log.subject] || 0) + 1;
        }
      });
      
      const commonSubjects = Object.entries(subjectCounts)
        .map(([subject, count]) => ({ subject, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      
      return {
        totalSubmissions: logs.length,
        lastSubmission: logs[logs.length - 1]?.timestamp,
        commonSubjects
      };
    } catch (error) {
      console.warn('Could not retrieve submission stats:', error);
      return { totalSubmissions: 0, commonSubjects: [] };
    }
  }
}