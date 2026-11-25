import { Notice, ActionButton, Panel, Title, Field, Stack } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Save
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CAApplication } from '../../features/ca/caData';
import { INITIAL_CA_APPLICATIONS } from '../../features/ca/caData';

export const CAWorkflowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const initialApp =
    INITIAL_CA_APPLICATIONS.find((a) => a.id === id) || INITIAL_CA_APPLICATIONS[0];

  const [application, setApplication] = useState<CAApplication>(initialApp);
  const [currentStatus, setCurrentStatus] = useState(application.status);
  const [currentStage, setCurrentStage] = useState(application.currentStage);
  const [remarks, setRemarks] = useState(application.notes || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleAdvanceStage = (stageNumber: number) => {
    setCurrentStage(stageNumber);
    setApplication((prev) => ({
      ...prev,
      currentStage: stageNumber,
      milestones: prev.milestones.map((m) => {
        if (m.stage < stageNumber) return { ...m, status: 'completed' as const };
        if (m.stage === stageNumber) return { ...m, status: 'in_progress' as const, remarks: remarks };
        return { ...m, status: 'pending' as const };
      }),
    }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    setApplication((prev) => ({
      ...prev,
      status: currentStatus,
      notes: remarks,
    }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <Surface style={{ maxWidth: "61.25rem", margin: '0 auto' }}>
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
                Workflow Controller #{application.id}
              </Inline>
              <Badge
                label={currentStatus}
                variant={currentStatus === 'Completed' ? 'green' : 'orange'}
              />
              <Badge label={`Stage ${currentStage} of ${application.totalStages}`} variant="purple" />
            </Surface>

            <Title level={1}>
              <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </Inline>
            </Title>

            <p style={{ color: "var(--muted)", fontSize: "0.8125rem", marginTop: "0.25rem", margin: 0 }}>
              Client: <strong style={{ color: "var(--navy)" }}>{application.customerName}</strong> ({application.businessName}) • Deadline: <strong style={{ color: "#d97706" }}>{application.deadline}</strong>
            </p>
          </Surface>
        </Surface>
      </Surface>

      {isSaved && (
        <Surface style={{ marginBottom: "1.5rem" }}>
          <Notice
            status="success"
            title="Workflow Stage Updated Successfully"
            description="The client and operations coordinator have been notified of this milestone progression."
          />
        </Surface>
      )}

      {/* Workflow Controls Form */}
      <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
        <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
          Update Overall Filing Status &amp; CA Remarks
        </Surface>

        <form onSubmit={handleSaveStatus}>
          <Stack gap={3}>
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
              <Surface>
                <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)", display: 'block', marginBottom: "0.375rem" }}>
                  Filing Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: "0.625rem 0.75rem",
                    borderRadius: "0.5rem",
                    border: "0.0625rem solid #cbd5e1",
                    fontSize: "0.8125rem",
                    color: "var(--navy)",
                    background: "var(--white)",
                    outline: 'none',
                  }}
                >
                  <option value="Assigned">Assigned</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Action Required">Action Required (Client OTP / Doc)</option>
                </select>
              </Surface>

              <Field
                label="CA Official Remarks / Portal Reference"
                placeholder="e.g. Draft ARN generated. Waiting for client OTP verification on GSTN."
                value={remarks}
                onChange={(val) => setRemarks(val)}
                isRequired
                width="100%"
              />
            </Surface>

            <Surface style={{ marginTop: "0.5rem" }}>
              <ActionButton
                label="Save Status &amp; Notify Stakeholders"
                variant="primary"
                size="md"
                type="submit"
                icon={<Save size={16} />}
              />
            </Surface>
          </Stack>
        </form>
      </Panel>

      {/* Interactive Milestone Stages */}
      <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
        <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
          Statutory Milestone Advancement
        </Surface>

        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1.25rem" }}>
          {application.milestones.map((m) => {
            const isCurrent = m.stage === currentStage;
            const isPast = m.stage < currentStage;

            return (
              <Surface
                key={m.stage}
                style={{
                  display: 'flex',
                  gap: "1rem",
                  alignItems: 'flex-start',
                  padding: "1rem",
                  borderRadius: "1rem",
                  border: isCurrent ? "0.125rem solid #7c3aed" : "0.0625rem solid #f1f5f9",
                  background: isCurrent ? "#f5f3ff" : "var(--cream)",
                }}
              >
                <Surface
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: '50%',
                    background: isPast ? "#ecfdf5" : isCurrent ? "#7c3aed" : "var(--sage-light)",
                    color: isPast ? "var(--teal)" : isCurrent ? "var(--white)" : "#687d93",
                    border: isPast ? "0.125rem solid #059669" : isCurrent ? "0.125rem solid #7c3aed" : "0.125rem solid #cbd5e1",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    flexShrink: 0,
                  }}
                >
                  {isPast ? <CheckCircle2 size={18} /> : m.stage}
                </Surface>

                <Surface style={{ flex: 1 }}>
                  <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.25rem" }}>
                    <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>
                      Stage {m.stage}: {m.title}
                    </Surface>
                    <Badge
                      label={isPast ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                      variant={isPast ? 'green' : isCurrent ? 'purple' : 'neutral'}
                    />
                  </Surface>

                  <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, margin: "0.25rem 0 0 0" }}>
                    {m.description}
                  </p>

                  {m.timestamp && (
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.375rem", display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                      <Calendar size={13} /> {m.timestamp}
                    </Surface>
                  )}

                  {isCurrent && (
                    <Surface style={{ marginTop: "0.75rem", display: 'flex', gap: "0.625rem" }}>
                      <button
                        type="button"
                        onClick={() => handleAdvanceStage(m.stage + 1)}
                        style={{
                          padding: "0.375rem 0.875rem",
                          borderRadius: "0.375rem",
                          border: 'none',
                          background: "#7c3aed",
                          color: "var(--white)",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: "0.375rem",
                        }}
                      >
                        <CheckCircle2 size={14} /> Complete Stage {m.stage} &amp; Advance
                      </button>
                    </Surface>
                  )}
                </Surface>
              </Surface>
            );
          })}
        </Surface>
      </Panel>
    </Surface>
  );
};

export default CAWorkflowPage;
