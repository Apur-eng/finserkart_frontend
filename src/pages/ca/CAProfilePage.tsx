import { Notice, ActionButton, Panel, Title, Field, Stack } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  Award,
  Building2,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  Scale
} from 'lucide-react';
import React, { useState } from 'react';
import { INITIAL_CA_PROFILE } from '../../features/ca/caData';

export const CAProfilePage: React.FC = () => {
  const [ca, setCa] = useState(INITIAL_CA_PROFILE);
  const [activeTab, setActiveTab] = useState<'profile' | 'bank' | 'security'>('profile');

  // Bank Form State
  const [bankName, setBankName] = useState(ca.bank);
  const [branch, setBranch] = useState(ca.branch);
  const [accountNo, setAccountNo] = useState(ca.ACNo);
  const [ifsc, setIfsc] = useState(ca.IFSE);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleUpdateBank = (e: React.FormEvent) => {
    e.preventDefault();
    setCa((prev) => ({
      ...prev,
      bank: bankName,
      branch: branch,
      ACNo: accountNo,
      IFSE: ifsc,
    }));
    setFeedbackMessage('CA professional payout bank details updated successfully.');
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
          <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#7c3aed" }}>Regulatory Counsel</Inline>
          <Inline style={{ color: "#cbd5e1" }}>•</Inline>
          <Badge label={`ICAI: ${ca.membershipNo}`} variant="purple" />
        </Surface>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            CA Professional Profile &amp; Practice
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Manage your chartered accountancy credentials, Certificate of Practice (COP), practicing firm, and payout accounts.
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
          { key: 'profile', label: 'ICAI Credentials & Firm' },
          { key: 'bank', label: 'Professional Payout Bank' },
          { key: 'security', label: 'Password & Security' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: "0.625rem 1.125rem",
              border: 'none',
              borderBottom: activeTab === tab.key ? "0.125rem solid #7c3aed" : "0.125rem solid transparent",
              background: 'none',
              color: activeTab === tab.key ? "#7c3aed" : "var(--muted)",
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

      {/* Tab 1: Profile & Credentials */}
      {activeTab === 'profile' && (
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1.5rem" }}>
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "1rem" }}>
              <Scale size={20} color="#7c3aed" />
              <Inline style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>ICAI Credentials &amp; Verification</Inline>
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1rem", fontSize: "0.8125rem" }}>
              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Practicing Chartered Accountant</Surface>
                <Surface style={{ fontWeight: 700, color: "var(--navy)", marginTop: "0.125rem" }}>CA {ca.fname} {ca.lname}</Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>ICAI Membership No</Surface>
                <Surface style={{ fontWeight: 800, color: "#7c3aed", marginTop: "0.125rem", fontFamily: 'monospace' }}>{ca.membershipNo}</Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Certificate of Practice (COP)</Surface>
                <Surface style={{ fontWeight: 700, color: "var(--navy)", marginTop: "0.125rem", fontFamily: 'monospace' }}>{ca.copNo}</Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Professional Title</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--navy)", marginTop: "0.125rem" }}>{ca.title}</Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Official Email</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--navy)", marginTop: "0.125rem", display: 'flex', alignItems: 'center', gap: "0.375rem" }}>
                  <Mail size={14} color="var(--muted)" /> {ca.email}
                </Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Direct Contact Phone</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--navy)", marginTop: "0.125rem", display: 'flex', alignItems: 'center', gap: "0.375rem" }}>
                  <Phone size={14} color="var(--muted)" /> {ca.phone}
                </Surface>
              </Surface>
            </Surface>
          </Panel>

          {/* Firm & Specializations */}
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.875rem" }}>
              <Building2 size={18} color="#7c3aed" />
              <Inline style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Practicing Firm &amp; Office Location</Inline>
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1rem", fontSize: "0.8125rem", marginBottom: "1.25rem" }}>
              <Surface style={{ padding: "0.75rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Inline style={{ color: "var(--muted)", display: 'block', fontSize: "0.8125rem", textTransform: 'uppercase' }}>Chartered Accountancy Firm</Inline>
                <strong style={{ color: "var(--navy)" }}>{ca.firmName}</strong>
              </Surface>

              <Surface style={{ padding: "0.75rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Inline style={{ color: "var(--muted)", display: 'block', fontSize: "0.8125rem", textTransform: 'uppercase' }}>Office Chambers</Inline>
                <Inline style={{ color: "var(--navy)", display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                  <MapPin size={13} color="var(--muted)" /> {ca.officeAddress}, {ca.city} ({ca.pincode})
                </Inline>
              </Surface>
            </Surface>

            <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.5rem", display: 'flex', alignItems: 'center', gap: "0.375rem" }}>
              <Award size={16} color="#7c3aed" /> Approved Regulatory Specializations
            </Surface>

            <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "0.5rem" }}>
              {ca.specializations.map((spec) => (
                <Badge key={spec} label={spec} variant="purple" />
              ))}
            </Surface>
          </Panel>
        </Surface>
      )}

      {/* Tab 2: Bank Details */}
      {activeTab === 'bank' && (
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "1rem" }}>
            <Building2 size={18} color="#7c3aed" />
            <Inline style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Professional Fee Settlement Account</Inline>
          </Surface>

          <form onSubmit={handleUpdateBank}>
            <Stack gap={3}>
              <Field
                label="Bank Name"
                placeholder="Punjab National Bank"
                value={bankName}
                onChange={(val) => setBankName(val)}
                isRequired
                width="100%"
              />

              <Field
                label="Branch"
                placeholder="Gomti Nagar Branch"
                value={branch}
                onChange={(val) => setBranch(val)}
                isRequired
                width="100%"
              />

              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "0.875rem" }}>
                <Field
                  label="Account Number"
                  placeholder="1092837465012"
                  value={accountNo}
                  onChange={(val) => setAccountNo(val)}
                  isRequired
                  width="100%"
                />
                <Field
                  label="IFSC Code"
                  placeholder="PUNB0109200"
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
            <Lock size={18} color="#7c3aed" />
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

export default CAProfilePage;
