import { Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  ArrowRight,
  Clock
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_COORDINATOR_APPLICATIONS } from '../../features/coordinator/coordinatorData';

export const CoordinatorApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const applications = INITIAL_COORDINATOR_APPLICATIONS;
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Unassigned' | 'Assigned' | 'Processing'>('All');

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.assignedCAName && app.assignedCAName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === 'All'
          ? true
          : statusFilter === 'Unassigned'
          ? app.assignmentStatus === 'Unassigned'
          : statusFilter === 'Assigned'
          ? app.assignmentStatus === 'Assigned'
          : app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  return (
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Operations Application Queue
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Central operational application flow across all disciplines. Allocate unassigned cases, review documents, and enforce SLA turnarounds.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "1rem", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, 17.5rem)", maxWidth: "26.25rem" }}>
            <Field
              label="Search Application Queue"
              placeholder="Search by ID, service name, client or CA..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.5rem" }}>
            {(['All', 'Unassigned', 'Assigned', 'Processing'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "1rem",
                  border: statusFilter === filter ? "0.0625rem solid #d97706" : "0.0625rem solid #cbd5e1",
                  background: statusFilter === filter ? "#fffbeb" : "var(--white)",
                  color: statusFilter === filter ? "#d97706" : "var(--muted)",
                  fontSize: "0.8125rem",
                  fontWeight: statusFilter === filter ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {filter}
              </button>
            ))}
          </Surface>
        </Surface>
      </Panel>

      {/* Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Application ID &amp; Service</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Client Enterprise</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Allocated CA</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Allocation Status</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Document Audit</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>SLA Target</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{app.serviceName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#d97706", fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--navy)" }}>{app.customerName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{app.businessName}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 600, color: app.assignedCAName ? "var(--navy)" : "#d97706" }}>
                      {app.assignedCAName || 'Unassigned'}
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Badge
                      label={app.assignmentStatus}
                      variant={app.assignmentStatus === 'Assigned' ? 'green' : 'orange'}
                    />
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Badge
                      label={app.docVerificationStatus}
                      variant={app.docVerificationStatus === 'Verified' ? 'green' : 'neutral'}
                    />
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.25rem", color: "var(--muted)", fontSize: "0.8125rem" }}>
                      <Clock size={12} /> {app.slaDeadline}
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => navigate(`/coordinator/applications/${app.id}`)}
                      style={{
                        padding: "0.375rem 0.75rem",
                        borderRadius: "0.375rem",
                        border: "0.0625rem solid #fde68a",
                        background: "#fffbeb",
                        color: "#d97706",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: "0.25rem",
                      }}
                    >
                      Inspect <ArrowRight size={13} />
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

export default CoordinatorApplicationsPage;
