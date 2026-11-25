import { ActionButton, Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  Eye,
  Printer,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import type { CustomerPaymentRecord } from '../../features/customer/customerData';
import { INITIAL_CUSTOMER_PROFILE, INITIAL_PAYMENTS } from '../../features/customer/customerData';

export const CustomerPaymentsPage: React.FC = () => {
  const profile = INITIAL_CUSTOMER_PROFILE;
  const payments = INITIAL_PAYMENTS;

  const totalPaid = payments.reduce((sum, p) => sum + p.totalPaid, 0);
  const [selectedInvoice, setSelectedInvoice] = useState<CustomerPaymentRecord | null>(null);

  return (
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Payments & Tax Invoices
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          View your payment history, transaction references, and download official GST-compliant tax invoices.
        </p>
      </Surface>

      {/* Payment Metrics */}
      <Surface
        style={{
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))",
          gap: "1.25rem",
          marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)",
        }}
      >
        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600, marginBottom: "0.375rem" }}>Total Amount Paid</Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>₹{totalPaid.toLocaleString('en-IN')}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", marginTop: "0.25rem", fontWeight: 600 }}>100% Cleared Transactions</Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600, marginBottom: "0.375rem" }}>Tax Invoices Issued</Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)" }}>{payments.length}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--blue)", marginTop: "0.25rem" }}>GST compliant receipts</Surface>
        </Panel>

        <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600, marginBottom: "0.375rem" }}>Registered GSTIN</Surface>
          <Surface style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy)", marginTop: "0.375rem" }}>{profile.gstin}</Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", marginTop: "0.25rem" }}>Input Tax Credit (ITC) Eligible</Surface>
        </Panel>
      </Surface>

      {/* Transactions Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ padding: "1.125rem 1.25rem", borderBottom: "0.0625rem solid var(--border)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>
            Transaction Ledger
          </Surface>
          <Badge label="All Paid" variant="green" />
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontWeight: 600, fontSize: "0.8125rem", textTransform: 'uppercase' }}>
                <th style={{ padding: "0.875rem 1rem" }}>Invoice No.</th>
                <th style={{ padding: "0.875rem 1rem" }}>Service Name</th>
                <th style={{ padding: "0.875rem 1rem" }}>Payment Method</th>
                <th style={{ padding: "0.875rem 1rem" }}>Transaction ID</th>
                <th style={{ padding: "0.875rem 1rem" }}>Date</th>
                <th style={{ padding: "0.875rem 1rem" }}>Total Amount</th>
                <th style={{ padding: "0.875rem 1rem" }}>Status</th>
                <th style={{ padding: "0.875rem 1rem", textAlign: 'right' }}>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "1rem", fontWeight: 700, color: "var(--blue)" }}>
                    {p.invoiceNumber}
                  </td>
                  <td style={{ padding: "1rem", fontWeight: 600, color: "var(--navy)" }}>
                    {p.serviceName}
                  </td>
                  <td style={{ padding: "1rem", color: "var(--muted)" }}>
                    {p.paymentMethod}
                  </td>
                  <td style={{ padding: "1rem", color: "var(--muted)", fontSize: "0.8125rem", fontFamily: 'monospace' }}>
                    {p.transactionId}
                  </td>
                  <td style={{ padding: "1rem", color: "var(--muted)" }}>
                    {p.paymentDate}
                  </td>
                  <td style={{ padding: "1rem", fontWeight: 800, color: "var(--navy)" }}>
                    ₹{p.totalPaid.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <Badge label="Paid" variant="green" />
                  </td>
                  <td style={{ padding: "1rem", textAlign: 'right' }}>
                    <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={() => setSelectedInvoice(p)}
                        style={{
                          padding: "0.375rem 0.75rem",
                          borderRadius: "0.375rem",
                          border: "0.0625rem solid #cbd5e1",
                          background: "var(--white)",
                          color: "var(--blue)",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: "0.375rem",
                        }}
                      >
                        <Eye size={14} /> View
                      </button>
                    </Surface>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      </Panel>

      {/* Invoice Modal Preview */}
      {selectedInvoice && (
        <Surface
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: "1.25rem",
          }}
        >
          <Surface
            style={{
              background: "var(--white)",
              borderRadius: "1rem",
              maxWidth: "42.5rem",
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: "var(--shadow-panel)",
              position: 'relative',
              padding: "clamp(1rem, 2.769230769230769vw, 2.25rem)",
            }}
          >
            {/* Close ActionButton */}
            <button
              type="button"
              onClick={() => setSelectedInvoice(null)}
              style={{
                position: 'absolute',
                top: "1.25rem",
                right: "1.25rem",
                background: "var(--sage-light)",
                border: 'none',
                borderRadius: '50%',
                width: "2rem",
                height: "2rem",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: "var(--muted)",
              }}
            >
              <X size={18} />
            </button>

            {/* Invoice Header */}
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.125rem solid var(--border)", paddingBottom: "1.25rem", marginBottom: "1.5rem" }}>
              <Surface>
                <Surface style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--blue)" }}>Finservkart Financial Services</Surface>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                  Jankipuram Garden, Jankipuram, Lucknow, UP 226021
                </Surface>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
                  GSTIN: 09AAECF1234F1Z1 • info@finservkart.com
                </Surface>
              </Surface>
              <Surface style={{ textAlign: 'right' }}>
                <Surface style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy)" }}>TAX INVOICE</Surface>
                <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--blue)", marginTop: "0.125rem" }}>
                  {selectedInvoice.invoiceNumber}
                </Surface>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Date: {selectedInvoice.paymentDate}</Surface>
              </Surface>
            </Surface>

            {/* Billed To */}
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1.25rem", marginBottom: "1.5rem", fontSize: "0.8125rem" }}>
              <Surface>
                <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', fontWeight: 700 }}>BILLED TO:</Inline>
                <Surface style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.875rem", marginTop: "0.125rem" }}>
                  {profile.fname} {profile.lname}
                </Surface>
                <Surface style={{ color: "var(--muted)" }}>{profile.businessName}</Surface>
                <Surface style={{ color: "var(--muted)" }}>GSTIN: {profile.gstin}</Surface>
                <Surface style={{ color: "var(--muted)" }}>{profile.address}, {profile.city}</Surface>
              </Surface>
              <Surface style={{ textAlign: 'right' }}>
                <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', fontWeight: 700 }}>PAYMENT DETAILS:</Inline>
                <Surface style={{ color: "#16a34a", fontWeight: 700, marginTop: "0.125rem" }}>STATUS: PAID IN FULL</Surface>
                <Surface style={{ color: "var(--muted)" }}>Method: {selectedInvoice.paymentMethod}</Surface>
                <Surface style={{ color: "var(--muted)", fontSize: "0.8125rem" }}>Txn ID: {selectedInvoice.transactionId}</Surface>
              </Surface>
            </Surface>

            {/* Line Items */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "1.5rem", fontSize: "0.8125rem" }}>
              <thead>
                <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid #cbd5e1" }}>
                  <th style={{ padding: "0.5rem 0.75rem", textAlign: 'left' }}>Item / Description</th>
                  <th style={{ padding: "0.5rem 0.75rem", textAlign: 'right' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.75rem" }}>
                    <Surface style={{ fontWeight: 600 }}>{selectedInvoice.serviceName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Professional chartered accountancy drafting &amp; filing fees</Surface>
                  </td>
                  <td style={{ padding: "0.75rem", textAlign: 'right' }}>
                    ₹{selectedInvoice.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
                {selectedInvoice.govtFees > 0 && (
                  <tr style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                    <td style={{ padding: "0.75rem" }}>Government Statutory Fees (Non-taxable disbursement)</td>
                    <td style={{ padding: "0.75rem", textAlign: 'right' }}>
                      ₹{selectedInvoice.govtFees.toLocaleString('en-IN')}
                    </td>
                  </tr>
                )}
                <tr style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.75rem" }}>Integrated GST (18%)</td>
                  <td style={{ padding: "0.75rem", textAlign: 'right' }}>
                    ₹{selectedInvoice.taxAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr style={{ fontWeight: 800, fontSize: "0.9375rem" }}>
                  <td style={{ padding: "0.75rem" }}>Total Amount Paid</td>
                  <td style={{ padding: "0.75rem", textAlign: 'right', color: "var(--blue)" }}>
                    ₹{selectedInvoice.totalPaid.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Actions */}
            <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "0.75rem", borderTop: "0.0625rem solid var(--border)", paddingTop: "1rem" }}>
              <ActionButton
                label="Print Receipt"
                variant="secondary"
                size="sm"
                icon={<Printer size={15} />}
                onClick={() => window.print()}
              />
              <ActionButton
                label="Close Preview"
                variant="primary"
                size="sm"
                onClick={() => setSelectedInvoice(null)}
              />
            </Surface>
          </Surface>
        </Surface>
      )}
    </Surface>
  );
};

export default CustomerPaymentsPage;
