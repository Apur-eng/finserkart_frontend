// @vitest-environment jsdom
import { act, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import ContactPage from '../../pages/ContactPage';
import AboutPage from '../../pages/AboutPage';
import { ActionButton, Field, Notice } from '../../components/ui';
import api, { VERIFIED_INITIAL_SERVICES } from '../../api/client';

let host: HTMLDivElement;
let root: Root;
let client: QueryClient;
beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  host = document.createElement('div'); document.body.append(host);
  root = createRoot(host);
  client = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
  client.setQueryData(['services', ''], VERIFIED_INITIAL_SERVICES);
});
afterEach(async () => { await act(async () => root.unmount()); client.clear(); host.remove(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
async function renderHome() {
  await act(async () => root.render(<QueryClientProvider client={client}><MemoryRouter><Routes>
    <Route path="/" element={<HomePage />} /><Route path="/contact" element={<ContactPage />} />
  </Routes></MemoryRouter></QueryClientProvider>));
}
async function setInput(input: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const prototype = input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  await act(async () => { Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(input, value); input.dispatchEvent(new Event('input', { bubbles: true })); });
}

it.each([
  ['Become an Agent', 'Agent partnership enquiry'],
  ['Explore Franchise Opportunities', 'Franchise opportunity enquiry'],
])('connects %s to a prefilled enquiry using the existing contact payload', async (label, subject) => {
  const submit = vi.spyOn(api, 'submitContact').mockResolvedValue({ status: 'success', message: 'Enquiry received' });
  await renderHome();
  const link = Array.from(host.querySelectorAll('a')).find(item => item.textContent?.trim() === label)!;
  expect(link).toBeTruthy(); await act(async () => link.click());
  const subjectLabel = Array.from(host.querySelectorAll('label')).find(item => item.textContent?.startsWith('Subject'))!;
  const subjectInput = host.querySelector<HTMLInputElement>(`[id="${subjectLabel.htmlFor}"]`)!;
  expect(subjectInput.value).toBe(subject);
  for (const [labelText,value] of [['Your Name','Example Person'], ['Email Address','example@example.test']]) {
    const label = Array.from(host.querySelectorAll('label')).find(item => item.textContent?.startsWith(labelText))!;
    await setInput(host.querySelector<HTMLInputElement>(`[id="${label.htmlFor}"]`)!, value);
  }
  await setInput(host.querySelector('textarea')!, 'Please explain the onboarding requirements.');
  await act(async () => host.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  expect(submit).toHaveBeenCalledOnce();
  expect(submit).toHaveBeenCalledWith({ country: 'India', state: 'Uttar Pradesh', name: 'Example Person', phone: '', email: 'example@example.test', subject, message: 'Please explain the onboarding requirements.' });
  expect(host.textContent).toContain('Enquiry received');
});

it('links every rendered category to a nonempty existing service filter', async () => {
  await renderHome();
  const links = host.querySelectorAll<HTMLAnchorElement>('.category-grid a');
  expect(links.length).toBeGreaterThan(3);
  for (const link of links) {
    const url = new URL(link.href); const query = url.searchParams.get('q')!;
    expect(url.pathname).toBe('/services');
    expect(VERIFIED_INITIAL_SERVICES.some(service => service.service_name.toLowerCase().includes(query.toLowerCase()))).toBe(true);
  }
  expect(host.querySelectorAll('.example-label')).toHaveLength(2);
  expect(host.textContent).toContain('FICTIONAL EXAMPLE');
  expect(host.querySelector('a[href="/login?role=agent"]')).toBeTruthy();
  expect(host.querySelector('a[href="/login?role=franchise"]')).toBeTruthy();
  expect(host.querySelector('a[href="/login?role=ca"]')).toBeTruthy();
});

it('supports touch-style pointer swipes without advancing on vertical scrolling', async () => {
  await renderHome();
  const slider = host.querySelector<HTMLElement>('[aria-roledescription="carousel"]')!;
  async function swipe(endX: number, endY: number) {
    await act(async () => { slider.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, clientX: 200, clientY: 100 })); slider.dispatchEvent(new MouseEvent('pointerup', { bubbles: true, clientX: endX, clientY: endY })); });
  }
  await swipe(100, 200);
  expect(slider.querySelector('h2')?.textContent).toBe('GST Registration');
  await swipe(100, 110);
  expect(slider.querySelector('h2')?.textContent).toBe('ITR Filing');
});

it('preserves native field labels, clearing and loading submission protection', async () => {
  const submit = vi.fn();
  function Form() {
    const [value,setValue] = useState('initial');
    return <form onSubmit={event => { event.preventDefault(); submit(); }}><Field label="Account email" type="email" value={value} onChange={setValue} hasClear isRequired /><ActionButton label="Save" type="submit" isLoading /><Notice status="info" title="Terms"><p>Read the service terms before applying.</p></Notice></form>;
  }
  await act(async () => root.render(<Form />));
  const input = host.querySelector('input')!;
  expect(host.querySelector('label')?.htmlFor).toBe(input.id);
  expect(input.required).toBe(true);
  await act(async () => host.querySelector<HTMLButtonElement>('[aria-label="Clear Account email"]')!.click());
  expect(input.value).toBe('');
  const save = host.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  expect(save.disabled).toBe(true); await act(async () => save.click());
  expect(submit).not.toHaveBeenCalled();
  expect(host.textContent).toContain('Read the service terms before applying.');
});

it('supports keyboard navigation of the About page tabs', async () => {
  await act(async () => root.render(<MemoryRouter><AboutPage /></MemoryRouter>));
  const first = host.querySelector<HTMLButtonElement>('[role="tab"]')!; first.focus();
  await act(async () => first.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' })));
  expect(host.querySelector('[role="tab"][aria-selected="true"]')?.textContent).toBe('Our Mission');
  expect(document.activeElement?.id).toBe('about-mission');
  expect(host.querySelector('[role="tabpanel"]')?.getAttribute('aria-labelledby')).toBe('about-mission');
});
