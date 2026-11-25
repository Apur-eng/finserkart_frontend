import { ActionButton, Panel, Title, Row, Typography, Stack } from '../components/ui';
import React from 'react';
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
    <Stack gap={0} minHeight="100%">
      {/* Hero Section */}
      <Stack
        as="section"
        paddingInline={4}
        paddingBlock={10}
        hAlign="center"
        style={{
          background: 'linear-gradient(180deg, var(--sage-light) 0%, var(--white) 100%)',
          borderBottom: '1px solid var(--sage-light)',
        }}
      >
        <Stack gap={4} width="100%" maxWidth={960} hAlign="center" style={{ textAlign: 'center' }}>
          <Row gap={2} vAlign="center">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--status-info-subtle)',
                color: 'var(--blue)',
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
          </Row>

          <Title level={1} type="display-2" weight="bold">
            Explore Finservkart
          </Title>

          <Typography as="p" type="large" color="secondary" style={{ maxWidth: 680 }}>
            Experience the platform from every perspective.
          </Typography>

          <div
            style={{
              marginTop: '0.5rem',
              padding: '0.75rem 1.25rem',
              background: 'var(--white)',
              borderRadius: 'var(--radius-panel)',
              border: '1px solid var(--sage-light)',
              boxShadow: 'var(--shadow-panel)',
              maxWidth: 720,
            }}
          >
            <Typography size="sm" color="secondary">
              Select any stakeholder role below to explore realistic workflows and dashboards powered by fictional sample data.
              No credentials or registration required.
            </Typography>
          </div>

          {!isDemoModeEnabled && (
            <div
              style={{
                padding: '0.75rem 1rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid var(--status-error)',
                borderRadius: 'var(--radius-small)',
                color: 'var(--color-state-error)',
              }}
            >
              <Typography weight="bold" size="sm">
                Demo mode is currently disabled by configuration (VITE_DEMO_MODE=false). Please use verified credentials to log in.
              </Typography>
            </div>
          )}
        </Stack>
      </Stack>

      {/* Role Cards Grid */}
      <Stack
        as="section"
        paddingInline={4}
        paddingBlock={8}
        hAlign="center"
        style={{ flex: 1, background: 'var(--white)' }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1240,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {DEMO_ROLES_LIST.map((role) => {
            const Icon = roleIcons[role.id];
            const isCurrentActive = currentRole === role.id;
            const features = roleFeatures[role.id] || [];

            return (
              <Panel as="article"
                key={role.id}
                elevation="low"
                padding={6}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-panel)',
                  border: isCurrentActive
                    ? '2px solid var(--blue)'
                    : '1px solid var(--sage-light)',
                  background: 'var(--white)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  position: 'relative',
                }}
              >
                <Stack gap={4}>
                  {/* Panel Header */}
                  <Row hAlign="between" vAlign="center">
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 'var(--radius-small)',
                        background: 'var(--status-info-subtle)',
                        color: 'var(--blue)',
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
                        borderRadius: 'var(--radius-small)',
                        background: 'var(--sage-light)',
                        color: 'var(--navy)',
                      }}
                    >
                      {role.badge}
                    </span>
                  </Row>

                  {/* Title & Description */}
                  <Stack gap={2}>
                    <Row gap={2} vAlign="center">
                      <Title level={2} style={{ fontSize: '1.25rem', margin: 0 }}>
                        {role.name}
                      </Title>
                      {isCurrentActive && (
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '4px',
                            background: 'var(--blue)',
                            color: '#ffffff',
                          }}
                        >
                          Active
                        </span>
                      )}
                    </Row>

                    <Typography as="p" color="secondary" size="sm" style={{ minHeight: '2.5rem' }}>
                      {role.description}
                    </Typography>
                  </Stack>

                  {/* Key Features List */}
                  <div
                    style={{
                      borderTop: '1px solid var(--sage-light)',
                      paddingTop: '0.75rem',
                    }}
                  >
                    <Typography type="label" size="xsm" color="secondary" style={{ marginBottom: '0.5rem' }}>
                      SAMPLE WORKFLOWS
                    </Typography>
                    <Stack gap={2}>
                      {features.map((feat) => (
                        <Row key={feat} gap={2} vAlign="center">
                          <CheckCircle2 size={14} color="var(--blue)" style={{ flexShrink: 0 }} />
                          <Typography size="xsm" color="secondary">
                            {feat}
                          </Typography>
                        </Row>
                      ))}
                    </Stack>
                  </div>
                </Stack>

                {/* Explore ActionButton */}
                <div style={{ marginTop: '1.5rem' }}>
                  <ActionButton
                    label="Explore Dashboard"
                    variant="primary"
                    width="100%"
                    size="md"
                    endContent={<ArrowRight size={16} aria-hidden="true" />}
                    onClick={() => enterDemo(role.id, role.dashboardPath)}
                  />
                  <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                    <Link
                      to={`/login?role=${role.loginParam}`}
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--blue)',
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Sign In with credentials →
                    </Link>
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div
          style={{
            width: '100%',
            maxWidth: 1240,
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--sage-light)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Row gap={3} vAlign="center">
            <Lock size={16} color="var(--blue)" />
            <Typography size="sm" color="secondary">
              Production access requires verified enterprise authentication.
            </Typography>
          </Row>

          <Row gap={3} vAlign="center">
            <Link
              to="/login"
              style={{
                fontSize: '0.875rem',
                color: 'var(--blue)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Go to Unified Login
            </Link>
            <Typography size="sm" color="secondary">•</Typography>
            <Link
              to="/"
              style={{
                fontSize: '0.875rem',
                color: 'var(--navy)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Back to Home
            </Link>
          </Row>
        </div>
      </Stack>
    </Stack>
  );
};

export default ExploreDemoPage;
