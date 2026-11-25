import { ActionButton, Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        <Surface>
          <Title level={1}>
            <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
              Customer Directory
            </Inline>
          </Title>
          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
            Inspect client accounts onboarded under your referral code, manage KYC status, and monitor active orders.
          </p>
        </Surface>

        <ActionButton
          label="Onboard New Customer"
          variant="primary"
          size="md"
          icon={<UserPlus size={16} />}
          onClick={() => navigate('/agent/customers/onboard')}
        />
      </Surface>

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "1rem", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, 17.5rem)", maxWidth: "26.25rem" }}>
            <Field
              label="Search Clients"
              placeholder="Search by client name, business, city, email or phone..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.5rem" }}>
            {(['All', 'Verified', 'Pending'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "1rem",
                  border: statusFilter === filter ? "0.0625rem solid #059669" : "0.0625rem solid #cbd5e1",
                  background: statusFilter === filter ? "#ecfdf5" : "var(--white)",
                  color: statusFilter === filter ? "var(--teal)" : "var(--muted)",
                  fontSize: "0.8125rem",
                  fontWeight: statusFilter === filter ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {filter} {filter === 'All' ? `(${customers.length})` : ''}
              </button>
            ))}
          </Surface>
        </Surface>
      </Panel>

      {/* Customers Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Client &amp; Enterprise</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Contact Info</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Location</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Onboarded</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Active Orders</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>KYC Status</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                      <Surface
                        style={{
                          width: "2.25rem",
                          height: "2.25rem",
                          borderRadius: '50%',
                          background: "#ecfdf5",
                          color: "var(--teal)",
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: "0.8125rem",
                        }}
                      >
                        {cust.name[0]}
                      </Surface>
                      <Surface>
                        <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{cust.name}</Surface>
                        <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{cust.businessName}</Surface>
                        <Surface style={{ fontSize: "0.8125rem", color: "#687d93" }}>ID: {cust.id}</Surface>
                      </Surface>
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.125rem", color: "#334155" }}>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "0.3125rem", fontSize: "0.8125rem" }}>
                        <Phone size={13} color="var(--muted)" /> {cust.phone}
                      </Inline>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "0.3125rem", fontSize: "0.8125rem", color: "var(--muted)" }}>
                        <Mail size={13} color="var(--muted)" /> {cust.email}
                      </Inline>
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "#334155" }}>
                    {cust.city}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "var(--muted)", fontSize: "0.8125rem" }}>
                    {cust.onboardedDate}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{cust.activeOrdersCount} orders</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--teal)" }}>Total: ₹{cust.totalSpent.toLocaleString('en-IN')}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Badge
                      label={cust.kycStatus}
                      variant={cust.kycStatus === 'Verified' ? 'green' : 'orange'}
                    />
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
                    <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={() => navigate('/agent/applications')}
                        title="View Orders"
                        style={{
                          padding: "0.375rem 0.625rem",
                          borderRadius: "0.375rem",
                          border: "0.0625rem solid var(--border)",
                          background: "var(--white)",
                          color: "var(--teal)",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: "0.25rem",
                        }}
                      >
                        <FileText size={13} /> Orders
                      </button>
                    </Surface>
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

export default AgentCustomerDirectoryPage;
