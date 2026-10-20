'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'icon' | 'expanded';
  className?: string;
}

export default function ThemeToggle({ variant = 'icon', className = '' }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch by using a neutral icon representation during SSR
  if (!mounted) {
    if (variant === 'expanded') {
      return (
        <button
          type="button"
          disabled
          aria-label="Toggle color theme"
          className={`flex items-center justify-between w-full px-3.5 py-3 rounded-xl text-xs font-semibold bg-sand-muted border border-sand-border opacity-70 ${className}`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full border-2 border-sand-subtext" />
            <span>Theme</span>
          </div>
          <span className="text-[11px] text-sand-subtext">Loading...</span>
        </button>
      );
    }

    return (
      <button
        type="button"
        disabled
        aria-label="Toggle color theme"
        className={`w-9 h-9 min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px] rounded-xl bg-sand-muted border border-sand-border flex items-center justify-center text-sand-subtext opacity-70 ${className}`}
      >
        <span className="w-4 h-4 rounded-full border-2 border-current" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  if (variant === 'expanded') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={label}
        title={label}
        className={`flex items-center justify-between w-full px-3.5 py-3 rounded-xl text-xs font-semibold min-h-[44px] transition-all bg-sand-muted hover:bg-sand-surface border border-sand-border text-sand-text hover:text-orange-deep active:scale-[0.99] ${className}`}
      >
        <div className="flex items-center gap-2.5">
          {isDark ? (
            <Moon size={16} className="text-orange-bright fill-orange/20" />
          ) : (
            <Sun size={16} className="text-orange fill-orange/30" />
          )}
          <span>Appearance</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-bold text-orange-deep">
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
          <span className="text-[11px] text-sand-subtext">
            ({isDark ? 'রাত্রিকালীন' : 'দিবাকালীন'})
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`relative w-9 h-9 min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px] rounded-xl bg-sand-muted hover:bg-sand-surface border border-sand-border flex items-center justify-center text-sand-text hover:text-orange transition-all active:scale-95 shadow-2xs group ${className}`}
    >
      {isDark ? (
        <Moon
          size={16}
          className="text-orange-bright fill-orange/25 group-hover:rotate-12 transition-transform duration-200"
        />
      ) : (
        <Sun
          size={16}
          className="text-orange fill-orange/30 group-hover:rotate-45 transition-transform duration-200"
        />
      )}
    </button>
  );
}
