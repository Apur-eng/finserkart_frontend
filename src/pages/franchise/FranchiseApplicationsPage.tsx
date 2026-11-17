import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Franchise Network Applications
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Track all statutory filing workflows submitted across your regional agent network and monitor franchise revenue splits.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '420px' }}>
            <TextInput
              label="Search Applications"
              placeholder="Search by ID, service name, client or agent..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['All', 'Processing', 'Assigned', 'Completed'] as const).map((filter) => (
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

      {/* Applications Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Application ID &amp; Service</th>
                <th style={{ padding: '14px 18px' }}>Client</th>
                <th style={{ padding: '14px 18px' }}>Attributed Agent</th>
                <th style={{ padding: '14px 18px' }}>Assigned CA</th>
                <th style={{ padding: '14px 18px' }}>Order Total</th>
                <th style={{ padding: '14px 18px' }}>Franchise Override</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{app.serviceName}</div>
                    <div style={{ fontSize: '11.5px', color: '#0284c7', fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#334155', fontWeight: 600 }}>
                    {app.customerName}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{app.agentName}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{app.agentId}</div>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#475569' }}>
                    {app.caName}
                  </td>

                  <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0f172a' }}>
                    ₹{app.amount.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#059669' }}>
                      +₹{app.franchiseCut}
                    </span>
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <Badge
                      label={app.status}
                      variant={app.status === 'Completed' ? 'green' : app.status === 'Processing' ? 'orange' : 'blue'}
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

export default FranchiseApplicationsPage;
