import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
import { Lock, Mail, ShieldCheck, User, Users } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/client';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialRole = searchParams.get('role') || 'customer';
  const [role, setRole] = useState<'customer' | 'agent' | 'ca'>(
    initialRole === 'agent' ? 'agent' : initialRole === 'ca' ? 'ca' : 'customer'
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await api.loginCustomer({
        email: email.trim().toLowerCase(),
        password,
      });

      if (result.success) {
        setSuccessMessage('Login successful! Redirecting...');
        const serviceId = searchParams.get('serviceId');
        setTimeout(() => {
          if (serviceId) {
            navigate(`/services/${serviceId}`);
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        setErrorMessage(result.message || 'Invalid email or password.');
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Network error during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto 80px auto', padding: '0 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
        {/* Left Side: Login Card */}
        <div>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0066cc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Portal Access
            </span>
            <Heading level={1}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', display: 'block', marginTop: '6px' }}>
                Sign In to Finservkart
              </span>
            </Heading>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>
              Access your dashboard, manage workflows, track filings, and download invoices.
            </p>
          </div>

          {/* Role Tabs */}
          <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '10px', marginBottom: '24px' }}>
            <button
              type="button"
              onClick={() => { setRole('customer'); setErrorMessage(null); }}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                background: role === 'customer' ? '#ffffff' : 'transparent',
                color: role === 'customer' ? '#0066cc' : '#64748b',
                boxShadow: role === 'customer' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => { setRole('agent'); setErrorMessage(null); }}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                background: role === 'agent' ? '#ffffff' : 'transparent',
                color: role === 'agent' ? '#0066cc' : '#64748b',
                boxShadow: role === 'agent' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              Agent
            </button>
            <button
              type="button"
              onClick={() => { setRole('ca'); setErrorMessage(null); }}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                background: role === 'ca' ? '#ffffff' : 'transparent',
                color: role === 'ca' ? '#0066cc' : '#64748b',
                boxShadow: role === 'ca' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              Chartered Accountant
            </button>
          </div>

          <Card elevation="low" padding={4}>
            {/* Alerts */}
            {errorMessage && (
              <div style={{ marginBottom: '20px' }}>
                <Banner status="error" title={errorMessage} />
              </div>
            )}

            {successMessage && (
              <div style={{ marginBottom: '20px' }}>
                <Banner status="success" title={successMessage} />
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <VStack gap={3}>
                <div>
                  <TextInput
                    type="email"
                    label={role === 'customer' ? 'Customer Email' : `${role.toUpperCase()} Email`}
                    placeholder="name@example.com"
                    value={email}
                    onChange={(val) => setEmail(val)}
                    isRequired
                    width="100%"
                    startIcon={Mail}
                  />
                </div>

                <div>
                  <TextInput
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(val) => setPassword(val)}
                    isRequired
                    width="100%"
                    startIcon={Lock}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569' }}>
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
                </div>

                <Button
                  label={isLoading ? 'Verifying...' : `Sign In as ${role.toUpperCase()}`}
                  variant="primary"
                  size="md"
                  width="100%"
                  type="submit"
                  isLoading={isLoading}
                />
              </VStack>
            </form>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <div>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: '#0066cc', fontWeight: 600, textDecoration: 'none' }}>
                  Sign Up
                </Link>
              </div>
              <div>
                <Link to="/forgot-password" style={{ color: '#0066cc', fontWeight: 600, textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side: Information & Illustration */}
        <div style={{ background: '#f8fafc', padding: '40px 32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc', marginBottom: '20px' }}>
            <ShieldCheck size={28} />
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
            Secure Session Authentication
          </h3>

          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
            Your login communicates directly with the verified Finservkart backend, maintaining native session integrity (<code>PHPSESSID</code>) and strictly guarding role authorizations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <User size={18} color="#0066cc" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '14px', color: '#1e293b' }}>Customer Portal</strong>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Upload documents, monitor filing stages, download payment receipts and invoices.</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <Users size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '14px', color: '#1e293b' }}>Agent & Franchise Portals</strong>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Submit client orders, manage referral codes, track payouts and commissions.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

