import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>
          <Coins size={16} /> Platform Revenue & Compensation Control
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
          Commission Management & Payout Approvals
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
          Configure multi-tier partner revenue splits and authorise high-value withdrawal disbursements.
        </p>
      </div>

      {successBanner && (
        <Banner
          status="success"
          title="Action Completed"
          description={successBanner}
        />
      )}

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <Card elevation="low" padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Pending Approval Value</span>
            <AlertCircle size={20} color="#eab308" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>
            ₹{totalPendingPayout.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: '#d97706', marginTop: '4px' }}>
            {payouts.filter((p) => p.status === 'Pending Approval').length} partner requests awaiting clearance
          </div>
        </Card>

        <Card elevation="low" padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Active Commission Rules</span>
            <Sliders size={20} color="#3b82f6" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>
            {rules.length} Categories
          </div>
          <div style={{ fontSize: '12px', color: '#2563eb', marginTop: '4px' }}>
            Platform average margin: 23.75%
          </div>
        </Card>

        <Card elevation="low" padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Disbursed This Month</span>
            <CheckCircle size={20} color="#16a34a" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>
            ₹2,48,200
          </div>
          <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '4px' }}>
            100% automated NEFT/IMPS pipeline
          </div>
        </Card>
      </div>

      {/* Section 1: Payout Approval Queue */}
      <Card elevation="low" padding={5}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Partner Payout Requests & Approvals
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
              Verify beneficiary banking credentials and release funds.
            </p>
          </div>
          <div style={{ width: '280px' }}>
            <TextInput
              label="Search Payout Queue"
              placeholder="Filter by name, ID or role..."
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Request ID</th>
                <th style={{ padding: '12px 16px' }}>Beneficiary</th>
                <th style={{ padding: '12px 16px' }}>Role</th>
                <th style={{ padding: '12px 16px' }}>Amount</th>
                <th style={{ padding: '12px 16px' }}>Bank Account & IFSC</th>
                <th style={{ padding: '12px 16px' }}>Requested</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Authorization</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayouts.map((payout) => (
                <tr key={payout.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                    {payout.id}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                    {payout.beneficiaryName}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
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
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>
                    ₹{payout.amount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    <div>{payout.bankAccount}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{payout.ifsc}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    {payout.requestedDate}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
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
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    {payout.status === 'Pending Approval' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => handleApprove(payout.id, payout.beneficiaryName, payout.amount)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '6px',
                            background: '#16a34a',
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: '12px',
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
                            padding: '6px 14px',
                            borderRadius: '6px',
                            background: '#fee2e2',
                            color: '#dc2626',
                            fontWeight: 600,
                            fontSize: '12px',
                            border: '1px solid #fecaca',
                            cursor: 'pointer',
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
                        Processed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Section 2: Commission Split Rules */}
      <Card elevation="low" padding={5}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Multi-Tier Platform Commission Rules
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
            Defined revenue allocation models applied automatically upon payment reconciliation.
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Rule ID</th>
                <th style={{ padding: '12px 16px' }}>Service Category</th>
                <th style={{ padding: '12px 16px' }}>Chartered Accountant Share</th>
                <th style={{ padding: '12px 16px' }}>Sourcing Agent Share</th>
                <th style={{ padding: '12px 16px' }}>Franchise Node Share</th>
                <th style={{ padding: '12px 16px' }}>Platform Retained Margin</th>
                <th style={{ padding: '12px 16px' }}>Effective Date</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                    {rule.id}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                    {rule.serviceCategory}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#7c3aed', fontWeight: 600 }}>
                    {rule.caSharePercent}%
                  </td>
                  <td style={{ padding: '14px 16px', color: '#d97706', fontWeight: 600 }}>
                    {rule.agentSharePercent}%
                  </td>
                  <td style={{ padding: '14px 16px', color: '#2563eb', fontWeight: 600 }}>
                    {rule.franchiseSharePercent}%
                  </td>
                  <td style={{ padding: '14px 16px', color: '#16a34a', fontWeight: 700 }}>
                    {rule.platformMarginPercent}%
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    {rule.updatedAt}
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
