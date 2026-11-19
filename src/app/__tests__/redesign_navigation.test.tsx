// @vitest-environment jsdom
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import ThemeProvider from '../../providers/ThemeProvider';
import Navbar from '../../components/Navbar';
import { PortalShell } from '../../components/PortalShell';

beforeEach(() => {
  // jsdom has no top-layer dialog implementation; this tests our state/routing,
  // not browser focus trapping, layout or native dialog behavior.
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function (this: HTMLDialogElement) { this.open = true; } });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function (this: HTMLDialogElement) { this.open = false; } });
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query === '(max-width: 1023px)', media: query, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: () => true,
  }));
});
afterEach(() => {
  vi.unstubAllGlobals(); document.body.replaceChildren();
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal');
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'close');
});

function Location() { return <output data-testid="location">{useLocation().pathname}</output>; }

it('opens mobile public navigation and preserves service and role destinations', async () => {
  const host = document.createElement('div'); document.body.append(host);
  const root = createRoot(host);
  await act(async () => root.render(<ThemeProvider><MemoryRouter><Navbar /><Location /></MemoryRouter></ThemeProvider>));
  const trigger = Array.from(host.querySelectorAll('button')).find(button => button.textContent?.includes('Menu'));
  expect(trigger).toBeTruthy();
  await act(async () => trigger?.click());
  expect(trigger?.getAttribute('aria-expanded')).toBe('true');
  expect(document.querySelector('a[href="/login?role=ca"]')).toBeTruthy();
  const services = document.querySelector<HTMLAnchorElement>('a[href="/services"]');
  expect(services).toBeTruthy();
  await act(async () => services?.click());
  expect(host.querySelector('output')?.textContent).toBe('/services');
  expect(trigger?.getAttribute('aria-expanded')).toBe('false');
  await act(async () => root.unmount());
});

it('keeps portal content reachable while mobile navigation is collapsed', async () => {
  const host = document.createElement('div'); document.body.append(host);
  const root = createRoot(host);
  await act(async () => root.render(<ThemeProvider><MemoryRouter initialEntries={['/customer']}>
    <PortalShell header={<header>Customer</header>} navigation={<a href="/customer/applications">Applications</a>}>
      <h1>Customer dashboard</h1>
    </PortalShell>
  </MemoryRouter></ThemeProvider>));
  expect(host.querySelector('#portal-content h1')?.textContent).toBe('Customer dashboard');
  const trigger = Array.from(host.querySelectorAll('button')).find(button => button.textContent?.includes('Portal navigation'));
  await act(async () => trigger?.click());
  expect(document.querySelector('a[href="/customer/applications"]')).toBeTruthy();
  const close = Array.from(document.querySelectorAll('button')).find(button => button.textContent?.includes('Close navigation'));
  await act(async () => close?.click());
  expect(trigger?.getAttribute('aria-expanded')).toBe('false');
  await act(async () => root.unmount());
});
