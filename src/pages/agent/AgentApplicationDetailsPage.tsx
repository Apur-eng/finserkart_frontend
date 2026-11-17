import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Back button & Header */}
      <div style={{ marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => navigate('/agent/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: '#059669',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#059669' }}>
                Application Dossier #{application.id}
              </span>
              <Badge
                label={application.status}
                variant={application.status === 'Completed' ? 'green' : application.status === 'Processing' ? 'orange' : 'blue'}
              />
            </div>

            <Heading level={1}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </span>
            </Heading>
          </div>

          <Card
            elevation="low"
            padding={3}
            style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '10px',
              textAlign: 'right',
            }}
          >
            <div style={{ fontSize: '11px', color: '#047857', fontWeight: 700, textTransform: 'uppercase' }}>
              Your Commission
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#065f46' }}>
              ₹{application.agentCommission}
            </div>
            <Badge label={application.commissionStatus} variant="green" />
          </Card>
        </div>
      </div>

      {/* Grid: Client info & CA info */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        {/* Customer Info */}
        <Card elevation="low" padding={5} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <UserCheck size={18} color="#059669" />
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Client Information</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Client Name</span>
              <strong style={{ color: '#0f172a' }}>{application.customerName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Enterprise</span>
              <span style={{ color: '#0f172a' }}>{application.businessName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Customer ID</span>
              <span style={{ color: '#059669', fontFamily: 'monospace' }}>{application.customerId}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2px' }}>
              <span style={{ color: '#64748b' }}>Submission Date</span>
              <span style={{ color: '#0f172a' }}>{application.date}</span>
            </div>
          </div>
        </Card>

        {/* Assigned CA Desk */}
        <Card elevation="low" padding={5} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Briefcase size={18} color="#7c3aed" />
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Assigned Chartered Accountant</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Professional</span>
              <strong style={{ color: '#0f172a' }}>{application.caName || 'Lucknow Regulatory Desk'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Current Stage</span>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>Stage {application.currentStage} of 5</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Filing Priority</span>
              <Badge label="Standard Processing" variant="blue" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2px' }}>
              <span style={{ color: '#64748b' }}>Order Fee</span>
              <strong style={{ color: '#0f172a' }}>₹{application.amount.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </Card>
      </div>

      {/* Workflow Milestone Progress */}
      <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
          Filing Milestone Overview
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { stage: 1, title: 'Application Intake & KYC Verification', desc: 'Client information and advance verified.', completed: application.currentStage >= 1 },
            { stage: 2, title: 'Document Inspection by Operations', desc: 'PAN, Aadhaar and business proofs verified.', completed: application.currentStage >= 2 },
            { stage: 3, title: 'CA Assignment & Drafting', desc: 'Filing draft prepared for statutory portal lodgement.', completed: application.currentStage >= 3 },
            { stage: 4, title: 'Government Portal Lodgement & Acknowledgement', desc: 'Submitted to central ministry/department.', completed: application.currentStage >= 4 },
            { stage: 5, title: 'Certificate Handover & Closure', desc: 'Approved certificate handed over to client.', completed: application.currentStage >= 5 },
          ].map((m) => (
            <div key={m.stage} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: m.completed ? '#ecfdf5' : '#f1f5f9',
                  color: m.completed ? '#059669' : '#94a3b8',
                  border: m.completed ? '2px solid #059669' : '2px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '13px',
                  flexShrink: 0,
                }}
              >
                {m.completed ? <CheckCircle2 size={16} /> : m.stage}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{m.title}</div>
                <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AgentApplicationDetailsPage;
