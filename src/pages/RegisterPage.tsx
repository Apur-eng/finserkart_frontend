import { Notice, ActionButton, Panel, Title, Field, Stack } from '../components/ui';
import { Surface, Inline } from '../components/Surface';
import { Lock, Mail, MapPin, Phone, ShieldCheck, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { generateCustomerId } from '../utils/formatters';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');

  const [emailWarning, setEmailWarning] = useState<string | null>(null);
  const [phoneWarning, setPhoneWarning] = useState<string | null>(null);
  const [referralValid, setReferralValid] = useState<boolean | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Email duplicate check on blur
  const handleEmailBlur = async () => {
    if (!email || !email.includes('@')) return;
    try {
      const res = await api.checkCustomerEmail(email.trim().toLowerCase());
      if (res && res.exists) {
        setEmailWarning('This email is already registered. Please login or use another email.');
      } else {
        setEmailWarning(null);
      }
    } catch {
      // Ignore network errors on passive check
    }
  };

  // Phone duplicate check on blur
  const handlePhoneBlur = async () => {
    if (!phone || phone.length < 10) return;
    try {
      const res = await api.checkCustomerPhone(phone.trim());
      if (res && res.exists) {
        setPhoneWarning('This contact number is already registered.');
      } else {
        setPhoneWarning(null);
      }
    } catch {
      // Ignore network check errors
    }
  };

  // Referral verification on blur
  const handleReferralBlur = async () => {
    if (!referral || referral.trim() === '') {
      setReferralValid(null);
      return;
    }
    try {
      const res = await api.checkReferral(referral.trim());
      if (res && res.exists) {
        setReferralValid(true);
      } else {
        setReferralValid(false);
      }
    } catch {
      setReferralValid(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!fname || !lname || !email || !phone || !address || !pincode || !password) {
      setErrorMessage('Please fill in all mandatory registration fields.');
      return;
    }

    if (emailWarning || phoneWarning) {
      setErrorMessage('Please resolve existing account warnings before proceeding.');
      return;
    }

    setIsLoading(true);
    try {
      const customerId = generateCustomerId();
      const response = await api.registerCustomer({
        CID: customerId,
        fname: fname.trim(),
        lname: lname.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        address: address.trim(),
        pincode: pincode.trim(),
        password: password,
        referral: referral.trim(),
        CProfile: 'avatar.png',
      });

      if (response.status === 'success' || response.status === 'partial') {
        setSuccessMessage(
          response.message || 'Registration successful! Redirecting to login...'
        );
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setErrorMessage(response.message || 'Registration failed. Please try again.');
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Network error during registration.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Surface style={{ maxWidth: "52.5rem", margin: "clamp(1rem, 3.076923076923077vw, 2.5rem) auto clamp(1rem, 6.153846153846154vw, 5rem) auto", padding: "0 1.25rem" }}>
      <Surface style={{ textAlign: 'center', marginBottom: "clamp(1rem, 2.4615384615384617vw, 2rem)" }}>
        <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--blue)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          New Client Registration
        </Inline>
        <Title level={1}>
          <Inline style={{ fontSize: "clamp(1.5rem, 2.4615384615384617vw, 2rem)", fontWeight: 800, color: "var(--navy)", display: 'block', marginTop: "0.375rem" }}>
            Create Your Customer Account
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.9375rem", marginTop: "0.375rem" }}>
          Register to apply for financial services, track application workflows, and manage compliance documents.
        </p>
      </Surface>

      <Panel elevation="low" padding={4}>
        {/* Error banner */}
        {errorMessage && (
          <Surface style={{ marginBottom: "1.5rem" }}>
            <Notice status="error" title={errorMessage} />
          </Surface>
        )}

        {/* Success banner */}
        {successMessage && (
          <Surface style={{ marginBottom: "1.5rem" }}>
            <Notice status="success" title={successMessage} />
          </Surface>
        )}

        <form onSubmit={handleSubmit}>
          <Stack gap={4}>
            {/* Name Fields */}
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
              <Surface>
                <Field
                  label="First Name"
                  placeholder="e.g. John"
                  value={fname}
                  onChange={(val) => setFname(val)}
                  isRequired
                  width="100%"
                  startIcon={<User size={18} />}
                />
              </Surface>
              <Surface>
                <Field
                  label="Last Name"
                  placeholder="e.g. Doe"
                  value={lname}
                  onChange={(val) => setLname(val)}
                  isRequired
                  width="100%"
                  startIcon={<User size={18} />}
                />
              </Surface>
            </Surface>

            {/* Email & Phone */}
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
              <Surface>
                <Field
                  type="email"
                  label="Email Address"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(val) => { setEmail(val); setEmailWarning(null); }}
                  isRequired
                  width="100%"
                  startIcon={<Mail size={18} />}
                  onKeyDown={(e) => { if (e.key === 'Tab') handleEmailBlur(); }}
                />
                {emailWarning && (
                  <Surface style={{ fontSize: "0.8125rem", color: "#ef4444", marginTop: "0.25rem" }}>
                    {emailWarning}
                  </Surface>
                )}
              </Surface>

              <Surface>
                <Field
                  type="tel"
                  label="Mobile Contact"
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(val) => { setPhone(val); setPhoneWarning(null); }}
                  isRequired
                  width="100%"
                  startIcon={<Phone size={18} />}
                  onKeyDown={(e) => { if (e.key === 'Tab') handlePhoneBlur(); }}
                />
                {phoneWarning && (
                  <Surface style={{ fontSize: "0.8125rem", color: "#ef4444", marginTop: "0.25rem" }}>
                    {phoneWarning}
                  </Surface>
                )}
              </Surface>
            </Surface>

            {/* Address & Pincode */}
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
              <Surface>
                <Field
                  label="Street Address"
                  placeholder="Full business or residence address"
                  value={address}
                  onChange={(val) => setAddress(val)}
                  isRequired
                  width="100%"
                  startIcon={<MapPin size={18} />}
                />
              </Surface>
              <Surface>
                <Field
                  label="Pincode"
                  placeholder="6-digit code"
                  value={pincode}
                  onChange={(val) => setPincode(val)}
                  isRequired
                  width="100%"
                />
              </Surface>
            </Surface>

            {/* Password & Referral Code */}
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
              <Surface>
                <Field
                  type="password"
                  label="Account Password"
                  placeholder="Create secure password"
                  value={password}
                  onChange={(val) => setPassword(val)}
                  isRequired
                  width="100%"
                  startIcon={<Lock size={18} />}
                />
              </Surface>

              <Surface>
                <Field
                  label="Agent Referral Code (Optional)"
                  placeholder="e.g. AG1234 or leave blank"
                  value={referral}
                  onChange={(val) => { setReferral(val); setReferralValid(null); }}
                  width="100%"
                  onKeyDown={(e) => { if (e.key === 'Tab') handleReferralBlur(); }}
                />
                {referralValid === true && (
                  <Surface style={{ fontSize: "0.8125rem", color: "var(--teal)", marginTop: "0.25rem" }}>
                    ✓ Valid agent referral code
                  </Surface>
                )}
                {referralValid === false && (
                  <Surface style={{ fontSize: "0.8125rem", color: "#f59e0b", marginTop: "0.25rem" }}>
                    ⚠ Referral code not found. You can still register without it.
                  </Surface>
                )}
              </Surface>
            </Surface>

            {/* Submit */}
            <Surface style={{ marginTop: "0.5rem" }}>
              <ActionButton
                label={isLoading ? 'Creating Account...' : 'Complete Customer Registration'}
                variant="primary"
                size="lg"
                width="100%"
                type="submit"
                isLoading={isLoading}
              />
            </Surface>
          </Stack>
        </form>

        <Surface style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "0.0625rem solid var(--sage-light)", textAlign: 'center', fontSize: "0.875rem", color: "var(--muted)" }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: "var(--blue)", fontWeight: 600, textDecoration: 'none' }}>
            Sign In Here
          </Link>
        </Surface>
      </Panel>

      {/* Security note */}
      <Surface style={{ marginTop: "1.5rem", textAlign: 'center', fontSize: "0.8125rem", color: "#687d93", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "0.5rem" }}>
        <ShieldCheck size={16} color="var(--teal)" />
        <Inline>Your data is protected under Finservkart Privacy & Encryption policies.</Inline>
      </Surface>
    </Surface>
  );
};

export default RegisterPage;

