import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header & Referral Code Card */}
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
            <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-65)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Agent Business Dashboard
            </Inline>
            <Inline style={{ color: "var(--color-fsk-59)" }}>•</Inline>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Agent ID: {agent.id}</Inline>
          </Surface>

          <Heading level={1}>
            <Inline style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
              Welcome back, {agent.fname}!
            </Inline>
          </Heading>

          <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
            {agent.franchiseName} • Dedicated partner channel
          </p>
        </Surface>

        {/* Referral Card Banner */}
        <Card
          elevation="low"
          padding={4}
          style={{
            background: "var(--color-fsk-brand)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-81)",
            borderRadius: "var(--radius-fsk-28)",
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-5)",
          }}
        >
          <Surface>
            <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-82)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your Partner Referral Code
            </Surface>
            <Surface style={{ fontSize: "var(--font-fsk-30)", fontWeight: 800, color: "var(--color-fsk-84)", fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              {agent.referralCode}
            </Surface>
          </Surface>
          <Button
            label={copied ? 'Copied!' : 'Copy Code'}
            variant="secondary"
            size="sm"
            icon={<Copy size={14} />}
            onClick={handleCopyCode}
          />
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
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Total Customers</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-64)", color: "var(--color-fsk-65)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{agent.totalCustomers}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-65)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600, display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
            <TrendingUp size={13} /> +3 onboarded this month
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Applications Submitted</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-63)", color: "var(--color-fsk-15)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{agent.totalApplications}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-17)" }}>
            Across 5 regulatory domains
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Commission Earned</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-69)", color: "var(--color-fsk-54)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>
            ₹{agent.totalCommissionEarned.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600 }}>
            ₹{agent.totalPaidPayouts.toLocaleString('en-IN')} paid out
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-12)" }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Pending Commission</Inline>
            <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-53)", color: "var(--color-fsk-41)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={18} />
            </Surface>
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>
            ₹{agent.pendingCommission.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-41)", marginTop: "var(--spacing-fsk-17)", fontWeight: 600 }}>
            Available in next cycle
          </Surface>
        </Card>
      </Surface>

      {/* Quick Action Shortcuts */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))", gap: "var(--spacing-fsk-5)", marginBottom: "var(--spacing-fsk-20)" }}>
        <button
          type="button"
          onClick={() => navigate('/agent/customers/onboard')}
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
              <UserPlus size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Onboard New Customer</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Register client under your agent code</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--color-fsk-65)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/agent/applications')}
          style={{
            padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-87)",
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
              <PlusCircle size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>All Applications</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Track filing status &amp; CA progress</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--color-fsk-15)" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/agent/commissions')}
          style={{
            padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-88)",
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
              <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Commission Ledger</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Inspect rate splits &amp; payout history</Surface>
            </Surface>
          </Surface>
          <ArrowRight size={18} color="var(--color-fsk-54)" />
        </button>
      </Surface>

      {/* Grid: Recent Applications & Recent Commissions */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22.5rem), 1fr))", gap: "var(--spacing-fsk-26)", alignItems: 'flex-start' }}>
        {/* Recent Applications */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-5)" }}>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Recent Client Applications</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Latest services submitted under your agent code</Surface>
            </Surface>
            <Link to="/agent/applications" style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-65)", textDecoration: 'none' }}>
              View all
            </Link>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-8)" }}>
            {applications.slice(0, 4).map((app) => (
              <Surface
                key={app.id}
                style={{
                  padding: "var(--spacing-fsk-8)",
                  borderRadius: "var(--radius-fsk-68)",
                  border: "var(--spacing-fsk-22) solid var(--color-fsk-46)",
                  background: "var(--color-fsk-27)",
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Surface>
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-29)" }}>
                    <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                      {app.serviceName}
                    </Inline>
                    <Badge
                      label={app.status}
                      variant={app.status === 'Completed' ? 'green' : app.status === 'Processing' ? 'orange' : 'blue'}
                    />
                  </Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
                    Client: <strong style={{ color: "var(--color-fsk-7)" }}>{app.customerName}</strong> ({app.businessName})
                  </Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)", marginTop: "var(--spacing-fsk-47)" }}>
                    {app.id} • Assigned CA: {app.caName || 'Operations Desk'}
                  </Surface>
                </Surface>

                <Surface style={{ textAlign: 'right' }}>
                  <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-65)" }}>
                    +₹{app.agentCommission}
                  </Surface>
                  <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Commission</Inline>
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Card>

        {/* Client Directory Preview & Commission Ledger */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-26)" }}>
          {/* Customer Directory Preview */}
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-5)" }}>
              <Surface>
                <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Active Clients ({customers.length})</Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Recently registered clients</Surface>
              </Surface>
              <Link to="/agent/customers" style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-65)", textDecoration: 'none' }}>
                Directory
              </Link>
            </Surface>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)" }}>
              {customers.slice(0, 3).map((cust) => (
                <Surface
                  key={cust.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)",
                    borderRadius: "var(--radius-fsk-37)",
                    border: "var(--spacing-fsk-22) solid var(--color-fsk-46)",
                  }}
                >
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                    <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: '50%', background: "var(--color-fsk-64)", color: "var(--color-fsk-65)", display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: "var(--font-fsk-14)" }}>
                      {cust.name[0]}
                    </Surface>
                    <Surface>
                      <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)" }}>{cust.name}</Surface>
                      <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{cust.businessName} • {cust.city}</Surface>
                    </Surface>
                  </Surface>
                  <Surface style={{ textAlign: 'right' }}>
                    <Badge label={cust.kycStatus} variant={cust.kycStatus === 'Verified' ? 'green' : 'orange'} />
                  </Surface>
                </Surface>
              ))}
            </Surface>
          </Card>

          {/* Quick Commission Split Box */}
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-35)" }}>
              Standard Partner Commission Structure
            </Surface>
            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-12)", fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-18)" }}>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-17)" }}>
                <Inline>Private Limited Company Registration</Inline>
                <strong style={{ color: "var(--color-fsk-65)" }}>20% (₹1,800)</strong>
              </Surface>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-17)" }}>
                <Inline>GST Registration &amp; Filing</Inline>
                <strong style={{ color: "var(--color-fsk-65)" }}>20% (₹300)</strong>
              </Surface>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-17)" }}>
                <Inline>Trademark Registration (Class 1–45)</Inline>
                <strong style={{ color: "var(--color-fsk-65)" }}>24% (₹1,200)</strong>
              </Surface>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "var(--spacing-fsk-47)" }}>
                <Inline>FSSAI License Registration</Inline>
                <strong style={{ color: "var(--color-fsk-65)" }}>20% (₹600)</strong>
              </Surface>
            </Surface>
          </Card>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default AgentDashboardPage;
