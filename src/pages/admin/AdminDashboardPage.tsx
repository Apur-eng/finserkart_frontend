import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import {
  Activity,
  ArrowRight,
  Briefcase,
  Building,
  Coins,
  CreditCard,
  Scale,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users
} from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  INITIAL_ADMIN_ACTIVITY_LOGS,
  INITIAL_ADMIN_ANALYTICS,
  INITIAL_ADMIN_PROFILE
} from '../../features/admin/adminData';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const admin = INITIAL_ADMIN_PROFILE;
  const stats = INITIAL_ADMIN_ANALYTICS;
  const logs = INITIAL_ADMIN_ACTIVITY_LOGS;

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
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Central Platform Governance
            </span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Super Admin: {admin.email}</span>
          </div>

          <Heading level={1}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Platform Executive Dashboard
            </span>
          </Heading>

          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
            Real-time business analytics across all participant tiers: Customers, Agents, CAs, Franchises, and Operations.
          </p>
        </div>

        <Card
          elevation="low"
          padding={3}
          style={{
            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            textAlign: 'right',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#b91c1c', textTransform: 'uppercase' }}>
            System Health
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#991b1b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={18} color="#16a34a" /> 99.98% Uptime
          </div>
          <span style={{ fontSize: '11.5px', color: '#64748b' }}>All microservices nominal</span>
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
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total Platform GMV</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', color: '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>
            ₹{stats.totalGMV.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} /> +24% YoY Growth
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Net Platform Margin</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#059669' }}>
            ₹{stats.platformNetRevenue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
            After CA &amp; agent disbursements
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Active Filings Pipeline</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{stats.activeApplications}</div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '6px', fontWeight: 600 }}>
            {stats.completedApplications} total historical handovers
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Registered Users</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{stats.totalCustomers}</div>
          <div style={{ fontSize: '12px', color: '#7c3aed', marginTop: '6px', fontWeight: 600 }}>
            Across 5 participant roles
          </div>
        </Card>
      </div>

      {/* Quick Action Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <button
          type="button"
          onClick={() => navigate('/admin/users')}
          style={{
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', color: '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>User Management</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Manage clients, agents, CAs &amp; franchises</div>
            </div>
          </div>
          <ArrowRight size={18} color="#0066cc" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin/services')}
          style={{
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
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
              <CreditCard size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Service Catalogue</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Configure pricing &amp; commission splits</div>
            </div>
          </div>
          <ArrowRight size={18} color="#059669" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin/commissions')}
          style={{
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Commissions &amp; Payouts</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Approve partner disbursement batches</div>
            </div>
          </div>
          <ArrowRight size={18} color="#d97706" />
        </button>
      </div>

      {/* Grid: Role Distribution & System Activity Logs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* User Distribution by Role */}
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Platform Network Distribution
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={16} color="#0066cc" />
                <span style={{ fontWeight: 600, color: '#0f172a' }}>Onboarded Customers</span>
              </div>
              <strong style={{ color: '#0066cc' }}>{stats.totalCustomers}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="#059669" />
                <span style={{ fontWeight: 600, color: '#0f172a' }}>Active Field Agents</span>
              </div>
              <strong style={{ color: '#059669' }}>{stats.totalAgents}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Scale size={16} color="#7c3aed" />
                <span style={{ fontWeight: 600, color: '#0f172a' }}>Certified Chartered Accountants</span>
              </div>
              <strong style={{ color: '#7c3aed' }}>{stats.totalCas}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building size={16} color="#0284c7" />
                <span style={{ fontWeight: 600, color: '#0f172a' }}>Regional Franchise Hubs</span>
              </div>
              <strong style={{ color: '#0284c7' }}>{stats.totalFranchises}</strong>
            </div>
          </div>
        </Card>

        {/* Real-time Activity Logs */}
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Live System Activity</div>
            <Link to="/admin/activity" style={{ fontSize: '12.5px', fontWeight: 600, color: '#dc2626', textDecoration: 'none' }}>
              Full Audit Trail
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {logs.map((log) => (
              <div key={log.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexShrink: 0 }}>
                  <Activity size={14} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{log.action}</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                    {log.actor} • IP: {log.ip} • {log.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
