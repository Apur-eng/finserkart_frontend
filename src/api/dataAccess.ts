import { isDemoModeEnabled } from '../features/demo/demoConfig';
import { getApiBaseUrl, isBackendConfigured } from './config';
import { VERIFIED_INITIAL_SERVICES } from './fixtures';
import {
  ApiError,
  BackendUnavailableError,
  type CheckExistsResponse,
  type ContactPayload,
  type ContactResponse,
  type CustomerRegistrationPayload,
  type LoginPayload,
  type LoginResult,
  type RegistrationResponse,
  type ServiceRecord,
  type UserRole,
} from './types';

export interface DataProvider {
  getBaseUrl(): string;
  isDemoMode(): boolean;
  searchServices(term?: string): Promise<ServiceRecord[]>;
  getServiceById(id: string): Promise<ServiceRecord | null>;
  login(role: UserRole, payload: LoginPayload): Promise<LoginResult>;
  loginCustomer(payload: LoginPayload): Promise<LoginResult>;
  logout(): Promise<void>;
  logoutCustomer(): Promise<void>;
  recoverPassword(email: string): Promise<{ success: boolean; message: string }>;
  checkCustomerEmail(email: string): Promise<CheckExistsResponse>;
  checkCustomerPhone(phone: string): Promise<CheckExistsResponse>;
  checkReferral(referral: string): Promise<CheckExistsResponse>;
  registerCustomer(payload: CustomerRegistrationPayload): Promise<RegistrationResponse>;
  submitContact(payload: ContactPayload): Promise<ContactResponse>;
}

/**
 * Offline Demo Provider
 * Uses local fixtures only, avoids all backend network calls,
 * prevents production mutations, and never issues fake auth tokens.
 */
export class DemoDataProvider implements DataProvider {
  public getBaseUrl(): string {
    return '';
  }

  public isDemoMode(): boolean {
    return true;
  }

  public async searchServices(term?: string): Promise<ServiceRecord[]> {
    const query = term?.trim().toLowerCase() ?? '';
    if (!query) {
      return VERIFIED_INITIAL_SERVICES;
    }
    return VERIFIED_INITIAL_SERVICES.filter((service) =>
      service.service_name.toLowerCase().includes(query)
    );
  }

  public async getServiceById(id: string): Promise<ServiceRecord | null> {
    return VERIFIED_INITIAL_SERVICES.find((service) => service.id === id) ?? null;
  }

  public async login(role: UserRole, _payload: LoginPayload): Promise<LoginResult> {
    return {
      success: false,
      message: `Live ${role} authentication is disabled in Demo Mode. Use "Explore Demo" to preview the dashboard with sample data.`,
    };
  }

  public async loginCustomer(payload: LoginPayload): Promise<LoginResult> {
    return this.login('customer', payload);
  }

  public async logout(): Promise<void> {
    // Demo session cleanup is handled by DemoContext
  }

  public async logoutCustomer(): Promise<void> {
    return this.logout();
  }

  public async recoverPassword(email: string): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: `Demo Mode: Password recovery preview for ${email}. No live email or backend request was sent.`,
    };
  }

  public async checkCustomerEmail(_email: string): Promise<CheckExistsResponse> {
    return { exists: false };
  }

  public async checkCustomerPhone(_phone: string): Promise<CheckExistsResponse> {
    return { exists: false };
  }

  public async checkReferral(_referral: string): Promise<CheckExistsResponse> {
    return { exists: false };
  }

  public async registerCustomer(
    _payload: CustomerRegistrationPayload
  ): Promise<RegistrationResponse> {
    return {
      status: 'failed',
      message:
        'Live account registration is disabled in Demo Mode. Use "Explore Demo" to preview any portal without registering.',
    };
  }

  public async submitContact(_payload: ContactPayload): Promise<ContactResponse> {
    return {
      status: 'success',
      message:
        'Demo Mode preview: Your inquiry was validated locally. No live backend request was sent.',
    };
  }
}

/**
 * Future Backend API Provider
 * Ready to connect to the new Finservkart backend via VITE_API_BASE_URL.
 * Does not invent final endpoint contracts or fall back silently to demo fixtures.
 */
export class BackendApiProvider implements DataProvider {
  public getBaseUrl(): string {
    return getApiBaseUrl();
  }

  public isDemoMode(): boolean {
    return false;
  }

  protected async requestJson<T>(path: string, options: RequestInit = {}): Promise<T> {
    if (!isBackendConfigured()) {
      throw new BackendUnavailableError(
        'Backend API URL (VITE_API_BASE_URL) is not configured. Enable Demo Mode or configure the new backend.'
      );
    }

    const baseUrl = this.getBaseUrl();
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const response = await fetch(`${baseUrl}${normalizedPath}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(
        `HTTP Error ${response.status}: ${response.statusText}`,
        response.status,
        errorText
      );
    }

    return (await response.json()) as T;
  }

  private notReadyError(): BackendUnavailableError {
    if (!isBackendConfigured()) {
      return new BackendUnavailableError(
        'Live backend is not configured (VITE_API_BASE_URL is unset).'
      );
    }
    return new BackendUnavailableError(
      'New backend API integration is awaiting confirmed endpoint contracts.'
    );
  }

  public async searchServices(_term?: string): Promise<ServiceRecord[]> {
    throw this.notReadyError();
  }

  public async getServiceById(_id: string): Promise<ServiceRecord | null> {
    throw this.notReadyError();
  }

  public async login(_role: UserRole, _payload: LoginPayload): Promise<LoginResult> {
    return {
      success: false,
      message: this.notReadyError().message,
    };
  }

  public async loginCustomer(payload: LoginPayload): Promise<LoginResult> {
    return this.login('customer', payload);
  }

  public async logout(): Promise<void> {
    // Future backend logout integration point
  }

  public async logoutCustomer(): Promise<void> {
    return this.logout();
  }

  public async recoverPassword(_email: string): Promise<{ success: boolean; message: string }> {
    return {
      success: false,
      message: this.notReadyError().message,
    };
  }

  public async checkCustomerEmail(_email: string): Promise<CheckExistsResponse> {
    return { exists: false };
  }

  public async checkCustomerPhone(_phone: string): Promise<CheckExistsResponse> {
    return { exists: false };
  }

  public async checkReferral(_referral: string): Promise<CheckExistsResponse> {
    return { exists: false };
  }

  public async registerCustomer(
    _payload: CustomerRegistrationPayload
  ): Promise<RegistrationResponse> {
    return {
      status: 'failed',
      message: this.notReadyError().message,
    };
  }

  public async submitContact(_payload: ContactPayload): Promise<ContactResponse> {
    return {
      status: 'failed',
      message: this.notReadyError().message,
    };
  }
}

export function createDataProvider(): DataProvider {
  return isDemoModeEnabled() ? new DemoDataProvider() : new BackendApiProvider();
}
