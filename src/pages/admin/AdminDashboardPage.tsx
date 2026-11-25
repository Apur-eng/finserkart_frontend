import { Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
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
            <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#dc2626", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Central Platform Governance
            </Inline>
            <Inline style={{ color: "#cbd5e1" }}>•</Inline>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Super Admin: {admin.email}</Inline>
          </Surface>

          <Title level={1}>
            <Inline style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
              Platform Executive Dashboard
            </Inline>
          </Title>

          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
            Real-time business analytics across all participant tiers: Customers, Agents, CAs, Franchises, and Operations.
          </p>
        </Surface>

        <Panel
          elevation="low"
          padding={3}
          style={{
            background: "var(--status-brand)",
            border: "0.0625rem solid #fecaca",
            borderRadius: "1rem",
            textAlign: 'right',
          }}
        >
          <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#b91c1c", textTransform: 'uppercase' }}>
            System Health
          </Surface>
          <Surface style={{ fontSize: "1.25rem", fontWeight: 800, color: "#991b1b", display: 'flex', alignItems: 'center', gap: "0.375rem" }}>
            <ShieldCheck size={18} color="#16a34a" /> 99.98% Uptime
          </Surface>
          <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>All microservices nominal</Inline>
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
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Total Platform GMV</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#eff6ff", color: "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>
            ₹{stats.totalGMV.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", marginTop: "0.375rem", fontWeight: 600, display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
            <TrendingUp size={13} /> +24% YoY Growth
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Net Platform Margin</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#ecfdf5", color: "var(--teal)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--teal)" }}>
            ₹{stats.platformNetRevenue.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.375rem" }}>
            After CA &amp; agent disbursements
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Active Filings Pipeline</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#fffbeb", color: "#d97706", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{stats.activeApplications}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--teal)", marginTop: "0.375rem", fontWeight: 600 }}>
            {stats.completedApplications} total historical handovers
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Registered Users</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#f5f3ff", color: "#7c3aed", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{stats.totalCustomers}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#7c3aed", marginTop: "0.375rem", fontWeight: 600 }}>
            Across 5 participant roles
          </Surface>
        </Panel>
      </Surface>

      {/* Quick Action Shortcuts */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1rem", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
        <button
          type="button"
          onClick={() => navigate('/admin/users')}
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "1rem",
            border: "0.0625rem solid var(--border)",
            background: "var(--white)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.875rem" }}>
            <Surface style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.625rem", background: "#eff6ff", color: "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>User Management</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Manage clients, agents, CAs &amp; franchises</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--blue)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin/services')}
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "1rem",
            border: "0.0625rem solid var(--border)",
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
              <CreditCard size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>Service Catalogue</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Configure pricing &amp; commission splits</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--teal)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin/commissions')}
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "1rem",
            border: "0.0625rem solid var(--border)",
            background: "var(--white)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.875rem" }}>
            <Surface style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.625rem", background: "#fef3c7", color: "#d97706", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>Commissions &amp; Payouts</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Approve partner disbursement batches</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="#d97706" />
        </button>
      </Surface>

      {/* Grid: Role Distribution & System Activity Logs */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22.5rem), 1fr))", gap: "1.5rem" }}>
        {/* User Distribution by Role */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
            Platform Network Distribution
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.75rem", fontSize: "0.8125rem" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "0.625rem 0.75rem", borderRadius: "0.5rem", background: "var(--cream)", border: "0.0625rem solid var(--sage-light)" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                <UserCheck size={16} color="var(--blue)" />
                <Inline style={{ fontWeight: 600, color: "var(--navy)" }}>Onboarded Customers</Inline>
              </Surface>
              <strong style={{ color: "var(--blue)" }}>{stats.totalCustomers}</strong>
            </Surface>

            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "0.625rem 0.75rem", borderRadius: "0.5rem", background: "var(--cream)", border: "0.0625rem solid var(--sage-light)" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                <Users size={16} color="var(--teal)" />
                <Inline style={{ fontWeight: 600, color: "var(--navy)" }}>Active Field Agents</Inline>
              </Surface>
              <strong style={{ color: "var(--teal)" }}>{stats.totalAgents}</strong>
            </Surface>

            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "0.625rem 0.75rem", borderRadius: "0.5rem", background: "var(--cream)", border: "0.0625rem solid var(--sage-light)" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                <Scale size={16} color="#7c3aed" />
                <Inline style={{ fontWeight: 600, color: "var(--navy)" }}>Certified Chartered Accountants</Inline>
              </Surface>
              <strong style={{ color: "#7c3aed" }}>{stats.totalCas}</strong>
            </Surface>

            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "0.625rem 0.75rem", borderRadius: "0.5rem", background: "var(--cream)", border: "0.0625rem solid var(--sage-light)" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                <Building size={16} color="#0284c7" />
                <Inline style={{ fontWeight: 600, color: "var(--navy)" }}>Regional Franchise Hubs</Inline>
              </Surface>
              <strong style={{ color: "#0284c7" }}>{stats.totalFranchises}</strong>
            </Surface>
          </Surface>
        </Panel>

        {/* Real-time Activity Logs */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem" }}>
            <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Live System Activity</Surface>
            <Link to="/admin/activity" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#dc2626", textDecoration: 'none' }}>
              Full Audit Trail
            </Link>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.75rem" }}>
            {logs.map((log) => (
              <Surface key={log.id} style={{ display: 'flex', gap: "0.625rem", alignItems: 'flex-start', paddingBottom: "0.625rem", borderBottom: "0.0625rem solid var(--sage-light)" }}>
                <Surface style={{ width: "1.75rem", height: "1.75rem", borderRadius: "0.375rem", background: "var(--cream)", border: "0.0625rem solid var(--border)", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--muted)", flexShrink: 0 }}>
                  <Activity size={14} />
                </Surface>
                <Surface style={{ flex: 1 }}>
                  <Surface style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--navy)" }}>{log.action}</Surface>
                  <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
                    {log.actor} • IP: {log.ip} • {log.timestamp}
                  </Surface>
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Panel>
      </Surface>
    </Surface>
  );
};

export default AdminDashboardPage;
