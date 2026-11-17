import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Award, Compass, Eye, HeartHandshake, ShieldCheck, Target } from 'lucide-react';
import React, { useState } from 'react';

export const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'mission' | 'vision'>('story');

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 20px 80px 20px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px', paddingTop: '16px' }}>
        <Badge label="Company Profile" variant="blue" />
        <Heading level={1}>
          <span style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', display: 'block', marginTop: '12px' }}>
            About Finservkart
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '640px', margin: '8px auto 0 auto' }}>
          Your trusted partner in navigating the intricate landscape of financial services, business registration, taxation, and statutory compliance.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '64px' }}>
        {/* Left Side: Story & Interactive Tabs */}
        <div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0066cc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Empowering Growth
          </span>
          <Heading level={2}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', display: 'block', marginTop: '6px', marginBottom: '16px' }}>
              Where Expertise Meets Innovation
            </span>
          </Heading>

          <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
            At Finservkart, we understand the intricate dynamics of the financial landscape, and we are dedicated to empowering individuals and businesses with tailored financial solutions. With a commitment to excellence, integrity, and innovation, we have positioned ourselves as a leading player in the financial services sector.
          </p>

          <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px' }}>
            Trust is the foundation of our relationship with clients. Finservkart operates with the highest standards of transparency and ethical conduct. Our commitment to integrity ensures that you can have complete confidence in the services we provide.
          </p>

          {/* Interactive Story / Mission / Vision Tabs */}
          <Card elevation="low" padding={4}>
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('story')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 14px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: activeTab === 'story' ? '#0066cc' : '#64748b',
                  borderBottom: activeTab === 'story' ? '2px solid #0066cc' : 'none',
                }}
              >
                Our Story
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mission')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 14px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: activeTab === 'mission' ? '#0066cc' : '#64748b',
                  borderBottom: activeTab === 'mission' ? '2px solid #0066cc' : 'none',
                }}
              >
                Our Mission
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vision')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 14px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: activeTab === 'vision' ? '#0066cc' : '#64748b',
                  borderBottom: activeTab === 'vision' ? '2px solid #0066cc' : 'none',
                }}
              >
                Our Vision
              </button>
            </div>

            {activeTab === 'story' && (
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '6px', color: '#0f172a' }}>
                  <Compass size={18} color="#0066cc" />
                  <span>Transforming Financial Experiences</span>
                </div>
                Born from a passion for transforming financial experiences, Finservkart has evolved into a trusted partner, leveraging expertise and technology to make finance seamless and rewarding for everyone.
              </div>
            )}

            {activeTab === 'mission' && (
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '6px', color: '#0066cc' }}>
                  <Target size={18} color="#0066cc" />
                  <span>Accessible & Personalized Solutions</span>
                </div>
                Empower individuals and businesses by simplifying finance and providing accessible, personalized solutions that help them achieve their financial goals.
              </div>
            )}

            {activeTab === 'vision' && (
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '6px', color: '#0066cc' }}>
                  <Eye size={18} color="#0066cc" />
                  <span>Revolutionizing the Financial Landscape</span>
                </div>
                To be a leading force in revolutionizing the financial services landscape through innovation, transparency, and a customer-centric approach.
              </div>
            )}
          </Card>
        </div>

        {/* Right Side: Core Values */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', borderLeft: '4px solid #0066cc', borderTop: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <ShieldCheck size={22} color="#0066cc" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>No Hidden Costs</h3>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
              Transparent and straightforward pricing for your peace of mind. Every quote clearly specifies statutory government fees alongside professional charges.
            </p>
          </div>

          <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', borderLeft: '4px solid #10b981', borderTop: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <HeartHandshake size={22} color="#10b981" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Dedicated Financial Experts</h3>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
              Our network of licensed Chartered Accountants and corporate advisors work closely to guarantee statutory compliance and error-free filings.
            </p>
          </div>

          <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', borderLeft: '4px solid #f59e0b', borderTop: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Award size={22} color="#f59e0b" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Proven Industry Recognition</h3>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
              Recognized with 15+ industry awards for excellence in consumer finance and digital corporate services enablement across India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

