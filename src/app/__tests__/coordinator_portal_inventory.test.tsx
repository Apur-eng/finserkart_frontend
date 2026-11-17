import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../providers/QueryProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import AppRoutes from '../../routes';

describe('Module 06: Operations Coordinator Portal Master Inventory (8 Pages)', () => {
  const coordinatorPages = [
    {
      route: '/coordinator/dashboard',
      name: 'Operations Dashboard',
      titleExpected: 'Saurabh Kapoor',
    },
    {
      route: '/coordinator/applications',
      name: 'Operations Application Queue',
      titleExpected: 'Operations Application Queue',
    },
    {
      route: '/coordinator/applications/FK-SRV-9041',
      name: 'Application Details Dossier',
      titleExpected: 'GST Registration',
    },
    {
      route: '/coordinator/ca-assignment',
      name: 'CA Assignment Desk',
      titleExpected: 'CA Assignment Desk',
    },
    {
      route: '/coordinator/cas',
      name: 'CA Capacity & Workload Management',
      titleExpected: 'CA Capacity Management',
    },
    {
      route: '/coordinator/documents',
      name: 'Document Verification Monitoring',
      titleExpected: 'Document Monitoring',
    },
    {
      route: '/coordinator/transactions',
      name: 'Operations Payment Monitoring',
      titleExpected: 'Operations Payment',
    },
    {
      route: '/coordinator/notifications',
      name: 'Operational Alerts & Notifications',
      titleExpected: 'Operational Alerts',
    },
  ];

  coordinatorPages.forEach(({ route, name, titleExpected }) => {
    it(`renders ${name} at route "${route}" cleanly within CoordinatorLayout`, () => {
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
      expect(html).toContain('Operations Desk');
      // Check for expected page heading content
      expect(html).toContain(titleExpected);
    });
  });
});
