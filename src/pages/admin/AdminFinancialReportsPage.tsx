import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Banner } from '@astryxdesign/core/Banner';
import { Card } from '@astryxdesign/core/Card';
import { TextInput } from '@astryxdesign/core/TextInput';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-33)", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-20)" }}>
      {/* Header */}
      <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)" }}>
        <Surface>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", color: "var(--color-fsk-34)", fontSize: "var(--font-fsk-14)", fontWeight: 600 }}>
            <BarChart size={16} /> Central Platform Treasury
          </Surface>
          <h1 style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
            Financial Reports & Transaction Management
          </h1>
          <p style={{ fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
            Live payment gateway settlements, platform GMV reconciliation, and compliance statements.
          </p>
        </Surface>
        <button
          type="button"
          onClick={handleExportCSV}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-12)",
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-36)",
            borderRadius: "var(--radius-fsk-37)",
            background: "var(--color-fsk-34)",
            color: "var(--color-fsk-38)",
            fontWeight: 600,
            fontSize: "var(--font-fsk-24)",
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Download size={16} /> Export Financial Ledger
        </button>
      </Surface>

      {bannerMessage && (
        <Banner
          status="info"
          title="Finance Notification"
          description={bannerMessage}
        />
      )}

      {/* Metrics Row */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
        <Card elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 500 }}>Gross Merchandise Value (GMV)</Inline>
            <Wallet size={20} color="var(--color-fsk-39)" />
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-8)" }}>
            ₹{analytics.totalGMV.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", marginTop: "var(--spacing-fsk-29)" }}>
            +18.4% compared to previous quarter
          </Surface>
        </Card>

        <Card elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 500 }}>Platform Net Revenue</Inline>
            <CreditCard size={20} color="var(--color-fsk-40)" />
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-8)" }}>
            ₹{analytics.platformNetRevenue.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-40)", marginTop: "var(--spacing-fsk-29)" }}>
            After statutory GST and partner splits
          </Surface>
        </Card>

        <Card elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 500 }}>Gateway Success Rate</Inline>
            <CheckCircle size={20} color="var(--color-fsk-41)" />
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-8)" }}>
            99.2%
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-41)", marginTop: "var(--spacing-fsk-29)" }}>
            Razorpay + HDFC SmartGateway combined
          </Surface>
        </Card>
      </Surface>

      {/* Filter and Table Card */}
      <Card elevation="low" padding={5}>
        <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-2)", flexWrap: 'wrap', gap: "var(--spacing-fsk-5)" }}>
          <Surface>
            <h2 style={{ fontSize: "var(--font-fsk-30)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
              Live Platform Transactions
            </h2>
            <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
              All customer checkouts and statutory service payments across payment gateways.
            </p>
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-8)", alignItems: 'center', flexWrap: 'wrap' }}>
            <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-17)" }}>
              {['All', 'Success', 'Pending', 'Refunded'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  style={{
                    padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                    borderRadius: "var(--radius-fsk-42)",
                    fontSize: "var(--font-fsk-14)",
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: statusFilter === status ? "var(--spacing-fsk-22) solid var(--color-fsk-34)" : "var(--spacing-fsk-22) solid var(--color-fsk-163)",
                    background: statusFilter === status ? "var(--color-fsk-43)" : "var(--color-fsk-38)",
                    color: statusFilter === status ? "var(--color-fsk-44)" : "var(--color-fsk-9)",
                  }}
                >
                  {status}
                </button>
              ))}
            </Surface>

            <Surface style={{ width: "var(--spacing-fsk-45)" }}>
              <TextInput
                label="Search Transactions"
                placeholder="Search reference, customer or ID..."
                value={searchTerm}
                onChange={(val) => setSearchTerm(val)}
              />
            </Surface>
          </Surface>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontWeight: 600 }}>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Transaction ID</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Customer Name</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Service Description</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Gross Amount</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Gateway & Reference</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Timestamp</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Status</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)", textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                    {tx.id}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 600, color: "var(--color-fsk-7)" }}>
                    {tx.customerName}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-25)" }}>
                    {tx.serviceName}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 700, color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-24)" }}>
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>
                    <Surface style={{ fontWeight: 500, color: "var(--color-fsk-7)" }}>{tx.gateway}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)" }}>{tx.referenceId}</Surface>
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-9)" }}>
                    {tx.date}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>
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
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", textAlign: 'right' }}>
                    {tx.status === 'Success' ? (
                      <button
                        type="button"
                        onClick={() => handleRefund(tx.id, tx.customerName, tx.amount)}
                        style={{
                          padding: "var(--spacing-fsk-29) var(--spacing-fsk-35)",
                          borderRadius: "var(--radius-fsk-48)",
                          border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
                          background: "var(--color-fsk-38)",
                          color: "var(--color-fsk-34)",
                          fontSize: "var(--font-fsk-14)",
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Refund
                      </button>
                    ) : (
                      <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)" }}>Settled</Inline>
                    )}
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
