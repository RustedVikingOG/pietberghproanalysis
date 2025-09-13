/**
 * Color scheme utility for theme management
 * TODO: Future Implementation - Full ColorScheme utility
 * Description: Complete color scheme management with theme switching
 * Priority: Low
 * Dependencies: Design system finalization
 */

export interface ColorScheme {
  primary: Record<string, string>;
  secondary: Record<string, string>;
  neutral: Record<string, string>;
}

// Temporary basic implementation
export const defaultColorScheme: ColorScheme = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    900: '#0c4a6e'
  },
  secondary: {
    50: '#fefce8',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    900: '#78350f'
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    600: '#475569',
    900: '#0f172a'
  }
};

export default defaultColorScheme;