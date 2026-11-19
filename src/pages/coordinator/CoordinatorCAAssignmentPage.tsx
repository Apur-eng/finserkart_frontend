import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            CA Assignment Desk
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Allocate pending client applications to certified regulatory Chartered Accountants based on discipline expertise and capacity.
        </p>
      </Surface>

      {assignedNotice && (
        <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
          <Banner
            status="success"
            title="Assignment Confirmed"
            description={assignedNotice}
          />
        </Surface>
      )}

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, var(--spacing-fsk-45))", maxWidth: "var(--spacing-fsk-50)" }}>
            <TextInput
              label="Search Assignment Desk"
              placeholder="Search by ID, service name, or client..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)" }}>
            {(['Unassigned', 'Assigned', 'All'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                style={{
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  borderRadius: "var(--radius-fsk-28)",
                  border: filter === tab ? "var(--spacing-fsk-22) solid var(--color-fsk-54)" : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                  background: filter === tab ? "var(--color-fsk-66)" : "var(--color-fsk-38)",
                  color: filter === tab ? "var(--color-fsk-54)" : "var(--color-fsk-18)",
                  fontSize: "var(--font-fsk-14)",
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
      </Card>

      {/* Assignment Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Application &amp; Service</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Client</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Category</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>SLA Target</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Select CA for Assignment</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>Execute</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{app.serviceName}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-54)", fontFamily: 'monospace', fontWeight: 600 }}>
                      #{app.id}
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>{app.customerName}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{app.businessName}</Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Badge label={app.category} variant="neutral" />
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)" }}>
                    {app.slaDeadline}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    {app.assignmentStatus === 'Unassigned' ? (
                      <select
                        value={selectedCAMap[app.id] || cas[0].id}
                        onChange={(e) =>
                          setSelectedCAMap((prev) => ({ ...prev, [app.id]: e.target.value }))
                        }
                        style={{
                          padding: "var(--spacing-fsk-17) var(--spacing-fsk-35)",
                          borderRadius: "var(--radius-fsk-42)",
                          border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                          fontSize: "var(--font-fsk-14)",
                          background: "var(--color-fsk-38)",
                          color: "var(--color-fsk-7)",
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
                      <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-17)" }}>
                        <CheckCircle2 size={14} color="var(--color-fsk-65)" />
                        <Inline style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>{app.assignedCAName}</Inline>
                      </Surface>
                    )}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>
                    {app.assignmentStatus === 'Unassigned' ? (
                      <button
                        type="button"
                        onClick={() => handleAssign(app.id)}
                        style={{
                          padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                          borderRadius: "var(--radius-fsk-42)",
                          border: 'none',
                          background: "var(--color-fsk-54)",
                          color: "var(--color-fsk-38)",
                          fontSize: "var(--font-fsk-14)",
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: "var(--spacing-fsk-29)",
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
      </Card>
    </Surface>
  );
};

export default CoordinatorCAAssignmentPage;
