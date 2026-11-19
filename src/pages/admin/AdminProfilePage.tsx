import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-72)", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-20)" }}>
      {/* Header */}
      <Surface>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", color: "var(--color-fsk-34)", fontSize: "var(--font-fsk-14)", fontWeight: 600 }}>
          <ShieldAlert size={16} /> Root Platform Governance Credentials
        </Surface>
        <h1 style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
          Administrator Profile & Security Clearance
        </h1>
        <p style={{ fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
          Manage your platform root credentials, two-factor authentication, and security clearance.
        </p>
      </Surface>

      {bannerMessage && (
        <Banner
          status="info"
          title="Security Update"
          description={bannerMessage}
        />
      )}

      {/* Admin Card */}
      <Card elevation="low" padding={5}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-2)", flexWrap: 'wrap' }}>
          <Surface
            style={{
              width: "var(--spacing-fsk-73)",
              height: "var(--spacing-fsk-73)",
              borderRadius: '50%',
              background: "var(--color-fsk-brand)",
              color: "var(--color-fsk-38)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "var(--font-fsk-16)",
              fontWeight: 800,
            }}
          >
            A
          </Surface>

          <Surface style={{ flex: 1 }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
              <h2 style={{ fontSize: "var(--font-fsk-61)", fontWeight: 800, color: "var(--color-fsk-7)", margin: 0 }}>
                {profile.name}
              </h2>
              <Badge label="Super Admin" variant="red" />
            </Surface>
            <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-5)", marginTop: "var(--spacing-fsk-17)", fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", flexWrap: 'wrap' }}>
              <Inline style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                <Mail size={14} /> {profile.email}
              </Inline>
              <Inline style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                <Clock size={14} /> Last Login: {profile.lastLogin}
              </Inline>
            </Surface>
          </Surface>
        </Surface>
      </Card>

      {/* Security Clearance Details */}
      <Card elevation="low" padding={5}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-5)" }}>
          <ShieldCheck size={20} color="var(--color-fsk-39)" />
          <h2 style={{ fontSize: "var(--font-fsk-74)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
            Active Security Clearance
          </h2>
        </Surface>

        <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
          <Surface style={{ padding: "var(--spacing-fsk-5)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-27)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
            <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Security Clearance Level</Surface>
            <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-29)" }}>
              {profile.securityClearance}
            </Surface>
          </Surface>

          <Surface style={{ padding: "var(--spacing-fsk-5)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-27)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
            <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Authorized Operations</Surface>
            <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-29)" }}>
              Root Database, Treasury, User & CA Allocation
            </Surface>
          </Surface>
        </Surface>

        <Surface
          style={{
            marginTop: "var(--spacing-fsk-2)",
            padding: "var(--spacing-fsk-5)",
            borderRadius: "var(--radius-fsk-37)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: profile.twoFactorEnabled ? "var(--color-fsk-75)" : "var(--color-fsk-66)",
          }}
        >
          <Surface>
            <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-24)" }}>
              Two-Factor Authentication (2FA)
            </Surface>
            <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
              Hardware security key or TOTP authenticator required for administrative actions.
            </Surface>
          </Surface>
          <button
            type="button"
            onClick={toggle2FA}
            style={{
              padding: "var(--spacing-fsk-12) var(--spacing-fsk-5)",
              borderRadius: "var(--radius-fsk-42)",
              background: profile.twoFactorEnabled ? "var(--color-fsk-39)" : "var(--color-fsk-38)",
              color: profile.twoFactorEnabled ? "var(--color-fsk-38)" : "var(--color-fsk-25)",
              border: profile.twoFactorEnabled ? 'none' : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
              fontWeight: 600,
              fontSize: "var(--font-fsk-14)",
              cursor: 'pointer',
            }}
          >
            {profile.twoFactorEnabled ? 'Enabled (Active)' : 'Enable 2FA'}
          </button>
        </Surface>
      </Card>

      {/* Password Management */}
      <Card elevation="low" padding={5}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-5)" }}>
          <Lock size={20} color="var(--color-fsk-34)" />
          <h2 style={{ fontSize: "var(--font-fsk-74)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
            Update Administrator Credentials
          </h2>
        </Surface>

        <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-5)" }}>
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

          <Surface style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "var(--spacing-fsk-12)" }}>
            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: "var(--spacing-fsk-12)",
                padding: "var(--spacing-fsk-35) var(--spacing-fsk-2)",
                borderRadius: "var(--radius-fsk-37)",
                background: "var(--color-fsk-34)",
                color: "var(--color-fsk-38)",
                fontWeight: 600,
                fontSize: "var(--font-fsk-24)",
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Key size={16} /> Update Master Password
            </button>
          </Surface>
        </form>
      </Card>
    </Surface>
  );
};
