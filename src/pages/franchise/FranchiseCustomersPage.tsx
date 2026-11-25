import { Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
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
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Network Customer Directory
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          View all business clients onboarded through your network agents and monitor their cumulative statutory filing orders.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ maxWidth: "26.25rem" }}>
          <Field
            label="Search Customers"
            placeholder="Search by client name, business, city, or agent..."
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            width="100%"
          />
        </Surface>
      </Panel>

      {/* Customers Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Client &amp; Enterprise</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Attributed Agent</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Contact</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Location</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Active Orders</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{c.name}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{c.businessName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#687d93" }}>ID: {c.id}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--navy)" }}>{c.agentName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#0284c7", fontFamily: 'monospace' }}>{c.agentId}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.125rem", fontSize: "0.8125rem" }}>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                        <Phone size={12} color="var(--muted)" /> {c.phone}
                      </Inline>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "0.25rem", color: "var(--muted)" }}>
                        <Mail size={12} color="var(--muted)" /> {c.email}
                      </Inline>
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "#334155" }}>
                    {c.city}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Inline style={{ fontWeight: 700, color: "var(--navy)" }}>{c.activeOrders} orders</Inline>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right', fontWeight: 800, color: "var(--teal)", fontSize: "0.875rem" }}>
                    ₹{c.totalSpent.toLocaleString('en-IN')}
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

export default FranchiseCustomersPage;
