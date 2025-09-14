/**
 * Email service configuration
 * Uses environment variables with fallbacks for flexibility across environments
 */
export const EMAIL_CONFIG = {
  // EmailJS configuration - uses env variables with fallbacks
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  
  // Email settings
  TO_EMAIL: import.meta.env.VITE_EMAILJS_TO_EMAIL,
  FROM_NAME: import.meta.env.VITE_EMAILJS_FROM_NAME,
  
  // Rate limiting - with number conversion and defaults
  MAX_EMAILS_PER_HOUR: 10,
  COOLDOWN_MINUTES: 5
} as const;

/**
 * Email template parameters interface
 */
export interface EmailTemplateParams extends Record<string, unknown> {
  to_email: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
  reference_number: string;
}