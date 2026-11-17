import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ENDPOINTS } from '../endpoints';
import api, { VERIFIED_INITIAL_SERVICES } from '../client';
import { parseDocuments, parseTerms, formatCurrency, generateCustomerId, generateOrderId } from '../../utils/formatters';
import type { CustomerRegistrationPayload, ContactPayload } from '../types';

describe('Critical API Contracts & Preserved Endpoints', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('Endpoint Path Verification (No legacy paths broken)', () => {
    it('preserves exact legacy service search endpoint', () => {
      expect(ENDPOINTS.SEARCH_SERVICES).toBe('/search_services.php');
    });

    it('preserves exact legacy customer registration endpoint', () => {
      expect(ENDPOINTS.CUSTOMER_REGISTER).toBe('/api.function/customer_reg_api.php');
    });

    it('preserves exact legacy existence check endpoints', () => {
      expect(ENDPOINTS.CHECK_CUSTOMER_EMAIL).toBe('/api.function/check_customer_email.php');
      expect(ENDPOINTS.CHECK_CUSTOMER_PHONE).toBe('/api.function/check_customer_contact.php');
      expect(ENDPOINTS.CHECK_REFERRAL).toBe('/api.function/check_referral.php');
    });

    it('preserves exact legacy contact API endpoint', () => {
      expect(ENDPOINTS.CONTACT).toBe('/api.function/contact_api.php');
    });

    it('preserves exact legacy role login endpoints and methods', () => {
      expect(ENDPOINTS.CUSTOMER_LOGIN).toBe('/customer.php');
      expect(ENDPOINTS.AGENT_LOGIN).toBe('/agent.php');
      expect(ENDPOINTS.CA_LOGIN).toBe('/ca-login.php');
      expect(ENDPOINTS.CUSTOMER_LOGOUT).toBe('/customer/logout.php');
    });
  });

  describe('Request Payload & Header Contracts', () => {
    it('customer login dispatches application/x-www-form-urlencoded with credentials: include', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify({ status: 'success' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );

      await api.loginCustomer({ email: 'test@example.com', password: 'securepass' });

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [url, options] = fetchSpy.mock.calls[0];
      expect(url).toContain('/customer.php');
      expect(options?.method).toBe('POST');
      expect(options?.credentials).toBe('include');
      expect((options?.headers as Record<string, string>)['Content-Type']).toBe(
        'application/x-www-form-urlencoded'
      );

      const body = options?.body as string;
      const params = new URLSearchParams(body);
      expect(params.get('email')).toBe('test@example.com');
      expect(params.get('password')).toBe('securepass');
      expect(params.get('login')).toBe('1');
    });

    it('customer registration sends multipart FormData with credentials: include and exact field names', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify({ status: 'success', message: 'Registered successfully' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );

      const dummyFile = new File(['avatar content'], 'avatar.jpg', { type: 'image/jpeg' });
      const payload: CustomerRegistrationPayload = {
        CID: 'CID-1234',
        fname: 'Rajesh',
        lname: 'Sharma',
        email: 'rajesh.sharma@example.com',
        phone: '9876543210',
        address: '123 Civil Lines, Bareilly',
        password: 'Password123!',
        referral: 'REF999',
        pincode: '243001',
        CProfile: dummyFile,
      };

      const result = await api.registerCustomer(payload);

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [url, options] = fetchSpy.mock.calls[0];
      expect(url).toContain('/api.function/customer_reg_api.php');
      expect(options?.method).toBe('POST');
      expect(options?.credentials).toBe('include');

      // Crucial: headers must NOT manually force Content-Type for multipart FormData (browser/fetch boundary calculation)
      const headers = options?.headers as Record<string, string> | undefined;
      expect(headers?.['Content-Type']).toBeUndefined();

      const formData = options?.body as FormData;
      expect(formData).toBeInstanceOf(FormData);
      expect(formData.get('CID')).toBe('CID-1234');
      expect(formData.get('fname')).toBe('Rajesh');
      expect(formData.get('lname')).toBe('Sharma');
      expect(formData.get('email')).toBe('rajesh.sharma@example.com');
      expect(formData.get('phone')).toBe('9876543210');
      expect(formData.get('address')).toBe('123 Civil Lines, Bareilly');
      expect(formData.get('password')).toBe('Password123!');
      expect(formData.get('referral')).toBe('REF999');
      expect(formData.get('pincode')).toBe('243001');
      expect(formData.get('CProfile')).toBe(dummyFile);

      expect(result.status).toBe('success');
    });

    it('contact form sends FormData matching legacy contact_api.php fields', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify({ status: 'success', message: 'Inquiry submitted' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );

      const payload: ContactPayload = {
        country: 'India',
        state: 'Uttar Pradesh',
        name: 'Amit Verma',
        phone: '9123456780',
        email: 'amit@example.com',
        subject: 'GST Filing Assistance',
        message: 'Need help with quarterly GST returns.',
      };

      const result = await api.submitContact(payload);

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [url, options] = fetchSpy.mock.calls[0];
      expect(url).toContain('/api.function/contact_api.php');
      expect(options?.method).toBe('POST');

      const formData = options?.body as FormData;
      expect(formData.get('country')).toBe('India');
      expect(formData.get('state')).toBe('Uttar Pradesh');
      expect(formData.get('name')).toBe('Amit Verma');
      expect(formData.get('phone')).toBe('9123456780');
      expect(formData.get('email')).toBe('amit@example.com');
      expect(formData.get('subject')).toBe('GST Filing Assistance');
      expect(formData.get('message')).toBe('Need help with quarterly GST returns.');

      expect(result.status).toBe('success');
    });
  });

  describe('Data Serialization & Parser Verification', () => {
    it('correctly parses newline-delimited documents from legacy database column', () => {
      const sample = 'PAN Card\r\nAadhaar Card\nElectricity Bill\r\nBank Statement';
      const parsed = parseDocuments(sample);
      expect(parsed).toEqual(['PAN Card', 'Aadhaar Card', 'Electricity Bill', 'Bank Statement']);
    });

    it('correctly parses slash-delimited terms from legacy database column', () => {
      const sample = 'Non-refundable fee / Processing takes 3-5 days / Subject to Govt approval';
      const parsed = parseTerms(sample);
      expect(parsed).toEqual([
        'Non-refundable fee',
        'Processing takes 3-5 days',
        'Subject to Govt approval',
      ]);
    });

    it('formats Indian rupee currency accurately', () => {
      expect(formatCurrency(1500)).toBe('₹1,500');
      expect(formatCurrency('25000')).toBe('₹25,000');
      expect(formatCurrency(0)).toBe('₹0');
    });

    it('generates compliant customer IDs matching legacy CID-XXXX format', () => {
      const cid = generateCustomerId();
      expect(cid.startsWith('CID-')).toBe(true);
      expect(cid.length).toBe(8);
    });

    it('generates compliant order IDs matching legacy FSK{YY}{Letter}{Number} format', () => {
      const oid = generateOrderId();
      expect(oid.startsWith('FSK')).toBe(true);
      expect(oid.length).toBe(8);
    });
  });

  describe('Verified Service Snapshot Fallback & Consistency', () => {
    it('returns verified service records with complete required fields', async () => {
      const services = await api.searchServices();
      expect(services.length).toBe(VERIFIED_INITIAL_SERVICES.length);

      const first = services[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('service_name');
      expect(first).toHaveProperty('total_amt');
      expect(first).toHaveProperty('govt_fees');
      expect(first).toHaveProperty('required_documents');
      expect(first).toHaveProperty('terms');
      expect(first).toHaveProperty('service_image');
    });

    it('can retrieve individual service by ID matching database snapshot', async () => {
      const service = await api.getServiceById('1');
      expect(service).not.toBeNull();
      expect(service?.id).toBe('1');
      expect(service?.service_name).toBe('GST Registration');
    });

    it('filters services correctly with search term query', async () => {
      const results = await api.searchServices('GST');
      expect(results.length).toBeGreaterThan(0);
      for (const item of results) {
        expect(item.service_name.toUpperCase()).toContain('GST');
      }
    });
  });
});
