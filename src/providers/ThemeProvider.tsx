import { Theme } from '@astryxdesign/core/theme';
import React, { type ReactNode } from 'react';
import { finservkartTheme } from '../styles/theme';

interface ThemeProviderProps {
  children: ReactNode;
  mode?: 'light' | 'dark' | 'system';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, mode = 'light' }) => {
  return (
    <Theme theme={finservkartTheme} mode={mode}>
      {children}
    </Theme>
  );
};

export default ThemeProvider;

