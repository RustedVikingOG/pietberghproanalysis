/**
 * Email service configuration
 * Uses environment variables with fallbacks for flexibility across environments
 */
export const EMAIL_CONFIG = {
  // EmailJS configuration - uses env variables with fallbacks
  SERVICE_ID: "service_2muard6",
  TEMPLATE_ID: "template_vm4d0ml",
  PUBLIC_KEY: "fHZxqRE9Wul4mFUQQ",
  
  // Email settings
  TO_EMAIL: "pietbergh.proanalysis@gmail.com",
  FROM_NAME: "From Website Contact Form",
  
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