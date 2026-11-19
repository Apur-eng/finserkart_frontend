import { Theme } from '@astryxdesign/core/theme';
import React, { type ReactNode } from 'react';
import { themes, defaultThemeSlug } from '../astryx-themes';

interface ThemeProviderProps {
  children: ReactNode;
  mode?: 'light' | 'dark' | 'system';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, mode = 'light' }) => {
  return (
    <Theme theme={themes[defaultThemeSlug]} mode={mode}>
      {children}
    </Theme>
  );
};

export default ThemeProvider;

