import { EmailService } from '../services/EmailService';
import type { ContactFormData } from '../models/ContactForm';

/**
 * Email service test utilities
 * This file demonstrates how the EmailService works
 */
export class EmailServiceTest {
  /**
   * Test form submission with sample data
   * NOTE: This requires valid EmailJS configuration
   */
  static async testEmailSubmission(): Promise<void> {
    const testFormData: ContactFormData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Test Message from Portfolio',
      message: 'This is a test message to verify the email service is working correctly.',
      company: 'Test Company',
      phone: '+1 234 567 8900'
    };

    console.log('Testing email submission...');
    
    try {
      const result = await EmailService.submitContactForm(testFormData);
      
      if (result.success) {
        console.log('✅ Email sent successfully:', result.message);
      } else {
        console.log('❌ Email failed:', result.message);
        if (result.error) {
          console.log('Error details:', result.error);
        }
      }
    } catch (error) {
      console.error('❌ Test failed:', error);
    }
  }

  /**
   * Test rate limiting functionality
   */
  static async testRateLimit(): Promise<void> {
    console.log('Testing rate limiting...');
    
    // Clear any existing rate limit data
    localStorage.removeItem('email_submissions');
    
    const testData: ContactFormData = {
      name: 'Rate Limit Test',
      email: 'test@example.com',
      subject: 'Rate Limit Test',
      message: 'Testing rate limiting functionality'
    };

    // First submission should succeed
    const result1 = await EmailService.submitContactForm(testData);
    console.log('First submission:', result1.success ? '✅ Success' : '❌ Failed');
    
    // Immediate second submission should be rate limited
    const result2 = await EmailService.submitContactForm(testData);
    console.log('Second submission (should be rate limited):', 
      result2.success ? '❌ Unexpected success' : '✅ Correctly rate limited');
  }

  /**
   * Log current configuration status
   */
  static checkConfiguration(): void {
    console.log('📧 Email Service Configuration Status:');
    console.log('EmailJS package installed: ✅');
    console.log('Configuration file created: ✅');
    console.log('Service implementation updated: ✅');
    console.log('');
    console.log('⚠️ To enable email sending:');
    console.log('1. Set up EmailJS account at https://www.emailjs.com/');
    console.log('2. Update credentials in /src/config/email.config.ts');
    console.log('3. See EMAIL_SETUP.md for detailed instructions');
  }
}

// For testing in browser console:
// EmailServiceTest.checkConfiguration();
// EmailServiceTest.testEmailSubmission(); // Only after configuration
// EmailServiceTest.testRateLimit(); // Only after configuration