import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Assigned Applications Queue
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Manage your regulatory filings workload, examine statutory prerequisites, and update milestone stages.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, var(--spacing-fsk-45))", maxWidth: "var(--spacing-fsk-50)" }}>
            <TextInput
              label="Search Queue"
              placeholder="Search by ID, client, or compliance service..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)" }}>
            {(['All', 'Processing', 'High', 'Urgent'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setPriorityFilter(filter)}
                style={{
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  borderRadius: "var(--radius-fsk-28)",
                  border: priorityFilter === filter ? "var(--spacing-fsk-22) solid var(--color-fsk-41)" : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                  background: priorityFilter === filter ? "var(--color-fsk-53)" : "var(--color-fsk-38)",
                  color: priorityFilter === filter ? "var(--color-fsk-41)" : "var(--color-fsk-18)",
                  fontSize: "var(--font-fsk-14)",
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
      </Card>

      {/* Applications Queue Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Application ID &amp; Service</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Client Enterprise</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Priority</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Target Deadline</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Progress</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>CA Fee</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{app.serviceName}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-41)", fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)" }}>Assigned {app.assignedDate}</Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>{app.customerName}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{app.businessName}</Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Badge
                      label={app.priority}
                      variant={app.priority === 'Urgent' ? 'red' : app.priority === 'High' ? 'orange' : 'neutral'}
                    />
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-86)", color: "var(--color-fsk-54)", fontWeight: 600 }}>
                      <Clock size={13} /> {app.deadline}
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
                      <Badge label={`Stage ${app.currentStage} / ${app.totalStages}`} variant="purple" />
                      <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{app.status}</Inline>
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", fontWeight: 700, color: "var(--color-fsk-41)" }}>
                    ₹{app.caCommission.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>
                    <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "var(--spacing-fsk-17)" }}>
                      <button
                        type="button"
                        onClick={() => navigate('/ca/documents')}
                        title="Review Documents"
                        style={{
                          padding: "var(--spacing-fsk-17) var(--spacing-fsk-35)",
                          borderRadius: "var(--radius-fsk-42)",
                          border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
                          background: "var(--color-fsk-38)",
                          color: "var(--color-fsk-18)",
                          fontSize: "var(--font-fsk-14)",
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: "var(--spacing-fsk-29)",
                        }}
                      >
                        <FileCheck size={13} /> Docs
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/ca/applications/${app.id}/workflow`)}
                        style={{
                          padding: "var(--spacing-fsk-17) var(--spacing-fsk-35)",
                          borderRadius: "var(--radius-fsk-42)",
                          border: "var(--spacing-fsk-22) solid var(--color-fsk-97)",
                          background: "var(--color-fsk-53)",
                          color: "var(--color-fsk-41)",
                          fontSize: "var(--font-fsk-14)",
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: "var(--spacing-fsk-29)",
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
      </Card>
    </Surface>
  );
};

export default CAAssignedApplicationsPage;
