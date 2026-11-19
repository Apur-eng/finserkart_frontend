import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header Banner */}
      <Surface
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: "var(--spacing-fsk-20)",
          gap: "var(--spacing-fsk-5)",
        }}
      >
        <Surface>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-17)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-15)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Customer Portal Dashboard
            </Inline>
            <Inline style={{ color: "var(--color-fsk-59)" }}>•</Inline>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>CustID: {profile.CustID}</Inline>
          </Surface>

          <Heading level={1}>
            <Inline style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
              Welcome back, {profile.fname}!
            </Inline>
          </Heading>

          <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
            {profile.businessName} • Assigned Agent: <strong style={{ color: "var(--color-fsk-7)" }}>{profile.agentName}</strong> ({profile.agentId})
          </p>
        </Surface>

        <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-8)" }}>
          <Button
            label="Apply for Service"
            variant="primary"
            size="md"
            icon={<PlusCircle size={16} />}
            onClick={() => navigate('/customer/applications/new')}
          />
          <Button
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
        <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
          <Banner
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
          gap: "var(--spacing-fsk-2)",
          marginBottom: "var(--spacing-fsk-114)",
        }}
      >
        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "var(--spacing-fsk-8)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Total Applications</Inline>
            <Surface style={{ width: "var(--spacing-fsk-85)", height: "var(--spacing-fsk-85)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-112)", color: "var(--color-fsk-15)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-95)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{applications.length}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", marginTop: "var(--spacing-fsk-29)", fontWeight: 600 }}>All registered services</Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "var(--spacing-fsk-8)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>In Workflow</Inline>
            <Surface style={{ width: "var(--spacing-fsk-85)", height: "var(--spacing-fsk-85)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-69)", color: "var(--color-fsk-54)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-95)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{activeCount}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-54)", marginTop: "var(--spacing-fsk-29)", fontWeight: 600 }}>Active drafting &amp; review</Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "var(--spacing-fsk-8)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Completed Services</Inline>
            <Surface style={{ width: "var(--spacing-fsk-85)", height: "var(--spacing-fsk-85)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-116)", color: "var(--color-fsk-39)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-95)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{completedCount}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", marginTop: "var(--spacing-fsk-29)", fontWeight: 600 }}>Certificates delivered</Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "var(--spacing-fsk-8)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Total Payments</Inline>
            <Surface style={{ width: "var(--spacing-fsk-85)", height: "var(--spacing-fsk-85)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-118)", color: "var(--color-fsk-119)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Receipt size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-95)", fontWeight: 800, color: "var(--color-fsk-7)" }}>₹{totalAmountPaid.toLocaleString('en-IN')}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-29)" }}>Invoices cleared</Surface>
        </Card>
      </Surface>

      {/* Main Grid: Active Workflow Table & Sidebar Info */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 21.25rem), 1fr))", gap: "var(--spacing-fsk-20)", alignItems: 'flex-start' }}>
        {/* Left Column: Active Applications Table (Dense Astryx Table) */}
        <Surface style={{ gridColumn: 'span 2' }}>
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-2)" }}>
              <Surface>
                <Heading level={2}>
                  <Inline style={{ fontSize: "var(--font-fsk-30)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                    Active Workflow &amp; Filings
                  </Inline>
                </Heading>
                <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", marginTop: "var(--spacing-fsk-47)", margin: 0 }}>
                  Real-time status updates from assigned Chartered Accountants and statutory desks.
                </p>
              </Surface>

              <Link to="/customer/applications" style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-15)", textDecoration: 'none', display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                View All <ArrowRight size={14} />
              </Link>
            </Surface>

            {/* Dense Rows Table */}
            <Surface style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
                <thead>
                  <tr style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontWeight: 600, fontSize: "var(--font-fsk-14)", textTransform: 'uppercase' }}>
                    <th style={{ padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)" }}>Application ID</th>
                    <th style={{ padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)" }}>Service Name</th>
                    <th style={{ padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)" }}>Assigned CA</th>
                    <th style={{ padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)" }}>Status</th>
                    <th style={{ padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)" }}>Stage</th>
                    <th style={{ padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)", textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      style={{
                        borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)",
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-8)", fontWeight: 700, color: "var(--color-fsk-15)" }}>
                        {app.id}
                      </td>
                      <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-8)" }}>
                        <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>{app.serviceName}</Surface>
                        <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Submitted {app.submissionDate}</Surface>
                      </td>
                      <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-8)" }}>
                        {app.assignedCA ? (
                          <Surface>
                            <Surface style={{ fontWeight: 600, color: "var(--color-fsk-113)" }}>{app.assignedCA.name}</Surface>
                            <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)" }}>ID: {app.assignedCA.id}</Surface>
                          </Surface>
                        ) : (
                          <Inline style={{ color: "var(--color-fsk-57)", fontSize: "var(--font-fsk-14)" }}>Allocation in queue</Inline>
                        )}
                      </td>
                      <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-8)" }}>
                        {getStatusBadge(app.status)}
                      </td>
                      <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-8)" }}>
                        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-17)" }}>
                          <Inline style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{app.currentStage}/5</Inline>
                          <Surface style={{ width: "var(--spacing-fsk-120)", height: "var(--spacing-fsk-17)", background: "var(--color-fsk-21)", borderRadius: "var(--radius-fsk-110)", overflow: 'hidden' }}>
                            <Surface style={{ width: `${(app.currentStage / 5) * 100}%`, height: '100%', background: "var(--color-fsk-15)" }} />
                          </Surface>
                        </Surface>
                      </td>
                      <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-8)", textAlign: 'right' }}>
                        <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "var(--spacing-fsk-17)" }}>
                          <button
                            type="button"
                            onClick={() => navigate(`/customer/applications/${app.id}/tracker`)}
                            style={{
                              padding: "var(--spacing-fsk-86) var(--spacing-fsk-35)",
                              borderRadius: "var(--radius-fsk-42)",
                              border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                              background: "var(--color-fsk-38)",
                              fontSize: "var(--font-fsk-14)",
                              fontWeight: 600,
                              cursor: 'pointer',
                              color: "var(--color-fsk-25)",
                            }}
                            title="Open Application Tracker"
                          >
                            Track
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`/customer/applications/${app.id}`)}
                            style={{
                              padding: "var(--spacing-fsk-86) var(--spacing-fsk-35)",
                              borderRadius: "var(--radius-fsk-42)",
                              border: 'none',
                              background: "var(--color-fsk-112)",
                              fontSize: "var(--font-fsk-14)",
                              fontWeight: 600,
                              cursor: 'pointer',
                              color: "var(--color-fsk-15)",
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
          </Card>
        </Surface>

        {/* Right Column: Quick Contact & Recent Documents */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-26)" }}>
          {/* Assigned CA Card */}
          <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-23)" }}>
              <Surface style={{ width: "var(--spacing-fsk-90)", height: "var(--spacing-fsk-90)", borderRadius: '50%', background: "var(--color-fsk-112)", color: "var(--color-fsk-15)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserCheck size={20} />
              </Surface>
              <Surface>
                <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600, textTransform: 'uppercase' }}>
                  Primary Chartered Accountant
                </Inline>
                <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                  CA Vivek Agrawal
                </Surface>
              </Surface>
            </Surface>

            <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-18)", lineHeight: 1.5, marginBottom: "var(--spacing-fsk-5)" }}>
              Managing your active GST Registration and Annual Filings. Direct messaging available for queries and document verification.
            </p>

            <Button
              label="Open Chat with CA"
              variant="secondary"
              size="sm"
              width="100%"
              icon={<MessageSquare size={15} />}
              onClick={() => navigate('/customer/conversations')}
            />
          </Card>

          {/* Quick Documents Preview */}
          <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-23)" }}>
              <Inline style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                Recent Documents
              </Inline>
              <Link to="/customer/documents" style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-15)", textDecoration: 'none' }}>
                All Files
              </Link>
            </Surface>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)" }}>
              {INITIAL_DOCUMENTS.slice(0, 3).map((doc) => (
                <Surface
                  key={doc.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: "var(--spacing-fsk-12) var(--spacing-fsk-35)",
                    borderRadius: "var(--radius-fsk-37)",
                    background: "var(--color-fsk-27)",
                    border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
                  }}
                >
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", overflow: 'hidden' }}>
                    <FileText size={16} color="var(--color-fsk-15)" style={{ flexShrink: 0 }} />
                    <Surface style={{ overflow: 'hidden' }}>
                      <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-113)", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {doc.fileName}
                      </Surface>
                      <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
                        {doc.fileSize} • {doc.status}
                      </Surface>
                    </Surface>
                  </Surface>
                  <Download size={15} color="var(--color-fsk-9)" style={{ cursor: 'pointer', flexShrink: 0 }} />
                </Surface>
              ))}
            </Surface>
          </Card>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default CustomerDashboardPage;
