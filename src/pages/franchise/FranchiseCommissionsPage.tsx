import { Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import React, { useMemo, useState } from 'react';
import {
  INITIAL_FRANCHISE_COMMISSIONS,
  INITIAL_FRANCHISE_PROFILE
} from '../../features/franchise/franchiseData';

export const FranchiseCommissionsPage: React.FC = () => {
  const franchise = INITIAL_FRANCHISE_PROFILE;
  const commissions = INITIAL_FRANCHISE_COMMISSIONS;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Approved' | 'Pending' | 'Disbursed'>('All');

  const filtered = useMemo(() => {
    return commissions.filter((c) => {
      const matchesSearch =
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.agentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' ? true : c.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [commissions, searchQuery, statusFilter]);

  return (
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Franchise Commission Statements
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Itemized accounting of 10% franchise network override revenue earned across all regional agent filings.
        </p>
      </Surface>

      {/* KPI Cards */}
      <Surface
        style={{
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))",
          gap: "1.25rem",
          marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)",
        }}
      >
        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Total Franchise Override Accrued</Surface>
          <Surface style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", marginTop: "0.25rem" }}>
            ₹{franchise.franchiseCommissionEarned.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#0284c7", marginTop: "0.25rem", fontWeight: 600 }}>
            Cumulative network override
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Disbursed to Franchise Bank</Surface>
          <Surface style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--teal)", marginTop: "0.25rem" }}>
            ₹{franchise.totalDisbursed.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.25rem" }}>
            Settled to {franchise.bank}
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Available for Settlement</Surface>
          <Surface style={{ fontSize: "1.625rem", fontWeight: 800, color: "#d97706", marginTop: "0.25rem" }}>
            ₹{franchise.pendingPayout.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#d97706", marginTop: "0.25rem", fontWeight: 600 }}>
            Eligible for immediate withdrawal
          </Surface>
        </Panel>
      </Surface>

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "1rem", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, 17.5rem)", maxWidth: "26.25rem" }}>
            <Field
              label="Search Commissions"
              placeholder="Search by statement ID, service, or agent..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.5rem" }}>
            {(['All', 'Approved', 'Pending', 'Disbursed'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "1rem",
                  border: statusFilter === filter ? "0.0625rem solid #0284c7" : "0.0625rem solid #cbd5e1",
                  background: statusFilter === filter ? "#f0f9ff" : "var(--white)",
                  color: statusFilter === filter ? "#0284c7" : "var(--muted)",
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
                <th style={{ padding: "0.875rem 1.125rem" }}>Statement ID &amp; Date</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Application &amp; Service</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Producing Agent</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Order Total</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Override Rate</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Franchise Cut</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--navy)", fontFamily: 'monospace' }}>{c.id}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#687d93" }}>{c.date}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--navy)" }}>{c.serviceName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#0284c7", fontFamily: 'monospace' }}>#{c.applicationId}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "#334155" }}>
                    {c.agentName}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", fontWeight: 600, color: "var(--navy)" }}>
                    ₹{c.orderTotal.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "var(--muted)", fontWeight: 600 }}>
                    {c.franchiseRate}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Inline style={{ fontSize: "0.9375rem", fontWeight: 800, color: "var(--teal)" }}>
                      +₹{c.franchiseAmount}
                    </Inline>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
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
      </Panel>
    </Surface>
  );
};

export default FranchiseCommissionsPage;
