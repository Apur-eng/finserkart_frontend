import { Surface, Inline } from '../components/Surface';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
import {
  ArrowRight,
  Briefcase,
  Building2,
  ClipboardCheck,
  Lock,
  Mail,
  Scale,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/client';
import { useDemo } from '../features/demo/useDemo';
import type { DemoRole } from '../features/demo/demoTypes';

type UserRole = DemoRole;

interface RoleLoginConfig {
  id: UserRole;
  title: string;
  badge: string;
  usernameLabel: string;
  usernamePlaceholder: string;
  endpoint: string;
  targetDashboard: string;
  isStaff: boolean;
  canSelfRegister: boolean;
  description: string;
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
}

const ROLES: RoleLoginConfig[] = [
  {
    id: 'customer',
    title: 'Customer',
    badge: 'Client Portal',
    usernameLabel: 'Customer Email',
    usernamePlaceholder: 'name@example.com',
    endpoint: '/customer.php',
    targetDashboard: '/customer',
    isStaff: false,
    canSelfRegister: true,
    description: 'Upload documents, monitor filing stages, download payment receipts and invoices.',
    icon: User,
  },
  {
    id: 'agent',
    title: 'Agent',
    badge: 'Channel Partner',
    usernameLabel: 'Agent Email or Phone',
    usernamePlaceholder: 'agent@finservkart.com',
    endpoint: '/agent.php',
    targetDashboard: '/agent',
    isStaff: false,
    canSelfRegister: true,
    description: 'Submit client orders, manage referral codes, track payouts and commissions.',
    icon: Briefcase,
  },
  {
    id: 'franchise',
    title: 'Franchise',
    badge: 'Regional Network',
    usernameLabel: 'Franchise ID or Email',
    usernamePlaceholder: 'FRN-XXXXX or franchise@finservkart.com',
    endpoint: '/frenchise/index.php',
    targetDashboard: '/franchise',
    isStaff: false,
    canSelfRegister: false,
    description: 'Territory oversight, agent network management, and override commission statements.',
    icon: Building2,
  },
  {
    id: 'ca',
    title: 'Chartered Accountant',
    badge: 'Regulatory Desk',
    usernameLabel: 'CA Membership No. or Email',
    usernamePlaceholder: 'ICAI-XXXXX or ca@finservkart.com',
    endpoint: '/ca-login.php',
    targetDashboard: '/ca',
    isStaff: false,
    canSelfRegister: false,
    description: 'Review assigned client filings, audit statutory documents, and issue deliverable certificates.',
    icon: Scale,
  },
  {
    id: 'coordinator',
    title: 'Operations Coordinator',
    badge: 'Operations Desk',
    usernameLabel: 'Staff Username or Email',
    usernamePlaceholder: 'coord.name@finservkart.internal',
    endpoint: '/co-ordinator/index.php',
    targetDashboard: '/coordinator',
    isStaff: true,
    canSelfRegister: false,
    description: 'Monitor intake queues, assign applications to CAs, and verify transaction documents.',
    icon: ClipboardCheck,
  },
  {
    id: 'admin',
    title: 'Main Admin',
    badge: 'Platform Administration',
    usernameLabel: 'Administrator Email or Username',
    usernamePlaceholder: 'admin@finservkart.internal',
    endpoint: '/admin/index.php',
    targetDashboard: '/admin',
    isStaff: true,
    canSelfRegister: false,
    description: 'Universal user manager, treasury ledger, service catalogue editor, and immutable audit logs.',
    icon: ShieldCheck,
  },
];

const ROLE_MAP: Record<UserRole, RoleLoginConfig> = ROLES.reduce(
  (acc, r) => ({ ...acc, [r.id]: r }),
  {} as Record<UserRole, RoleLoginConfig>
);

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isDemoModeEnabled, enterDemo } = useDemo();

  const queryRole = (searchParams.get('role') || 'customer').toLowerCase();
  const initialRole: UserRole = (ROLE_MAP[queryRole as UserRole] ? queryRole : 'customer') as UserRole;

  const [role, setRole] = useState<UserRole>(initialRole);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const activeConfig = ROLE_MAP[role] || ROLE_MAP.customer;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!identifier || !password) {
      setErrorMessage(`Please enter both ${activeConfig.usernameLabel.toLowerCase()} and password.`);
      return;
    }

    setIsLoading(true);
    try {
      if (role === 'customer') {
        const result = await api.loginCustomer({
          email: identifier.trim().toLowerCase(),
          password,
        });

        if (result.success) {
          setSuccessMessage('Login successful! Redirecting...');
          const serviceId = searchParams.get('serviceId');
          setTimeout(() => {
            if (serviceId) {
              navigate(`/services/${serviceId}`);
            } else {
              navigate('/customer');
            }
          }, 800);
        } else {
          setErrorMessage(result.message || 'Invalid email or password.');
        }
      } else {
        // Backend auth for other roles connects to verified PHP endpoint in production
        setErrorMessage(
          `Production ${activeConfig.title} authentication communicates with backend contract (${activeConfig.endpoint}). For this client preview, use "Explore as ${activeConfig.title}" above to test with sample data.`
        );
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Network error during login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExploreDemo = () => {
    enterDemo(role, activeConfig.targetDashboard);
  };

  return (
    <Surface style={{ maxWidth: '78rem', margin: 'var(--spacing-fsk-1) auto var(--spacing-fsk-3) auto', padding: '0 var(--spacing-fsk-2)' }}>
      <Surface style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))', gap: 'var(--spacing-fsk-4)', alignItems: 'start' }}>
        {/* Left Side: Login Card */}
        <Surface>
          <Surface style={{ marginBottom: 'var(--spacing-4)' }}>
            <Inline style={{ fontSize: 'var(--font-fsk-14)', fontWeight: 600, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Unified Portal Access
            </Inline>
            <Heading level={1}>
              <Inline style={{ fontSize: 'var(--font-fsk-95)', fontWeight: 800, color: 'var(--color-fsk-7)', display: 'block', marginTop: 'var(--spacing-2)' }}>
                Sign In to Finservkart
              </Inline>
            </Heading>
            <p style={{ color: 'var(--color-fsk-9)', fontSize: '0.9375rem', marginTop: 'var(--spacing-2)' }}>
              Choose your role to access your dedicated dashboard, track filings, and manage workflows.
            </p>
          </Surface>

          {/* Role Selection Tabs */}
          <div
            role="tablist"
            aria-label="User Roles"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              background: 'var(--color-background-muted)',
              padding: '6px',
              borderRadius: 'var(--radius-container)',
              marginBottom: 'var(--spacing-4)',
            }}
          >
            {ROLES.map((r) => {
              const isSelected = role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setRole(r.id);
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  style={{
                    flex: '1 1 calc(33.333% - 6px)',
                    minWidth: '110px',
                    padding: '8px 6px',
                    border: 'none',
                    borderRadius: 'var(--radius-element)',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--color-background-surface)' : 'transparent',
                    color: isSelected ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.15s ease-in-out',
                    textAlign: 'center',
                  }}
                >
                  {r.title}
                </button>
              );
            })}
          </div>

          {/* Demo Callout Option (Requirement 6) */}
          {isDemoModeEnabled && (
            <Card
              elevation="low"
              padding={4}
              style={{
                marginBottom: 'var(--spacing-4)',
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.03) 100%)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                borderRadius: 'var(--radius-container)',
              }}
            >
              <VStack gap={2}>
                <HStack hAlign="between" vAlign="center" wrap="wrap">
                  <HStack gap={2} vAlign="center">
                    <Sparkles size={16} color="var(--color-accent)" />
                    <Text weight="bold" size="sm" color="accent">
                      Explore as {activeConfig.title}
                    </Text>
                  </HStack>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      background: 'rgba(37, 99, 235, 0.15)',
                      color: 'var(--color-accent)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Demo Mode Active
                  </span>
                </HStack>
                <Text size="sm" color="secondary">
                  Testing the platform demo? Skip credentials and explore the {activeConfig.title} dashboard immediately with sample data.
                </Text>
                <Button
                  label={`Explore as ${activeConfig.title}`}
                  variant="primary"
                  size="md"
                  width="100%"
                  endContent={<ArrowRight size={16} aria-hidden="true" />}
                  onClick={handleExploreDemo}
                />
              </VStack>
            </Card>
          )}

          {/* Production Authentication Form */}
          <Card elevation="low" padding={5}>
            <VStack gap={3}>
              <HStack hAlign="between" vAlign="center">
                <Text type="label" size="xsm" color="secondary">
                  PRODUCTION LOGIN — {activeConfig.title.toUpperCase()}
                </Text>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'monospace',
                  }}
                >
                  {activeConfig.endpoint}
                </span>
              </HStack>

              {/* Alerts */}
              {errorMessage && (
                <Surface style={{ marginBottom: 'var(--spacing-2)' }}>
                  <Banner status="error" title={errorMessage} />
                </Surface>
              )}

              {successMessage && (
                <Surface style={{ marginBottom: 'var(--spacing-2)' }}>
                  <Banner status="success" title={successMessage} />
                </Surface>
              )}

              <form onSubmit={handleSubmit}>
                <VStack gap={3}>
                  <Surface>
                    <TextInput
                      type="text"
                      label={activeConfig.usernameLabel}
                      placeholder={activeConfig.usernamePlaceholder}
                      value={identifier}
                      onChange={(val) => setIdentifier(val)}
                      isRequired
                      width="100%"
                      startIcon={Mail}
                    />
                  </Surface>

                  <Surface>
                    <TextInput
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      placeholder="Enter verified password"
                      value={password}
                      onChange={(val) => setPassword(val)}
                      isRequired
                      width="100%"
                      startIcon={Lock}
                    />
                  </Surface>

                  <Surface style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    <input
                      type="checkbox"
                      id="showPass"
                      checked={showPassword}
                      onChange={(e) => setShowPassword(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    <label htmlFor="showPass" style={{ cursor: 'pointer', userSelect: 'none' }}>
                      Show password
                    </label>
                  </Surface>

                  <Button
                    label={isLoading ? 'Verifying...' : `Sign In as ${activeConfig.title}`}
                    variant="secondary"
                    size="md"
                    width="100%"
                    type="submit"
                    isLoading={isLoading}
                  />
                </VStack>
              </form>

              {/* Bottom Context Links */}
              <Surface style={{ marginTop: 'var(--spacing-3)', paddingTop: 'var(--spacing-3)', borderTop: '1px solid var(--color-background-muted)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 'var(--spacing-2)', fontSize: '0.8125rem' }}>
                {activeConfig.canSelfRegister ? (
                  <Surface>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>
                      Sign Up
                    </Link>
                  </Surface>
                ) : activeConfig.isStaff ? (
                  <Surface style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>
                    Staff accounts are provisioned internally by platform administrators.
                  </Surface>
                ) : (
                  <Surface style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>
                    Professional partners are onboarded via the compliance operations desk.
                  </Surface>
                )}

                <Surface>
                  <Link to="/forgot-password" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>
                    Forgot password?
                  </Link>
                </Surface>
              </Surface>
            </VStack>
          </Card>
        </Surface>

        {/* Right Side: Information & Illustration */}
        <Surface style={{ background: 'var(--color-background-surface)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-container)', border: '1px solid var(--color-background-muted)', boxShadow: 'var(--shadow-fsk-card)' }}>
          <Surface style={{ width: 48, height: 48, borderRadius: 'var(--radius-element)', background: 'var(--color-fsk-info-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', marginBottom: 'var(--spacing-3)' }}>
            <ShieldCheck size={28} />
          </Surface>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-2)' }}>
            Role-Based Portal Governance
          </h3>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--spacing-4)' }}>
            Finservkart partitions responsibilities across six distinct stakeholder portals. Each role has strict operational boundaries and verified access controls.
          </p>

          <VStack gap={3}>
            {ROLES.map((r) => {
              const Icon = r.icon;
              const isSelected = role === r.id;

              return (
                <div
                  key={r.id}
                  onClick={() => {
                    setRole(r.id);
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setRole(r.id);
                  }}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'start',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-element)',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--color-fsk-info-subtle)' : 'transparent',
                    border: isSelected ? '1px solid var(--color-accent)' : '1px solid transparent',
                  }}
                >
                  <Icon size={18} color={isSelected ? 'var(--color-accent)' : 'var(--color-text-secondary)'} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <Surface>
                    <HStack gap={2} vAlign="center">
                      <strong style={{ fontSize: '0.875rem', color: isSelected ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>
                        {r.title}
                      </strong>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)', background: 'var(--color-background-muted)', padding: '1px 6px', borderRadius: '4px' }}>
                        {r.badge}
                      </span>
                    </HStack>
                    <Surface style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {r.description}
                    </Surface>
                  </Surface>
                </div>
              );
            })}
          </VStack>

          <div style={{ marginTop: 'var(--spacing-5)', paddingTop: 'var(--spacing-3)', borderTop: '1px solid var(--color-background-muted)' }}>
            <Link
              to="/explore-demo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.875rem',
                color: 'var(--color-accent)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <Sparkles size={16} />
              Open Full Demo Role Explorer →
            </Link>
          </div>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default LoginPage;
