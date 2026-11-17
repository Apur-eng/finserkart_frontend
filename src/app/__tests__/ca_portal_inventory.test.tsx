import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../providers/QueryProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import AppRoutes from '../../routes';

describe('Module 04: CA Portal Master Inventory (10 Pages)', () => {
  const caPages = [
    {
      route: '/ca/dashboard',
      name: 'CA Dashboard',
      titleExpected: 'CA Regulatory Dashboard',
    },
    {
      route: '/ca/applications',
      name: 'Assigned Applications Queue',
      titleExpected: 'Assigned Applications Queue',
    },
    {
      route: '/ca/applications/FK-SRV-9041',
      name: 'Application Details',
      titleExpected: 'Application Dossier',
    },
    {
      route: '/ca/applications/FK-SRV-9041/workflow',
      name: 'Application Workflow',
      titleExpected: 'Workflow Controller',
    },
    {
      route: '/ca/documents',
      name: 'Document Review Desk',
      titleExpected: 'Document Review',
    },
    {
      route: '/ca/conversations',
      name: 'Customer Conversations',
      titleExpected: 'Customer Communications',
    },
    {
      route: '/ca/deliverables',
      name: 'Deliverables Handover',
      titleExpected: 'Deliverables Handover',
    },
    {
      route: '/ca/completed',
      name: 'Completed Applications',
      titleExpected: 'Completed Filings Archive',
    },
    {
      route: '/ca/profile',
      name: 'CA Profile & Credentials',
      titleExpected: 'CA Professional Profile',
    },
    {
      route: '/ca/notifications',
      name: 'CA Notifications',
      titleExpected: 'Notifications',
    },
  ];

  caPages.forEach(({ route, name, titleExpected }) => {
    it(`renders ${name} at route "${route}" cleanly within CALayout`, () => {
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
      expect(html).toContain('CA Portal');
      // Check for expected page heading content
      expect(html).toContain(titleExpected);
    });
  });
});
