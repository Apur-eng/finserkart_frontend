import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Payments & Tax Invoices
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          View your payment history, transaction references, and download official GST-compliant tax invoices.
        </p>
      </Surface>

      {/* Payment Metrics */}
      <Surface
        style={{
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))",
          gap: "var(--spacing-fsk-2)",
          marginBottom: "var(--spacing-fsk-20)",
        }}
      >
        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600, marginBottom: "var(--spacing-fsk-17)" }}>Total Amount Paid</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>₹{totalPaid.toLocaleString('en-IN')}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", marginTop: "var(--spacing-fsk-29)", fontWeight: 600 }}>100% Cleared Transactions</Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600, marginBottom: "var(--spacing-fsk-17)" }}>Tax Invoices Issued</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)" }}>{payments.length}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-15)", marginTop: "var(--spacing-fsk-29)" }}>GST compliant receipts</Surface>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600, marginBottom: "var(--spacing-fsk-17)" }}>Registered GSTIN</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-30)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-17)" }}>{profile.gstin}</Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", marginTop: "var(--spacing-fsk-29)" }}>Input Tax Credit (ITC) Eligible</Surface>
        </Card>
      </Surface>

      {/* Transactions Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ padding: "var(--spacing-fsk-36) var(--spacing-fsk-2)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
            Transaction Ledger
          </Surface>
          <Badge label="All Paid" variant="green" />
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontWeight: 600, fontSize: "var(--font-fsk-14)", textTransform: 'uppercase' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Invoice No.</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Service Name</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Payment Method</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Transaction ID</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Date</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Total Amount</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Status</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", textAlign: 'right' }}>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-5)", fontWeight: 700, color: "var(--color-fsk-15)" }}>
                    {p.invoiceNumber}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)", fontWeight: 600, color: "var(--color-fsk-7)" }}>
                    {p.serviceName}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)", color: "var(--color-fsk-18)" }}>
                    {p.paymentMethod}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", fontFamily: 'monospace' }}>
                    {p.transactionId}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)", color: "var(--color-fsk-18)" }}>
                    {p.paymentDate}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)", fontWeight: 800, color: "var(--color-fsk-7)" }}>
                    ₹{p.totalPaid.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)" }}>
                    <Badge label="Paid" variant="green" />
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)", textAlign: 'right' }}>
                    <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "var(--spacing-fsk-12)" }}>
                      <button
                        type="button"
                        onClick={() => setSelectedInvoice(p)}
                        style={{
                          padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                          borderRadius: "var(--radius-fsk-42)",
                          border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                          background: "var(--color-fsk-38)",
                          color: "var(--color-fsk-15)",
                          fontSize: "var(--font-fsk-14)",
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: "var(--spacing-fsk-17)",
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
      </Card>

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
            padding: "var(--spacing-fsk-2)",
          }}
        >
          <Surface
            style={{
              background: "var(--color-fsk-38)",
              borderRadius: "var(--radius-fsk-28)",
              maxWidth: "var(--spacing-fsk-121)",
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: "var(--shadow-fsk-card)",
              position: 'relative',
              padding: "var(--spacing-fsk-122)",
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedInvoice(null)}
              style={{
                position: 'absolute',
                top: "var(--spacing-fsk-2)",
                right: "var(--spacing-fsk-2)",
                background: "var(--color-fsk-46)",
                border: 'none',
                borderRadius: '50%',
                width: "var(--spacing-fsk-62)",
                height: "var(--spacing-fsk-62)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: "var(--color-fsk-9)",
              }}
            >
              <X size={18} />
            </button>

            {/* Invoice Header */}
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-47) solid var(--color-fsk-21)", paddingBottom: "var(--spacing-fsk-2)", marginBottom: "var(--spacing-fsk-26)" }}>
              <Surface>
                <Surface style={{ fontSize: "var(--font-fsk-83)", fontWeight: 800, color: "var(--color-fsk-15)" }}>Finservkart Financial Services</Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
                  Jankipuram Garden, Jankipuram, Lucknow, UP 226021
                </Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
                  GSTIN: 09AAECF1234F1Z1 • info@finservkart.com
                </Surface>
              </Surface>
              <Surface style={{ textAlign: 'right' }}>
                <Surface style={{ fontSize: "var(--font-fsk-30)", fontWeight: 800, color: "var(--color-fsk-7)" }}>TAX INVOICE</Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-15)", marginTop: "var(--spacing-fsk-47)" }}>
                  {selectedInvoice.invoiceNumber}
                </Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Date: {selectedInvoice.paymentDate}</Surface>
              </Surface>
            </Surface>

            {/* Billed To */}
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-2)", marginBottom: "var(--spacing-fsk-26)", fontSize: "var(--font-fsk-14)" }}>
              <Surface>
                <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', fontWeight: 700 }}>BILLED TO:</Inline>
                <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-47)" }}>
                  {profile.fname} {profile.lname}
                </Surface>
                <Surface style={{ color: "var(--color-fsk-18)" }}>{profile.businessName}</Surface>
                <Surface style={{ color: "var(--color-fsk-18)" }}>GSTIN: {profile.gstin}</Surface>
                <Surface style={{ color: "var(--color-fsk-18)" }}>{profile.address}, {profile.city}</Surface>
              </Surface>
              <Surface style={{ textAlign: 'right' }}>
                <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', fontWeight: 700 }}>PAYMENT DETAILS:</Inline>
                <Surface style={{ color: "var(--color-fsk-39)", fontWeight: 700, marginTop: "var(--spacing-fsk-47)" }}>STATUS: PAID IN FULL</Surface>
                <Surface style={{ color: "var(--color-fsk-18)" }}>Method: {selectedInvoice.paymentMethod}</Surface>
                <Surface style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)" }}>Txn ID: {selectedInvoice.transactionId}</Surface>
              </Surface>
            </Surface>

            {/* Line Items */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "var(--spacing-fsk-26)", fontSize: "var(--font-fsk-14)" }}>
              <thead>
                <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-59)" }}>
                  <th style={{ padding: "var(--spacing-fsk-12) var(--spacing-fsk-8)", textAlign: 'left' }}>Item / Description</th>
                  <th style={{ padding: "var(--spacing-fsk-12) var(--spacing-fsk-8)", textAlign: 'right' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-8)" }}>
                    <Surface style={{ fontWeight: 600 }}>{selectedInvoice.serviceName}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Professional chartered accountancy drafting &amp; filing fees</Surface>
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-8)", textAlign: 'right' }}>
                    ₹{selectedInvoice.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
                {selectedInvoice.govtFees > 0 && (
                  <tr style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                    <td style={{ padding: "var(--spacing-fsk-8)" }}>Government Statutory Fees (Non-taxable disbursement)</td>
                    <td style={{ padding: "var(--spacing-fsk-8)", textAlign: 'right' }}>
                      ₹{selectedInvoice.govtFees.toLocaleString('en-IN')}
                    </td>
                  </tr>
                )}
                <tr style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-8)" }}>Integrated GST (18%)</td>
                  <td style={{ padding: "var(--spacing-fsk-8)", textAlign: 'right' }}>
                    ₹{selectedInvoice.taxAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr style={{ fontWeight: 800, fontSize: "var(--font-fsk-19)" }}>
                  <td style={{ padding: "var(--spacing-fsk-8)" }}>Total Amount Paid</td>
                  <td style={{ padding: "var(--spacing-fsk-8)", textAlign: 'right', color: "var(--color-fsk-15)" }}>
                    ₹{selectedInvoice.totalPaid.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Actions */}
            <Surface style={{ display: 'flex', justifyContent: 'flex-end', gap: "var(--spacing-fsk-8)", borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-21)", paddingTop: "var(--spacing-fsk-5)" }}>
              <Button
                label="Print Receipt"
                variant="secondary"
                size="sm"
                icon={<Printer size={15} />}
                onClick={() => window.print()}
              />
              <Button
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
