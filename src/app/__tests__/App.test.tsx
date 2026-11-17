import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../providers/QueryProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import AppRoutes from '../../routes';

describe('App rendering test', () => {
  it('renders with MemoryRouter without error', () => {
    try {
      const html = renderToString(
        <QueryProvider>
          <ThemeProvider mode="light">
            <MemoryRouter initialEntries={['/about']}>
              <AppRoutes />
            </MemoryRouter>
          </ThemeProvider>
        </QueryProvider>
      );
      expect(html).toBeTruthy();
      console.log('HTML length:', html.length);
    } catch (e) {
      console.error('Render error:', e);
      throw e;
    }
  });
});
