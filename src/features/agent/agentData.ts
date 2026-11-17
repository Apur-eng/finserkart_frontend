export interface AgentProfile {
  id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  referralCode: string;
  franchiseCode: string;
  franchiseName: string;
  bank: string;
  branch: string;
  ACNo: string;
  IFSE: string;
  pan: string;
  aadhaar: string;
  city: string;
  state: string;
  joinedDate: string;
  totalCommissionEarned: number;
  pendingCommission: number;
  totalPaidPayouts: number;
  totalCustomers: number;
  totalApplications: number;
}

export interface AgentCustomer {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  city: string;
  onboardedDate: string;
  activeOrdersCount: number;
  totalSpent: number;
  kycStatus: 'Verified' | 'Pending' | 'Action Required';
}

export interface AgentApplication {
  id: string;
  serviceName: string;
  customerName: string;
  businessName: string;
  customerId: string;
  amount: number;
  agentCommission: number;
  commissionStatus: 'Approved' | 'Pending' | 'Disbursed';
  status: 'Processing' | 'Assigned' | 'Completed' | 'Pending';
  date: string;
  caName?: string;
  currentStage: number;
}

export interface AgentCommissionRecord {
  id: string;
  applicationId: string;
  serviceName: string;
  customerName: string;
  orderAmount: number;
  commissionRate: string;
  commissionAmount: number;
  status: 'Approved' | 'Pending' | 'Disbursed';
  date: string;
}

export interface AgentPayoutRecord {
  id: string;
  amount: number;
  requestDate: string;
  disbursedDate?: string;
  status: 'Processed' | 'Processing' | 'Pending Review';
  bankRef: string;
  accountNo: string;
}

export interface AgentNotification {
  id: string;
  title: string;
  description: string;
  type: 'commission' | 'customer' | 'payout' | 'system';
  timestamp: string;
  isRead: boolean;
  linkUrl: string;
}

export const INITIAL_AGENT_PROFILE: AgentProfile = {
  id: 'AG-102',
  fname: 'Rajesh',
  lname: 'Sharma',
  email: 'rajesh.sharma@finservkart-partner.in',
  phone: '+91 9415012399',
  referralCode: 'FK-AG-102',
  franchiseCode: 'FRAN-LKO-01',
  franchiseName: 'Lucknow Central Business Franchise (Gomti Nagar)',
  bank: 'State Bank of India',
  branch: 'Hazratganj Main Branch',
  ACNo: '30918239012',
  IFSE: 'SBIN0000125',
  pan: 'ABCPS1234K',
  aadhaar: 'XXXX-XXXX-8921',
  city: 'Lucknow',
  state: 'Uttar Pradesh',
  joinedDate: 'January 2026',
  totalCommissionEarned: 18450,
  pendingCommission: 4200,
  totalPaidPayouts: 14250,
  totalCustomers: 14,
  totalApplications: 19,
};

export const INITIAL_AGENT_CUSTOMERS: AgentCustomer[] = [
  {
    id: 'CUST-2026-081',
    name: 'Ananya Verma',
    businessName: 'Verma Tech Solutions LLP',
    email: 'ananya.verma@example.com',
    phone: '+91 9876543210',
    city: 'Lucknow',
    onboardedDate: '12 Mar 2026',
    activeOrdersCount: 2,
    totalSpent: 10498,
    kycStatus: 'Verified',
  },
  {
    id: 'CUST-2026-074',
    name: 'Vikramaditya Roy',
    businessName: 'Awadh Agro Processors Pvt Ltd',
    email: 'vikram.roy@awadhagro.in',
    phone: '+91 9123456780',
    city: 'Lucknow',
    onboardedDate: '28 Feb 2026',
    activeOrdersCount: 1,
    totalSpent: 8999,
    kycStatus: 'Verified',
  },
  {
    id: 'CUST-2026-068',
    name: 'Sneha Pandey',
    businessName: 'Pandey Medical Retail Store',
    email: 'sneha.pandey@gmail.com',
    phone: '+91 9450012345',
    city: 'Kanpur',
    onboardedDate: '15 Feb 2026',
    activeOrdersCount: 0,
    totalSpent: 2999,
    kycStatus: 'Verified',
  },
  {
    id: 'CUST-2026-059',
    name: 'Mohd. Tariq',
    businessName: 'Tariq Leather Exports',
    email: 'tariq.exports@yahoo.com',
    phone: '+91 9839012345',
    city: 'Unnao',
    onboardedDate: '02 Feb 2026',
    activeOrdersCount: 1,
    totalSpent: 1499,
    kycStatus: 'Pending',
  },
  {
    id: 'CUST-2026-042',
    name: 'Pooja Tiwari',
    businessName: 'Shubham IT Innovations',
    email: 'pooja.tiwari@shubhamit.com',
    phone: '+91 9918001122',
    city: 'Lucknow',
    onboardedDate: '19 Jan 2026',
    activeOrdersCount: 1,
    totalSpent: 4999,
    kycStatus: 'Verified',
  },
];

export const INITIAL_AGENT_APPLICATIONS: AgentApplication[] = [
  {
    id: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    customerName: 'Ananya Verma',
    businessName: 'Verma Tech Solutions LLP',
    customerId: 'CUST-2026-081',
    amount: 1499,
    agentCommission: 300,
    commissionStatus: 'Approved',
    status: 'Processing',
    date: '18 Oct 2026',
    caName: 'CA Vivek Agrawal',
    currentStage: 3,
  },
  {
    id: 'FK-SRV-8820',
    serviceName: 'Private Limited Company Registration',
    customerName: 'Ananya Verma',
    businessName: 'Verma Tech Solutions LLP',
    customerId: 'CUST-2026-081',
    amount: 8999,
    agentCommission: 1800,
    commissionStatus: 'Approved',
    status: 'Assigned',
    date: '15 Oct 2026',
    caName: 'CA Priya Srivastava',
    currentStage: 2,
  },
  {
    id: 'FK-SRV-8750',
    serviceName: 'FSSAI Food License Registration',
    customerName: 'Vikramaditya Roy',
    businessName: 'Awadh Agro Processors Pvt Ltd',
    customerId: 'CUST-2026-074',
    amount: 2999,
    agentCommission: 600,
    commissionStatus: 'Pending',
    status: 'Processing',
    date: '12 Oct 2026',
    caName: 'CA Vivek Agrawal',
    currentStage: 2,
  },
  {
    id: 'FK-SRV-8610',
    serviceName: 'MSME / Udyam Registration',
    customerName: 'Mohd. Tariq',
    businessName: 'Tariq Leather Exports',
    customerId: 'CUST-2026-059',
    amount: 1499,
    agentCommission: 300,
    commissionStatus: 'Disbursed',
    status: 'Completed',
    date: '02 Oct 2026',
    caName: 'CA Priya Srivastava',
    currentStage: 5,
  },
  {
    id: 'FK-SRV-8490',
    serviceName: 'Trademark Application Filing',
    customerName: 'Pooja Tiwari',
    businessName: 'Shubham IT Innovations',
    customerId: 'CUST-2026-042',
    amount: 4999,
    agentCommission: 1200,
    commissionStatus: 'Disbursed',
    status: 'Completed',
    date: '25 Sep 2026',
    caName: 'CA Vivek Agrawal',
    currentStage: 5,
  },
];

export const INITIAL_AGENT_COMMISSIONS: AgentCommissionRecord[] = [
  {
    id: 'COMM-2026-9041',
    applicationId: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    customerName: 'Ananya Verma',
    orderAmount: 1499,
    commissionRate: '20%',
    commissionAmount: 300,
    status: 'Approved',
    date: '18 Oct 2026',
  },
  {
    id: 'COMM-2026-8820',
    applicationId: 'FK-SRV-8820',
    serviceName: 'Private Limited Company Registration',
    customerName: 'Ananya Verma',
    orderAmount: 8999,
    commissionRate: '20%',
    commissionAmount: 1800,
    status: 'Approved',
    date: '15 Oct 2026',
  },
  {
    id: 'COMM-2026-8750',
    applicationId: 'FK-SRV-8750',
    serviceName: 'FSSAI Food License Registration',
    customerName: 'Vikramaditya Roy',
    orderAmount: 2999,
    commissionRate: '20%',
    commissionAmount: 600,
    status: 'Pending',
    date: '12 Oct 2026',
  },
  {
    id: 'COMM-2026-8610',
    applicationId: 'FK-SRV-8610',
    serviceName: 'MSME / Udyam Registration',
    customerName: 'Mohd. Tariq',
    orderAmount: 1499,
    commissionRate: '20%',
    commissionAmount: 300,
    status: 'Disbursed',
    date: '02 Oct 2026',
  },
  {
    id: 'COMM-2026-8490',
    applicationId: 'FK-SRV-8490',
    serviceName: 'Trademark Application Filing',
    customerName: 'Pooja Tiwari',
    orderAmount: 4999,
    commissionRate: '24%',
    commissionAmount: 1200,
    status: 'Disbursed',
    date: '25 Sep 2026',
  },
];

export const INITIAL_AGENT_PAYOUTS: AgentPayoutRecord[] = [
  {
    id: 'PAY-2026-090',
    amount: 5500,
    requestDate: '01 Oct 2026',
    disbursedDate: '03 Oct 2026',
    status: 'Processed',
    bankRef: 'UTR-SBI-9018237',
    accountNo: '...30918239012 (SBI)',
  },
  {
    id: 'PAY-2026-072',
    amount: 8750,
    requestDate: '01 Sep 2026',
    disbursedDate: '03 Sep 2026',
    status: 'Processed',
    bankRef: 'UTR-SBI-8127391',
    accountNo: '...30918239012 (SBI)',
  },
  {
    id: 'PAY-2026-104',
    amount: 4200,
    requestDate: '15 Oct 2026',
    status: 'Processing',
    bankRef: 'Pending Clearing',
    accountNo: '...30918239012 (SBI)',
  },
];

export const INITIAL_AGENT_NOTIFICATIONS: AgentNotification[] = [
  {
    id: 'NOTIF-AG-01',
    title: 'Commission Approved: ₹1,800',
    description: 'Commission for Private Limited Registration (FK-SRV-8820) approved by Lucknow Accounts Coordinator.',
    type: 'commission',
    timestamp: 'Yesterday at 04:15 PM',
    isRead: false,
    linkUrl: '/agent/commissions',
  },
  {
    id: 'NOTIF-AG-02',
    title: 'New Customer KYC Verified',
    description: 'Client Ananya Verma (Verma Tech Solutions) has completed Aadhaar e-KYC validation.',
    type: 'customer',
    timestamp: '18 Oct 2026, 02:30 PM',
    isRead: false,
    linkUrl: '/agent/customers',
  },
  {
    id: 'NOTIF-AG-03',
    title: 'Payout Request Disbursed: ₹5,500',
    description: 'Disbursement of ₹5,500 credited to SBI A/C ...9012 with UTR-SBI-9018237.',
    type: 'payout',
    timestamp: '03 Oct 2026, 11:20 AM',
    isRead: true,
    linkUrl: '/agent/payouts',
  },
  {
    id: 'NOTIF-AG-04',
    title: 'Quarterly Incentive Scheme Announced',
    description: 'Earn 25% extra commission on all Pvt Ltd & Trademark applications filed before month end.',
    type: 'system',
    timestamp: '01 Oct 2026, 09:00 AM',
    isRead: true,
    linkUrl: '/agent/dashboard',
  },
];
