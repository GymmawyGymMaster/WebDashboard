import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  warning: string;
  warningForeground: string;
  success: string;
  successForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  surface: string;
  surfaceForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
}

export interface BrandingSettings {
  appName: string;
  logo: string;
  dashboardTitle: string;
}

export interface ThemeContextType {
  colors: ThemeColors;
  branding: BrandingSettings;
  updateColors: (newColors: Partial<ThemeColors>) => void;
  updateBranding: (newBranding: Partial<BrandingSettings>) => void;
  resetToDefaults: () => void;
}

const defaultColors: ThemeColors = {
  primary: '224 71% 64%',
  primaryForeground: '210 40% 98%',
  secondary: '220 14.3% 95.9%',
  secondaryForeground: '220.9 39.3% 11%',
  accent: '220 14.3% 95.9%',
  accentForeground: '220.9 39.3% 11%',
  destructive: '0 84% 60%',
  destructiveForeground: '210 40% 98%',
  warning: '38 92% 50%',
  warningForeground: '48 96% 89%',
  success: '142 76% 36%',
  successForeground: '355 100% 94%',
  background: '0 0% 100%',
  foreground: '222.2 84% 4.9%',
  card: '0 0% 100%',
  cardForeground: '222.2 84% 4.9%',
  surface: '220 14.3% 95.9%',
  surfaceForeground: '220.9 39.3% 11%',
  muted: '210 40% 96%',
  mutedForeground: '215.4 16.3% 46.9%',
  border: '214.3 31.8% 91.4%',
};

const defaultBranding: BrandingSettings = {
  appName: 'GYM Master',
  logo: '/src/assets/logo.ico',
  dashboardTitle: 'GYM Master Dashboard',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colors, setColors] = useState<ThemeColors>(() => {
    const savedColors = localStorage.getItem('gym-master-theme-colors');
    return savedColors ? { ...defaultColors, ...JSON.parse(savedColors) } : defaultColors;
  });

  const [branding, setBranding] = useState<BrandingSettings>(() => {
    const savedBranding = localStorage.getItem('gym-master-branding');
    return savedBranding ? { ...defaultBranding, ...JSON.parse(savedBranding) } : defaultBranding;
  });

  useEffect(() => {
    // Apply colors to CSS custom properties
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVarName, value);
    });
  }, [colors]);

  useEffect(() => {
    // Update document title
    document.title = branding.appName;
  }, [branding.appName]);

  const updateColors = (newColors: Partial<ThemeColors>) => {
    const updatedColors = { ...colors, ...newColors };
    setColors(updatedColors);
    localStorage.setItem('gym-master-theme-colors', JSON.stringify(updatedColors));
  };

  const updateBranding = (newBranding: Partial<BrandingSettings>) => {
    const updatedBranding = { ...branding, ...newBranding };
    setBranding(updatedBranding);
    localStorage.setItem('gym-master-branding', JSON.stringify(updatedBranding));
  };

  const resetToDefaults = () => {
    setColors(defaultColors);
    setBranding(defaultBranding);
    localStorage.removeItem('gym-master-theme-colors');
    localStorage.removeItem('gym-master-branding');
  };

  return (
    <ThemeContext.Provider
      value={{
        colors,
        branding,
        updateColors,
        updateBranding,
        resetToDefaults,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}