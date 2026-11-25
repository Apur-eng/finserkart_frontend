import { Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Coins,
  FileCheck,
  Scale
} from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  INITIAL_CA_APPLICATIONS,
  INITIAL_CA_PROFILE
} from '../../features/ca/caData';

export const CADashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const ca = INITIAL_CA_PROFILE;
  const applications = INITIAL_CA_APPLICATIONS;

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
            <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#7c3aed", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              CA Regulatory Dashboard
            </Inline>
            <Inline style={{ color: "#cbd5e1" }}>•</Inline>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>ICAI Reg: {ca.membershipNo}</Inline>
          </Surface>

          <Title level={1}>
            <Inline style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
              Welcome, CA {ca.fname} {ca.lname}
            </Inline>
          </Title>

          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
            {ca.firmName} • {ca.title}
          </p>
        </Surface>

        {/* Practice Credentials Pill */}
        <Panel
          elevation="low"
          padding={3}
          style={{
            background: "var(--status-brand)",
            border: "0.0625rem solid #ddd6fe",
            borderRadius: "1rem",
            display: 'flex',
            alignItems: 'center',
            gap: "0.875rem",
          }}
        >
          <Surface style={{ width: "2.375rem", height: "2.375rem", borderRadius: "0.5rem", background: "#7c3aed", color: "var(--white)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scale size={20} />
          </Surface>
          <Surface>
            <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#6d28d9", textTransform: 'uppercase' }}>
              Certificate of Practice
            </Surface>
            <Surface style={{ fontSize: "0.875rem", fontWeight: 800, color: "#4c1d95", fontFamily: 'monospace' }}>
              {ca.copNo} (Active)
            </Surface>
          </Surface>
        </Panel>
      </Surface>

      {/* KPI Cards */}
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
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Active Filings Queue</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#f5f3ff", color: "#7c3aed", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{ca.activeWorkflowsCount}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#7c3aed", marginTop: "0.375rem", fontWeight: 600 }}>
            Under active statutory drafting
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Pending Document Reviews</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#fffbeb", color: "#d97706", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{ca.pendingReviewDocsCount}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#d97706", marginTop: "0.375rem", fontWeight: 600 }}>
            Uploaded by clients today
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Completed Filings</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#ecfdf5", color: "var(--teal)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{ca.completedWorkflowsCount}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--teal)", marginTop: "0.375rem", fontWeight: 600 }}>
            100% on-time turnaround
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Professional Commission</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#eff6ff", color: "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>
            ₹{ca.totalCommissionEarned.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--blue)", marginTop: "0.375rem", fontWeight: 600 }}>
            ₹{ca.pendingCommission.toLocaleString('en-IN')} pending
          </Surface>
        </Panel>
      </Surface>

      {/* Quick Action Buttons */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1rem", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
        <button
          type="button"
          onClick={() => navigate('/ca/applications')}
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
              <Briefcase size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>Assigned Applications Queue</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Inspect filing steps &amp; progress</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="#7c3aed" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/ca/documents')}
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
              <FileCheck size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>Document Review &amp; Audit</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Verify KYC &amp; premises proofs</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="#d97706" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/ca/deliverables')}
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
              <CheckCircle2 size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>Deliverables Handover</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Upload final govt certificates</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--teal)" />
        </button>
      </Surface>

      {/* Active Workflows Queue Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ padding: "1rem 1.25rem", borderBottom: "0.0625rem solid var(--border)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Surface>
            <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Active Filing Workflows</Surface>
            <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Statutory applications allocated to your desk</Surface>
          </Surface>
          <Link to="/ca/applications" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#7c3aed", textDecoration: 'none' }}>
            View all queue
          </Link>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Priority &amp; ID</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Service Name</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Client Enterprise</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Deadline</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Current Progress</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>CA Fee</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                      <Badge
                        label={app.priority}
                        variant={app.priority === 'Urgent' ? 'red' : app.priority === 'High' ? 'orange' : 'neutral'}
                      />
                      <Inline style={{ fontWeight: 700, fontFamily: 'monospace', color: "var(--navy)" }}>#{app.id}</Inline>
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{app.serviceName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Assigned {app.assignedDate}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--navy)" }}>{app.customerName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{app.businessName}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.3125rem", color: "#d97706", fontWeight: 600, fontSize: "0.8125rem" }}>
                      <Clock size={13} /> {app.deadline}
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                      <Badge label={`Stage ${app.currentStage} / ${app.totalStages}`} variant="purple" />
                      <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{app.status}</Inline>
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", fontWeight: 700, color: "#7c3aed" }}>
                    ₹{app.caCommission.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => navigate(`/ca/applications/${app.id}/workflow`)}
                      style={{
                        padding: "0.375rem 0.75rem",
                        borderRadius: "0.375rem",
                        border: "0.0625rem solid #ddd6fe",
                        background: "#f5f3ff",
                        color: "#7c3aed",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: "0.25rem",
                      }}
                    >
                      Update <ArrowRight size={13} />
                    </button>
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

export default CADashboardPage;
