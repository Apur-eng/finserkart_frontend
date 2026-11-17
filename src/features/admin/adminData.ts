export interface AdminProfile {
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  twoFactorEnabled: boolean;
  securityClearance: string;
}

export interface AdminAnalytics {
  totalGMV: number;
  platformNetRevenue: number;
  totalCustomers: number;
  totalAgents: number;
  totalCas: number;
  totalFranchises: number;
  activeApplications: number;
  completedApplications: number;
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: 'Customer' | 'Agent' | 'CA' | 'Franchise' | 'Coordinator';
  status: 'Active' | 'Suspended' | 'Pending Verification';
  joinedDate: string;
  location: string;
  phone: string;
}

export interface AdminServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  govtFee: number;
  caCommission: number;
  agentCommission: number;
  turnaroundDays: number;
  status: 'Active' | 'Inactive';
}

export interface AdminActivityLogItem {
  id: string;
  actor: string;
  action: string;
  entity: string;
  timestamp: string;
  ip: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface AdminCommissionRule {
  id: string;
  serviceCategory: string;
  caSharePercent: number;
  agentSharePercent: number;
  franchiseSharePercent: number;
  platformMarginPercent: number;
  updatedAt: string;
}

export interface AdminPayoutApprovalItem {
  id: string;
  beneficiaryName: string;
  beneficiaryRole: 'Agent' | 'CA' | 'Franchise';
  amount: number;
  bankAccount: string;
  ifsc: string;
  requestedDate: string;
  status: 'Pending Approval' | 'Disbursed' | 'Rejected';
}

export interface AdminTransactionItem {
  id: string;
  customerName: string;
  serviceName: string;
  amount: number;
  gateway: 'Razorpay PG' | 'HDFC Direct UPI' | 'NetBanking';
  status: 'Success' | 'Pending' | 'Refunded';
  date: string;
  referenceId: string;
}

export interface AdminSupportTicketItem {
  id: string;
  userName: string;
  userRole: string;
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
  lastUpdated: string;
}

export interface AdminPlatformSettings {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  maintenanceMode: boolean;
  autoAssignCA: boolean;
  taxDeductionPercent: number;
  minPayoutThreshold: number;
  paymentGatewayKey: string;
}

export const INITIAL_ADMIN_PROFILE: AdminProfile = {
  name: 'Platform Operations Admin',
  email: 'admin@finservkart.com',
  role: 'Super Administrator',
  lastLogin: 'Today, 08:30 AM',
  twoFactorEnabled: true,
  securityClearance: 'Level 5 (Full Platform Governance)',
};

export const INITIAL_ADMIN_ANALYTICS: AdminAnalytics = {
  totalGMV: 1845000,
  platformNetRevenue: 368000,
  totalCustomers: 342,
  totalAgents: 28,
  totalCas: 18,
  totalFranchises: 6,
  activeApplications: 84,
  completedApplications: 412,
};

export const INITIAL_ADMIN_USERS: AdminUserItem[] = [
  {
    id: 'CUST-2026-081',
    name: 'Ananya Verma',
    email: 'ananya.verma@example.com',
    role: 'Customer',
    status: 'Active',
    joinedDate: '12 Mar 2026',
    location: 'Lucknow',
    phone: '+91 9876543210',
  },
  {
    id: 'AG-102',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@finservkart-partner.in',
    role: 'Agent',
    status: 'Active',
    joinedDate: '10 Jan 2026',
    location: 'Lucknow',
    phone: '+91 9415012399',
  },
  {
    id: 'CA-LKO-04',
    name: 'CA Vivek Agrawal',
    email: 'vivek.ca@finservkart.com',
    role: 'CA',
    status: 'Active',
    joinedDate: '15 Aug 2025',
    location: 'Lucknow',
    phone: '+91 9415012345',
  },
  {
    id: 'FRAN-LKO-01',
    name: 'Amitav Trivedi (Lucknow Central Franchise)',
    email: 'amitav.trivedi@finservkart-partner.in',
    role: 'Franchise',
    status: 'Active',
    joinedDate: '01 Jan 2026',
    location: 'Lucknow',
    phone: '+91 9839019283',
  },
  {
    id: 'COORD-01',
    name: 'Saurabh Kapoor',
    email: 'saurabh.kapoor@finservkart.com',
    role: 'Coordinator',
    status: 'Active',
    joinedDate: '01 Dec 2025',
    location: 'Lucknow Operations Command',
    phone: '+91 9415088291',
  },
];

export const INITIAL_ADMIN_SERVICES: AdminServiceItem[] = [
  {
    id: 'SRV-01',
    name: 'Private Limited Company Registration',
    category: 'Company Registration',
    price: 8999,
    govtFee: 2000,
    caCommission: 2500,
    agentCommission: 1800,
    turnaroundDays: 7,
    status: 'Active',
  },
  {
    id: 'SRV-02',
    name: 'GST Registration & ARN Processing',
    category: 'Taxation',
    price: 1499,
    govtFee: 0,
    caCommission: 750,
    agentCommission: 300,
    turnaroundDays: 4,
    status: 'Active',
  },
  {
    id: 'SRV-03',
    name: 'Trademark Application Filing (Class 1-45)',
    category: 'Compliance',
    price: 4999,
    govtFee: 4500,
    caCommission: 1500,
    agentCommission: 1200,
    turnaroundDays: 3,
    status: 'Active',
  },
  {
    id: 'SRV-04',
    name: 'FSSAI Food License Registration',
    category: 'Licensing',
    price: 2999,
    govtFee: 1000,
    caCommission: 1200,
    agentCommission: 600,
    turnaroundDays: 7,
    status: 'Active',
  },
  {
    id: 'SRV-05',
    name: 'MSME / Udyam Certificate Registration',
    category: 'Compliance',
    price: 1499,
    govtFee: 0,
    caCommission: 500,
    agentCommission: 300,
    turnaroundDays: 2,
    status: 'Active',
  },
];

export const INITIAL_ADMIN_ACTIVITY_LOGS: AdminActivityLogItem[] = [
  {
    id: 'LOG-1001',
    actor: 'Saurabh Kapoor (Coordinator)',
    action: 'Assigned CA Vivek Agrawal to Application FK-SRV-9041',
    entity: 'Application FK-SRV-9041',
    timestamp: 'Today at 10:15 AM',
    ip: '103.21.124.9',
    severity: 'info',
  },
  {
    id: 'LOG-1002',
    actor: 'Amitav Trivedi (Franchise)',
    action: 'Submitted Bulk Withdrawal Request for ₹9,200',
    entity: 'Payout P-45',
    timestamp: 'Today at 09:40 AM',
    ip: '117.202.91.4',
    severity: 'info',
  },
  {
    id: 'LOG-1003',
    actor: 'Security Daemon',
    action: 'Automated Database Backup Completed to AWS S3 Mumbai',
    entity: 'System Storage',
    timestamp: 'Today at 04:00 AM',
    ip: '127.0.0.1',
    severity: 'info',
  },
  {
    id: 'LOG-1004',
    actor: 'CA Vivek Agrawal',
    action: 'Approved Document Premises_Electricity_Bill.pdf',
    entity: 'Document CADOC-101',
    timestamp: 'Yesterday at 05:40 PM',
    ip: '103.88.201.12',
    severity: 'info',
  },
];

export const INITIAL_ADMIN_COMMISSION_RULES: AdminCommissionRule[] = [
  {
    id: 'RULE-01',
    serviceCategory: 'Company Registration',
    caSharePercent: 35,
    agentSharePercent: 25,
    franchiseSharePercent: 15,
    platformMarginPercent: 25,
    updatedAt: '01 Mar 2026',
  },
  {
    id: 'RULE-02',
    serviceCategory: 'Taxation & GST',
    caSharePercent: 45,
    agentSharePercent: 20,
    franchiseSharePercent: 15,
    platformMarginPercent: 20,
    updatedAt: '01 Mar 2026',
  },
  {
    id: 'RULE-03',
    serviceCategory: 'IP & Trademark',
    caSharePercent: 30,
    agentSharePercent: 25,
    franchiseSharePercent: 20,
    platformMarginPercent: 25,
    updatedAt: '15 Feb 2026',
  },
  {
    id: 'RULE-04',
    serviceCategory: 'Licensing & Compliance',
    caSharePercent: 40,
    agentSharePercent: 20,
    franchiseSharePercent: 15,
    platformMarginPercent: 25,
    updatedAt: '10 Feb 2026',
  },
];

export const INITIAL_ADMIN_PAYOUT_APPROVALS: AdminPayoutApprovalItem[] = [
  {
    id: 'PO-REQ-901',
    beneficiaryName: 'Rajesh Sharma',
    beneficiaryRole: 'Agent',
    amount: 14500,
    bankAccount: '••••••••8912',
    ifsc: 'HDFC0001024',
    requestedDate: 'Today, 09:15 AM',
    status: 'Pending Approval',
  },
  {
    id: 'PO-REQ-902',
    beneficiaryName: 'Amitav Trivedi (Lucknow Central Franchise)',
    beneficiaryRole: 'Franchise',
    amount: 28400,
    bankAccount: '••••••••4401',
    ifsc: 'ICIC0000912',
    requestedDate: 'Yesterday, 04:30 PM',
    status: 'Pending Approval',
  },
  {
    id: 'PO-REQ-903',
    beneficiaryName: 'CA Vivek Agrawal',
    beneficiaryRole: 'CA',
    amount: 32000,
    bankAccount: '••••••••7721',
    ifsc: 'SBIN0002190',
    requestedDate: '14 Mar 2026',
    status: 'Disbursed',
  },
];

export const INITIAL_ADMIN_TRANSACTIONS: AdminTransactionItem[] = [
  {
    id: 'TXN-9081',
    customerName: 'Ananya Verma',
    serviceName: 'Private Limited Company Registration',
    amount: 8999,
    gateway: 'Razorpay PG',
    status: 'Success',
    date: '14 Mar 2026, 02:40 PM',
    referenceId: 'pay_NzK8912Kl01',
  },
  {
    id: 'TXN-9082',
    customerName: 'Vikram Solar Pvt Ltd',
    serviceName: 'GST Registration & ARN Processing',
    amount: 1499,
    gateway: 'HDFC Direct UPI',
    status: 'Success',
    date: '13 Mar 2026, 11:15 AM',
    referenceId: 'upi_90218491823',
  },
  {
    id: 'TXN-9083',
    customerName: 'Sunil Kumar',
    serviceName: 'Trademark Application Filing',
    amount: 4999,
    gateway: 'NetBanking',
    status: 'Pending',
    date: '12 Mar 2026, 06:10 PM',
    referenceId: 'nb_89120938192',
  },
  {
    id: 'TXN-9084',
    customerName: 'Kavita Chawla',
    serviceName: 'FSSAI Food License Registration',
    amount: 2999,
    gateway: 'Razorpay PG',
    status: 'Success',
    date: '11 Mar 2026, 09:05 AM',
    referenceId: 'pay_Pq109284102',
  },
];

export const INITIAL_ADMIN_SUPPORT_TICKETS: AdminSupportTicketItem[] = [
  {
    id: 'TICK-401',
    userName: 'Rajesh Sharma',
    userRole: 'Agent',
    subject: 'Commission settlement discrepancy for March batch',
    priority: 'High',
    status: 'Open',
    lastUpdated: '10 mins ago',
  },
  {
    id: 'TICK-402',
    userName: 'Ananya Verma',
    userRole: 'Customer',
    subject: 'Assistance required with DSC submission step',
    priority: 'Medium',
    status: 'In Progress',
    lastUpdated: '1 hour ago',
  },
  {
    id: 'TICK-403',
    userName: 'CA Vivek Agrawal',
    userRole: 'CA',
    subject: 'Clarification regarding revised MCA filing format',
    priority: 'Low',
    status: 'Resolved',
    lastUpdated: 'Yesterday',
  },
];

export const INITIAL_ADMIN_SETTINGS: AdminPlatformSettings = {
  platformName: 'Finservkart Enterprise Platform',
  supportEmail: 'care@finservkart.com',
  supportPhone: '+91 94150 12345',
  maintenanceMode: false,
  autoAssignCA: true,
  taxDeductionPercent: 2.0,
  minPayoutThreshold: 1000,
  paymentGatewayKey: 'rzp_live_••••••••••••••••',
};
