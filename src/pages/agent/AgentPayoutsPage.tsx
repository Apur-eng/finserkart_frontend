import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import {
  ArrowDownLeft,
  Building2,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import React, { useState } from 'react';
import {
  INITIAL_AGENT_PAYOUTS,
  INITIAL_AGENT_PROFILE
} from '../../features/agent/agentData';

export const AgentPayoutsPage: React.FC = () => {
  const agent = INITIAL_AGENT_PROFILE;
  const [payouts, setPayouts] = useState(INITIAL_AGENT_PAYOUTS);
  const [isRequested, setIsRequested] = useState(false);

  const handleRequestPayout = () => {
    if (agent.pendingCommission <= 0) return;

    const newPayout = {
      id: `PAY-2026-${Math.floor(100 + Math.random() * 900)}`,
      amount: agent.pendingCommission,
      requestDate: 'Today, Just now',
      status: 'Processing' as const,
      bankRef: 'Initiated to Bank Gateway',
      accountNo: `...${agent.ACNo.slice(-4)} (${agent.bank})`,
    };

    setPayouts((prev) => [newPayout, ...prev]);
    setIsRequested(true);
  };

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Partner Payouts &amp; Settlements
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Manage your automated bank settlements, withdrawal requests, and historical UTR disbursement records.
        </p>
      </Surface>

      {isRequested && (
        <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
          <Banner
            status="success"
            title="Payout Request Submitted"
            description={`Your withdrawal request for ₹${agent.pendingCommission.toLocaleString('en-IN')} has been forwarded to the Lucknow finance desk. Payout will reflect in your ${agent.bank} account within 24 business hours.`}
          />
        </Surface>
      )}

      {/* Grid: Bank Info & Withdrawal Card */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "var(--spacing-fsk-26)", marginBottom: "var(--spacing-fsk-20)" }}>
        {/* Settlement Bank Card */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-23)" }}>
            <Surface style={{ width: "var(--spacing-fsk-85)", height: "var(--spacing-fsk-85)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-63)", color: "var(--color-fsk-15)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Settlement Bank Account</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", fontWeight: 600, display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                <CheckCircle2 size={12} /> Verified for NEFT/IMPS Direct Credit
              </Surface>
            </Surface>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)", fontSize: "var(--font-fsk-14)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Bank Name</Inline>
              <strong style={{ color: "var(--color-fsk-7)" }}>{agent.bank}</strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Branch</Inline>
              <Inline style={{ color: "var(--color-fsk-7)" }}>{agent.branch}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Account Number</Inline>
              <Inline style={{ color: "var(--color-fsk-7)", fontFamily: 'monospace', fontWeight: 600 }}>{agent.ACNo}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "var(--spacing-fsk-47)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>IFSC Code</Inline>
              <Inline style={{ color: "var(--color-fsk-65)", fontFamily: 'monospace', fontWeight: 700 }}>{agent.IFSE}</Inline>
            </Surface>
          </Surface>
        </Card>

        {/* Withdrawal Card */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-81)", background: "var(--color-fsk-75)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-23)" }}>
            <Surface style={{ width: "var(--spacing-fsk-85)", height: "var(--spacing-fsk-85)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-64)", color: "var(--color-fsk-65)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-84)" }}>Available for Withdrawal</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-82)" }}>Net eligible commissions</Surface>
            </Surface>
          </Surface>

          <Surface style={{ fontSize: "var(--font-fsk-95)", fontWeight: 800, color: "var(--color-fsk-84)", marginBottom: "var(--spacing-fsk-12)" }}>
            ₹{agent.pendingCommission.toLocaleString('en-IN')}
          </Surface>

          <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-82)", marginBottom: "var(--spacing-fsk-5)", lineHeight: 1.5 }}>
            Payouts are processed daily between 11:00 AM and 04:00 PM directly to your registered bank account. Zero processing fee.
          </p>

          <Button
            label={isRequested ? 'Payout Processing' : 'Request Instant Payout'}
            variant="primary"
            size="md"
            icon={<ArrowDownLeft size={16} />}
            onClick={handleRequestPayout}
            isDisabled={isRequested || agent.pendingCommission <= 0}
            width="100%"
          />
        </Card>
      </Surface>

      {/* Historical Payouts Ledger */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Historical Payout Records</Surface>
          <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{payouts.length} transactions</Inline>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Payout ID</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Amount</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Request Date</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Disbursed Date</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Bank Reference / UTR</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", fontWeight: 700, color: "var(--color-fsk-7)", fontFamily: 'monospace' }}>
                    {p.id}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", fontWeight: 800, color: "var(--color-fsk-65)", fontSize: "var(--font-fsk-19)" }}>
                    ₹{p.amount.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-9)" }}>
                    {p.requestDate}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-25)" }}>
                    {p.disbursedDate || 'Pending'}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-18)", fontFamily: 'monospace', fontSize: "var(--font-fsk-14)" }}>
                    {p.bankRef}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>
                    <Badge
                      label={p.status}
                      variant={p.status === 'Processed' ? 'green' : 'orange'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      </Card>
    </Surface>
  );
};

export default AgentPayoutsPage;
