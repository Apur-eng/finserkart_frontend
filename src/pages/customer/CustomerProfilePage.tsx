import { Notice, ActionButton, Panel, Title, Field, Stack } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "60rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.25rem" }}>
          <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--blue)" }}>Account Management</Inline>
          <Inline style={{ color: "#cbd5e1" }}>•</Inline>
          <Badge label={`CustID: ${profile.CustID}`} variant="blue" />
        </Surface>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Customer Profile & Settings
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Manage your personal identity, registered business enterprise, verified banking details, and account security credentials.
        </p>
      </Surface>

      {feedbackMessage && (
        <Surface style={{ marginBottom: "1.25rem" }}>
          <Notice
            status={feedbackMessage.includes('not match') ? 'error' : 'success'}
            title={feedbackMessage}
          />
        </Surface>
      )}

      {/* Tabs */}
      <Surface style={{ display: 'flex', gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "0.0625rem solid var(--border)", paddingBottom: "0.75rem" }}>
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
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: 'none',
                background: isActive ? "#e0f2fe" : 'transparent',
                color: isActive ? "var(--blue)" : "var(--muted)",
                fontSize: "0.8125rem",
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
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1.25rem" }}>
            Personal Identification
          </Surface>

          <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1.25rem", fontSize: "0.8125rem" }}>
            <Surface>
              <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block', marginBottom: "0.25rem" }}>First Name</Inline>
              <strong style={{ color: "var(--navy)", fontSize: "0.9375rem" }}>{profile.fname}</strong>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block', marginBottom: "0.25rem" }}>Last Name</Inline>
              <strong style={{ color: "var(--navy)", fontSize: "0.9375rem" }}>{profile.lname}</strong>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block', marginBottom: "0.25rem" }}>Registered Email</Inline>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.375rem", color: "var(--navy)", fontWeight: 600 }}>
                <Mail size={15} color="var(--blue)" /> {profile.email}
              </Surface>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block', marginBottom: "0.25rem" }}>Contact Phone</Inline>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.375rem", color: "var(--navy)", fontWeight: 600 }}>
                <Phone size={15} color="var(--blue)" /> {profile.contact}
              </Surface>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block', marginBottom: "0.25rem" }}>Assigned Agent</Inline>
              <strong style={{ color: "var(--navy)" }}>{profile.agentName}</strong> ({profile.agentId})
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block', marginBottom: "0.25rem" }}>Member Since</Inline>
              <strong style={{ color: "var(--navy)" }}>{profile.memberSince}</strong>
            </Surface>
          </Surface>
        </Panel>
      )}

      {/* Tab 2: Business & Tax Data */}
      {activeTab === 'business' && (
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1.25rem" }}>
            Registered Business Enterprise
          </Surface>

          <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1.25rem", fontSize: "0.8125rem" }}>
            <Surface>
              <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block', marginBottom: "0.25rem" }}>Business Entity Name</Inline>
              <strong style={{ color: "var(--navy)", fontSize: "0.9375rem" }}>{profile.businessName}</strong>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block', marginBottom: "0.25rem" }}>PAN Number</Inline>
              <strong style={{ color: "var(--navy)", fontSize: "0.9375rem" }}>{profile.pan}</strong>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block', marginBottom: "0.25rem" }}>GSTIN</Inline>
              <strong style={{ color: "var(--blue)", fontSize: "0.9375rem" }}>{profile.gstin}</strong>
            </Surface>
            <Surface>
              <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block', marginBottom: "0.25rem" }}>City &amp; State</Inline>
              <strong style={{ color: "var(--navy)" }}>{profile.city}, {profile.state} ({profile.pincode})</strong>
            </Surface>
            <Surface style={{ gridColumn: 'span 2' }}>
              <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block', marginBottom: "0.25rem" }}>Operating Address</Inline>
              <strong style={{ color: "var(--navy)" }}>{profile.address}</strong>
            </Surface>
          </Surface>
        </Panel>
      )}

      {/* Tab 3: Bank Details Form */}
      {activeTab === 'bank' && (
        <form onSubmit={handleSaveBankDetails}>
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.5rem" }}>
              Bank Account for Reimbursements &amp; Refunds
            </Surface>
            <p style={{ color: "var(--muted)", fontSize: "0.8125rem", marginBottom: "1.25rem" }}>
              Preserved in database columns <code>bank</code>, <code>branch</code>, <code>ACNo</code>, <code>IFSE</code> under customer session.
            </p>

            <Stack gap={3}>
              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
                <Field
                  label="Bank Name"
                  placeholder="e.g. HDFC Bank"
                  value={bankName}
                  onChange={(val) => setBankName(val)}
                  isRequired
                  width="100%"
                />
                <Field
                  label="Branch"
                  placeholder="e.g. Hazratganj Branch"
                  value={branch}
                  onChange={(val) => setBranch(val)}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
                <Field
                  label="Account Number"
                  placeholder="Enter full account number"
                  value={accountNo}
                  onChange={(val) => setAccountNo(val)}
                  isRequired
                  width="100%"
                />
                <Field
                  label="IFSC Code"
                  placeholder="e.g. HDFC0000123"
                  value={ifsc}
                  onChange={(val) => setIfsc(val.toUpperCase())}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface style={{ marginTop: "0.75rem" }}>
                <ActionButton
                  label="Save Bank Details"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<Save size={16} />}
                />
              </Surface>
            </Stack>
          </Panel>
        </form>
      )}

      {/* Tab 4: Security & Password */}
      {activeTab === 'security' && (
        <form onSubmit={handleUpdatePassword}>
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", maxWidth: "35rem" }}>
            <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.5rem" }}>
              Update Account Password
            </Surface>
            <p style={{ color: "var(--muted)", fontSize: "0.8125rem", marginBottom: "1.25rem" }}>
              Ensure your account uses a secure password with at least 8 characters.
            </p>

            <Stack gap={3}>
              <Field
                type="password"
                label="Current Password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(val) => setCurrentPassword(val)}
                isRequired
                width="100%"
              />

              <Field
                type="password"
                label="New Password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(val) => setNewPassword(val)}
                isRequired
                width="100%"
              />

              <Field
                type="password"
                label="Confirm New Password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(val) => setConfirmPassword(val)}
                isRequired
                width="100%"
              />

              <Surface style={{ marginTop: "0.75rem" }}>
                <ActionButton
                  label="Update Password"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<KeyRound size={16} />}
                />
              </Surface>
            </Stack>
          </Panel>
        </form>
      )}
    </Surface>
  );
};

export default CustomerProfilePage;
