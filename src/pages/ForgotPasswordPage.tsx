import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import { Banner } from '@astryxdesign/core/Banner';
import { VStack } from '@astryxdesign/core/VStack';
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  KeyRound,
  Mail,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please provide a valid email format (e.g. name@example.com).');
      return;
    }

    try {
      setIsLoading(true);
      const res = await api.recoverPassword(trimmedEmail);

      if (res.success) {
        setSuccessMessage(res.message);
        setIsSubmitted(true);
      } else {
        setErrorMessage(res.message);
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to process your password reset request. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto 80px auto', padding: '0 20px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* Left Side: Password Recovery Form Card */}
        <div>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ marginBottom: '12px' }}>
              <Badge label="Account Security" variant="blue" />
            </div>
            <Heading level={1}>
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  color: '#0f172a',
                  display: 'block',
                  marginTop: '6px',
                  letterSpacing: '-0.02em',
                }}
              >
                Reset Your Password
              </span>
            </Heading>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px', lineHeight: 1.6 }}>
              Enter the email address registered with your Finservkart account and we will send you your access recovery details.
            </p>
          </div>

          <Card
            elevation="low"
            padding={5}
            style={{ borderRadius: '16px', border: '1px solid #e2e8f0', background: '#ffffff' }}
          >
            {errorMessage && (
              <div style={{ marginBottom: '20px' }}>
                <Banner status="error" title={errorMessage} />
              </div>
            )}

            {isSubmitted && successMessage ? (
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <Banner status="success" title="Recovery Email Dispatched" />
                </div>

                <div
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <CheckCircle2 size={20} color="#16a34a" />
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#15803d' }}>
                      Instructions Sent Successfully
                    </span>
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#166534', lineHeight: 1.6, margin: 0 }}>
                    We have sent access instructions to <strong>{email}</strong>. Please check your inbox and spam folder. For account safety, change your password immediately after signing in.
                  </p>
                </div>

                <VStack gap={3}>
                  <Button
                    label="Back to Login"
                    variant="primary"
                    size="md"
                    width="100%"
                    icon={<ArrowLeft size={16} />}
                    onClick={() => navigate('/login')}
                  />

                  <Button
                    label="Resend Recovery Link"
                    variant="secondary"
                    size="md"
                    width="100%"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSuccessMessage(null);
                    }}
                  />
                </VStack>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <VStack gap={4}>
                  <div>
                    <TextInput
                      type="email"
                      label="Registered Account Email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(val) => setEmail(val)}
                      isRequired
                      width="100%"
                    />
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', marginBottom: 0 }}>
                      Enter the email associated with your customer, agent, or CA profile.
                    </p>
                  </div>

                  <Button
                    label={isLoading ? 'Verifying Account...' : 'Send Recovery Email'}
                    variant="primary"
                    size="md"
                    width="100%"
                    type="submit"
                    isLoading={isLoading}
                    icon={<KeyRound size={16} />}
                  />

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '16px',
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '13px',
                    }}
                  >
                    <Link
                      to="/login"
                      style={{
                        color: '#0066cc',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <ArrowLeft size={14} /> Back to Sign In
                    </Link>

                    <div>
                      Need an account?{' '}
                      <Link
                        to="/register"
                        style={{ color: '#0066cc', fontWeight: 600, textDecoration: 'none' }}
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </VStack>
              </form>
            )}
          </Card>
        </div>

        {/* Right Side: Security Context & Troubleshooting */}
        <div
          style={{
            background: '#f8fafc',
            padding: '40px 32px',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#e0f2fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0066cc',
              marginBottom: '20px',
            }}
          >
            <ShieldCheck size={28} />
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
            Account Security & Access
          </h3>

          <p
            style={{
              fontSize: '14px',
              color: '#64748b',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}
          >
            Password recovery requests communicate directly with the verified Finservkart security service (<code>user-password-recovery.php</code>), ensuring encrypted delivery to your registered email address.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <Mail size={18} color="#0066cc" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '14px', color: '#1e293b' }}>Check Official Sender</strong>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                  Official emails arrive from <code>info@finservkart.com</code>. Check both Inbox and Spam folders.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <UserCheck size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '14px', color: '#1e293b' }}>Partner Portals</strong>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                  Agent, Franchise, and CA partners can also recover credentials using their registered email.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <HelpCircle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '14px', color: '#1e293b' }}>Help & Phone Assistance</strong>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                  Still unable to access your profile? Contact our Lucknow support team at <strong>+91 9120000000</strong>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
