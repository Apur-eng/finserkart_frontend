/**
 * Typed domain interfaces for Finservkart frontend.
 * Independent of legacy backend conventions.
 */

export type UserRole =
  | 'customer'
  | 'agent'
  | 'franchise'
  | 'ca'
  | 'coordinator'
  | 'admin';

export interface ServiceRecord {
  id: string;
  service_name: string;
  service_image: string;
  required_documents: string; // Newline-delimited list of documents
  service_price: string;
  govt_fees: string;
  percentage: string;
  total_amt: string; // Customer payable amount
  commission: string; // Agent commission
  terms: string; // Terms and conditions, separated by '/'
}

export interface CheckExistsResponse {
  exists: boolean;
}

export interface CustomerRegistrationPayload {
  CID: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  password: string;
  referral: string;
  CProfile: File | string;
}

export interface RegistrationResponse {
  status: 'success' | 'partial' | 'failed';
  message: string;
}

export interface LoginPayload {
  email?: string;
  username?: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  message?: string;
  redirectUrl?: string;
}

export interface ContactPayload {
  country: string;
  state: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  status: 'success' | 'failed';
  message: string;
}

export class ApiError extends Error {
  public status: number;
  public data?: unknown;

  constructor(message: string, status: number = 500, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export class BackendUnavailableError extends ApiError {
  constructor(
    message: string = 'Live backend service is not configured or currently unavailable.'
  ) {
    super(message, 503);
    this.name = 'BackendUnavailableError';
  }
}
