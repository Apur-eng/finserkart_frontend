import { Panel, Title, Stack, Divider } from '../components/ui';
import { Surface, Inline } from '../components/Surface';
import { StatusTag as Badge } from '../components/StatusTag';
import {
  AlertCircle,
  CheckCircle,
  FileCheck,
  Gavel,
  Mail,
  MapPin,
  Phone,
  Scale,
  Shield,
  ShieldAlert
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  return (
    <Surface style={{ maxWidth: "62.5rem", margin: "clamp(1rem, 3.076923076923077vw, 2.5rem) auto clamp(1rem, 6.153846153846154vw, 5rem) auto", padding: "0 1.25rem" }}>
      {/* Header & Meta */}
      <Surface style={{ marginBottom: "clamp(1rem, 2.4615384615384617vw, 2rem)" }}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", fontSize: "0.8125rem", color: "var(--muted)", marginBottom: "1rem" }}>
          <Link to="/" style={{ color: "var(--blue)", textDecoration: 'none' }}>Home</Link>
          <Inline>/</Inline>
          <Inline style={{ color: "var(--navy)", fontWeight: 600 }}>Terms &amp; Conditions</Inline>
        </Surface>

        <Surface style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: "0.75rem", marginBottom: "0.75rem" }}>
          <Badge label="Master Service Agreement" variant="blue" />
          <Badge label="Last Updated: October 2026" variant="neutral" />
          <Badge label="Binding Legal Contract" variant="neutral" />
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
            Terms &amp; Conditions of Service
          </Inline>
        </Title>

        <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.6, marginTop: "0.5rem", maxWidth: "48.75rem" }}>
          Please carefully review these terms and conditions before accessing Finservkart portals or purchasing taxation, audit, and regulatory filing services.
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
          <section id="acceptance">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <CheckCircle size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                1. Acceptance of Terms
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", margin: 0 }}>
              By registering an account, submitting an order, uploading documents, or utilizing the software products and professional services provided by Finservkart (&ldquo;the Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), you expressly agree to abide by and be bound by these Terms and Conditions. If you do not agree with any provision herein, you must refrain from using our software and services.
            </p>
          </section>

          <Divider />

          {/* Section 2 */}
          <section id="license">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <FileCheck size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                2. Scope of Services &amp; Platform License
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", margin: 0 }}>
              Finservkart grants you a limited, non-exclusive, non-transferable license to access our customer, agent, franchise, and professional workstations. Our platform coordinates business formation (Private Limited, LLP, OPC), GST registrations and returns, Income Tax Return (ITR) filings, trademark applications, accounting ledgering, and related statutory compliance services through assigned certified Chartered Accountants.
            </p>
          </section>

          <Divider />

          {/* Section 3 */}
          <section id="intellectual-property">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <Shield size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                3. Ownership and Intellectual Property
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", margin: 0 }}>
              All software source code, user interfaces, Astryx design implementations, trademarks, service marks, algorithms, and documentation are the exclusive intellectual property of Finservkart. Your license confers no ownership rights. You shall not reverse engineer, decompile, modify, copy, or distribute our platform or assets without explicit prior written authorization.
            </p>
          </section>

          <Divider />

          {/* Section 4 */}
          <section id="user-obligations">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <AlertCircle size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                4. Customer Obligations &amp; Document Accuracy
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", marginBottom: "0.75rem" }}>
              As a user or client of Finservkart services, you warrant and agree that:
            </p>
            <ul style={{ paddingLeft: "1.25rem", margin: 0, display: 'flex', flexDirection: 'column', gap: "0.5rem", fontSize: "0.875rem", color: "#334155", lineHeight: 1.6 }}>
              <li>All documentation, identity proofs, financial figures, and statements provided by you are authentic, valid, and legally accurate.</li>
              <li>You possess lawful authority to submit documents on behalf of any enterprise or business entity you represent.</li>
              <li>Finservkart and its assigned Chartered Accountants are not liable for statutory penalties or delays arising from fraudulent, falsified, or delinquent submissions by the client.</li>
            </ul>
          </section>

          <Divider />

          {/* Section 5 */}
          <section id="fees">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <Scale size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                5. Fees, Government Charges &amp; Payments
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", margin: 0 }}>
              Service fees are clearly separated into professional fees and government statutory fees (e.g. MCA stamp duty, ROC challans, GST registration fees). All orders require advance clearance through our integrated payment gateways prior to filing submission. Tax invoices are generated electronically and downloadable from your Customer Portal.
            </p>
          </section>

          <Divider />

          {/* Section 6 */}
          <section id="refunds">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <ShieldAlert size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                6. Cancellation &amp; Refund Policy
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", margin: 0 }}>
              If a service request is cancelled before document processing commences, a full refund of professional fees will be processed within 5 to 7 business days. Once statutory filing fees have been disbursed to government departments or work has been lodged on official portals, government fees and incurred CA drafting charges are strictly non-refundable.
            </p>
          </section>

          <Divider />

          {/* Section 7 */}
          <section id="liability">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <Gavel size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                7. Limitation of Liability &amp; Governing Law
              </h2>
            </Surface>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", marginBottom: "0.75rem" }}>
              To the maximum extent permitted by Indian law, Finservkart shall not be liable for indirect, incidental, or consequential damages resulting from third-party portal downtimes, regulatory rule changes, or government rejections. Total liability is strictly limited to the professional fee received for the specific service in dispute.
            </p>
            <p style={{ fontSize: "0.90625rem", lineHeight: 1.7, color: "#334155", margin: 0 }}>
              These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>Lucknow, Uttar Pradesh</strong>.
            </p>
          </section>

          <Divider />

          {/* Section 8 */}
          <section id="contact">
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.75rem" }}>
              <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#e0f2fe", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                <Mail size={18} />
              </Surface>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                8. Contact &amp; Legal Notices
              </h2>
            </Surface>
            <Surface style={{ background: "var(--cream)", padding: "1rem 1.25rem", borderRadius: "1rem", border: "0.0625rem solid var(--border)", display: 'flex', flexDirection: 'column', gap: "0.5rem", fontSize: "0.875rem", color: "#334155" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                <strong style={{ color: "var(--navy)" }}>Legal Entity:</strong>
                <Inline>Finservkart Financial Services</Inline>
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
        <Link to="/privacy-policy" style={{ color: "var(--blue)", fontWeight: 600, textDecoration: 'none' }}>
          &larr; View Privacy Policy
        </Link>
        <Link to="/" style={{ color: "var(--blue)", fontWeight: 600, textDecoration: 'none' }}>
          Return to Home &rarr;
        </Link>
      </Surface>
    </Surface>
  );
};

export default TermsPage;
