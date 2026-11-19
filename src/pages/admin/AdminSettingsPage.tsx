import { Surface } from '../../components/Surface';
import { Banner } from '@astryxdesign/core/Banner';
import { Card } from '@astryxdesign/core/Card';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  Database,
  Globe,
  Save,
  Settings,
  Sliders
} from 'lucide-react';
import React, { useState } from 'react';
import {
  INITIAL_ADMIN_SETTINGS,
  type AdminPlatformSettings
} from '../../features/admin/adminData';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AdminPlatformSettings>(INITIAL_ADMIN_SETTINGS);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-20)" }}>
      {/* Header */}
      <Surface>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", color: "var(--color-fsk-34)", fontSize: "var(--font-fsk-14)", fontWeight: 600 }}>
          <Settings size={16} /> Global Platform Governance
        </Surface>
        <h1 style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
          Platform Settings & System Configuration
        </h1>
        <p style={{ fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
          Configure core operational parameters, payment gateway webhooks, and automation thresholds.
        </p>
      </Surface>

      {isSaved && (
        <Banner
          status="success"
          title="Configuration Saved"
          description="Platform settings updated and synchronized across all distributed worker clusters."
        />
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-26)" }}>
        {/* Section 1: General Branding & Support */}
        <Card elevation="low" padding={5}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-5)" }}>
            <Globe size={20} color="var(--color-fsk-34)" />
            <h2 style={{ fontSize: "var(--font-fsk-74)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
              General Platform Identity
            </h2>
          </Surface>

          <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
            <TextInput
              label="Platform Legal Name"
              value={settings.platformName}
              onChange={(val) => setSettings({ ...settings, platformName: val })}
            />
            <TextInput
              label="Support Desk Inbound Email"
              value={settings.supportEmail}
              onChange={(val) => setSettings({ ...settings, supportEmail: val })}
            />
            <TextInput
              label="Customer Hotline Phone"
              value={settings.supportPhone}
              onChange={(val) => setSettings({ ...settings, supportPhone: val })}
            />
          </Surface>
        </Card>

        {/* Section 2: Automation & Operational Controls */}
        <Card elevation="low" padding={5}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-5)" }}>
            <Sliders size={20} color="var(--color-fsk-40)" />
            <h2 style={{ fontSize: "var(--font-fsk-74)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
              Operational Automation & Routing Rules
            </h2>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-5)" }}>
            {/* Auto Assign CA */}
            <Surface
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: "var(--spacing-fsk-5)",
                borderRadius: "var(--radius-fsk-37)",
                border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
                background: "var(--color-fsk-27)",
              }}
            >
              <Surface>
                <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-24)" }}>
                  Automated CA Load-Balanced Allocation
                </Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
                  When enabled, verified applications are instantly routed to the CA with lowest active queue.
                </Surface>
              </Surface>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, autoAssignCA: !settings.autoAssignCA })}
                style={{
                  padding: "var(--spacing-fsk-12) var(--spacing-fsk-5)",
                  borderRadius: "var(--radius-fsk-42)",
                  background: settings.autoAssignCA ? "var(--color-fsk-40)" : "var(--color-fsk-38)",
                  color: settings.autoAssignCA ? "var(--color-fsk-38)" : "var(--color-fsk-18)",
                  border: settings.autoAssignCA ? 'none' : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                  fontWeight: 600,
                  fontSize: "var(--font-fsk-14)",
                  cursor: 'pointer',
                }}
              >
                {settings.autoAssignCA ? 'Enabled' : 'Disabled'}
              </button>
            </Surface>

            {/* Maintenance Mode */}
            <Surface
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: "var(--spacing-fsk-5)",
                borderRadius: "var(--radius-fsk-37)",
                border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
                background: "var(--color-fsk-27)",
              }}
            >
              <Surface>
                <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-24)" }}>
                  Platform Emergency Maintenance Mode
                </Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
                  Restricts consumer logins and shows maintenance splash banner across portals.
                </Surface>
              </Surface>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                style={{
                  padding: "var(--spacing-fsk-12) var(--spacing-fsk-5)",
                  borderRadius: "var(--radius-fsk-42)",
                  background: settings.maintenanceMode ? "var(--color-fsk-34)" : "var(--color-fsk-38)",
                  color: settings.maintenanceMode ? "var(--color-fsk-38)" : "var(--color-fsk-18)",
                  border: settings.maintenanceMode ? 'none' : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                  fontWeight: 600,
                  fontSize: "var(--font-fsk-14)",
                  cursor: 'pointer',
                }}
              >
                {settings.maintenanceMode ? 'ACTIVE' : 'Inactive'}
              </button>
            </Surface>
          </Surface>
        </Card>

        {/* Section 3: Financial & Statutory Payout Thresholds */}
        <Card elevation="low" padding={5}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-5)" }}>
            <Database size={20} color="var(--color-fsk-39)" />
            <h2 style={{ fontSize: "var(--font-fsk-74)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
              Financial & Statutory Parameters
            </h2>
          </Surface>

          <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
            <TextInput
              label="Statutory TDS Deduction Rate (%)"
              value={String(settings.taxDeductionPercent)}
              onChange={(val) => setSettings({ ...settings, taxDeductionPercent: Number(val) || 0 })}
            />
            <TextInput
              label="Minimum Partner Payout Threshold (₹)"
              value={String(settings.minPayoutThreshold)}
              onChange={(val) => setSettings({ ...settings, minPayoutThreshold: Number(val) || 0 })}
            />
            <TextInput
              label="Payment Gateway Live Production Key"
              value={settings.paymentGatewayKey}
              onChange={(val) => setSettings({ ...settings, paymentGatewayKey: val })}
            />
          </Surface>
        </Card>

        {/* Action Button */}
        <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "var(--spacing-fsk-8)" }}>
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
            <Save size={16} /> Save Platform Configuration
          </button>
        </Surface>
      </form>
    </Surface>
  );
};
