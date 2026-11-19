import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import React, { useMemo, useState } from 'react';
import {
  INITIAL_AGENT_COMMISSIONS,
  INITIAL_AGENT_PROFILE
} from '../../features/agent/agentData';

export const AgentCommissionsPage: React.FC = () => {
  const agent = INITIAL_AGENT_PROFILE;
  const commissions = INITIAL_AGENT_COMMISSIONS;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Approved' | 'Pending' | 'Disbursed'>('All');

  const filtered = useMemo(() => {
    return commissions.filter((c) => {
      const matchesSearch =
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.customerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' ? true : c.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [commissions, searchQuery, statusFilter]);

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Commission Ledger
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Itemized accounting ledger of your partner commissions, percentage payouts, and settlement stages.
        </p>
      </Surface>

      {/* KPI Cards */}
      <Surface
        style={{
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))",
          gap: "var(--spacing-fsk-2)",
          marginBottom: "var(--spacing-fsk-20)",
        }}
      >
        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Total Commission Accrued</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-29)" }}>
            ₹{agent.totalCommissionEarned.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-65)", marginTop: "var(--spacing-fsk-29)", fontWeight: 600 }}>
            Across all verified client services
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Disbursed to Bank</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-65)", marginTop: "var(--spacing-fsk-29)" }}>
            ₹{agent.totalPaidPayouts.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-29)" }}>
            Settled to {agent.bank}
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Pending Settlement</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-54)", marginTop: "var(--spacing-fsk-29)" }}>
            ₹{agent.pendingCommission.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-54)", marginTop: "var(--spacing-fsk-29)", fontWeight: 600 }}>
            Included in next settlement run
          </Surface>
        </Card>
      </Surface>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, var(--spacing-fsk-45))", maxWidth: "var(--spacing-fsk-50)" }}>
            <TextInput
              label="Search Ledger"
              placeholder="Search by commission ID, service, or client..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)" }}>
            {(['All', 'Approved', 'Pending', 'Disbursed'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  borderRadius: "var(--radius-fsk-28)",
                  border: statusFilter === filter ? "var(--spacing-fsk-22) solid var(--color-fsk-164)" : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                  background: statusFilter === filter ? "var(--color-fsk-64)" : "var(--color-fsk-38)",
                  color: statusFilter === filter ? "var(--color-fsk-65)" : "var(--color-fsk-18)",
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

      {/* Commissions Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Entry ID &amp; Date</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Application &amp; Service</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Client</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Order Total</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Rate</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Commission</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)", fontFamily: 'monospace' }}>{c.id}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)" }}>{c.date}</Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>{c.serviceName}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-65)", fontFamily: 'monospace' }}>#{c.applicationId}</Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-25)" }}>
                    {c.customerName}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", fontWeight: 600, color: "var(--color-fsk-7)" }}>
                    ₹{c.orderAmount.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-9)", fontWeight: 600 }}>
                    {c.commissionRate}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Inline style={{ fontSize: "var(--font-fsk-19)", fontWeight: 800, color: "var(--color-fsk-65)" }}>
                      +₹{c.commissionAmount}
                    </Inline>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>
                    <Badge
                      label={c.status}
                      variant={c.status === 'Disbursed' ? 'green' : c.status === 'Approved' ? 'blue' : 'orange'}
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

export default AgentCommissionsPage;
