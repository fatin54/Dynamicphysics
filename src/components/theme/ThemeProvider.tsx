'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'dynamicphysics-theme';
const LEGACY_STORAGE_KEY = 'theme';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize theme from storage or system on mount
  useEffect(() => {
    try {
      const stored = (localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY)) as Theme | null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeState(stored);
        if (stored === 'system') {
          setResolvedTheme(getSystemTheme());
        } else {
          setResolvedTheme(stored);
        }
      } else {
        setThemeState('system');
        setResolvedTheme(getSystemTheme());
      }
    } catch {
      setThemeState('system');
      setResolvedTheme(getSystemTheme());
    }
    setMounted(true);
  }, []);

  // Listen for system theme changes when in 'system' mode
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const nextResolved = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(nextResolved);
        applyTheme(nextResolved);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted, theme]);

  // Apply theme to DOM and sync storage
  const applyTheme = (targetTheme: ResolvedTheme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (targetTheme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  };

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
      localStorage.setItem(LEGACY_STORAGE_KEY, nextTheme);
    } catch {
      // storage quota or incognito restriction
    }

    const nextResolved: ResolvedTheme = nextTheme === 'system' ? getSystemTheme() : nextTheme;
    setResolvedTheme(nextResolved);
    applyTheme(nextResolved);
  };

  const toggleTheme = () => {
    const next: ResolvedTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  // Keep DOM synchronized with resolvedTheme
  useEffect(() => {
    if (mounted) {
      applyTheme(resolvedTheme);
    }
  }, [mounted, resolvedTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      mounted,
    }),
    [theme, resolvedTheme, mounted]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
