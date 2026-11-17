import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
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
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Franchise Commission Statements
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Itemized accounting of 10% franchise network override revenue earned across all regional agent filings.
        </p>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total Franchise Override Accrued</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            ₹{franchise.franchiseCommissionEarned.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#0284c7', marginTop: '4px', fontWeight: 600 }}>
            Cumulative network override
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Disbursed to Franchise Bank</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            ₹{franchise.totalDisbursed.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            Settled to {franchise.bank}
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Available for Settlement</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#d97706', marginTop: '4px' }}>
            ₹{franchise.pendingPayout.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#d97706', marginTop: '4px', fontWeight: 600 }}>
            Eligible for immediate withdrawal
          </div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '420px' }}>
            <TextInput
              label="Search Commissions"
              placeholder="Search by statement ID, service, or agent..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['All', 'Approved', 'Pending', 'Disbursed'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: statusFilter === filter ? '1px solid #0284c7' : '1px solid #cbd5e1',
                  background: statusFilter === filter ? '#f0f9ff' : '#ffffff',
                  color: statusFilter === filter ? '#0284c7' : '#475569',
                  fontSize: '13px',
                  fontWeight: statusFilter === filter ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Statement ID &amp; Date</th>
                <th style={{ padding: '14px 18px' }}>Application &amp; Service</th>
                <th style={{ padding: '14px 18px' }}>Producing Agent</th>
                <th style={{ padding: '14px 18px' }}>Order Total</th>
                <th style={{ padding: '14px 18px' }}>Override Rate</th>
                <th style={{ padding: '14px 18px' }}>Franchise Cut</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>{c.id}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{c.date}</div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{c.serviceName}</div>
                    <div style={{ fontSize: '11.5px', color: '#0284c7', fontFamily: 'monospace' }}>#{c.applicationId}</div>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#334155' }}>
                    {c.agentName}
                  </td>

                  <td style={{ padding: '14px 18px', fontWeight: 600, color: '#0f172a' }}>
                    ₹{c.orderTotal.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: '14px 18px', color: '#64748b', fontWeight: 600 }}>
                    {c.franchiseRate}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#059669' }}>
                      +₹{c.franchiseAmount}
                    </span>
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <Badge
                      label={c.status}
                      variant={c.status === 'Disbursed' ? 'green' : c.status === 'Approved' ? 'blue' : 'orange'}
                    />
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

export default FranchiseCommissionsPage;
