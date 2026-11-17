import { Badge } from '@astryxdesign/core/Badge';
import { Banner } from '@astryxdesign/core/Banner';
import { Card } from '@astryxdesign/core/Card';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  Activity,
  Download,
  Lock,
  Server,
  ShieldCheck
} from 'lucide-react';
import React, { useState } from 'react';
import {
  INITIAL_ADMIN_ACTIVITY_LOGS,
  type AdminActivityLogItem
} from '../../features/admin/adminData';

export const AdminActivityLogsPage: React.FC = () => {
  const [logs] = useState<AdminActivityLogItem[]>(INITIAL_ADMIN_ACTIVITY_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.ip.includes(searchTerm);
    const matchesSeverity = severityFilter === 'All' || l.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const handleExportAudit = () => {
    setBannerMessage('Immutable SHA-256 Audit Log archive compiled: Finservkart_SecurityAudit_Mar2026.log downloaded.');
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>
            <Activity size={16} /> Platform Security & Audit Trail
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
            System Activity & Audit Logs
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
            Immutable administrative activity history, authorization events, and system compliance logs.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportAudit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '8px',
            background: '#dc2626',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Download size={16} /> Download Signed Audit Archive
        </button>
      </div>

      {bannerMessage && (
        <Banner
          status="info"
          title="Audit Export"
          description={bannerMessage}
        />
      )}

      {/* Security Health Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <Card elevation="low" padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>System Integrity</span>
            <ShieldCheck size={20} color="#16a34a" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>
            100% Compliant
          </div>
          <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '4px' }}>
            Zero unauthorized privilege escalations
          </div>
        </Card>

        <Card elevation="low" padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Logged Events Today</span>
            <Server size={20} color="#2563eb" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>
            1,428
          </div>
          <div style={{ fontSize: '12px', color: '#2563eb', marginTop: '4px' }}>
            All operations mirrored to append-only storage
          </div>
        </Card>

        <Card elevation="low" padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Security Status</span>
            <Lock size={20} color="#7c3aed" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>
            Level 5 Root
          </div>
          <div style={{ fontSize: '12px', color: '#7c3aed', marginTop: '4px' }}>
            MFA enforced across all administrative accounts
          </div>
        </Card>
      </div>

      {/* Filter and Log Table */}
      <Card elevation="low" padding={5}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Immutable Platform Event Log
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
              Timestamped cryptographic records of user and operational actions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['All', 'info', 'warning', 'critical'].map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setSeverityFilter(sev)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    border: severityFilter === sev ? '1px solid #dc2626' : '1px solid #e2e8f0',
                    background: severityFilter === sev ? '#fee2e2' : '#ffffff',
                    color: severityFilter === sev ? '#991b1b' : '#64748b',
                  }}
                >
                  {sev}
                </button>
              ))}
            </div>

            <div style={{ width: '280px' }}>
              <TextInput
                label="Search Logs"
                placeholder="Search actor, action or IP..."
                value={searchTerm}
                onChange={(val) => setSearchTerm(val)}
              />
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Log ID</th>
                <th style={{ padding: '12px 16px' }}>Timestamp</th>
                <th style={{ padding: '12px 16px' }}>Actor</th>
                <th style={{ padding: '12px 16px' }}>Action & Description</th>
                <th style={{ padding: '12px 16px' }}>Target Entity</th>
                <th style={{ padding: '12px 16px' }}>IP Address</th>
                <th style={{ padding: '12px 16px' }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                    {log.id}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    {log.timestamp}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                    {log.actor}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#334155' }}>
                    {log.action}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                      {log.entity}
                    </code>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b', fontFamily: 'monospace' }}>
                    {log.ip}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge
                      label={log.severity.toUpperCase()}
                      variant={
                        log.severity === 'critical'
                          ? 'red'
                          : log.severity === 'warning'
                          ? 'yellow'
                          : 'green'
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
