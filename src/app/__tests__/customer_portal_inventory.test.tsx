import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../providers/QueryProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import AppRoutes from '../../routes';

describe('Module 02: Customer Portal Master Inventory (12 Pages)', () => {
  const customerPages = [
    {
      route: '/customer/dashboard',
      name: 'Customer Dashboard',
      titleExpected: 'Customer Portal Dashboard',
    },
    {
      route: '/customer/applications',
      name: 'My Applications',
      titleExpected: 'My Applications',
    },
    {
      route: '/customer/applications/new',
      name: 'New Application',
      titleExpected: 'New Service Application',
    },
    {
      route: '/customer/applications/FK-SRV-9041',
      name: 'Application Details',
      titleExpected: 'Application Dossier',
    },
    {
      route: '/customer/applications/FK-SRV-9041/tracker',
      name: 'Application Tracker',
      titleExpected: 'Application Tracker',
    },
    {
      route: '/customer/documents',
      name: 'Document Centre',
      titleExpected: 'Document Centre',
    },
    {
      route: '/customer/documents/upload',
      name: 'Document Upload',
      titleExpected: 'Upload Documents',
    },
    {
      route: '/customer/conversations',
      name: 'Conversations / CA Chat',
      titleExpected: 'CA Communication &amp; Queries',
    },
    {
      route: '/customer/payments',
      name: 'Payments & Invoices',
      titleExpected: 'Payments &amp; Tax Invoices',
    },
    {
      route: '/customer/profile',
      name: 'Customer & Business Profile',
      titleExpected: 'Customer Profile &amp; Settings',
    },
    {
      route: '/customer/notifications',
      name: 'Notifications',
      titleExpected: 'Notifications &amp; Activity',
    },
    {
      route: '/customer/support',
      name: 'Customer Support',
      titleExpected: 'Customer Support &amp; Helpdesk',
    },
  ];

  customerPages.forEach(({ route, name, titleExpected }) => {
    it(`renders ${name} at route "${route}" cleanly within CustomerLayout`, () => {
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
      expect(html).toContain('Customer Portal');
      // Check for expected page heading content
      expect(html).toContain(titleExpected);
    });
  });
});
