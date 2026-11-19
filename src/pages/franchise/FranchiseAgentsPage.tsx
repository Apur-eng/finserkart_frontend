import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Associated Agents Directory
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Manage your network of territory agents, review customer acquisition numbers, and monitor filing revenue.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ maxWidth: "var(--spacing-fsk-50)" }}>
          <TextInput
            label="Search Agents"
            placeholder="Search by agent name, ID, city or referral code..."
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            width="100%"
          />
        </Surface>
      </Card>

      {/* Agents Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Agent Name &amp; ID</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Referral Code</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Contact Info</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Territory / City</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Clients</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Gross Revenue</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ag) => (
                <tr key={ag.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{ag.name}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-70)", fontFamily: 'monospace', fontWeight: 600 }}>
                      {ag.id}
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Inline style={{ fontFamily: 'monospace', fontWeight: 700, color: "var(--color-fsk-65)", background: "var(--color-fsk-64)", padding: "var(--spacing-fsk-29) var(--spacing-fsk-12)", borderRadius: "var(--radius-fsk-42)" }}>
                      {ag.referralCode}
                    </Inline>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-47)", fontSize: "var(--font-fsk-14)" }}>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                        <Phone size={12} color="var(--color-fsk-9)" /> {ag.phone}
                      </Inline>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)", color: "var(--color-fsk-9)" }}>
                        <Mail size={12} color="var(--color-fsk-9)" /> {ag.email}
                      </Inline>
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-25)" }}>
                    {ag.city}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{ag.customersCount} clients</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{ag.applicationsCount} filings</Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", fontWeight: 700, color: "var(--color-fsk-70)" }}>
                    ₹{ag.totalRevenue.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>
                    <Badge label={ag.status} variant="green" />
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

export default FranchiseAgentsPage;
