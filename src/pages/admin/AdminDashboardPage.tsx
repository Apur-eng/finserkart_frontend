import { Surface, Inline } from '../../components/Surface';
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
            <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-34)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Central Platform Governance
            </Inline>
            <Inline style={{ color: "var(--color-fsk-59)" }}>•</Inline>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Super Admin: {admin.email}</Inline>
          </Surface>

          <Heading level={1}>
            <Inline style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
              Platform Executive Dashboard
            </Inline>
          </Heading>

          <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
            Real-time business analytics across all participant tiers: Customers, Agents, CAs, Franchises, and Operations.
          </p>
        </Surface>

        <Card
          elevation="low"
          padding={3}
          style={{
            background: "var(--color-fsk-brand)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-58)",
            borderRadius: "var(--radius-fsk-28)",
            textAlign: 'right',
          }}
        >
          <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-60)", textTransform: 'uppercase' }}>
            System Health
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-61)", fontWeight: 800, color: "var(--color-fsk-44)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-17)" }}>
            <ShieldCheck size={18} color="var(--color-fsk-39)" /> 99.98% Uptime
          </Surface>
          <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>All microservices nominal</Inline>
        </Card>
      </Surface>

      {/* KPI Cards */}
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
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Total Platform GMV</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-63)", color: "var(--color-fsk-15)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>
            ₹{stats.totalGMV.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600, display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
            <TrendingUp size={13} /> +24% YoY Growth
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Net Platform Margin</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-64)", color: "var(--color-fsk-65)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-65)" }}>
            ₹{stats.platformNetRevenue.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-17)" }}>
            After CA &amp; agent disbursements
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Active Filings Pipeline</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-66)", color: "var(--color-fsk-54)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{stats.activeApplications}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-65)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600 }}>
            {stats.completedApplications} total historical handovers
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Registered Users</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-53)", color: "var(--color-fsk-41)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{stats.totalCustomers}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-41)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600 }}>
            Across 5 participant roles
          </Surface>
        </Card>
      </Surface>

      {/* Quick Action Shortcuts */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-5)", marginBottom: "var(--spacing-fsk-20)" }}>
        <button
          type="button"
          onClick={() => navigate('/admin/users')}
          style={{
            padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
            background: "var(--color-fsk-38)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-23)" }}>
            <Surface style={{ width: "var(--spacing-fsk-67)", height: "var(--spacing-fsk-67)", borderRadius: "var(--radius-fsk-68)", background: "var(--color-fsk-63)", color: "var(--color-fsk-15)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>User Management</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Manage clients, agents, CAs &amp; franchises</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--color-fsk-15)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin/services')}
          style={{
            padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
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
              <CreditCard size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Service Catalogue</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Configure pricing &amp; commission splits</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--color-fsk-65)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin/commissions')}
          style={{
            padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
            background: "var(--color-fsk-38)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-23)" }}>
            <Surface style={{ width: "var(--spacing-fsk-67)", height: "var(--spacing-fsk-67)", borderRadius: "var(--radius-fsk-68)", background: "var(--color-fsk-69)", color: "var(--color-fsk-54)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Commissions &amp; Payouts</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Approve partner disbursement batches</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--color-fsk-54)" />
        </button>
      </Surface>

      {/* Grid: Role Distribution & System Activity Logs */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22.5rem), 1fr))", gap: "var(--spacing-fsk-26)" }}>
        {/* User Distribution by Role */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-5)" }}>
            Platform Network Distribution
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-8)", fontSize: "var(--font-fsk-14)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-27)", border: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
                <UserCheck size={16} color="var(--color-fsk-15)" />
                <Inline style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>Onboarded Customers</Inline>
              </Surface>
              <strong style={{ color: "var(--color-fsk-15)" }}>{stats.totalCustomers}</strong>
            </Surface>

            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-27)", border: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
                <Users size={16} color="var(--color-fsk-65)" />
                <Inline style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>Active Field Agents</Inline>
              </Surface>
              <strong style={{ color: "var(--color-fsk-65)" }}>{stats.totalAgents}</strong>
            </Surface>

            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-27)", border: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
                <Scale size={16} color="var(--color-fsk-41)" />
                <Inline style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>Certified Chartered Accountants</Inline>
              </Surface>
              <strong style={{ color: "var(--color-fsk-41)" }}>{stats.totalCas}</strong>
            </Surface>

            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-27)", border: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
                <Building size={16} color="var(--color-fsk-70)" />
                <Inline style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>Regional Franchise Hubs</Inline>
              </Surface>
              <strong style={{ color: "var(--color-fsk-70)" }}>{stats.totalFranchises}</strong>
            </Surface>
          </Surface>
        </Card>

        {/* Real-time Activity Logs */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-5)" }}>
            <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Live System Activity</Surface>
            <Link to="/admin/activity" style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-34)", textDecoration: 'none' }}>
              Full Audit Trail
            </Link>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-8)" }}>
            {logs.map((log) => (
              <Surface key={log.id} style={{ display: 'flex', gap: "var(--spacing-fsk-35)", alignItems: 'flex-start', paddingBottom: "var(--spacing-fsk-35)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                <Surface style={{ width: "var(--spacing-fsk-71)", height: "var(--spacing-fsk-71)", borderRadius: "var(--radius-fsk-42)", background: "var(--color-fsk-27)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--color-fsk-9)", flexShrink: 0 }}>
                  <Activity size={14} />
                </Surface>
                <Surface style={{ flex: 1 }}>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-7)" }}>{log.action}</Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
                    {log.actor} • IP: {log.ip} • {log.timestamp}
                  </Surface>
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Card>
      </Surface>
    </Surface>
  );
};

export default AdminDashboardPage;
