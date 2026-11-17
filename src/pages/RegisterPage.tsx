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
    <div style={{ maxWidth: '840px', margin: '40px auto 80px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#0066cc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          New Client Registration
        </span>
        <Heading level={1}>
          <span style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', display: 'block', marginTop: '6px' }}>
            Create Your Customer Account
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '15px', marginTop: '6px' }}>
          Register to apply for financial services, track application workflows, and manage compliance documents.
        </p>
      </div>

      <Card elevation="low" padding={4}>
        {/* Error banner */}
        {errorMessage && (
          <div style={{ marginBottom: '24px' }}>
            <Banner status="error" title={errorMessage} />
          </div>
        )}

        {/* Success banner */}
        {successMessage && (
          <div style={{ marginBottom: '24px' }}>
            <Banner status="success" title={successMessage} />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <VStack gap={4}>
            {/* Name Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <TextInput
                  label="First Name"
                  placeholder="e.g. John"
                  value={fname}
                  onChange={(val) => setFname(val)}
                  isRequired
                  width="100%"
                  startIcon={User}
                />
              </div>
              <div>
                <TextInput
                  label="Last Name"
                  placeholder="e.g. Doe"
                  value={lname}
                  onChange={(val) => setLname(val)}
                  isRequired
                  width="100%"
                  startIcon={User}
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
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
                  <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                    {emailWarning}
                  </div>
                )}
              </div>

              <div>
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
                  <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                    {phoneWarning}
                  </div>
                )}
              </div>
            </div>

            {/* Address & Pincode */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              <div>
                <TextInput
                  label="Street Address"
                  placeholder="Full business or residence address"
                  value={address}
                  onChange={(val) => setAddress(val)}
                  isRequired
                  width="100%"
                  startIcon={MapPin}
                />
              </div>
              <div>
                <TextInput
                  label="Pincode"
                  placeholder="6-digit code"
                  value={pincode}
                  onChange={(val) => setPincode(val)}
                  isRequired
                  width="100%"
                />
              </div>
            </div>

            {/* Password & Referral Code */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
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
              </div>

              <div>
                <TextInput
                  label="Agent Referral Code (Optional)"
                  placeholder="e.g. AG1234 or leave blank"
                  value={referral}
                  onChange={(val) => { setReferral(val); setReferralValid(null); }}
                  width="100%"
                  onKeyDown={(e) => { if (e.key === 'Tab') handleReferralBlur(); }}
                />
                {referralValid === true && (
                  <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>
                    ✓ Valid agent referral code
                  </div>
                )}
                {referralValid === false && (
                  <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '4px' }}>
                    ⚠ Referral code not found. You can still register without it.
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div style={{ marginTop: '8px' }}>
              <Button
                label={isLoading ? 'Creating Account...' : 'Complete Customer Registration'}
                variant="primary"
                size="lg"
                width="100%"
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </VStack>
        </form>

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#0066cc', fontWeight: 600, textDecoration: 'none' }}>
            Sign In Here
          </Link>
        </div>
      </Card>

      {/* Security note */}
      <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <ShieldCheck size={16} color="#10b981" />
        <span>Your data is protected under Finservkart Privacy & Encryption policies.</span>
      </div>
    </div>
  );
};

export default RegisterPage;

