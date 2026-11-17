import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  ArrowRight,
  Clock
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_COORDINATOR_APPLICATIONS } from '../../features/coordinator/coordinatorData';

export const CoordinatorApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const applications = INITIAL_COORDINATOR_APPLICATIONS;
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Unassigned' | 'Assigned' | 'Processing'>('All');

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.assignedCAName && app.assignedCAName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === 'All'
          ? true
          : statusFilter === 'Unassigned'
          ? app.assignmentStatus === 'Unassigned'
          : statusFilter === 'Assigned'
          ? app.assignmentStatus === 'Assigned'
          : app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Operations Application Queue
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Central operational application flow across all disciplines. Allocate unassigned cases, review documents, and enforce SLA turnarounds.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '420px' }}>
            <TextInput
              label="Search Application Queue"
              placeholder="Search by ID, service name, client or CA..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['All', 'Unassigned', 'Assigned', 'Processing'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: statusFilter === filter ? '1px solid #d97706' : '1px solid #cbd5e1',
                  background: statusFilter === filter ? '#fffbeb' : '#ffffff',
                  color: statusFilter === filter ? '#d97706' : '#475569',
                  fontSize: '13px',
                  fontWeight: statusFilter === filter ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Application ID &amp; Service</th>
                <th style={{ padding: '14px 18px' }}>Client Enterprise</th>
                <th style={{ padding: '14px 18px' }}>Allocated CA</th>
                <th style={{ padding: '14px 18px' }}>Allocation Status</th>
                <th style={{ padding: '14px 18px' }}>Document Audit</th>
                <th style={{ padding: '14px 18px' }}>SLA Target</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{app.serviceName}</div>
                    <div style={{ fontSize: '11.5px', color: '#d97706', fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{app.customerName}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{app.businessName}</div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: app.assignedCAName ? '#0f172a' : '#d97706' }}>
                      {app.assignedCAName || 'Unassigned'}
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <Badge
                      label={app.assignmentStatus}
                      variant={app.assignmentStatus === 'Assigned' ? 'green' : 'orange'}
                    />
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <Badge
                      label={app.docVerificationStatus}
                      variant={app.docVerificationStatus === 'Verified' ? 'green' : 'neutral'}
                    />
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '12.5px' }}>
                      <Clock size={12} /> {app.slaDeadline}
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => navigate(`/coordinator/applications/${app.id}`)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #fde68a',
                        background: '#fffbeb',
                        color: '#d97706',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Inspect <ArrowRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CoordinatorApplicationsPage;
