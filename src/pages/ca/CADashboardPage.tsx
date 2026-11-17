import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
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
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '28px',
          gap: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              CA Regulatory Dashboard
            </span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>ICAI Reg: {ca.membershipNo}</span>
          </div>

          <Heading level={1}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Welcome, CA {ca.fname} {ca.lname}
            </span>
          </Heading>

          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
            {ca.firmName} • {ca.title}
          </p>
        </div>

        {/* Practice Credentials Pill */}
        <Card
          elevation="low"
          padding={3}
          style={{
            background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
            border: '1px solid #ddd6fe',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#7c3aed', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scale size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#6d28d9', textTransform: 'uppercase' }}>
              Certificate of Practice
            </div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#4c1d95', fontFamily: 'monospace' }}>
              {ca.copNo} (Active)
            </div>
          </div>
        </Card>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Active Filings Queue</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{ca.activeWorkflowsCount}</div>
          <div style={{ fontSize: '12px', color: '#7c3aed', marginTop: '6px', fontWeight: 600 }}>
            Under active statutory drafting
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Pending Document Reviews</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{ca.pendingReviewDocsCount}</div>
          <div style={{ fontSize: '12px', color: '#d97706', marginTop: '6px', fontWeight: 600 }}>
            Uploaded by clients today
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Completed Filings</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{ca.completedWorkflowsCount}</div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '6px', fontWeight: 600 }}>
            100% on-time turnaround
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Professional Commission</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', color: '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>
            ₹{ca.totalCommissionEarned.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#0066cc', marginTop: '6px', fontWeight: 600 }}>
            ₹{ca.pendingCommission.toLocaleString('en-IN')} pending
          </div>
        </Card>
      </div>

      {/* Quick Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <button
          type="button"
          onClick={() => navigate('/ca/applications')}
          style={{
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #ddd6fe',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Assigned Applications Queue</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Inspect filing steps &amp; progress</div>
            </div>
          </div>
          <ArrowRight size={18} color="#7c3aed" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/ca/documents')}
          style={{
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #fde68a',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Document Review &amp; Audit</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Verify KYC &amp; premises proofs</div>
            </div>
          </div>
          <ArrowRight size={18} color="#d97706" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/ca/deliverables')}
          style={{
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #a7f3d0',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Deliverables Handover</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Upload final govt certificates</div>
            </div>
          </div>
          <ArrowRight size={18} color="#059669" />
        </button>
      </div>

      {/* Active Workflows Queue Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Active Filing Workflows</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Statutory applications allocated to your desk</div>
          </div>
          <Link to="/ca/applications" style={{ fontSize: '12.5px', fontWeight: 600, color: '#7c3aed', textDecoration: 'none' }}>
            View all queue
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Priority &amp; ID</th>
                <th style={{ padding: '14px 18px' }}>Service Name</th>
                <th style={{ padding: '14px 18px' }}>Client Enterprise</th>
                <th style={{ padding: '14px 18px' }}>Deadline</th>
                <th style={{ padding: '14px 18px' }}>Current Progress</th>
                <th style={{ padding: '14px 18px' }}>CA Fee</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Badge
                        label={app.priority}
                        variant={app.priority === 'Urgent' ? 'red' : app.priority === 'High' ? 'orange' : 'neutral'}
                      />
                      <span style={{ fontWeight: 700, fontFamily: 'monospace', color: '#0f172a' }}>#{app.id}</span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{app.serviceName}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Assigned {app.assignedDate}</div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{app.customerName}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{app.businessName}</div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#d97706', fontWeight: 600, fontSize: '13px' }}>
                      <Clock size={13} /> {app.deadline}
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Badge label={`Stage ${app.currentStage} / ${app.totalStages}`} variant="purple" />
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{app.status}</span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px', fontWeight: 700, color: '#7c3aed' }}>
                    ₹{app.caCommission.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => navigate(`/ca/applications/${app.id}/workflow`)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #ddd6fe',
                        background: '#f5f3ff',
                        color: '#7c3aed',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Update <ArrowRight size={13} />
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

export default CADashboardPage;
