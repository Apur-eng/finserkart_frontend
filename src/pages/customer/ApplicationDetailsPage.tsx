import { ActionButton, Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "62.5rem", margin: '0 auto' }}>
      {/* Back button & Title */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <button
          type="button"
          onClick={() => navigate('/customer/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: "var(--blue)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: "0.375rem",
            padding: 0,
            marginBottom: "0.75rem",
          }}
        >
          <ArrowLeft size={16} /> Back to Applications
        </button>

        <Surface style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: "1rem" }}>
          <Surface>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.375rem" }}>
              <Inline style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--blue)" }}>
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

            <Title level={1}>
              <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </Inline>
            </Title>
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.75rem" }}>
            <ActionButton
              label="Track Status Timeline"
              variant="primary"
              size="md"
              icon={<Clock size={16} />}
              onClick={() => navigate(`/customer/applications/${application.id}/tracker`)}
            />
            <ActionButton
              label="Chat with CA"
              variant="secondary"
              size="md"
              icon={<MessageSquare size={16} />}
              onClick={() => navigate('/customer/conversations')}
            />
          </Surface>
        </Surface>
      </Surface>

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "1.5rem" }}>
        {/* Left Column: Dossier Details & Financials */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1.5rem" }}>
          {/* Dossier Panel */}
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
              Applicant &amp; Enterprise Details
            </Surface>

            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem", fontSize: "0.8125rem" }}>
              <Surface>
                <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block' }}>Applicant Name</Inline>
                <strong style={{ color: "var(--navy)" }}>{profile.fname} {profile.lname}</strong>
              </Surface>
              <Surface>
                <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block' }}>Customer ID</Inline>
                <strong style={{ color: "var(--blue)" }}>{profile.CustID}</strong>
              </Surface>
              <Surface>
                <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block' }}>Business Entity</Inline>
                <strong style={{ color: "var(--navy)" }}>{profile.businessName}</strong>
              </Surface>
              <Surface>
                <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block' }}>PAN / Identifier</Inline>
                <strong style={{ color: "var(--navy)" }}>{profile.pan}</strong>
              </Surface>
              <Surface>
                <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block' }}>Submission Date</Inline>
                <strong style={{ color: "var(--navy)" }}>{application.submissionDate}</strong>
              </Surface>
              <Surface>
                <Inline style={{ color: "var(--muted)", fontSize: "0.8125rem", display: 'block' }}>Target Completion</Inline>
                <strong style={{ color: "var(--navy)" }}>{application.estimatedCompletion}</strong>
              </Surface>
            </Surface>
          </Panel>

          {/* Fee & Invoicing Panel */}
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem" }}>
              <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>
                Financial Statement &amp; Invoice
              </Surface>
              <Badge label="Paid in Full" variant="green" />
            </Surface>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem", fontSize: "0.8125rem" }}>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', color: "var(--muted)" }}>
                <Inline>Professional Service Fee</Inline>
                <Inline>₹{application.amount.toLocaleString('en-IN')}</Inline>
              </Surface>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', color: "var(--muted)" }}>
                <Inline>Statutory Government Department Fees</Inline>
                <Inline>₹{application.govtFees.toLocaleString('en-IN')}</Inline>
              </Surface>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: "1rem", color: "var(--navy)", paddingTop: "0.625rem", borderTop: "0.0625rem solid var(--sage-light)" }}>
                <Inline>Total Amount Disbursed</Inline>
                <Inline style={{ color: "var(--blue)" }}>₹{application.totalAmount.toLocaleString('en-IN')}</Inline>
              </Surface>
            </Surface>

            <Surface style={{ marginTop: "1.125rem", paddingTop: "0.875rem", borderTop: "0.0625rem solid var(--sage-light)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
                Invoice No: <strong>{application.invoiceId}</strong>
              </Surface>
              <Link to="/customer/payments" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--blue)", textDecoration: 'none', display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                <Receipt size={14} /> View Invoice
              </Link>
            </Surface>
          </Panel>
        </Surface>

        {/* Right Column: Assigned CA & Associated Documents */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1.5rem" }}>
          {/* Assigned CA Dossier */}
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.875rem" }}>
              Assigned Chartered Accountant
            </Surface>

            {application.assignedCA ? (
              <Surface>
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.75rem", marginBottom: "0.875rem" }}>
                  <Surface style={{ width: "2.625rem", height: "2.625rem", borderRadius: '50%', background: "#e0f2fe", color: "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserCheck size={22} />
                  </Surface>
                  <Surface>
                    <Surface style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.9375rem" }}>
                      {application.assignedCA.name}
                    </Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#16a34a" }}>
                      ID: {application.assignedCA.id} • {application.assignedCA.membershipNo}
                    </Surface>
                  </Surface>
                </Surface>

                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  Assigned by the Operations Coordinator desk. Directly responsible for document verification, statutory portal drafting, and filing dispatch.
                </Surface>

                <ActionButton
                  label="Direct Message with CA"
                  variant="secondary"
                  size="sm"
                  width="100%"
                  icon={<MessageSquare size={15} />}
                  onClick={() => navigate('/customer/conversations')}
                />
              </Surface>
            ) : (
              <Surface style={{ textAlign: 'center', padding: "1.25rem 0", color: "var(--muted)", fontSize: "0.8125rem" }}>
                Chartered Accountant allocation is currently in progress. You will receive an operational alert once assigned.
              </Surface>
            )}
          </Panel>

          {/* Associated Documents */}
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.875rem" }}>
              <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>
                Application Documents ({associatedDocs.length})
              </Surface>
              <Link to="/customer/documents/upload" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--blue)", textDecoration: 'none' }}>
                Upload More
              </Link>
            </Surface>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem" }}>
              {associatedDocs.map((doc) => (
                <Surface
                  key={doc.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: "0.625rem 0.75rem",
                    borderRadius: "0.5rem",
                    background: "var(--cream)",
                    border: "0.0625rem solid var(--border)",
                  }}
                >
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", overflow: 'hidden' }}>
                    <FileText size={16} color="var(--blue)" style={{ flexShrink: 0 }} />
                    <Surface style={{ overflow: 'hidden' }}>
                      <Surface style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#243b53", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {doc.fileName}
                      </Surface>
                      <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
                        {doc.fileSize} • {doc.status}
                      </Surface>
                    </Surface>
                  </Surface>
                  <Download size={16} color="var(--muted)" style={{ cursor: 'pointer', flexShrink: 0 }} />
                </Surface>
              ))}
            </Surface>
          </Panel>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default ApplicationDetailsPage;
