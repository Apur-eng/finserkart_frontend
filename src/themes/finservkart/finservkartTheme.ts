import {premiumTokens} from './tokens';
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';

export const finservkartTheme = defineTheme({
  extends: neutralTheme,
  name: 'finservkart',
  typography: { body: { family: 'Inter', fallbacks: 'system-ui, sans-serif' }, heading: { family: 'Manrope', fallbacks: 'system-ui, sans-serif' } },
  tokens: {
    ...premiumTokens,
    '--font-family-body': 'Inter, system-ui, sans-serif',
    '--font-family-heading': 'Manrope, system-ui, sans-serif',
    '--color-accent': '#245ce5',
    '--color-background-body': '#f5f7fb',
    '--color-background-surface': '#ffffff',
    '--color-background-muted': '#edf2f7',
    '--color-text-primary': '#142b45',
    '--color-text-secondary': '#52657c',
    '--radius-container': '16px',
    '--radius-element': '8px',
  },
  components: {
    heading: { base: { fontFamily: 'Manrope, sans-serif', fontWeight: '700', letterSpacing: '-0.025em' } },
    text: { base: { fontFamily: 'Inter, sans-serif' } },
    button: { base: { fontFamily: 'Inter, sans-serif', fontWeight: '600', borderRadius: '8px' } },
    card: { base: { borderRadius: '16px', boxShadow: 'var(--shadow-fsk-card)' } },
  },
});
