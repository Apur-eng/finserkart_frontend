// @vitest-environment jsdom
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import QueryProvider from '../../providers/QueryProvider';
import ThemeProvider from '../../providers/ThemeProvider';
import AppRoutes from '../../routes';
import Navbar from '../../components/Navbar';
import HomePage from '../../pages/HomePage';
import ExploreDemoPage from '../../pages/ExploreDemoPage';
import LoginPage from '../../pages/LoginPage';
import {
  DEMO_STORAGE_KEY,
  getStoredDemoSession,
  isDemoModeEnabled,
  storeDemoSession,
} from '../../features/demo/demoConfig';
import DemoProvider from '../../features/demo/DemoContext';

beforeEach(() => {
  sessionStorage.clear();
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value: function (this: HTMLDialogElement) { this.open = true; },
  });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value: function (this: HTMLDialogElement) { this.open = false; },
  });
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: () => true,
  }));
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.replaceChildren();
  sessionStorage.clear();
});

function LocationDisplay() {
  const loc = useLocation();
  return <output data-testid="location">{loc.pathname}{loc.search}</output>;
}

describe('Finservkart Demo Access and Role-Based Login Suite', () => {
  it('renders "Explore Demo" in desktop navigation and links to /explore-demo', async () => {
    const host = document.createElement('div');
    document.body.append(host);
    const root = createRoot(host);

    await act(async () => {
      root.render(
        <ThemeProvider>
          <MemoryRouter>
            <Navbar />
            <LocationDisplay />
          </MemoryRouter>
        </ThemeProvider>
      );
    });

    const exploreLink = Array.from(host.querySelectorAll('a')).find((a) =>
      a.textContent?.includes('Explore Demo')
    );
    expect(exploreLink).toBeTruthy();
    expect(exploreLink?.getAttribute('href')).toBe('/explore-demo');

    await act(async () => {
      root.unmount();
    });
  });

  it('renders "Explore Demo" link on the homepage', async () => {
    const host = document.createElement('div');
    document.body.append(host);
    const root = createRoot(host);

    await act(async () => {
      root.render(
        <QueryProvider>
          <ThemeProvider>
            <MemoryRouter initialEntries={['/']}>
              <HomePage />
              <LocationDisplay />
            </MemoryRouter>
          </ThemeProvider>
        </QueryProvider>
      );
    });

    const exploreButton = Array.from(host.querySelectorAll('a')).find((b) =>
      b.textContent?.includes('Explore Demo')
    );
    expect(exploreButton).toBeTruthy();

    await act(async () => {
      exploreButton?.click();
    });

    expect(host.querySelector('[data-testid="location"]')?.textContent).toBe('/explore-demo');

    await act(async () => {
      root.unmount();
    });
  });

  it('renders the Demo Access Page with title, subtitle, and all six role cards', async () => {
    const host = document.createElement('div');
    document.body.append(host);
    const root = createRoot(host);

    await act(async () => {
      root.render(
        <QueryProvider>
          <ThemeProvider>
            <MemoryRouter initialEntries={['/explore-demo']}>
              <DemoProvider>
                <ExploreDemoPage />
                <LocationDisplay />
              </DemoProvider>
            </MemoryRouter>
          </ThemeProvider>
        </QueryProvider>
      );
    });

    // Page title and subtitle
    expect(host.textContent).toContain('Explore Finservkart');
    expect(host.textContent).toContain('Experience the platform from every perspective.');

    // Check all six role cards
    const expectedRoles = [
      { name: 'Main Admin', desc: 'Manage users, services, applications, and platform operations.' },
      { name: 'Operations Coordinator', desc: 'Monitor service requests and coordinate operational activities.' },
      { name: 'Franchise', desc: 'Manage agent networks and review performance.' },
      { name: 'Agent', desc: 'Manage customers, applications, and earnings.' },
      { name: 'Chartered Accountant', desc: 'Review assigned applications and manage service fulfilment.' },
      { name: 'Customer', desc: 'Track services, applications, and documents.' },
    ];

    expectedRoles.forEach(({ name, desc }) => {
      expect(host.textContent).toContain(name);
      expect(host.textContent).toContain(desc);
    });

    // Check Explore Dashboard buttons
    const buttons = Array.from(host.querySelectorAll('button')).filter((b) =>
      b.textContent?.includes('Explore Dashboard')
    );
    expect(buttons.length).toBe(6);

    await act(async () => {
      root.unmount();
    });
  });

  it('clicking "Explore Dashboard" on Main Admin creates demo session and navigates to /admin', async () => {
    const host = document.createElement('div');
    document.body.append(host);
    const root = createRoot(host);

    await act(async () => {
      root.render(
        <QueryProvider>
          <ThemeProvider>
            <MemoryRouter initialEntries={['/explore-demo']}>
              <AppRoutes />
              <LocationDisplay />
            </MemoryRouter>
          </ThemeProvider>
        </QueryProvider>
      );
    });

    // Find Main Admin card's Explore Dashboard button
    const adminHeading = Array.from(host.querySelectorAll('h2')).find((h) =>
      h.textContent?.includes('Main Admin')
    );
    expect(adminHeading).toBeTruthy();
    const adminCard = adminHeading?.closest('article');
    const adminButton = adminCard?.querySelector('button');
    expect(adminButton).toBeTruthy();

    await act(async () => {
      adminButton?.click();
    });

    // Check location changed to /admin
    const locationText = host.querySelector('[data-testid="location"]')?.textContent;
    expect(locationText).toBe('/admin');

    // Check sessionStorage contains role 'admin'
    const stored = getStoredDemoSession();
    expect(stored?.role).toBe('admin');

    await act(async () => {
      root.unmount();
    });
  });

  it('displays "Demo Mode — Sample Data", "Switch Demo Role", and "Exit Demo" in PortalShell when demo is active', async () => {
    // Set active demo session
    storeDemoSession('coordinator');

    const host = document.createElement('div');
    document.body.append(host);
    const root = createRoot(host);

    await act(async () => {
      root.render(
        <QueryProvider>
          <ThemeProvider>
            <MemoryRouter initialEntries={['/coordinator']}>
              <AppRoutes />
              <LocationDisplay />
            </MemoryRouter>
          </ThemeProvider>
        </QueryProvider>
      );
    });

    expect(host.textContent).toContain('Demo Mode — Sample Data');
    expect(host.textContent).toContain('Viewing as:');
    expect(host.textContent).toContain('Operations Coordinator');

    const switchButton = Array.from(host.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Switch Demo Role')
    );
    expect(switchButton).toBeTruthy();

    const exitButton = Array.from(host.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Exit Demo')
    );
    expect(exitButton).toBeTruthy();

    // Test Exit Demo
    await act(async () => {
      exitButton?.click();
    });

    expect(sessionStorage.getItem(DEMO_STORAGE_KEY)).toBeNull();
    expect(host.querySelector('[data-testid="location"]')?.textContent).toBe('/explore-demo');

    await act(async () => {
      root.unmount();
    });
  });

  it('persists demo session across simulated page refresh', () => {
    storeDemoSession('franchise');
    const session = getStoredDemoSession();
    expect(session).not.toBeNull();
    expect(session?.role).toBe('franchise');
  });

  it('unified login page includes access paths and tabs for all six roles', async () => {
    const host = document.createElement('div');
    document.body.append(host);
    const root = createRoot(host);

    await act(async () => {
      root.render(
        <QueryProvider>
          <ThemeProvider>
            <MemoryRouter initialEntries={['/login']}>
              <DemoProvider>
                <LoginPage />
                <LocationDisplay />
              </DemoProvider>
            </MemoryRouter>
          </ThemeProvider>
        </QueryProvider>
      );
    });

    const roleTabs = Array.from(host.querySelectorAll('button[role="tab"]'));
    expect(roleTabs.length).toBe(6);

    const tabNames = roleTabs.map((t) => t.textContent?.trim());
    expect(tabNames).toEqual([
      'Customer',
      'Agent',
      'Franchise',
      'Chartered Accountant',
      'Operations Coordinator',
      'Main Admin',
    ]);

    // Check demo callout button "Explore as Customer"
    expect(host.textContent).toContain('Explore as Customer');

    // Switch to Main Admin tab
    const adminTab = roleTabs.find((t) => t.textContent?.includes('Main Admin'));
    await act(async () => {
      (adminTab as HTMLElement)?.click();
    });

    // Check demo callout changed to Main Admin and no legacy .php paths leak into UI
    expect(host.textContent).toContain('Explore as Main Admin');
    expect(host.textContent).not.toContain('.php');

    // Administrative roles do not display public self-registration
    expect(host.textContent).toContain('Staff accounts are provisioned internally');
    expect(host.textContent).not.toContain("Don't have an account? Sign Up");

    await act(async () => {
      root.unmount();
    });
  });

  it('disables demo sessions when demo mode is turned off via configuration', () => {
    expect(isDemoModeEnabled()).toBe(true);

    // Mock VITE_DEMO_MODE='false'
    const originalEnv = import.meta.env.VITE_DEMO_MODE;
    import.meta.env.VITE_DEMO_MODE = 'false';

    try {
      expect(isDemoModeEnabled()).toBe(false);
      expect(storeDemoSession('admin')).toBeNull();
      expect(getStoredDemoSession()).toBeNull();
    } finally {
      import.meta.env.VITE_DEMO_MODE = originalEnv;
    }
  });
});
