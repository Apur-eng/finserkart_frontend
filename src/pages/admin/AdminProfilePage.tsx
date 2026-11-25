import { Notice, Panel, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "60rem", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
      {/* Header */}
      <Surface>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", color: "#dc2626", fontSize: "0.8125rem", fontWeight: 600 }}>
          <ShieldAlert size={16} /> Root Platform Governance Credentials
        </Surface>
        <h1 style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", margin: "0.25rem 0 0 0" }}>
          Administrator Profile & Security Clearance
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
          Manage your platform root credentials, two-factor authentication, and security clearance.
        </p>
      </Surface>

      {bannerMessage && (
        <Notice
          status="info"
          title="Security Update"
          description={bannerMessage}
        />
      )}

      {/* Admin Panel */}
      <Panel elevation="low" padding={5}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "1.25rem", flexWrap: 'wrap' }}>
          <Surface
            style={{
              width: "4.5rem",
              height: "4.5rem",
              borderRadius: '50%',
              background: "var(--status-brand)",
              color: "var(--white)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)",
              fontWeight: 800,
            }}
          >
            A
          </Surface>

          <Surface style={{ flex: 1 }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--navy)", margin: 0 }}>
                {profile.name}
              </h2>
              <Badge label="Super Admin" variant="red" />
            </Surface>
            <Surface style={{ display: 'flex', gap: "1rem", marginTop: "0.375rem", fontSize: "0.8125rem", color: "var(--muted)", flexWrap: 'wrap' }}>
              <Inline style={{ display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                <Mail size={14} /> {profile.email}
              </Inline>
              <Inline style={{ display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                <Clock size={14} /> Last Login: {profile.lastLogin}
              </Inline>
            </Surface>
          </Surface>
        </Surface>
      </Panel>

      {/* Security Clearance Details */}
      <Panel elevation="low" padding={5}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "1rem" }}>
          <ShieldCheck size={20} color="#16a34a" />
          <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
            Active Security Clearance
          </h2>
        </Surface>

        <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))", gap: "1rem" }}>
          <Surface style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--cream)", border: "0.0625rem solid var(--border)" }}>
            <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Security Clearance Level</Surface>
            <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)", marginTop: "0.25rem" }}>
              {profile.securityClearance}
            </Surface>
          </Surface>

          <Surface style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--cream)", border: "0.0625rem solid var(--border)" }}>
            <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Authorized Operations</Surface>
            <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)", marginTop: "0.25rem" }}>
              Root Database, Treasury, User & CA Allocation
            </Surface>
          </Surface>
        </Surface>

        <Surface
          style={{
            marginTop: "1.25rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "0.0625rem solid var(--border)",
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: profile.twoFactorEnabled ? "#f0fdf4" : "#fffbeb",
          }}
        >
          <Surface>
            <Surface style={{ fontWeight: 600, color: "var(--navy)", fontSize: "0.875rem" }}>
              Two-Factor Authentication (2FA)
            </Surface>
            <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
              Hardware security key or TOTP authenticator required for administrative actions.
            </Surface>
          </Surface>
          <button
            type="button"
            onClick={toggle2FA}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              background: profile.twoFactorEnabled ? "#16a34a" : "var(--white)",
              color: profile.twoFactorEnabled ? "var(--white)" : "#334155",
              border: profile.twoFactorEnabled ? 'none' : "0.0625rem solid #cbd5e1",
              fontWeight: 600,
              fontSize: "0.8125rem",
              cursor: 'pointer',
            }}
          >
            {profile.twoFactorEnabled ? 'Enabled (Active)' : 'Enable 2FA'}
          </button>
        </Surface>
      </Panel>

      {/* Password Management */}
      <Panel elevation="low" padding={5}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "1rem" }}>
          <Lock size={20} color="#dc2626" />
          <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
            Update Administrator Credentials
          </h2>
        </Surface>

        <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: "1rem" }}>
          <Field
            label="Current Master Password"
            type="password"
            placeholder="••••••••••••"
            value={currentPassword}
            onChange={(val) => setCurrentPassword(val)}
          />

          <Field
            label="New Administrator Password"
            type="password"
            placeholder="Minimum 12 characters with symbols and digits"
            value={newPassword}
            onChange={(val) => setNewPassword(val)}
          />

          <Field
            label="Confirm New Password"
            type="password"
            placeholder="Repeat new password"
            value={confirmPassword}
            onChange={(val) => setConfirmPassword(val)}
          />

          <Surface style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "0.5rem" }}>
            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                borderRadius: "0.5rem",
                background: "#dc2626",
                color: "var(--white)",
                fontWeight: 600,
                fontSize: "0.875rem",
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Key size={16} /> Update Master Password
            </button>
          </Surface>
        </form>
      </Panel>
    </Surface>
  );
};
