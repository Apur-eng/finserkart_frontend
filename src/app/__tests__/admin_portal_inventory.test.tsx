import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../providers/QueryProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import AppRoutes from '../../routes';

describe('Module 07: Central Admin Portal Master Inventory (11 Pages)', () => {
  const adminPages = [
    {
      route: '/admin/dashboard',
      name: 'Central Admin Dashboard',
      titleExpected: 'Platform Executive Dashboard',
    },
    {
      route: '/admin/users',
      name: 'User Management',
      titleExpected: 'Platform User Management',
    },
    {
      route: '/admin/applications',
      name: 'Central Application Management',
      titleExpected: 'Central Application Management',
    },
    {
      route: '/admin/cas',
      name: 'CA Allocation Oversight',
      titleExpected: 'CA Allocation',
    },
    {
      route: '/admin/commissions',
      name: 'Commission Management & Payouts',
      titleExpected: 'Commission Management',
    },
    {
      route: '/admin/services',
      name: 'Service Catalogue Management',
      titleExpected: 'Service Catalogue',
    },
    {
      route: '/admin/finances',
      name: 'Financial Reports & Transaction Management',
      titleExpected: 'Financial Reports',
    },
    {
      route: '/admin/support',
      name: 'Support & Grievance Governance',
      titleExpected: 'Support Enquiries',
    },
    {
      route: '/admin/activity',
      name: 'System Activity & Audit Logs',
      titleExpected: 'System Activity',
    },
    {
      route: '/admin/settings',
      name: 'Platform Settings & Configuration',
      titleExpected: 'Platform Settings',
    },
    {
      route: '/admin/profile',
      name: 'Administrator Profile & Credentials',
      titleExpected: 'Administrator Profile',
    },
  ];

  adminPages.forEach(({ route, name, titleExpected }) => {
    it(`renders ${name} at route "${route}" cleanly within AdminLayout`, () => {
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
      expect(html).toContain('Central Admin');
      // Check for expected page heading content
      expect(html).toContain(titleExpected);
    });
  });
});
