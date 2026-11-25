import { Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header Banner */}
      <Surface
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)",
          gap: "1.25rem",
        }}
      >
        <Surface>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.375rem" }}>
            <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#d97706", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Operations Command Dashboard
            </Inline>
            <Inline style={{ color: "#cbd5e1" }}>•</Inline>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Desk: {coord.id}</Inline>
          </Surface>

          <Title level={1}>
            <Inline style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
              Welcome, {coord.name}
            </Inline>
          </Title>

          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
            {coord.role} • {coord.location}
          </p>
        </Surface>

        {unassignedApps.length > 0 && (
          <Panel
            elevation="low"
            padding={3}
            style={{
              background: "#fffbeb",
              border: "0.0625rem solid #fde68a",
              borderRadius: "1rem",
              display: 'flex',
              alignItems: 'center',
              gap: "0.75rem",
            }}
          >
            <Surface style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "#d97706", color: "var(--white)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={18} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#92400e", textTransform: 'uppercase' }}>
                Action Required
              </Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 800, color: "#78350f" }}>
                {unassignedApps.length} Unallocated Applications
              </Surface>
            </Surface>
          </Panel>
        )}
      </Surface>

      {/* Operational KPI Cards */}
      <Surface
        style={{
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))",
          gap: "1.25rem",
          marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)",
        }}
      >
        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Unassigned Filings</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#fffbeb", color: "#d97706", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckSquare size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{unassignedApps.length}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#d97706", marginTop: "0.375rem", fontWeight: 600 }}>
            Pending CA allocation today
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Active CA Network</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#f5f3ff", color: "#7c3aed", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{coord.totalCasManaged}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#7c3aed", marginTop: "0.375rem", fontWeight: 600 }}>
            {cas.filter((c) => c.availability === 'Available').length} CAs available for allocation
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Document Verifications</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#ecfdf5", color: "var(--teal)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{coord.inReviewDocsCount}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--teal)", marginTop: "0.375rem", fontWeight: 600 }}>
            Under active verification
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Today's Orders Intake</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#eff6ff", color: "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>
            ₹{coord.todayTransactionsTotal.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--blue)", marginTop: "0.375rem", fontWeight: 600 }}>
            {coord.activeApplicationsCount} total pipeline filings
          </Surface>
        </Panel>
      </Surface>

      {/* Quick Action Shortcuts */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1rem", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
        <button
          type="button"
          onClick={() => navigate('/coordinator/assignments')}
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "1rem",
            border: "0.0625rem solid #fde68a",
            background: "var(--white)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.875rem" }}>
            <Surface style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.625rem", background: "#fffbeb", color: "#d97706", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckSquare size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>CA Assignment Desk</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Assign professionals to pending orders</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="#d97706" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/coordinator/documents')}
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "1rem",
            border: "0.0625rem solid #a7f3d0",
            background: "var(--white)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.875rem" }}>
            <Surface style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.625rem", background: "#ecfdf5", color: "var(--teal)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>Document Monitoring</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Inspect KYC &amp; premises proofs</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--teal)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/coordinator/cas')}
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "1rem",
            border: "0.0625rem solid #ddd6fe",
            background: "var(--white)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.875rem" }}>
            <Surface style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.625rem", background: "#f5f3ff", color: "#7c3aed", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>CA Capacity Matrix</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Review caseload &amp; turnaround SLA</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="#7c3aed" />
        </button>
      </Surface>

      {/* Grid: Immediate Action Queue & CA Workload */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22.5rem), 1fr))", gap: "1.5rem", alignItems: 'flex-start' }}>
        {/* Urgent Applications Queue */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem" }}>
            <Surface>
              <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Unassigned Applications Pipeline</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Orders requiring CA allocation</Surface>
            </Surface>
            <Link to="/coordinator/assignments" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#d97706", textDecoration: 'none' }}>
              Assign now
            </Link>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.75rem" }}>
            {applications.map((app) => (
              <Surface
                key={app.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: "0.75rem",
                  borderRadius: "0.625rem",
                  border: app.assignmentStatus === 'Unassigned' ? "0.0625rem solid #fde68a" : "0.0625rem solid #f1f5f9",
                  background: app.assignmentStatus === 'Unassigned' ? "#fffdf7" : "var(--cream)",
                }}
              >
                <Surface>
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                    <Inline style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)" }}>{app.serviceName}</Inline>
                    <Badge
                      label={app.assignmentStatus}
                      variant={app.assignmentStatus === 'Assigned' ? 'green' : 'orange'}
                    />
                  </Surface>
                  <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                    Client: <strong style={{ color: "var(--navy)" }}>{app.customerName}</strong> ({app.businessName})
                  </Surface>
                  <Surface style={{ fontSize: "0.8125rem", color: "#687d93" }}>
                    #{app.id} • SLA Target: {app.slaDeadline}
                  </Surface>
                </Surface>

                <Surface style={{ textAlign: 'right' }}>
                  <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)" }}>
                    {app.assignedCAName || 'Unassigned'}
                  </Surface>
                  <button
                    type="button"
                    onClick={() => navigate('/coordinator/assignments')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: "#d97706",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                      marginTop: "0.25rem",
                    }}
                  >
                    {app.assignmentStatus === 'Unassigned' ? 'Assign CA' : 'Reassign'}
                  </button>
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Panel>

        {/* CA Capacity Matrix Overview */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem" }}>
            <Surface>
              <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>CA Availability &amp; Capacity</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Real-time professional workload balance</Surface>
            </Surface>
            <Link to="/coordinator/cas" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#d97706", textDecoration: 'none' }}>
              Full Matrix
            </Link>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.75rem" }}>
            {cas.map((ca) => (
              <Surface
                key={ca.id}
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.625rem",
                  border: "0.0625rem solid var(--sage-light)",
                  background: "var(--cream)",
                }}
              >
                <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.375rem" }}>
                  <Surface>
                    <Inline style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)" }}>{ca.name}</Inline>
                    <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", marginLeft: "0.375rem" }}>{ca.membershipNo}</Inline>
                  </Surface>
                  <Badge
                    label={ca.availability}
                    variant={ca.availability === 'Available' ? 'green' : 'orange'}
                  />
                </Surface>

                <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: "0.8125rem", color: "var(--muted)" }}>
                  <Inline>{ca.specialization}</Inline>
                  <strong>{ca.activeCaseload} / {ca.capacityLimit} cases</strong>
                </Surface>

                <Surface style={{ width: '100%', height: "0.375rem", background: "var(--border)", borderRadius: "0.1875rem", marginTop: "0.375rem", overflow: 'hidden' }}>
                  <Surface
                    style={{
                      width: `${(ca.activeCaseload / ca.capacityLimit) * 100}%`,
                      height: '100%',
                      background: ca.activeCaseload >= ca.capacityLimit - 1 ? "#d97706" : "var(--teal)",
                      borderRadius: "0.1875rem",
                    }}
                  />
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Panel>
      </Surface>
    </Surface>
  );
};

export default CoordinatorDashboardPage;
