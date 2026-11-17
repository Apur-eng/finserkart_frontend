import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import {
  ArrowRight,
  Award,
  Clock,
  Eye,
  FileCheck,
  Headphones,
  Phone,
  Shield,
  Smile,
  Users,
  Zap
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceList from '../features/services/ServiceList';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0052a3 0%, #003366 100%)',
          color: '#ffffff',
          padding: '80px 20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Badge label="★ Trusted Financial Partner in India" variant="blue" />
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.02em' }}>
              Your Financial Future{' '}
              <span style={{ background: 'linear-gradient(120deg, #ffed4e, #ffd700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Starts Here
              </span>
            </h1>

            <p style={{ fontSize: '18px', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '32px', maxWidth: '540px' }}>
              Navigate your financial journey with confidence. We provide comprehensive business registration, taxation, auditing, and certification solutions with verified professional expertise.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Button
                label="Explore Solutions"
                variant="primary"
                size="lg"
                endContent={<ArrowRight size={18} style={{ marginLeft: '6px' }} />}
                onClick={() => navigate('/services')}
              />
              <Button
                label="Get in Touch"
                variant="secondary"
                size="lg"
                icon={<Phone size={16} />}
                onClick={() => navigate('/contact')}
              />
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '36px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff' }}>10,000+</div>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>Active Clients</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff' }}>99.8%</div>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>Satisfaction Rate</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff' }}>24/7</div>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>Compliance Support</div>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '36px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
                color: '#0f172a',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                  <Shield size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Finservkart Enterprise Suite</h3>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>ISO Certified & Bank-Grade Security</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #0066cc' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>Zero Hidden Charges</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Direct government fees + upfront professional cost breakdown.</div>
                </div>

                <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>Chartered Accountant Verified</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Every workflow is assigned to licensed financial experts.</div>
                </div>

                <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #f59e0b' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>Encrypted Document Vault</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Supporting docs zipped with AES encryption & secure storage.</div>
                </div>
              </div>

              <Button
                label="Create Customer Account"
                variant="primary"
                size="md"
                width="100%"
                onClick={() => navigate('/register')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Banner */}
      <section style={{ background: '#0052a3', color: '#ffffff', padding: '48px 20px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
          <div>
            <Smile size={36} color="#fbbf24" style={{ marginBottom: '12px' }} />
            <div style={{ fontSize: '36px', fontWeight: 800 }}>10,000+</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Happy Clients</div>
          </div>
          <div>
            <FileCheck size={36} color="#10b981" style={{ marginBottom: '12px' }} />
            <div style={{ fontSize: '36px', fontWeight: 800 }}>50,000+</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Services Completed</div>
          </div>
          <div>
            <Users size={36} color="#38bdf8" style={{ marginBottom: '12px' }} />
            <div style={{ fontSize: '36px', fontWeight: 800 }}>250+</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Expert Professionals</div>
          </div>
          <div>
            <Award size={36} color="#fbbf24" style={{ marginBottom: '12px' }} />
            <div style={{ fontSize: '36px', fontWeight: 800 }}>15+</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Industry Awards</div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section style={{ padding: '80px 20px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Badge label="Comprehensive Solutions" variant="blue" />
          <Heading level={2}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', display: 'block', marginTop: '12px' }}>
              Awesome Financial Services For Business
            </span>
          </Heading>
          <Text type="supporting">
            <span style={{ fontSize: '16px', color: '#64748b', maxWidth: '640px', display: 'inline-block', marginTop: '8px' }}>
              Explore verified financial, taxation, and company formation services with clear government fee transparency and required document checklists.
            </span>
          </Text>
        </div>

        {/* Dynamic Service Listing */}
        <ServiceList limit={6} />

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Button
            label="Explore All Available Services"
            variant="secondary"
            size="lg"
            endContent={<ArrowRight size={18} style={{ marginLeft: '6px' }} />}
            onClick={() => navigate('/services')}
          />
        </div>
      </section>

      {/* Why Choose Finservkart Section */}
      <section style={{ background: '#f8fafc', padding: '80px 20px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <Badge label="The Finservkart Advantage" variant="green" />
            <Heading level={2}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', display: 'block', marginTop: '12px' }}>
                Why Choose Finservkart?
              </span>
            </Heading>
            <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '8px auto 0 auto' }}>
              We are dedicated to delivering excellence, transparent pricing, and regulatory compliance for businesses across India.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            <Card elevation="low" padding={4}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc', marginBottom: '16px' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>Lightning Fast</h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>
                Quick document verification and rapid processing for your compliance needs. Get active updates directly on your dashboard.
              </p>
            </Card>

            <Card elevation="low" padding={4}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '16px' }}>
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>Bank-Level Security</h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>
                All confidential records and financial statements are safeguarded with strict access controls and encrypted archives.
              </p>
            </Card>

            <Card elevation="low" padding={4}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', marginBottom: '16px' }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>Expert CA Team</h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>
                Every filing is thoroughly reviewed and submitted by licensed Chartered Accountants with extensive industry expertise.
              </p>
            </Card>

            <Card elevation="low" padding={4}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', marginBottom: '16px' }}>
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>24/7 Support</h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>
                Round-the-clock customer support available across chat, phone, and ticketing systems for continuous assistance.
              </p>
            </Card>

            <Card elevation="low" padding={4}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed', marginBottom: '16px' }}>
                <Eye size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>Full Transparency</h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>
                No hidden charges or surprise invoices. Clear upfront pricing separating net professional fees and statutory government costs.
              </p>
            </Card>

            <Card elevation="low" padding={4}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#cffafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0891b2', marginBottom: '16px' }}>
                <Headphones size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>Dedicated Coordinator</h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>
                An operations coordinator is assigned to manage your order workflow from document collection to final invoice delivery.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Inquiries CTA */}
      <section style={{ padding: '80px 20px', maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(135deg, #0066cc 0%, #004080 100%)', color: '#ffffff', borderRadius: '24px', padding: '60px 24px', boxShadow: '0 20px 40px rgba(0, 102, 204, 0.2)' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>Ready to Streamline Your Business Finances?</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', maxWidth: '580px', margin: '0 auto 32px auto', lineHeight: 1.6 }}>
            Join over 10,000 businesses across India that rely on Finservkart for GST, ITR, audits, and company registrations.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Button
              label="Create Free Account"
              variant="secondary"
              size="lg"
              onClick={() => navigate('/register')}
            />
            <Button
              label="Contact Our Advisors"
              variant="ghost"
              size="lg"
              onClick={() => navigate('/contact')}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

