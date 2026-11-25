import { Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import React, { useMemo, useState } from 'react';
import { INITIAL_COORDINATOR_TRANSACTIONS } from '../../features/coordinator/coordinatorData';

export const CoordinatorTransactionsPage: React.FC = () => {
  const transactions = INITIAL_COORDINATOR_TRANSACTIONS;
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      return (
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.gatewayRef.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [transactions, searchQuery]);

  return (
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Operations Payment &amp; Fee Transactions
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Monitor client statutory filing payments, payment gateway references, and financial reconciliations.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ maxWidth: "26.25rem" }}>
          <Field
            label="Search Transactions"
            placeholder="Search by transaction ID, application, or gateway reference..."
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            width="100%"
          />
        </Surface>
      </Panel>

      {/* Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Transaction ID</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Application</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Customer</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Amount</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Payment Mode</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Gateway Reference</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Timestamp</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem", fontWeight: 700, color: "var(--navy)", fontFamily: 'monospace' }}>
                    {t.id}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Inline style={{ color: "#d97706", fontFamily: 'monospace', fontWeight: 600 }}>#{t.applicationId}</Inline>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "#334155", fontWeight: 600 }}>
                    {t.customerName}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", fontWeight: 800, color: "var(--teal)" }}>
                    ₹{t.amount.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "var(--muted)" }}>
                    {t.paymentGateway}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", fontFamily: 'monospace', color: "var(--muted)", fontSize: "0.8125rem" }}>
                    {t.gatewayRef}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "var(--muted)", fontSize: "0.8125rem" }}>
                    {t.timestamp}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
                    <Badge label={t.status} variant="green" />
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

export default CoordinatorTransactionsPage;
