import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>
            <BarChart size={16} /> Central Platform Treasury
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
            Financial Reports & Transaction Management
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
            Live payment gateway settlements, platform GMV reconciliation, and compliance statements.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportCSV}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '8px',
            background: '#dc2626',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Download size={16} /> Export Financial Ledger
        </button>
      </div>

      {bannerMessage && (
        <Banner
          status="info"
          title="Finance Notification"
          description={bannerMessage}
        />
      )}

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <Card elevation="low" padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Gross Merchandise Value (GMV)</span>
            <Wallet size={20} color="#16a34a" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>
            ₹{analytics.totalGMV.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '4px' }}>
            +18.4% compared to previous quarter
          </div>
        </Card>

        <Card elevation="low" padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Platform Net Revenue</span>
            <CreditCard size={20} color="#2563eb" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>
            ₹{analytics.platformNetRevenue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#2563eb', marginTop: '4px' }}>
            After statutory GST and partner splits
          </div>
        </Card>

        <Card elevation="low" padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Gateway Success Rate</span>
            <CheckCircle size={20} color="#7c3aed" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>
            99.2%
          </div>
          <div style={{ fontSize: '12px', color: '#7c3aed', marginTop: '4px' }}>
            Razorpay + HDFC SmartGateway combined
          </div>
        </Card>
      </div>

      {/* Filter and Table Card */}
      <Card elevation="low" padding={5}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Live Platform Transactions
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
              All customer checkouts and statutory service payments across payment gateways.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['All', 'Success', 'Pending', 'Refunded'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: statusFilter === status ? '1px solid #dc2626' : '1px solid #e2e8f0',
                    background: statusFilter === status ? '#fee2e2' : '#ffffff',
                    color: statusFilter === status ? '#991b1b' : '#64748b',
                  }}
                >
                  {status}
                </button>
              ))}
            </div>

            <div style={{ width: '280px' }}>
              <TextInput
                label="Search Transactions"
                placeholder="Search reference, customer or ID..."
                value={searchTerm}
                onChange={(val) => setSearchTerm(val)}
              />
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Transaction ID</th>
                <th style={{ padding: '12px 16px' }}>Customer Name</th>
                <th style={{ padding: '12px 16px' }}>Service Description</th>
                <th style={{ padding: '12px 16px' }}>Gross Amount</th>
                <th style={{ padding: '12px 16px' }}>Gateway & Reference</th>
                <th style={{ padding: '12px 16px' }}>Timestamp</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                    {tx.id}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                    {tx.customerName}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#334155' }}>
                    {tx.serviceName}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 500, color: '#0f172a' }}>{tx.gateway}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{tx.referenceId}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    {tx.date}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
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
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    {tx.status === 'Success' ? (
                      <button
                        type="button"
                        onClick={() => handleRefund(tx.id, tx.customerName, tx.amount)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: '1px solid #e2e8f0',
                          background: '#ffffff',
                          color: '#dc2626',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Refund
                      </button>
                    ) : (
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
