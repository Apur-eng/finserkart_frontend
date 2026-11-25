import { Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            CA Allocation &amp; Compliance Oversight
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Supervise the certified regulatory Chartered Accountant panel, verify compliance standards, and manage capacity quotas.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ maxWidth: "26.25rem" }}>
          <Field
            label="Search CA Panel"
            placeholder="Search by CA name, ICAI number, discipline or city..."
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            width="100%"
          />
        </Surface>
      </Panel>

      {/* Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Chartered Accountant</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>ICAI Reg Number</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Specialization Discipline</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Caseload Capacity</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Client Rating</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>City Hub</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Availability</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ca) => (
                <tr key={ca.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                      <Surface style={{ width: "2.125rem", height: "2.125rem", borderRadius: '50%', background: "#f5f3ff", color: "#7c3aed", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                        <UserCheck size={16} />
                      </Surface>
                      <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{ca.name}</Surface>
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", fontFamily: 'monospace', color: "#7c3aed", fontWeight: 600 }}>
                    {ca.membershipNo}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "#334155" }}>
                    {ca.specialization}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                      <strong style={{ color: "var(--navy)" }}>{ca.activeCaseload} / {ca.capacityLimit}</strong>
                      <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>active</Inline>
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.25rem", fontWeight: 700, color: "#d97706" }}>
                      <Star size={13} fill="#d97706" /> {ca.rating}
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "var(--muted)" }}>
                    {ca.city}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
                    <Badge
                      label={ca.availability}
                      variant={ca.availability === 'Available' ? 'green' : 'orange'}
                    />
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

export default AdminCAManagementPage;
