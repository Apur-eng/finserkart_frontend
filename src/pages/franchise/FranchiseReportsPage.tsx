import { Surface, Inline } from '../../components/Surface';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Business Performance &amp; Reports
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Regional territory metrics, monthly revenue trends, service domain distribution, and agent performance cohorts.
        </p>
      </Surface>

      {/* High-level KPIs */}
      <Surface
        style={{
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))",
          gap: "var(--spacing-fsk-2)",
          marginBottom: "var(--spacing-fsk-20)",
        }}
      >
        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Average Order Value</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-29)" }}>₹5,524</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", marginTop: "var(--spacing-fsk-29)", fontWeight: 600, display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
            <TrendingUp size={13} /> +12% vs state average
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Filing Completion Rate</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-70)", marginTop: "var(--spacing-fsk-29)" }}>96.4%</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-29)" }}>
            3.8 days median turnaround
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Active Agent Productivity</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-41)", marginTop: "var(--spacing-fsk-29)" }}>7.8 orders</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-29)" }}>
            Per active partner per month
          </Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600 }}>Gross Network GMV</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-65)", marginTop: "var(--spacing-fsk-29)" }}>
            ₹{franchise.grossRevenue.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-65)", marginTop: "var(--spacing-fsk-29)", fontWeight: 600 }}>
            ₹{franchise.franchiseCommissionEarned.toLocaleString('en-IN')} net override
          </Surface>
        </Card>
      </Surface>

      {/* Grid: Monthly Performance & Service Domain Mix */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22.5rem), 1fr))", gap: "var(--spacing-fsk-26)" }}>
        {/* Monthly Revenue Breakdown */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-5)" }}>
            <BarChart3 size={18} color="var(--color-fsk-70)" />
            <Inline style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Monthly Revenue Progression (2026)</Inline>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-23)" }}>
            {[
              { month: 'October 2026', orders: 22, gmv: 124500, override: 12450, pct: 100 },
              { month: 'September 2026', orders: 18, gmv: 98000, override: 9800, pct: 78 },
              { month: 'August 2026', orders: 14, gmv: 76000, override: 7600, pct: 61 },
              { month: 'July 2026', orders: 8, gmv: 44000, override: 4400, pct: 35 },
            ].map((m) => (
              <Surface key={m.month}>
                <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-17)", fontSize: "var(--font-fsk-14)" }}>
                  <Inline style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>{m.month}</Inline>
                  <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-8)" }}>
                    <Inline style={{ color: "var(--color-fsk-9)" }}>{m.orders} filings</Inline>
                    <strong style={{ color: "var(--color-fsk-70)" }}>₹{m.gmv.toLocaleString('en-IN')}</strong>
                  </Surface>
                </Surface>
                <Surface style={{ width: '100%', height: "var(--spacing-fsk-12)", background: "var(--color-fsk-46)", borderRadius: "var(--radius-fsk-48)", overflow: 'hidden' }}>
                  <Surface style={{ width: `${m.pct}%`, height: '100%', background: "var(--color-fsk-70)", borderRadius: "var(--radius-fsk-48)" }} />
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Card>

        {/* Service Category Contribution */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-5)" }}>
            <PieChart size={18} color="var(--color-fsk-65)" />
            <Inline style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Service Domain Distribution</Inline>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-23)" }}>
            {[
              { name: 'Corporate Incorporation & Company Law', pct: 45, volume: '₹1,54,125', color: "var(--color-fsk-70)" },
              { name: 'GST Registration, Filing & Advisory', pct: 30, volume: '₹1,02,750', color: "var(--color-fsk-65)" },
              { name: 'FSSAI Licensing & Food Compliance', pct: 15, volume: '₹51,375', color: "var(--color-fsk-54)" },
              { name: 'Trademark & Intellectual Property', pct: 10, volume: '₹34,250', color: "var(--color-fsk-41)" },
            ].map((cat) => (
              <Surface key={cat.name}>
                <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-17)", fontSize: "var(--font-fsk-14)" }}>
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-17)" }}>
                    <Surface style={{ width: "var(--spacing-fsk-35)", height: "var(--spacing-fsk-35)", borderRadius: "var(--radius-fsk-135)", background: cat.color }} />
                    <Inline style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>{cat.name}</Inline>
                  </Surface>
                  <strong style={{ color: "var(--color-fsk-7)" }}>{cat.pct}% ({cat.volume})</strong>
                </Surface>
                <Surface style={{ width: '100%', height: "var(--spacing-fsk-12)", background: "var(--color-fsk-46)", borderRadius: "var(--radius-fsk-48)", overflow: 'hidden' }}>
                  <Surface style={{ width: `${cat.pct}%`, height: '100%', background: cat.color, borderRadius: "var(--radius-fsk-48)" }} />
                </Surface>
              </Surface>
            ))}
          </Surface>
        </Card>
      </Surface>
    </Surface>
  );
};

export default FranchiseReportsPage;
