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
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>
          <Settings size={16} /> Global Platform Governance
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
          Platform Settings & System Configuration
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
          Configure core operational parameters, payment gateway webhooks, and automation thresholds.
        </p>
      </div>

      {isSaved && (
        <Banner
          status="success"
          title="Configuration Saved"
          description="Platform settings updated and synchronized across all distributed worker clusters."
        />
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Section 1: General Branding & Support */}
        <Card elevation="low" padding={5}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Globe size={20} color="#dc2626" />
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              General Platform Identity
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
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
          </div>
        </Card>

        {/* Section 2: Automation & Operational Controls */}
        <Card elevation="low" padding={5}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Sliders size={20} color="#2563eb" />
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Operational Automation & Routing Rules
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Auto Assign CA */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>
                  Automated CA Load-Balanced Allocation
                </div>
                <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
                  When enabled, verified applications are instantly routed to the CA with lowest active queue.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, autoAssignCA: !settings.autoAssignCA })}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: settings.autoAssignCA ? '#2563eb' : '#ffffff',
                  color: settings.autoAssignCA ? '#ffffff' : '#475569',
                  border: settings.autoAssignCA ? 'none' : '1px solid #cbd5e1',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                {settings.autoAssignCA ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Maintenance Mode */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>
                  Platform Emergency Maintenance Mode
                </div>
                <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
                  Restricts consumer logins and shows maintenance splash banner across portals.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: settings.maintenanceMode ? '#dc2626' : '#ffffff',
                  color: settings.maintenanceMode ? '#ffffff' : '#475569',
                  border: settings.maintenanceMode ? 'none' : '1px solid #cbd5e1',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                {settings.maintenanceMode ? 'ACTIVE' : 'Inactive'}
              </button>
            </div>
          </div>
        </Card>

        {/* Section 3: Financial & Statutory Payout Thresholds */}
        <Card elevation="low" padding={5}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Database size={20} color="#16a34a" />
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Financial & Statutory Parameters
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
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
          </div>
        </Card>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
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
            <Save size={16} /> Save Platform Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
