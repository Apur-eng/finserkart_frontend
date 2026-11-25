import { Notice, ActionButton, Panel, Title, Row, Typography, Field, Stack } from '../components/ui';
import { Surface, Inline } from '../components/Surface';
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
    <Surface style={{ maxWidth: '78rem', margin: 'clamp(1rem, 3.076923076923077vw, 2.5rem) auto clamp(1rem, 6.153846153846154vw, 5rem) auto', padding: '0 1.25rem' }}>
      <Surface style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))', gap: 'clamp(1rem, 3.6923076923076925vw, 3rem)', alignItems: 'start' }}>
        {/* Left Side: Login Panel */}
        <Surface>
          <Surface style={{ marginBottom: '1rem' }}>
            <Inline style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Unified Portal Access
            </Inline>
            <Title level={1}>
              <Inline style={{ fontSize: 'clamp(1.5rem, 2.4615384615384617vw, 2rem)', fontWeight: 800, color: 'var(--navy)', display: 'block', marginTop: '0.5rem' }}>
                Sign In to Finservkart
              </Inline>
            </Title>
            <p style={{ color: 'var(--muted)', fontSize: '0.9375rem', marginTop: '0.5rem' }}>
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
              background: 'var(--sage-light)',
              padding: '6px',
              borderRadius: 'var(--radius-panel)',
              marginBottom: '1rem',
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
                    borderRadius: 'var(--radius-small)',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--white)' : 'transparent',
                    color: isSelected ? 'var(--blue)' : 'var(--navy)',
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
            <Panel
              elevation="low"
              padding={4}
              style={{
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.03) 100%)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                borderRadius: 'var(--radius-panel)',
              }}
            >
              <Stack gap={2}>
                <Row hAlign="between" vAlign="center" wrap="wrap">
                  <Row gap={2} vAlign="center">
                    <Sparkles size={16} color="var(--blue)" />
                    <Typography weight="bold" size="sm" color="accent">
                      Explore as {activeConfig.title}
                    </Typography>
                  </Row>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      background: 'rgba(37, 99, 235, 0.15)',
                      color: 'var(--blue)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Demo Mode Active
                  </span>
                </Row>
                <Typography size="sm" color="secondary">
                  Testing the platform demo? Skip credentials and explore the {activeConfig.title} dashboard immediately with sample data.
                </Typography>
                <ActionButton
                  label={`Explore as ${activeConfig.title}`}
                  variant="primary"
                  size="md"
                  width="100%"
                  endContent={<ArrowRight size={16} aria-hidden="true" />}
                  onClick={handleExploreDemo}
                />
              </Stack>
            </Panel>
          )}

          {/* Production Authentication Form */}
          <Panel elevation="low" padding={5}>
            <Stack gap={3}>
              <Row hAlign="between" vAlign="center">
                <Typography type="label" size="xsm" color="secondary">
                  PRODUCTION LOGIN — {activeConfig.title.toUpperCase()}
                </Typography>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    color: 'var(--muted)',
                    fontFamily: 'monospace',
                  }}
                >
                  {activeConfig.endpoint}
                </span>
              </Row>

              {/* Alerts */}
              {errorMessage && (
                <Surface style={{ marginBottom: '0.5rem' }}>
                  <Notice status="error" title={errorMessage} />
                </Surface>
              )}

              {successMessage && (
                <Surface style={{ marginBottom: '0.5rem' }}>
                  <Notice status="success" title={successMessage} />
                </Surface>
              )}

              <form onSubmit={handleSubmit}>
                <Stack gap={3}>
                  <Surface>
                    <Field
                      type="text"
                      label={activeConfig.usernameLabel}
                      placeholder={activeConfig.usernamePlaceholder}
                      value={identifier}
                      onChange={(val) => setIdentifier(val)}
                      isRequired
                      width="100%"
                      startIcon={<Mail size={18} />}
                    />
                  </Surface>

                  <Surface>
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      placeholder="Enter verified password"
                      value={password}
                      onChange={(val) => setPassword(val)}
                      isRequired
                      width="100%"
                      startIcon={<Lock size={18} />}
                    />
                  </Surface>

                  <Surface style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--muted)' }}>
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

                  <ActionButton
                    label={isLoading ? 'Verifying...' : `Sign In as ${activeConfig.title}`}
                    variant="secondary"
                    size="md"
                    width="100%"
                    type="submit"
                    isLoading={isLoading}
                  />
                </Stack>
              </form>

              {/* Bottom Context Links */}
              <Surface style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--sage-light)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.5rem', fontSize: '0.8125rem' }}>
                {activeConfig.canSelfRegister ? (
                  <Surface>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: 'var(--blue)', fontWeight: 600, textDecoration: 'none' }}>
                      Sign Up
                    </Link>
                  </Surface>
                ) : activeConfig.isStaff ? (
                  <Surface style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                    Staff accounts are provisioned internally by platform administrators.
                  </Surface>
                ) : (
                  <Surface style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                    Professional partners are onboarded via the compliance operations desk.
                  </Surface>
                )}

                <Surface>
                  <Link to="/forgot-password" style={{ color: 'var(--blue)', fontWeight: 600, textDecoration: 'none' }}>
                    Forgot password?
                  </Link>
                </Surface>
              </Surface>
            </Stack>
          </Panel>
        </Surface>

        {/* Right Side: Information & Illustration */}
        <Surface style={{ background: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--radius-panel)', border: '1px solid var(--sage-light)', boxShadow: 'var(--shadow-panel)' }}>
          <Surface style={{ width: 48, height: 48, borderRadius: 'var(--radius-small)', background: 'var(--status-info-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', marginBottom: '0.75rem' }}>
            <ShieldCheck size={28} />
          </Surface>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>
            Role-Based Portal Governance
          </h3>

          <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
            Finservkart partitions responsibilities across six distinct stakeholder portals. Each role has strict operational boundaries and verified access controls.
          </p>

          <Stack gap={3}>
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
                    borderRadius: 'var(--radius-small)',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--status-info-subtle)' : 'transparent',
                    border: isSelected ? '1px solid var(--blue)' : '1px solid transparent',
                  }}
                >
                  <Icon size={18} color={isSelected ? 'var(--blue)' : 'var(--muted)'} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <Surface>
                    <Row gap={2} vAlign="center">
                      <strong style={{ fontSize: '0.875rem', color: isSelected ? 'var(--blue)' : 'var(--navy)' }}>
                        {r.title}
                      </strong>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--muted)', background: 'var(--sage-light)', padding: '1px 6px', borderRadius: '4px' }}>
                        {r.badge}
                      </span>
                    </Row>
                    <Surface style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>
                      {r.description}
                    </Surface>
                  </Surface>
                </div>
              );
            })}
          </Stack>

          <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--sage-light)' }}>
            <Link
              to="/explore-demo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.875rem',
                color: 'var(--blue)',
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
