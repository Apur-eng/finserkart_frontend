import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  FileText,
  Mail,
  Phone,
  UserPlus
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_AGENT_CUSTOMERS } from '../../features/agent/agentData';

export const AgentCustomerDirectoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [customers] = useState(INITIAL_AGENT_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Verified' | 'Pending'>('All');

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' ? true : c.kycStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, statusFilter]);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '16px',
        }}
      >
        <div>
          <Heading level={1}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Customer Directory
            </span>
          </Heading>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
            Inspect client accounts onboarded under your referral code, manage KYC status, and monitor active orders.
          </p>
        </div>

        <Button
          label="Onboard New Customer"
          variant="primary"
          size="md"
          icon={<UserPlus size={16} />}
          onClick={() => navigate('/agent/customers/onboard')}
        />
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '420px' }}>
            <TextInput
              label="Search Clients"
              placeholder="Search by client name, business, city, email or phone..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['All', 'Verified', 'Pending'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: statusFilter === filter ? '1px solid #059669' : '1px solid #cbd5e1',
                  background: statusFilter === filter ? '#ecfdf5' : '#ffffff',
                  color: statusFilter === filter ? '#059669' : '#475569',
                  fontSize: '13px',
                  fontWeight: statusFilter === filter ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {filter} {filter === 'All' ? `(${customers.length})` : ''}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Customers Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Client &amp; Enterprise</th>
                <th style={{ padding: '14px 18px' }}>Contact Info</th>
                <th style={{ padding: '14px 18px' }}>Location</th>
                <th style={{ padding: '14px 18px' }}>Onboarded</th>
                <th style={{ padding: '14px 18px' }}>Active Orders</th>
                <th style={{ padding: '14px 18px' }}>KYC Status</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: '#ecfdf5',
                          color: '#059669',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '13px',
                        }}
                      >
                        {cust.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{cust.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{cust.businessName}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>ID: {cust.id}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', color: '#334155' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12.5px' }}>
                        <Phone size={13} color="#64748b" /> {cust.phone}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#64748b' }}>
                        <Mail size={13} color="#64748b" /> {cust.email}
                      </span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#334155' }}>
                    {cust.city}
                  </td>

                  <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '12.5px' }}>
                    {cust.onboardedDate}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{cust.activeOrdersCount} orders</div>
                    <div style={{ fontSize: '11.5px', color: '#059669' }}>Total: ₹{cust.totalSpent.toLocaleString('en-IN')}</div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <Badge
                      label={cust.kycStatus}
                      variant={cust.kycStatus === 'Verified' ? 'green' : 'orange'}
                    />
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => navigate('/agent/applications')}
                        title="View Orders"
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          background: '#ffffff',
                          color: '#059669',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <FileText size={13} /> Orders
                      </button>
                    </div>
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

export default AgentCustomerDirectoryPage;
