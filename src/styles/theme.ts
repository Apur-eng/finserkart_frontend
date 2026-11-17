import { defineTheme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';

/**
 * Finservkart Brand Design System Theme
 *
 * Professional Financial Services theme with deep navy/cobalt accents,
 * crisp typography, accessible contrast, and refined interactive surfaces.
 */
export const finservkartTheme = defineTheme({
  name: 'finservkart',
  extends: neutralTheme,
  tokens: {
    '--color-accent': ['#0066cc', '#38bdf8'],
    '--color-background-body': ['#f8fafc', '#090d16'],
    '--color-background-surface': ['#ffffff', '#111827'],
    '--color-background-muted': ['#f1f5f9', '#0f172a'],
    '--color-text-primary': ['#0f172a', '#f8fafc'],
    '--color-text-secondary': ['#475569', '#94a3b8'],
    '--radius-container': '12px',
    '--radius-element': '8px',
  },
});

export default finservkartTheme;
