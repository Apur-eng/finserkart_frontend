import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { INITIAL_AGENT_APPLICATIONS } from '../../features/agent/agentData';

export const AgentApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const application =
    INITIAL_AGENT_APPLICATIONS.find((a) => a.id === id) || INITIAL_AGENT_APPLICATIONS[0];

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: '0 auto' }}>
      {/* Back button & Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <button
          type="button"
          onClick={() => navigate('/agent/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: "var(--color-fsk-65)",
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
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-17)" }}>
              <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-65)" }}>
                Application Dossier #{application.id}
              </Inline>
              <Badge
                label={application.status}
                variant={application.status === 'Completed' ? 'green' : application.status === 'Processing' ? 'orange' : 'blue'}
              />
            </Surface>

            <Heading level={1}>
              <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </Inline>
            </Heading>
          </Surface>

          <Card
            elevation="low"
            padding={3}
            style={{
              background: "var(--color-fsk-64)",
              border: "var(--spacing-fsk-22) solid var(--color-fsk-81)",
              borderRadius: "var(--radius-fsk-68)",
              textAlign: 'right',
            }}
          >
            <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-82)", fontWeight: 700, textTransform: 'uppercase' }}>
              Your Commission
            </Surface>
            <Surface style={{ fontSize: "var(--font-fsk-83)", fontWeight: 800, color: "var(--color-fsk-84)" }}>
              ₹{application.agentCommission}
            </Surface>
            <Badge label={application.commissionStatus} variant="green" />
          </Card>
        </Surface>
      </Surface>

      {/* Grid: Client info & CA info */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "var(--spacing-fsk-2)", marginBottom: "var(--spacing-fsk-20)" }}>
        {/* Customer Info */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-23)" }}>
            <UserCheck size={18} color="var(--color-fsk-65)" />
            <Inline style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Client Information</Inline>
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
              <Inline style={{ color: "var(--color-fsk-65)", fontFamily: 'monospace' }}>{application.customerId}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "var(--spacing-fsk-47)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Submission Date</Inline>
              <Inline style={{ color: "var(--color-fsk-7)" }}>{application.date}</Inline>
            </Surface>
          </Surface>
        </Card>

        {/* Assigned CA Desk */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-23)" }}>
            <Briefcase size={18} color="var(--color-fsk-41)" />
            <Inline style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Assigned Chartered Accountant</Inline>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)", fontSize: "var(--font-fsk-14)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Professional</Inline>
              <strong style={{ color: "var(--color-fsk-7)" }}>{application.caName || 'Lucknow Regulatory Desk'}</strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Current Stage</Inline>
              <Inline style={{ color: "var(--color-fsk-7)", fontWeight: 600 }}>Stage {application.currentStage} of 5</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Filing Priority</Inline>
              <Badge label="Standard Processing" variant="blue" />
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "var(--spacing-fsk-47)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Order Fee</Inline>
              <strong style={{ color: "var(--color-fsk-7)" }}>₹{application.amount.toLocaleString('en-IN')}</strong>
            </Surface>
          </Surface>
        </Card>
      </Surface>

      {/* Workflow Milestone Progress */}
      <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
        <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-5)" }}>
          Filing Milestone Overview
        </Surface>

        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-5)" }}>
          {[
            { stage: 1, title: 'Application Intake & KYC Verification', desc: 'Client information and advance verified.', completed: application.currentStage >= 1 },
            { stage: 2, title: 'Document Inspection by Operations', desc: 'PAN, Aadhaar and business proofs verified.', completed: application.currentStage >= 2 },
            { stage: 3, title: 'CA Assignment & Drafting', desc: 'Filing draft prepared for statutory portal lodgement.', completed: application.currentStage >= 3 },
            { stage: 4, title: 'Government Portal Lodgement & Acknowledgement', desc: 'Submitted to central ministry/department.', completed: application.currentStage >= 4 },
            { stage: 5, title: 'Certificate Handover & Closure', desc: 'Approved certificate handed over to client.', completed: application.currentStage >= 5 },
          ].map((m) => (
            <Surface key={m.stage} style={{ display: 'flex', alignItems: 'flex-start', gap: "var(--spacing-fsk-23)" }}>
              <Surface
                style={{
                  width: "var(--spacing-fsk-62)",
                  height: "var(--spacing-fsk-62)",
                  borderRadius: '50%',
                  background: m.completed ? "var(--color-fsk-64)" : "var(--color-fsk-46)",
                  color: m.completed ? "var(--color-fsk-65)" : "var(--color-fsk-57)",
                  border: m.completed ? "var(--spacing-fsk-47) solid var(--color-fsk-164)" : "var(--spacing-fsk-47) solid var(--color-fsk-59)",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: "var(--font-fsk-14)",
                  flexShrink: 0,
                }}
              >
                {m.completed ? <CheckCircle2 size={16} /> : m.stage}
              </Surface>
              <Surface style={{ flex: 1 }}>
                <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>{m.title}</Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>{m.desc}</Surface>
              </Surface>
            </Surface>
          ))}
        </Surface>
      </Card>
    </Surface>
  );
};

export default AgentApplicationDetailsPage;
