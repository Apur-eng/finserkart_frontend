import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
import {
  Building2,
  KeyRound,
  Lock,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  User
} from 'lucide-react';
import React, { useState } from 'react';
import { INITIAL_CUSTOMER_PROFILE } from '../../features/customer/customerData';

export const CustomerProfilePage: React.FC = () => {
  const [profile, setProfile] = useState(INITIAL_CUSTOMER_PROFILE);
  const [activeTab, setActiveTab] = useState<'profile' | 'business' | 'bank' | 'security'>('profile');

  // Bank Form State
  const [bankName, setBankName] = useState(profile.bank);
  const [branch, setBranch] = useState(profile.branch);
  const [accountNo, setAccountNo] = useState(profile.ACNo);
  const [ifsc, setIfsc] = useState(profile.IFSE);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      bank: bankName,
      branch: branch,
      ACNo: accountNo,
      IFSE: ifsc,
    }));
    setFeedbackMessage('Bank details updated successfully.');
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setFeedbackMessage('New passwords do not match.');
      return;
    }
    setFeedbackMessage('Password updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-72)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-29)" }}>
          <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-15)" }}>Account Management</Inline>
          <Inline style={{ color: "var(--color-fsk-59)" }}>•</Inline>
          <Badge label={`CustID: ${profile.CustID}`} variant="blue" />
        </Surface>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Customer Profile & Settings
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Manage your personal identity, registered business enterprise, verified banking details, and account security credentials.
        </p>
      </Surface>

      {feedbackMessage && (
        <Surface style={{ marginBottom: "var(--spacing-fsk-2)" }}>
          <Banner
            status={feedbackMessage.includes('not match') ? 'error' : 'success'}
            title={feedbackMessage}
          />
        </Surface>
      )}

      {/* Tabs */}
      <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-26)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", paddingBottom: "var(--spacing-fsk-8)" }}>
        {[
          { key: 'profile', label: 'Personal Information', icon: <User size={15} /> },
          { key: 'business', label: 'Business & Tax Data', icon: <Building2 size={15} /> },
          { key: 'bank', label: 'Bank Details', icon: <ShieldCheck size={15} /> },
          { key: 'security', label: 'Password & Security', icon: <Lock size={15} /> },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: "var(--spacing-fsk-12)",
                padding: "var(--spacing-fsk-12) var(--spacing-fsk-5)",
                borderRadius: "var(--radius-fsk-37)",
                border: 'none',
                background: isActive ? "var(--color-fsk-112)" : 'transparent',
                color: isActive ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
                fontSize: "var(--font-fsk-14)",
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {tab.icon}
              <Inline>{tab.label}</Inline>
            </button>
          );
        })}
      </Surface>

      {/* Tab 1: Personal Info */}
      {activeTab === 'profile' && (
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-2)" }}>
            Personal Identification
          </Surface>

          <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-2)", fontSize: "var(--font-fsk-14)" }}>
            <Surface>
              <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block', marginBottom: "var(--spacing-fsk-29)" }}>First Name</Inline>
              <strong style={{ color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-19)" }}>{profile.fname}</strong>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block', marginBottom: "var(--spacing-fsk-29)" }}>Last Name</Inline>
              <strong style={{ color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-19)" }}>{profile.lname}</strong>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block', marginBottom: "var(--spacing-fsk-29)" }}>Registered Email</Inline>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-17)", color: "var(--color-fsk-7)", fontWeight: 600 }}>
                <Mail size={15} color="var(--color-fsk-15)" /> {profile.email}
              </Surface>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block', marginBottom: "var(--spacing-fsk-29)" }}>Contact Phone</Inline>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-17)", color: "var(--color-fsk-7)", fontWeight: 600 }}>
                <Phone size={15} color="var(--color-fsk-15)" /> {profile.contact}
              </Surface>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block', marginBottom: "var(--spacing-fsk-29)" }}>Assigned Agent</Inline>
              <strong style={{ color: "var(--color-fsk-7)" }}>{profile.agentName}</strong> ({profile.agentId})
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block', marginBottom: "var(--spacing-fsk-29)" }}>Member Since</Inline>
              <strong style={{ color: "var(--color-fsk-7)" }}>{profile.memberSince}</strong>
            </Surface>
          </Surface>
        </Card>
      )}

      {/* Tab 2: Business & Tax Data */}
      {activeTab === 'business' && (
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-2)" }}>
            Registered Business Enterprise
          </Surface>

          <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-2)", fontSize: "var(--font-fsk-14)" }}>
            <Surface>
              <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block', marginBottom: "var(--spacing-fsk-29)" }}>Business Entity Name</Inline>
              <strong style={{ color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-19)" }}>{profile.businessName}</strong>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block', marginBottom: "var(--spacing-fsk-29)" }}>PAN Number</Inline>
              <strong style={{ color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-19)" }}>{profile.pan}</strong>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block', marginBottom: "var(--spacing-fsk-29)" }}>GSTIN</Inline>
              <strong style={{ color: "var(--color-fsk-15)", fontSize: "var(--font-fsk-19)" }}>{profile.gstin}</strong>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block', marginBottom: "var(--spacing-fsk-29)" }}>City &amp; State</Inline>
              <strong style={{ color: "var(--color-fsk-7)" }}>{profile.city}, {profile.state} ({profile.pincode})</strong>
            </Surface>
            <Surface style={{ gridColumn: 'span 2' }}>
              <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block', marginBottom: "var(--spacing-fsk-29)" }}>Operating Address</Inline>
              <strong style={{ color: "var(--color-fsk-7)" }}>{profile.address}</strong>
            </Surface>
          </Surface>
        </Card>
      )}

      {/* Tab 3: Bank Details Form */}
      {activeTab === 'bank' && (
        <form onSubmit={handleSaveBankDetails}>
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-12)" }}>
              Bank Account for Reimbursements &amp; Refunds
            </Surface>
            <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", marginBottom: "var(--spacing-fsk-2)" }}>
              Preserved in database columns <code>bank</code>, <code>branch</code>, <code>ACNo</code>, <code>IFSE</code> under customer session.
            </p>

            <VStack gap={3}>
              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
                <TextInput
                  label="Bank Name"
                  placeholder="e.g. HDFC Bank"
                  value={bankName}
                  onChange={(val) => setBankName(val)}
                  isRequired
                  width="100%"
                />
                <TextInput
                  label="Branch"
                  placeholder="e.g. Hazratganj Branch"
                  value={branch}
                  onChange={(val) => setBranch(val)}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
                <TextInput
                  label="Account Number"
                  placeholder="Enter full account number"
                  value={accountNo}
                  onChange={(val) => setAccountNo(val)}
                  isRequired
                  width="100%"
                />
                <TextInput
                  label="IFSC Code"
                  placeholder="e.g. HDFC0000123"
                  value={ifsc}
                  onChange={(val) => setIfsc(val.toUpperCase())}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface style={{ marginTop: "var(--spacing-fsk-8)" }}>
                <Button
                  label="Save Bank Details"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<Save size={16} />}
                />
              </Surface>
            </VStack>
          </Card>
        </form>
      )}

      {/* Tab 4: Security & Password */}
      {activeTab === 'security' && (
        <form onSubmit={handleUpdatePassword}>
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", maxWidth: "var(--spacing-fsk-123)" }}>
            <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-12)" }}>
              Update Account Password
            </Surface>
            <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", marginBottom: "var(--spacing-fsk-2)" }}>
              Ensure your account uses a secure password with at least 8 characters.
            </p>

            <VStack gap={3}>
              <TextInput
                type="password"
                label="Current Password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(val) => setCurrentPassword(val)}
                isRequired
                width="100%"
              />

              <TextInput
                type="password"
                label="New Password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(val) => setNewPassword(val)}
                isRequired
                width="100%"
              />

              <TextInput
                type="password"
                label="Confirm New Password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(val) => setConfirmPassword(val)}
                isRequired
                width="100%"
              />

              <Surface style={{ marginTop: "var(--spacing-fsk-8)" }}>
                <Button
                  label="Update Password"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<KeyRound size={16} />}
                />
              </Surface>
            </VStack>
          </Card>
        </form>
      )}
    </Surface>
  );
};

export default CustomerProfilePage;
