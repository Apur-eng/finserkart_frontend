import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: '0 auto' }}>
      {/* Back button & Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <button
          type="button"
          onClick={() => navigate('/ca/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: "var(--color-fsk-41)",
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
          <ArrowLeft size={16} /> Back to Assigned Queue
        </button>

        <Surface style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: "var(--spacing-fsk-5)" }}>
          <Surface>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-17)" }}>
              <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-41)" }}>
                Application Dossier #{application.id}
              </Inline>
              <Badge
                label={application.status}
                variant={application.status === 'Completed' ? 'green' : 'orange'}
              />
              <Badge label={`Priority: ${application.priority}`} variant="red" />
            </Surface>

            <Heading level={1}>
              <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </Inline>
            </Heading>
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-35)" }}>
            <Button
              label="Message Client"
              variant="secondary"
              size="md"
              icon={<MessageSquare size={16} />}
              onClick={() => navigate('/ca/conversations')}
            />
            <Button
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
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "var(--spacing-fsk-2)", marginBottom: "var(--spacing-fsk-20)" }}>
        {/* Client Info */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-23)" }}>
            <User size={18} color="var(--color-fsk-41)" />
            <Inline style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Applicant Client Information</Inline>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)", fontSize: "var(--font-fsk-14)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Client Name</Inline>
              <strong style={{ color: "var(--color-fsk-7)" }}>{application.customerName}</strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Enterprise</Inline>
              <Inline style={{ color: "var(--color-fsk-7)" }}>{application.businessName}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Customer ID</Inline>
              <Inline style={{ color: "var(--color-fsk-41)", fontFamily: 'monospace' }}>{application.customerId}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "var(--spacing-fsk-47)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Assigned On</Inline>
              <Inline style={{ color: "var(--color-fsk-7)" }}>{application.assignedDate}</Inline>
            </Surface>
          </Surface>
        </Card>

        {/* Regulatory Scope */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-23)" }}>
            <ShieldCheck size={18} color="var(--color-fsk-65)" />
            <Inline style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Statutory Execution Scope</Inline>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)", fontSize: "var(--font-fsk-14)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Target Filing Deadline</Inline>
              <strong style={{ color: "var(--color-fsk-54)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                <Clock size={13} /> {application.deadline}
              </strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Current Milestone</Inline>
              <Inline style={{ color: "var(--color-fsk-7)", fontWeight: 600 }}>Stage {application.currentStage} of {application.totalStages}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Professional Commission</Inline>
              <strong style={{ color: "var(--color-fsk-41)" }}>₹{application.caCommission.toLocaleString('en-IN')}</strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "var(--spacing-fsk-47)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Uploaded Documents</Inline>
              <Inline style={{ color: "var(--color-fsk-7)", fontWeight: 600 }}>{application.documents.length} verified files</Inline>
            </Surface>
          </Surface>
        </Card>
      </Surface>

      {/* Associated Documents */}
      <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
        <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-5)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Associated Statutory Documents</Surface>
          <Button
            label="Open Audit Desk"
            variant="secondary"
            size="sm"
            icon={<FileCheck size={14} />}
            onClick={() => navigate('/ca/documents')}
          />
        </Surface>

        {application.documents.length > 0 ? (
          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)" }}>
            {application.documents.map((doc) => (
              <Surface
                key={doc.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)",
                  borderRadius: "var(--radius-fsk-68)",
                  border: "var(--spacing-fsk-22) solid var(--color-fsk-46)",
                  background: "var(--color-fsk-27)",
                }}
              >
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-8)" }}>
                  <Surface style={{ width: "var(--spacing-fsk-85)", height: "var(--spacing-fsk-85)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-38)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--color-fsk-15)" }}>
                    <FileText size={18} />
                  </Surface>
                  <Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)" }}>{doc.fileName}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
                      {doc.fileType} • {doc.fileSize} • Uploaded by {doc.uploadedBy}
                    </Surface>
                  </Surface>
                </Surface>

                <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-8)" }}>
                  <Badge label={doc.status} variant={doc.status === 'Approved' ? 'green' : 'orange'} />
                  <button
                    type="button"
                    title="Download Copy"
                    style={{
                      padding: "var(--spacing-fsk-17)",
                      borderRadius: "var(--radius-fsk-42)",
                      border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                      background: "var(--color-fsk-38)",
                      cursor: 'pointer',
                      color: "var(--color-fsk-18)",
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
          <Surface style={{ textAlign: 'center', padding: "var(--spacing-fsk-26)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)" }}>
            No documents uploaded yet for this application dossier.
          </Surface>
        )}
      </Card>
    </Surface>
  );
};

export default CAApplicationDetailsPage;
