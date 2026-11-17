import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { VStack } from '@astryxdesign/core/VStack';
import { Divider } from '@astryxdesign/core/Divider';
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
    <div style={{ maxWidth: '1000px', margin: '40px auto 80px auto', padding: '0 20px' }}>
      {/* Header & Meta */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
          <Link to="/" style={{ color: '#0066cc', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>Terms &amp; Conditions</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Badge label="Master Service Agreement" variant="blue" />
          <Badge label="Last Updated: October 2026" variant="neutral" />
          <Badge label="Binding Legal Contract" variant="neutral" />
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
            Terms &amp; Conditions of Service
          </span>
        </Heading>

        <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.6, marginTop: '8px', maxWidth: '780px' }}>
          Please carefully review these terms and conditions before accessing Finservkart portals or purchasing taxation, audit, and regulatory filing services.
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
          <section id="acceptance">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <CheckCircle size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                1. Acceptance of Terms
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
              By registering an account, submitting an order, uploading documents, or utilizing the software products and professional services provided by Finservkart (&ldquo;the Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), you expressly agree to abide by and be bound by these Terms and Conditions. If you do not agree with any provision herein, you must refrain from using our software and services.
            </p>
          </section>

          <Divider />

          {/* Section 2 */}
          <section id="license">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <FileCheck size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                2. Scope of Services &amp; Platform License
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
              Finservkart grants you a limited, non-exclusive, non-transferable license to access our customer, agent, franchise, and professional workstations. Our platform coordinates business formation (Private Limited, LLP, OPC), GST registrations and returns, Income Tax Return (ITR) filings, trademark applications, accounting ledgering, and related statutory compliance services through assigned certified Chartered Accountants.
            </p>
          </section>

          <Divider />

          {/* Section 3 */}
          <section id="intellectual-property">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <Shield size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                3. Ownership and Intellectual Property
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
              All software source code, user interfaces, Astryx design implementations, trademarks, service marks, algorithms, and documentation are the exclusive intellectual property of Finservkart. Your license confers no ownership rights. You shall not reverse engineer, decompile, modify, copy, or distribute our platform or assets without explicit prior written authorization.
            </p>
          </section>

          <Divider />

          {/* Section 4 */}
          <section id="user-obligations">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <AlertCircle size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                4. Customer Obligations &amp; Document Accuracy
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', marginBottom: '12px' }}>
              As a user or client of Finservkart services, you warrant and agree that:
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
              <li>All documentation, identity proofs, financial figures, and statements provided by you are authentic, valid, and legally accurate.</li>
              <li>You possess lawful authority to submit documents on behalf of any enterprise or business entity you represent.</li>
              <li>Finservkart and its assigned Chartered Accountants are not liable for statutory penalties or delays arising from fraudulent, falsified, or delinquent submissions by the client.</li>
            </ul>
          </section>

          <Divider />

          {/* Section 5 */}
          <section id="fees">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <Scale size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                5. Fees, Government Charges &amp; Payments
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
              Service fees are clearly separated into professional fees and government statutory fees (e.g. MCA stamp duty, ROC challans, GST registration fees). All orders require advance clearance through our integrated payment gateways prior to filing submission. Tax invoices are generated electronically and downloadable from your Customer Portal.
            </p>
          </section>

          <Divider />

          {/* Section 6 */}
          <section id="refunds">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <ShieldAlert size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                6. Cancellation &amp; Refund Policy
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
              If a service request is cancelled before document processing commences, a full refund of professional fees will be processed within 5 to 7 business days. Once statutory filing fees have been disbursed to government departments or work has been lodged on official portals, government fees and incurred CA drafting charges are strictly non-refundable.
            </p>
          </section>

          <Divider />

          {/* Section 7 */}
          <section id="liability">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <Gavel size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                7. Limitation of Liability &amp; Governing Law
              </h2>
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', marginBottom: '12px' }}>
              To the maximum extent permitted by Indian law, Finservkart shall not be liable for indirect, incidental, or consequential damages resulting from third-party portal downtimes, regulatory rule changes, or government rejections. Total liability is strictly limited to the professional fee received for the specific service in dispute.
            </p>
            <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
              These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>Lucknow, Uttar Pradesh</strong>.
            </p>
          </section>

          <Divider />

          {/* Section 8 */}
          <section id="contact">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                <Mail size={18} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                8. Contact &amp; Legal Notices
              </h2>
            </div>
            <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <strong style={{ color: '#0f172a' }}>Legal Entity:</strong>
                <span>Finservkart Financial Services</span>
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
        <Link to="/privacy-policy" style={{ color: '#0066cc', fontWeight: 600, textDecoration: 'none' }}>
          &larr; View Privacy Policy
        </Link>
        <Link to="/" style={{ color: '#0066cc', fontWeight: 600, textDecoration: 'none' }}>
          Return to Home &rarr;
        </Link>
      </div>
    </div>
  );
};

export default TermsPage;
