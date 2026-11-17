import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Partner Payouts &amp; Settlements
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Manage your automated bank settlements, withdrawal requests, and historical UTR disbursement records.
        </p>
      </div>

      {isRequested && (
        <div style={{ marginBottom: '24px' }}>
          <Banner
            status="success"
            title="Payout Request Submitted"
            description={`Your withdrawal request for ₹${agent.pendingCommission.toLocaleString('en-IN')} has been forwarded to the Lucknow finance desk. Payout will reflect in your ${agent.bank} account within 24 business hours.`}
          />
        </div>
      )}

      {/* Grid: Bank Info & Withdrawal Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        {/* Settlement Bank Card */}
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', color: '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Settlement Bank Account</div>
              <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={12} /> Verified for NEFT/IMPS Direct Credit
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Bank Name</span>
              <strong style={{ color: '#0f172a' }}>{agent.bank}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Branch</span>
              <span style={{ color: '#0f172a' }}>{agent.branch}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Account Number</span>
              <span style={{ color: '#0f172a', fontFamily: 'monospace', fontWeight: 600 }}>{agent.ACNo}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2px' }}>
              <span style={{ color: '#64748b' }}>IFSC Code</span>
              <span style={{ color: '#059669', fontFamily: 'monospace', fontWeight: 700 }}>{agent.IFSE}</span>
            </div>
          </div>
        </Card>

        {/* Withdrawal Card */}
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #a7f3d0', background: '#f0fdf4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#065f46' }}>Available for Withdrawal</div>
              <div style={{ fontSize: '11px', color: '#047857' }}>Net eligible commissions</div>
            </div>
          </div>

          <div style={{ fontSize: '32px', fontWeight: 800, color: '#065f46', marginBottom: '8px' }}>
            ₹{agent.pendingCommission.toLocaleString('en-IN')}
          </div>

          <p style={{ fontSize: '12px', color: '#047857', marginBottom: '16px', lineHeight: 1.5 }}>
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
      </div>

      {/* Historical Payouts Ledger */}
      <Card elevation="low" padding={0} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Historical Payout Records</div>
          <span style={{ fontSize: '12px', color: '#64748b' }}>{payouts.length} transactions</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Payout ID</th>
                <th style={{ padding: '14px 18px' }}>Amount</th>
                <th style={{ padding: '14px 18px' }}>Request Date</th>
                <th style={{ padding: '14px 18px' }}>Disbursed Date</th>
                <th style={{ padding: '14px 18px' }}>Bank Reference / UTR</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                    {p.id}
                  </td>

                  <td style={{ padding: '14px 18px', fontWeight: 800, color: '#059669', fontSize: '15px' }}>
                    ₹{p.amount.toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: '14px 18px', color: '#64748b' }}>
                    {p.requestDate}
                  </td>

                  <td style={{ padding: '14px 18px', color: '#334155' }}>
                    {p.disbursedDate || 'Pending'}
                  </td>

                  <td style={{ padding: '14px 18px', color: '#475569', fontFamily: 'monospace', fontSize: '12.5px' }}>
                    {p.bankRef}
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <Badge
                      label={p.status}
                      variant={p.status === 'Processed' ? 'green' : 'orange'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AgentPayoutsPage;
