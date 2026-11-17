export interface FranchiseProfile {
  id: string;
  name: string;
  directorName: string;
  email: string;
  phone: string;
  referralCode: string;
  territory: string;
  city: string;
  state: string;
  officeAddress: string;
  bank: string;
  branch: string;
  ACNo: string;
  IFSE: string;
  gstin: string;
  totalAgents: number;
  totalCustomers: number;
  totalApplications: number;
  grossRevenue: number;
  franchiseCommissionEarned: number;
  pendingPayout: number;
  totalDisbursed: number;
}

export interface FranchiseAgentItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  city: string;
  joinedDate: string;
  customersCount: number;
  applicationsCount: number;
  totalRevenue: number;
  status: 'Active' | 'Inactive';
}

export interface FranchiseCustomerItem {
  id: string;
  name: string;
  businessName: string;
  agentId: string;
  agentName: string;
  email: string;
  phone: string;
  city: string;
  activeOrders: number;
  totalSpent: number;
  onboardedDate: string;
}

export interface FranchiseApplicationItem {
  id: string;
  serviceName: string;
  customerName: string;
  agentName: string;
  agentId: string;
  amount: number;
  franchiseCut: number;
  status: 'Processing' | 'Assigned' | 'Completed' | 'Pending';
  date: string;
  caName: string;
}

export interface FranchiseCommissionItem {
  id: string;
  applicationId: string;
  serviceName: string;
  agentName: string;
  orderTotal: number;
  franchiseRate: string;
  franchiseAmount: number;
  date: string;
  status: 'Approved' | 'Pending' | 'Disbursed';
}

export interface FranchisePayoutItem {
  id: string;
  amount: number;
  requestDate: string;
  disbursedDate?: string;
  status: 'Processed' | 'Processing' | 'Pending Review';
  bankRef: string;
  accountNo: string;
}

export const INITIAL_FRANCHISE_PROFILE: FranchiseProfile = {
  id: 'FRAN-LKO-01',
  name: 'Lucknow Central Business Franchise',
  directorName: 'Amitav Trivedi',
  email: 'amitav.trivedi@finservkart-partner.in',
  phone: '+91 9839019283',
  referralCode: 'FRAN-LKO-01',
  territory: 'Central & Eastern Uttar Pradesh (Lucknow, Kanpur, Barabanki, Unnao)',
  city: 'Lucknow',
  state: 'Uttar Pradesh',
  officeAddress: 'Level 4, Gomti Business Park, Vibhuti Khand, Gomti Nagar, Lucknow 226010',
  bank: 'ICICI Bank',
  branch: 'Vibhuti Khand Branch',
  ACNo: '003405012938',
  IFSE: 'ICIC0000034',
  gstin: '09AAECF1092F1Z8',
  totalAgents: 8,
  totalCustomers: 46,
  totalApplications: 62,
  grossRevenue: 342500,
  franchiseCommissionEarned: 38400,
  pendingPayout: 9200,
  totalDisbursed: 29200,
};

export const INITIAL_FRANCHISE_AGENTS: FranchiseAgentItem[] = [
  {
    id: 'AG-102',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@finservkart-partner.in',
    phone: '+91 9415012399',
    referralCode: 'FK-AG-102',
    city: 'Lucknow (Gomti Nagar)',
    joinedDate: 'Jan 2026',
    customersCount: 14,
    applicationsCount: 19,
    totalRevenue: 98450,
    status: 'Active',
  },
  {
    id: 'AG-105',
    name: 'Sunil Verma',
    email: 'sunil.verma@finservkart-partner.in',
    phone: '+91 9839123456',
    referralCode: 'FK-AG-105',
    city: 'Kanpur (Mall Road)',
    joinedDate: 'Feb 2026',
    customersCount: 12,
    applicationsCount: 16,
    totalRevenue: 82000,
    status: 'Active',
  },
  {
    id: 'AG-109',
    name: 'Deepak Mishra',
    email: 'deepak.mishra@finservkart-partner.in',
    phone: '+91 9450098765',
    referralCode: 'FK-AG-109',
    city: 'Lucknow (Alambagh)',
    joinedDate: 'Feb 2026',
    customersCount: 9,
    applicationsCount: 13,
    totalRevenue: 64500,
    status: 'Active',
  },
  {
    id: 'AG-114',
    name: 'Neeraj Saxena',
    email: 'neeraj.saxena@finservkart-partner.in',
    phone: '+91 9120011223',
    referralCode: 'FK-AG-114',
    city: 'Unnao (Industrial Area)',
    joinedDate: 'Mar 2026',
    customersCount: 6,
    applicationsCount: 8,
    totalRevenue: 48000,
    status: 'Active',
  },
  {
    id: 'AG-120',
    name: 'Kavita Rastogi',
    email: 'kavita.rastogi@finservkart-partner.in',
    phone: '+91 9918003344',
    referralCode: 'FK-AG-120',
    city: 'Barabanki',
    joinedDate: 'Mar 2026',
    customersCount: 5,
    applicationsCount: 6,
    totalRevenue: 49550,
    status: 'Active',
  },
];

export const INITIAL_FRANCHISE_CUSTOMERS: FranchiseCustomerItem[] = [
  {
    id: 'CUST-2026-081',
    name: 'Ananya Verma',
    businessName: 'Verma Tech Solutions LLP',
    agentId: 'AG-102',
    agentName: 'Rajesh Sharma',
    email: 'ananya.verma@example.com',
    phone: '+91 9876543210',
    city: 'Lucknow',
    activeOrders: 2,
    totalSpent: 10498,
    onboardedDate: '12 Mar 2026',
  },
  {
    id: 'CUST-2026-074',
    name: 'Vikramaditya Roy',
    businessName: 'Awadh Agro Processors Pvt Ltd',
    agentId: 'AG-102',
    agentName: 'Rajesh Sharma',
    email: 'vikram.roy@awadhagro.in',
    phone: '+91 9123456780',
    city: 'Lucknow',
    activeOrders: 1,
    totalSpent: 8999,
    onboardedDate: '28 Feb 2026',
  },
  {
    id: 'CUST-2026-092',
    name: 'Alok Singhal',
    businessName: 'Singhal Textiles & Handlooms',
    agentId: 'AG-105',
    agentName: 'Sunil Verma',
    email: 'alok.singhal@gmail.com',
    phone: '+91 9415087654',
    city: 'Kanpur',
    activeOrders: 1,
    totalSpent: 1499,
    onboardedDate: '18 Mar 2026',
  },
  {
    id: 'CUST-2026-088',
    name: 'Mohit Agarwal',
    businessName: 'Gomti Realtech Infra LLP',
    agentId: 'AG-109',
    agentName: 'Deepak Mishra',
    email: 'mohit@gomtirealtech.in',
    phone: '+91 9919012345',
    city: 'Lucknow',
    activeOrders: 1,
    totalSpent: 8999,
    onboardedDate: '10 Mar 2026',
  },
];

export const INITIAL_FRANCHISE_APPLICATIONS: FranchiseApplicationItem[] = [
  {
    id: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    customerName: 'Ananya Verma',
    agentName: 'Rajesh Sharma',
    agentId: 'AG-102',
    amount: 1499,
    franchiseCut: 150,
    status: 'Processing',
    date: '18 Oct 2026',
    caName: 'CA Vivek Agrawal',
  },
  {
    id: 'FK-SRV-8820',
    serviceName: 'Private Limited Company Registration',
    customerName: 'Ananya Verma',
    agentName: 'Rajesh Sharma',
    agentId: 'AG-102',
    amount: 8999,
    franchiseCut: 900,
    status: 'Assigned',
    date: '15 Oct 2026',
    caName: 'CA Priya Srivastava',
  },
  {
    id: 'FK-SRV-8750',
    serviceName: 'FSSAI Food License Registration',
    customerName: 'Vikramaditya Roy',
    agentName: 'Rajesh Sharma',
    agentId: 'AG-102',
    amount: 2999,
    franchiseCut: 300,
    status: 'Processing',
    date: '12 Oct 2026',
    caName: 'CA Vivek Agrawal',
  },
  {
    id: 'FK-SRV-8910',
    serviceName: 'MSME / Udyam Registration',
    customerName: 'Alok Singhal',
    agentName: 'Sunil Verma',
    agentId: 'AG-105',
    amount: 1499,
    franchiseCut: 150,
    status: 'Completed',
    date: '10 Oct 2026',
    caName: 'CA Priya Srivastava',
  },
];

export const INITIAL_FRANCHISE_COMMISSIONS: FranchiseCommissionItem[] = [
  {
    id: 'FRAN-COMM-101',
    applicationId: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    agentName: 'Rajesh Sharma (AG-102)',
    orderTotal: 1499,
    franchiseRate: '10%',
    franchiseAmount: 150,
    date: '18 Oct 2026',
    status: 'Approved',
  },
  {
    id: 'FRAN-COMM-102',
    applicationId: 'FK-SRV-8820',
    serviceName: 'Private Limited Company Registration',
    agentName: 'Rajesh Sharma (AG-102)',
    orderTotal: 8999,
    franchiseRate: '10%',
    franchiseAmount: 900,
    date: '15 Oct 2026',
    status: 'Approved',
  },
  {
    id: 'FRAN-COMM-103',
    applicationId: 'FK-SRV-8750',
    serviceName: 'FSSAI Food License Registration',
    agentName: 'Rajesh Sharma (AG-102)',
    orderTotal: 2999,
    franchiseRate: '10%',
    franchiseAmount: 300,
    date: '12 Oct 2026',
    status: 'Pending',
  },
  {
    id: 'FRAN-COMM-104',
    applicationId: 'FK-SRV-8910',
    serviceName: 'MSME / Udyam Registration',
    agentName: 'Sunil Verma (AG-105)',
    orderTotal: 1499,
    franchiseRate: '10%',
    franchiseAmount: 150,
    date: '10 Oct 2026',
    status: 'Disbursed',
  },
];

export const INITIAL_FRANCHISE_PAYOUTS: FranchisePayoutItem[] = [
  {
    id: 'FRAN-PAY-041',
    amount: 12500,
    requestDate: '01 Oct 2026',
    disbursedDate: '03 Oct 2026',
    status: 'Processed',
    bankRef: 'UTR-ICICI-8192837',
    accountNo: '...003405012938 (ICICI)',
  },
  {
    id: 'FRAN-PAY-038',
    amount: 16700,
    requestDate: '01 Sep 2026',
    disbursedDate: '03 Sep 2026',
    status: 'Processed',
    bankRef: 'UTR-ICICI-7192831',
    accountNo: '...003405012938 (ICICI)',
  },
  {
    id: 'FRAN-PAY-045',
    amount: 9200,
    requestDate: '15 Oct 2026',
    status: 'Processing',
    bankRef: 'Pending Clearing',
    accountNo: '...003405012938 (ICICI)',
  },
];
