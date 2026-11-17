import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '28px',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0066cc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Customer Portal Dashboard
            </span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>CustID: {profile.CustID}</span>
          </div>

          <Heading level={1}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Welcome back, {profile.fname}!
            </span>
          </Heading>

          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
            {profile.businessName} • Assigned Agent: <strong style={{ color: '#0f172a' }}>{profile.agentName}</strong> ({profile.agentId})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
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
        </div>
      </div>

      {/* Profile Completion Alert (Bank details verified) */}
      {showBankAlert && (
        <div style={{ marginBottom: '24px' }}>
          <Banner
            status="info"
            title="Profile & Bank Account Verification"
            description={
              <span>
                Your registered payout account is <strong>{profile.bank}</strong> (A/C: ****{profile.ACNo.slice(-4)}, IFSC: {profile.IFSE}). Ensure banking information remains current for reimbursement and refund processing.
              </span>
            }
            isDismissable
            onDismiss={() => setShowBankAlert(false)}
          />
        </div>
      )}

      {/* KPI Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total Applications</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#e0f2fe', color: '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={18} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>{applications.length}</div>
          <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '4px', fontWeight: 600 }}>All registered services</div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>In Workflow</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>{activeCount}</div>
          <div style={{ fontSize: '12px', color: '#d97706', marginTop: '4px', fontWeight: 600 }}>Active drafting &amp; review</div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Completed Services</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>{completedCount}</div>
          <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '4px', fontWeight: 600 }}>Certificates delivered</div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total Payments</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Receipt size={18} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a' }}>₹{totalAmountPaid.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Invoices cleared</div>
        </Card>
      </div>

      {/* Main Grid: Active Workflow Table & Sidebar Info */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px', alignItems: 'flex-start' }}>
        {/* Left Column: Active Applications Table (Dense Astryx Table) */}
        <div style={{ gridColumn: 'span 2' }}>
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <Heading level={2}>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                    Active Workflow &amp; Filings
                  </span>
                </Heading>
                <p style={{ color: '#64748b', fontSize: '13px', marginTop: '2px', margin: 0 }}>
                  Real-time status updates from assigned Chartered Accountants and statutory desks.
                </p>
              </div>

              <Link to="/customer/applications" style={{ fontSize: '13px', fontWeight: 600, color: '#0066cc', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>

            {/* Dense Rows Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '10px 12px' }}>Application ID</th>
                    <th style={{ padding: '10px 12px' }}>Service Name</th>
                    <th style={{ padding: '10px 12px' }}>Assigned CA</th>
                    <th style={{ padding: '10px 12px' }}>Status</th>
                    <th style={{ padding: '10px 12px' }}>Stage</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <td style={{ padding: '14px 12px', fontWeight: 700, color: '#0066cc' }}>
                        {app.id}
                      </td>
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{app.serviceName}</div>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>Submitted {app.submissionDate}</div>
                      </td>
                      <td style={{ padding: '14px 12px' }}>
                        {app.assignedCA ? (
                          <div>
                            <div style={{ fontWeight: 600, color: '#1e293b' }}>{app.assignedCA.name}</div>
                            <div style={{ fontSize: '11px', color: '#16a34a' }}>ID: {app.assignedCA.id}</div>
                          </div>
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: '12px' }}>Allocation in queue</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 12px' }}>
                        {getStatusBadge(app.status)}
                      </td>
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 700, color: '#0f172a' }}>{app.currentStage}/5</span>
                          <div style={{ width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${(app.currentStage / 5) * 100}%`, height: '100%', background: '#0066cc' }} />
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => navigate(`/customer/applications/${app.id}/tracker`)}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: '1px solid #cbd5e1',
                              background: '#ffffff',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              color: '#334155',
                            }}
                            title="Open Application Tracker"
                          >
                            Track
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`/customer/applications/${app.id}`)}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: 'none',
                              background: '#e0f2fe',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              color: '#0066cc',
                            }}
                            title="View Full Application Details"
                          >
                            View
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

        {/* Right Column: Quick Contact & Recent Documents */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Assigned CA Card */}
          <Card elevation="low" padding={4} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#e0f2fe', color: '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserCheck size={20} />
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                  Primary Chartered Accountant
                </span>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                  CA Vivek Agrawal
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>
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
          <Card elevation="low" padding={4} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                Recent Documents
              </span>
              <Link to="/customer/documents" style={{ fontSize: '12px', fontWeight: 600, color: '#0066cc', textDecoration: 'none' }}>
                All Files
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {INITIAL_DOCUMENTS.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <FileText size={16} color="#0066cc" style={{ flexShrink: 0 }} />
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {doc.fileName}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        {doc.fileSize} • {doc.status}
                      </div>
                    </div>
                  </div>
                  <Download size={15} color="#64748b" style={{ cursor: 'pointer', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
