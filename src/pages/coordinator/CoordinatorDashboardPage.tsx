import { Badge } from '@astryxdesign/core/Badge';
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
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Operations Command Dashboard
            </span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Desk: {coord.id}</span>
          </div>

          <Heading level={1}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Welcome, {coord.name}
            </span>
          </Heading>

          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
            {coord.role} • {coord.location}
          </p>
        </div>

        {unassignedApps.length > 0 && (
          <Card
            elevation="low"
            padding={3}
            style={{
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#d97706', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={18} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#92400e', textTransform: 'uppercase' }}>
                Action Required
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#78350f' }}>
                {unassignedApps.length} Unallocated Applications
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Operational KPI Cards */}
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
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Unassigned Filings</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckSquare size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{unassignedApps.length}</div>
          <div style={{ fontSize: '12px', color: '#d97706', marginTop: '6px', fontWeight: 600 }}>
            Pending CA allocation today
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Active CA Network</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{coord.totalCasManaged}</div>
          <div style={{ fontSize: '12px', color: '#7c3aed', marginTop: '6px', fontWeight: 600 }}>
            {cas.filter((c) => c.availability === 'Available').length} CAs available for allocation
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Document Verifications</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{coord.inReviewDocsCount}</div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '6px', fontWeight: 600 }}>
            Under active verification
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Today's Orders Intake</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', color: '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>
            ₹{coord.todayTransactionsTotal.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#0066cc', marginTop: '6px', fontWeight: 600 }}>
            {coord.activeApplicationsCount} total pipeline filings
          </div>
        </Card>
      </div>

      {/* Quick Action Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <button
          type="button"
          onClick={() => navigate('/coordinator/assignments')}
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
              <CheckSquare size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>CA Assignment Desk</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Assign professionals to pending orders</div>
            </div>
          </div>
          <ArrowRight size={18} color="#d97706" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/coordinator/documents')}
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
              <FileCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Document Monitoring</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Inspect KYC &amp; premises proofs</div>
            </div>
          </div>
          <ArrowRight size={18} color="#059669" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/coordinator/cas')}
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
              <UserCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>CA Capacity Matrix</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Review caseload &amp; turnaround SLA</div>
            </div>
          </div>
          <ArrowRight size={18} color="#7c3aed" />
        </button>
      </div>

      {/* Grid: Immediate Action Queue & CA Workload */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', alignItems: 'flex-start' }}>
        {/* Urgent Applications Queue */}
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Unassigned Applications Pipeline</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Orders requiring CA allocation</div>
            </div>
            <Link to="/coordinator/assignments" style={{ fontSize: '12.5px', fontWeight: 600, color: '#d97706', textDecoration: 'none' }}>
              Assign now
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {applications.map((app) => (
              <div
                key={app.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderRadius: '10px',
                  border: app.assignmentStatus === 'Unassigned' ? '1px solid #fde68a' : '1px solid #f1f5f9',
                  background: app.assignmentStatus === 'Unassigned' ? '#fffdf7' : '#f8fafc',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>{app.serviceName}</span>
                    <Badge
                      label={app.assignmentStatus}
                      variant={app.assignmentStatus === 'Assigned' ? 'green' : 'orange'}
                    />
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Client: <strong style={{ color: '#0f172a' }}>{app.customerName}</strong> ({app.businessName})
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    #{app.id} • SLA Target: {app.slaDeadline}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                    {app.assignedCAName || 'Unassigned'}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/coordinator/assignments')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#d97706',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                      marginTop: '4px',
                    }}
                  >
                    {app.assignmentStatus === 'Unassigned' ? 'Assign CA' : 'Reassign'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* CA Capacity Matrix Overview */}
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>CA Availability &amp; Capacity</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Real-time professional workload balance</div>
            </div>
            <Link to="/coordinator/cas" style={{ fontSize: '12.5px', fontWeight: 600, color: '#d97706', textDecoration: 'none' }}>
              Full Matrix
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cas.map((ca) => (
              <div
                key={ca.id}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #f1f5f9',
                  background: '#f8fafc',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>{ca.name}</span>
                    <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '6px' }}>{ca.membershipNo}</span>
                  </div>
                  <Badge
                    label={ca.availability}
                    variant={ca.availability === 'Available' ? 'green' : 'orange'}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b' }}>
                  <span>{ca.specialization}</span>
                  <strong>{ca.activeCaseload} / {ca.capacityLimit} cases</strong>
                </div>

                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${(ca.activeCaseload / ca.capacityLimit) * 100}%`,
                      height: '100%',
                      background: ca.activeCaseload >= ca.capacityLimit - 1 ? '#d97706' : '#059669',
                      borderRadius: '3px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CoordinatorDashboardPage;
