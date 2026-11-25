import { Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  Download,
  Star
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { INITIAL_CA_COMPLETED_APPLICATIONS } from '../../features/ca/caData';

export const CACompletedApplicationsPage: React.FC = () => {
  const completed = INITIAL_CA_COMPLETED_APPLICATIONS;
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return completed.filter((c) => {
      return (
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.businessName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [completed, searchQuery]);

  return (
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Completed Filings Archive
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Historical archive of approved regulatory filings, client handovers, and performance ratings.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ maxWidth: "26.25rem" }}>
          <Field
            label="Search Archive"
            placeholder="Search completed archive by ID, service, or client..."
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            width="100%"
          />
        </Surface>
      </Panel>

      {/* Completed Applications Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Application ID &amp; Service</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Client Enterprise</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Timeline</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>CA Fee</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Client Rating</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Status</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Certificate</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{app.serviceName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--teal)", fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--navy)" }}>{app.customerName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{app.businessName}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "var(--muted)", fontSize: "0.8125rem" }}>
                    <Surface>Assigned: {app.assignedDate}</Surface>
                    <Surface style={{ color: "var(--teal)", fontWeight: 600 }}>Completed: {app.deadline}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", fontWeight: 700, color: "var(--navy)" }}>
                    ₹{app.caCommission.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.25rem", color: "#d97706", fontWeight: 700 }}>
                      <Star size={14} fill="#d97706" /> 5.0 / 5.0
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Badge label="Completed &amp; Released" variant="green" />
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
                    <button
                      type="button"
                      title="Download Archived Handover"
                      style={{
                        padding: "0.375rem 0.625rem",
                        borderRadius: "0.375rem",
                        border: "0.0625rem solid #cbd5e1",
                        background: "var(--white)",
                        cursor: 'pointer',
                        color: "var(--muted)",
                        fontSize: "0.8125rem",
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: "0.25rem",
                      }}
                    >
                      <Download size={13} /> Dossier
                    </button>
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

export default CACompletedApplicationsPage;
