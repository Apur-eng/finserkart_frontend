import { Badge } from '@astryxdesign/core/Badge';
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
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Franchise Business Dashboard
            </span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Franchise ID: {franchise.id}</span>
          </div>

          <Heading level={1}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              {franchise.name}
            </span>
          </Heading>

          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
            Director: <strong style={{ color: '#0f172a' }}>{franchise.directorName}</strong> • Territory: {franchise.territory}
          </p>
        </div>

        <Card
          elevation="low"
          padding={3}
          style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            border: '1px solid #bae6fd',
            borderRadius: '12px',
            textAlign: 'right',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase' }}>
            Franchise Override
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#0c4a6e' }}>
            10% Platform Override
          </div>
          <span style={{ fontSize: '11.5px', color: '#0284c7' }}>Across all territory agent orders</span>
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
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Active Agents</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{franchise.totalAgents}</div>
          <div style={{ fontSize: '12px', color: '#0284c7', marginTop: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} /> Active in Central UP
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Network Clients</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{franchise.totalCustomers}</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
            {franchise.totalApplications} total filing orders
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Territory Gross Volume</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>
            ₹{franchise.grossRevenue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '6px', fontWeight: 600 }}>
            +18% month over month
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Franchise Earnings</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>
            ₹{franchise.franchiseCommissionEarned.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#7c3aed', marginTop: '6px', fontWeight: 600 }}>
            ₹{franchise.pendingPayout.toLocaleString('en-IN')} available
          </div>
        </Card>
      </div>

      {/* Quick Action Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <button
          type="button"
          onClick={() => navigate('/franchise/agents')}
          style={{
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #bae6fd',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Associated Agents</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Monitor agent production &amp; orders</div>
            </div>
          </div>
          <ArrowRight size={18} color="#0284c7" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/franchise/customers')}
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
              <UserCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Network Customers</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Inspect client accounts across agents</div>
            </div>
          </div>
          <ArrowRight size={18} color="#059669" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/franchise/reports')}
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
              <BarChart3 size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Business Reports</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Monthly revenue analytics &amp; charts</div>
            </div>
          </div>
          <ArrowRight size={18} color="#7c3aed" />
        </button>
      </div>

      {/* Grid: Top Agents & Recent Applications */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', alignItems: 'flex-start' }}>
        {/* Top Agents */}
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Top Producing Agents</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Agents driving highest volume this month</div>
            </div>
            <Link to="/franchise/agents" style={{ fontSize: '12.5px', fontWeight: 600, color: '#0284c7', textDecoration: 'none' }}>
              View all ({agents.length})
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {agents.slice(0, 4).map((ag) => (
              <div
                key={ag.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #f1f5f9',
                  background: '#f8fafc',
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{ag.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {ag.id} • {ag.city}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                    {ag.customersCount} clients • {ag.applicationsCount} filings
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0284c7' }}>
                    ₹{ag.totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Gross Volume</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Applications in Territory */}
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Recent Franchise Applications</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Latest services booked by network agents</div>
            </div>
            <Link to="/franchise/applications" style={{ fontSize: '12.5px', fontWeight: 600, color: '#0284c7', textDecoration: 'none' }}>
              All applications
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
                  border: '1px solid #f1f5f9',
                  background: '#f8fafc',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>{app.serviceName}</span>
                    <Badge label={app.status} variant={app.status === 'Completed' ? 'green' : 'orange'} />
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Agent: <strong style={{ color: '#0f172a' }}>{app.agentName}</strong> ({app.agentId})
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Client: {app.customerName} • {app.id}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#059669' }}>
                    +₹{app.franchiseCut}
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Override Cut</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FranchiseDashboardPage;
