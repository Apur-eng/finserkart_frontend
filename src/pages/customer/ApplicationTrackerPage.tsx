import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare
} from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { INITIAL_APPLICATIONS } from '../../features/customer/customerData';

export const ApplicationTrackerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const application =
    INITIAL_APPLICATIONS.find((a) => a.id === id) || INITIAL_APPLICATIONS[0];

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-72)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-20)" }}>
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
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-17)" }}>
              <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-15)" }}>
                Application Tracker #{application.id}
              </Inline>
              <Badge label={`Stage ${application.currentStage} of 5`} variant="blue" />
            </Surface>

            <Heading level={1}>
              <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </Inline>
            </Heading>
            <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
              Submitted on {application.submissionDate} • Estimated Delivery: <strong>{application.estimatedCompletion}</strong>
            </p>
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-8)" }}>
            <Button
              label="Chat with CA"
              variant="secondary"
              size="md"
              icon={<MessageSquare size={16} />}
              onClick={() => navigate('/customer/conversations')}
            />
            <Button
              label="Application Details"
              variant="secondary"
              size="md"
              onClick={() => navigate(`/customer/applications/${application.id}`)}
            />
          </Surface>
        </Surface>
      </Surface>

      {/* Timeline Stepper Container */}
      <Card elevation="low" padding={6} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-114)" }}>
        <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
          <Heading level={2}>
            <Inline style={{ fontSize: "var(--font-fsk-30)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
              Filing Progression Milestones
            </Inline>
          </Heading>
          <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", marginTop: "var(--spacing-fsk-47)", margin: 0 }}>
            Standard operating procedure tracking from initial verification through to final government certification.
          </p>
        </Surface>

        {/* Vertical Stepper Timeline */}
        <Surface style={{ position: 'relative', paddingLeft: "var(--spacing-fsk-5)" }}>
          {application.milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'completed';
            const isInProgress = milestone.status === 'in_progress';
            const isLast = idx === application.milestones.length - 1;

            return (
              <Surface key={milestone.stage} style={{ display: 'flex', gap: "var(--spacing-fsk-2)", position: 'relative', paddingBottom: isLast ? '0' : "var(--spacing-fsk-85)" }}>
                {/* Connecting Line */}
                {!isLast && (
                  <Surface
                    style={{
                      position: 'absolute',
                      left: "var(--spacing-fsk-115)",
                      top: "var(--spacing-fsk-85)",
                      bottom: '0',
                      width: "var(--spacing-fsk-47)",
                      background: isCompleted ? "var(--color-fsk-31)" : "var(--color-fsk-21)",
                    }}
                  />
                )}

                {/* Status Dot / Icon */}
                <Surface
                  style={{
                    width: "var(--spacing-fsk-85)",
                    height: "var(--spacing-fsk-85)",
                    borderRadius: '50%',
                    background: isCompleted
                      ? "var(--color-fsk-116)"
                      : isInProgress
                      ? "var(--color-fsk-112)"
                      : "var(--color-fsk-46)",
                    color: isCompleted
                      ? "var(--color-fsk-39)"
                      : isInProgress
                      ? "var(--color-fsk-15)"
                      : "var(--color-fsk-57)",
                    border: isCompleted
                      ? "var(--spacing-fsk-47) solid var(--color-fsk-39)"
                      : isInProgress
                      ? "var(--spacing-fsk-47) solid var(--color-fsk-162)"
                      : "var(--spacing-fsk-47) solid var(--color-fsk-59)",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    flexShrink: 0,
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={20} />
                  ) : isInProgress ? (
                    <Clock size={18} />
                  ) : (
                    <Inline style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700 }}>{milestone.stage}</Inline>
                  )}
                </Surface>

                {/* Milestone Content */}
                <Surface style={{ flex: 1, paddingTop: "var(--spacing-fsk-29)" }}>
                  <Surface style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                    <Inline style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                      Stage {milestone.stage}: {milestone.title}
                    </Inline>
                    <Badge
                      label={
                        isCompleted
                          ? 'Completed'
                          : isInProgress
                          ? 'In Progress'
                          : 'Pending'
                      }
                      variant={
                        isCompleted ? 'green' : isInProgress ? 'orange' : 'neutral'
                      }
                    />
                  </Surface>

                  <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-18)", lineHeight: 1.6, marginTop: "var(--spacing-fsk-29)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
                    {milestone.description}
                  </p>

                  {milestone.timestamp && (
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-17)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                      <Calendar size={13} /> {milestone.timestamp}
                    </Surface>
                  )}

                  {milestone.remarks && (
                    <Surface
                      style={{
                        marginTop: "var(--spacing-fsk-35)",
                        background: "var(--color-fsk-66)",
                        border: "var(--spacing-fsk-22) solid var(--color-fsk-69)",
                        borderRadius: "var(--radius-fsk-37)",
                        padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)",
                        fontSize: "var(--font-fsk-14)",
                        color: "var(--color-fsk-111)",
                      }}
                    >
                      <strong>CA Remarks:</strong> {milestone.remarks}
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

export default ApplicationTrackerPage;
