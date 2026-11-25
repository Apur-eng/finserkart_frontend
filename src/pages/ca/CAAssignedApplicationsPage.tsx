import { Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  ArrowRight,
  Clock,
  FileCheck
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_CA_APPLICATIONS } from '../../features/ca/caData';

export const CAAssignedApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const applications = INITIAL_CA_APPLICATIONS;
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'High' | 'Urgent' | 'Processing'>('All');

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.businessName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority =
        priorityFilter === 'All'
          ? true
          : priorityFilter === 'Processing'
          ? app.status === 'Processing'
          : app.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [applications, searchQuery, priorityFilter]);

  return (
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Assigned Applications Queue
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Manage your regulatory filings workload, examine statutory prerequisites, and update milestone stages.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "1rem", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, 17.5rem)", maxWidth: "26.25rem" }}>
            <Field
              label="Search Queue"
              placeholder="Search by ID, client, or compliance service..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.5rem" }}>
            {(['All', 'Processing', 'High', 'Urgent'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setPriorityFilter(filter)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "1rem",
                  border: priorityFilter === filter ? "0.0625rem solid #7c3aed" : "0.0625rem solid #cbd5e1",
                  background: priorityFilter === filter ? "#f5f3ff" : "var(--white)",
                  color: priorityFilter === filter ? "#7c3aed" : "var(--muted)",
                  fontSize: "0.8125rem",
                  fontWeight: priorityFilter === filter ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {filter} {filter === 'All' ? `(${applications.length})` : ''}
              </button>
            ))}
          </Surface>
        </Surface>
      </Panel>

      {/* Applications Queue Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Application ID &amp; Service</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Client Enterprise</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Priority</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Target Deadline</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Progress</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>CA Fee</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{app.serviceName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#7c3aed", fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#687d93" }}>Assigned {app.assignedDate}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--navy)" }}>{app.customerName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{app.businessName}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Badge
                      label={app.priority}
                      variant={app.priority === 'Urgent' ? 'red' : app.priority === 'High' ? 'orange' : 'neutral'}
                    />
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.3125rem", color: "#d97706", fontWeight: 600 }}>
                      <Clock size={13} /> {app.deadline}
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                      <Badge label={`Stage ${app.currentStage} / ${app.totalStages}`} variant="purple" />
                      <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{app.status}</Inline>
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", fontWeight: 700, color: "#7c3aed" }}>
                    ₹{app.caCommission.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
                    <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "0.375rem" }}>
                      <button
                        type="button"
                        onClick={() => navigate('/ca/documents')}
                        title="Review Documents"
                        style={{
                          padding: "0.375rem 0.625rem",
                          borderRadius: "0.375rem",
                          border: "0.0625rem solid var(--border)",
                          background: "var(--white)",
                          color: "var(--muted)",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: "0.25rem",
                        }}
                      >
                        <FileCheck size={13} /> Docs
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/ca/applications/${app.id}/workflow`)}
                        style={{
                          padding: "0.375rem 0.625rem",
                          borderRadius: "0.375rem",
                          border: "0.0625rem solid #ddd6fe",
                          background: "#f5f3ff",
                          color: "#7c3aed",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: "0.25rem",
                        }}
                      >
                        Workflow <ArrowRight size={13} />
                      </button>
                    </Surface>
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

export default CAAssignedApplicationsPage;
