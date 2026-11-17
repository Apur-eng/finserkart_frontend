export interface CoordinatorProfile {
  id: string;
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  totalCasManaged: number;
  unassignedQueueCount: number;
  inReviewDocsCount: number;
  todayTransactionsTotal: number;
  activeApplicationsCount: number;
}

export interface CoordinatorApplication {
  id: string;
  serviceName: string;
  category: string;
  customerName: string;
  businessName: string;
  amount: number;
  assignedCAId?: string;
  assignedCAName?: string;
  assignmentStatus: 'Assigned' | 'Unassigned';
  status: 'Processing' | 'Assigned' | 'Completed' | 'Pending Allocation';
  submittedDate: string;
  slaDeadline: string;
  docVerificationStatus: 'Verified' | 'Pending Review' | 'Defect Flagged';
}

export interface CoordinatorCAItem {
  id: string;
  name: string;
  membershipNo: string;
  specialization: string;
  activeCaseload: number;
  capacityLimit: number;
  rating: number;
  availability: 'Available' | 'Near Capacity' | 'Full' | 'On Leave';
  city: string;
}

export interface CoordinatorDocumentMonitorItem {
  id: string;
  applicationId: string;
  serviceName: string;
  customerName: string;
  docName: string;
  docType: string;
  uploadedAt: string;
  verificationStatus: 'Pending Review' | 'Verified' | 'Defect Flagged';
  assignedCA: string;
}

export interface CoordinatorTransaction {
  id: string;
  applicationId: string;
  customerName: string;
  amount: number;
  paymentGateway: string;
  gatewayRef: string;
  status: 'Success' | 'Processing' | 'Failed';
  timestamp: string;
}

export interface CoordinatorNotification {
  id: string;
  title: string;
  description: string;
  type: 'unassigned' | 'sla' | 'document' | 'payment';
  timestamp: string;
  isRead: boolean;
  linkUrl: string;
}

export const INITIAL_COORDINATOR_PROFILE: CoordinatorProfile = {
  id: 'COORD-01',
  name: 'Saurabh Kapoor',
  role: 'Chief Operations Coordinator',
  location: 'Lucknow Central Operations Command',
  email: 'saurabh.kapoor@finservkart.com',
  phone: '+91 9415088291',
  totalCasManaged: 12,
  unassignedQueueCount: 3,
  inReviewDocsCount: 7,
  todayTransactionsTotal: 48200,
  activeApplicationsCount: 34,
};

export const INITIAL_COORDINATOR_CAS: CoordinatorCAItem[] = [
  {
    id: 'CA-LKO-04',
    name: 'CA Vivek Agrawal',
    membershipNo: 'ICAI-409182',
    specialization: 'GST Registration & Audit',
    activeCaseload: 4,
    capacityLimit: 8,
    rating: 4.9,
    availability: 'Available',
    city: 'Lucknow (Gomti Nagar)',
  },
  {
    id: 'CA-LKO-02',
    name: 'CA Priya Srivastava',
    membershipNo: 'ICAI-512098',
    specialization: 'Company Incorporation & MCA',
    activeCaseload: 6,
    capacityLimit: 8,
    rating: 4.95,
    availability: 'Near Capacity',
    city: 'Lucknow (Hazratganj)',
  },
  {
    id: 'CA-KNP-01',
    name: 'CA Alok Ranjan',
    membershipNo: 'ICAI-398210',
    specialization: 'Tax Audit & Litigation',
    activeCaseload: 3,
    capacityLimit: 6,
    rating: 4.85,
    availability: 'Available',
    city: 'Kanpur',
  },
  {
    id: 'CA-LKO-07',
    name: 'CA Shalini Verma',
    membershipNo: 'ICAI-602918',
    specialization: 'Trademark & IP Registrations',
    activeCaseload: 2,
    capacityLimit: 6,
    rating: 4.8,
    availability: 'Available',
    city: 'Lucknow (Alambagh)',
  },
];

export const INITIAL_COORDINATOR_APPLICATIONS: CoordinatorApplication[] = [
  {
    id: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    category: 'Taxation',
    customerName: 'Ananya Verma',
    businessName: 'Verma Tech Solutions LLP',
    amount: 1499,
    assignedCAId: 'CA-LKO-04',
    assignedCAName: 'CA Vivek Agrawal',
    assignmentStatus: 'Assigned',
    status: 'Processing',
    submittedDate: '18 Oct 2026',
    slaDeadline: '24 Oct 2026',
    docVerificationStatus: 'Verified',
  },
  {
    id: 'FK-SRV-8820',
    serviceName: 'Private Limited Company Registration',
    category: 'Company Registration',
    customerName: 'Ananya Verma',
    businessName: 'Verma Tech Solutions LLP',
    amount: 8999,
    assignedCAId: 'CA-LKO-02',
    assignedCAName: 'CA Priya Srivastava',
    assignmentStatus: 'Assigned',
    status: 'Assigned',
    submittedDate: '15 Oct 2026',
    slaDeadline: '28 Oct 2026',
    docVerificationStatus: 'Verified',
  },
  {
    id: 'FK-SRV-9230',
    serviceName: 'Partnership Deed Drafting & Registration',
    category: 'Company Registration',
    customerName: 'Mohit Agarwal',
    businessName: 'Gomti Realtech Infra LLP',
    amount: 3499,
    assignmentStatus: 'Unassigned',
    status: 'Pending Allocation',
    submittedDate: 'Today, 09:30 AM',
    slaDeadline: '25 Oct 2026',
    docVerificationStatus: 'Pending Review',
  },
  {
    id: 'FK-SRV-9240',
    serviceName: 'FSSAI State License Renewal',
    category: 'Licensing',
    customerName: 'Alok Singhal',
    businessName: 'Singhal Textiles & Confectionery',
    amount: 2999,
    assignmentStatus: 'Unassigned',
    status: 'Pending Allocation',
    submittedDate: 'Today, 11:15 AM',
    slaDeadline: '26 Oct 2026',
    docVerificationStatus: 'Pending Review',
  },
];

export const INITIAL_COORDINATOR_DOC_MONITORS: CoordinatorDocumentMonitorItem[] = [
  {
    id: 'MON-101',
    applicationId: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    customerName: 'Ananya Verma',
    docName: 'Premises_Electricity_Bill.pdf',
    docType: 'Address Proof',
    uploadedAt: '19 Oct 2026, 03:20 PM',
    verificationStatus: 'Verified',
    assignedCA: 'CA Vivek Agrawal',
  },
  {
    id: 'MON-102',
    applicationId: 'FK-SRV-9230',
    serviceName: 'Partnership Deed Drafting',
    customerName: 'Mohit Agarwal',
    docName: 'Partner_PAN_Card_Pack.pdf',
    docType: 'KYC PAN',
    uploadedAt: 'Today, 09:40 AM',
    verificationStatus: 'Pending Review',
    assignedCA: 'Unassigned Desk',
  },
  {
    id: 'MON-103',
    applicationId: 'FK-SRV-9240',
    serviceName: 'FSSAI State License',
    customerName: 'Alok Singhal',
    docName: 'Kitchen_Plan_Sanitation_NOC.pdf',
    docType: 'Technical NOC',
    uploadedAt: 'Today, 11:30 AM',
    verificationStatus: 'Pending Review',
    assignedCA: 'Unassigned Desk',
  },
];

export const INITIAL_COORDINATOR_TRANSACTIONS: CoordinatorTransaction[] = [
  {
    id: 'TXN-2026-9041',
    applicationId: 'FK-SRV-9041',
    customerName: 'Ananya Verma',
    amount: 1499,
    paymentGateway: 'Razorpay UPI',
    gatewayRef: 'pay_Nz91823712',
    status: 'Success',
    timestamp: '18 Oct 2026, 11:30 AM',
  },
  {
    id: 'TXN-2026-8820',
    applicationId: 'FK-SRV-8820',
    customerName: 'Ananya Verma',
    amount: 8999,
    paymentGateway: 'Net Banking (HDFC)',
    gatewayRef: 'pay_Nz81729381',
    status: 'Success',
    timestamp: '15 Oct 2026, 02:15 PM',
  },
  {
    id: 'TXN-2026-9230',
    applicationId: 'FK-SRV-9230',
    customerName: 'Mohit Agarwal',
    amount: 3499,
    paymentGateway: 'Razorpay Cards',
    gatewayRef: 'pay_Nz09182931',
    status: 'Success',
    timestamp: 'Today, 09:32 AM',
  },
];

export const INITIAL_COORDINATOR_NOTIFICATIONS: CoordinatorNotification[] = [
  {
    id: 'NOTIF-CO-01',
    title: '2 Applications Awaiting CA Allocation',
    description: 'New applications FK-SRV-9230 and FK-SRV-9240 received today and require CA desk allocation.',
    type: 'unassigned',
    timestamp: '1 hour ago',
    isRead: false,
    linkUrl: '/coordinator/assignments',
  },
  {
    id: 'NOTIF-CO-02',
    title: 'SLA Milestone Alert: FK-SRV-9041',
    description: 'GST application FK-SRV-9041 is approaching target completion date (24 Oct). Stage 3 in progress.',
    type: 'sla',
    timestamp: '3 hours ago',
    isRead: false,
    linkUrl: '/coordinator/applications',
  },
];
