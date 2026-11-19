import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: '0 auto' }}>
      {/* Back button & Title */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <button
          type="button"
          onClick={() => navigate('/customer/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: "var(--color-fsk-15)",
            fontSize: "var(--font-fsk-14)",
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-17)",
            padding: 0,
            marginBottom: "var(--spacing-fsk-8)",
          }}
        >
          <ArrowLeft size={16} /> Back to Applications
        </button>

        <Surface style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: "var(--spacing-fsk-5)" }}>
          <Surface>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-17)" }}>
              <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-15)" }}>
                Application Dossier #{application.id}
              </Inline>
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
            </Surface>

            <Heading level={1}>
              <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </Inline>
            </Heading>
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-8)" }}>
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
          </Surface>
        </Surface>
      </Surface>

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "var(--spacing-fsk-26)" }}>
        {/* Left Column: Dossier Details & Financials */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-26)" }}>
          {/* Dossier Card */}
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-5)" }}>
              Applicant &amp; Enterprise Details
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-5)", fontSize: "var(--font-fsk-14)" }}>
              <Surface>
                <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block' }}>Applicant Name</Inline>
                <strong style={{ color: "var(--color-fsk-7)" }}>{profile.fname} {profile.lname}</strong>
              </Surface>
              <Surface>
                <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block' }}>Customer ID</Inline>
                <strong style={{ color: "var(--color-fsk-15)" }}>{profile.CustID}</strong>
              </Surface>
              <Surface>
                <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block' }}>Business Entity</Inline>
                <strong style={{ color: "var(--color-fsk-7)" }}>{profile.businessName}</strong>
              </Surface>
              <Surface>
                <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block' }}>PAN / Identifier</Inline>
                <strong style={{ color: "var(--color-fsk-7)" }}>{profile.pan}</strong>
              </Surface>
              <Surface>
                <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block' }}>Submission Date</Inline>
                <strong style={{ color: "var(--color-fsk-7)" }}>{application.submissionDate}</strong>
              </Surface>
              <Surface>
                <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", display: 'block' }}>Target Completion</Inline>
                <strong style={{ color: "var(--color-fsk-7)" }}>{application.estimatedCompletion}</strong>
              </Surface>
            </Surface>
          </Card>

          {/* Fee & Invoicing Card */}
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-5)" }}>
              <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                Financial Statement &amp; Invoice
              </Surface>
              <Badge label="Paid in Full" variant="green" />
            </Surface>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)", fontSize: "var(--font-fsk-14)" }}>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', color: "var(--color-fsk-9)" }}>
                <Inline>Professional Service Fee</Inline>
                <Inline>₹{application.amount.toLocaleString('en-IN')}</Inline>
              </Surface>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', color: "var(--color-fsk-9)" }}>
                <Inline>Statutory Government Department Fees</Inline>
                <Inline>₹{application.govtFees.toLocaleString('en-IN')}</Inline>
              </Surface>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: "var(--font-fsk-10)", color: "var(--color-fsk-7)", paddingTop: "var(--spacing-fsk-35)", borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                <Inline>Total Amount Disbursed</Inline>
                <Inline style={{ color: "var(--color-fsk-15)" }}>₹{application.totalAmount.toLocaleString('en-IN')}</Inline>
              </Surface>
            </Surface>

            <Surface style={{ marginTop: "var(--spacing-fsk-36)", paddingTop: "var(--spacing-fsk-23)", borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-46)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
                Invoice No: <strong>{application.invoiceId}</strong>
              </Surface>
              <Link to="/customer/payments" style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-15)", textDecoration: 'none', display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                <Receipt size={14} /> View Invoice
              </Link>
            </Surface>
          </Card>
        </Surface>

        {/* Right Column: Assigned CA & Associated Documents */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-26)" }}>
          {/* Assigned CA Dossier */}
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-23)" }}>
              Assigned Chartered Accountant
            </Surface>

            {application.assignedCA ? (
              <Surface>
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-8)", marginBottom: "var(--spacing-fsk-23)" }}>
                  <Surface style={{ width: "var(--spacing-fsk-76)", height: "var(--spacing-fsk-76)", borderRadius: '50%', background: "var(--color-fsk-112)", color: "var(--color-fsk-15)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserCheck size={22} />
                  </Surface>
                  <Surface>
                    <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-19)" }}>
                      {application.assignedCA.name}
                    </Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)" }}>
                      ID: {application.assignedCA.id} • {application.assignedCA.membershipNo}
                    </Surface>
                  </Surface>
                </Surface>

                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-18)", lineHeight: 1.6, marginBottom: "var(--spacing-fsk-5)" }}>
                  Assigned by the Operations Coordinator desk. Directly responsible for document verification, statutory portal drafting, and filing dispatch.
                </Surface>

                <Button
                  label="Direct Message with CA"
                  variant="secondary"
                  size="sm"
                  width="100%"
                  icon={<MessageSquare size={15} />}
                  onClick={() => navigate('/customer/conversations')}
                />
              </Surface>
            ) : (
              <Surface style={{ textAlign: 'center', padding: "var(--spacing-fsk-2) 0", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)" }}>
                Chartered Accountant allocation is currently in progress. You will receive an operational alert once assigned.
              </Surface>
            )}
          </Card>

          {/* Associated Documents */}
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-23)" }}>
              <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                Application Documents ({associatedDocs.length})
              </Surface>
              <Link to="/customer/documents/upload" style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-15)", textDecoration: 'none' }}>
                Upload More
              </Link>
            </Surface>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)" }}>
              {associatedDocs.map((doc) => (
                <Surface
                  key={doc.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)",
                    borderRadius: "var(--radius-fsk-37)",
                    background: "var(--color-fsk-27)",
                    border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
                  }}
                >
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", overflow: 'hidden' }}>
                    <FileText size={16} color="var(--color-fsk-15)" style={{ flexShrink: 0 }} />
                    <Surface style={{ overflow: 'hidden' }}>
                      <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-113)", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {doc.fileName}
                      </Surface>
                      <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
                        {doc.fileSize} • {doc.status}
                      </Surface>
                    </Surface>
                  </Surface>
                  <Download size={16} color="var(--color-fsk-9)" style={{ cursor: 'pointer', flexShrink: 0 }} />
                </Surface>
              ))}
            </Surface>
          </Card>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default ApplicationDetailsPage;
