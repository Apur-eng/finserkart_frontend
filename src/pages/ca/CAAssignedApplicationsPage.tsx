import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  ArrowRight,
  Clock,
  FileCheck
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_CA_APPLICATIONS } from '../../features/ca/caData';

export const CAAssignedApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const applications = INITIAL_CA_APPLICATIONS;
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'High' | 'Urgent' | 'Processing'>('All');

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.businessName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority =
        priorityFilter === 'All'
          ? true
          : priorityFilter === 'Processing'
          ? app.status === 'Processing'
          : app.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [applications, searchQuery, priorityFilter]);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Assigned Applications Queue
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Manage your regulatory filings workload, examine statutory prerequisites, and update milestone stages.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '420px' }}>
            <TextInput
              label="Search Queue"
              placeholder="Search by ID, client, or compliance service..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['All', 'Processing', 'High', 'Urgent'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setPriorityFilter(filter)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: priorityFilter === filter ? '1px solid #7c3aed' : '1px solid #cbd5e1',
                  background: priorityFilter === filter ? '#f5f3ff' : '#ffffff',
                  color: priorityFilter === filter ? '#7c3aed' : '#475569',
                  fontSize: '13px',
                  fontWeight: priorityFilter === filter ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {filter} {filter === 'All' ? `(${applications.length})` : ''}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Applications Queue Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Application ID &amp; Service</th>
                <th style={{ padding: '14px 18px' }}>Client Enterprise</th>
                <th style={{ padding: '14px 18px' }}>Priority</th>
                <th style={{ padding: '14px 18px' }}>Target Deadline</th>
                <th style={{ padding: '14px 18px' }}>Progress</th>
                <th style={{ padding: '14px 18px' }}>CA Fee</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{app.serviceName}</div>
                    <div style={{ fontSize: '11.5px', color: '#7c3aed', fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Assigned {app.assignedDate}</div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{app.customerName}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{app.businessName}</div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <Badge
                      label={app.priority}
                      variant={app.priority === 'Urgent' ? 'red' : app.priority === 'High' ? 'orange' : 'neutral'}
                    />
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#d97706', fontWeight: 600 }}>
                      <Clock size={13} /> {app.deadline}
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Badge label={`Stage ${app.currentStage} / ${app.totalStages}`} variant="purple" />
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{app.status}</span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px', fontWeight: 700, color: '#7c3aed' }}>
                    ₹{app.caCommission.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => navigate('/ca/documents')}
                        title="Review Documents"
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          background: '#ffffff',
                          color: '#475569',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <FileCheck size={13} /> Docs
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/ca/applications/${app.id}/workflow`)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid #ddd6fe',
                          background: '#f5f3ff',
                          color: '#7c3aed',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Workflow <ArrowRight size={13} />
                      </button>
                    </div>
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

export default CAAssignedApplicationsPage;
