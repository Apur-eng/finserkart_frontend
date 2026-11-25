import { Notice, Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            CA Assignment Desk
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Allocate pending client applications to certified regulatory Chartered Accountants based on discipline expertise and capacity.
        </p>
      </Surface>

      {assignedNotice && (
        <Surface style={{ marginBottom: "1.5rem" }}>
          <Notice
            status="success"
            title="Assignment Confirmed"
            description={assignedNotice}
          />
        </Surface>
      )}

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "1rem", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, 17.5rem)", maxWidth: "26.25rem" }}>
            <Field
              label="Search Assignment Desk"
              placeholder="Search by ID, service name, or client..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.5rem" }}>
            {(['Unassigned', 'Assigned', 'All'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "1rem",
                  border: filter === tab ? "0.0625rem solid #d97706" : "0.0625rem solid #cbd5e1",
                  background: filter === tab ? "#fffbeb" : "var(--white)",
                  color: filter === tab ? "#d97706" : "var(--muted)",
                  fontSize: "0.8125rem",
                  fontWeight: filter === tab ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab} {tab === 'Unassigned' ? `(${applications.filter((a) => a.assignmentStatus === 'Unassigned').length})` : ''}
              </button>
            ))}
          </Surface>
        </Surface>
      </Panel>

      {/* Assignment Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Application &amp; Service</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Client</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Category</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>SLA Target</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Select CA for Assignment</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Execute</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{app.serviceName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#d97706", fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--navy)" }}>{app.customerName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{app.businessName}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Badge label={app.category} variant="neutral" />
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "var(--muted)", fontSize: "0.8125rem" }}>
                    {app.slaDeadline}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    {app.assignmentStatus === 'Unassigned' ? (
                      <select
                        value={selectedCAMap[app.id] || cas[0].id}
                        onChange={(e) =>
                          setSelectedCAMap((prev) => ({ ...prev, [app.id]: e.target.value }))
                        }
                        style={{
                          padding: "0.375rem 0.625rem",
                          borderRadius: "0.375rem",
                          border: "0.0625rem solid #cbd5e1",
                          fontSize: "0.8125rem",
                          background: "var(--white)",
                          color: "var(--navy)",
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
                      <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.375rem" }}>
                        <CheckCircle2 size={14} color="var(--teal)" />
                        <Inline style={{ fontWeight: 600, color: "var(--navy)" }}>{app.assignedCAName}</Inline>
                      </Surface>
                    )}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
                    {app.assignmentStatus === 'Unassigned' ? (
                      <button
                        type="button"
                        onClick={() => handleAssign(app.id)}
                        style={{
                          padding: "0.375rem 0.875rem",
                          borderRadius: "0.375rem",
                          border: 'none',
                          background: "#d97706",
                          color: "var(--white)",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: "0.25rem",
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
        </Surface>
      </Panel>
    </Surface>
  );
};

export default CoordinatorCAAssignmentPage;
