import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Operations Application Queue
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Central operational application flow across all disciplines. Allocate unassigned cases, review documents, and enforce SLA turnarounds.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, var(--spacing-fsk-45))", maxWidth: "var(--spacing-fsk-50)" }}>
            <TextInput
              label="Search Application Queue"
              placeholder="Search by ID, service name, client or CA..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)" }}>
            {(['All', 'Unassigned', 'Assigned', 'Processing'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  borderRadius: "var(--radius-fsk-28)",
                  border: statusFilter === filter ? "var(--spacing-fsk-22) solid var(--color-fsk-54)" : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                  background: statusFilter === filter ? "var(--color-fsk-66)" : "var(--color-fsk-38)",
                  color: statusFilter === filter ? "var(--color-fsk-54)" : "var(--color-fsk-18)",
                  fontSize: "var(--font-fsk-14)",
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
      </Card>

      {/* Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Application ID &amp; Service</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Client Enterprise</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Allocated CA</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Allocation Status</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Document Audit</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>SLA Target</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{app.serviceName}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-54)", fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>{app.customerName}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{app.businessName}</Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 600, color: app.assignedCAName ? "var(--color-fsk-7)" : "var(--color-fsk-54)" }}>
                      {app.assignedCAName || 'Unassigned'}
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Badge
                      label={app.assignmentStatus}
                      variant={app.assignmentStatus === 'Assigned' ? 'green' : 'orange'}
                    />
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Badge
                      label={app.docVerificationStatus}
                      variant={app.docVerificationStatus === 'Verified' ? 'green' : 'neutral'}
                    />
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)" }}>
                      <Clock size={12} /> {app.slaDeadline}
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => navigate(`/coordinator/applications/${app.id}`)}
                      style={{
                        padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                        borderRadius: "var(--radius-fsk-42)",
                        border: "var(--spacing-fsk-22) solid var(--color-fsk-88)",
                        background: "var(--color-fsk-66)",
                        color: "var(--color-fsk-54)",
                        fontSize: "var(--font-fsk-14)",
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: "var(--spacing-fsk-29)",
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
      </Card>
    </Surface>
  );
};

export default CoordinatorApplicationsPage;
