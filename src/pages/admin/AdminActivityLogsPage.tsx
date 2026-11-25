import { Notice, Panel, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "85rem", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
      {/* Header */}
      <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: "1rem" }}>
        <Surface>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", color: "#dc2626", fontSize: "0.8125rem", fontWeight: 600 }}>
            <Activity size={16} /> Platform Security & Audit Trail
          </Surface>
          <h1 style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", margin: "0.25rem 0 0 0" }}>
            System Activity & Audit Logs
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
            Immutable administrative activity history, authorization events, and system compliance logs.
          </p>
        </Surface>
        <button
          type="button"
          onClick={handleExportAudit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.5rem",
            padding: "0.625rem 1.125rem",
            borderRadius: "0.5rem",
            background: "#dc2626",
            color: "var(--white)",
            fontWeight: 600,
            fontSize: "0.875rem",
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Download size={16} /> Download Signed Audit Archive
        </button>
      </Surface>

      {bannerMessage && (
        <Notice
          status="info"
          title="Audit Export"
          description={bannerMessage}
        />
      )}

      {/* Security Health Metrics */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))", gap: "1rem" }}>
        <Panel elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>System Integrity</Inline>
            <ShieldCheck size={20} color="#16a34a" />
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.75rem" }}>
            100% Compliant
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", marginTop: "0.25rem" }}>
            Zero unauthorized privilege escalations
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>Logged Events Today</Inline>
            <Server size={20} color="var(--blue)" />
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.75rem" }}>
            1,428
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--blue)", marginTop: "0.25rem" }}>
            All operations mirrored to append-only storage
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>Security Status</Inline>
            <Lock size={20} color="#7c3aed" />
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.75rem" }}>
            Level 5 Root
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#7c3aed", marginTop: "0.25rem" }}>
            MFA enforced across all administrative accounts
          </Surface>
        </Panel>
      </Surface>

      {/* Filter and Log Table */}
      <Panel elevation="low" padding={5}>
        <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1.25rem", flexWrap: 'wrap', gap: "1rem" }}>
          <Surface>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
              Immutable Platform Event Log
            </h2>
            <p style={{ fontSize: "0.8125rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
              Timestamped cryptographic records of user and operational actions.
            </p>
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.75rem", alignItems: 'center', flexWrap: 'wrap' }}>
            <Surface style={{ display: 'flex', gap: "0.375rem" }}>
              {['All', 'info', 'warning', 'critical'].map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setSeverityFilter(sev)}
                  style={{
                    padding: "0.375rem 0.75rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    border: severityFilter === sev ? "0.0625rem solid #dc2626" : "0.0625rem solid #e2e8f0",
                    background: severityFilter === sev ? "#fee2e2" : "var(--white)",
                    color: severityFilter === sev ? "#991b1b" : "var(--muted)",
                  }}
                >
                  {sev}
                </button>
              ))}
            </Surface>

            <Surface style={{ width: "17.5rem" }}>
              <Field
                label="Search Logs"
                placeholder="Search actor, action or IP..."
                value={searchTerm}
                onChange={(val) => setSearchTerm(val)}
              />
            </Surface>
          </Surface>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontWeight: 600 }}>
                <th style={{ padding: "0.75rem 1rem" }}>Log ID</th>
                <th style={{ padding: "0.75rem 1rem" }}>Timestamp</th>
                <th style={{ padding: "0.75rem 1rem" }}>Actor</th>
                <th style={{ padding: "0.75rem 1rem" }}>Action & Description</th>
                <th style={{ padding: "0.75rem 1rem" }}>Target Entity</th>
                <th style={{ padding: "0.75rem 1rem" }}>IP Address</th>
                <th style={{ padding: "0.75rem 1rem" }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 700, color: "var(--navy)" }}>
                    {log.id}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "var(--muted)" }}>
                    {log.timestamp}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 600, color: "var(--navy)" }}>
                    {log.actor}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#334155" }}>
                    {log.action}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <code style={{ background: "var(--sage-light)", padding: "0.125rem 0.375rem", borderRadius: "0.25rem", fontSize: "0.8125rem" }}>
                      {log.entity}
                    </code>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "var(--muted)", fontFamily: 'monospace' }}>
                    {log.ip}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
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
      </Panel>
    </Surface>
  );
};
