import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0066cc' }}>Account Management</span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <Badge label={`CustID: ${profile.CustID}`} variant="blue" />
        </div>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Customer Profile & Settings
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Manage your personal identity, registered business enterprise, verified banking details, and account security credentials.
        </p>
      </div>

      {feedbackMessage && (
        <div style={{ marginBottom: '20px' }}>
          <Banner
            status={feedbackMessage.includes('not match') ? 'error' : 'success'}
            title={feedbackMessage}
          />
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
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
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: isActive ? '#e0f2fe' : 'transparent',
                color: isActive ? '#0066cc' : '#475569',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Personal Info */}
      {activeTab === 'profile' && (
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>
            Personal Identification
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', fontSize: '13.5px' }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>First Name</span>
              <strong style={{ color: '#0f172a', fontSize: '15px' }}>{profile.fname}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Last Name</span>
              <strong style={{ color: '#0f172a', fontSize: '15px' }}>{profile.lname}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Registered Email</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f172a', fontWeight: 600 }}>
                <Mail size={15} color="#0066cc" /> {profile.email}
              </div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Contact Phone</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f172a', fontWeight: 600 }}>
                <Phone size={15} color="#0066cc" /> {profile.contact}
              </div>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Assigned Agent</span>
              <strong style={{ color: '#0f172a' }}>{profile.agentName}</strong> ({profile.agentId})
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Member Since</span>
              <strong style={{ color: '#0f172a' }}>{profile.memberSince}</strong>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 2: Business & Tax Data */}
      {activeTab === 'business' && (
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>
            Registered Business Enterprise
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', fontSize: '13.5px' }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Business Entity Name</span>
              <strong style={{ color: '#0f172a', fontSize: '15px' }}>{profile.businessName}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>PAN Number</span>
              <strong style={{ color: '#0f172a', fontSize: '15px' }}>{profile.pan}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>GSTIN</span>
              <strong style={{ color: '#0066cc', fontSize: '15px' }}>{profile.gstin}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>City &amp; State</span>
              <strong style={{ color: '#0f172a' }}>{profile.city}, {profile.state} ({profile.pincode})</strong>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '4px' }}>Operating Address</span>
              <strong style={{ color: '#0f172a' }}>{profile.address}</strong>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: Bank Details Form */}
      {activeTab === 'bank' && (
        <form onSubmit={handleSaveBankDetails}>
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              Bank Account for Reimbursements &amp; Refunds
            </div>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>
              Preserved in database columns <code>bank</code>, <code>branch</code>, <code>ACNo</code>, <code>IFSE</code> under customer session.
            </p>

            <VStack gap={3}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
              </div>

              <div style={{ marginTop: '12px' }}>
                <Button
                  label="Save Bank Details"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<Save size={16} />}
                />
              </div>
            </VStack>
          </Card>
        </form>
      )}

      {/* Tab 4: Security & Password */}
      {activeTab === 'security' && (
        <form onSubmit={handleUpdatePassword}>
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', maxWidth: '560px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              Update Account Password
            </div>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>
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

              <div style={{ marginTop: '12px' }}>
                <Button
                  label="Update Password"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<KeyRound size={16} />}
                />
              </div>
            </VStack>
          </Card>
        </form>
      )}
    </div>
  );
};

export default CustomerProfilePage;
