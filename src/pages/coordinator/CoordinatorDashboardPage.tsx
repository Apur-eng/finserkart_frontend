import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import {
  AlertTriangle,
  ArrowRight,
  CheckSquare,
  CreditCard,
  FileCheck,
  UserCheck
} from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  INITIAL_COORDINATOR_APPLICATIONS,
  INITIAL_COORDINATOR_CAS,
  INITIAL_COORDINATOR_PROFILE
} from '../../features/coordinator/coordinatorData';

export const CoordinatorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const coord = INITIAL_COORDINATOR_PROFILE;
  const applications = INITIAL_COORDINATOR_APPLICATIONS;
  const cas = INITIAL_COORDINATOR_CAS;

  const unassignedApps = applications.filter((a) => a.assignmentStatus === 'Unassigned');

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header Banner */}
      <Surface
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: "var(--spacing-fsk-20)",
          gap: "var(--spacing-fsk-2)",
        }}
      >
        <Surface>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-17)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-54)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Operations Command Dashboard
            </Inline>
            <Inline style={{ color: "var(--color-fsk-59)" }}>•</Inline>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Desk: {coord.id}</Inline>
          </Surface>

          <Heading level={1}>
            <Inline style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
              Welcome, {coord.name}
            </Inline>
          </Heading>

          <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
            {coord.role} • {coord.location}
          </p>
        </Surface>

        {unassignedApps.length > 0 && (
          <Card
            elevation="low"
            padding={3}
            style={{
              background: "var(--color-fsk-66)",
              border: "var(--spacing-fsk-22) solid var(--color-fsk-88)",
              borderRadius: "var(--radius-fsk-28)",
              display: 'flex',
              alignItems: 'center',
              gap: "var(--spacing-fsk-8)",
            }}
          >
            <Surface style={{ width: "var(--spacing-fsk-85)", height: "var(--spacing-fsk-85)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-54)", color: "var(--color-fsk-38)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={18} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-111)", textTransform: 'uppercase' }}>
                Action Required
              </Surface>
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 800, color: "var(--color-fsk-108)" }}>
                {unassignedApps.length} Unallocated Applications
              </Surface>
            </Surface>
          </Card>
        )}
      </Surface>

      {/* Operational KPI Cards */}
      <Surface
        style={{
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))",
          gap: "var(--spacing-fsk-2)",
          marginBottom: "var(--spacing-fsk-20)",
        }}
      >
        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Unassigned Filings</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-66)", color: "var(--color-fsk-54)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckSquare size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{unassignedApps.length}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-54)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600 }}>
            Pending CA allocation today
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Active CA Network</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-53)", color: "var(--color-fsk-41)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{coord.totalCasManaged}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-41)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600 }}>
            {cas.filter((c) => c.availability === 'Available').length} CAs available for allocation
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Document Verifications</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-64)", color: "var(--color-fsk-65)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{coord.inReviewDocsCount}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-65)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600 }}>
            Under active verification
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Today's Orders Intake</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-63)", color: "var(--color-fsk-15)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>
            ₹{coord.todayTransactionsTotal.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-15)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600 }}>
            {coord.activeApplicationsCount} total pipeline filings
          </Surface>
        </Card>
      </Surface>

      {/* Quick Action Shortcuts */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-5)", marginBottom: "var(--spacing-fsk-20)" }}>
        <button
          type="button"
          onClick={() => navigate('/coordinator/assignments')}
          style={{
            padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-88)",
            background: "var(--color-fsk-38)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-23)" }}>
            <Surface style={{ width: "var(--spacing-fsk-67)", height: "var(--spacing-fsk-67)", borderRadius: "var(--radius-fsk-68)", background: "var(--color-fsk-66)", color: "var(--color-fsk-54)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckSquare size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>CA Assignment Desk</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Assign professionals to pending orders</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--color-fsk-54)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/coordinator/documents')}
          style={{
            padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-81)",
            background: "var(--color-fsk-38)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-23)" }}>
            <Surface style={{ width: "var(--spacing-fsk-67)", height: "var(--spacing-fsk-67)", borderRadius: "var(--radius-fsk-68)", background: "var(--color-fsk-64)", color: "var(--color-fsk-65)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Document Monitoring</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Inspect KYC &amp; premises proofs</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--color-fsk-65)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/coordinator/cas')}
          style={{
            padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-97)",
            background: "var(--color-fsk-38)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-23)" }}>
            <Surface style={{ width: "var(--spacing-fsk-67)", height: "var(--spacing-fsk-67)", borderRadius: "var(--radius-fsk-68)", background: "var(--color-fsk-53)", color: "var(--color-fsk-41)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>CA Capacity Matrix</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Review caseload &amp; turnaround SLA</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--color-fsk-41)" />
        </button>
      </Surface>

      {/* Grid: Immediate Action Queue & CA Workload */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22.5rem), 1fr))", gap: "var(--spacing-fsk-26)", alignItems: 'flex-start' }}>
        {/* Urgent Applications Queue */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-5)" }}>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Unassigned Applications Pipeline</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Orders requiring CA allocation</Surface>
            </Surface>
            <Link to="/coordinator/assignments" style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-54)", textDecoration: 'none' }}>
              Assign now
            </Link>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-8)" }}>
            {applications.map((app) => (
              <Surface
                key={app.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: "var(--spacing-fsk-8)",
                  borderRadius: "var(--radius-fsk-68)",
                  border: app.assignmentStatus === 'Unassigned' ? "var(--spacing-fsk-22) solid var(--color-fsk-88)" : "var(--spacing-fsk-22) solid var(--color-fsk-165)",
                  background: app.assignmentStatus === 'Unassigned' ? "var(--color-fsk-107)" : "var(--color-fsk-27)",
                }}
              >
                <Surface>
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
                    <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)" }}>{app.serviceName}</Inline>
                    <Badge
                      label={app.assignmentStatus}
                      variant={app.assignmentStatus === 'Assigned' ? 'green' : 'orange'}
                    />
                  </Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
                    Client: <strong style={{ color: "var(--color-fsk-7)" }}>{app.customerName}</strong> ({app.businessName})
                  </Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)" }}>
                    #{app.id} • SLA Target: {app.slaDeadline}
                  </Surface>
                </Surface>

                <Surface style={{ textAlign: 'right' }}>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                    {app.assignedCAName || 'Unassigned'}
                  </Surface>
                  <button
                    type="button"
                    onClick={() => navigate('/coordinator/assignments')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: "var(--color-fsk-54)",
                      fontSize: "var(--font-fsk-14)",
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                      marginTop: "var(--spacing-fsk-29)",
                    }}
                  >
                    {app.assignmentStatus === 'Unassigned' ? 'Assign CA' : 'Reassign'}
                  </button>
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Card>

        {/* CA Capacity Matrix Overview */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-5)" }}>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>CA Availability &amp; Capacity</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Real-time professional workload balance</Surface>
            </Surface>
            <Link to="/coordinator/cas" style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-54)", textDecoration: 'none' }}>
              Full Matrix
            </Link>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-8)" }}>
            {cas.map((ca) => (
              <Surface
                key={ca.id}
                style={{
                  padding: "var(--spacing-fsk-8)",
                  borderRadius: "var(--radius-fsk-68)",
                  border: "var(--spacing-fsk-22) solid var(--color-fsk-46)",
                  background: "var(--color-fsk-27)",
                }}
              >
                <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-17)" }}>
                  <Surface>
                    <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)" }}>{ca.name}</Inline>
                    <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginLeft: "var(--spacing-fsk-17)" }}>{ca.membershipNo}</Inline>
                  </Surface>
                  <Badge
                    label={ca.availability}
                    variant={ca.availability === 'Available' ? 'green' : 'orange'}
                  />
                </Surface>

                <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
                  <Inline>{ca.specialization}</Inline>
                  <strong>{ca.activeCaseload} / {ca.capacityLimit} cases</strong>
                </Surface>

                <Surface style={{ width: '100%', height: "var(--spacing-fsk-17)", background: "var(--color-fsk-21)", borderRadius: "var(--radius-fsk-110)", marginTop: "var(--spacing-fsk-17)", overflow: 'hidden' }}>
                  <Surface
                    style={{
                      width: `${(ca.activeCaseload / ca.capacityLimit) * 100}%`,
                      height: '100%',
                      background: ca.activeCaseload >= ca.capacityLimit - 1 ? "var(--color-fsk-54)" : "var(--color-fsk-65)",
                      borderRadius: "var(--radius-fsk-110)",
                    }}
                  />
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Card>
      </Surface>
    </Surface>
  );
};

export default CoordinatorDashboardPage;
