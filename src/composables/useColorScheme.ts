import { ref, computed, readonly } from 'vue';
import { ColorScheme } from '../utils/ColorScheme';

/**
 * Composable for managing application color scheme and theme
 */
export function useColorScheme() {
  // Current theme state
  const currentTheme = ref<'light' | 'dark' | 'auto'>('light');
  const isDarkMode = ref(false);

  // Color scheme instances
  const colorScheme = new ColorScheme();

  // Computed colors based on current theme
  const colors = computed(() => {
    return isDarkMode.value 
      ? colorScheme.getDarkModeColors()
      : colorScheme.getLightModeColors();
  });

  const primaryColors = computed(() => {
    return colorScheme.getPrimaryColors();
  });

  const secondaryColors = computed(() => {
    return colorScheme.getSecondaryColors();
  });

  const accentColors = computed(() => {
    return colorScheme.getAccentColors();
  });

  const neutralColors = computed(() => {
    return colorScheme.getNeutralColors();
  });

  const semanticColors = computed(() => {
    return colorScheme.getSemanticColors();
  });

  // Utility computed properties
  const currentBackground = computed(() => {
    return colors.value.background;
  });

  const currentText = computed(() => {
    return colors.value.text;
  });

  const currentPrimary = computed(() => {
    return colors.value.primary;
  });

  const currentSecondary = computed(() => {
    return colors.value.secondary;
  });

  /**
   * Set the application theme
   * @param theme - Theme to apply ('light', 'dark', or 'auto')
   */
  const setTheme = (theme: 'light' | 'dark' | 'auto'): void => {
    currentTheme.value = theme;
    
    if (theme === 'auto') {
      // Use system preference
      updateFromSystemPreference();
      // Listen for system changes
      listenToSystemPreference();
    } else {
      isDarkMode.value = theme === 'dark';
      updateDocumentTheme();
    }
    
    // Store preference
    localStorage.setItem('preferred-theme', theme);
  };

  /**
   * Toggle between light and dark mode
   */
  const toggleTheme = (): void => {
    if (currentTheme.value === 'auto') {
      // If auto, switch to opposite of current system preference
      setTheme(isDarkMode.value ? 'light' : 'dark');
    } else {
      // Toggle between light and dark
      setTheme(isDarkMode.value ? 'light' : 'dark');
    }
  };

  /**
   * Initialize theme from stored preference or system default
   */
  const initializeTheme = (): void => {
    const stored = localStorage.getItem('preferred-theme') as 'light' | 'dark' | 'auto' | null;
    
    if (stored && ['light', 'dark', 'auto'].includes(stored)) {
      setTheme(stored);
    } else {
      setTheme('auto'); // Default to auto
    }
  };

  /**
   * Update dark mode based on system preference
   */
  const updateFromSystemPreference = (): void => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
      updateDocumentTheme();
    }
  };

  /**
   * Listen for system preference changes
   */
  const listenToSystemPreference = (): void => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        if (currentTheme.value === 'auto') {
          isDarkMode.value = e.matches;
          updateDocumentTheme();
        }
      };

      // Add listener
      mediaQuery.addEventListener('change', handleChange);
      
      // Return cleanup function
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    return () => {}; // No-op cleanup
  };

  /**
   * Update document classes and CSS variables
   */
  const updateDocumentTheme = (): void => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Update theme class
      root.classList.toggle('dark', isDarkMode.value);
      root.classList.toggle('light', !isDarkMode.value);
      
      // Update CSS custom properties
      const currentColors = colors.value;
      Object.entries(currentColors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
      
      // Update meta theme-color for mobile browsers
      updateMetaThemeColor();
    }
  };

  /**
   * Update meta theme-color for mobile browsers
   */
  const updateMetaThemeColor = (): void => {
    if (typeof document !== 'undefined') {
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
      }
      
      metaThemeColor.setAttribute('content', currentBackground.value);
    }
  };

  /**
   * Get CSS variables object for styling
   * @returns Object with CSS variable definitions
   */
  const getCSSVariables = (): Record<string, string> => {
    const currentColors = colors.value;
    const variables: Record<string, string> = {};
    
    Object.entries(currentColors).forEach(([key, value]) => {
      variables[`--color-${key}`] = value;
    });
    
    return variables;
  };

  /**
   * Get Tailwind classes for current theme
   * @returns Object with Tailwind class names
   */
  const getTailwindClasses = () => {
    return {
      background: isDarkMode.value ? 'bg-slate-900' : 'bg-white',
      text: isDarkMode.value ? 'text-slate-100' : 'text-slate-900',
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-amber-500 text-slate-900',
      accent: isDarkMode.value ? 'bg-blue-500' : 'bg-blue-600',
      neutral: isDarkMode.value ? 'bg-slate-700' : 'bg-slate-100',
      success: 'bg-emerald-500 text-white',
      warning: 'bg-amber-500 text-slate-900',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white'
    };
  };

  /**
   * Get color by name and shade
   * @param colorName - Name of the color
   * @param shade - Shade level (optional)
   * @returns Color value or default
   */
  const getColor = (colorName: string, shade?: string): string => {
    return colorScheme.getColor(colorName, shade);
  };

  /**
   * Check if current theme matches given theme
   * @param theme - Theme to check against
   * @returns Boolean indicating match
   */
  const isTheme = (theme: 'light' | 'dark'): boolean => {
    return isDarkMode.value === (theme === 'dark');
  };

  /**
   * Get theme icon name for UI
   * @returns Icon name string
   */
  const getThemeIcon = (): string => {
    if (currentTheme.value === 'auto') {
      return 'auto-mode';
    }
    return isDarkMode.value ? 'dark-mode' : 'light-mode';
  };

  /**
   * Get theme label for UI
   * @returns Human-readable theme label
   */
  const getThemeLabel = (): string => {
    switch (currentTheme.value) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      case 'auto':
        return `Auto (${isDarkMode.value ? 'Dark' : 'Light'})`;
      default:
        return 'Unknown';
    }
  };

  /**
   * Get available theme options
   * @returns Array of theme options with labels
   */
  const getThemeOptions = () => {
    return [
      { value: 'light', label: 'Light', icon: 'light-mode' },
      { value: 'dark', label: 'Dark', icon: 'dark-mode' },
      { value: 'auto', label: 'Auto', icon: 'auto-mode' }
    ];
  };

  /**
   * Apply custom color scheme
   * @param customColors - Custom color definitions
   */
  const applyCustomColors = (customColors: Record<string, string>): void => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      Object.entries(customColors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }
  };

  /**
   * Reset to default color scheme
   */
  const resetToDefaults = (): void => {
    updateDocumentTheme();
  };

  return {
    // State
    currentTheme: readonly(currentTheme),
    isDarkMode: readonly(isDarkMode),
    
    // Color palettes
    colors,
    primaryColors,
    secondaryColors,
    accentColors,
    neutralColors,
    semanticColors,
    
    // Current color shortcuts
    currentBackground,
    currentText,
    currentPrimary,
    currentSecondary,
    
    // Theme management
    setTheme,
    toggleTheme,
    initializeTheme,
    
    // Utilities
    getCSSVariables,
    getTailwindClasses,
    getColor,
    isTheme,
    getThemeIcon,
    getThemeLabel,
    getThemeOptions,
    
    // Customization
    applyCustomColors,
    resetToDefaults
  };
}