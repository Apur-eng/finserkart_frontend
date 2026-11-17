/**
 * Mock Data & Data Models for Module 02: Customer Portal
 *
 * Aligned with the verified database schemas (customer, srv_tranaction, workflow, CA)
 * and the Master Frontend Page Inventory prepared by Averra Labs.
 */

export interface CustomerProfile {
  CustID: string;
  fname: string;
  lname: string;
  email: string;
  contact: string;
  businessName: string;
  pan: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  bank: string;
  branch: string;
  ACNo: string;
  IFSE: string;
  agentId: string;
  agentName: string;
  referralCode: string;
  memberSince: string;
}

export type ApplicationWorkflowStatus =
  | 'Pending'
  | 'Assigned'
  | 'Processing'
  | 'Completed'
  | 'Action Required';

export interface AssignedCA {
  id: string;
  name: string;
  membershipNo: string;
  phone: string;
  email: string;
  rating: number;
}

export interface ApplicationMilestone {
  stage: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  timestamp?: string;
  remarks?: string;
}

export interface CustomerApplication {
  id: string; // pid
  serviceName: string;
  category: 'Taxation' | 'Company Registration' | 'Compliance' | 'Licensing' | 'Auditing';
  amount: number;
  govtFees: number;
  totalAmount: number;
  paymentStatus: 'Paid' | 'Unpaid' | 'Refunded';
  status: ApplicationWorkflowStatus;
  submissionDate: string;
  estimatedCompletion: string;
  assignedCA?: AssignedCA;
  currentStage: number; // 1 to 5
  milestones: ApplicationMilestone[];
  documentsCount: number;
  invoiceId: string;
  notes?: string;
}

export interface CustomerDocument {
  id: string;
  applicationId: string;
  serviceName: string;
  fileName: string;
  fileType: 'PAN' | 'Aadhaar' | 'Bank Statement' | 'Deed' | 'Certificate' | 'Invoice' | 'Other';
  fileSize: string;
  uploadDate: string;
  status: 'Verified' | 'Under Review' | 'Rejected' | 'Deliverable';
  downloadUrl: string;
}

export interface ChatMessage {
  id: string;
  applicationId: string;
  sender: 'customer' | 'ca';
  senderName: string;
  timestamp: string;
  message: string;
  attachmentName?: string;
}

export interface CustomerPaymentRecord {
  id: string; // pID
  invoiceNumber: string;
  serviceName: string;
  amount: number;
  govtFees: number;
  taxAmount: number;
  totalPaid: number;
  paymentMethod: 'UPI' | 'NetBanking' | 'Credit Card' | 'Debit Card';
  transactionId: string;
  paymentDate: string;
  status: 'Paid' | 'Pending' | 'Failed';
}

export interface CustomerNotification {
  id: string;
  title: string;
  description: string;
  type: 'milestone' | 'document' | 'message' | 'payment' | 'security';
  timestamp: string;
  isRead: boolean;
  linkUrl: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'Filing Query' | 'Document Request' | 'Billing & Refund' | 'Technical';
  applicationId?: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  lastReply: string;
}

// Default verified customer profile
export const INITIAL_CUSTOMER_PROFILE: CustomerProfile = {
  CustID: 'CUST-2026-081',
  fname: 'Ananya',
  lname: 'Verma',
  email: 'ananya.verma@example.com',
  contact: '+91 9876543210',
  businessName: 'Verma Tech Solutions LLP',
  pan: 'ABCDE1234F',
  gstin: '09ABCDE1234F1Z5',
  address: 'Plot 42, Sector 8, Gomti Nagar Extension',
  city: 'Lucknow',
  state: 'Uttar Pradesh',
  pincode: '226010',
  bank: 'HDFC Bank',
  branch: 'Hazratganj Flagship Branch',
  ACNo: '50200012345678',
  IFSE: 'HDFC0000123',
  agentId: 'AG-102',
  agentName: 'Rajesh Sharma',
  referralCode: 'FK-AG-102',
  memberSince: 'March 2026',
};

// Verified applications
export const INITIAL_APPLICATIONS: CustomerApplication[] = [
  {
    id: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    category: 'Taxation',
    amount: 1499,
    govtFees: 0,
    totalAmount: 1499,
    paymentStatus: 'Paid',
    status: 'Processing',
    submissionDate: '18 Oct 2026',
    estimatedCompletion: '25 Oct 2026',
    currentStage: 3,
    documentsCount: 4,
    invoiceId: 'INV-2026-9041',
    assignedCA: {
      id: 'CA-LKO-04',
      name: 'CA Vivek Agrawal',
      membershipNo: 'ICAI-409182',
      phone: '+91 9415012345',
      email: 'vivek.ca@finservkart.com',
      rating: 4.9,
    },
    milestones: [
      {
        stage: 1,
        title: 'Application Received & Advance Verified',
        description: 'Order placed, KYC details captured and payment verified.',
        status: 'completed',
        timestamp: '18 Oct 2026, 11:30 AM',
      },
      {
        stage: 2,
        title: 'Document Inspection by Operations',
        description: 'PAN, Aadhaar, electricity bill and NOC validated by verification desk.',
        status: 'completed',
        timestamp: '19 Oct 2026, 03:15 PM',
      },
      {
        stage: 3,
        title: 'CA Assigned & Application Drafting',
        description: 'Assigned to CA Vivek Agrawal. Filing draft prepared for GST portal.',
        status: 'in_progress',
        timestamp: '20 Oct 2026, 10:00 AM',
        remarks: 'Draft ARN generated. Pending client Aadhaar e-sign OTP.',
      },
      {
        stage: 4,
        title: 'GST Portal Lodgement & ARN Acknowledgement',
        description: 'Submission to Goods & Services Tax Network (GSTN).',
        status: 'pending',
      },
      {
        stage: 5,
        title: 'GSTIN Certificate Issuance & Handover',
        description: 'Official Registration Certificate Form GST REG-06 downloadable.',
        status: 'pending',
      },
    ],
  },
  {
    id: 'FK-SRV-8820',
    serviceName: 'Private Limited Company Registration',
    category: 'Company Registration',
    amount: 6999,
    govtFees: 2000,
    totalAmount: 8999,
    paymentStatus: 'Paid',
    status: 'Assigned',
    submissionDate: '15 Oct 2026',
    estimatedCompletion: '28 Oct 2026',
    currentStage: 2,
    documentsCount: 5,
    invoiceId: 'INV-2026-8820',
    assignedCA: {
      id: 'CA-LKO-02',
      name: 'CA Priya Srivastava',
      membershipNo: 'ICAI-512098',
      phone: '+91 9415098765',
      email: 'priya.ca@finservkart.com',
      rating: 4.95,
    },
    milestones: [
      {
        stage: 1,
        title: 'Name Approval Reservation (RUN)',
        description: 'Proposed company names submitted to Ministry of Corporate Affairs.',
        status: 'completed',
        timestamp: '15 Oct 2026, 02:40 PM',
      },
      {
        stage: 2,
        title: 'DSC & SPICe+ Part B Preparation',
        description: 'Class 3 Digital Signatures and MOA/AOA documentation drafting.',
        status: 'in_progress',
        timestamp: '16 Oct 2026, 11:20 AM',
      },
      {
        stage: 3,
        title: 'MCA ROC Portal Lodgement',
        description: 'ROC fee disbursement and SPICe+ submission.',
        status: 'pending',
      },
      {
        stage: 4,
        title: 'Resubmission / Query Resolution',
        description: 'Addressing any ROC examiner queries.',
        status: 'pending',
      },
      {
        stage: 5,
        title: 'Certificate of Incorporation & PAN/TAN Handover',
        description: 'COI dispatch with corporate master dossier.',
        status: 'pending',
      },
    ],
  },
  {
    id: 'FK-SRV-7612',
    serviceName: 'ITR-4 Business Tax Return',
    category: 'Taxation',
    amount: 1499,
    govtFees: 0,
    totalAmount: 1499,
    paymentStatus: 'Paid',
    status: 'Completed',
    submissionDate: '12 Jul 2026',
    estimatedCompletion: '15 Jul 2026',
    currentStage: 5,
    documentsCount: 3,
    invoiceId: 'INV-2026-7612',
    assignedCA: {
      id: 'CA-LKO-04',
      name: 'CA Vivek Agrawal',
      membershipNo: 'ICAI-409182',
      phone: '+91 9415012345',
      email: 'vivek.ca@finservkart.com',
      rating: 4.9,
    },
    milestones: [
      { stage: 1, title: 'Form 16 & 26AS Reconciliation', description: 'Complete', status: 'completed' },
      { stage: 2, title: 'Presumptive Income Calculation', description: 'Complete', status: 'completed' },
      { stage: 3, title: 'ITD Portal Filing Lodgement', description: 'Complete', status: 'completed' },
      { stage: 4, title: 'Aadhaar e-Verification', description: 'Complete', status: 'completed' },
      { stage: 5, title: 'ITR-V Acknowledgement Delivered', description: 'Complete', status: 'completed' },
    ],
  },
  {
    id: 'FK-SRV-6504',
    serviceName: 'MSME Udyam Registration',
    category: 'Licensing',
    amount: 999,
    govtFees: 0,
    totalAmount: 999,
    paymentStatus: 'Paid',
    status: 'Completed',
    submissionDate: '04 May 2026',
    estimatedCompletion: '05 May 2026',
    currentStage: 5,
    documentsCount: 2,
    invoiceId: 'INV-2026-6504',
    milestones: [
      { stage: 1, title: 'Aadhaar OTP Verification', description: 'Complete', status: 'completed' },
      { stage: 2, title: 'Enterprise Details Lodgement', description: 'Complete', status: 'completed' },
      { stage: 3, title: 'Udyam Certificate Generated', description: 'Complete', status: 'completed' },
    ],
  },
  {
    id: 'FK-SRV-9150',
    serviceName: 'Trademark Registration (Class 35)',
    category: 'Licensing',
    amount: 4999,
    govtFees: 4500,
    totalAmount: 9499,
    paymentStatus: 'Paid',
    status: 'Pending',
    submissionDate: '19 Oct 2026',
    estimatedCompletion: '02 Nov 2026',
    currentStage: 1,
    documentsCount: 3,
    invoiceId: 'INV-2026-9150',
    milestones: [
      { stage: 1, title: 'Brand Logo & TM Search', description: 'Initial search in progress', status: 'in_progress' },
      { stage: 2, title: 'Drafting TM-A Form', description: 'Pending search clearance', status: 'pending' },
      { stage: 3, title: 'IP India Portal Filing', description: 'Challan fee clearance', status: 'pending' },
    ],
  },
];

// Verified documents
export const INITIAL_DOCUMENTS: CustomerDocument[] = [
  {
    id: 'DOC-101',
    applicationId: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    fileName: 'PAN_Card_Enterprise.pdf',
    fileType: 'PAN',
    fileSize: '1.2 MB',
    uploadDate: '18 Oct 2026',
    status: 'Verified',
    downloadUrl: '#',
  },
  {
    id: 'DOC-102',
    applicationId: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    fileName: 'Aadhaar_Promoter_Signatory.pdf',
    fileType: 'Aadhaar',
    fileSize: '2.1 MB',
    uploadDate: '18 Oct 2026',
    status: 'Verified',
    downloadUrl: '#',
  },
  {
    id: 'DOC-103',
    applicationId: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    fileName: 'Electricity_Bill_Premises.pdf',
    fileType: 'Other',
    fileSize: '3.4 MB',
    uploadDate: '18 Oct 2026',
    status: 'Verified',
    downloadUrl: '#',
  },
  {
    id: 'DOC-104',
    applicationId: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    fileName: 'Bank_Cancelled_Cheque.jpg',
    fileType: 'Bank Statement',
    fileSize: '1.8 MB',
    uploadDate: '19 Oct 2026',
    status: 'Under Review',
    downloadUrl: '#',
  },
  {
    id: 'DOC-105',
    applicationId: 'FK-SRV-7612',
    serviceName: 'ITR-4 Business Tax Return',
    fileName: 'ITR_V_Acknowledgement_AY2026_27.pdf',
    fileType: 'Certificate',
    fileSize: '420 KB',
    uploadDate: '15 Jul 2026',
    status: 'Deliverable',
    downloadUrl: '#',
  },
  {
    id: 'DOC-106',
    applicationId: 'FK-SRV-6504',
    serviceName: 'MSME Udyam Registration',
    fileName: 'Udyam_Registration_Certificate.pdf',
    fileType: 'Certificate',
    fileSize: '850 KB',
    uploadDate: '05 May 2026',
    status: 'Deliverable',
    downloadUrl: '#',
  },
];

// Conversation thread
export const INITIAL_CONVERSATIONS: ChatMessage[] = [
  {
    id: 'MSG-001',
    applicationId: 'FK-SRV-9041',
    sender: 'ca',
    senderName: 'CA Vivek Agrawal',
    timestamp: '20 Oct 2026, 10:15 AM',
    message: 'Hello Ananya, I have been assigned to your GST Registration file. I have verified your PAN and electricity bill.',
  },
  {
    id: 'MSG-002',
    applicationId: 'FK-SRV-9041',
    sender: 'ca',
    senderName: 'CA Vivek Agrawal',
    timestamp: '20 Oct 2026, 10:18 AM',
    message: 'Could you please confirm if your principal place of business has any additional branch or godown in Uttar Pradesh?',
  },
  {
    id: 'MSG-003',
    applicationId: 'FK-SRV-9041',
    sender: 'customer',
    senderName: 'Ananya Verma',
    timestamp: '20 Oct 2026, 10:45 AM',
    message: 'Hello Vivek Sir, no, there are no additional places of business. The Gomti Nagar office is our sole operating location.',
  },
  {
    id: 'MSG-004',
    applicationId: 'FK-SRV-9041',
    sender: 'ca',
    senderName: 'CA Vivek Agrawal',
    timestamp: '20 Oct 2026, 11:00 AM',
    message: 'Understood. I am generating the Part B application on the GSTN portal right now. You will receive an Aadhaar OTP on your mobile ending with 3210 for verification shortly.',
  },
];

// Payment & Invoice history
export const INITIAL_PAYMENTS: CustomerPaymentRecord[] = [
  {
    id: 'TXN-9041',
    invoiceNumber: 'INV-2026-9041',
    serviceName: 'GST Registration',
    amount: 1499,
    govtFees: 0,
    taxAmount: 270,
    totalPaid: 1499,
    paymentMethod: 'UPI',
    transactionId: 'UPI-RAZ-9812401',
    paymentDate: '18 Oct 2026',
    status: 'Paid',
  },
  {
    id: 'TXN-8820',
    invoiceNumber: 'INV-2026-8820',
    serviceName: 'Private Limited Company Registration',
    amount: 6999,
    govtFees: 2000,
    taxAmount: 1260,
    totalPaid: 8999,
    paymentMethod: 'NetBanking',
    transactionId: 'HDFC-NB-778210',
    paymentDate: '15 Oct 2026',
    status: 'Paid',
  },
  {
    id: 'TXN-7612',
    invoiceNumber: 'INV-2026-7612',
    serviceName: 'ITR-4 Business Tax Return',
    amount: 1499,
    govtFees: 0,
    taxAmount: 270,
    totalPaid: 1499,
    paymentMethod: 'UPI',
    transactionId: 'UPI-RAZ-5501823',
    paymentDate: '12 Jul 2026',
    status: 'Paid',
  },
  {
    id: 'TXN-6504',
    invoiceNumber: 'INV-2026-6504',
    serviceName: 'MSME Udyam Registration',
    amount: 999,
    govtFees: 0,
    taxAmount: 180,
    totalPaid: 999,
    paymentMethod: 'Debit Card',
    transactionId: 'DC-CARD-334912',
    paymentDate: '04 May 2026',
    status: 'Paid',
  },
];

// Notifications
export const INITIAL_NOTIFICATIONS: CustomerNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'CA Vivek Agrawal Assigned to GST Filing',
    description: 'Your GST Registration (FK-SRV-9041) has moved to the Processing stage.',
    type: 'milestone',
    timestamp: '2 hours ago',
    isRead: false,
    linkUrl: '/customer/applications/FK-SRV-9041/tracker',
  },
  {
    id: 'NOTIF-02',
    title: 'New Message from Chartered Accountant',
    description: 'CA Vivek Agrawal sent you an inquiry regarding your place of business.',
    type: 'message',
    timestamp: '4 hours ago',
    isRead: false,
    linkUrl: '/customer/conversations',
  },
  {
    id: 'NOTIF-03',
    title: 'Invoice Generated for Private Limited Incorporation',
    description: 'Tax Invoice INV-2026-8820 is ready for download in your Payments ledger.',
    type: 'payment',
    timestamp: '3 days ago',
    isRead: true,
    linkUrl: '/customer/payments',
  },
  {
    id: 'NOTIF-04',
    title: 'Document Verified: PAN Card',
    description: 'Your enterprise PAN card was verified by the operations desk.',
    type: 'document',
    timestamp: '4 days ago',
    isRead: true,
    linkUrl: '/customer/documents',
  },
];

// Support Tickets
export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'TCK-2026-104',
    subject: 'Query regarding ROC Stamp Duty for Pvt Ltd in UP',
    category: 'Filing Query',
    applicationId: 'FK-SRV-8820',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: '16 Oct 2026',
    lastReply: '17 Oct 2026 (Assigned to Legal Desk)',
  },
  {
    id: 'TCK-2026-089',
    subject: 'Request for GSTR-1 past filing summary copy',
    category: 'Document Request',
    applicationId: 'FK-SRV-7612',
    status: 'Resolved',
    priority: 'Low',
    createdAt: '22 Aug 2026',
    lastReply: '23 Aug 2026 (Document dispatched via email)',
  },
];
