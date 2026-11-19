import { Surface, Inline } from '../components/Surface';
import { StatusTag as Badge } from '../components/StatusTag';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Award, Compass, Eye, HeartHandshake, ShieldCheck, Target } from 'lucide-react';
import React, { useState } from 'react';

export const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'mission' | 'vision'>('story');

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto', padding: "var(--spacing-fsk-1) var(--spacing-fsk-2) var(--spacing-fsk-3) var(--spacing-fsk-2)" }}>
      {/* Page Header */}
      <Surface style={{ textAlign: 'center', marginBottom: "var(--spacing-fsk-4)", paddingTop: "var(--spacing-fsk-5)" }}>
        <Badge label="Company Profile" variant="blue" />
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-6)", fontWeight: 800, color: "var(--color-fsk-7)", display: 'block', marginTop: "var(--spacing-fsk-8)" }}>
            About Finservkart
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-10)", maxWidth: "var(--spacing-fsk-11)", margin: "var(--spacing-fsk-12) auto 0 auto" }}>
          Your trusted partner in navigating the intricate landscape of financial services, business registration, taxation, and statutory compliance.
        </p>
      </Surface>

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 21.25rem), 1fr))", gap: "var(--spacing-fsk-4)", alignItems: 'center', marginBottom: "var(--spacing-fsk-13)" }}>
        {/* Left Side: Story & Interactive Tabs */}
        <Surface>
          <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-15)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Empowering Growth
          </Inline>
          <Heading level={2}>
            <Inline style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", display: 'block', marginTop: "var(--spacing-fsk-17)", marginBottom: "var(--spacing-fsk-5)" }}>
              Where Expertise Meets Innovation
            </Inline>
          </Heading>

          <p style={{ color: "var(--color-fsk-18)", fontSize: "var(--font-fsk-19)", lineHeight: 1.7, marginBottom: "var(--spacing-fsk-2)" }}>
            At Finservkart, we understand the intricate dynamics of the financial landscape, and we are dedicated to empowering individuals and businesses with tailored financial solutions. With a commitment to excellence, integrity, and innovation, we have positioned ourselves as a leading player in the financial services sector.
          </p>

          <p style={{ color: "var(--color-fsk-18)", fontSize: "var(--font-fsk-19)", lineHeight: 1.7, marginBottom: "var(--spacing-fsk-20)" }}>
            Trust is the foundation of our relationship with clients. Finservkart operates with the highest standards of transparency and ethical conduct. Our commitment to integrity ensures that you can have complete confidence in the services we provide.
          </p>

          {/* Interactive Story / Mission / Vision Tabs */}
          <Card elevation="low" padding={4}>
            <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", paddingBottom: "var(--spacing-fsk-8)", marginBottom: "var(--spacing-fsk-5)" }}>
              <button
                type="button"
                onClick={() => setActiveTab('story')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  fontWeight: 600,
                  fontSize: "var(--font-fsk-24)",
                  cursor: 'pointer',
                  color: activeTab === 'story' ? "var(--color-fsk-15)" : "var(--color-fsk-9)",
                  borderBottom: activeTab === 'story' ? "var(--spacing-fsk-47) solid var(--color-fsk-162)" : 'none',
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
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  fontWeight: 600,
                  fontSize: "var(--font-fsk-24)",
                  cursor: 'pointer',
                  color: activeTab === 'mission' ? "var(--color-fsk-15)" : "var(--color-fsk-9)",
                  borderBottom: activeTab === 'mission' ? "var(--spacing-fsk-47) solid var(--color-fsk-162)" : 'none',
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
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  fontWeight: 600,
                  fontSize: "var(--font-fsk-24)",
                  cursor: 'pointer',
                  color: activeTab === 'vision' ? "var(--color-fsk-15)" : "var(--color-fsk-9)",
                  borderBottom: activeTab === 'vision' ? "var(--spacing-fsk-47) solid var(--color-fsk-162)" : 'none',
                }}
              >
                Our Vision
              </button>
            </Surface>

            {activeTab === 'story' && (
              <Surface style={{ fontSize: "var(--font-fsk-24)", lineHeight: 1.6, color: "var(--color-fsk-25)" }}>
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", fontWeight: 600, marginBottom: "var(--spacing-fsk-17)", color: "var(--color-fsk-7)" }}>
                  <Compass size={18} color="var(--color-fsk-15)" />
                  <Inline>Transforming Financial Experiences</Inline>
                </Surface>
                Born from a passion for transforming financial experiences, Finservkart has evolved into a trusted partner, leveraging expertise and technology to make finance seamless and rewarding for everyone.
              </Surface>
            )}

            {activeTab === 'mission' && (
              <Surface style={{ fontSize: "var(--font-fsk-24)", lineHeight: 1.6, color: "var(--color-fsk-25)" }}>
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", fontWeight: 600, marginBottom: "var(--spacing-fsk-17)", color: "var(--color-fsk-15)" }}>
                  <Target size={18} color="var(--color-fsk-15)" />
                  <Inline>Accessible & Personalized Solutions</Inline>
                </Surface>
                Empower individuals and businesses by simplifying finance and providing accessible, personalized solutions that help them achieve their financial goals.
              </Surface>
            )}

            {activeTab === 'vision' && (
              <Surface style={{ fontSize: "var(--font-fsk-24)", lineHeight: 1.6, color: "var(--color-fsk-25)" }}>
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", fontWeight: 600, marginBottom: "var(--spacing-fsk-17)", color: "var(--color-fsk-15)" }}>
                  <Eye size={18} color="var(--color-fsk-15)" />
                  <Inline>Revolutionizing the Financial Landscape</Inline>
                </Surface>
                To be a leading force in revolutionizing the financial services landscape through innovation, transparency, and a customer-centric approach.
              </Surface>
            )}
          </Card>
        </Surface>

        {/* Right Side: Core Values */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-2)" }}>
          <Surface style={{ padding: "var(--spacing-fsk-26)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-28)", borderLeft: "var(--spacing-fsk-29) solid var(--color-fsk-15)", borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-21)", borderRight: "var(--spacing-fsk-22) solid var(--color-fsk-21)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-8)", marginBottom: "var(--spacing-fsk-12)" }}>
              <ShieldCheck size={22} color="var(--color-fsk-15)" />
              <h3 style={{ fontSize: "var(--font-fsk-30)", fontWeight: 700, margin: 0, color: "var(--color-fsk-7)" }}>No Hidden Costs</h3>
            </Surface>
            <p style={{ margin: 0, fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-9)", lineHeight: 1.6 }}>
              Transparent and straightforward pricing for your peace of mind. Every quote clearly specifies statutory government fees alongside professional charges.
            </p>
          </Surface>

          <Surface style={{ padding: "var(--spacing-fsk-26)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-28)", borderLeft: "var(--spacing-fsk-29) solid var(--color-fsk-31)", borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-21)", borderRight: "var(--spacing-fsk-22) solid var(--color-fsk-21)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-8)", marginBottom: "var(--spacing-fsk-12)" }}>
              <HeartHandshake size={22} color="var(--color-fsk-31)" />
              <h3 style={{ fontSize: "var(--font-fsk-30)", fontWeight: 700, margin: 0, color: "var(--color-fsk-7)" }}>Dedicated Financial Experts</h3>
            </Surface>
            <p style={{ margin: 0, fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-9)", lineHeight: 1.6 }}>
              Our network of licensed Chartered Accountants and corporate advisors work closely to guarantee statutory compliance and error-free filings.
            </p>
          </Surface>

          <Surface style={{ padding: "var(--spacing-fsk-26)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-28)", borderLeft: "var(--spacing-fsk-29) solid var(--color-fsk-32)", borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-21)", borderRight: "var(--spacing-fsk-22) solid var(--color-fsk-21)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-8)", marginBottom: "var(--spacing-fsk-12)" }}>
              <Award size={22} color="var(--color-fsk-32)" />
              <h3 style={{ fontSize: "var(--font-fsk-30)", fontWeight: 700, margin: 0, color: "var(--color-fsk-7)" }}>Proven Industry Recognition</h3>
            </Surface>
            <p style={{ margin: 0, fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-9)", lineHeight: 1.6 }}>
              Recognized with 15+ industry awards for excellence in consumer finance and digital corporate services enablement across India.
            </p>
          </Surface>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default AboutPage;

