import { Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "62.5rem", margin: '0 auto' }}>
      {/* Back button & Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <button
          type="button"
          onClick={() => navigate('/agent/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: "var(--teal)",
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
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.375rem" }}>
              <Inline style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--teal)" }}>
                Application Dossier #{application.id}
              </Inline>
              <Badge
                label={application.status}
                variant={application.status === 'Completed' ? 'green' : application.status === 'Processing' ? 'orange' : 'blue'}
              />
            </Surface>

            <Title level={1}>
              <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </Inline>
            </Title>
          </Surface>

          <Panel
            elevation="low"
            padding={3}
            style={{
              background: "#ecfdf5",
              border: "0.0625rem solid #a7f3d0",
              borderRadius: "0.625rem",
              textAlign: 'right',
            }}
          >
            <Surface style={{ fontSize: "0.8125rem", color: "#047857", fontWeight: 700, textTransform: 'uppercase' }}>
              Your Commission
            </Surface>
            <Surface style={{ fontSize: "1.375rem", fontWeight: 800, color: "#065f46" }}>
              ₹{application.agentCommission}
            </Surface>
            <Badge label={application.commissionStatus} variant="green" />
          </Panel>
        </Surface>
      </Surface>

      {/* Grid: Client info & CA info */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "1.25rem", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
        {/* Customer Info */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.875rem" }}>
            <UserCheck size={18} color="var(--teal)" />
            <Inline style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>Client Information</Inline>
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
              <Inline style={{ color: "var(--teal)", fontFamily: 'monospace' }}>{application.customerId}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "0.125rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Submission Date</Inline>
              <Inline style={{ color: "var(--navy)" }}>{application.date}</Inline>
            </Surface>
          </Surface>
        </Panel>

        {/* Assigned CA Desk */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.875rem" }}>
            <Briefcase size={18} color="#7c3aed" />
            <Inline style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>Assigned Chartered Accountant</Inline>
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem", fontSize: "0.8125rem" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Professional</Inline>
              <strong style={{ color: "var(--navy)" }}>{application.caName || 'Lucknow Regulatory Desk'}</strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Current Stage</Inline>
              <Inline style={{ color: "var(--navy)", fontWeight: 600 }}>Stage {application.currentStage} of 5</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Filing Priority</Inline>
              <Badge label="Standard Processing" variant="blue" />
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "0.125rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Order Fee</Inline>
              <strong style={{ color: "var(--navy)" }}>₹{application.amount.toLocaleString('en-IN')}</strong>
            </Surface>
          </Surface>
        </Panel>
      </Surface>

      {/* Workflow Milestone Progress */}
      <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
        <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
          Filing Milestone Overview
        </Surface>

        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1rem" }}>
          {[
            { stage: 1, title: 'Application Intake & KYC Verification', desc: 'Client information and advance verified.', completed: application.currentStage >= 1 },
            { stage: 2, title: 'Document Inspection by Operations', desc: 'PAN, Aadhaar and business proofs verified.', completed: application.currentStage >= 2 },
            { stage: 3, title: 'CA Assignment & Drafting', desc: 'Filing draft prepared for statutory portal lodgement.', completed: application.currentStage >= 3 },
            { stage: 4, title: 'Government Portal Lodgement & Acknowledgement', desc: 'Submitted to central ministry/department.', completed: application.currentStage >= 4 },
            { stage: 5, title: 'Certificate Handover & Closure', desc: 'Approved certificate handed over to client.', completed: application.currentStage >= 5 },
          ].map((m) => (
            <Surface key={m.stage} style={{ display: 'flex', alignItems: 'flex-start', gap: "0.875rem" }}>
              <Surface
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: '50%',
                  background: m.completed ? "#ecfdf5" : "var(--sage-light)",
                  color: m.completed ? "var(--teal)" : "#687d93",
                  border: m.completed ? "0.125rem solid #059669" : "0.125rem solid #cbd5e1",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                  flexShrink: 0,
                }}
              >
                {m.completed ? <CheckCircle2 size={16} /> : m.stage}
              </Surface>
              <Surface style={{ flex: 1 }}>
                <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>{m.title}</Surface>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>{m.desc}</Surface>
              </Surface>
            </Surface>
          ))}
        </Surface>
      </Panel>
    </Surface>
  );
};

export default AgentApplicationDetailsPage;
