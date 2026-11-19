import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  Star,
  UserCheck
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { INITIAL_COORDINATOR_CAS } from '../../features/coordinator/coordinatorData';

export const CoordinatorCAManagementPage: React.FC = () => {
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            CA Capacity Management &amp; Workload Matrix
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Supervise active professional caseloads, discipline specializations, performance ratings, and availability status.
        </p>
      </Surface>

      {/* Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ maxWidth: "var(--spacing-fsk-50)" }}>
          <TextInput
            label="Search CA Matrix"
            placeholder="Search by name, ICAI number, discipline or city..."
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            width="100%"
          />
        </Surface>
      </Card>

      {/* CA Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Chartered Accountant</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>ICAI Reg Number</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Specialization</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Active Caseload</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Rating</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Location</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>Availability</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ca) => (
                <tr key={ca.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                      <Surface style={{ width: "var(--spacing-fsk-52)", height: "var(--spacing-fsk-52)", borderRadius: '50%', background: "var(--color-fsk-53)", color: "var(--color-fsk-41)", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                        <UserCheck size={16} />
                      </Surface>
                      <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{ca.name}</Surface>
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", fontFamily: 'monospace', color: "var(--color-fsk-41)", fontWeight: 600 }}>
                    {ca.membershipNo}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-25)" }}>
                    {ca.specialization}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
                      <strong style={{ color: "var(--color-fsk-7)" }}>{ca.activeCaseload} / {ca.capacityLimit}</strong>
                      <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>active</Inline>
                    </Surface>
                    <Surface style={{ width: "var(--spacing-fsk-109)", height: "var(--spacing-fsk-17)", background: "var(--color-fsk-21)", borderRadius: "var(--radius-fsk-110)", marginTop: "var(--spacing-fsk-29)", overflow: 'hidden' }}>
                      <Surface
                        style={{
                          width: `${(ca.activeCaseload / ca.capacityLimit) * 100}%`,
                          height: '100%',
                          background: ca.activeCaseload >= ca.capacityLimit - 1 ? "var(--color-fsk-54)" : "var(--color-fsk-65)",
                          borderRadius: "var(--radius-fsk-110)",
                        }}
                      />
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)", fontWeight: 700, color: "var(--color-fsk-54)" }}>
                      <Star size={13} fill="var(--color-fsk-54)" /> {ca.rating}
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-9)" }}>
                    {ca.city}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>
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
      </Card>
    </Surface>
  );
};

export default CoordinatorCAManagementPage;
