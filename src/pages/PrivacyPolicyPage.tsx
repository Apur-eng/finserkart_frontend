import { Panel, Title, Stack, Divider } from '../components/ui';
import { Surface, Inline } from '../components/Surface';
import { StatusTag as Badge } from '../components/StatusTag';
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
    <Surface style={{ maxWidth: "62.5rem", margin: "clamp(1rem, 3.076923076923077vw, 2.5rem) auto clamp(1rem, 6.153846153846154vw, 5rem) auto", padding: "0 1.25rem" }}>
      {/* Header & Meta */}
      <Surface style={{ marginBottom: "clamp(1rem, 2.4615384615384617vw, 2rem)" }}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", fontSize: "0.8125rem", color: "var(--muted)", marginBottom: "1rem" }}>
          <Link to="/" style={{ color: "var(--blue)", textDecoration: 'none' }}>Home</Link>
          <Inline>/</Inline>
          <Inline style={{ color: "var(--navy)", fontWeight: 600 }}>Privacy Policy</Inline>
        </Surface>

        <Surface style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: "0.75rem", marginBottom: "0.75rem" }}>
          <Badge label="Legal & Statutory Compliance" variant="blue" />
          <Badge label="Last Updated: October 2026" variant="neutral" />
          <Badge label="Version 2.4" variant="neutral" />
        </Surface>

        <Title level={1}>
          <Inline
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: "var(--navy)",
              letterSpacing: '-0.02em',
              display: 'block',
              marginTop: "0.25rem",
            }}
          >
            Finservkart Privacy Policy
          </Inline>
        </Title>

        <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.6, marginTop: "0.5rem", maxWidth: "48.75rem" }}>
          This Privacy Policy details how Finservkart collects, uses, and safeguards your personal, business, and financial information across our public portal, customer accounts, and professional workflow applications.
        </p>
      </Surface>

      {/* Main Document Body */}
      <Panel
        elevation="low"
        padding={5}
        style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "clamp(1rem, 2.4615384615384617vw, 2rem)" }}
      >
        <Stack gap={5}>
          {/* Section 1 */}
          <section id="introduction">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <Shield size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                1. Commitment to Privacy
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", margin: 0 }}>
              Finservkart (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to safeguarding your privacy and ensuring the confidentiality of your data. As a specialized technology platform providing taxation, auditing, company formation, and regulatory compliance services, we handle sensitive identity and financial information strictly under applicable Indian legislation, including the Information Technology Act 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011, and the Digital Personal Data Protection Act 2023.
            </p>
          </section>

          <Divider />

          {/* Section 2 */}
          <section id="information-collected">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <FileText size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                2. Information We Collect
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", marginBottom: "0.75rem" }}>
              We collect information that is strictly necessary to authenticate your profile, process your service requests, and fulfill statutory government filing requirements:
            </p>
            <ul style={{ paddingLeft: "1.25rem", margin: 0, display: 'flex', flexDirection: 'column', gap: "0.5rem", fontSize: "0.875rem", color: "#334155", lineHeight: 1.6 }}>
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
                <strong>Cookies:</strong> Session cookies or authentication tokens utilized to maintain authenticated sessions and workflow continuity across our portals.
              </li>
            </ul>
          </section>

          <Divider />

          {/* Section 3 */}
          <section id="purpose">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <UserCheck size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                3. Purpose and Legal Basis for Processing
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", marginBottom: "0.75rem" }}>
              Your information is processed strictly for legitimate business and regulatory purposes:
            </p>
            <ul style={{ paddingLeft: "1.25rem", margin: 0, display: 'flex', flexDirection: 'column', gap: "0.5rem", fontSize: "0.875rem", color: "#334155", lineHeight: 1.6 }}>
              <li>To prepare and lodge statutory filings with government portals (MCA, GSTN, Income Tax Department, MSME, Trademark Registry).</li>
              <li>To communicate service progress, delivery milestones, query resolutions, and payment confirmations.</li>
              <li>To assign verified Chartered Accountants (CAs) and legal professionals to your case dossier.</li>
              <li>To detect and prevent fraudulent account creation, unauthorized portal access, or security violations.</li>
            </ul>
          </section>

          <Divider />

          {/* Section 4 */}
          <section id="security">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <Lock size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                4. Data Security and Technical Safeguards
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", margin: 0 }}>
              We implement industry-standard administrative, technical, and physical security measures. All document transmissions utilize TLS encryption. Uploaded documents are stored in access-controlled environments accessible only to assigned verification professionals and operations coordinators. Server sessions are strictly guarded against session hijacking and privilege escalation.
            </p>
          </section>

          <Divider />

          {/* Section 5 */}
          <section id="sharing">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <Scale size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                5. Third-Party Sharing and Non-Disclosure
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", margin: 0 }}>
              <strong>We do not sell, rent, monetize, or trade your personal or business data under any circumstances.</strong> Information is shared solely with certified Chartered Accountants contracted under strict non-disclosure obligations, payment gateway processors for completing transaction disbursements, and official government statutory portals required for processing your application.
            </p>
          </section>

          <Divider />

          {/* Section 6 */}
          <section id="rights">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <ShieldCheck size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                6. Customer Rights and Data Governance
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", marginBottom: "0.75rem" }}>
              Under Indian law and Finservkart platform policies, you retain the right to:
            </p>
            <ul style={{ paddingLeft: "1.25rem", margin: 0, display: 'flex', flexDirection: 'column', gap: "0.5rem", fontSize: "0.875rem", color: "#334155", lineHeight: 1.6 }}>
              <li>Review, edit, and update your profile information in the Customer Portal.</li>
              <li>Request an export of all documents and invoices associated with your account.</li>
              <li>Opt-out of non-statutory promotional notifications.</li>
              <li>Request the closure of your account and archival of non-mandated records once active filings are completed.</li>
            </ul>
          </section>

          <Divider />

          {/* Section 7 */}
          <section id="contact">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <Mail size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                7. Grievance Officer & Contact Information
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", marginBottom: "1rem" }}>
              For inquiries regarding this Privacy Policy, your personal data, or compliance requests, contact our designated Grievance Officer:
            </p>
            <Surface style={{ background: "var(--cream)", padding: "1rem 1.25rem", borderRadius: "1rem", border: "0.0625rem solid var(--border)", display: 'flex', flexDirection: 'column', gap: "0.5rem", fontSize: "0.875rem", color: "#334155" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                <strong style={{ color: "var(--navy)" }}>Grievance Officer:</strong>
                <Inline>Legal & Compliance Directorate, Finservkart</Inline>
              </Surface>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                <Mail size={15} color="var(--blue)" />
                <a href="mailto:info@finservkart.com" style={{ color: "var(--blue)", textDecoration: 'none', fontWeight: 600 }}>info@finservkart.com</a>
              </Surface>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                <Phone size={15} color="var(--blue)" />
                <Inline>+91 9120000000</Inline>
              </Surface>
              <Surface style={{ display: 'flex', alignItems: 'flex-start', gap: "0.625rem" }}>
                <MapPin size={15} color="var(--blue)" style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                <Inline>Jankipuram Garden, Jankipuram, Lucknow, Uttar Pradesh 226021</Inline>
              </Surface>
            </Surface>
          </section>
        </Stack>
      </Panel>

      {/* Footer Navigation Link */}
      <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: "0.875rem" }}>
        <Link to="/" style={{ color: "var(--blue)", fontWeight: 600, textDecoration: 'none' }}>
          &larr; Return to Home
        </Link>
        <Link to="/terms-and-conditions" style={{ color: "var(--blue)", fontWeight: 600, textDecoration: 'none' }}>
          View Terms &amp; Conditions &rarr;
        </Link>
      </Surface>
    </Surface>
  );
};

export default PrivacyPolicyPage;
