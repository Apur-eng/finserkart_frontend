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
    <Surface style={{ maxWidth: "var(--spacing-fsk-72)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-29)" }}>
          <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-70)" }}>Franchise Partnership</Inline>
          <Inline style={{ color: "var(--color-fsk-59)" }}>•</Inline>
          <Badge label={`ID: ${franchise.id}`} variant="blue" />
        </Surface>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Franchise Profile &amp; Territory Settings
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Manage your franchise corporate credentials, authorized regional territory, RTGS banking, and security access.
        </p>
      </Surface>

      {feedbackMessage && (
        <Surface style={{ marginBottom: "var(--spacing-fsk-2)" }}>
          <Banner
            status="success"
            title="Update Complete"
            description={feedbackMessage}
          />
        </Surface>
      )}

      {/* Tabs */}
      <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", marginBottom: "var(--spacing-fsk-26)" }}>
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
              padding: "var(--spacing-fsk-35) var(--spacing-fsk-36)",
              border: 'none',
              borderBottom: activeTab === tab.key ? "var(--spacing-fsk-47) solid var(--color-fsk-70)" : "var(--spacing-fsk-47) solid transparent",
              background: 'none',
              color: activeTab === tab.key ? "var(--color-fsk-70)" : "var(--color-fsk-9)",
              fontWeight: activeTab === tab.key ? 700 : 500,
              fontSize: "var(--font-fsk-14)",
              cursor: 'pointer',
              marginBottom: "var(--spacing-fsk-96)",
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </Surface>

      {/* Tab 1: Profile & Territory */}
      {activeTab === 'profile' && (
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-26)" }}>
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-5)" }}>
              Corporate Identity &amp; Authorization
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-5)", fontSize: "var(--font-fsk-14)" }}>
              <Surface style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", textTransform: 'uppercase', fontWeight: 600 }}>Franchise Name</Surface>
                <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-47)" }}>{franchise.name}</Surface>
              </Surface>

              <Surface style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", textTransform: 'uppercase', fontWeight: 600 }}>Managing Director</Surface>
                <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-47)" }}>{franchise.directorName}</Surface>
              </Surface>

              <Surface style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", textTransform: 'uppercase', fontWeight: 600 }}>Official Email</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-47)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-17)" }}>
                  <Mail size={14} color="var(--color-fsk-9)" /> {franchise.email}
                </Surface>
              </Surface>

              <Surface style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", textTransform: 'uppercase', fontWeight: 600 }}>Contact Phone</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-47)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-17)" }}>
                  <Phone size={14} color="var(--color-fsk-9)" /> {franchise.phone}
                </Surface>
              </Surface>

              <Surface style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", textTransform: 'uppercase', fontWeight: 600 }}>Franchise GSTIN</Surface>
                <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-47)", fontFamily: 'monospace' }}>{franchise.gstin}</Surface>
              </Surface>

              <Surface style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", textTransform: 'uppercase', fontWeight: 600 }}>Master Franchise Referral Code</Surface>
                <Surface style={{ fontWeight: 800, color: "var(--color-fsk-70)", marginTop: "var(--spacing-fsk-47)", fontFamily: 'monospace' }}>{franchise.referralCode}</Surface>
              </Surface>
            </Surface>
          </Card>

          {/* Territory Details */}
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-23)" }}>
              <Building2 size={18} color="var(--color-fsk-70)" />
              <Inline style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Authorized Regional Territory</Inline>
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-23)", fontSize: "var(--font-fsk-14)" }}>
              <Surface style={{ padding: "var(--spacing-fsk-8)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Inline style={{ color: "var(--color-fsk-9)", display: 'block', fontSize: "var(--font-fsk-14)", textTransform: 'uppercase' }}>Jurisdiction Territory</Inline>
                <strong style={{ color: "var(--color-fsk-7)" }}>{franchise.territory}</strong>
              </Surface>
              <Surface style={{ padding: "var(--spacing-fsk-8)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Inline style={{ color: "var(--color-fsk-9)", display: 'block', fontSize: "var(--font-fsk-14)", textTransform: 'uppercase' }}>Franchise Headquarters Office</Inline>
                <Inline style={{ color: "var(--color-fsk-7)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                  <MapPin size={13} color="var(--color-fsk-9)" /> {franchise.officeAddress}
                </Inline>
              </Surface>
            </Surface>
          </Card>
        </Surface>
      )}

      {/* Tab 2: Bank Details */}
      {activeTab === 'bank' && (
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-5)" }}>
            <Building2 size={18} color="var(--color-fsk-70)" />
            <Inline style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Corporate RTGS Settlement Account</Inline>
          </Surface>

          <form onSubmit={handleUpdateBank}>
            <VStack gap={3}>
              <TextInput
                label="Bank Name"
                placeholder="ICICI Bank"
                value={bankName}
                onChange={(val) => setBankName(val)}
                isRequired
                width="100%"
              />

              <TextInput
                label="Branch"
                placeholder="Vibhuti Khand Branch"
                value={branch}
                onChange={(val) => setBranch(val)}
                isRequired
                width="100%"
              />

              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-23)" }}>
                <TextInput
                  label="Corporate Account Number"
                  placeholder="003405012938"
                  value={accountNo}
                  onChange={(val) => setAccountNo(val)}
                  isRequired
                  width="100%"
                />
                <TextInput
                  label="IFSC Code"
                  placeholder="ICIC0000034"
                  value={ifsc}
                  onChange={(val) => setIfsc(val.toUpperCase())}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface style={{ marginTop: "var(--spacing-fsk-8)" }}>
                <Button
                  label="Save Bank Account"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<Save size={16} />}
                />
              </Surface>
            </VStack>
          </form>
        </Card>
      )}

      {/* Tab 3: Security */}
      {activeTab === 'security' && (
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-5)" }}>
            <Lock size={18} color="var(--color-fsk-70)" />
            <Inline style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Change Password</Inline>
          </Surface>

          <form onSubmit={handleUpdatePassword}>
            <VStack gap={3}>
              <TextInput
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(val) => setCurrentPassword(val)}
                isRequired
                width="100%"
              />

              <TextInput
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(val) => setNewPassword(val)}
                isRequired
                width="100%"
              />

              <TextInput
                label="Confirm New Password"
                type="password"
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
                  isDisabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                />
              </Surface>
            </VStack>
          </form>
        </Card>
      )}
    </Surface>
  );
};

export default FranchiseProfilePage;
