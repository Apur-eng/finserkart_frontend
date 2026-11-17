import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../providers/QueryProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import AppRoutes from '../../routes';

describe('Module 03: Agent Portal Master Inventory (9 Pages)', () => {
  const agentPages = [
    {
      route: '/agent/dashboard',
      name: 'Agent Dashboard',
      titleExpected: 'Agent Business Dashboard',
    },
    {
      route: '/agent/customers/onboard',
      name: 'Onboard Customer',
      titleExpected: 'Onboard New Customer',
    },
    {
      route: '/agent/customers',
      name: 'Customer Directory',
      titleExpected: 'Customer Directory',
    },
    {
      route: '/agent/applications',
      name: 'Applications List',
      titleExpected: 'Client Applications',
    },
    {
      route: '/agent/applications/FK-SRV-9041',
      name: 'Application Details',
      titleExpected: 'Application Dossier',
    },
    {
      route: '/agent/commissions',
      name: 'Commissions Ledger',
      titleExpected: 'Commission Ledger',
    },
    {
      route: '/agent/payouts',
      name: 'Payouts History',
      titleExpected: 'Partner Payouts',
    },
    {
      route: '/agent/profile',
      name: 'Agent Profile',
      titleExpected: 'Agent Partner Profile',
    },
    {
      route: '/agent/notifications',
      name: 'Agent Notifications',
      titleExpected: 'Notifications',
    },
  ];

  agentPages.forEach(({ route, name, titleExpected }) => {
    it(`renders ${name} at route "${route}" cleanly within AgentLayout`, () => {
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
      expect(html).toContain('Agent Portal');
      // Check for expected page heading content
      expect(html).toContain(titleExpected);
    });
  });
});
