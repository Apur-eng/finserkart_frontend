import { Surface, Inline } from '../components/Surface';
import { StatusTag as Badge } from '../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: "var(--spacing-fsk-1) auto var(--spacing-fsk-3) auto", padding: "0 var(--spacing-fsk-2)" }}>
      <Surface
        style={{
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
          gap: "var(--spacing-fsk-4)",
          alignItems: 'center',
        }}
      >
        {/* Left Side: Password Recovery Form Card */}
        <Surface>
          <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
            <Surface style={{ marginBottom: "var(--spacing-fsk-8)" }}>
              <Badge label="Account Security" variant="blue" />
            </Surface>
            <Heading level={1}>
              <Inline
                style={{
                  fontSize: "var(--font-fsk-95)",
                  fontWeight: 800,
                  color: "var(--color-fsk-7)",
                  display: 'block',
                  marginTop: "var(--spacing-fsk-17)",
                  letterSpacing: '-0.02em',
                }}
              >
                Reset Your Password
              </Inline>
            </Heading>
            <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-17)", lineHeight: 1.6 }}>
              Enter the email address registered with your Finservkart account and we will send you your access recovery details.
            </p>
          </Surface>

          <Card
            elevation="low"
            padding={5}
            style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}
          >
            {errorMessage && (
              <Surface style={{ marginBottom: "var(--spacing-fsk-2)" }}>
                <Banner status="error" title={errorMessage} />
              </Surface>
            )}

            {isSubmitted && successMessage ? (
              <Surface>
                <Surface style={{ marginBottom: "var(--spacing-fsk-2)" }}>
                  <Banner status="success" title="Recovery Email Dispatched" />
                </Surface>

                <Surface
                  style={{
                    background: "var(--color-fsk-75)",
                    border: "var(--spacing-fsk-22) solid var(--color-fsk-125)",
                    borderRadius: "var(--radius-fsk-28)",
                    padding: "var(--spacing-fsk-2)",
                    marginBottom: "var(--spacing-fsk-26)",
                  }}
                >
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-12)" }}>
                    <CheckCircle2 size={20} color="var(--color-fsk-39)" />
                    <Inline style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-103)" }}>
                      Instructions Sent Successfully
                    </Inline>
                  </Surface>
                  <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-126)", lineHeight: 1.6, margin: 0 }}>
                    We have sent access instructions to <strong>{email}</strong>. Please check your inbox and spam folder. For account safety, change your password immediately after signing in.
                  </p>
                </Surface>

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
              </Surface>
            ) : (
              <form onSubmit={handleSubmit}>
                <VStack gap={4}>
                  <Surface>
                    <TextInput
                      type="email"
                      label="Registered Account Email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(val) => setEmail(val)}
                      isRequired
                      width="100%"
                    />
                    <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-17)", marginBottom: 0 }}>
                      Enter the email associated with your customer, agent, or CA profile.
                    </p>
                  </Surface>

                  <Button
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
                      paddingTop: "var(--spacing-fsk-5)",
                      borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-46)",
                      fontSize: "var(--font-fsk-14)",
                    }}
                  >
                    <Link
                      to="/login"
                      style={{
                        color: "var(--color-fsk-15)",
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: "var(--spacing-fsk-17)",
                      }}
                    >
                      <ArrowLeft size={14} /> Back to Sign In
                    </Link>

                    <Surface>
                      Need an account?{' '}
                      <Link
                        to="/register"
                        style={{ color: "var(--color-fsk-15)", fontWeight: 600, textDecoration: 'none' }}
                      >
                        Register
                      </Link>
                    </Surface>
                  </Surface>
                </VStack>
              </form>
            )}
          </Card>
        </Surface>

        {/* Right Side: Security Context & Troubleshooting */}
        <Surface
          style={{
            background: "var(--color-fsk-27)",
            padding: "var(--spacing-fsk-1) var(--spacing-fsk-114)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
          }}
        >
          <Surface
            style={{
              width: "var(--spacing-fsk-128)",
              height: "var(--spacing-fsk-128)",
              borderRadius: "var(--radius-fsk-28)",
              background: "var(--color-fsk-112)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: "var(--color-fsk-15)",
              marginBottom: "var(--spacing-fsk-2)",
            }}
          >
            <ShieldCheck size={28} />
          </Surface>

          <h3 style={{ fontSize: "var(--font-fsk-61)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-8)" }}>
            Account Security & Access
          </h3>

          <p
            style={{
              fontSize: "var(--font-fsk-24)",
              color: "var(--color-fsk-9)",
              lineHeight: 1.6,
              marginBottom: "var(--spacing-fsk-26)",
            }}
          >
            Password recovery requests communicate directly with the verified Finservkart security service (<code>user-password-recovery.php</code>), ensuring encrypted delivery to your registered email address.
          </p>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-2)" }}>
            <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-8)", alignItems: 'flex-start' }}>
              <Mail size={18} color="var(--color-fsk-15)" style={{ flexShrink: 0, marginTop: "var(--spacing-fsk-47)" }} />
              <Surface>
                <strong style={{ fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-113)" }}>Check Official Sender</strong>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
                  Official emails arrive from <code>info@finservkart.com</code>. Check both Inbox and Spam folders.
                </Surface>
              </Surface>
            </Surface>

            <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-8)", alignItems: 'flex-start' }}>
              <UserCheck size={18} color="var(--color-fsk-31)" style={{ flexShrink: 0, marginTop: "var(--spacing-fsk-47)" }} />
              <Surface>
                <strong style={{ fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-113)" }}>Partner Portals</strong>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
                  Agent, Franchise, and CA partners can also recover credentials using their registered email.
                </Surface>
              </Surface>
            </Surface>

            <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-8)", alignItems: 'flex-start' }}>
              <HelpCircle size={18} color="var(--color-fsk-32)" style={{ flexShrink: 0, marginTop: "var(--spacing-fsk-47)" }} />
              <Surface>
                <strong style={{ fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-113)" }}>Help & Phone Assistance</strong>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
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
