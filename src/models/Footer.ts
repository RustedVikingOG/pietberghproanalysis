/**
 * Footer content models and interfaces
 * Defines the structure for footer components and social links
 */

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  ariaLabel?: string;
  isExternal?: boolean;
}

export interface NavigationLink {
  label: string;
  to: string;
  isExternal?: boolean;
}

export interface ContactDetail {
  type: 'email' | 'phone' | 'location' | 'other';
  label: string;
  value: string;
  href?: string;
  icon?: string;
}

export interface ProfessionalCredential {
  title: string;
  description: string;
  icon?: string;
  verified?: boolean;
}

export interface FooterSection {
  title: string;
  links: NavigationLink[];
}

export interface FooterContent {
  companyInfo: {
    name: string;
    tagline: string;
    description: string;
    logoUrl: string;
  };
  credentials: ProfessionalCredential[];
  contactDetails: ContactDetail[];
  socialLinks: SocialLink[];
  navigationSections: FooterSection[];
  legalLinks: NavigationLink[];
  copyrightText: string;
  professionalTagline: string;
}

export interface FooterProps {
  content?: Partial<FooterContent>;
  theme?: 'dark' | 'light' | 'gradient';
  showNewsletter?: boolean;
  showCredentials?: boolean;
}