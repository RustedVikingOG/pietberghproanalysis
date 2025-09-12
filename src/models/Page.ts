/**
 * Interface for page metadata and content structure
 */
export interface Page {
  title: string;
  route: string;
  description: string;
  metadata: PageMetadata;
}

export interface PageMetadata {
  keywords: string[];
  author: string;
  pageType: 'home' | 'service' | 'about' | 'success';
  lastUpdated?: string;
}