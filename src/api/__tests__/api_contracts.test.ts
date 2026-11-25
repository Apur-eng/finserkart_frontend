import { afterEach, describe, expect, it, vi } from 'vitest';
import { api, getApiBaseUrl, isBackendConfigured, VERIFIED_INITIAL_SERVICES } from '../client';
import { BackendApiProvider, DemoDataProvider } from '../dataAccess';
import { BackendUnavailableError } from '../types';

describe('Clean-Slate Data Access Boundary', () => {
  const originalDemoEnv = import.meta.env.VITE_DEMO_MODE;
  const originalApiUrl = import.meta.env.VITE_API_BASE_URL;

  afterEach(() => {
    import.meta.env.VITE_DEMO_MODE = originalDemoEnv;
    import.meta.env.VITE_API_BASE_URL = originalApiUrl;
    vi.restoreAllMocks();
  });

  it('uses local fixtures and performs zero network requests in Demo Mode', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const demoProvider = new DemoDataProvider();

    const allServices = await demoProvider.searchServices();
    expect(allServices).toHaveLength(VERIFIED_INITIAL_SERVICES.length);

    const gstServices = await demoProvider.searchServices('GST');
    expect(gstServices.length).toBeGreaterThan(0);
    expect(gstServices.every((s) => s.service_name.toLowerCase().includes('gst'))).toBe(true);

    const single = await demoProvider.getServiceById('1');
    expect(single?.service_name).toBe('GST Registration');

    const loginRes = await demoProvider.login('customer', {
      email: 'user@example.com',
      password: 'secret',
    });
    expect(loginRes.success).toBe(false);
    expect(loginRes.message).toContain('Demo Mode');

    const regRes = await demoProvider.registerCustomer({
      CID: 'CUST-001',
      fname: 'Test',
      lname: 'User',
      email: 'test@example.com',
      phone: '9876543210',
      address: 'Lucknow',
      pincode: '226001',
      password: 'secret',
      referral: '',
      CProfile: '',
    });
    expect(regRes.status).toBe('failed');

    const contactRes = await demoProvider.submitContact({
      country: 'India',
      state: 'UP',
      name: 'Test',
      phone: '9876543210',
      email: 'test@example.com',
      subject: 'Inquiry',
      message: 'Need details',
    });
    expect(contactRes.status).toBe('success');

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('honestly reports unavailable state in BackendApiProvider when backend is unconfigured', async () => {
    import.meta.env.VITE_API_BASE_URL = '';
    const liveProvider = new BackendApiProvider();

    expect(isBackendConfigured()).toBe(false);
    await expect(liveProvider.searchServices()).rejects.toBeInstanceOf(BackendUnavailableError);
    await expect(liveProvider.getServiceById('1')).rejects.toBeInstanceOf(BackendUnavailableError);

    const loginRes = await liveProvider.login('admin', {
      username: 'admin',
      password: 'secret',
    });
    expect(loginRes.success).toBe(false);
    expect(loginRes.message).toContain('not configured');
  });

  it('reads configurable VITE_API_BASE_URL and strips trailing slash', () => {
    import.meta.env.VITE_API_BASE_URL = 'https://api.finservkart.example.com/';
    expect(getApiBaseUrl()).toBe('https://api.finservkart.example.com');
    expect(isBackendConfigured()).toBe(true);
  });

  it('routes active api client to DemoDataProvider when VITE_DEMO_MODE is enabled', async () => {
    import.meta.env.VITE_DEMO_MODE = 'true';
    expect(api.isDemoMode()).toBe(true);
    const services = await api.searchServices('ITR');
    expect(services.some((s) => s.service_name === 'ITR Filing')).toBe(true);
  });
});
