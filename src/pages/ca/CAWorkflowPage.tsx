import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-105)", margin: '0 auto' }}>
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
                Workflow Controller #{application.id}
              </Inline>
              <Badge
                label={currentStatus}
                variant={currentStatus === 'Completed' ? 'green' : 'orange'}
              />
              <Badge label={`Stage ${currentStage} of ${application.totalStages}`} variant="purple" />
            </Surface>

            <Heading level={1}>
              <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </Inline>
            </Heading>

            <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
              Client: <strong style={{ color: "var(--color-fsk-7)" }}>{application.customerName}</strong> ({application.businessName}) • Deadline: <strong style={{ color: "var(--color-fsk-54)" }}>{application.deadline}</strong>
            </p>
          </Surface>
        </Surface>
      </Surface>

      {isSaved && (
        <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
          <Banner
            status="success"
            title="Workflow Stage Updated Successfully"
            description="The client and operations coordinator have been notified of this milestone progression."
          />
        </Surface>
      )}

      {/* Workflow Controls Form */}
      <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-20)" }}>
        <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-5)" }}>
          Update Overall Filing Status &amp; CA Remarks
        </Surface>

        <form onSubmit={handleSaveStatus}>
          <VStack gap={3}>
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
              <Surface>
                <label style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)", display: 'block', marginBottom: "var(--spacing-fsk-17)" }}>
                  Filing Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)",
                    borderRadius: "var(--radius-fsk-37)",
                    border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                    fontSize: "var(--font-fsk-14)",
                    color: "var(--color-fsk-7)",
                    background: "var(--color-fsk-38)",
                    outline: 'none',
                  }}
                >
                  <option value="Assigned">Assigned</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Action Required">Action Required (Client OTP / Doc)</option>
                </select>
              </Surface>

              <TextInput
                label="CA Official Remarks / Portal Reference"
                placeholder="e.g. Draft ARN generated. Waiting for client OTP verification on GSTN."
                value={remarks}
                onChange={(val) => setRemarks(val)}
                isRequired
                width="100%"
              />
            </Surface>

            <Surface style={{ marginTop: "var(--spacing-fsk-12)" }}>
              <Button
                label="Save Status &amp; Notify Stakeholders"
                variant="primary"
                size="md"
                type="submit"
                icon={<Save size={16} />}
              />
            </Surface>
          </VStack>
        </form>
      </Card>

      {/* Interactive Milestone Stages */}
      <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
        <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-5)" }}>
          Statutory Milestone Advancement
        </Surface>

        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-2)" }}>
          {application.milestones.map((m) => {
            const isCurrent = m.stage === currentStage;
            const isPast = m.stage < currentStage;

            return (
              <Surface
                key={m.stage}
                style={{
                  display: 'flex',
                  gap: "var(--spacing-fsk-5)",
                  alignItems: 'flex-start',
                  padding: "var(--spacing-fsk-5)",
                  borderRadius: "var(--radius-fsk-28)",
                  border: isCurrent ? "var(--spacing-fsk-47) solid var(--color-fsk-41)" : "var(--spacing-fsk-22) solid var(--color-fsk-165)",
                  background: isCurrent ? "var(--color-fsk-53)" : "var(--color-fsk-27)",
                }}
              >
                <Surface
                  style={{
                    width: "var(--spacing-fsk-85)",
                    height: "var(--spacing-fsk-85)",
                    borderRadius: '50%',
                    background: isPast ? "var(--color-fsk-64)" : isCurrent ? "var(--color-fsk-41)" : "var(--color-fsk-46)",
                    color: isPast ? "var(--color-fsk-65)" : isCurrent ? "var(--color-fsk-38)" : "var(--color-fsk-57)",
                    border: isPast ? "var(--spacing-fsk-47) solid var(--color-fsk-164)" : isCurrent ? "var(--spacing-fsk-47) solid var(--color-fsk-41)" : "var(--spacing-fsk-47) solid var(--color-fsk-59)",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: "var(--font-fsk-24)",
                    flexShrink: 0,
                  }}
                >
                  {isPast ? <CheckCircle2 size={18} /> : m.stage}
                </Surface>

                <Surface style={{ flex: 1 }}>
                  <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-29)" }}>
                    <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                      Stage {m.stage}: {m.title}
                    </Surface>
                    <Badge
                      label={isPast ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                      variant={isPast ? 'green' : isCurrent ? 'purple' : 'neutral'}
                    />
                  </Surface>

                  <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-18)", lineHeight: 1.5, margin: "var(--spacing-fsk-29) 0 0 0" }}>
                    {m.description}
                  </p>

                  {m.timestamp && (
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-17)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                      <Calendar size={13} /> {m.timestamp}
                    </Surface>
                  )}

                  {isCurrent && (
                    <Surface style={{ marginTop: "var(--spacing-fsk-8)", display: 'flex', gap: "var(--spacing-fsk-35)" }}>
                      <button
                        type="button"
                        onClick={() => handleAdvanceStage(m.stage + 1)}
                        style={{
                          padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                          borderRadius: "var(--radius-fsk-42)",
                          border: 'none',
                          background: "var(--color-fsk-41)",
                          color: "var(--color-fsk-38)",
                          fontSize: "var(--font-fsk-14)",
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: "var(--spacing-fsk-17)",
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
      </Card>
    </Surface>
  );
};

export default CAWorkflowPage;
