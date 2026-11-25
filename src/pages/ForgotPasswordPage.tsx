import { ActionButton, Panel, Title, Field, Notice, Stack } from '../components/ui';
import { Surface, Inline } from '../components/Surface';
import { StatusTag as Badge } from '../components/StatusTag';
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
    <Surface style={{ maxWidth: "62.5rem", margin: "clamp(1rem, 3.076923076923077vw, 2.5rem) auto clamp(1rem, 6.153846153846154vw, 5rem) auto", padding: "0 1.25rem" }}>
      <Surface
        style={{
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
          gap: "clamp(1rem, 3.6923076923076925vw, 3rem)",
          alignItems: 'center',
        }}
      >
        {/* Left Side: Password Recovery Form Panel */}
        <Surface>
          <Surface style={{ marginBottom: "1.5rem" }}>
            <Surface style={{ marginBottom: "0.75rem" }}>
              <Badge label="Account Security" variant="blue" />
            </Surface>
            <Title level={1}>
              <Inline
                style={{
                  fontSize: "clamp(1.5rem, 2.4615384615384617vw, 2rem)",
                  fontWeight: 800,
                  color: "var(--navy)",
                  display: 'block',
                  marginTop: "0.375rem",
                  letterSpacing: '-0.02em',
                }}
              >
                Reset Your Password
              </Inline>
            </Title>
            <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.375rem", lineHeight: 1.6 }}>
              Enter the email address registered with your Finservkart account and we will send you your access recovery details.
            </p>
          </Surface>

          <Panel
            elevation="low"
            padding={5}
            style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}
          >
            {errorMessage && (
              <Surface style={{ marginBottom: "1.25rem" }}>
                <Notice status="error" title={errorMessage} />
              </Surface>
            )}

            {isSubmitted && successMessage ? (
              <Surface>
                <Surface style={{ marginBottom: "1.25rem" }}>
                  <Notice status="success" title="Recovery Email Dispatched" />
                </Surface>

                <Surface
                  style={{
                    background: "#f0fdf4",
                    border: "0.0625rem solid #bbf7d0",
                    borderRadius: "1rem",
                    padding: "1.25rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.5rem" }}>
                    <CheckCircle2 size={20} color="#16a34a" />
                    <Inline style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#15803d" }}>
                      Instructions Sent Successfully
                    </Inline>
                  </Surface>
                  <p style={{ fontSize: "0.8125rem", color: "#166534", lineHeight: 1.6, margin: 0 }}>
                    We have sent access instructions to <strong>{email}</strong>. Please check your inbox and spam folder. For account safety, change your password immediately after signing in.
                  </p>
                </Surface>

                <Stack gap={3}>
                  <ActionButton
                    label="Back to Login"
                    variant="primary"
                    size="md"
                    width="100%"
                    icon={<ArrowLeft size={16} />}
                    onClick={() => navigate('/login')}
                  />

                  <ActionButton
                    label="Resend Recovery Link"
                    variant="secondary"
                    size="md"
                    width="100%"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSuccessMessage(null);
                    }}
                  />
                </Stack>
              </Surface>
            ) : (
              <form onSubmit={handleSubmit}>
                <Stack gap={4}>
                  <Surface>
                    <Field
                      type="email"
                      label="Registered Account Email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(val) => setEmail(val)}
                      isRequired
                      width="100%"
                    />
                    <p style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.375rem", marginBottom: 0 }}>
                      Enter the email associated with your customer, agent, or CA profile.
                    </p>
                  </Surface>

                  <ActionButton
                    label={isLoading ? 'Verifying Account...' : 'Send Recovery Email'}
                    variant="primary"
                    size="md"
                    width="100%"
                    type="submit"
                    isLoading={isLoading}
                    icon={<KeyRound size={16} />}
                  />

                  <Surface
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: "1rem",
                      borderTop: "0.0625rem solid var(--sage-light)",
                      fontSize: "0.8125rem",
                    }}
                  >
                    <Link
                      to="/login"
                      style={{
                        color: "var(--blue)",
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: "0.375rem",
                      }}
                    >
                      <ArrowLeft size={14} /> Back to Sign In
                    </Link>

                    <Surface>
                      Need an account?{' '}
                      <Link
                        to="/register"
                        style={{ color: "var(--blue)", fontWeight: 600, textDecoration: 'none' }}
                      >
                        Register
                      </Link>
                    </Surface>
                  </Surface>
                </Stack>
              </form>
            )}
          </Panel>
        </Surface>

        {/* Right Side: Security Context & Troubleshooting */}
        <Surface
          style={{
            background: "var(--cream)",
            padding: "clamp(1rem, 3.076923076923077vw, 2.5rem) clamp(1rem, 2.4615384615384617vw, 2rem)",
            borderRadius: "1rem",
            border: "0.0625rem solid var(--border)",
          }}
        >
          <Surface
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "1rem",
              background: "#e0f2fe",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: "var(--blue)",
              marginBottom: "1.25rem",
            }}
          >
            <ShieldCheck size={28} />
          </Surface>

          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.75rem" }}>
            Account Security & Access
          </h3>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--muted)",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
            }}
          >
            Password recovery requests communicate directly with the verified Finservkart security service (<code>user-password-recovery.php</code>), ensuring encrypted delivery to your registered email address.
          </p>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1.25rem" }}>
            <Surface style={{ display: 'flex', gap: "0.75rem", alignItems: 'flex-start' }}>
              <Mail size={18} color="var(--blue)" style={{ flexShrink: 0, marginTop: "0.125rem" }} />
              <Surface>
                <strong style={{ fontSize: "0.875rem", color: "#243b53" }}>Check Official Sender</strong>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                  Official emails arrive from <code>info@finservkart.com</code>. Check both Inbox and Spam folders.
                </Surface>
              </Surface>
            </Surface>

            <Surface style={{ display: 'flex', gap: "0.75rem", alignItems: 'flex-start' }}>
              <UserCheck size={18} color="var(--teal)" style={{ flexShrink: 0, marginTop: "0.125rem" }} />
              <Surface>
                <strong style={{ fontSize: "0.875rem", color: "#243b53" }}>Partner Portals</strong>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                  Agent, Franchise, and CA partners can also recover credentials using their registered email.
                </Surface>
              </Surface>
            </Surface>

            <Surface style={{ display: 'flex', gap: "0.75rem", alignItems: 'flex-start' }}>
              <HelpCircle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: "0.125rem" }} />
              <Surface>
                <strong style={{ fontSize: "0.875rem", color: "#243b53" }}>Help & Phone Assistance</strong>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                  Still unable to access your profile? Contact our Lucknow support team at <strong>+91 9120000000</strong>.
                </Surface>
              </Surface>
            </Surface>
          </Surface>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default ForgotPasswordPage;
