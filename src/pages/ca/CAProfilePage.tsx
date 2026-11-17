import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#7c3aed' }}>Regulatory Counsel</span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <Badge label={`ICAI: ${ca.membershipNo}`} variant="purple" />
        </div>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            CA Professional Profile &amp; Practice
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Manage your chartered accountancy credentials, Certificate of Practice (COP), practicing firm, and payout accounts.
        </p>
      </div>

      {feedbackMessage && (
        <div style={{ marginBottom: '20px' }}>
          <Banner
            status="success"
            title="Update Complete"
            description={feedbackMessage}
          />
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
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
              padding: '10px 18px',
              border: 'none',
              borderBottom: activeTab === tab.key ? '2px solid #7c3aed' : '2px solid transparent',
              background: 'none',
              color: activeTab === tab.key ? '#7c3aed' : '#64748b',
              fontWeight: activeTab === tab.key ? 700 : 500,
              fontSize: '13.5px',
              cursor: 'pointer',
              marginBottom: '-1px',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Profile & Credentials */}
      {activeTab === 'profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Scale size={20} color="#7c3aed" />
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>ICAI Credentials &amp; Verification</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', fontSize: '13.5px' }}>
              <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Practicing Chartered Accountant</div>
                <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>CA {ca.fname} {ca.lname}</div>
              </div>

              <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>ICAI Membership No</div>
                <div style={{ fontWeight: 800, color: '#7c3aed', marginTop: '2px', fontFamily: 'monospace' }}>{ca.membershipNo}</div>
              </div>

              <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Certificate of Practice (COP)</div>
                <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px', fontFamily: 'monospace' }}>{ca.copNo}</div>
              </div>

              <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Professional Title</div>
                <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>{ca.title}</div>
              </div>

              <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Official Email</div>
                <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} color="#64748b" /> {ca.email}
                </div>
              </div>

              <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Direct Contact Phone</div>
                <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} color="#64748b" /> {ca.phone}
                </div>
              </div>
            </div>
          </Card>

          {/* Firm & Specializations */}
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Building2 size={18} color="#7c3aed" />
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Practicing Firm &amp; Office Location</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', fontSize: '13px', marginBottom: '20px' }}>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Chartered Accountancy Firm</span>
                <strong style={{ color: '#0f172a' }}>{ca.firmName}</strong>
              </div>

              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Office Chambers</span>
                <span style={{ color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} color="#64748b" /> {ca.officeAddress}, {ca.city} ({ca.pincode})
                </span>
              </div>
            </div>

            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} color="#7c3aed" /> Approved Regulatory Specializations
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {ca.specializations.map((spec) => (
                <Badge key={spec} label={spec} variant="purple" />
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Bank Details */}
      {activeTab === 'bank' && (
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Building2 size={18} color="#7c3aed" />
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Professional Fee Settlement Account</span>
          </div>

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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
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
              </div>

              <div style={{ marginTop: '12px' }}>
                <Button
                  label="Save Bank Account"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<Save size={16} />}
                />
              </div>
            </VStack>
          </form>
        </Card>
      )}

      {/* Tab 3: Security */}
      {activeTab === 'security' && (
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Lock size={18} color="#7c3aed" />
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Change Password</span>
          </div>

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

              <div style={{ marginTop: '12px' }}>
                <Button
                  label="Update Password"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<KeyRound size={16} />}
                  isDisabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                />
              </div>
            </VStack>
          </form>
        </Card>
      )}
    </div>
  );
};

export default CAProfilePage;
