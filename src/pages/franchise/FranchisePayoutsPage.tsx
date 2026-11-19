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
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Franchise Payouts &amp; Corporate Banking
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Manage corporate RTGS/NEFT disbursements, review historical settlement vouchers, and request override transfers.
        </p>
      </Surface>

      {isRequested && (
        <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
          <Banner
            status="success"
            title="Franchise Settlement Request Dispatched"
            description={`Your withdrawal request for ₹${franchise.pendingPayout.toLocaleString('en-IN')} has been submitted to Finservkart Central Treasury. Expected credit in ${franchise.bank} within 24 business hours.`}
          />
        </Surface>
      )}

      {/* Grid: Bank Info & Withdrawal Card */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "var(--spacing-fsk-26)", marginBottom: "var(--spacing-fsk-20)" }}>
        {/* Settlement Bank Card */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-23)" }}>
            <Surface style={{ width: "var(--spacing-fsk-85)", height: "var(--spacing-fsk-85)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-131)", color: "var(--color-fsk-70)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Franchise Corporate Bank</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", fontWeight: 600, display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                <CheckCircle2 size={12} /> Verified for Corporate RTGS Direct Credit
              </Surface>
            </Surface>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)", fontSize: "var(--font-fsk-14)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Bank Name</Inline>
              <strong style={{ color: "var(--color-fsk-7)" }}>{franchise.bank}</strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Branch</Inline>
              <Inline style={{ color: "var(--color-fsk-7)" }}>{franchise.branch}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Corporate A/C Number</Inline>
              <Inline style={{ color: "var(--color-fsk-7)", fontFamily: 'monospace', fontWeight: 600 }}>{franchise.ACNo}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "var(--spacing-fsk-47)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>IFSC Code</Inline>
              <Inline style={{ color: "var(--color-fsk-70)", fontFamily: 'monospace', fontWeight: 700 }}>{franchise.IFSE}</Inline>
            </Surface>
          </Surface>
        </Card>

        {/* Withdrawal Card */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-132)", background: "var(--color-fsk-131)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-23)" }}>
            <Surface style={{ width: "var(--spacing-fsk-85)", height: "var(--spacing-fsk-85)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-112)", color: "var(--color-fsk-70)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={20} />
            </Surface>
            <Surface>
              <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-134)" }}>Available Settlement Balance</Surface>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-133)" }}>Net eligible franchise override</Surface>
            </Surface>
          </Surface>

          <Surface style={{ fontSize: "var(--font-fsk-95)", fontWeight: 800, color: "var(--color-fsk-134)", marginBottom: "var(--spacing-fsk-12)" }}>
            ₹{franchise.pendingPayout.toLocaleString('en-IN')}
          </Surface>

          <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-133)", marginBottom: "var(--spacing-fsk-5)", lineHeight: 1.5 }}>
            Automated corporate settlements are executed twice weekly directly into your registered ICICI corporate account.
          </p>

          <Button
            label={isRequested ? 'Settlement Processing' : 'Request Corporate Settlement'}
            variant="primary"
            size="md"
            icon={<ArrowDownLeft size={16} />}
            onClick={handleRequestPayout}
            isDisabled={isRequested || franchise.pendingPayout <= 0}
            width="100%"
          />
        </Card>
      </Surface>

      {/* Historical Payouts Ledger */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Franchise Settlement History</Surface>
          <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{payouts.length} transactions</Inline>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Disbursement ID</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Amount</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Request Date</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Disbursed Date</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Bank Reference (UTR)</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", fontWeight: 700, color: "var(--color-fsk-7)", fontFamily: 'monospace' }}>
                    {p.id}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", fontWeight: 800, color: "var(--color-fsk-70)", fontSize: "var(--font-fsk-19)" }}>
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

export default FranchisePayoutsPage;
