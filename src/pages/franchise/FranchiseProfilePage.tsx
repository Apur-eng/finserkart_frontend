import { Notice, ActionButton, Panel, Title, Field, Stack } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  Building2,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save
} from 'lucide-react';
import React, { useState } from 'react';
import { INITIAL_FRANCHISE_PROFILE } from '../../features/franchise/franchiseData';

export const FranchiseProfilePage: React.FC = () => {
  const [franchise, setFranchise] = useState(INITIAL_FRANCHISE_PROFILE);
  const [activeTab, setActiveTab] = useState<'profile' | 'bank' | 'security'>('profile');

  // Bank Form State
  const [bankName, setBankName] = useState(franchise.bank);
  const [branch, setBranch] = useState(franchise.branch);
  const [accountNo, setAccountNo] = useState(franchise.ACNo);
  const [ifsc, setIfsc] = useState(franchise.IFSE);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleUpdateBank = (e: React.FormEvent) => {
    e.preventDefault();
    setFranchise((prev) => ({
      ...prev,
      bank: bankName,
      branch: branch,
      ACNo: accountNo,
      IFSE: ifsc,
    }));
    setFeedbackMessage('Franchise corporate bank details saved successfully.');
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
          <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0284c7" }}>Franchise Partnership</Inline>
          <Inline style={{ color: "#cbd5e1" }}>•</Inline>
          <Badge label={`ID: ${franchise.id}`} variant="blue" />
        </Surface>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Franchise Profile &amp; Territory Settings
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Manage your franchise corporate credentials, authorized regional territory, RTGS banking, and security access.
        </p>
      </Surface>

      {feedbackMessage && (
        <Surface style={{ marginBottom: "1.25rem" }}>
          <Notice
            status="success"
            title="Update Complete"
            description={feedbackMessage}
          />
        </Surface>
      )}

      {/* Tabs */}
      <Surface style={{ display: 'flex', gap: "0.5rem", borderBottom: "0.0625rem solid var(--border)", marginBottom: "1.5rem" }}>
        {[
          { key: 'profile', label: 'Franchise Identity & Territory' },
          { key: 'bank', label: 'Corporate Settlement Bank' },
          { key: 'security', label: 'Password & Security' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: "0.625rem 1.125rem",
              border: 'none',
              borderBottom: activeTab === tab.key ? "0.125rem solid #0284c7" : "0.125rem solid transparent",
              background: 'none',
              color: activeTab === tab.key ? "#0284c7" : "var(--muted)",
              fontWeight: activeTab === tab.key ? 700 : 500,
              fontSize: "0.8125rem",
              cursor: 'pointer',
              marginBottom: "-0.0625rem",
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </Surface>

      {/* Tab 1: Profile & Territory */}
      {activeTab === 'profile' && (
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1.5rem" }}>
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
              Corporate Identity &amp; Authorization
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1rem", fontSize: "0.8125rem" }}>
              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Franchise Name</Surface>
                <Surface style={{ fontWeight: 700, color: "var(--navy)", marginTop: "0.125rem" }}>{franchise.name}</Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Managing Director</Surface>
                <Surface style={{ fontWeight: 700, color: "var(--navy)", marginTop: "0.125rem" }}>{franchise.directorName}</Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Official Email</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--navy)", marginTop: "0.125rem", display: 'flex', alignItems: 'center', gap: "0.375rem" }}>
                  <Mail size={14} color="var(--muted)" /> {franchise.email}
                </Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Contact Phone</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--navy)", marginTop: "0.125rem", display: 'flex', alignItems: 'center', gap: "0.375rem" }}>
                  <Phone size={14} color="var(--muted)" /> {franchise.phone}
                </Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Franchise GSTIN</Surface>
                <Surface style={{ fontWeight: 700, color: "var(--navy)", marginTop: "0.125rem", fontFamily: 'monospace' }}>{franchise.gstin}</Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Master Franchise Referral Code</Surface>
                <Surface style={{ fontWeight: 800, color: "#0284c7", marginTop: "0.125rem", fontFamily: 'monospace' }}>{franchise.referralCode}</Surface>
              </Surface>
            </Surface>
          </Panel>

          {/* Territory Details */}
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.875rem" }}>
              <Building2 size={18} color="#0284c7" />
              <Inline style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Authorized Regional Territory</Inline>
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "0.875rem", fontSize: "0.8125rem" }}>
              <Surface style={{ padding: "0.75rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Inline style={{ color: "var(--muted)", display: 'block', fontSize: "0.8125rem", textTransform: 'uppercase' }}>Jurisdiction Territory</Inline>
                <strong style={{ color: "var(--navy)" }}>{franchise.territory}</strong>
              </Surface>
              <Surface style={{ padding: "0.75rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Inline style={{ color: "var(--muted)", display: 'block', fontSize: "0.8125rem", textTransform: 'uppercase' }}>Franchise Headquarters Office</Inline>
                <Inline style={{ color: "var(--navy)", display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                  <MapPin size={13} color="var(--muted)" /> {franchise.officeAddress}
                </Inline>
              </Surface>
            </Surface>
          </Panel>
        </Surface>
      )}

      {/* Tab 2: Bank Details */}
      {activeTab === 'bank' && (
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "1rem" }}>
            <Building2 size={18} color="#0284c7" />
            <Inline style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Corporate RTGS Settlement Account</Inline>
          </Surface>

          <form onSubmit={handleUpdateBank}>
            <Stack gap={3}>
              <Field
                label="Bank Name"
                placeholder="ICICI Bank"
                value={bankName}
                onChange={(val) => setBankName(val)}
                isRequired
                width="100%"
              />

              <Field
                label="Branch"
                placeholder="Vibhuti Khand Branch"
                value={branch}
                onChange={(val) => setBranch(val)}
                isRequired
                width="100%"
              />

              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "0.875rem" }}>
                <Field
                  label="Corporate Account Number"
                  placeholder="003405012938"
                  value={accountNo}
                  onChange={(val) => setAccountNo(val)}
                  isRequired
                  width="100%"
                />
                <Field
                  label="IFSC Code"
                  placeholder="ICIC0000034"
                  value={ifsc}
                  onChange={(val) => setIfsc(val.toUpperCase())}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface style={{ marginTop: "0.75rem" }}>
                <ActionButton
                  label="Save Bank Account"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<Save size={16} />}
                />
              </Surface>
            </Stack>
          </form>
        </Panel>
      )}

      {/* Tab 3: Security */}
      {activeTab === 'security' && (
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "1rem" }}>
            <Lock size={18} color="#0284c7" />
            <Inline style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Change Password</Inline>
          </Surface>

          <form onSubmit={handleUpdatePassword}>
            <Stack gap={3}>
              <Field
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(val) => setCurrentPassword(val)}
                isRequired
                width="100%"
              />

              <Field
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(val) => setNewPassword(val)}
                isRequired
                width="100%"
              />

              <Field
                label="Confirm New Password"
                type="password"
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
                  isDisabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                />
              </Surface>
            </Stack>
          </form>
        </Panel>
      )}
    </Surface>
  );
};

export default FranchiseProfilePage;
