import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
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
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Operations Payment &amp; Fee Transactions
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Monitor client statutory filing payments, payment gateway references, and financial reconciliations.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ maxWidth: '420px' }}>
          <TextInput
            label="Search Transactions"
            placeholder="Search by transaction ID, application, or gateway reference..."
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            width="100%"
          />
        </div>
      </Card>

      {/* Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Transaction ID</th>
                <th style={{ padding: '14px 18px' }}>Application</th>
                <th style={{ padding: '14px 18px' }}>Customer</th>
                <th style={{ padding: '14px 18px' }}>Amount</th>
                <th style={{ padding: '14px 18px' }}>Payment Mode</th>
                <th style={{ padding: '14px 18px' }}>Gateway Reference</th>
                <th style={{ padding: '14px 18px' }}>Timestamp</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                    {t.id}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ color: '#d97706', fontFamily: 'monospace', fontWeight: 600 }}>#{t.applicationId}</span>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#334155', fontWeight: 600 }}>
                    {t.customerName}
                  </td>

                  <td style={{ padding: '14px 18px', fontWeight: 800, color: '#059669' }}>
                    ₹{t.amount.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: '14px 18px', color: '#475569' }}>
                    {t.paymentGateway}
                  </td>

                  <td style={{ padding: '14px 18px', fontFamily: 'monospace', color: '#64748b', fontSize: '12.5px' }}>
                    {t.gatewayRef}
                  </td>

                  <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '12px' }}>
                    {t.timestamp}
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <Badge label={t.status} variant="green" />
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

export default CoordinatorTransactionsPage;
