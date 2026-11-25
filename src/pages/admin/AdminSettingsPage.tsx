import { Notice, Panel, Field } from '../../components/ui';
import { Surface } from '../../components/Surface';
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
    <Surface style={{ maxWidth: "62.5rem", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
      {/* Header */}
      <Surface>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", color: "#dc2626", fontSize: "0.8125rem", fontWeight: 600 }}>
          <Settings size={16} /> Global Platform Governance
        </Surface>
        <h1 style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", margin: "0.25rem 0 0 0" }}>
          Platform Settings & System Configuration
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
          Configure core operational parameters, payment gateway webhooks, and automation thresholds.
        </p>
      </Surface>

      {isSaved && (
        <Notice
          status="success"
          title="Configuration Saved"
          description="Platform settings updated and synchronized across all distributed worker clusters."
        />
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: "1.5rem" }}>
        {/* Section 1: General Branding & Support */}
        <Panel elevation="low" padding={5}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "1rem" }}>
            <Globe size={20} color="#dc2626" />
            <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
              General Platform Identity
            </h2>
          </Surface>

          <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1rem" }}>
            <Field
              label="Platform Legal Name"
              value={settings.platformName}
              onChange={(val) => setSettings({ ...settings, platformName: val })}
            />
            <Field
              label="Support Desk Inbound Email"
              value={settings.supportEmail}
              onChange={(val) => setSettings({ ...settings, supportEmail: val })}
            />
            <Field
              label="Customer Hotline Phone"
              value={settings.supportPhone}
              onChange={(val) => setSettings({ ...settings, supportPhone: val })}
            />
          </Surface>
        </Panel>

        {/* Section 2: Automation & Operational Controls */}
        <Panel elevation="low" padding={5}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "1rem" }}>
            <Sliders size={20} color="var(--blue)" />
            <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
              Operational Automation & Routing Rules
            </h2>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1rem" }}>
            {/* Auto Assign CA */}
            <Surface
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: "1rem",
                borderRadius: "0.5rem",
                border: "0.0625rem solid var(--border)",
                background: "var(--cream)",
              }}
            >
              <Surface>
                <Surface style={{ fontWeight: 600, color: "var(--navy)", fontSize: "0.875rem" }}>
                  Automated CA Load-Balanced Allocation
                </Surface>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                  When enabled, verified applications are instantly routed to the CA with lowest active queue.
                </Surface>
              </Surface>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, autoAssignCA: !settings.autoAssignCA })}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  background: settings.autoAssignCA ? "var(--blue)" : "var(--white)",
                  color: settings.autoAssignCA ? "var(--white)" : "var(--muted)",
                  border: settings.autoAssignCA ? 'none' : "0.0625rem solid #cbd5e1",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
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
                padding: "1rem",
                borderRadius: "0.5rem",
                border: "0.0625rem solid var(--border)",
                background: "var(--cream)",
              }}
            >
              <Surface>
                <Surface style={{ fontWeight: 600, color: "var(--navy)", fontSize: "0.875rem" }}>
                  Platform Emergency Maintenance Mode
                </Surface>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                  Restricts consumer logins and shows maintenance splash banner across portals.
                </Surface>
              </Surface>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  background: settings.maintenanceMode ? "#dc2626" : "var(--white)",
                  color: settings.maintenanceMode ? "var(--white)" : "var(--muted)",
                  border: settings.maintenanceMode ? 'none' : "0.0625rem solid #cbd5e1",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  cursor: 'pointer',
                }}
              >
                {settings.maintenanceMode ? 'ACTIVE' : 'Inactive'}
              </button>
            </Surface>
          </Surface>
        </Panel>

        {/* Section 3: Financial & Statutory Payout Thresholds */}
        <Panel elevation="low" padding={5}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "1rem" }}>
            <Database size={20} color="#16a34a" />
            <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
              Financial & Statutory Parameters
            </h2>
          </Surface>

          <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1rem" }}>
            <Field
              label="Statutory TDS Deduction Rate (%)"
              value={String(settings.taxDeductionPercent)}
              onChange={(val) => setSettings({ ...settings, taxDeductionPercent: Number(val) || 0 })}
            />
            <Field
              label="Minimum Partner Payout Threshold (₹)"
              value={String(settings.minPayoutThreshold)}
              onChange={(val) => setSettings({ ...settings, minPayoutThreshold: Number(val) || 0 })}
            />
            <Field
              label="Payment Gateway Live Production Key"
              value={settings.paymentGatewayKey}
              onChange={(val) => setSettings({ ...settings, paymentGatewayKey: val })}
            />
          </Surface>
        </Panel>

        {/* Action Button */}
        <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "0.75rem" }}>
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
            <Save size={16} /> Save Platform Configuration
          </button>
        </Surface>
      </form>
    </Surface>
  );
};
