import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import {
  ArrowLeft,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Receipt,
  UserCheck
} from 'lucide-react';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  INITIAL_APPLICATIONS,
  INITIAL_CUSTOMER_PROFILE,
  INITIAL_DOCUMENTS
} from '../../features/customer/customerData';

export const ApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const application =
    INITIAL_APPLICATIONS.find((a) => a.id === id) || INITIAL_APPLICATIONS[0];
  const profile = INITIAL_CUSTOMER_PROFILE;

  const associatedDocs = INITIAL_DOCUMENTS.filter(
    (d) => d.applicationId === application.id
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Back button & Title */}
      <div style={{ marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => navigate('/customer/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: '#0066cc',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0,
            marginBottom: '12px',
          }}
        >
          <ArrowLeft size={16} /> Back to Applications
        </button>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0066cc' }}>
                Application Dossier #{application.id}
              </span>
              <Badge
                label={application.status}
                variant={
                  application.status === 'Completed'
                    ? 'green'
                    : application.status === 'Processing'
                    ? 'orange'
                    : 'blue'
                }
              />
            </div>

            <Heading level={1}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </span>
            </Heading>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              label="Track Status Timeline"
              variant="primary"
              size="md"
              icon={<Clock size={16} />}
              onClick={() => navigate(`/customer/applications/${application.id}/tracker`)}
            />
            <Button
              label="Chat with CA"
              variant="secondary"
              size="md"
              icon={<MessageSquare size={16} />}
              onClick={() => navigate('/customer/conversations')}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Left Column: Dossier Details & Financials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Dossier Card */}
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
              Applicant &amp; Enterprise Details
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13.5px' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Applicant Name</span>
                <strong style={{ color: '#0f172a' }}>{profile.fname} {profile.lname}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Customer ID</span>
                <strong style={{ color: '#0066cc' }}>{profile.CustID}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Business Entity</span>
                <strong style={{ color: '#0f172a' }}>{profile.businessName}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>PAN / Identifier</span>
                <strong style={{ color: '#0f172a' }}>{profile.pan}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Submission Date</span>
                <strong style={{ color: '#0f172a' }}>{application.submissionDate}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Target Completion</span>
                <strong style={{ color: '#0f172a' }}>{application.estimatedCompletion}</strong>
              </div>
            </div>
          </Card>

          {/* Fee & Invoicing Card */}
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                Financial Statement &amp; Invoice
              </div>
              <Badge label="Paid in Full" variant="green" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Professional Service Fee</span>
                <span>₹{application.amount.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Statutory Government Department Fees</span>
                <span>₹{application.govtFees.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '16px', color: '#0f172a', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                <span>Total Amount Disbursed</span>
                <span style={{ color: '#0066cc' }}>₹{application.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '12.5px', color: '#64748b' }}>
                Invoice No: <strong>{application.invoiceId}</strong>
              </div>
              <Link to="/customer/payments" style={{ fontSize: '13px', fontWeight: 600, color: '#0066cc', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Receipt size={14} /> View Invoice
              </Link>
            </div>
          </Card>
        </div>

        {/* Right Column: Assigned CA & Associated Documents */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Assigned CA Dossier */}
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
              Assigned Chartered Accountant
            </div>

            {application.assignedCA ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#e0f2fe', color: '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserCheck size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
                      {application.assignedCA.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#16a34a' }}>
                      ID: {application.assignedCA.id} • {application.assignedCA.membershipNo}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>
                  Assigned by the Operations Coordinator desk. Directly responsible for document verification, statutory portal drafting, and filing dispatch.
                </div>

                <Button
                  label="Direct Message with CA"
                  variant="secondary"
                  size="sm"
                  width="100%"
                  icon={<MessageSquare size={15} />}
                  onClick={() => navigate('/customer/conversations')}
                />
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0', color: '#64748b', fontSize: '13px' }}>
                Chartered Accountant allocation is currently in progress. You will receive an operational alert once assigned.
              </div>
            )}
          </Card>

          {/* Associated Documents */}
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                Application Documents ({associatedDocs.length})
              </div>
              <Link to="/customer/documents/upload" style={{ fontSize: '12px', fontWeight: 600, color: '#0066cc', textDecoration: 'none' }}>
                Upload More
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {associatedDocs.map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <FileText size={16} color="#0066cc" style={{ flexShrink: 0 }} />
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {doc.fileName}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        {doc.fileSize} • {doc.status}
                      </div>
                    </div>
                  </div>
                  <Download size={16} color="#64748b" style={{ cursor: 'pointer', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsPage;
