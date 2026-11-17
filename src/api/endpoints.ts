/**
 * Finservkart Central API Endpoint Definitions
 *
 * STRICT INVARIANT: All paths match the existing PHP backend contracts exactly.
 * Do not alter, prefix, or normalize existing file paths.
 */

export const ENDPOINTS = {
  // Public & Services
  SEARCH_SERVICES: '/search_services.php',
  CONTACT: '/api.function/contact_api.php',
  INVOICE: '/invoice.php',

  // Customer Authentication & Session
  CUSTOMER_LOGIN: '/customer.php',
  CUSTOMER_STANDALONE_LOGIN: '/customer/login.php',
  CUSTOMER_LOGOUT: '/customer/logout.php',
  CUSTOMER_PASSWORD_RECOVERY: '/user-password-recovery.php',

  // Customer Registration & Field Validation
  CUSTOMER_REGISTER: '/api.function/customer_reg_api.php',
  CHECK_CUSTOMER_EMAIL: '/api.function/check_customer_email.php',
  CHECK_CUSTOMER_PHONE: '/api.function/check_customer_contact.php',
  CHECK_REFERRAL: '/api.function/check_referral.php',

  // Other User Roles Authentication (Preserved for system integration)
  AGENT_LOGIN: '/agent.php',
  AGENT_LOGOUT: '/agent/logout.php',
  AGENT_REGISTER: '/api.function/agent.php',
  AGENT_PASSWORD_RECOVERY: '/agent-password-recovery.php',
  CHECK_AGENT_EMAIL: '/api.function/check_agent_email.php',
  CHECK_AGENT_PHONE: '/api.function/check_agent_contact.php',

  CA_LOGIN: '/ca-login.php',
  CA_REGISTER: '/api.function/ca_reg_api.php',
  CA_PASSWORD_RECOVERY: '/ca-password-recovery.php',
  CHECK_CA_EMAIL: '/api.function/check_ca_email.php',
  CHECK_CA_PHONE: '/api.function/check_ca_contact.php',

  FRANCHISE_LOGIN: '/frenchise/index.php',
  FRANCHISE_LOGOUT: '/frenchise/logout.php',
  FRANCHISE_REGISTER: '/frenchise/include/franchise_reg_api.php',
  CHECK_FRANCHISE_PHONE: '/api.function/check_franchise_contact.php',

  ADMIN_LOGIN: '/admin/index.php',
  ADMIN_LOGOUT: '/admin/logout.php',
  COORDINATOR_LOGIN: '/co-ordinator/index.php',
  TELECALLER_LOGIN: '/telecaller_login.php',

  // Customer Protected Operations
  PAYMENT_PROCESS: '/customer/api/payment_process.php',
  CUSTOMER_WORKFLOW: '/customer/api/fetch_workflow.php',
  CUSTOMER_BANK_UPDATE: '/customer/api/req.php',
  CUSTOMER_PROFILE_UPDATE: '/customer/api/update.php',

  // Admin / Operations Analytics
  ADMIN_ANALYTICS: '/admin/api/api_capture.php',
  ADMIN_WORKFLOW_STATS: '/admin/api/workflow_data.php',
} as const;
