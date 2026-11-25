import { Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
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
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Business Performance &amp; Reports
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Regional territory metrics, monthly revenue trends, service domain distribution, and agent performance cohorts.
        </p>
      </Surface>

      {/* High-level KPIs */}
      <Surface
        style={{
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))",
          gap: "1.25rem",
          marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)",
        }}
      >
        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Average Order Value</Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.25rem" }}>₹5,524</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", marginTop: "0.25rem", fontWeight: 600, display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
            <TrendingUp size={13} /> +12% vs state average
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Filing Completion Rate</Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "#0284c7", marginTop: "0.25rem" }}>96.4%</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.25rem" }}>
            3.8 days median turnaround
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Active Agent Productivity</Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "#7c3aed", marginTop: "0.25rem" }}>7.8 orders</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.25rem" }}>
            Per active partner per month
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>Gross Network GMV</Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--teal)", marginTop: "0.25rem" }}>
            ₹{franchise.grossRevenue.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--teal)", marginTop: "0.25rem", fontWeight: 600 }}>
            ₹{franchise.franchiseCommissionEarned.toLocaleString('en-IN')} net override
          </Surface>
        </Panel>
      </Surface>

      {/* Grid: Monthly Performance & Service Domain Mix */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22.5rem), 1fr))", gap: "1.5rem" }}>
        {/* Monthly Revenue Breakdown */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "1rem" }}>
            <BarChart3 size={18} color="#0284c7" />
            <Inline style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Monthly Revenue Progression (2026)</Inline>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.875rem" }}>
            {[
              { month: 'October 2026', orders: 22, gmv: 124500, override: 12450, pct: 100 },
              { month: 'September 2026', orders: 18, gmv: 98000, override: 9800, pct: 78 },
              { month: 'August 2026', orders: 14, gmv: 76000, override: 7600, pct: 61 },
              { month: 'July 2026', orders: 8, gmv: 44000, override: 4400, pct: 35 },
            ].map((m) => (
              <Surface key={m.month}>
                <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.375rem", fontSize: "0.8125rem" }}>
                  <Inline style={{ fontWeight: 600, color: "var(--navy)" }}>{m.month}</Inline>
                  <Surface style={{ display: 'flex', gap: "0.75rem" }}>
                    <Inline style={{ color: "var(--muted)" }}>{m.orders} filings</Inline>
                    <strong style={{ color: "#0284c7" }}>₹{m.gmv.toLocaleString('en-IN')}</strong>
                  </Surface>
                </Surface>
                <Surface style={{ width: '100%', height: "0.5rem", background: "var(--sage-light)", borderRadius: "0.25rem", overflow: 'hidden' }}>
                  <Surface style={{ width: `${m.pct}%`, height: '100%', background: "#0284c7", borderRadius: "0.25rem" }} />
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Panel>

        {/* Service Category Contribution */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "1rem" }}>
            <PieChart size={18} color="var(--teal)" />
            <Inline style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Service Domain Distribution</Inline>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.875rem" }}>
            {[
              { name: 'Corporate Incorporation & Company Law', pct: 45, volume: '₹1,54,125', color: "#0284c7" },
              { name: 'GST Registration, Filing & Advisory', pct: 30, volume: '₹1,02,750', color: "var(--teal)" },
              { name: 'FSSAI Licensing & Food Compliance', pct: 15, volume: '₹51,375', color: "#d97706" },
              { name: 'Trademark & Intellectual Property', pct: 10, volume: '₹34,250', color: "#7c3aed" },
            ].map((cat) => (
              <Surface key={cat.name}>
                <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.375rem", fontSize: "0.8125rem" }}>
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.375rem" }}>
                    <Surface style={{ width: "0.625rem", height: "0.625rem", borderRadius: "0.125rem", background: cat.color }} />
                    <Inline style={{ fontWeight: 600, color: "var(--navy)" }}>{cat.name}</Inline>
                  </Surface>
                  <strong style={{ color: "var(--navy)" }}>{cat.pct}% ({cat.volume})</strong>
                </Surface>
                <Surface style={{ width: '100%', height: "0.5rem", background: "var(--sage-light)", borderRadius: "0.25rem", overflow: 'hidden' }}>
                  <Surface style={{ width: `${cat.pct}%`, height: '100%', background: cat.color, borderRadius: "0.25rem" }} />
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Panel>
      </Surface>
    </Surface>
  );
};

export default FranchiseReportsPage;
