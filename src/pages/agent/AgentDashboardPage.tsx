import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header & Referral Code Card */}
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
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Agent Business Dashboard
            </span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Agent ID: {agent.id}</span>
          </div>

          <Heading level={1}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Welcome back, {agent.fname}!
            </span>
          </Heading>

          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
            {agent.franchiseName} • Dedicated partner channel
          </p>
        </div>

        {/* Referral Card Banner */}
        <Card
          elevation="low"
          padding={4}
          style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            border: '1px solid #a7f3d0',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your Partner Referral Code
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#065f46', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              {agent.referralCode}
            </div>
          </div>
          <Button
            label={copied ? 'Copied!' : 'Copy Code'}
            variant="secondary"
            size="sm"
            icon={<Copy size={14} />}
            onClick={handleCopyCode}
          />
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
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total Customers</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{agent.totalCustomers}</div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} /> +3 onboarded this month
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Applications Submitted</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', color: '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{agent.totalApplications}</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
            Across 5 regulatory domains
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Commission Earned</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>
            ₹{agent.totalCommissionEarned.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '6px', fontWeight: 600 }}>
            ₹{agent.totalPaidPayouts.toLocaleString('en-IN')} paid out
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Pending Commission</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>
            ₹{agent.pendingCommission.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#7c3aed', marginTop: '6px', fontWeight: 600 }}>
            Available in next cycle
          </div>
        </Card>
      </div>

      {/* Quick Action Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <button
          type="button"
          onClick={() => navigate('/agent/customers/onboard')}
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
              <UserPlus size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Onboard New Customer</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Register client under your agent code</div>
            </div>
          </div>
          <ArrowRight size={18} color="#059669" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/agent/applications')}
          style={{
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #bfdbfe',
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
              <PlusCircle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>All Applications</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Track filing status &amp; CA progress</div>
            </div>
          </div>
          <ArrowRight size={18} color="#0066cc" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/agent/commissions')}
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
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Commission Ledger</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Inspect rate splits &amp; payout history</div>
            </div>
          </div>
          <ArrowRight size={18} color="#d97706" />
        </button>
      </div>

      {/* Grid: Recent Applications & Recent Commissions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', alignItems: 'flex-start' }}>
        {/* Recent Applications */}
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Recent Client Applications</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Latest services submitted under your agent code</div>
            </div>
            <Link to="/agent/applications" style={{ fontSize: '12.5px', fontWeight: 600, color: '#059669', textDecoration: 'none' }}>
              View all
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {applications.slice(0, 4).map((app) => (
              <div
                key={app.id}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #f1f5f9',
                  background: '#f8fafc',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>
                      {app.serviceName}
                    </span>
                    <Badge
                      label={app.status}
                      variant={app.status === 'Completed' ? 'green' : app.status === 'Processing' ? 'orange' : 'blue'}
                    />
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Client: <strong style={{ color: '#0f172a' }}>{app.customerName}</strong> ({app.businessName})
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                    {app.id} • Assigned CA: {app.caName || 'Operations Desk'}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#059669' }}>
                    +₹{app.agentCommission}
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Commission</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Client Directory Preview & Commission Ledger */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Customer Directory Preview */}
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Active Clients ({customers.length})</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Recently registered clients</div>
              </div>
              <Link to="/agent/customers" style={{ fontSize: '12.5px', fontWeight: 600, color: '#059669', textDecoration: 'none' }}>
                Directory
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {customers.slice(0, 3).map((cust) => (
                <div
                  key={cust.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>
                      {cust.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{cust.name}</div>
                      <div style={{ fontSize: '11.5px', color: '#64748b' }}>{cust.businessName} • {cust.city}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Badge label={cust.kycStatus} variant={cust.kycStatus === 'Verified' ? 'green' : 'orange'} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Commission Split Box */}
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
              Standard Partner Commission Structure
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#475569' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                <span>Private Limited Company Registration</span>
                <strong style={{ color: '#059669' }}>20% (₹1,800)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                <span>GST Registration &amp; Filing</span>
                <strong style={{ color: '#059669' }}>20% (₹300)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                <span>Trademark Registration (Class 1–45)</span>
                <strong style={{ color: '#059669' }}>24% (₹1,200)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2px' }}>
                <span>FSSAI License Registration</span>
                <strong style={{ color: '#059669' }}>20% (₹600)</strong>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboardPage;
