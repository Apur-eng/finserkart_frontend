import { ActionButton, Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  ArrowRight,
  Coins,
  Copy,
  PlusCircle,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  Wallet
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  INITIAL_AGENT_APPLICATIONS,
  INITIAL_AGENT_CUSTOMERS,
  INITIAL_AGENT_PROFILE
} from '../../features/agent/agentData';

export const AgentDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const agent = INITIAL_AGENT_PROFILE;
  const customers = INITIAL_AGENT_CUSTOMERS;
  const applications = INITIAL_AGENT_APPLICATIONS;

  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(agent.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header & Referral Code Panel */}
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
            <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--teal)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Agent Business Dashboard
            </Inline>
            <Inline style={{ color: "#cbd5e1" }}>•</Inline>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Agent ID: {agent.id}</Inline>
          </Surface>

          <Title level={1}>
            <Inline style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
              Welcome back, {agent.fname}!
            </Inline>
          </Title>

          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
            {agent.franchiseName} • Dedicated partner channel
          </p>
        </Surface>

        {/* Referral Panel Banner */}
        <Panel
          elevation="low"
          padding={4}
          style={{
            background: "var(--status-brand)",
            border: "0.0625rem solid #a7f3d0",
            borderRadius: "1rem",
            display: 'flex',
            alignItems: 'center',
            gap: "1rem",
          }}
        >
          <Surface>
            <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#047857", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your Partner Referral Code
            </Surface>
            <Surface style={{ fontSize: "1.125rem", fontWeight: 800, color: "#065f46", fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              {agent.referralCode}
            </Surface>
          </Surface>
          <ActionButton
            label={copied ? 'Copied!' : 'Copy Code'}
            variant="secondary"
            size="sm"
            icon={<Copy size={14} />}
            onClick={handleCopyCode}
          />
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
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Total Customers</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#ecfdf5", color: "var(--teal)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{agent.totalCustomers}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--teal)", marginTop: "0.375rem", fontWeight: 600, display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
            <TrendingUp size={13} /> +3 onboarded this month
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Applications Submitted</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#eff6ff", color: "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{agent.totalApplications}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.375rem" }}>
            Across 5 regulatory domains
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Commission Earned</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#fef3c7", color: "#d97706", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>
            ₹{agent.totalCommissionEarned.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", marginTop: "0.375rem", fontWeight: 600 }}>
            ₹{agent.totalPaidPayouts.toLocaleString('en-IN')} paid out
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.5rem" }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Pending Commission</Inline>
            <Surface style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "#f5f3ff", color: "#7c3aed", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>
            ₹{agent.pendingCommission.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#7c3aed", marginTop: "0.375rem", fontWeight: 600 }}>
            Available in next cycle
          </Surface>
        </Panel>
      </Surface>

      {/* Quick Action Shortcuts */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "1rem", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
        <button
          type="button"
          onClick={() => navigate('/agent/customers/onboard')}
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
              <UserPlus size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>Onboard New Customer</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Register client under your agent code</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--teal)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/agent/applications')}
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "1rem",
            border: "0.0625rem solid #bfdbfe",
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
              <PlusCircle size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>All Applications</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Track filing status &amp; CA progress</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--blue)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/agent/commissions')}
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "1rem",
            border: "0.0625rem solid #fde68a",
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
              <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>Commission Ledger</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Inspect rate splits &amp; payout history</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="#d97706" />
        </button>
      </Surface>

      {/* Grid: Recent Applications & Recent Commissions */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22.5rem), 1fr))", gap: "1.5rem", alignItems: 'flex-start' }}>
        {/* Recent Applications */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem" }}>
            <Surface>
              <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Recent Client Applications</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Latest services submitted under your agent code</Surface>
            </Surface>
            <Link to="/agent/applications" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--teal)", textDecoration: 'none' }}>
              View all
            </Link>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.75rem" }}>
            {applications.slice(0, 4).map((app) => (
              <Surface
                key={app.id}
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.625rem",
                  border: "0.0625rem solid var(--sage-light)",
                  background: "var(--cream)",
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Surface>
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <Inline style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)" }}>
                      {app.serviceName}
                    </Inline>
                    <Badge
                      label={app.status}
                      variant={app.status === 'Completed' ? 'green' : app.status === 'Processing' ? 'orange' : 'blue'}
                    />
                  </Surface>
                  <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
                    Client: <strong style={{ color: "var(--navy)" }}>{app.customerName}</strong> ({app.businessName})
                  </Surface>
                  <Surface style={{ fontSize: "0.8125rem", color: "#687d93", marginTop: "0.125rem" }}>
                    {app.id} • Assigned CA: {app.caName || 'Operations Desk'}
                  </Surface>
                </Surface>

                <Surface style={{ textAlign: 'right' }}>
                  <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--teal)" }}>
                    +₹{app.agentCommission}
                  </Surface>
                  <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Commission</Inline>
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Panel>

        {/* Client Directory Preview & Commission Ledger */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1.5rem" }}>
          {/* Customer Directory Preview */}
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem" }}>
              <Surface>
                <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Active Clients ({customers.length})</Surface>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Recently registered clients</Surface>
              </Surface>
              <Link to="/agent/customers" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--teal)", textDecoration: 'none' }}>
                Directory
              </Link>
            </Surface>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem" }}>
              {customers.slice(0, 3).map((cust) => (
                <Surface
                  key={cust.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: "0.625rem 0.75rem",
                    borderRadius: "0.5rem",
                    border: "0.0625rem solid var(--sage-light)",
                  }}
                >
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                    <Surface style={{ width: "2rem", height: "2rem", borderRadius: '50%', background: "#ecfdf5", color: "var(--teal)", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: "0.8125rem" }}>
                      {cust.name[0]}
                    </Surface>
                    <Surface>
                      <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)" }}>{cust.name}</Surface>
                      <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{cust.businessName} • {cust.city}</Surface>
                    </Surface>
                  </Surface>
                  <Surface style={{ textAlign: 'right' }}>
                    <Badge label={cust.kycStatus} variant={cust.kycStatus === 'Verified' ? 'green' : 'orange'} />
                  </Surface>
                </Surface>
              ))}
            </Surface>
          </Panel>

          {/* Quick Commission Split Box */}
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.625rem" }}>
              Standard Partner Commission Structure
            </Surface>
            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.5rem", fontSize: "0.8125rem", color: "var(--muted)" }}>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.375rem" }}>
                <Inline>Private Limited Company Registration</Inline>
                <strong style={{ color: "var(--teal)" }}>20% (₹1,800)</strong>
              </Surface>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.375rem" }}>
                <Inline>GST Registration &amp; Filing</Inline>
                <strong style={{ color: "var(--teal)" }}>20% (₹300)</strong>
              </Surface>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.375rem" }}>
                <Inline>Trademark Registration (Class 1–45)</Inline>
                <strong style={{ color: "var(--teal)" }}>24% (₹1,200)</strong>
              </Surface>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "0.125rem" }}>
                <Inline>FSSAI License Registration</Inline>
                <strong style={{ color: "var(--teal)" }}>20% (₹600)</strong>
              </Surface>
            </Surface>
          </Panel>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default AgentDashboardPage;
