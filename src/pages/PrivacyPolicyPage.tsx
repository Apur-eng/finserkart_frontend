import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { VStack } from '@astryxdesign/core/VStack';
import { Divider } from '@astryxdesign/core/Divider';
import {
  FileText,
  Lock,
  Mail,
  MapPin,
  Phone,
  Scale,
  Shield,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto 80px auto', padding: '0 20px' }}>
      {/* Header & Meta */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
          <Link to="/" style={{ color: '#0066cc', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>Privacy Policy</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Badge label="Legal & Statutory Compliance" variant="blue" />
          <Badge label="Last Updated: October 2026" variant="neutral" />
          <Badge label="Version 2.4" variant="neutral" />
        </div>

        <Heading level={1}>
          <span
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              display: 'block',
              marginTop: '4px',
            }}
          >
            Finservkart Privacy Policy
          </span>
        </Heading>

        <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.6, marginTop: '8px', maxWidth: '780px' }}>
          This Privacy Policy details how Finservkart collects, uses, and safeguards your personal, business, and financial information across our public portal, customer accounts, and professional workflow applications.
        </p>
      </div>

      {/* Main Document Body */}
      <Card
        elevation="low"
        padding={5}
        style={{ borderRadius: '16px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '32px' }}
      >
        <VStack gap={5}>
          {/* Section 1 */}
          <section id="introduction">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <Shield size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                1. Commitment to Privacy
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
              Finservkart (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to safeguarding your privacy and ensuring the confidentiality of your data. As a specialized technology platform providing taxation, auditing, company formation, and regulatory compliance services, we handle sensitive identity and financial information strictly under applicable Indian legislation, including the Information Technology Act 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011, and the Digital Personal Data Protection Act 2023.
            </p>
          </section>

          <Divider />

          {/* Section 2 */}
          <section id="information-collected">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <FileText size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                2. Information We Collect
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', marginBottom: '12px' }}>
              We collect information that is strictly necessary to authenticate your profile, process your service requests, and fulfill statutory government filing requirements:
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
              <li>
                <strong>Personal Identifiers:</strong> Name, contact telephone number, official email address, postal address, and business premises documentation.
              </li>
              <li>
                <strong>Statutory Identifiers:</strong> Permanent Account Number (PAN), Aadhaar details, GSTIN, Director Identification Numbers (DIN), and business registration certificates.
              </li>
              <li>
                <strong>Financial Documents:</strong> Bank account statements, cancelled cheques, invoices, Form 16/16A records, and ledger summaries uploaded for tax preparation.
              </li>
              <li>
                <strong>Platform Usage Data:</strong> Internet Protocol (IP) address, operating system, browser specifications, and transaction logs captured to ensure session security and prevent fraudulent access.
              </li>
              <li>
                <strong>Cookies:</strong> Session tokens (e.g., <code>PHPSESSID</code>) utilized to maintain authenticated sessions and workflow continuity across our portals.
              </li>
            </ul>
          </section>

          <Divider />

          {/* Section 3 */}
          <section id="purpose">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <UserCheck size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                3. Purpose and Legal Basis for Processing
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', marginBottom: '12px' }}>
              Your information is processed strictly for legitimate business and regulatory purposes:
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
              <li>To prepare and lodge statutory filings with government portals (MCA, GSTN, Income Tax Department, MSME, Trademark Registry).</li>
              <li>To communicate service progress, delivery milestones, query resolutions, and payment confirmations.</li>
              <li>To assign verified Chartered Accountants (CAs) and legal professionals to your case dossier.</li>
              <li>To detect and prevent fraudulent account creation, unauthorized portal access, or security violations.</li>
            </ul>
          </section>

          <Divider />

          {/* Section 4 */}
          <section id="security">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <Lock size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                4. Data Security and Technical Safeguards
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
              We implement industry-standard administrative, technical, and physical security measures. All document transmissions utilize TLS encryption. Uploaded documents are stored in access-controlled environments accessible only to assigned verification professionals and operations coordinators. Server sessions are strictly guarded against session hijacking and privilege escalation.
            </p>
          </section>

          <Divider />

          {/* Section 5 */}
          <section id="sharing">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <Scale size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                5. Third-Party Sharing and Non-Disclosure
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
              <strong>We do not sell, rent, monetize, or trade your personal or business data under any circumstances.</strong> Information is shared solely with certified Chartered Accountants contracted under strict non-disclosure obligations, payment gateway processors for completing transaction disbursements, and official government statutory portals required for processing your application.
            </p>
          </section>

          <Divider />

          {/* Section 6 */}
          <section id="rights">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <ShieldCheck size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                6. Customer Rights and Data Governance
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', marginBottom: '12px' }}>
              Under Indian law and Finservkart platform policies, you retain the right to:
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
              <li>Review, edit, and update your profile information in the Customer Portal.</li>
              <li>Request an export of all documents and invoices associated with your account.</li>
              <li>Opt-out of non-statutory promotional notifications.</li>
              <li>Request the closure of your account and archival of non-mandated records once active filings are completed.</li>
            </ul>
          </section>

          <Divider />

          {/* Section 7 */}
          <section id="contact">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <Mail size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                7. Grievance Officer & Contact Information
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', marginBottom: '16px' }}>
              For inquiries regarding this Privacy Policy, your personal data, or compliance requests, contact our designated Grievance Officer:
            </p>
            <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <strong style={{ color: '#0f172a' }}>Grievance Officer:</strong>
                <span>Legal & Compliance Directorate, Finservkart</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={15} color="#0066cc" />
                <a href="mailto:info@finservkart.com" style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 600 }}>info@finservkart.com</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={15} color="#0066cc" />
                <span>+91 9120000000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={15} color="#0066cc" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Jankipuram Garden, Jankipuram, Lucknow, Uttar Pradesh 226021</span>
              </div>
            </div>
          </section>
        </VStack>
      </Card>

      {/* Footer Navigation Link */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
        <Link to="/" style={{ color: '#0066cc', fontWeight: 600, textDecoration: 'none' }}>
          &larr; Return to Home
        </Link>
        <Link to="/terms-and-conditions" style={{ color: '#0066cc', fontWeight: 600, textDecoration: 'none' }}>
          View Terms &amp; Conditions &rarr;
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
