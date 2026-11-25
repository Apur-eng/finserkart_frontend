import { createDataProvider, type DataProvider } from './dataAccess';

export { VERIFIED_INITIAL_SERVICES } from './fixtures';
export { getApiBaseUrl, isBackendConfigured } from './config';

/**
 * Active data-access boundary.
 * Dynamically delegates to DemoDataProvider when VITE_DEMO_MODE is enabled,
 * or BackendApiProvider when running against a live backend.
 */
export const api: DataProvider = {
  getBaseUrl: () => createDataProvider().getBaseUrl(),
  isDemoMode: () => createDataProvider().isDemoMode(),
  searchServices: (term) => createDataProvider().searchServices(term),
  getServiceById: (id) => createDataProvider().getServiceById(id),
  login: (role, payload) => createDataProvider().login(role, payload),
  loginCustomer: (payload) => createDataProvider().loginCustomer(payload),
  logout: () => createDataProvider().logout(),
  logoutCustomer: () => createDataProvider().logoutCustomer(),
  recoverPassword: (email) => createDataProvider().recoverPassword(email),
  checkCustomerEmail: (email) => createDataProvider().checkCustomerEmail(email),
  checkCustomerPhone: (phone) => createDataProvider().checkCustomerPhone(phone),
  checkReferral: (referral) => createDataProvider().checkReferral(referral),
  registerCustomer: (payload) => createDataProvider().registerCustomer(payload),
  submitContact: (payload) => createDataProvider().submitContact(payload),
};

export default api;
