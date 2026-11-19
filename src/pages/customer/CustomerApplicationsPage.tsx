import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { EmptyState } from '@astryxdesign/core/EmptyState';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import { PlusCircle } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ApplicationWorkflowStatus } from '../../features/customer/customerData';
import { INITIAL_APPLICATIONS } from '../../features/customer/customerData';

export const CustomerApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | ApplicationWorkflowStatus>('All');

  const filteredApplications = useMemo(() => {
    return INITIAL_APPLICATIONS.filter((app) => {
      const matchesSearch =
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.assignedCA?.name && app.assignedCA.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        selectedFilter === 'All' ? true : app.status === selectedFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedFilter]);

  const getStatusBadge = (status: ApplicationWorkflowStatus) => {
    switch (status) {
      case 'Completed':
        return <Badge label="Completed" variant="green" />;
      case 'Processing':
        return <Badge label="Processing" variant="orange" />;
      case 'Assigned':
        return <Badge label="Assigned" variant="blue" />;
      case 'Pending':
        return <Badge label="Pending" variant="neutral" />;
      default:
        return <Badge label={status} variant="neutral" />;
    }
  };

  const filterTabs: Array<'All' | ApplicationWorkflowStatus> = [
    'All',
    'Processing',
    'Assigned',
    'Completed',
    'Pending',
  ];

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Page Header */}
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
              My Applications &amp; Services
            </Inline>
          </Heading>
          <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
            Track and manage all your corporate registration, tax filing, and statutory compliance orders.
          </p>
        </Surface>

        <Button
          label="New Application"
          variant="primary"
          size="md"
          icon={<PlusCircle size={16} />}
          onClick={() => navigate('/customer/applications/new')}
        />
      </Surface>

      {/* Filter and Search Bar Card */}
      <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)", justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Status Filter Tabs */}
          <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-12)" }}>
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab;
              const count =
                tab === 'All'
                  ? INITIAL_APPLICATIONS.length
                  : INITIAL_APPLICATIONS.filter((a) => a.status === tab).length;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedFilter(tab)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: "var(--spacing-fsk-17)",
                    padding: "var(--spacing-fsk-12) var(--spacing-fsk-23)",
                    borderRadius: "var(--radius-fsk-37)",
                    border: isActive ? "var(--spacing-fsk-22) solid var(--color-fsk-162)" : "var(--spacing-fsk-22) solid var(--color-fsk-163)",
                    background: isActive ? "var(--color-fsk-112)" : "var(--color-fsk-38)",
                    color: isActive ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
                    fontSize: "var(--font-fsk-14)",
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Inline>{tab}</Inline>
                  <Inline
                    style={{
                      fontSize: "var(--font-fsk-14)",
                      padding: "var(--spacing-fsk-22) var(--spacing-fsk-17)",
                      borderRadius: "var(--radius-fsk-68)",
                      background: isActive ? "var(--color-fsk-15)" : "var(--color-fsk-46)",
                      color: isActive ? "var(--color-fsk-38)" : "var(--color-fsk-9)",
                    }}
                  >
                    {count}
                  </Inline>
                </button>
              );
            })}
          </Surface>

          {/* Search Box */}
          <Surface style={{ width: "var(--spacing-fsk-45)" }}>
            <TextInput
              label="Search applications"
              placeholder="Search by ID, service, CA..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>
        </Surface>
      </Card>

      {/* Applications Data Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        {filteredApplications.length > 0 ? (
          <Surface style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
              <thead>
                <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontWeight: 600, fontSize: "var(--font-fsk-14)", textTransform: 'uppercase' }}>
                  <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Application ID</th>
                  <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Service Name &amp; Category</th>
                  <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Assigned CA</th>
                  <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Amount</th>
                  <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Submission Date</th>
                  <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Current Status</th>
                  <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    style={{
                      borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)",
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <td style={{ padding: "var(--spacing-fsk-5)", fontWeight: 700, color: "var(--color-fsk-15)" }}>
                      {app.id}
                    </td>
                    <td style={{ padding: "var(--spacing-fsk-5)" }}>
                      <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{app.serviceName}</Surface>
                      <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
                        Category: {app.category}
                      </Surface>
                    </td>
                    <td style={{ padding: "var(--spacing-fsk-5)" }}>
                      {app.assignedCA ? (
                        <Surface>
                          <Surface style={{ fontWeight: 600, color: "var(--color-fsk-113)" }}>{app.assignedCA.name}</Surface>
                          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)" }}>ID: {app.assignedCA.id}</Surface>
                        </Surface>
                      ) : (
                        <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)" }}>Under Allocation</Inline>
                      )}
                    </td>
                    <td style={{ padding: "var(--spacing-fsk-5)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                      ₹{app.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: "var(--spacing-fsk-5)", color: "var(--color-fsk-18)", fontSize: "var(--font-fsk-14)" }}>
                      {app.submissionDate}
                    </td>
                    <td style={{ padding: "var(--spacing-fsk-5)" }}>
                      {getStatusBadge(app.status)}
                    </td>
                    <td style={{ padding: "var(--spacing-fsk-5)", textAlign: 'right' }}>
                      <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "var(--spacing-fsk-12)" }}>
                        <button
                          type="button"
                          onClick={() => navigate(`/customer/applications/${app.id}/tracker`)}
                          style={{
                            padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                            borderRadius: "var(--radius-fsk-42)",
                            border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                            background: "var(--color-fsk-38)",
                            color: "var(--color-fsk-25)",
                            fontSize: "var(--font-fsk-14)",
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Track
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/customer/applications/${app.id}`)}
                          style={{
                            padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                            borderRadius: "var(--radius-fsk-42)",
                            border: 'none',
                            background: "var(--color-fsk-15)",
                            color: "var(--color-fsk-38)",
                            fontSize: "var(--font-fsk-14)",
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Details
                        </button>
                      </Surface>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Surface>
        ) : (
          <Surface style={{ padding: "var(--spacing-fsk-4) var(--spacing-fsk-26)", textAlign: 'center' }}>
            <EmptyState
              title="No Applications Found"
              description={`No applications matching "${searchQuery}" with status "${selectedFilter}". Try adjusting your filters or apply for a new service.`}
              actions={
                <Button
                  label="Clear Filters"
                  variant="secondary"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('All');
                  }}
                />
              }
            />
          </Surface>
        )}
      </Card>
    </Surface>
  );
};

export default CustomerApplicationsPage;
