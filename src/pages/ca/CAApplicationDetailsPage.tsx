import { ActionButton, Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Download,
  FileCheck,
  FileText,
  MessageSquare,
  ShieldCheck,
  User
} from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { INITIAL_CA_APPLICATIONS } from '../../features/ca/caData';

export const CAApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const application =
    INITIAL_CA_APPLICATIONS.find((a) => a.id === id) || INITIAL_CA_APPLICATIONS[0];

  return (
    <Surface style={{ maxWidth: "62.5rem", margin: '0 auto' }}>
      {/* Back button & Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <button
          type="button"
          onClick={() => navigate('/ca/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: "#7c3aed",
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
          <ArrowLeft size={16} /> Back to Assigned Queue
        </button>

        <Surface style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: "1rem" }}>
          <Surface>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.375rem" }}>
              <Inline style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#7c3aed" }}>
                Application Dossier #{application.id}
              </Inline>
              <Badge
                label={application.status}
                variant={application.status === 'Completed' ? 'green' : 'orange'}
              />
              <Badge label={`Priority: ${application.priority}`} variant="red" />
            </Surface>

            <Title level={1}>
              <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </Inline>
            </Title>
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.625rem" }}>
            <ActionButton
              label="Message Client"
              variant="secondary"
              size="md"
              icon={<MessageSquare size={16} />}
              onClick={() => navigate('/ca/conversations')}
            />
            <ActionButton
              label="Update Workflow"
              variant="primary"
              size="md"
              icon={<ArrowRight size={16} />}
              onClick={() => navigate(`/ca/applications/${application.id}/workflow`)}
            />
          </Surface>
        </Surface>
      </Surface>

      {/* Grid: Client info & Regulatory Details */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "1.25rem", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
        {/* Client Info */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.875rem" }}>
            <User size={18} color="#7c3aed" />
            <Inline style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>Applicant Client Information</Inline>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem", fontSize: "0.8125rem" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Client Name</Inline>
              <strong style={{ color: "var(--navy)" }}>{application.customerName}</strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Enterprise</Inline>
              <Inline style={{ color: "var(--navy)" }}>{application.businessName}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Customer ID</Inline>
              <Inline style={{ color: "#7c3aed", fontFamily: 'monospace' }}>{application.customerId}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "0.125rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Assigned On</Inline>
              <Inline style={{ color: "var(--navy)" }}>{application.assignedDate}</Inline>
            </Surface>
          </Surface>
        </Panel>

        {/* Regulatory Scope */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.875rem" }}>
            <ShieldCheck size={18} color="var(--teal)" />
            <Inline style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>Statutory Execution Scope</Inline>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem", fontSize: "0.8125rem" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Target Filing Deadline</Inline>
              <strong style={{ color: "#d97706", display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                <Clock size={13} /> {application.deadline}
              </strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Current Milestone</Inline>
              <Inline style={{ color: "var(--navy)", fontWeight: 600 }}>Stage {application.currentStage} of {application.totalStages}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Professional Commission</Inline>
              <strong style={{ color: "#7c3aed" }}>₹{application.caCommission.toLocaleString('en-IN')}</strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "0.125rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Uploaded Documents</Inline>
              <Inline style={{ color: "var(--navy)", fontWeight: 600 }}>{application.documents.length} verified files</Inline>
            </Surface>
          </Surface>
        </Panel>
      </Surface>

      {/* Associated Documents */}
      <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
        <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem" }}>
          <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Associated Statutory Documents</Surface>
          <ActionButton
            label="Open Audit Desk"
            variant="secondary"
            size="sm"
            icon={<FileCheck size={14} />}
            onClick={() => navigate('/ca/documents')}
          />
        </Surface>

        {application.documents.length > 0 ? (
          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem" }}>
            {application.documents.map((doc) => (
              <Surface
                key={doc.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: "0.75rem 0.875rem",
                  borderRadius: "0.625rem",
                  border: "0.0625rem solid var(--sage-light)",
                  background: "var(--cream)",
                }}
              >
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.75rem" }}>
                  <Surface style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "var(--white)", border: "0.0625rem solid var(--border)", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--blue)" }}>
                    <FileText size={18} />
                  </Surface>
                  <Surface>
                    <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)" }}>{doc.fileName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
                      {doc.fileType} • {doc.fileSize} • Uploaded by {doc.uploadedBy}
                    </Surface>
                  </Surface>
                </Surface>

                <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.75rem" }}>
                  <Badge label={doc.status} variant={doc.status === 'Approved' ? 'green' : 'orange'} />
                  <button
                    type="button"
                    title="Download Copy"
                    style={{
                      padding: "0.375rem",
                      borderRadius: "0.375rem",
                      border: "0.0625rem solid #cbd5e1",
                      background: "var(--white)",
                      cursor: 'pointer',
                      color: "var(--muted)",
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Download size={14} />
                  </button>
                </Surface>
              </Surface>
            ))}
          </Surface>
        ) : (
          <Surface style={{ textAlign: 'center', padding: "1.5rem", color: "var(--muted)", fontSize: "0.8125rem" }}>
            No documents uploaded yet for this application dossier.
          </Surface>
        )}
      </Panel>
    </Surface>
  );
};

export default CAApplicationDetailsPage;
