import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  Mail,
  Phone
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { INITIAL_FRANCHISE_CUSTOMERS } from '../../features/franchise/franchiseData';

export const FranchiseCustomersPage: React.FC = () => {
  const customers = INITIAL_FRANCHISE_CUSTOMERS;
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      return (
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [customers, searchQuery]);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Network Customer Directory
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          View all business clients onboarded through your network agents and monitor their cumulative statutory filing orders.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ maxWidth: '420px' }}>
          <TextInput
            label="Search Customers"
            placeholder="Search by client name, business, city, or agent..."
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            width="100%"
          />
        </div>
      </Card>

      {/* Customers Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Client &amp; Enterprise</th>
                <th style={{ padding: '14px 18px' }}>Attributed Agent</th>
                <th style={{ padding: '14px 18px' }}>Contact</th>
                <th style={{ padding: '14px 18px' }}>Location</th>
                <th style={{ padding: '14px 18px' }}>Active Orders</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{c.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{c.businessName}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>ID: {c.id}</div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{c.agentName}</div>
                    <div style={{ fontSize: '11.5px', color: '#0284c7', fontFamily: 'monospace' }}>{c.agentId}</div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '12.5px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Phone size={12} color="#64748b" /> {c.phone}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                        <Mail size={12} color="#64748b" /> {c.email}
                      </span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#334155' }}>
                    {c.city}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{c.activeOrders} orders</span>
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 800, color: '#059669', fontSize: '14px' }}>
                    ₹{c.totalSpent.toLocaleString('en-IN')}
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

export default FranchiseCustomersPage;
