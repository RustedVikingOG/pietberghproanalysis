/**
 * OverlayModal domain model interfaces
 * Defines the structure for modal component props and events
 */

export interface OverlayModalProps {
  /** Whether the modal is currently visible */
  isOpen: boolean;
  /** The title to display in the modal header */
  title: string;
  /** Optional icon to display next to the title */
  icon?: string;
  /** Whether clicking outside should close the modal */
  closeOnClickOutside?: boolean;
  /** Whether pressing escape should close the modal */
  closeOnEscape?: boolean;
  /** Optional maximum width class for the modal */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export interface OverlayModalEmits {
  /** Emitted when the modal should be closed */
  (e: 'close'): void;
}

export interface LegalContent {
  /** The type of legal content */
  type: 'privacy' | 'terms' | 'standards';
  /** The title of the content */
  title: string;
  /** The icon to display */
  icon: string;
  /** The main content sections */
  sections: LegalContentSection[];
  /** Last updated date */
  lastUpdated: string;
  /** Contact information for legal queries */
  contactInfo?: {
    email: string;
    phone?: string;
  };
}

export interface LegalContentSection {
  /** Section heading */
  heading: string;
  /** Section content paragraphs */
  content: string[];
  /** Optional subsections */
  subsections?: LegalContentSubsection[];
}

export interface LegalContentSubsection {
  /** Subsection heading */
  heading: string;
  /** Subsection content */
  content: string[];
}