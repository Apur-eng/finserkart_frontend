import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import {
  ArrowRight,
  BarChart3,
  Coins,
  TrendingUp,
  UserCheck,
  Users,
  Wallet
} from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  INITIAL_FRANCHISE_AGENTS,
  INITIAL_FRANCHISE_APPLICATIONS,
  INITIAL_FRANCHISE_PROFILE
} from '../../features/franchise/franchiseData';

export const FranchiseDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const franchise = INITIAL_FRANCHISE_PROFILE;
  const agents = INITIAL_FRANCHISE_AGENTS;
  const applications = INITIAL_FRANCHISE_APPLICATIONS;

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
            <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-70)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Franchise Business Dashboard
            </Inline>
            <Inline style={{ color: "var(--color-fsk-59)" }}>•</Inline>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Franchise ID: {franchise.id}</Inline>
          </Surface>

          <Heading level={1}>
            <Inline style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
              {franchise.name}
            </Inline>
          </Heading>

          <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
            Director: <strong style={{ color: "var(--color-fsk-7)" }}>{franchise.directorName}</strong> • Territory: {franchise.territory}
          </p>
        </Surface>

        <Card
          elevation="low"
          padding={3}
          style={{
            background: "var(--color-fsk-brand)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-132)",
            borderRadius: "var(--radius-fsk-28)",
            textAlign: 'right',
          }}
        >
          <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-133)", textTransform: 'uppercase' }}>
            Franchise Override
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-83)", fontWeight: 800, color: "var(--color-fsk-134)" }}>
            10% Platform Override
          </Surface>
          <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-70)" }}>Across all territory agent orders</Inline>
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
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Active Agents</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-131)", color: "var(--color-fsk-70)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{franchise.totalAgents}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-70)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600, display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
            <TrendingUp size={13} /> Active in Central UP
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Network Clients</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-64)", color: "var(--color-fsk-65)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{franchise.totalCustomers}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-17)" }}>
            {franchise.totalApplications} total filing orders
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Territory Gross Volume</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-69)", color: "var(--color-fsk-54)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>
            ₹{franchise.grossRevenue.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600 }}>
            +18% month over month
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Franchise Earnings</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-53)", color: "var(--color-fsk-41)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>
            ₹{franchise.franchiseCommissionEarned.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-41)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600 }}>
            ₹{franchise.pendingPayout.toLocaleString('en-IN')} available
          </Surface>
        </Card>
      </Surface>

      {/* Quick Action Shortcuts */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-5)", marginBottom: "var(--spacing-fsk-20)" }}>
        <button
          type="button"
          onClick={() => navigate('/franchise/agents')}
          style={{
            padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-132)",
            background: "var(--color-fsk-38)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-23)" }}>
            <Surface style={{ width: "var(--spacing-fsk-67)", height: "var(--spacing-fsk-67)", borderRadius: "var(--radius-fsk-68)", background: "var(--color-fsk-131)", color: "var(--color-fsk-70)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Associated Agents</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Monitor agent production &amp; orders</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--color-fsk-70)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/franchise/customers')}
          style={{
            padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-81)",
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
              <UserCheck size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Network Customers</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Inspect client accounts across agents</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--color-fsk-65)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/franchise/reports')}
          style={{
            padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-97)",
            background: "var(--color-fsk-38)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-23)" }}>
            <Surface style={{ width: "var(--spacing-fsk-67)", height: "var(--spacing-fsk-67)", borderRadius: "var(--radius-fsk-68)", background: "var(--color-fsk-53)", color: "var(--color-fsk-41)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart3 size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Business Reports</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Monthly revenue analytics &amp; charts</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--color-fsk-41)" />
        </button>
      </Surface>

      {/* Grid: Top Agents & Recent Applications */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22.5rem), 1fr))", gap: "var(--spacing-fsk-26)", alignItems: 'flex-start' }}>
        {/* Top Agents */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-5)" }}>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Top Producing Agents</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Agents driving highest volume this month</Surface>
            </Surface>
            <Link to="/franchise/agents" style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-70)", textDecoration: 'none' }}>
              View all ({agents.length})
            </Link>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-8)" }}>
            {agents.slice(0, 4).map((ag) => (
              <Surface
                key={ag.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: "var(--spacing-fsk-8)",
                  borderRadius: "var(--radius-fsk-68)",
                  border: "var(--spacing-fsk-22) solid var(--color-fsk-46)",
                  background: "var(--color-fsk-27)",
                }}
              >
                <Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>{ag.name}</Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
                    {ag.id} • {ag.city}
                  </Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)", marginTop: "var(--spacing-fsk-47)" }}>
                    {ag.customersCount} clients • {ag.applicationsCount} filings
                  </Surface>
                </Surface>

                <Surface style={{ textAlign: 'right' }}>
                  <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 800, color: "var(--color-fsk-70)" }}>
                    ₹{ag.totalRevenue.toLocaleString('en-IN')}
                  </Surface>
                  <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Gross Volume</Inline>
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Card>

        {/* Recent Applications in Territory */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-5)" }}>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Recent Franchise Applications</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Latest services booked by network agents</Surface>
            </Surface>
            <Link to="/franchise/applications" style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-70)", textDecoration: 'none' }}>
              All applications
            </Link>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-8)" }}>
            {applications.map((app) => (
              <Surface
                key={app.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: "var(--spacing-fsk-8)",
                  borderRadius: "var(--radius-fsk-68)",
                  border: "var(--spacing-fsk-22) solid var(--color-fsk-46)",
                  background: "var(--color-fsk-27)",
                }}
              >
                <Surface>
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
                    <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)" }}>{app.serviceName}</Inline>
                    <Badge label={app.status} variant={app.status === 'Completed' ? 'green' : 'orange'} />
                  </Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
                    Agent: <strong style={{ color: "var(--color-fsk-7)" }}>{app.agentName}</strong> ({app.agentId})
                  </Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)" }}>
                    Client: {app.customerName} • {app.id}
                  </Surface>
                </Surface>

                <Surface style={{ textAlign: 'right' }}>
                  <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 800, color: "var(--color-fsk-65)" }}>
                    +₹{app.franchiseCut}
                  </Surface>
                  <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Override Cut</Inline>
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Card>
      </Surface>
    </Surface>
  );
};

export default FranchiseDashboardPage;
