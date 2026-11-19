import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Banner } from '@astryxdesign/core/Banner';
import { Card } from '@astryxdesign/core/Card';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  AlertCircle,
  CheckCircle,
  Coins,
  Sliders
} from 'lucide-react';
import React, { useState } from 'react';
import {
  INITIAL_ADMIN_COMMISSION_RULES,
  INITIAL_ADMIN_PAYOUT_APPROVALS,
  type AdminCommissionRule,
  type AdminPayoutApprovalItem
} from '../../features/admin/adminData';

export const AdminCommissionManagementPage: React.FC = () => {
  const [rules] = useState<AdminCommissionRule[]>(INITIAL_ADMIN_COMMISSION_RULES);
  const [payouts, setPayouts] = useState<AdminPayoutApprovalItem[]>(INITIAL_ADMIN_PAYOUT_APPROVALS);
  const [searchTerm, setSearchTerm] = useState('');
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const handleApprove = (id: string, name: string, amount: number) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'Disbursed' } : p))
    );
    setSuccessBanner(`Payout request ${id} for ₹${amount.toLocaleString('en-IN')} to ${name} has been approved and queued for instant bank transfer.`);
  };

  const handleReject = (id: string, name: string) => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'Rejected' } : p))
    );
    setSuccessBanner(`Payout request ${id} for ${name} has been rejected. Notification sent.`);
  };

  const filteredPayouts = payouts.filter((p) =>
    p.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.beneficiaryRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPendingPayout = payouts
    .filter((p) => p.status === 'Pending Approval')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-33)", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-20)" }}>
      {/* Header */}
      <Surface>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", color: "var(--color-fsk-34)", fontSize: "var(--font-fsk-14)", fontWeight: 600 }}>
          <Coins size={16} /> Platform Revenue & Compensation Control
        </Surface>
        <h1 style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
          Commission Management & Payout Approvals
        </h1>
        <p style={{ fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
          Configure multi-tier partner revenue splits and authorise high-value withdrawal disbursements.
        </p>
      </Surface>

      {successBanner && (
        <Banner
          status="success"
          title="Action Completed"
          description={successBanner}
        />
      )}

      {/* Overview Cards */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
        <Card elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 500 }}>Pending Approval Value</Inline>
            <AlertCircle size={20} color="var(--color-fsk-55)" />
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-8)" }}>
            ₹{totalPendingPayout.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-54)", marginTop: "var(--spacing-fsk-29)" }}>
            {payouts.filter((p) => p.status === 'Pending Approval').length} partner requests awaiting clearance
          </Surface>
        </Card>

        <Card elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 500 }}>Active Commission Rules</Inline>
            <Sliders size={20} color="var(--color-fsk-56)" />
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-8)" }}>
            {rules.length} Categories
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-40)", marginTop: "var(--spacing-fsk-29)" }}>
            Platform average margin: 23.75%
          </Surface>
        </Card>

        <Card elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 500 }}>Disbursed This Month</Inline>
            <CheckCircle size={20} color="var(--color-fsk-39)" />
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-8)" }}>
            ₹2,48,200
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", marginTop: "var(--spacing-fsk-29)" }}>
            100% automated NEFT/IMPS pipeline
          </Surface>
        </Card>
      </Surface>

      {/* Section 1: Payout Approval Queue */}
      <Card elevation="low" padding={5}>
        <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-2)", flexWrap: 'wrap', gap: "var(--spacing-fsk-5)" }}>
          <Surface>
            <h2 style={{ fontSize: "var(--font-fsk-30)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
              Partner Payout Requests & Approvals
            </h2>
            <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
              Verify beneficiary banking credentials and release funds.
            </p>
          </Surface>
          <Surface style={{ width: "var(--spacing-fsk-45)" }}>
            <TextInput
              label="Search Payout Queue"
              placeholder="Filter by name, ID or role..."
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
            />
          </Surface>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontWeight: 600 }}>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Request ID</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Beneficiary</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Role</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Amount</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Bank Account & IFSC</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Requested</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Status</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)", textAlign: 'right' }}>Authorization</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayouts.map((payout) => (
                <tr key={payout.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                    {payout.id}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 600, color: "var(--color-fsk-7)" }}>
                    {payout.beneficiaryName}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>
                    <Badge
                      label={payout.beneficiaryRole}
                      variant={
                        payout.beneficiaryRole === 'CA'
                          ? 'purple'
                          : payout.beneficiaryRole === 'Franchise'
                          ? 'blue'
                          : 'yellow'
                      }
                    />
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 700, color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-24)" }}>
                    ₹{payout.amount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-9)" }}>
                    <Surface>{payout.bankAccount}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)" }}>{payout.ifsc}</Surface>
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-9)" }}>
                    {payout.requestedDate}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>
                    <Badge
                      label={payout.status}
                      variant={
                        payout.status === 'Disbursed'
                          ? 'green'
                          : payout.status === 'Rejected'
                          ? 'red'
                          : 'yellow'
                      }
                    />
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", textAlign: 'right' }}>
                    {payout.status === 'Pending Approval' ? (
                      <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)", justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => handleApprove(payout.id, payout.beneficiaryName, payout.amount)}
                          style={{
                            padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                            borderRadius: "var(--radius-fsk-42)",
                            background: "var(--color-fsk-39)",
                            color: "var(--color-fsk-38)",
                            fontWeight: 600,
                            fontSize: "var(--font-fsk-14)",
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(payout.id, payout.beneficiaryName)}
                          style={{
                            padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                            borderRadius: "var(--radius-fsk-42)",
                            background: "var(--color-fsk-43)",
                            color: "var(--color-fsk-34)",
                            fontWeight: 600,
                            fontSize: "var(--font-fsk-14)",
                            border: "var(--spacing-fsk-22) solid var(--color-fsk-58)",
                            cursor: 'pointer',
                          }}
                        >
                          Reject
                        </button>
                      </Surface>
                    ) : (
                      <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)", fontStyle: 'italic' }}>
                        Processed
                      </Inline>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      </Card>

      {/* Section 2: Commission Split Rules */}
      <Card elevation="low" padding={5}>
        <Surface style={{ marginBottom: "var(--spacing-fsk-2)" }}>
          <h2 style={{ fontSize: "var(--font-fsk-30)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
            Multi-Tier Platform Commission Rules
          </h2>
          <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
            Defined revenue allocation models applied automatically upon payment reconciliation.
          </p>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontWeight: 600 }}>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Rule ID</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Service Category</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Chartered Accountant Share</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Sourcing Agent Share</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Franchise Node Share</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Platform Retained Margin</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Effective Date</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                    {rule.id}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 600, color: "var(--color-fsk-7)" }}>
                    {rule.serviceCategory}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-41)", fontWeight: 600 }}>
                    {rule.caSharePercent}%
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-54)", fontWeight: 600 }}>
                    {rule.agentSharePercent}%
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-40)", fontWeight: 600 }}>
                    {rule.franchiseSharePercent}%
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-39)", fontWeight: 700 }}>
                    {rule.platformMarginPercent}%
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-9)" }}>
                    {rule.updatedAt}
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
