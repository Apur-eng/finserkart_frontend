import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  ArrowRight
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_AGENT_APPLICATIONS } from '../../features/agent/agentData';

export const AgentApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const applications = INITIAL_AGENT_APPLICATIONS;
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Processing' | 'Assigned' | 'Completed'>('All');

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.businessName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' ? true : app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Client Applications & Orders
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Track regulatory progress, CA assignment status, and commission attribution for client filings.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '420px' }}>
            <TextInput
              label="Search Applications"
              placeholder="Search by ID, service name, client or company..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['All', 'Processing', 'Assigned', 'Completed'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: statusFilter === filter ? '1px solid #059669' : '1px solid #cbd5e1',
                  background: statusFilter === filter ? '#ecfdf5' : '#ffffff',
                  color: statusFilter === filter ? '#059669' : '#475569',
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

      {/* Applications Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Application ID &amp; Service</th>
                <th style={{ padding: '14px 18px' }}>Client Enterprise</th>
                <th style={{ padding: '14px 18px' }}>Assigned CA</th>
                <th style={{ padding: '14px 18px' }}>Order Total</th>
                <th style={{ padding: '14px 18px' }}>Commission</th>
                <th style={{ padding: '14px 18px' }}>Filing Status</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Dossier</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{app.serviceName}</div>
                    <div style={{ fontSize: '11.5px', color: '#059669', fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Submitted {app.date}</div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{app.customerName}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{app.businessName}</div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ color: '#0f172a', fontWeight: 600 }}>{app.caName || 'Pending Allocation'}</div>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>Stage {app.currentStage} of 5</div>
                  </td>

                  <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0f172a' }}>
                    ₹{app.amount.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#059669' }}>+₹{app.agentCommission}</div>
                    <Badge
                      label={app.commissionStatus}
                      variant={app.commissionStatus === 'Disbursed' ? 'green' : app.commissionStatus === 'Approved' ? 'blue' : 'neutral'}
                    />
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <Badge
                      label={app.status}
                      variant={app.status === 'Completed' ? 'green' : app.status === 'Processing' ? 'orange' : 'blue'}
                    />
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => navigate(`/agent/applications/${app.id}`)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        background: '#ffffff',
                        color: '#059669',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      View <ArrowRight size={13} />
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

export default AgentApplicationsPage;
