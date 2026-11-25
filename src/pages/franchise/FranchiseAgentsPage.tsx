import { Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Associated Agents Directory
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Manage your network of territory agents, review customer acquisition numbers, and monitor filing revenue.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ maxWidth: "26.25rem" }}>
          <Field
            label="Search Agents"
            placeholder="Search by agent name, ID, city or referral code..."
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            width="100%"
          />
        </Surface>
      </Panel>

      {/* Agents Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Agent Name &amp; ID</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Referral Code</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Contact Info</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Territory / City</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Clients</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Gross Revenue</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ag) => (
                <tr key={ag.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{ag.name}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#0284c7", fontFamily: 'monospace', fontWeight: 600 }}>
                      {ag.id}
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Inline style={{ fontFamily: 'monospace', fontWeight: 700, color: "var(--teal)", background: "#ecfdf5", padding: "0.25rem 0.5rem", borderRadius: "0.375rem" }}>
                      {ag.referralCode}
                    </Inline>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.125rem", fontSize: "0.8125rem" }}>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                        <Phone size={12} color="var(--muted)" /> {ag.phone}
                      </Inline>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "0.25rem", color: "var(--muted)" }}>
                        <Mail size={12} color="var(--muted)" /> {ag.email}
                      </Inline>
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "#334155" }}>
                    {ag.city}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{ag.customersCount} clients</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{ag.applicationsCount} filings</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", fontWeight: 700, color: "#0284c7" }}>
                    ₹{ag.totalRevenue.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
                    <Badge label={ag.status} variant="green" />
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

export default FranchiseAgentsPage;
