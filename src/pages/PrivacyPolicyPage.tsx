import { Surface, Inline } from '../components/Surface';
import { StatusTag as Badge } from '../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: "var(--spacing-fsk-1) auto var(--spacing-fsk-3) auto", padding: "0 var(--spacing-fsk-2)" }}>
      {/* Header & Meta */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-114)" }}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginBottom: "var(--spacing-fsk-5)" }}>
          <Link to="/" style={{ color: "var(--color-fsk-15)", textDecoration: 'none' }}>Home</Link>
          <Inline>/</Inline>
          <Inline style={{ color: "var(--color-fsk-7)", fontWeight: 600 }}>Privacy Policy</Inline>
        </Surface>

        <Surface style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: "var(--spacing-fsk-8)", marginBottom: "var(--spacing-fsk-8)" }}>
          <Badge label="Legal & Statutory Compliance" variant="blue" />
          <Badge label="Last Updated: October 2026" variant="neutral" />
          <Badge label="Version 2.4" variant="neutral" />
        </Surface>

        <Heading level={1}>
          <Inline
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: "var(--color-fsk-7)",
              letterSpacing: '-0.02em',
              display: 'block',
              marginTop: "var(--spacing-fsk-29)",
            }}
          >
            Finservkart Privacy Policy
          </Inline>
        </Heading>

        <p style={{ color: "var(--color-fsk-18)", fontSize: "var(--font-fsk-10)", lineHeight: 1.6, marginTop: "var(--spacing-fsk-12)", maxWidth: "var(--spacing-fsk-136)" }}>
          This Privacy Policy details how Finservkart collects, uses, and safeguards your personal, business, and financial information across our public portal, customer accounts, and professional workflow applications.
        </p>
      </Surface>

      {/* Main Document Body */}
      <Card
        elevation="low"
        padding={5}
        style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-114)" }}
      >
        <VStack gap={5}>
          {/* Section 1 */}
          <section id="introduction">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-8)" }}>
              <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-112)", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--color-fsk-15)" }}>
                <Shield size={18} />
              </Surface>
              <h2 style={{ fontSize: "var(--font-fsk-61)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
                1. Commitment to Privacy
              </h2>
            </Surface>
            <p style={{ fontSize: "var(--font-fsk-91)", lineHeight: 1.7, color: "var(--color-fsk-25)", margin: 0 }}>
              Finservkart (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to safeguarding your privacy and ensuring the confidentiality of your data. As a specialized technology platform providing taxation, auditing, company formation, and regulatory compliance services, we handle sensitive identity and financial information strictly under applicable Indian legislation, including the Information Technology Act 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011, and the Digital Personal Data Protection Act 2023.
            </p>
          </section>

          <Divider />

          {/* Section 2 */}
          <section id="information-collected">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-8)" }}>
              <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-112)", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--color-fsk-15)" }}>
                <FileText size={18} />
              </Surface>
              <h2 style={{ fontSize: "var(--font-fsk-61)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
                2. Information We Collect
              </h2>
            </Surface>
            <p style={{ fontSize: "var(--font-fsk-91)", lineHeight: 1.7, color: "var(--color-fsk-25)", marginBottom: "var(--spacing-fsk-8)" }}>
              We collect information that is strictly necessary to authenticate your profile, process your service requests, and fulfill statutory government filing requirements:
            </p>
            <ul style={{ paddingLeft: "var(--spacing-fsk-2)", margin: 0, display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-12)", fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-25)", lineHeight: 1.6 }}>
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
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-8)" }}>
              <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-112)", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--color-fsk-15)" }}>
                <UserCheck size={18} />
              </Surface>
              <h2 style={{ fontSize: "var(--font-fsk-61)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
                3. Purpose and Legal Basis for Processing
              </h2>
            </Surface>
            <p style={{ fontSize: "var(--font-fsk-91)", lineHeight: 1.7, color: "var(--color-fsk-25)", marginBottom: "var(--spacing-fsk-8)" }}>
              Your information is processed strictly for legitimate business and regulatory purposes:
            </p>
            <ul style={{ paddingLeft: "var(--spacing-fsk-2)", margin: 0, display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-12)", fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-25)", lineHeight: 1.6 }}>
              <li>To prepare and lodge statutory filings with government portals (MCA, GSTN, Income Tax Department, MSME, Trademark Registry).</li>
              <li>To communicate service progress, delivery milestones, query resolutions, and payment confirmations.</li>
              <li>To assign verified Chartered Accountants (CAs) and legal professionals to your case dossier.</li>
              <li>To detect and prevent fraudulent account creation, unauthorized portal access, or security violations.</li>
            </ul>
          </section>

          <Divider />

          {/* Section 4 */}
          <section id="security">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-8)" }}>
              <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-112)", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--color-fsk-15)" }}>
                <Lock size={18} />
              </Surface>
              <h2 style={{ fontSize: "var(--font-fsk-61)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
                4. Data Security and Technical Safeguards
              </h2>
            </Surface>
            <p style={{ fontSize: "var(--font-fsk-91)", lineHeight: 1.7, color: "var(--color-fsk-25)", margin: 0 }}>
              We implement industry-standard administrative, technical, and physical security measures. All document transmissions utilize TLS encryption. Uploaded documents are stored in access-controlled environments accessible only to assigned verification professionals and operations coordinators. Server sessions are strictly guarded against session hijacking and privilege escalation.
            </p>
          </section>

          <Divider />

          {/* Section 5 */}
          <section id="sharing">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-8)" }}>
              <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-112)", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--color-fsk-15)" }}>
                <Scale size={18} />
              </Surface>
              <h2 style={{ fontSize: "var(--font-fsk-61)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
                5. Third-Party Sharing and Non-Disclosure
              </h2>
            </Surface>
            <p style={{ fontSize: "var(--font-fsk-91)", lineHeight: 1.7, color: "var(--color-fsk-25)", margin: 0 }}>
              <strong>We do not sell, rent, monetize, or trade your personal or business data under any circumstances.</strong> Information is shared solely with certified Chartered Accountants contracted under strict non-disclosure obligations, payment gateway processors for completing transaction disbursements, and official government statutory portals required for processing your application.
            </p>
          </section>

          <Divider />

          {/* Section 6 */}
          <section id="rights">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-8)" }}>
              <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-112)", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--color-fsk-15)" }}>
                <ShieldCheck size={18} />
              </Surface>
              <h2 style={{ fontSize: "var(--font-fsk-61)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
                6. Customer Rights and Data Governance
              </h2>
            </Surface>
            <p style={{ fontSize: "var(--font-fsk-91)", lineHeight: 1.7, color: "var(--color-fsk-25)", marginBottom: "var(--spacing-fsk-8)" }}>
              Under Indian law and Finservkart platform policies, you retain the right to:
            </p>
            <ul style={{ paddingLeft: "var(--spacing-fsk-2)", margin: 0, display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-12)", fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-25)", lineHeight: 1.6 }}>
              <li>Review, edit, and update your profile information in the Customer Portal.</li>
              <li>Request an export of all documents and invoices associated with your account.</li>
              <li>Opt-out of non-statutory promotional notifications.</li>
              <li>Request the closure of your account and archival of non-mandated records once active filings are completed.</li>
            </ul>
          </section>

          <Divider />

          {/* Section 7 */}
          <section id="contact">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-8)" }}>
              <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-112)", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--color-fsk-15)" }}>
                <Mail size={18} />
              </Surface>
              <h2 style={{ fontSize: "var(--font-fsk-61)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
                7. Grievance Officer & Contact Information
              </h2>
            </Surface>
            <p style={{ fontSize: "var(--font-fsk-91)", lineHeight: 1.7, color: "var(--color-fsk-25)", marginBottom: "var(--spacing-fsk-5)" }}>
              For inquiries regarding this Privacy Policy, your personal data, or compliance requests, contact our designated Grievance Officer:
            </p>
            <Surface style={{ background: "var(--color-fsk-27)", padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)", borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-12)", fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-25)" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                <strong style={{ color: "var(--color-fsk-7)" }}>Grievance Officer:</strong>
                <Inline>Legal & Compliance Directorate, Finservkart</Inline>
              </Surface>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                <Mail size={15} color="var(--color-fsk-15)" />
                <a href="mailto:info@finservkart.com" style={{ color: "var(--color-fsk-15)", textDecoration: 'none', fontWeight: 600 }}>info@finservkart.com</a>
              </Surface>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                <Phone size={15} color="var(--color-fsk-15)" />
                <Inline>+91 9120000000</Inline>
              </Surface>
              <Surface style={{ display: 'flex', alignItems: 'flex-start', gap: "var(--spacing-fsk-35)" }}>
                <MapPin size={15} color="var(--color-fsk-15)" style={{ flexShrink: 0, marginTop: "var(--spacing-fsk-47)" }} />
                <Inline>Jankipuram Garden, Jankipuram, Lucknow, Uttar Pradesh 226021</Inline>
              </Surface>
            </Surface>
          </section>
        </VStack>
      </Card>

      {/* Footer Navigation Link */}
      <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: "var(--font-fsk-24)" }}>
        <Link to="/" style={{ color: "var(--color-fsk-15)", fontWeight: 600, textDecoration: 'none' }}>
          &larr; Return to Home
        </Link>
        <Link to="/terms-and-conditions" style={{ color: "var(--color-fsk-15)", fontWeight: 600, textDecoration: 'none' }}>
          View Terms &amp; Conditions &rarr;
        </Link>
      </Surface>
    </Surface>
  );
};

export default PrivacyPolicyPage;
