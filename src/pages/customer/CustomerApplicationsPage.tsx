import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '16px',
        }}
      >
        <div>
          <Heading level={1}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              My Applications &amp; Services
            </span>
          </Heading>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
            Track and manage all your corporate registration, tax filing, and statutory compliance orders.
          </p>
        </div>

        <Button
          label="New Application"
          variant="primary"
          size="md"
          icon={<PlusCircle size={16} />}
          onClick={() => navigate('/customer/applications/new')}
        />
      </div>

      {/* Filter and Search Bar Card */}
      <Card elevation="low" padding={4} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Status Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: isActive ? '1px solid #0066cc' : '1px solid #e2e8f0',
                    background: isActive ? '#e0f2fe' : '#ffffff',
                    color: isActive ? '#0066cc' : '#475569',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{tab}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      background: isActive ? '#0066cc' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#64748b',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div style={{ width: '280px' }}>
            <TextInput
              label="Search applications"
              placeholder="Search by ID, service, CA..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </div>
        </div>
      </Card>

      {/* Applications Data Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        {filteredApplications.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '14px 16px' }}>Application ID</th>
                  <th style={{ padding: '14px 16px' }}>Service Name &amp; Category</th>
                  <th style={{ padding: '14px 16px' }}>Assigned CA</th>
                  <th style={{ padding: '14px 16px' }}>Amount</th>
                  <th style={{ padding: '14px 16px' }}>Submission Date</th>
                  <th style={{ padding: '14px 16px' }}>Current Status</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <td style={{ padding: '16px', fontWeight: 700, color: '#0066cc' }}>
                      {app.id}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{app.serviceName}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        Category: {app.category}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      {app.assignedCA ? (
                        <div>
                          <div style={{ fontWeight: 600, color: '#1e293b' }}>{app.assignedCA.name}</div>
                          <div style={{ fontSize: '11px', color: '#16a34a' }}>ID: {app.assignedCA.id}</div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Under Allocation</span>
                      )}
                    </td>
                    <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>
                      ₹{app.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '16px', color: '#475569', fontSize: '13px' }}>
                      {app.submissionDate}
                    </td>
                    <td style={{ padding: '16px' }}>
                      {getStatusBadge(app.status)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => navigate(`/customer/applications/${app.id}/tracker`)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            background: '#ffffff',
                            color: '#334155',
                            fontSize: '12.5px',
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
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            background: '#0066cc',
                            color: '#ffffff',
                            fontSize: '12.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
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
          </div>
        )}
      </Card>
    </div>
  );
};

export default CustomerApplicationsPage;
