import { Surface, Inline } from '../components/Surface';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-137)", margin: "var(--spacing-fsk-1) auto var(--spacing-fsk-3) auto", padding: "0 var(--spacing-fsk-2)" }}>
      <Surface style={{ textAlign: 'center', marginBottom: "var(--spacing-fsk-114)" }}>
        <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-15)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          New Client Registration
        </Inline>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-95)", fontWeight: 800, color: "var(--color-fsk-7)", display: 'block', marginTop: "var(--spacing-fsk-17)" }}>
            Create Your Customer Account
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-19)", marginTop: "var(--spacing-fsk-17)" }}>
          Register to apply for financial services, track application workflows, and manage compliance documents.
        </p>
      </Surface>

      <Card elevation="low" padding={4}>
        {/* Error banner */}
        {errorMessage && (
          <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
            <Banner status="error" title={errorMessage} />
          </Surface>
        )}

        {/* Success banner */}
        {successMessage && (
          <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
            <Banner status="success" title={successMessage} />
          </Surface>
        )}

        <form onSubmit={handleSubmit}>
          <VStack gap={4}>
            {/* Name Fields */}
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
              <Surface>
                <TextInput
                  label="First Name"
                  placeholder="e.g. John"
                  value={fname}
                  onChange={(val) => setFname(val)}
                  isRequired
                  width="100%"
                  startIcon={User}
                />
              </Surface>
              <Surface>
                <TextInput
                  label="Last Name"
                  placeholder="e.g. Doe"
                  value={lname}
                  onChange={(val) => setLname(val)}
                  isRequired
                  width="100%"
                  startIcon={User}
                />
              </Surface>
            </Surface>

            {/* Email & Phone */}
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
              <Surface>
                <TextInput
                  type="email"
                  label="Email Address"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(val) => { setEmail(val); setEmailWarning(null); }}
                  isRequired
                  width="100%"
                  startIcon={Mail}
                  onKeyDown={(e) => { if (e.key === 'Tab') handleEmailBlur(); }}
                />
                {emailWarning && (
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-129)", marginTop: "var(--spacing-fsk-29)" }}>
                    {emailWarning}
                  </Surface>
                )}
              </Surface>

              <Surface>
                <TextInput
                  type="tel"
                  label="Mobile Contact"
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(val) => { setPhone(val); setPhoneWarning(null); }}
                  isRequired
                  width="100%"
                  startIcon={Phone}
                  onKeyDown={(e) => { if (e.key === 'Tab') handlePhoneBlur(); }}
                />
                {phoneWarning && (
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-129)", marginTop: "var(--spacing-fsk-29)" }}>
                    {phoneWarning}
                  </Surface>
                )}
              </Surface>
            </Surface>

            {/* Address & Pincode */}
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
              <Surface>
                <TextInput
                  label="Street Address"
                  placeholder="Full business or residence address"
                  value={address}
                  onChange={(val) => setAddress(val)}
                  isRequired
                  width="100%"
                  startIcon={MapPin}
                />
              </Surface>
              <Surface>
                <TextInput
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
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
              <Surface>
                <TextInput
                  type="password"
                  label="Account Password"
                  placeholder="Create secure password"
                  value={password}
                  onChange={(val) => setPassword(val)}
                  isRequired
                  width="100%"
                  startIcon={Lock}
                />
              </Surface>

              <Surface>
                <TextInput
                  label="Agent Referral Code (Optional)"
                  placeholder="e.g. AG1234 or leave blank"
                  value={referral}
                  onChange={(val) => { setReferral(val); setReferralValid(null); }}
                  width="100%"
                  onKeyDown={(e) => { if (e.key === 'Tab') handleReferralBlur(); }}
                />
                {referralValid === true && (
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-31)", marginTop: "var(--spacing-fsk-29)" }}>
                    ✓ Valid agent referral code
                  </Surface>
                )}
                {referralValid === false && (
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-32)", marginTop: "var(--spacing-fsk-29)" }}>
                    ⚠ Referral code not found. You can still register without it.
                  </Surface>
                )}
              </Surface>
            </Surface>

            {/* Submit */}
            <Surface style={{ marginTop: "var(--spacing-fsk-12)" }}>
              <Button
                label={isLoading ? 'Creating Account...' : 'Complete Customer Registration'}
                variant="primary"
                size="lg"
                width="100%"
                type="submit"
                isLoading={isLoading}
              />
            </Surface>
          </VStack>
        </form>

        <Surface style={{ marginTop: "var(--spacing-fsk-26)", paddingTop: "var(--spacing-fsk-5)", borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-46)", textAlign: 'center', fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-9)" }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: "var(--color-fsk-15)", fontWeight: 600, textDecoration: 'none' }}>
            Sign In Here
          </Link>
        </Surface>
      </Card>

      {/* Security note */}
      <Surface style={{ marginTop: "var(--spacing-fsk-26)", textAlign: 'center', fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "var(--spacing-fsk-12)" }}>
        <ShieldCheck size={16} color="var(--color-fsk-31)" />
        <Inline>Your data is protected under Finservkart Privacy & Encryption policies.</Inline>
      </Surface>
    </Surface>
  );
};

export default RegisterPage;

