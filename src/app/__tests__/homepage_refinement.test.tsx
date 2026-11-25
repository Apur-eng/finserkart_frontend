// @vitest-environment jsdom
import { act, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import api, { VERIFIED_INITIAL_SERVICES } from '../../api/client';
import ThemeProvider from '../../providers/ThemeProvider';
import HomePage from '../../pages/HomePage';
import ServicesPage from '../../pages/ServicesPage';
import ServiceCard from '../../components/ServiceCard';
import { selectPromotedServices } from '../../features/services/promotedServices';

let root: Root;
let host: HTMLDivElement;
let client: QueryClient;
beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  host = document.createElement('div'); document.body.append(host);
  root = createRoot(host);
  client = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
  client.setQueryData(['services', ''], VERIFIED_INITIAL_SERVICES);
  vi.spyOn(api, 'searchServices').mockImplementation(async term => VERIFIED_INITIAL_SERVICES.filter(service => service.service_name.toLowerCase().includes((term ?? '').toLowerCase())));
});
afterEach(async () => {
  await act(async () => root.unmount());
  client.clear(); host.remove(); vi.restoreAllMocks(); vi.unstubAllGlobals();
});
function Location() { const location = useLocation(); return <output>{location.pathname + location.search}</output>; }
async function render(children: ReactNode = <HomePage />) {
  await act(async () => root.render(<QueryClientProvider client={client}><ThemeProvider><MemoryRouter>
    {children}<Location />
  </MemoryRouter></ThemeProvider></QueryClientProvider>));
}
function button(label: string) {
  const result = Array.from(host.querySelectorAll('button')).find(item => item.textContent?.trim() === label);
  expect(result, `Missing button ${label}`).toBeTruthy();
  return result!;
}

it('submits hero search to the existing catalogue and loads matching services', async () => {
  await render(<Routes><Route path="/" element={<HomePage />} /><Route path="/services" element={<ServicesPage />} /></Routes>);
  const input = host.querySelector('input')!;
  await act(async () => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, ' ITR ');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await act(async () => host.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  await act(async () => { await new Promise(resolve => setTimeout(resolve, 50)); });
  expect(host.querySelector('output')?.textContent).toBe('/services?q=ITR');
  expect(host.querySelector('input')?.value).toBe('ITR');
  expect(host.querySelector('a[aria-label="View details for ITR Filing"]')).toBeTruthy();
  expect(host.querySelector('a[aria-label="View details for GST Registration"]')).toBeNull();
});

it('advances the slider manually, supports keyboard controls and uses actual service links', async () => {
  await render();
  const carousel = host.querySelector<HTMLElement>('[aria-roledescription="carousel"]')!;
  expect(carousel.querySelector('h2')?.textContent).toBe('GST Registration');
  await act(async () => button('Next service').click());
  expect(carousel.querySelector('h2')?.textContent).toBe('ITR Filing');
  await act(async () => carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true })));
  expect(carousel.querySelector('h2')?.textContent).toBe('Tax Audit & Auditing');
  expect(carousel.querySelector('a')?.getAttribute('href')).toBe('/services/5');
  await act(async () => carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })));
  expect(carousel.querySelector('h2')?.textContent).toBe('GST Registration');
  await act(async () => button('3').click());
  expect(carousel.querySelector('h2')?.textContent).toBe('Private Limited Company Registration');
  expect(button('3').getAttribute('aria-pressed')).toBe('true');
});

it('omits unavailable promotional categories instead of inventing services', () => {
  expect(selectPromotedServices([])).toEqual([]);
  expect(selectPromotedServices(VERIFIED_INITIAL_SERVICES.slice(0, 1)).map(item => item.service.id)).toEqual(['1']);
});

it.each([['Explore Services', '/services'], ['Talk to an Expert', '/contact'], ['Contact Us', '/contact'], ['Explore Demo', '/explore-demo']])('preserves the %s destination', async (label, destination) => {
  await render();
  const link = Array.from(host.querySelectorAll('a')).find(item => item.textContent?.trim() === label);
  expect(link).toBeTruthy();
  await act(async () => link!.click());
  expect(host.querySelector('output')?.textContent).toBe(destination);
});

describe('content and fee integrity', () => {
  it('removes unsupported homepage claims and keeps document checklists off the cards', async () => {
    await render();
    for (const claim of ['10,000', '99.8%', 'ISO Certified', 'Bank-Grade', 'Industry Awards', 'Encrypted Document Vault']) expect(host.textContent).not.toContain(claim);
    expect(host.querySelectorAll('h1')).toHaveLength(1);
    expect(host.textContent).not.toContain('PAN Card of the Business');
    expect(host.querySelectorAll('details')).toHaveLength(6);
  });
  it.each(['', 'unknown', '-5', '12abc', 'Infinity'])('does not fabricate a fee from %s', amount => {
    const html = renderToStaticMarkup(<ThemeProvider><MemoryRouter><ServiceCard service={{ ...VERIFIED_INITIAL_SERVICES[0], total_amt: amount }} /></MemoryRouter></ThemeProvider>);
    expect(html).not.toContain('Listed total');
    expect(html).toContain('View details');
  });
  it('retains a valid zero fee and decimal precision', () => {
    for (const amount of ['0', '1499.50']) {
      const html = renderToStaticMarkup(<ThemeProvider><MemoryRouter><ServiceCard service={{ ...VERIFIED_INITIAL_SERVICES[0], total_amt: amount }} /></MemoryRouter></ThemeProvider>);
      expect(html).toContain('Listed total');
      expect(html).toContain(amount === '0' ? '₹0' : '1,500');
    }
  });
});
