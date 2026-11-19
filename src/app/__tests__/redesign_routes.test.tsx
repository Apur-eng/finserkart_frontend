import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../providers/QueryProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import AppRoutes from '../../routes';
import inventory from './routeInventory.json';

describe('Redesign route coverage', () => {
  for (const entry of inventory) {
    it(`renders ${entry.path} (${entry.page})`, () => {
      const html = renderToString(<QueryProvider><ThemeProvider><MemoryRouter initialEntries={[entry.preview]}>
        <AppRoutes />
      </MemoryRouter></ThemeProvider></QueryProvider>);
      expect(html).toBeTruthy();
      expect(html).not.toContain('&lt;/h3&gt;');
      if (!entry.path.includes('*')) expect(html).not.toContain('404 — Page Not Found');
      if (/^\/(customer|agent|ca|franchise|coordinator|admin)(\/|$)/.test(entry.path)) {
        expect(html).toContain('id="portal-content"');
        expect(html).toContain('aria-label="Portal navigation"');
      }
    });
  }
});
