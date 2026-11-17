import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Payments & Tax Invoices
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          View your payment history, transaction references, and download official GST-compliant tax invoices.
        </p>
      </div>

      {/* Payment Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>Total Amount Paid</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>₹{totalPaid.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '4px', fontWeight: 600 }}>100% Cleared Transactions</div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>Tax Invoices Issued</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{payments.length}</div>
          <div style={{ fontSize: '12px', color: '#0066cc', marginTop: '4px' }}>GST compliant receipts</div>
        </Card>

        <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>Registered GSTIN</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>{profile.gstin}</div>
          <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '4px' }}>Input Tax Credit (ITC) Eligible</div>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
            Transaction Ledger
          </div>
          <Badge label="All Paid" variant="green" />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 16px' }}>Invoice No.</th>
                <th style={{ padding: '14px 16px' }}>Service Name</th>
                <th style={{ padding: '14px 16px' }}>Payment Method</th>
                <th style={{ padding: '14px 16px' }}>Transaction ID</th>
                <th style={{ padding: '14px 16px' }}>Date</th>
                <th style={{ padding: '14px 16px' }}>Total Amount</th>
                <th style={{ padding: '14px 16px' }}>Status</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: 700, color: '#0066cc' }}>
                    {p.invoiceNumber}
                  </td>
                  <td style={{ padding: '16px', fontWeight: 600, color: '#0f172a' }}>
                    {p.serviceName}
                  </td>
                  <td style={{ padding: '16px', color: '#475569' }}>
                    {p.paymentMethod}
                  </td>
                  <td style={{ padding: '16px', color: '#64748b', fontSize: '12px', fontFamily: 'monospace' }}>
                    {p.transactionId}
                  </td>
                  <td style={{ padding: '16px', color: '#475569' }}>
                    {p.paymentDate}
                  </td>
                  <td style={{ padding: '16px', fontWeight: 800, color: '#0f172a' }}>
                    ₹{p.totalPaid.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <Badge label="Paid" variant="green" />
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedInvoice(p)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          color: '#0066cc',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Eye size={14} /> View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Invoice Modal Preview */}
      {selectedInvoice && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              position: 'relative',
              padding: '36px',
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedInvoice(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#64748b',
              }}
            >
              <X size={18} />
            </button>

            {/* Invoice Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#0066cc' }}>Finservkart Financial Services</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  Jankipuram Garden, Jankipuram, Lucknow, UP 226021
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  GSTIN: 09AAECF1234F1Z1 • info@finservkart.com
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>TAX INVOICE</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0066cc', marginTop: '2px' }}>
                  {selectedInvoice.invoiceNumber}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Date: {selectedInvoice.paymentDate}</div>
              </div>
            </div>

            {/* Billed To */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', fontSize: '13px' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>BILLED TO:</span>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px', marginTop: '2px' }}>
                  {profile.fname} {profile.lname}
                </div>
                <div style={{ color: '#475569' }}>{profile.businessName}</div>
                <div style={{ color: '#475569' }}>GSTIN: {profile.gstin}</div>
                <div style={{ color: '#475569' }}>{profile.address}, {profile.city}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>PAYMENT DETAILS:</span>
                <div style={{ color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>STATUS: PAID IN FULL</div>
                <div style={{ color: '#475569' }}>Method: {selectedInvoice.paymentMethod}</div>
                <div style={{ color: '#64748b', fontSize: '11.5px' }}>Txn ID: {selectedInvoice.transactionId}</div>
              </div>
            </div>

            {/* Line Items */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Item / Description</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 600 }}>{selectedInvoice.serviceName}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Professional chartered accountancy drafting &amp; filing fees</div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    ₹{selectedInvoice.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
                {selectedInvoice.govtFees > 0 && (
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px' }}>Government Statutory Fees (Non-taxable disbursement)</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      ₹{selectedInvoice.govtFees.toLocaleString('en-IN')}
                    </td>
                  </tr>
                )}
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px' }}>Integrated GST (18%)</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    ₹{selectedInvoice.taxAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr style={{ fontWeight: 800, fontSize: '15px' }}>
                  <td style={{ padding: '12px' }}>Total Amount Paid</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#0066cc' }}>
                    ₹{selectedInvoice.totalPaid.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPaymentsPage;
