/**
 * Typed response and request interfaces based on actual backend contracts.
 */

// Service Record as returned by MySQL / search_services.php
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

// Field existence check response (check_customer_email.php, check_customer_contact.php, check_referral.php)
export interface CheckExistsResponse {
  exists: boolean;
}

// Customer Registration Request payload (sent via FormData to api.function/customer_reg_api.php)
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

// Customer Registration Response
export interface RegistrationResponse {
  status: 'success' | 'partial' | 'failed';
  message: string;
}

// Login Payload
export interface LoginPayload {
  email?: string;
  username?: string;
  password: string;
  login?: string;
}

// Login Result
export interface LoginResult {
  success: boolean;
  message?: string;
  redirectUrl?: string;
}

// Contact Form Payload (sent to api.function/contact_api.php)
export interface ContactPayload {
  country: string;
  state: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

// Contact Form Response
export interface ContactResponse {
  status: 'success' | 'failed';
  message: string;
}

// Password Recovery Payload
export interface PasswordRecoveryPayload {
  femail: string;
  send?: string;
}

// Standardized Client API Error
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

