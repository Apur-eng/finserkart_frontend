import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-33)", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-20)" }}>
      {/* Header */}
      <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)" }}>
        <Surface>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", color: "var(--color-fsk-34)", fontSize: "var(--font-fsk-14)", fontWeight: 600 }}>
            <Activity size={16} /> Platform Security & Audit Trail
          </Surface>
          <h1 style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
            System Activity & Audit Logs
          </h1>
          <p style={{ fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
            Immutable administrative activity history, authorization events, and system compliance logs.
          </p>
        </Surface>
        <button
          type="button"
          onClick={handleExportAudit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-12)",
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-36)",
            borderRadius: "var(--radius-fsk-37)",
            background: "var(--color-fsk-34)",
            color: "var(--color-fsk-38)",
            fontWeight: 600,
            fontSize: "var(--font-fsk-24)",
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Download size={16} /> Download Signed Audit Archive
        </button>
      </Surface>

      {bannerMessage && (
        <Banner
          status="info"
          title="Audit Export"
          description={bannerMessage}
        />
      )}

      {/* Security Health Metrics */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
        <Card elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 500 }}>System Integrity</Inline>
            <ShieldCheck size={20} color="var(--color-fsk-39)" />
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-8)" }}>
            100% Compliant
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", marginTop: "var(--spacing-fsk-29)" }}>
            Zero unauthorized privilege escalations
          </Surface>
        </Card>

        <Card elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 500 }}>Logged Events Today</Inline>
            <Server size={20} color="var(--color-fsk-40)" />
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-8)" }}>
            1,428
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-40)", marginTop: "var(--spacing-fsk-29)" }}>
            All operations mirrored to append-only storage
          </Surface>
        </Card>

        <Card elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 500 }}>Security Status</Inline>
            <Lock size={20} color="var(--color-fsk-41)" />
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-8)" }}>
            Level 5 Root
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-41)", marginTop: "var(--spacing-fsk-29)" }}>
            MFA enforced across all administrative accounts
          </Surface>
        </Card>
      </Surface>

      {/* Filter and Log Table */}
      <Card elevation="low" padding={5}>
        <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-2)", flexWrap: 'wrap', gap: "var(--spacing-fsk-5)" }}>
          <Surface>
            <h2 style={{ fontSize: "var(--font-fsk-30)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
              Immutable Platform Event Log
            </h2>
            <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
              Timestamped cryptographic records of user and operational actions.
            </p>
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-8)", alignItems: 'center', flexWrap: 'wrap' }}>
            <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-17)" }}>
              {['All', 'info', 'warning', 'critical'].map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setSeverityFilter(sev)}
                  style={{
                    padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                    borderRadius: "var(--radius-fsk-42)",
                    fontSize: "var(--font-fsk-14)",
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    border: severityFilter === sev ? "var(--spacing-fsk-22) solid var(--color-fsk-34)" : "var(--spacing-fsk-22) solid var(--color-fsk-163)",
                    background: severityFilter === sev ? "var(--color-fsk-43)" : "var(--color-fsk-38)",
                    color: severityFilter === sev ? "var(--color-fsk-44)" : "var(--color-fsk-9)",
                  }}
                >
                  {sev}
                </button>
              ))}
            </Surface>

            <Surface style={{ width: "var(--spacing-fsk-45)" }}>
              <TextInput
                label="Search Logs"
                placeholder="Search actor, action or IP..."
                value={searchTerm}
                onChange={(val) => setSearchTerm(val)}
              />
            </Surface>
          </Surface>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontWeight: 600 }}>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Log ID</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Timestamp</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Actor</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Action & Description</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Target Entity</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>IP Address</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                    {log.id}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-9)" }}>
                    {log.timestamp}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 600, color: "var(--color-fsk-7)" }}>
                    {log.actor}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-25)" }}>
                    {log.action}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>
                    <code style={{ background: "var(--color-fsk-46)", padding: "var(--spacing-fsk-47) var(--spacing-fsk-17)", borderRadius: "var(--radius-fsk-48)", fontSize: "var(--font-fsk-14)" }}>
                      {log.entity}
                    </code>
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-9)", fontFamily: 'monospace' }}>
                    {log.ip}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>
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
        </Surface>
      </Card>
    </Surface>
  );
};
