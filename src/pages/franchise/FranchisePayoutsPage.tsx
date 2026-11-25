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
  INITIAL_FRANCHISE_PAYOUTS,
  INITIAL_FRANCHISE_PROFILE
} from '../../features/franchise/franchiseData';

export const FranchisePayoutsPage: React.FC = () => {
  const franchise = INITIAL_FRANCHISE_PROFILE;
  const [payouts, setPayouts] = useState(INITIAL_FRANCHISE_PAYOUTS);
  const [isRequested, setIsRequested] = useState(false);

  const handleRequestPayout = () => {
    if (franchise.pendingPayout <= 0) return;

    const newPayout = {
      id: `FRAN-PAY-${Math.floor(100 + Math.random() * 900)}`,
      amount: franchise.pendingPayout,
      requestDate: 'Today, Just now',
      status: 'Processing' as const,
      bankRef: 'Initiated to Corporate Bank Gateway',
      accountNo: `...${franchise.ACNo.slice(-4)} (${franchise.bank})`,
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
            Franchise Payouts &amp; Corporate Banking
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Manage corporate RTGS/NEFT disbursements, review historical settlement vouchers, and request override transfers.
        </p>
      </Surface>

      {isRequested && (
        <Surface style={{ marginBottom: "1.5rem" }}>
          <Notice
            status="success"
            title="Franchise Settlement Request Dispatched"
            description={`Your withdrawal request for ₹${franchise.pendingPayout.toLocaleString('en-IN')} has been submitted to Finservkart Central Treasury. Expected credit in ${franchise.bank} within 24 business hours.`}
          />
        </Surface>
      )}

      {/* Grid: Bank Info & Withdrawal Panel */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "1.5rem", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
        {/* Settlement Bank Panel */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.875rem" }}>
            <Surface style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "#f0f9ff", color: "#0284c7", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>Franchise Corporate Bank</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", fontWeight: 600, display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                <CheckCircle2 size={12} /> Verified for Corporate RTGS Direct Credit
              </Surface>
            </Surface>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem", fontSize: "0.8125rem" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Bank Name</Inline>
              <strong style={{ color: "var(--navy)" }}>{franchise.bank}</strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Branch</Inline>
              <Inline style={{ color: "var(--navy)" }}>{franchise.branch}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Corporate A/C Number</Inline>
              <Inline style={{ color: "var(--navy)", fontFamily: 'monospace', fontWeight: 600 }}>{franchise.ACNo}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "0.125rem" }}>
              <Inline style={{ color: "var(--muted)" }}>IFSC Code</Inline>
              <Inline style={{ color: "#0284c7", fontFamily: 'monospace', fontWeight: 700 }}>{franchise.IFSE}</Inline>
            </Surface>
          </Surface>
        </Panel>

        {/* Withdrawal Panel */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid #bae6fd", background: "#f0f9ff" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.875rem" }}>
            <Surface style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "#e0f2fe", color: "#0284c7", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#0c4a6e" }}>Available Settlement Balance</Surface>
              <Surface style={{ fontSize: "0.8125rem", color: "#0369a1" }}>Net eligible franchise override</Surface>
            </Surface>
          </Surface>

          <Surface style={{ fontSize: "clamp(1.5rem, 2.4615384615384617vw, 2rem)", fontWeight: 800, color: "#0c4a6e", marginBottom: "0.5rem" }}>
            ₹{franchise.pendingPayout.toLocaleString('en-IN')}
          </Surface>

          <p style={{ fontSize: "0.8125rem", color: "#0369a1", marginBottom: "1rem", lineHeight: 1.5 }}>
            Automated corporate settlements are executed twice weekly directly into your registered ICICI corporate account.
          </p>

          <ActionButton
            label={isRequested ? 'Settlement Processing' : 'Request Corporate Settlement'}
            variant="primary"
            size="md"
            icon={<ArrowDownLeft size={16} />}
            onClick={handleRequestPayout}
            isDisabled={isRequested || franchise.pendingPayout <= 0}
            width="100%"
          />
        </Panel>
      </Surface>

      {/* Historical Payouts Ledger */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ padding: "1rem 1.25rem", borderBottom: "0.0625rem solid var(--border)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Franchise Settlement History</Surface>
          <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{payouts.length} transactions</Inline>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Disbursement ID</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Amount</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Request Date</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Disbursed Date</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Bank Reference (UTR)</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem", fontWeight: 700, color: "var(--navy)", fontFamily: 'monospace' }}>
                    {p.id}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", fontWeight: 800, color: "#0284c7", fontSize: "0.9375rem" }}>
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

export default FranchisePayoutsPage;
