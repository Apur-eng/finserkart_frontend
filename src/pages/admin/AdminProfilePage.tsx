import { Badge } from '@astryxdesign/core/Badge';
import { Banner } from '@astryxdesign/core/Banner';
import { Card } from '@astryxdesign/core/Card';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  Clock,
  Key,
  Lock,
  Mail,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import React, { useState } from 'react';
import { INITIAL_ADMIN_PROFILE, type AdminProfile } from '../../features/admin/adminData';

export const AdminProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile>(INITIAL_ADMIN_PROFILE);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const toggle2FA = () => {
    const nextState = !profile.twoFactorEnabled;
    setProfile({ ...profile, twoFactorEnabled: nextState });
    setBannerMessage(`Two-Factor Authentication (TOTP / Hardware Token) is now ${nextState ? 'Enabled' : 'Disabled'}.`);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    if (newPassword !== confirmPassword) {
      setBannerMessage('New password and confirmation do not match.');
      return;
    }
    setBannerMessage('Administrator password updated successfully across all operational endpoints.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>
          <ShieldAlert size={16} /> Root Platform Governance Credentials
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
          Administrator Profile & Security Clearance
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
          Manage your platform root credentials, two-factor authentication, and security clearance.
        </p>
      </div>

      {bannerMessage && (
        <Banner
          status="info"
          title="Security Update"
          description={bannerMessage}
        />
      )}

      {/* Admin Card */}
      <Card elevation="low" padding={5}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 800,
            }}
          >
            A
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {profile.name}
              </h2>
              <Badge label="Super Admin" variant="red" />
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '13px', color: '#64748b', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={14} /> {profile.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> Last Login: {profile.lastLogin}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Security Clearance Details */}
      <Card elevation="low" padding={5}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <ShieldCheck size={20} color="#16a34a" />
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Active Security Clearance
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Security Clearance Level</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
              {profile.securityClearance}
            </div>
          </div>

          <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Authorized Operations</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
              Root Database, Treasury, User & CA Allocation
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '20px',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: profile.twoFactorEnabled ? '#f0fdf4' : '#fffbeb',
          }}
        >
          <div>
            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>
              Two-Factor Authentication (2FA)
            </div>
            <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
              Hardware security key or TOTP authenticator required for administrative actions.
            </div>
          </div>
          <button
            type="button"
            onClick={toggle2FA}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              background: profile.twoFactorEnabled ? '#16a34a' : '#ffffff',
              color: profile.twoFactorEnabled ? '#ffffff' : '#334155',
              border: profile.twoFactorEnabled ? 'none' : '1px solid #cbd5e1',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {profile.twoFactorEnabled ? 'Enabled (Active)' : 'Enable 2FA'}
          </button>
        </div>
      </Card>

      {/* Password Management */}
      <Card elevation="low" padding={5}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Lock size={20} color="#dc2626" />
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Update Administrator Credentials
          </h2>
        </div>

        <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextInput
            label="Current Master Password"
            type="password"
            placeholder="••••••••••••"
            value={currentPassword}
            onChange={(val) => setCurrentPassword(val)}
          />

          <TextInput
            label="New Administrator Password"
            type="password"
            placeholder="Minimum 12 characters with symbols and digits"
            value={newPassword}
            onChange={(val) => setNewPassword(val)}
          />

          <TextInput
            label="Confirm New Password"
            type="password"
            placeholder="Repeat new password"
            value={confirmPassword}
            onChange={(val) => setConfirmPassword(val)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                background: '#dc2626',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Key size={16} /> Update Master Password
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};
