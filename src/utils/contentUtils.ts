/**
 * Utility functions for content formatting and organization
 */
export class ContentUtils {
  /**
   * Format date for display
   * @param dateString - Date string to format
   * @param format - Format type ('short', 'medium', 'long')
   * @returns Formatted date string
   */
  static formatDate(dateString: string, format: 'short' | 'medium' | 'long' = 'medium'): string {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid date
    }
    
    const options: Intl.DateTimeFormatOptions = {
      short: { year: 'numeric', month: 'short' },
      medium: { year: 'numeric', month: 'long', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
    }[format] as Intl.DateTimeFormatOptions;
    
    return date.toLocaleDateString('en-ZA', options);
  }

  /**
   * Truncate text to specified length with ellipsis
   * @param text - Text to truncate
   * @param maxLength - Maximum length before truncation
   * @param suffix - Suffix to add when truncated (default: '...')
   * @returns Truncated text
   */
  static truncateText(text: string, maxLength: number, suffix: string = '...'): string {
    if (text.length <= maxLength) {
      return text;
    }
    
    return text.slice(0, maxLength - suffix.length).trim() + suffix;
  }

  /**
   * Convert string to URL-friendly slug
   * @param text - Text to convert to slug
   * @returns URL-friendly slug
   */
  static createSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  }

  /**
   * Extract keywords from text content
   * @param text - Text to extract keywords from
   * @param maxKeywords - Maximum number of keywords to return
   * @returns Array of keywords
   */
  static extractKeywords(text: string, maxKeywords: number = 10): string[] {
    // Common stop words to filter out
    const stopWords = new Set([
      'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
      'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
      'to', 'was', 'will', 'with', 'the', 'this', 'but', 'they', 'have',
      'had', 'what', 'said', 'each', 'which', 'do', 'how', 'their', 'if'
    ]);

    const wordCounts = text
      .toLowerCase()
      .replace(/[^a-z\s]/g, '') // Remove non-alphabetic characters
      .split(/\s+/) // Split into words
      .filter(word => word.length > 3 && !stopWords.has(word)) // Filter meaningful words
      .reduce((acc: Record<string, number>, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {}); // Count word frequency

    return Object.entries(wordCounts) // Convert to entries
      .sort(([,a], [,b]) => b - a) // Sort by frequency
      .slice(0, maxKeywords) // Take top keywords
      .map(([word]) => word); // Extract words
  }

  /**
   * Format phone number for display
   * @param phone - Phone number to format
   * @returns Formatted phone number
   */
  static formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // South African mobile format: +27 XX XXX XXXX
    if (cleanPhone.length === 10 && cleanPhone.startsWith('0')) {
      const formatted = cleanPhone.slice(1);
      return `+27 ${formatted.slice(0, 2)} ${formatted.slice(2, 5)} ${formatted.slice(5)}`;
    }
    
    // International format: group digits
    if (cleanPhone.length > 10) {
      return `+${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 5)} ${cleanPhone.slice(5, 8)} ${cleanPhone.slice(8)}`;
    }
    
    // Default format for shorter numbers
    return phone;
  }

  /**
   * Generate meta description from content
   * @param content - Content to generate description from
   * @param maxLength - Maximum length of description
   * @returns Meta description
   */
  static generateMetaDescription(content: string, maxLength: number = 160): string {
    // Remove HTML tags and normalize whitespace
    const cleanContent = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    return this.truncateText(cleanContent, maxLength);
  }

  /**
   * Format large numbers with commas
   * @param num - Number to format
   * @returns Formatted number string
   */
  static formatNumber(num: number): string {
    return num.toLocaleString('en-ZA');
  }

  /**
   * Calculate reading time for content
   * @param content - Content to calculate reading time for
   * @param wordsPerMinute - Average reading speed (default: 200 WPM)
   * @returns Reading time in minutes
   */
  static calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
    const wordCount = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .split(/\s+/)
      .filter(word => word.length > 0).length;
    
    return Math.ceil(wordCount / wordsPerMinute);
  }

  /**
   * Generate excerpt from content
   * @param content - Full content
   * @param sentences - Number of sentences for excerpt
   * @returns Content excerpt
   */
  static generateExcerpt(content: string, sentences: number = 2): string {
    const sentenceEnders = /[.!?]+/g;
    const sentenceArray = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .split(sentenceEnders)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    return sentenceArray
      .slice(0, sentences)
      .join('. ') + (sentenceArray.length > sentences ? '.' : '');
  }
}