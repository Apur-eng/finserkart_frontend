import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  Star,
  UserCheck
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { INITIAL_COORDINATOR_CAS } from '../../features/coordinator/coordinatorData';

export const AdminCAManagementPage: React.FC = () => {
  const cas = INITIAL_COORDINATOR_CAS;
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return cas.filter((c) => {
      return (
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.membershipNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [cas, searchQuery]);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            CA Allocation &amp; Compliance Oversight
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Supervise the certified regulatory Chartered Accountant panel, verify compliance standards, and manage capacity quotas.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ maxWidth: '420px' }}>
          <TextInput
            label="Search CA Panel"
            placeholder="Search by CA name, ICAI number, discipline or city..."
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
                <th style={{ padding: '14px 18px' }}>Chartered Accountant</th>
                <th style={{ padding: '14px 18px' }}>ICAI Reg Number</th>
                <th style={{ padding: '14px 18px' }}>Specialization Discipline</th>
                <th style={{ padding: '14px 18px' }}>Caseload Capacity</th>
                <th style={{ padding: '14px 18px' }}>Client Rating</th>
                <th style={{ padding: '14px 18px' }}>City Hub</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Availability</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ca) => (
                <tr key={ca.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                        <UserCheck size={16} />
                      </div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{ca.name}</div>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px', fontFamily: 'monospace', color: '#7c3aed', fontWeight: 600 }}>
                    {ca.membershipNo}
                  </td>

                  <td style={{ padding: '14px 18px', color: '#334155' }}>
                    {ca.specialization}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ color: '#0f172a' }}>{ca.activeCaseload} / {ca.capacityLimit}</strong>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>active</span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: '#d97706' }}>
                      <Star size={13} fill="#d97706" /> {ca.rating}
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#64748b' }}>
                    {ca.city}
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <Badge
                      label={ca.availability}
                      variant={ca.availability === 'Available' ? 'green' : 'orange'}
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

export default AdminCAManagementPage;
