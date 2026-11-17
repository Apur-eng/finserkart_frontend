import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../providers/QueryProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import AppRoutes from '../../routes';

describe('Module 05: Franchise Portal Master Inventory (8 Pages)', () => {
  const franchisePages = [
    {
      route: '/franchise/dashboard',
      name: 'Franchise Dashboard',
      titleExpected: 'Lucknow Central Business Franchise',
    },
    {
      route: '/franchise/agents',
      name: 'Agent Directory',
      titleExpected: 'Associated Agents Directory',
    },
    {
      route: '/franchise/customers',
      name: 'Customer Directory',
      titleExpected: 'Network Customer Directory',
    },
    {
      route: '/franchise/applications',
      name: 'Applications Overview',
      titleExpected: 'Franchise Network Applications',
    },
    {
      route: '/franchise/commissions',
      name: 'Commission Statements',
      titleExpected: 'Franchise Commission Statements',
    },
    {
      route: '/franchise/payouts',
      name: 'Payouts History & Banking',
      titleExpected: 'Franchise Payouts',
    },
    {
      route: '/franchise/reports',
      name: 'Business Reports & Analytics',
      titleExpected: 'Business Performance',
    },
    {
      route: '/franchise/profile',
      name: 'Franchise Profile & Territory',
      titleExpected: 'Franchise Profile',
    },
  ];

  franchisePages.forEach(({ route, name, titleExpected }) => {
    it(`renders ${name} at route "${route}" cleanly within FranchiseLayout`, () => {
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
      // Check for portal header branding
      expect(html).toContain('Finservkart');
      expect(html).toContain('Franchise Portal');
      // Check for expected page heading content
      expect(html).toContain(titleExpected);
    });
  });
});
