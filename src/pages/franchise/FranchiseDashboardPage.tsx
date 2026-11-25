import { Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
            <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0284c7", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Franchise Business Dashboard
            </Inline>
            <Inline style={{ color: "#cbd5e1" }}>•</Inline>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Franchise ID: {franchise.id}</Inline>
          </Surface>

          <Title level={1}>
            <Inline style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
              {franchise.name}
            </Inline>
          </Title>

          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
            Director: <strong style={{ color: "var(--navy)" }}>{franchise.directorName}</strong> • Territory: {franchise.territory}
          </p>
        </Surface>

        <Panel
          elevation="low"
          padding={3}
          style={{
            background: "var(--status-brand)",
            border: "0.0625rem solid #bae6fd",
            borderRadius: "1rem",
            textAlign: 'right',
          }}
        >
          <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0369a1", textTransform: 'uppercase' }}>
            Franchise Override
          </Surface>
          <Surface style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0c4a6e" }}>
            10% Platform Override
          </Surface>
          <Inline style={{ fontSize: "0.8125rem", color: "#0284c7" }}>Across all territory agent orders</Inline>
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
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Active Agents</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#f0f9ff", color: "#0284c7", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{franchise.totalAgents}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#0284c7", marginTop: "0.375rem", fontWeight: 600, display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
            <TrendingUp size={13} /> Active in Central UP
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Network Clients</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#ecfdf5", color: "var(--teal)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{franchise.totalCustomers}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.375rem" }}>
            {franchise.totalApplications} total filing orders
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Territory Gross Volume</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#fef3c7", color: "#d97706", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>
            ₹{franchise.grossRevenue.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", marginTop: "0.375rem", fontWeight: 600 }}>
            +18% month over month
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Franchise Earnings</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#f5f3ff", color: "#7c3aed", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>
            ₹{franchise.franchiseCommissionEarned.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#7c3aed", marginTop: "0.375rem", fontWeight: 600 }}>
            ₹{franchise.pendingPayout.toLocaleString('en-IN')} available
          </Surface>
        </Panel>
      </Surface>

      {/* Quick Action Shortcuts */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1rem", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
        <button
          type="button"
          onClick={() => navigate('/franchise/agents')}
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "1rem",
            border: "0.0625rem solid #bae6fd",
            background: "var(--white)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.875rem" }}>
            <Surface style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.625rem", background: "#f0f9ff", color: "#0284c7", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>Associated Agents</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Monitor agent production &amp; orders</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="#0284c7" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/franchise/customers')}
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
              <UserCheck size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>Network Customers</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Inspect client accounts across agents</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--teal)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/franchise/reports')}
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
              <BarChart3 size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>Business Reports</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Monthly revenue analytics &amp; charts</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="#7c3aed" />
        </button>
      </Surface>

      {/* Grid: Top Agents & Recent Applications */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22.5rem), 1fr))", gap: "1.5rem", alignItems: 'flex-start' }}>
        {/* Top Agents */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem" }}>
            <Surface>
              <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Top Producing Agents</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Agents driving highest volume this month</Surface>
            </Surface>
            <Link to="/franchise/agents" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0284c7", textDecoration: 'none' }}>
              View all ({agents.length})
            </Link>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.75rem" }}>
            {agents.slice(0, 4).map((ag) => (
              <Surface
                key={ag.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: "0.75rem",
                  borderRadius: "0.625rem",
                  border: "0.0625rem solid var(--sage-light)",
                  background: "var(--cream)",
                }}
              >
                <Surface>
                  <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>{ag.name}</Surface>
                  <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
                    {ag.id} • {ag.city}
                  </Surface>
                  <Surface style={{ fontSize: "0.8125rem", color: "#687d93", marginTop: "0.125rem" }}>
                    {ag.customersCount} clients • {ag.applicationsCount} filings
                  </Surface>
                </Surface>

                <Surface style={{ textAlign: 'right' }}>
                  <Surface style={{ fontSize: "0.875rem", fontWeight: 800, color: "#0284c7" }}>
                    ₹{ag.totalRevenue.toLocaleString('en-IN')}
                  </Surface>
                  <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Gross Volume</Inline>
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Panel>

        {/* Recent Applications in Territory */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem" }}>
            <Surface>
              <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Recent Franchise Applications</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Latest services booked by network agents</Surface>
            </Surface>
            <Link to="/franchise/applications" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0284c7", textDecoration: 'none' }}>
              All applications
            </Link>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.75rem" }}>
            {applications.map((app) => (
              <Surface
                key={app.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: "0.75rem",
                  borderRadius: "0.625rem",
                  border: "0.0625rem solid var(--sage-light)",
                  background: "var(--cream)",
                }}
              >
                <Surface>
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                    <Inline style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)" }}>{app.serviceName}</Inline>
                    <Badge label={app.status} variant={app.status === 'Completed' ? 'green' : 'orange'} />
                  </Surface>
                  <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                    Agent: <strong style={{ color: "var(--navy)" }}>{app.agentName}</strong> ({app.agentId})
                  </Surface>
                  <Surface style={{ fontSize: "0.8125rem", color: "#687d93" }}>
                    Client: {app.customerName} • {app.id}
                  </Surface>
                </Surface>

                <Surface style={{ textAlign: 'right' }}>
                  <Surface style={{ fontSize: "0.875rem", fontWeight: 800, color: "var(--teal)" }}>
                    +₹{app.franchiseCut}
                  </Surface>
                  <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Override Cut</Inline>
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Panel>
      </Surface>
    </Surface>
  );
};

export default FranchiseDashboardPage;
