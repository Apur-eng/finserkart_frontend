import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: "var(--spacing-fsk-26)",
          gap: "var(--spacing-fsk-5)",
        }}
      >
        <Surface>
          <Heading level={1}>
            <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
              Customer Directory
            </Inline>
          </Heading>
          <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
            Inspect client accounts onboarded under your referral code, manage KYC status, and monitor active orders.
          </p>
        </Surface>

        <Button
          label="Onboard New Customer"
          variant="primary"
          size="md"
          icon={<UserPlus size={16} />}
          onClick={() => navigate('/agent/customers/onboard')}
        />
      </Surface>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, var(--spacing-fsk-45))", maxWidth: "var(--spacing-fsk-50)" }}>
            <TextInput
              label="Search Clients"
              placeholder="Search by client name, business, city, email or phone..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)" }}>
            {(['All', 'Verified', 'Pending'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  borderRadius: "var(--radius-fsk-28)",
                  border: statusFilter === filter ? "var(--spacing-fsk-22) solid var(--color-fsk-164)" : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                  background: statusFilter === filter ? "var(--color-fsk-64)" : "var(--color-fsk-38)",
                  color: statusFilter === filter ? "var(--color-fsk-65)" : "var(--color-fsk-18)",
                  fontSize: "var(--font-fsk-14)",
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
      </Card>

      {/* Customers Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Client &amp; Enterprise</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Contact Info</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Location</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Onboarded</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Active Orders</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>KYC Status</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                      <Surface
                        style={{
                          width: "var(--spacing-fsk-85)",
                          height: "var(--spacing-fsk-85)",
                          borderRadius: '50%',
                          background: "var(--color-fsk-64)",
                          color: "var(--color-fsk-65)",
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: "var(--font-fsk-14)",
                        }}
                      >
                        {cust.name[0]}
                      </Surface>
                      <Surface>
                        <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{cust.name}</Surface>
                        <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{cust.businessName}</Surface>
                        <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)" }}>ID: {cust.id}</Surface>
                      </Surface>
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-47)", color: "var(--color-fsk-25)" }}>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-86)", fontSize: "var(--font-fsk-14)" }}>
                        <Phone size={13} color="var(--color-fsk-9)" /> {cust.phone}
                      </Inline>
                      <Inline style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-86)", fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
                        <Mail size={13} color="var(--color-fsk-9)" /> {cust.email}
                      </Inline>
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-25)" }}>
                    {cust.city}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)" }}>
                    {cust.onboardedDate}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{cust.activeOrdersCount} orders</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-65)" }}>Total: ₹{cust.totalSpent.toLocaleString('en-IN')}</Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Badge
                      label={cust.kycStatus}
                      variant={cust.kycStatus === 'Verified' ? 'green' : 'orange'}
                    />
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>
                    <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "var(--spacing-fsk-12)" }}>
                      <button
                        type="button"
                        onClick={() => navigate('/agent/applications')}
                        title="View Orders"
                        style={{
                          padding: "var(--spacing-fsk-17) var(--spacing-fsk-35)",
                          borderRadius: "var(--radius-fsk-42)",
                          border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
                          background: "var(--color-fsk-38)",
                          color: "var(--color-fsk-65)",
                          fontSize: "var(--font-fsk-14)",
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: "var(--spacing-fsk-29)",
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
      </Card>
    </Surface>
  );
};

export default AgentCustomerDirectoryPage;
