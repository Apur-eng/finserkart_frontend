import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import React, { useMemo, useState } from 'react';
import { INITIAL_FRANCHISE_APPLICATIONS } from '../../features/franchise/franchiseData';

export const FranchiseApplicationsPage: React.FC = () => {
  const applications = INITIAL_FRANCHISE_APPLICATIONS;
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Processing' | 'Assigned' | 'Completed'>('All');

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.agentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' ? true : app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Franchise Network Applications
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Track all statutory filing workflows submitted across your regional agent network and monitor franchise revenue splits.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, var(--spacing-fsk-45))", maxWidth: "var(--spacing-fsk-50)" }}>
            <TextInput
              label="Search Applications"
              placeholder="Search by ID, service name, client or agent..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)" }}>
            {(['All', 'Processing', 'Assigned', 'Completed'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  borderRadius: "var(--radius-fsk-28)",
                  border: statusFilter === filter ? "var(--spacing-fsk-22) solid var(--color-fsk-70)" : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                  background: statusFilter === filter ? "var(--color-fsk-131)" : "var(--color-fsk-38)",
                  color: statusFilter === filter ? "var(--color-fsk-70)" : "var(--color-fsk-18)",
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

      {/* Applications Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Application ID &amp; Service</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Client</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Attributed Agent</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Assigned CA</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Order Total</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Franchise Override</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{app.serviceName}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-70)", fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-25)", fontWeight: 600 }}>
                    {app.customerName}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>{app.agentName}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{app.agentId}</Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-18)" }}>
                    {app.caName}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                    ₹{app.amount.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Inline style={{ fontSize: "var(--font-fsk-91)", fontWeight: 800, color: "var(--color-fsk-65)" }}>
                      +₹{app.franchiseCut}
                    </Inline>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>
                    <Badge
                      label={app.status}
                      variant={app.status === 'Completed' ? 'green' : app.status === 'Processing' ? 'orange' : 'blue'}
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

export default FranchiseApplicationsPage;
