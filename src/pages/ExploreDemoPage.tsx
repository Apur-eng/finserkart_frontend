import React from 'react';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Lock,
  Scale,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEMO_ROLES_LIST } from '../features/demo/demoConfig';
import { useDemo } from '../features/demo/useDemo';
import type { DemoRole } from '../features/demo/demoTypes';

const roleIcons: Record<DemoRole, React.ComponentType<{ size?: number; color?: string; className?: string }>> = {
  admin: ShieldCheck,
  coordinator: ClipboardCheck,
  franchise: Building2,
  agent: Briefcase,
  ca: Scale,
  customer: User,
};

const roleFeatures: Record<DemoRole, string[]> = {
  admin: ['Universal User Management', 'Service Catalog & Pricing', 'Multi-Tier Commission Rules', 'Immutable Audit Trails'],
  coordinator: ['Application Intake Queue', 'Smart CA Workload Allocation', 'Document Monitoring Desk', 'Payment Clearing & Escrow'],
  franchise: ['Franchise Territory Dashboard', 'Agent Network Oversight', 'Territory Customer Directory', 'Commission Split Statements'],
  agent: ['Customer Onboarding Desk', 'Client Application Directory', 'Tiered Commission Ledger', 'Bank Payout Statements'],
  ca: ['Assigned Application Matrix', 'Statutory Document Verification', 'Live Client & Desk Chat', 'Certified Deliverable Handover'],
  customer: ['Multi-Step Application Wizard', 'Milestone Lifecycle Tracker', 'Encrypted Document Vault', 'GST Tax Invoices & Receipts'],
};

export const ExploreDemoPage: React.FC = () => {
  const { isDemoModeEnabled, enterDemo, currentRole } = useDemo();

  return (
    <VStack gap={0} minHeight="100%">
      {/* Hero Section */}
      <VStack
        as="section"
        paddingInline={4}
        paddingBlock={10}
        hAlign="center"
        style={{
          background: 'linear-gradient(180deg, var(--color-background-muted) 0%, var(--color-background-surface) 100%)',
          borderBottom: '1px solid var(--color-background-muted)',
        }}
      >
        <VStack gap={4} width="100%" maxWidth={960} hAlign="center" style={{ textAlign: 'center' }}>
          <HStack gap={2} vAlign="center">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--color-fsk-info-subtle)',
                color: 'var(--color-accent)',
                borderRadius: '9999px',
                padding: '4px 14px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles size={14} aria-hidden="true" />
              Interactive Client Demo
            </span>
          </HStack>

          <Heading level={1} type="display-2" weight="bold">
            Explore Finservkart
          </Heading>

          <Text as="p" type="large" color="secondary" style={{ maxWidth: 680 }}>
            Experience the platform from every perspective.
          </Text>

          <div
            style={{
              marginTop: 'var(--spacing-2)',
              padding: 'var(--spacing-3) var(--spacing-5)',
              background: 'var(--color-background-surface)',
              borderRadius: 'var(--radius-container)',
              border: '1px solid var(--color-background-muted)',
              boxShadow: 'var(--shadow-fsk-card)',
              maxWidth: 720,
            }}
          >
            <Text size="sm" color="secondary">
              Select any stakeholder role below to explore realistic workflows and dashboards powered by fictional sample data.
              No credentials or registration required.
            </Text>
          </div>

          {!isDemoModeEnabled && (
            <div
              style={{
                padding: 'var(--spacing-3) var(--spacing-4)',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid var(--color-state-error)',
                borderRadius: 'var(--radius-element)',
                color: 'var(--color-state-error)',
              }}
            >
              <Text weight="bold" size="sm">
                Demo mode is currently disabled by configuration (VITE_DEMO_MODE=false). Please use verified credentials to log in.
              </Text>
            </div>
          )}
        </VStack>
      </VStack>

      {/* Role Cards Grid */}
      <VStack
        as="section"
        paddingInline={4}
        paddingBlock={8}
        hAlign="center"
        style={{ flex: 1, background: 'var(--color-background-surface)' }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1240,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'var(--spacing-5)',
          }}
        >
          {DEMO_ROLES_LIST.map((role) => {
            const Icon = roleIcons[role.id];
            const isCurrentActive = currentRole === role.id;
            const features = roleFeatures[role.id] || [];

            return (
              <Card
                key={role.id}
                elevation="low"
                padding={6}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-container)',
                  border: isCurrentActive
                    ? '2px solid var(--color-accent)'
                    : '1px solid var(--color-background-muted)',
                  background: 'var(--color-background-surface)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  position: 'relative',
                }}
              >
                <VStack gap={4}>
                  {/* Card Header */}
                  <HStack hAlign="between" vAlign="center">
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 'var(--radius-element)',
                        background: 'var(--color-fsk-info-subtle)',
                        color: 'var(--color-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={26} aria-hidden="true" />
                    </div>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-element)',
                        background: 'var(--color-background-muted)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {role.badge}
                    </span>
                  </HStack>

                  {/* Title & Description */}
                  <VStack gap={2}>
                    <HStack gap={2} vAlign="center">
                      <Heading level={2} style={{ fontSize: '1.25rem', margin: 0 }}>
                        {role.name}
                      </Heading>
                      {isCurrentActive && (
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '4px',
                            background: 'var(--color-accent)',
                            color: '#ffffff',
                          }}
                        >
                          Active
                        </span>
                      )}
                    </HStack>

                    <Text as="p" color="secondary" size="sm" style={{ minHeight: '2.5rem' }}>
                      {role.description}
                    </Text>
                  </VStack>

                  {/* Key Features List */}
                  <div
                    style={{
                      borderTop: '1px solid var(--color-background-muted)',
                      paddingTop: 'var(--spacing-3)',
                    }}
                  >
                    <Text type="label" size="xsm" color="secondary" style={{ marginBottom: 'var(--spacing-2)' }}>
                      SAMPLE WORKFLOWS
                    </Text>
                    <VStack gap={2}>
                      {features.map((feat) => (
                        <HStack key={feat} gap={2} vAlign="center">
                          <CheckCircle2 size={14} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                          <Text size="xsm" color="secondary">
                            {feat}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </div>
                </VStack>

                {/* Explore Button */}
                <div style={{ marginTop: 'var(--spacing-6)' }}>
                  <Button
                    label="Explore Dashboard"
                    variant="primary"
                    width="100%"
                    size="md"
                    endContent={<ArrowRight size={16} aria-hidden="true" />}
                    onClick={() => enterDemo(role.id, role.dashboardPath)}
                  />
                  <div style={{ marginTop: 'var(--spacing-2)', textAlign: 'center' }}>
                    <Link
                      to={`/login?role=${role.loginParam}`}
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-accent)',
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Sign In with credentials →
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div
          style={{
            width: '100%',
            maxWidth: 1240,
            marginTop: 'var(--spacing-8)',
            paddingTop: 'var(--spacing-6)',
            borderTop: '1px solid var(--color-background-muted)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--spacing-4)',
          }}
        >
          <HStack gap={3} vAlign="center">
            <Lock size={16} color="var(--color-accent)" />
            <Text size="sm" color="secondary">
              Production access requires verified enterprise authentication.
            </Text>
          </HStack>

          <HStack gap={3} vAlign="center">
            <Link
              to="/login"
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-accent)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Go to Unified Login
            </Link>
            <Text size="sm" color="secondary">•</Text>
            <Link
              to="/"
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-primary)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Back to Home
            </Link>
          </HStack>
        </div>
      </VStack>
    </VStack>
  );
};

export default ExploreDemoPage;
