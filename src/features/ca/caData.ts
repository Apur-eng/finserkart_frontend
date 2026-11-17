export interface CAProfile {
  id: string;
  fname: string;
  lname: string;
  title: string;
  membershipNo: string;
  copNo: string;
  specializations: string[];
  email: string;
  phone: string;
  firmName: string;
  officeAddress: string;
  city: string;
  state: string;
  pincode: string;
  bank: string;
  branch: string;
  ACNo: string;
  IFSE: string;
  pan: string;
  activeWorkflowsCount: number;
  completedWorkflowsCount: number;
  pendingReviewDocsCount: number;
  totalCommissionEarned: number;
  pendingCommission: number;
  rating: number;
  verifiedSince: string;
}

export interface CADocumentItem {
  id: string;
  applicationId: string;
  serviceName: string;
  customerName: string;
  fileName: string;
  fileType: string;
  uploadedBy: string;
  uploadedDate: string;
  fileSize: string;
  status: 'Pending Review' | 'Approved' | 'Defective / Rejected';
  reviewNotes?: string;
}

export interface CAWorkflowMilestone {
  stage: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  timestamp?: string;
  remarks?: string;
}

export interface CAApplication {
  id: string;
  serviceName: string;
  customerName: string;
  businessName: string;
  customerId: string;
  assignedDate: string;
  deadline: string;
  status: 'Assigned' | 'Processing' | 'Completed' | 'Action Required';
  currentStage: number;
  totalStages: number;
  caCommission: number;
  priority: 'High' | 'Normal' | 'Urgent';
  notes?: string;
  documents: CADocumentItem[];
  milestones: CAWorkflowMilestone[];
}

export interface CADeliverable {
  id: string;
  applicationId: string;
  serviceName: string;
  customerName: string;
  deliverableName: string;
  fileType: string;
  uploadDate: string;
  fileSize: string;
  status: 'Released to Client' | 'Pending Handover';
  certNumber?: string;
}

export interface CANotification {
  id: string;
  title: string;
  description: string;
  type: 'assignment' | 'document' | 'message' | 'payout';
  timestamp: string;
  isRead: boolean;
  linkUrl: string;
}

export const INITIAL_CA_PROFILE: CAProfile = {
  id: 'CA-LKO-04',
  fname: 'Vivek',
  lname: 'Agrawal',
  title: 'FCA, Senior Regulatory Counsel',
  membershipNo: 'ICAI-409182',
  copNo: 'COP-91823',
  specializations: ['GST Audit & Litigation', 'Corporate Incorporation', 'Direct Tax Appeals', 'FSSAI Licensing'],
  email: 'vivek.ca@finservkart.com',
  phone: '+91 9415012345',
  firmName: 'Agrawal & Associates, Chartered Accountants',
  officeAddress: 'Suite 304, Cyber Heights, Vibhuti Khand, Gomti Nagar',
  city: 'Lucknow',
  state: 'Uttar Pradesh',
  pincode: '226010',
  bank: 'Punjab National Bank',
  branch: 'Gomti Nagar Branch',
  ACNo: '1092837465012',
  IFSE: 'PUNB0109200',
  pan: 'AABFA9018C',
  activeWorkflowsCount: 4,
  completedWorkflowsCount: 38,
  pendingReviewDocsCount: 3,
  totalCommissionEarned: 94500,
  pendingCommission: 14500,
  rating: 4.9,
  verifiedSince: 'August 2025',
};

export const INITIAL_CA_DOCUMENTS: CADocumentItem[] = [
  {
    id: 'CADOC-101',
    applicationId: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    customerName: 'Ananya Verma',
    fileName: 'PAN_Verma_Tech_Solutions.pdf',
    fileType: 'PAN Card',
    uploadedBy: 'Ananya Verma (Client)',
    uploadedDate: '18 Oct 2026',
    fileSize: '1.2 MB',
    status: 'Approved',
    reviewNotes: 'Verified against NSDL PAN master. Clean match.',
  },
  {
    id: 'CADOC-102',
    applicationId: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    customerName: 'Ananya Verma',
    fileName: 'Premises_Electricity_Bill.pdf',
    fileType: 'Address Proof',
    uploadedBy: 'Ananya Verma (Client)',
    uploadedDate: '19 Oct 2026',
    fileSize: '2.4 MB',
    status: 'Pending Review',
    reviewNotes: 'Bill date is within 60 days. Need to verify landlord NOC signature.',
  },
  {
    id: 'CADOC-103',
    applicationId: 'FK-SRV-8750',
    serviceName: 'FSSAI Food License Registration',
    customerName: 'Vikramaditya Roy',
    fileName: 'Premises_NOC_Owner.pdf',
    fileType: 'Premises NOC',
    uploadedBy: 'Vikramaditya Roy (Client)',
    uploadedDate: '14 Oct 2026',
    fileSize: '1.8 MB',
    status: 'Pending Review',
  },
  {
    id: 'CADOC-104',
    applicationId: 'FK-SRV-8750',
    serviceName: 'FSSAI Food License Registration',
    customerName: 'Vikramaditya Roy',
    fileName: 'Food_Safety_Plan_Blueprint.pdf',
    fileType: 'Technical Plan',
    uploadedBy: 'Vikramaditya Roy (Client)',
    uploadedDate: '14 Oct 2026',
    fileSize: '3.6 MB',
    status: 'Approved',
    reviewNotes: 'Blueprint complies with Schedule 4 FSSAI hygiene norms.',
  },
  {
    id: 'CADOC-105',
    applicationId: 'FK-SRV-8820',
    serviceName: 'Private Limited Company Registration',
    customerName: 'Ananya Verma',
    fileName: 'Passport_Photo_Director_1.jpg',
    fileType: 'Director Photo',
    uploadedBy: 'Ananya Verma (Client)',
    uploadedDate: '16 Oct 2026',
    fileSize: '450 KB',
    status: 'Approved',
  },
];

export const INITIAL_CA_APPLICATIONS: CAApplication[] = [
  {
    id: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    customerName: 'Ananya Verma',
    businessName: 'Verma Tech Solutions LLP',
    customerId: 'CUST-2026-081',
    assignedDate: '19 Oct 2026',
    deadline: '24 Oct 2026',
    status: 'Processing',
    currentStage: 3,
    totalStages: 5,
    caCommission: 750,
    priority: 'High',
    notes: 'Draft ARN generated. Pending client Aadhaar e-sign OTP for final lodgement.',
    documents: INITIAL_CA_DOCUMENTS.filter((d) => d.applicationId === 'FK-SRV-9041'),
    milestones: [
      {
        stage: 1,
        title: 'Application Received & Scope Verified',
        description: 'Order placed, service scope and payment verified.',
        status: 'completed',
        timestamp: '18 Oct 2026, 11:30 AM',
      },
      {
        stage: 2,
        title: 'Document Inspection & Verification',
        description: 'PAN, Aadhaar and Premises NOC validated by CA desk.',
        status: 'completed',
        timestamp: '19 Oct 2026, 03:15 PM',
      },
      {
        stage: 3,
        title: 'GST Portal Filing & Form REG-01 Draft',
        description: 'Prepared application draft on Goods & Services Tax Network.',
        status: 'in_progress',
        timestamp: '20 Oct 2026, 10:00 AM',
        remarks: 'Draft ARN generated. Pending client OTP.',
      },
      {
        stage: 4,
        title: 'Portal Lodgement & ARN Acknowledgement',
        description: 'Formal submission to tax department with ARN generation.',
        status: 'pending',
      },
      {
        stage: 5,
        title: 'GSTIN Certificate Issuance & Handover',
        description: 'Download Form GST REG-06 and issue handover dossier.',
        status: 'pending',
      },
    ],
  },
  {
    id: 'FK-SRV-8750',
    serviceName: 'FSSAI Food License Registration',
    customerName: 'Vikramaditya Roy',
    businessName: 'Awadh Agro Processors Pvt Ltd',
    customerId: 'CUST-2026-074',
    assignedDate: '13 Oct 2026',
    deadline: '22 Oct 2026',
    status: 'Processing',
    currentStage: 2,
    totalStages: 4,
    caCommission: 1200,
    priority: 'Urgent',
    notes: 'State License category selected. Food categories list verified against FoSCoS portal.',
    documents: INITIAL_CA_DOCUMENTS.filter((d) => d.applicationId === 'FK-SRV-8750'),
    milestones: [
      {
        stage: 1,
        title: 'Business Category & Turnover Eligibility Assessment',
        description: 'Annual turnover projection over 12 Lacs qualifies for State License.',
        status: 'completed',
        timestamp: '13 Oct 2026, 01:20 PM',
      },
      {
        stage: 2,
        title: 'FoSCoS Form B Documentation & Blueprint Review',
        description: 'Inspection of food processing blueprint and NOC from local municipal body.',
        status: 'in_progress',
        timestamp: '15 Oct 2026, 11:00 AM',
      },
      {
        stage: 3,
        title: 'FSSAI Portal Filing & Challan Payment',
        description: 'State licensing authority portal lodgement.',
        status: 'pending',
      },
      {
        stage: 4,
        title: 'Food Safety Officer Verification & License Issuance',
        description: 'Handover of 14-digit FSSAI registration certificate.',
        status: 'pending',
      },
    ],
  },
  {
    id: 'FK-SRV-9120',
    serviceName: 'Tax Audit & ITR-6 Corporate Filing',
    customerName: 'Sneha Pandey',
    businessName: 'Pandey Medical Retail Store',
    customerId: 'CUST-2026-068',
    assignedDate: '20 Oct 2026',
    deadline: '31 Oct 2026',
    status: 'Assigned',
    currentStage: 1,
    totalStages: 4,
    caCommission: 3500,
    priority: 'Normal',
    notes: 'Financial year 2025-26 trial balance and ledger statement received. Preliminary reconciliation pending.',
    documents: [],
    milestones: [
      {
        stage: 1,
        title: 'Trial Balance & Books of Accounts Review',
        description: 'Verification of sales ledger, purchase register, and GST 3B reconciliations.',
        status: 'in_progress',
        timestamp: '20 Oct 2026, 04:30 PM',
      },
      {
        stage: 2,
        title: 'Form 3CD Preparation & Computation of Total Income',
        description: 'Tax audit disclosures under Section 44AB of the Income Tax Act.',
        status: 'pending',
      },
      {
        stage: 3,
        title: 'UDIN Generation on ICAI Portal',
        description: 'Unique Document Identification Number generated for audit report.',
        status: 'pending',
      },
      {
        stage: 4,
        title: 'ITR-6 Filing & Tax Audit Report e-Lodgement',
        description: 'E-filing on IT portal and dispatch of signed audit pack.',
        status: 'pending',
      },
    ],
  },
];

export const INITIAL_CA_COMPLETED_APPLICATIONS: CAApplication[] = [
  {
    id: 'FK-SRV-8610',
    serviceName: 'MSME / Udyam Registration',
    customerName: 'Mohd. Tariq',
    businessName: 'Tariq Leather Exports',
    customerId: 'CUST-2026-059',
    assignedDate: '01 Oct 2026',
    deadline: '05 Oct 2026',
    status: 'Completed',
    currentStage: 5,
    totalStages: 5,
    caCommission: 500,
    priority: 'Normal',
    notes: 'Udyam Certificate successfully generated and handed over.',
    documents: [],
    milestones: [],
  },
  {
    id: 'FK-SRV-8490',
    serviceName: 'Trademark Application Filing',
    customerName: 'Pooja Tiwari',
    businessName: 'Shubham IT Innovations',
    customerId: 'CUST-2026-042',
    assignedDate: '20 Sep 2026',
    deadline: '26 Sep 2026',
    status: 'Completed',
    currentStage: 5,
    totalStages: 5,
    caCommission: 1500,
    priority: 'Normal',
    notes: 'Form TM-A filed under Class 42. Formality check pass receipt issued.',
    documents: [],
    milestones: [],
  },
];

export const INITIAL_CA_DELIVERABLES: CADeliverable[] = [
  {
    id: 'DELIV-2026-081',
    applicationId: 'FK-SRV-8610',
    serviceName: 'MSME / Udyam Registration',
    customerName: 'Mohd. Tariq (Tariq Leather Exports)',
    deliverableName: 'Udyam_Registration_Certificate_UDYAM-UP-50-0019283.pdf',
    fileType: 'Govt Certificate',
    uploadDate: '03 Oct 2026',
    fileSize: '840 KB',
    status: 'Released to Client',
    certNumber: 'UDYAM-UP-50-0019283',
  },
  {
    id: 'DELIV-2026-074',
    applicationId: 'FK-SRV-8490',
    serviceName: 'Trademark Application Filing',
    customerName: 'Pooja Tiwari (Shubham IT)',
    deliverableName: 'Trademark_Filing_Receipt_TM_A_5819203.pdf',
    fileType: 'IP India Challan & Receipt',
    uploadDate: '25 Sep 2026',
    fileSize: '1.4 MB',
    status: 'Released to Client',
    certNumber: 'TM-A-5819203',
  },
  {
    id: 'DELIV-2026-092',
    applicationId: 'FK-SRV-9041',
    serviceName: 'GST Registration',
    customerName: 'Ananya Verma (Verma Tech Solutions LLP)',
    deliverableName: 'GST_REG_01_Draft_ARN_Application.pdf',
    fileType: 'Draft Application',
    uploadDate: '20 Oct 2026',
    fileSize: '1.9 MB',
    status: 'Pending Handover',
  },
];

export const INITIAL_CA_NOTIFICATIONS: CANotification[] = [
  {
    id: 'NOTIF-CA-01',
    title: 'New Application Assigned: FK-SRV-9120',
    description: 'Corporate Tax Audit & ITR-6 filing assigned by Operations Coordinator desk. Target deadline: 31 Oct.',
    type: 'assignment',
    timestamp: '2 hours ago',
    isRead: false,
    linkUrl: '/ca/applications',
  },
  {
    id: 'NOTIF-CA-02',
    title: 'Client Uploaded New Document',
    description: 'Client Ananya Verma uploaded Premises Electricity Bill for GST Registration (FK-SRV-9041).',
    type: 'document',
    timestamp: 'Yesterday at 05:40 PM',
    isRead: false,
    linkUrl: '/ca/documents',
  },
  {
    id: 'NOTIF-CA-03',
    title: 'Monthly CA Professional Payout: ₹32,500',
    description: 'Payout for September professional filings credited to PNB A/C ...5012 with UTR-PNB-8192031.',
    type: 'payout',
    timestamp: '05 Oct 2026, 02:15 PM',
    isRead: true,
    linkUrl: '/ca/dashboard',
  },
];
