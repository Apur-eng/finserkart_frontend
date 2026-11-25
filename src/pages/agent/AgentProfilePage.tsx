import { Notice, ActionButton, Panel, Title, Field, Stack } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  Building2,
  KeyRound,
  Lock,
  Mail,
  Phone,
  Save
} from 'lucide-react';
import React, { useState } from 'react';
import { INITIAL_AGENT_PROFILE } from '../../features/agent/agentData';

export const AgentProfilePage: React.FC = () => {
  const [agent, setAgent] = useState(INITIAL_AGENT_PROFILE);
  const [activeTab, setActiveTab] = useState<'profile' | 'bank' | 'security'>('profile');

  // Bank Form State
  const [bankName, setBankName] = useState(agent.bank);
  const [branch, setBranch] = useState(agent.branch);
  const [accountNo, setAccountNo] = useState(agent.ACNo);
  const [ifsc, setIfsc] = useState(agent.IFSE);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleUpdateBank = (e: React.FormEvent) => {
    e.preventDefault();
    setAgent((prev) => ({
      ...prev,
      bank: bankName,
      branch: branch,
      ACNo: accountNo,
      IFSE: ifsc,
    }));
    setFeedbackMessage('Bank details updated successfully for direct settlement.');
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
          <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--teal)" }}>Partner Identity</Inline>
          <Inline style={{ color: "#cbd5e1" }}>•</Inline>
          <Badge label={`Agent ID: ${agent.id}`} variant="green" />
        </Surface>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Agent Partner Profile &amp; Settings
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Manage your partner profile, affiliated franchise, settlement banking details, and portal security.
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
          { key: 'profile', label: 'Agent Identity & Franchise' },
          { key: 'bank', label: 'Settlement Banking Details' },
          { key: 'security', label: 'Password & Security' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: "0.625rem 1.125rem",
              border: 'none',
              borderBottom: activeTab === tab.key ? "0.125rem solid #059669" : "0.125rem solid transparent",
              background: 'none',
              color: activeTab === tab.key ? "var(--teal)" : "var(--muted)",
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

      {/* Tab 1: Profile & Franchise */}
      {activeTab === 'profile' && (
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1.5rem" }}>
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
              Personal Identity &amp; Referral Credentials
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1rem", fontSize: "0.8125rem" }}>
              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Full Name</Surface>
                <Surface style={{ fontWeight: 700, color: "var(--navy)", marginTop: "0.125rem" }}>{agent.fname} {agent.lname}</Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Referral Code</Surface>
                <Surface style={{ fontWeight: 800, color: "var(--teal)", marginTop: "0.125rem", fontFamily: 'monospace' }}>{agent.referralCode}</Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Mobile Number</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--navy)", marginTop: "0.125rem", display: 'flex', alignItems: 'center', gap: "0.375rem" }}>
                  <Phone size={14} color="var(--muted)" /> {agent.phone}
                </Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Email Address</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--navy)", marginTop: "0.125rem", display: 'flex', alignItems: 'center', gap: "0.375rem" }}>
                  <Mail size={14} color="var(--muted)" /> {agent.email}
                </Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Permanent Account Number (PAN)</Surface>
                <Surface style={{ fontWeight: 700, color: "var(--navy)", marginTop: "0.125rem", fontFamily: 'monospace' }}>{agent.pan}</Surface>
              </Surface>

              <Surface style={{ padding: "0.75rem 0.875rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", textTransform: 'uppercase', fontWeight: 600 }}>Regional Headquarters</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--navy)", marginTop: "0.125rem" }}>{agent.city}, {agent.state}</Surface>
              </Surface>
            </Surface>
          </Panel>

          {/* Franchise Affiliation Details */}
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.875rem" }}>
              <Building2 size={18} color="var(--teal)" />
              <Inline style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Affiliated Franchise Office</Inline>
            </Surface>

            <p style={{ color: "var(--muted)", fontSize: "0.8125rem", lineHeight: 1.5, margin: "0 0 1rem 0" }}>
              Your agent activities, commissions, and customer registrations are supervised by the following regional franchise office:
            </p>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))", gap: "0.875rem", fontSize: "0.8125rem" }}>
              <Surface style={{ padding: "0.75rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Inline style={{ color: "var(--muted)", display: 'block', fontSize: "0.8125rem", textTransform: 'uppercase' }}>Franchise Code</Inline>
                <strong style={{ color: "var(--navy)" }}>{agent.franchiseCode}</strong>
              </Surface>
              <Surface style={{ padding: "0.75rem", background: "var(--cream)", borderRadius: "0.5rem", border: "0.0625rem solid var(--border)" }}>
                <Inline style={{ color: "var(--muted)", display: 'block', fontSize: "0.8125rem", textTransform: 'uppercase' }}>Franchise Branch</Inline>
                <strong style={{ color: "var(--navy)" }}>{agent.franchiseName}</strong>
              </Surface>
            </Surface>
          </Panel>
        </Surface>
      )}

      {/* Tab 2: Bank Details */}
      {activeTab === 'bank' && (
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "1rem" }}>
            <Building2 size={18} color="var(--teal)" />
            <Inline style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Settlement Bank Account</Inline>
          </Surface>

          <form onSubmit={handleUpdateBank}>
            <Stack gap={3}>
              <Field
                label="Bank Name"
                placeholder="State Bank of India"
                value={bankName}
                onChange={(val) => setBankName(val)}
                isRequired
                width="100%"
              />

              <Field
                label="Branch"
                placeholder="Hazratganj Main Branch"
                value={branch}
                onChange={(val) => setBranch(val)}
                isRequired
                width="100%"
              />

              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "0.875rem" }}>
                <Field
                  label="Account Number"
                  placeholder="30918239012"
                  value={accountNo}
                  onChange={(val) => setAccountNo(val)}
                  isRequired
                  width="100%"
                />
                <Field
                  label="IFSC Code"
                  placeholder="SBIN0000125"
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
          </form>
        </Panel>
      )}

      {/* Tab 3: Security */}
      {activeTab === 'security' && (
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "1rem" }}>
            <Lock size={18} color="var(--teal)" />
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

export default AgentProfilePage;
