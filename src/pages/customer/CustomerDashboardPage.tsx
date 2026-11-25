import { Notice, ActionButton, Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Layers,
  MessageSquare,
  PlusCircle,
  Receipt,
  UploadCloud,
  UserCheck
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  INITIAL_APPLICATIONS,
  INITIAL_CUSTOMER_PROFILE,
  INITIAL_DOCUMENTS,
  INITIAL_PAYMENTS
} from '../../features/customer/customerData';

export const CustomerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const profile = INITIAL_CUSTOMER_PROFILE;
  const applications = INITIAL_APPLICATIONS;

  const activeCount = applications.filter(
    (a) => a.status === 'Processing' || a.status === 'Assigned' || a.status === 'Pending'
  ).length;
  const completedCount = applications.filter((a) => a.status === 'Completed').length;
  const totalAmountPaid = INITIAL_PAYMENTS.reduce((sum, p) => sum + p.totalPaid, 0);

  const [showBankAlert, setShowBankAlert] = useState(true);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge label="Completed" variant="green" />;
      case 'Processing':
        return <Badge label="Processing" variant="orange" />;
      case 'Assigned':
        return <Badge label="Assigned" variant="blue" />;
      case 'Pending':
        return <Badge label="Pending Review" variant="neutral" />;
      default:
        return <Badge label={status} variant="neutral" />;
    }
  };

  return (
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header Notice */}
      <Surface
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)",
          gap: "1rem",
        }}
      >
        <Surface>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.375rem" }}>
            <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--blue)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Customer Portal Dashboard
            </Inline>
            <Inline style={{ color: "#cbd5e1" }}>•</Inline>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>CustID: {profile.CustID}</Inline>
          </Surface>

          <Title level={1}>
            <Inline style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
              Welcome back, {profile.fname}!
            </Inline>
          </Title>

          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
            {profile.businessName} • Assigned Agent: <strong style={{ color: "var(--navy)" }}>{profile.agentName}</strong> ({profile.agentId})
          </p>
        </Surface>

        <Surface style={{ display: 'flex', gap: "0.75rem" }}>
          <ActionButton
            label="Apply for Service"
            variant="primary"
            size="md"
            icon={<PlusCircle size={16} />}
            onClick={() => navigate('/customer/applications/new')}
          />
          <ActionButton
            label="Upload Documents"
            variant="secondary"
            size="md"
            icon={<UploadCloud size={16} />}
            onClick={() => navigate('/customer/documents/upload')}
          />
        </Surface>
      </Surface>

      {/* Profile Completion Alert (Bank details verified) */}
      {showBankAlert && (
        <Surface style={{ marginBottom: "1.5rem" }}>
          <Notice
            status="info"
            title="Profile & Bank Account Verification"
            description={
              <Inline>
                Your registered payout account is <strong>{profile.bank}</strong> (A/C: ****{profile.ACNo.slice(-4)}, IFSC: {profile.IFSE}). Ensure banking information remains current for reimbursement and refund processing.
              </Inline>
            }
            isDismissable
            onDismiss={() => setShowBankAlert(false)}
          />
        </Surface>
      )}

      {/* KPI Metrics Cards */}
      <Surface
        style={{
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))",
          gap: "1.25rem",
          marginBottom: "clamp(1rem, 2.4615384615384617vw, 2rem)",
        }}
      >
        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "0.75rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Total Applications</Inline>
            <Surface style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "#e0f2fe", color: "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.4615384615384617vw, 2rem)", fontWeight: 800, color: "var(--navy)" }}>{applications.length}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", marginTop: "0.25rem", fontWeight: 600 }}>All registered services</Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "0.75rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>In Workflow</Inline>
            <Surface style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "#fef3c7", color: "#d97706", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.4615384615384617vw, 2rem)", fontWeight: 800, color: "var(--navy)" }}>{activeCount}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#d97706", marginTop: "0.25rem", fontWeight: 600 }}>Active drafting &amp; review</Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "0.75rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Completed Services</Inline>
            <Surface style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "#dcfce7", color: "#16a34a", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.4615384615384617vw, 2rem)", fontWeight: 800, color: "var(--navy)" }}>{completedCount}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", marginTop: "0.25rem", fontWeight: 600 }}>Certificates delivered</Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "0.75rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Total Payments</Inline>
            <Surface style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "#f3e8ff", color: "#9333ea", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Receipt size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.4615384615384617vw, 2rem)", fontWeight: 800, color: "var(--navy)" }}>₹{totalAmountPaid.toLocaleString('en-IN')}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.25rem" }}>Invoices cleared</Surface>
        </Panel>
      </Surface>

      {/* Main Grid: Active Workflow Table & Sidebar Info */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 21.25rem), 1fr))", gap: "clamp(1rem, 2.1538461538461537vw, 1.75rem)", alignItems: 'flex-start' }}>
        {/* Left Column: Active Applications Table (Dense Astryx Table) */}
        <Surface style={{ gridColumn: 'span 2' }}>
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1.25rem" }}>
              <Surface>
                <Title level={2}>
                  <Inline style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--navy)" }}>
                    Active Workflow &amp; Filings
                  </Inline>
                </Title>
                <p style={{ color: "var(--muted)", fontSize: "0.8125rem", marginTop: "0.125rem", margin: 0 }}>
                  Real-time status updates from assigned Chartered Accountants and statutory desks.
                </p>
              </Surface>

              <Link to="/customer/applications" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--blue)", textDecoration: 'none', display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                View All <ArrowRight size={14} />
              </Link>
            </Surface>

            {/* Dense Rows Table */}
            <Surface style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
                <thead>
                  <tr style={{ borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontWeight: 600, fontSize: "0.8125rem", textTransform: 'uppercase' }}>
                    <th style={{ padding: "0.625rem 0.75rem" }}>Application ID</th>
                    <th style={{ padding: "0.625rem 0.75rem" }}>Service Name</th>
                    <th style={{ padding: "0.625rem 0.75rem" }}>Assigned CA</th>
                    <th style={{ padding: "0.625rem 0.75rem" }}>Status</th>
                    <th style={{ padding: "0.625rem 0.75rem" }}>Stage</th>
                    <th style={{ padding: "0.625rem 0.75rem", textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      style={{
                        borderBottom: "0.0625rem solid var(--sage-light)",
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <td style={{ padding: "0.875rem 0.75rem", fontWeight: 700, color: "var(--blue)" }}>
                        {app.id}
                      </td>
                      <td style={{ padding: "0.875rem 0.75rem" }}>
                        <Surface style={{ fontWeight: 600, color: "var(--navy)" }}>{app.serviceName}</Surface>
                        <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Submitted {app.submissionDate}</Surface>
                      </td>
                      <td style={{ padding: "0.875rem 0.75rem" }}>
                        {app.assignedCA ? (
                          <Surface>
                            <Surface style={{ fontWeight: 600, color: "#243b53" }}>{app.assignedCA.name}</Surface>
                            <Surface style={{ fontSize: "0.8125rem", color: "#16a34a" }}>ID: {app.assignedCA.id}</Surface>
                          </Surface>
                        ) : (
                          <Inline style={{ color: "#687d93", fontSize: "0.8125rem" }}>Allocation in queue</Inline>
                        )}
                      </td>
                      <td style={{ padding: "0.875rem 0.75rem" }}>
                        {getStatusBadge(app.status)}
                      </td>
                      <td style={{ padding: "0.875rem 0.75rem" }}>
                        <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.375rem" }}>
                          <Inline style={{ fontWeight: 700, color: "var(--navy)" }}>{app.currentStage}/5</Inline>
                          <Surface style={{ width: "3.75rem", height: "0.375rem", background: "var(--border)", borderRadius: "0.1875rem", overflow: 'hidden' }}>
                            <Surface style={{ width: `${(app.currentStage / 5) * 100}%`, height: '100%', background: "var(--blue)" }} />
                          </Surface>
                        </Surface>
                      </td>
                      <td style={{ padding: "0.875rem 0.75rem", textAlign: 'right' }}>
                        <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "0.375rem" }}>
                          <button
                            type="button"
                            onClick={() => navigate(`/customer/applications/${app.id}/tracker`)}
                            style={{
                              padding: "0.3125rem 0.625rem",
                              borderRadius: "0.375rem",
                              border: "0.0625rem solid #cbd5e1",
                              background: "var(--white)",
                              fontSize: "0.8125rem",
                              fontWeight: 600,
                              cursor: 'pointer',
                              color: "#334155",
                            }}
                            title="Open Application Tracker"
                          >
                            Track
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`/customer/applications/${app.id}`)}
                            style={{
                              padding: "0.3125rem 0.625rem",
                              borderRadius: "0.375rem",
                              border: 'none',
                              background: "#e0f2fe",
                              fontSize: "0.8125rem",
                              fontWeight: 600,
                              cursor: 'pointer',
                              color: "var(--blue)",
                            }}
                            title="View Full Application Details"
                          >
                            View
                          </button>
                        </Surface>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Surface>
          </Panel>
        </Surface>

        {/* Right Column: Quick Contact & Recent Documents */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1.5rem" }}>
          {/* Assigned CA Panel */}
          <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.875rem" }}>
              <Surface style={{ width: "2.375rem", height: "2.375rem", borderRadius: '50%', background: "#e0f2fe", color: "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserCheck size={20} />
              </Surface>
              <Surface>
                <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600, textTransform: 'uppercase' }}>
                  Primary Chartered Accountant
                </Inline>
                <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>
                  CA Vivek Agrawal
                </Surface>
              </Surface>
            </Surface>

            <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
              Managing your active GST Registration and Annual Filings. Direct messaging available for queries and document verification.
            </p>

            <ActionButton
              label="Open Chat with CA"
              variant="secondary"
              size="sm"
              width="100%"
              icon={<MessageSquare size={15} />}
              onClick={() => navigate('/customer/conversations')}
            />
          </Panel>

          {/* Quick Documents Preview */}
          <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.875rem" }}>
              <Inline style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>
                Recent Documents
              </Inline>
              <Link to="/customer/documents" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--blue)", textDecoration: 'none' }}>
                All Files
              </Link>
            </Surface>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem" }}>
              {INITIAL_DOCUMENTS.slice(0, 3).map((doc) => (
                <Surface
                  key={doc.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: "0.5rem 0.625rem",
                    borderRadius: "0.5rem",
                    background: "var(--cream)",
                    border: "0.0625rem solid var(--border)",
                  }}
                >
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", overflow: 'hidden' }}>
                    <FileText size={16} color="var(--blue)" style={{ flexShrink: 0 }} />
                    <Surface style={{ overflow: 'hidden' }}>
                      <Surface style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#243b53", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {doc.fileName}
                      </Surface>
                      <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
                        {doc.fileSize} • {doc.status}
                      </Surface>
                    </Surface>
                  </Surface>
                  <Download size={15} color="var(--muted)" style={{ cursor: 'pointer', flexShrink: 0 }} />
                </Surface>
              ))}
            </Surface>
          </Panel>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default CustomerDashboardPage;
