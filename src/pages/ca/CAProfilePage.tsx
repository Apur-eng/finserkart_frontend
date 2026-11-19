import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-72)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-29)" }}>
          <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-41)" }}>Regulatory Counsel</Inline>
          <Inline style={{ color: "var(--color-fsk-59)" }}>•</Inline>
          <Badge label={`ICAI: ${ca.membershipNo}`} variant="purple" />
        </Surface>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            CA Professional Profile &amp; Practice
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Manage your chartered accountancy credentials, Certificate of Practice (COP), practicing firm, and payout accounts.
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
          { key: 'profile', label: 'ICAI Credentials & Firm' },
          { key: 'bank', label: 'Professional Payout Bank' },
          { key: 'security', label: 'Password & Security' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: "var(--spacing-fsk-35) var(--spacing-fsk-36)",
              border: 'none',
              borderBottom: activeTab === tab.key ? "var(--spacing-fsk-47) solid var(--color-fsk-41)" : "var(--spacing-fsk-47) solid transparent",
              background: 'none',
              color: activeTab === tab.key ? "var(--color-fsk-41)" : "var(--color-fsk-9)",
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

      {/* Tab 1: Profile & Credentials */}
      {activeTab === 'profile' && (
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-26)" }}>
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-5)" }}>
              <Scale size={20} color="var(--color-fsk-41)" />
              <Inline style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>ICAI Credentials &amp; Verification</Inline>
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-5)", fontSize: "var(--font-fsk-14)" }}>
              <Surface style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", textTransform: 'uppercase', fontWeight: 600 }}>Practicing Chartered Accountant</Surface>
                <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-47)" }}>CA {ca.fname} {ca.lname}</Surface>
              </Surface>

              <Surface style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", textTransform: 'uppercase', fontWeight: 600 }}>ICAI Membership No</Surface>
                <Surface style={{ fontWeight: 800, color: "var(--color-fsk-41)", marginTop: "var(--spacing-fsk-47)", fontFamily: 'monospace' }}>{ca.membershipNo}</Surface>
              </Surface>

              <Surface style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", textTransform: 'uppercase', fontWeight: 600 }}>Certificate of Practice (COP)</Surface>
                <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-47)", fontFamily: 'monospace' }}>{ca.copNo}</Surface>
              </Surface>

              <Surface style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", textTransform: 'uppercase', fontWeight: 600 }}>Professional Title</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-47)" }}>{ca.title}</Surface>
              </Surface>

              <Surface style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", textTransform: 'uppercase', fontWeight: 600 }}>Official Email</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-47)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-17)" }}>
                  <Mail size={14} color="var(--color-fsk-9)" /> {ca.email}
                </Surface>
              </Surface>

              <Surface style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", textTransform: 'uppercase', fontWeight: 600 }}>Direct Contact Phone</Surface>
                <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-47)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-17)" }}>
                  <Phone size={14} color="var(--color-fsk-9)" /> {ca.phone}
                </Surface>
              </Surface>
            </Surface>
          </Card>

          {/* Firm & Specializations */}
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-23)" }}>
              <Building2 size={18} color="var(--color-fsk-41)" />
              <Inline style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Practicing Firm &amp; Office Location</Inline>
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-5)", fontSize: "var(--font-fsk-14)", marginBottom: "var(--spacing-fsk-2)" }}>
              <Surface style={{ padding: "var(--spacing-fsk-8)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Inline style={{ color: "var(--color-fsk-9)", display: 'block', fontSize: "var(--font-fsk-14)", textTransform: 'uppercase' }}>Chartered Accountancy Firm</Inline>
                <strong style={{ color: "var(--color-fsk-7)" }}>{ca.firmName}</strong>
              </Surface>

              <Surface style={{ padding: "var(--spacing-fsk-8)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                <Inline style={{ color: "var(--color-fsk-9)", display: 'block', fontSize: "var(--font-fsk-14)", textTransform: 'uppercase' }}>Office Chambers</Inline>
                <Inline style={{ color: "var(--color-fsk-7)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                  <MapPin size={13} color="var(--color-fsk-9)" /> {ca.officeAddress}, {ca.city} ({ca.pincode})
                </Inline>
              </Surface>
            </Surface>

            <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-12)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-17)" }}>
              <Award size={16} color="var(--color-fsk-41)" /> Approved Regulatory Specializations
            </Surface>

            <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-12)" }}>
              {ca.specializations.map((spec) => (
                <Badge key={spec} label={spec} variant="purple" />
              ))}
            </Surface>
          </Card>
        </Surface>
      )}

      {/* Tab 2: Bank Details */}
      {activeTab === 'bank' && (
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-5)" }}>
            <Building2 size={18} color="var(--color-fsk-41)" />
            <Inline style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Professional Fee Settlement Account</Inline>
          </Surface>

          <form onSubmit={handleUpdateBank}>
            <VStack gap={3}>
              <TextInput
                label="Bank Name"
                placeholder="Punjab National Bank"
                value={bankName}
                onChange={(val) => setBankName(val)}
                isRequired
                width="100%"
              />

              <TextInput
                label="Branch"
                placeholder="Gomti Nagar Branch"
                value={branch}
                onChange={(val) => setBranch(val)}
                isRequired
                width="100%"
              />

              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-23)" }}>
                <TextInput
                  label="Account Number"
                  placeholder="1092837465012"
                  value={accountNo}
                  onChange={(val) => setAccountNo(val)}
                  isRequired
                  width="100%"
                />
                <TextInput
                  label="IFSC Code"
                  placeholder="PUNB0109200"
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
            <Lock size={18} color="var(--color-fsk-41)" />
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

export default CAProfilePage;
