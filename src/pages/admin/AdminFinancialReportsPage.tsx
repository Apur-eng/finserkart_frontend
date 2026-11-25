import { Notice, Panel, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  BarChart,
  CheckCircle,
  CreditCard,
  Download,
  Wallet
} from 'lucide-react';
import React, { useState } from 'react';
import {
  INITIAL_ADMIN_ANALYTICS,
  INITIAL_ADMIN_TRANSACTIONS,
  type AdminTransactionItem
} from '../../features/admin/adminData';

export const AdminFinancialReportsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<AdminTransactionItem[]>(INITIAL_ADMIN_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const analytics = INITIAL_ADMIN_ANALYTICS;

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRefund = (id: string, customer: string, amount: number) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Refunded' } : t))
    );
    setBannerMessage(`Refund of ₹${amount.toLocaleString('en-IN')} initiated for transaction ${id} (${customer}).`);
  };

  const handleExportCSV = () => {
    setBannerMessage('Financial statement export generated: Finservkart_Ledger_Q1_2026.csv downloaded.');
  };

  return (
    <Surface style={{ maxWidth: "85rem", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
      {/* Header */}
      <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: "1rem" }}>
        <Surface>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", color: "#dc2626", fontSize: "0.8125rem", fontWeight: 600 }}>
            <BarChart size={16} /> Central Platform Treasury
          </Surface>
          <h1 style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", margin: "0.25rem 0 0 0" }}>
            Financial Reports & Transaction Management
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
            Live payment gateway settlements, platform GMV reconciliation, and compliance statements.
          </p>
        </Surface>
        <button
          type="button"
          onClick={handleExportCSV}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.5rem",
            padding: "0.625rem 1.125rem",
            borderRadius: "0.5rem",
            background: "#dc2626",
            color: "var(--white)",
            fontWeight: 600,
            fontSize: "0.875rem",
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Download size={16} /> Export Financial Ledger
        </button>
      </Surface>

      {bannerMessage && (
        <Notice
          status="info"
          title="Finance Notification"
          description={bannerMessage}
        />
      )}

      {/* Metrics Row */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))", gap: "1rem" }}>
        <Panel elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>Gross Merchandise Value (GMV)</Inline>
            <Wallet size={20} color="#16a34a" />
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.75rem" }}>
            ₹{analytics.totalGMV.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", marginTop: "0.25rem" }}>
            +18.4% compared to previous quarter
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>Platform Net Revenue</Inline>
            <CreditCard size={20} color="var(--blue)" />
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.75rem" }}>
            ₹{analytics.platformNetRevenue.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--blue)", marginTop: "0.25rem" }}>
            After statutory GST and partner splits
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>Gateway Success Rate</Inline>
            <CheckCircle size={20} color="#7c3aed" />
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.75rem" }}>
            99.2%
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#7c3aed", marginTop: "0.25rem" }}>
            Razorpay + HDFC SmartGateway combined
          </Surface>
        </Panel>
      </Surface>

      {/* Filter and Table Panel */}
      <Panel elevation="low" padding={5}>
        <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1.25rem", flexWrap: 'wrap', gap: "1rem" }}>
          <Surface>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
              Live Platform Transactions
            </h2>
            <p style={{ fontSize: "0.8125rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
              All customer checkouts and statutory service payments across payment gateways.
            </p>
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.75rem", alignItems: 'center', flexWrap: 'wrap' }}>
            <Surface style={{ display: 'flex', gap: "0.375rem" }}>
              {['All', 'Success', 'Pending', 'Refunded'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  style={{
                    padding: "0.375rem 0.75rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: statusFilter === status ? "0.0625rem solid #dc2626" : "0.0625rem solid #e2e8f0",
                    background: statusFilter === status ? "#fee2e2" : "var(--white)",
                    color: statusFilter === status ? "#991b1b" : "var(--muted)",
                  }}
                >
                  {status}
                </button>
              ))}
            </Surface>

            <Surface style={{ width: "17.5rem" }}>
              <Field
                label="Search Transactions"
                placeholder="Search reference, customer or ID..."
                value={searchTerm}
                onChange={(val) => setSearchTerm(val)}
              />
            </Surface>
          </Surface>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontWeight: 600 }}>
                <th style={{ padding: "0.75rem 1rem" }}>Transaction ID</th>
                <th style={{ padding: "0.75rem 1rem" }}>Customer Name</th>
                <th style={{ padding: "0.75rem 1rem" }}>Service Description</th>
                <th style={{ padding: "0.75rem 1rem" }}>Gross Amount</th>
                <th style={{ padding: "0.75rem 1rem" }}>Gateway & Reference</th>
                <th style={{ padding: "0.75rem 1rem" }}>Timestamp</th>
                <th style={{ padding: "0.75rem 1rem" }}>Status</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 700, color: "var(--navy)" }}>
                    {tx.id}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 600, color: "var(--navy)" }}>
                    {tx.customerName}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#334155" }}>
                    {tx.serviceName}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 700, color: "var(--navy)", fontSize: "0.875rem" }}>
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <Surface style={{ fontWeight: 500, color: "var(--navy)" }}>{tx.gateway}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#687d93" }}>{tx.referenceId}</Surface>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "var(--muted)" }}>
                    {tx.date}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <Badge
                      label={tx.status}
                      variant={
                        tx.status === 'Success'
                          ? 'green'
                          : tx.status === 'Refunded'
                          ? 'gray'
                          : 'yellow'
                      }
                    />
                  </td>
                  <td style={{ padding: "0.875rem 1rem", textAlign: 'right' }}>
                    {tx.status === 'Success' ? (
                      <button
                        type="button"
                        onClick={() => handleRefund(tx.id, tx.customerName, tx.amount)}
                        style={{
                          padding: "0.25rem 0.625rem",
                          borderRadius: "0.25rem",
                          border: "0.0625rem solid var(--border)",
                          background: "var(--white)",
                          color: "#dc2626",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Refund
                      </button>
                    ) : (
                      <Inline style={{ fontSize: "0.8125rem", color: "#687d93" }}>Settled</Inline>
                    )}
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
