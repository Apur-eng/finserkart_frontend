import { Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  ArrowRight
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_AGENT_APPLICATIONS } from '../../features/agent/agentData';

export const AgentApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const applications = INITIAL_AGENT_APPLICATIONS;
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Processing' | 'Assigned' | 'Completed'>('All');

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.businessName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' ? true : app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  return (
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Client Applications & Orders
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Track regulatory progress, CA assignment status, and commission attribution for client filings.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "1rem", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, 17.5rem)", maxWidth: "26.25rem" }}>
            <Field
              label="Search Applications"
              placeholder="Search by ID, service name, client or company..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.5rem" }}>
            {(['All', 'Processing', 'Assigned', 'Completed'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "1rem",
                  border: statusFilter === filter ? "0.0625rem solid #059669" : "0.0625rem solid #cbd5e1",
                  background: statusFilter === filter ? "#ecfdf5" : "var(--white)",
                  color: statusFilter === filter ? "var(--teal)" : "var(--muted)",
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

      {/* Applications Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Application ID &amp; Service</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Client Enterprise</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Assigned CA</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Order Total</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Commission</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Filing Status</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Dossier</th>
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
                    <Surface style={{ fontSize: "0.8125rem", color: "#687d93" }}>Submitted {app.date}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--navy)" }}>{app.customerName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{app.businessName}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ color: "var(--navy)", fontWeight: 600 }}>{app.caName || 'Pending Allocation'}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Stage {app.currentStage} of 5</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", fontWeight: 700, color: "var(--navy)" }}>
                    ₹{app.amount.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--teal)" }}>+₹{app.agentCommission}</Surface>
                    <Badge
                      label={app.commissionStatus}
                      variant={app.commissionStatus === 'Disbursed' ? 'green' : app.commissionStatus === 'Approved' ? 'blue' : 'neutral'}
                    />
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Badge
                      label={app.status}
                      variant={app.status === 'Completed' ? 'green' : app.status === 'Processing' ? 'orange' : 'blue'}
                    />
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => navigate(`/agent/applications/${app.id}`)}
                      style={{
                        padding: "0.375rem 0.625rem",
                        borderRadius: "0.375rem",
                        border: "0.0625rem solid var(--border)",
                        background: "var(--white)",
                        color: "var(--teal)",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: "0.25rem",
                      }}
                    >
                      View <ArrowRight size={13} />
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

export default AgentApplicationsPage;
