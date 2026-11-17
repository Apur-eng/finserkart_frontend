import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import {
  BarChart3,
  PieChart,
  TrendingUp
} from 'lucide-react';
import React from 'react';
import { INITIAL_FRANCHISE_PROFILE } from '../../features/franchise/franchiseData';

export const FranchiseReportsPage: React.FC = () => {
  const franchise = INITIAL_FRANCHISE_PROFILE;

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Business Performance &amp; Reports
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Regional territory metrics, monthly revenue trends, service domain distribution, and agent performance cohorts.
        </p>
      </div>

      {/* High-level KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Average Order Value</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>₹5,524</div>
          <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} /> +12% vs state average
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Filing Completion Rate</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0284c7', marginTop: '4px' }}>96.4%</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            3.8 days median turnaround
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Active Agent Productivity</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#7c3aed', marginTop: '4px' }}>7.8 orders</div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            Per active partner per month
          </div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Gross Network GMV</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            ₹{franchise.grossRevenue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px', fontWeight: 600 }}>
            ₹{franchise.franchiseCommissionEarned.toLocaleString('en-IN')} net override
          </div>
        </Card>
      </div>

      {/* Grid: Monthly Performance & Service Domain Mix */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Monthly Revenue Breakdown */}
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BarChart3 size={18} color="#0284c7" />
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Monthly Revenue Progression (2026)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { month: 'October 2026', orders: 22, gmv: 124500, override: 12450, pct: 100 },
              { month: 'September 2026', orders: 18, gmv: 98000, override: 9800, pct: 78 },
              { month: 'August 2026', orders: 14, gmv: 76000, override: 7600, pct: 61 },
              { month: 'July 2026', orders: 8, gmv: 44000, override: 4400, pct: 35 },
            ].map((m) => (
              <div key={m.month}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '13px' }}>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{m.month}</span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ color: '#64748b' }}>{m.orders} filings</span>
                    <strong style={{ color: '#0284c7' }}>₹{m.gmv.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${m.pct}%`, height: '100%', background: '#0284c7', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Service Category Contribution */}
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <PieChart size={18} color="#059669" />
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Service Domain Distribution</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { name: 'Corporate Incorporation & Company Law', pct: 45, volume: '₹1,54,125', color: '#0284c7' },
              { name: 'GST Registration, Filing & Advisory', pct: 30, volume: '₹1,02,750', color: '#059669' },
              { name: 'FSSAI Licensing & Food Compliance', pct: 15, volume: '₹51,375', color: '#d97706' },
              { name: 'Trademark & Intellectual Property', pct: 10, volume: '₹34,250', color: '#7c3aed' },
            ].map((cat) => (
              <div key={cat.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: cat.color }} />
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{cat.name}</span>
                  </div>
                  <strong style={{ color: '#0f172a' }}>{cat.pct}% ({cat.volume})</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${cat.pct}%`, height: '100%', background: cat.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FranchiseReportsPage;
