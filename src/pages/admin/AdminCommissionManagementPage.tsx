import { Notice, Panel, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "85rem", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
      {/* Header */}
      <Surface>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", color: "#dc2626", fontSize: "0.8125rem", fontWeight: 600 }}>
          <Coins size={16} /> Platform Revenue & Compensation Control
        </Surface>
        <h1 style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", margin: "0.25rem 0 0 0" }}>
          Commission Management & Payout Approvals
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
          Configure multi-tier partner revenue splits and authorise high-value withdrawal disbursements.
        </p>
      </Surface>

      {successBanner && (
        <Notice
          status="success"
          title="Action Completed"
          description={successBanner}
        />
      )}

      {/* Overview Cards */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))", gap: "1rem" }}>
        <Panel elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>Pending Approval Value</Inline>
            <AlertCircle size={20} color="#eab308" />
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.75rem" }}>
            ₹{totalPendingPayout.toLocaleString('en-IN')}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#d97706", marginTop: "0.25rem" }}>
            {payouts.filter((p) => p.status === 'Pending Approval').length} partner requests awaiting clearance
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>Active Commission Rules</Inline>
            <Sliders size={20} color="#3b82f6" />
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.75rem" }}>
            {rules.length} Categories
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--blue)", marginTop: "0.25rem" }}>
            Platform average margin: 23.75%
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>Disbursed This Month</Inline>
            <CheckCircle size={20} color="#16a34a" />
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.75rem" }}>
            ₹2,48,200
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", marginTop: "0.25rem" }}>
            100% automated NEFT/IMPS pipeline
          </Surface>
        </Panel>
      </Surface>

      {/* Section 1: Payout Approval Queue */}
      <Panel elevation="low" padding={5}>
        <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1.25rem", flexWrap: 'wrap', gap: "1rem" }}>
          <Surface>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
              Partner Payout Requests & Approvals
            </h2>
            <p style={{ fontSize: "0.8125rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
              Verify beneficiary banking credentials and release funds.
            </p>
          </Surface>
          <Surface style={{ width: "17.5rem" }}>
            <Field
              label="Search Payout Queue"
              placeholder="Filter by name, ID or role..."
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
            />
          </Surface>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontWeight: 600 }}>
                <th style={{ padding: "0.75rem 1rem" }}>Request ID</th>
                <th style={{ padding: "0.75rem 1rem" }}>Beneficiary</th>
                <th style={{ padding: "0.75rem 1rem" }}>Role</th>
                <th style={{ padding: "0.75rem 1rem" }}>Amount</th>
                <th style={{ padding: "0.75rem 1rem" }}>Bank Account & IFSC</th>
                <th style={{ padding: "0.75rem 1rem" }}>Requested</th>
                <th style={{ padding: "0.75rem 1rem" }}>Status</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: 'right' }}>Authorization</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayouts.map((payout) => (
                <tr key={payout.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 700, color: "var(--navy)" }}>
                    {payout.id}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 600, color: "var(--navy)" }}>
                    {payout.beneficiaryName}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
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
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 700, color: "var(--navy)", fontSize: "0.875rem" }}>
                    ₹{payout.amount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "var(--muted)" }}>
                    <Surface>{payout.bankAccount}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#687d93" }}>{payout.ifsc}</Surface>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "var(--muted)" }}>
                    {payout.requestedDate}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
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
                  <td style={{ padding: "0.875rem 1rem", textAlign: 'right' }}>
                    {payout.status === 'Pending Approval' ? (
                      <Surface style={{ display: 'flex', gap: "0.5rem", justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => handleApprove(payout.id, payout.beneficiaryName, payout.amount)}
                          style={{
                            padding: "0.375rem 0.875rem",
                            borderRadius: "0.375rem",
                            background: "#16a34a",
                            color: "var(--white)",
                            fontWeight: 600,
                            fontSize: "0.8125rem",
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
                            padding: "0.375rem 0.875rem",
                            borderRadius: "0.375rem",
                            background: "#fee2e2",
                            color: "#dc2626",
                            fontWeight: 600,
                            fontSize: "0.8125rem",
                            border: "0.0625rem solid #fecaca",
                            cursor: 'pointer',
                          }}
                        >
                          Reject
                        </button>
                      </Surface>
                    ) : (
                      <Inline style={{ fontSize: "0.8125rem", color: "#687d93", fontStyle: 'italic' }}>
                        Processed
                      </Inline>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      </Panel>

      {/* Section 2: Commission Split Rules */}
      <Panel elevation="low" padding={5}>
        <Surface style={{ marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
            Multi-Tier Platform Commission Rules
          </h2>
          <p style={{ fontSize: "0.8125rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
            Defined revenue allocation models applied automatically upon payment reconciliation.
          </p>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontWeight: 600 }}>
                <th style={{ padding: "0.75rem 1rem" }}>Rule ID</th>
                <th style={{ padding: "0.75rem 1rem" }}>Service Category</th>
                <th style={{ padding: "0.75rem 1rem" }}>Chartered Accountant Share</th>
                <th style={{ padding: "0.75rem 1rem" }}>Sourcing Agent Share</th>
                <th style={{ padding: "0.75rem 1rem" }}>Franchise Node Share</th>
                <th style={{ padding: "0.75rem 1rem" }}>Platform Retained Margin</th>
                <th style={{ padding: "0.75rem 1rem" }}>Effective Date</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 700, color: "var(--navy)" }}>
                    {rule.id}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 600, color: "var(--navy)" }}>
                    {rule.serviceCategory}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#7c3aed", fontWeight: 600 }}>
                    {rule.caSharePercent}%
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#d97706", fontWeight: 600 }}>
                    {rule.agentSharePercent}%
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "var(--blue)", fontWeight: 600 }}>
                    {rule.franchiseSharePercent}%
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#16a34a", fontWeight: 700 }}>
                    {rule.platformMarginPercent}%
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "var(--muted)" }}>
                    {rule.updatedAt}
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
