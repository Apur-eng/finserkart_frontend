import { ActionButton, Panel, EmptyState, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Page Header */}
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
              My Applications &amp; Services
            </Inline>
          </Title>
          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
            Track and manage all your corporate registration, tax filing, and statutory compliance orders.
          </p>
        </Surface>

        <ActionButton
          label="New Application"
          variant="primary"
          size="md"
          icon={<PlusCircle size={16} />}
          onClick={() => navigate('/customer/applications/new')}
        />
      </Surface>

      {/* Filter and Search Bar Panel */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "1rem", justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Status Filter Tabs */}
          <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "0.5rem" }}>
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
                    gap: "0.375rem",
                    padding: "0.5rem 0.875rem",
                    borderRadius: "0.5rem",
                    border: isActive ? "0.0625rem solid var(--blue)" : "0.0625rem solid #e2e8f0",
                    background: isActive ? "#e0f2fe" : "var(--white)",
                    color: isActive ? "var(--blue)" : "var(--muted)",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Inline>{tab}</Inline>
                  <Inline
                    style={{
                      fontSize: "0.8125rem",
                      padding: "0.0625rem 0.375rem",
                      borderRadius: "0.625rem",
                      background: isActive ? "var(--blue)" : "var(--sage-light)",
                      color: isActive ? "var(--white)" : "var(--muted)",
                    }}
                  >
                    {count}
                  </Inline>
                </button>
              );
            })}
          </Surface>

          {/* Search Box */}
          <Surface style={{ width: "17.5rem" }}>
            <Field
              label="Search applications"
              placeholder="Search by ID, service, CA..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>
        </Surface>
      </Panel>

      {/* Applications Data Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        {filteredApplications.length > 0 ? (
          <Surface style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
              <thead>
                <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontWeight: 600, fontSize: "0.8125rem", textTransform: 'uppercase' }}>
                  <th style={{ padding: "0.875rem 1rem" }}>Application ID</th>
                  <th style={{ padding: "0.875rem 1rem" }}>Service Name &amp; Category</th>
                  <th style={{ padding: "0.875rem 1rem" }}>Assigned CA</th>
                  <th style={{ padding: "0.875rem 1rem" }}>Amount</th>
                  <th style={{ padding: "0.875rem 1rem" }}>Submission Date</th>
                  <th style={{ padding: "0.875rem 1rem" }}>Current Status</th>
                  <th style={{ padding: "0.875rem 1rem", textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    style={{
                      borderBottom: "0.0625rem solid var(--sage-light)",
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <td style={{ padding: "1rem", fontWeight: 700, color: "var(--blue)" }}>
                      {app.id}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{app.serviceName}</Surface>
                      <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                        Category: {app.category}
                      </Surface>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      {app.assignedCA ? (
                        <Surface>
                          <Surface style={{ fontWeight: 600, color: "#243b53" }}>{app.assignedCA.name}</Surface>
                          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a" }}>ID: {app.assignedCA.id}</Surface>
                        </Surface>
                      ) : (
                        <Inline style={{ fontSize: "0.8125rem", color: "#687d93" }}>Under Allocation</Inline>
                      )}
                    </td>
                    <td style={{ padding: "1rem", fontWeight: 700, color: "var(--navy)" }}>
                      ₹{app.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: "1rem", color: "var(--muted)", fontSize: "0.8125rem" }}>
                      {app.submissionDate}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      {getStatusBadge(app.status)}
                    </td>
                    <td style={{ padding: "1rem", textAlign: 'right' }}>
                      <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "0.5rem" }}>
                        <button
                          type="button"
                          onClick={() => navigate(`/customer/applications/${app.id}/tracker`)}
                          style={{
                            padding: "0.375rem 0.75rem",
                            borderRadius: "0.375rem",
                            border: "0.0625rem solid #cbd5e1",
                            background: "var(--white)",
                            color: "#334155",
                            fontSize: "0.8125rem",
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
                            padding: "0.375rem 0.75rem",
                            borderRadius: "0.375rem",
                            border: 'none',
                            background: "var(--blue)",
                            color: "var(--white)",
                            fontSize: "0.8125rem",
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
          <Surface style={{ padding: "clamp(1rem, 3.6923076923076925vw, 3rem) 1.5rem", textAlign: 'center' }}>
            <EmptyState
              title="No Applications Found"
              description={`No applications matching "${searchQuery}" with status "${selectedFilter}". Try adjusting your filters or apply for a new service.`}
              actions={
                <ActionButton
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
      </Panel>
    </Surface>
  );
};

export default CustomerApplicationsPage;
