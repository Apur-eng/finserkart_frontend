import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../providers/QueryProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import AppRoutes from '../../routes';
import api from '../../api/client';

describe('Module 01: Public Website Master Inventory (10 Pages)', () => {
  const pages = [
    { route: '/', name: 'Homepage', titleExpected: 'Your Business, Our Expertise.' },
    { route: '/about', name: 'About Us', titleExpected: 'About Finservkart' },
    { route: '/services', name: 'Services Catalogue', titleExpected: 'Financial &amp; Compliance Services' },
    { route: '/services/1', name: 'Service Details', titleExpected: 'Loading service details' },
    { route: '/contact', name: 'Contact Us', titleExpected: 'Contact' },
    { route: '/register', name: 'Customer Registration', titleExpected: 'Register' },
    { route: '/login', name: 'Login', titleExpected: 'Sign In to Finservkart' },
    { route: '/forgot-password', name: 'Forgot Password', titleExpected: 'Reset Your Password' },
    { route: '/privacy-policy', name: 'Privacy Policy', titleExpected: 'Finservkart Privacy Policy' },
    { route: '/terms-and-conditions', name: 'Terms & Conditions', titleExpected: 'Terms &amp; Conditions of Service' },
  ];

  pages.forEach(({ route, name, titleExpected }) => {
    it(`renders ${name} at route "${route}" cleanly`, () => {
      const html = renderToString(
        <QueryProvider>
          <ThemeProvider mode="light">
            <MemoryRouter initialEntries={[route]}>
              <AppRoutes />
            </MemoryRouter>
          </ThemeProvider>
        </QueryProvider>
      );

      expect(html).toBeTruthy();
      expect(html.replace(/<[^>]+>/g, '')).toContain(titleExpected);
      if (route === '/') {
        // Guard content integrity when converting the marketing sections to data.
        expect(html).toContain('How It Works');
        expect(html).not.toContain('Bank-Level Security');
        expect(html).not.toContain('99.8%');
        expect(html).not.toContain('&lt;/h3&gt;');
        expect((html.match(/<h1\b/g) ?? []).length).toBe(1);
      }
    });
  });

  it('verifies api.recoverPassword method is defined and handles customer email recovery contract', async () => {
    expect(typeof api.recoverPassword).toBe('function');
    const result = await api.recoverPassword('test@example.com');
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
  });
});
