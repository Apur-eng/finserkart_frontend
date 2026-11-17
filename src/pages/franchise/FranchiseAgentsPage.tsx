import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  Mail,
  Phone
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { INITIAL_FRANCHISE_AGENTS } from '../../features/franchise/franchiseData';

export const FranchiseAgentsPage: React.FC = () => {
  const agents = INITIAL_FRANCHISE_AGENTS;
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return agents.filter((ag) => {
      return (
        ag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ag.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ag.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ag.referralCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [agents, searchQuery]);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Associated Agents Directory
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Manage your network of territory agents, review customer acquisition numbers, and monitor filing revenue.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ maxWidth: '420px' }}>
          <TextInput
            label="Search Agents"
            placeholder="Search by agent name, ID, city or referral code..."
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            width="100%"
          />
        </div>
      </Card>

      {/* Agents Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Agent Name &amp; ID</th>
                <th style={{ padding: '14px 18px' }}>Referral Code</th>
                <th style={{ padding: '14px 18px' }}>Contact Info</th>
                <th style={{ padding: '14px 18px' }}>Territory / City</th>
                <th style={{ padding: '14px 18px' }}>Clients</th>
                <th style={{ padding: '14px 18px' }}>Gross Revenue</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ag) => (
                <tr key={ag.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{ag.name}</div>
                    <div style={{ fontSize: '11.5px', color: '#0284c7', fontFamily: 'monospace', fontWeight: 600 }}>
                      {ag.id}
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '4px 8px', borderRadius: '6px' }}>
                      {ag.referralCode}
                    </span>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '12.5px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Phone size={12} color="#64748b" /> {ag.phone}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                        <Mail size={12} color="#64748b" /> {ag.email}
                      </span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#334155' }}>
                    {ag.city}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{ag.customersCount} clients</div>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>{ag.applicationsCount} filings</div>
                  </td>

                  <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0284c7' }}>
                    ₹{ag.totalRevenue.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <Badge label={ag.status} variant="green" />
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

export default FranchiseAgentsPage;
