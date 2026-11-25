import { Notice, ActionButton, Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "62.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Partner Payouts &amp; Settlements
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Manage your automated bank settlements, withdrawal requests, and historical UTR disbursement records.
        </p>
      </Surface>

      {isRequested && (
        <Surface style={{ marginBottom: "1.5rem" }}>
          <Notice
            status="success"
            title="Payout Request Submitted"
            description={`Your withdrawal request for ₹${agent.pendingCommission.toLocaleString('en-IN')} has been forwarded to the Lucknow finance desk. Payout will reflect in your ${agent.bank} account within 24 business hours.`}
          />
        </Surface>
      )}

      {/* Grid: Bank Info & Withdrawal Panel */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "1.5rem", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
        {/* Settlement Bank Panel */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.875rem" }}>
            <Surface style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "#eff6ff", color: "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>Settlement Bank Account</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", fontWeight: 600, display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                <CheckCircle2 size={12} /> Verified for NEFT/IMPS Direct Credit
              </Surface>
            </Surface>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem", fontSize: "0.8125rem" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Bank Name</Inline>
              <strong style={{ color: "var(--navy)" }}>{agent.bank}</strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Branch</Inline>
              <Inline style={{ color: "var(--navy)" }}>{agent.branch}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Account Number</Inline>
              <Inline style={{ color: "var(--navy)", fontFamily: 'monospace', fontWeight: 600 }}>{agent.ACNo}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "0.125rem" }}>
              <Inline style={{ color: "var(--muted)" }}>IFSC Code</Inline>
              <Inline style={{ color: "var(--teal)", fontFamily: 'monospace', fontWeight: 700 }}>{agent.IFSE}</Inline>
            </Surface>
          </Surface>
        </Panel>

        {/* Withdrawal Panel */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid #a7f3d0", background: "#f0fdf4" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.875rem" }}>
            <Surface style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "#ecfdf5", color: "var(--teal)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#065f46" }}>Available for Withdrawal</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "#047857" }}>Net eligible commissions</Surface>
            </Surface>
          </Surface>

          <Surface style={{ fontSize: "clamp(1.5rem, 2.4615384615384617vw, 2rem)", fontWeight: 800, color: "#065f46", marginBottom: "0.5rem" }}>
            ₹{agent.pendingCommission.toLocaleString('en-IN')}
          </Surface>

          <p style={{ fontSize: "0.8125rem", color: "#047857", marginBottom: "1rem", lineHeight: 1.5 }}>
            Payouts are processed daily between 11:00 AM and 04:00 PM directly to your registered bank account. Zero processing fee.
          </p>

          <ActionButton
            label={isRequested ? 'Payout Processing' : 'Request Instant Payout'}
            variant="primary"
            size="md"
            icon={<ArrowDownLeft size={16} />}
            onClick={handleRequestPayout}
            isDisabled={isRequested || agent.pendingCommission <= 0}
            width="100%"
          />
        </Panel>
      </Surface>

      {/* Historical Payouts Ledger */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ padding: "1rem 1.25rem", borderBottom: "0.0625rem solid var(--border)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Historical Payout Records</Surface>
          <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{payouts.length} transactions</Inline>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Payout ID</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Amount</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Request Date</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Disbursed Date</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Bank Reference / UTR</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem", fontWeight: 700, color: "var(--navy)", fontFamily: 'monospace' }}>
                    {p.id}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", fontWeight: 800, color: "var(--teal)", fontSize: "0.9375rem" }}>
                    ₹{p.amount.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "var(--muted)" }}>
                    {p.requestDate}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "#334155" }}>
                    {p.disbursedDate || 'Pending'}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "var(--muted)", fontFamily: 'monospace', fontSize: "0.8125rem" }}>
                    {p.bankRef}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
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
      </Panel>
    </Surface>
  );
};

export default AgentPayoutsPage;
