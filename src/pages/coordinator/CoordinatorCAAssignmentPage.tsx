import { Badge } from '@astryxdesign/core/Badge';
import { Banner } from '@astryxdesign/core/Banner';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  CheckCircle2,
  CheckSquare
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import type { CoordinatorApplication } from '../../features/coordinator/coordinatorData';
import {
  INITIAL_COORDINATOR_APPLICATIONS,
  INITIAL_COORDINATOR_CAS
} from '../../features/coordinator/coordinatorData';

export const CoordinatorCAAssignmentPage: React.FC = () => {
  const [applications, setApplications] = useState<CoordinatorApplication[]>(INITIAL_COORDINATOR_APPLICATIONS);
  const cas = INITIAL_COORDINATOR_CAS;
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'All' | 'Unassigned' | 'Assigned'>('Unassigned');
  const [assignedNotice, setAssignedNotice] = useState<string | null>(null);

  // Temporary selected CA map per application id
  const [selectedCAMap, setSelectedCAMap] = useState<Record<string, string>>({
    'FK-SRV-9230': cas[0].id,
    'FK-SRV-9240': cas[1].id,
  });

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.customerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filter === 'All' ? true : app.assignmentStatus === filter;

      return matchesSearch && matchesFilter;
    });
  }, [applications, searchQuery, filter]);

  const handleAssign = (appId: string) => {
    const caId = selectedCAMap[appId] || cas[0].id;
    const chosenCA = cas.find((c) => c.id === caId);
    if (!chosenCA) return;

    setApplications((prev) =>
      prev.map((a) =>
        a.id === appId
          ? {
              ...a,
              assignedCAId: chosenCA.id,
              assignedCAName: chosenCA.name,
              assignmentStatus: 'Assigned',
              status: 'Assigned',
            }
          : a
      )
    );

    setAssignedNotice(`Application #${appId} successfully assigned to ${chosenCA.name} (${chosenCA.specialization}).`);
    setTimeout(() => setAssignedNotice(null), 3500);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            CA Assignment Desk
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Allocate pending client applications to certified regulatory Chartered Accountants based on discipline expertise and capacity.
        </p>
      </div>

      {assignedNotice && (
        <div style={{ marginBottom: '24px' }}>
          <Banner
            status="success"
            title="Assignment Confirmed"
            description={assignedNotice}
          />
        </div>
      )}

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '420px' }}>
            <TextInput
              label="Search Assignment Desk"
              placeholder="Search by ID, service name, or client..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['Unassigned', 'Assigned', 'All'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: filter === tab ? '1px solid #d97706' : '1px solid #cbd5e1',
                  background: filter === tab ? '#fffbeb' : '#ffffff',
                  color: filter === tab ? '#d97706' : '#475569',
                  fontSize: '13px',
                  fontWeight: filter === tab ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab} {tab === 'Unassigned' ? `(${applications.filter((a) => a.assignmentStatus === 'Unassigned').length})` : ''}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Assignment Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Application &amp; Service</th>
                <th style={{ padding: '14px 18px' }}>Client</th>
                <th style={{ padding: '14px 18px' }}>Category</th>
                <th style={{ padding: '14px 18px' }}>SLA Target</th>
                <th style={{ padding: '14px 18px' }}>Select CA for Assignment</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Execute</th>
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
                    <Badge label={app.category} variant="neutral" />
                  </td>

                  <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '12.5px' }}>
                    {app.slaDeadline}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    {app.assignmentStatus === 'Unassigned' ? (
                      <select
                        value={selectedCAMap[app.id] || cas[0].id}
                        onChange={(e) =>
                          setSelectedCAMap((prev) => ({ ...prev, [app.id]: e.target.value }))
                        }
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13px',
                          background: '#ffffff',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      >
                        {cas.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.specialization}) [{c.activeCaseload}/{c.capacityLimit}]
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={14} color="#059669" />
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{app.assignedCAName}</span>
                      </div>
                    )}
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    {app.assignmentStatus === 'Unassigned' ? (
                      <button
                        type="button"
                        onClick={() => handleAssign(app.id)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '6px',
                          border: 'none',
                          background: '#d97706',
                          color: '#ffffff',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <CheckSquare size={13} /> Allocate
                      </button>
                    ) : (
                      <Badge label="Assigned" variant="green" />
                    )}
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

export default CoordinatorCAAssignmentPage;
