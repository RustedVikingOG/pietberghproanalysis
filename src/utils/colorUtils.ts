/**
 * Professional blue and gold color combinations for the PietBergh ProAnalysis brand
 */
export const ColorScheme = {
  // Primary Blues - Professional law enforcement inspired
  primary: {
    navy: '#1e3a8a',      // Deep navy blue
    royal: '#1d4ed8',     // Royal blue
    sky: '#0ea5e9',       // Sky blue
    light: '#38bdf8'      // Light blue
  },
  
  // Accent Golds - Elegant and subtle, not garish
  accent: {
    dark: '#d97706',      // Dark gold
    medium: '#f59e0b',    // Medium gold
    light: '#fbbf24',     // Light gold
    pale: '#fde68a'       // Pale gold
  },
  
  // Neutral Colors - Clean grays and whites for balance
  neutral: {
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    black: '#000000'
  },
  
  // State Colors - Subtle blue-based success/error states
  state: {
    success: '#10b981',   // Green with blue undertone
    warning: '#f59e0b',   // Gold warning
    error: '#dc2626',     // Red error
    info: '#0ea5e9'       // Sky blue info
  }
} as const;

/**
 * Tailwind CSS class combinations for common color schemes
 */
export const TailwindColors = {
  // Primary color classes
  primary: {
    bg: 'bg-blue-800',
    text: 'text-blue-800',
    border: 'border-blue-800',
    hover: 'hover:bg-blue-900',
    focus: 'focus:ring-blue-500'
  },
  
  // Accent color classes  
  accent: {
    bg: 'bg-amber-500',
    text: 'text-amber-600',
    border: 'border-amber-500',
    hover: 'hover:bg-amber-600',
    focus: 'focus:ring-amber-500'
  },
  
  // Neutral combinations
  neutral: {
    bgLight: 'bg-gray-50',
    bgMedium: 'bg-gray-100',
    bgDark: 'bg-gray-800',
    textLight: 'text-gray-600',
    textMedium: 'text-gray-700',
    textDark: 'text-gray-900'
  }
} as const;

/**
 * Professional color combinations that avoid "garish" appearance
 */
export const ColorCombinations = {
  // Hero section - Navy background with gold accents
  hero: {
    background: 'bg-gradient-to-r from-blue-900 to-blue-800',
    text: 'text-white',
    accent: 'text-amber-400',
    button: 'bg-amber-500 hover:bg-amber-600 text-white'
  },
  
  // Service cards - Clean with subtle color touches
  serviceCard: {
    background: 'bg-white',
    border: 'border-blue-100',
    title: 'text-blue-800',
    text: 'text-gray-700',
    accent: 'text-amber-600'
  },
  
  // Navigation - Professional and clean
  navigation: {
    background: 'bg-white shadow-md',
    text: 'text-blue-800',
    hover: 'hover:text-amber-600',
    active: 'text-amber-600 border-b-2 border-amber-600'
  },
  
  // Footer - Balanced dark theme
  footer: {
    background: 'bg-blue-900',
    text: 'text-blue-100',
    accent: 'text-amber-300',
    links: 'text-blue-200 hover:text-amber-300'
  }
} as const;

/**
 * Utility function to get safe color values
 * @param category Color category
 * @param shade Color shade
 * @returns Hex color value or fallback
 */
export function getColor(category: keyof typeof ColorScheme, shade: string): string {
  const colorCategory = ColorScheme[category];
  if (colorCategory && shade in colorCategory) {
    return (colorCategory as Record<string, string>)[shade];
  }
  return ColorScheme.neutral.gray500; // Fallback color
}

/**
 * Generate gradient backgrounds for various sections
 */
export const Gradients = {
  hero: 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700',
  service: 'bg-gradient-to-r from-blue-50 to-amber-50',
  footer: 'bg-gradient-to-r from-blue-900 to-blue-800'
} as const;