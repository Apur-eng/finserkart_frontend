import { ActionButton, Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "60rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
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
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.375rem" }}>
              <Inline style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--blue)" }}>
                Application Tracker #{application.id}
              </Inline>
              <Badge label={`Stage ${application.currentStage} of 5`} variant="blue" />
            </Surface>

            <Title level={1}>
              <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </Inline>
            </Title>
            <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
              Submitted on {application.submissionDate} • Estimated Delivery: <strong>{application.estimatedCompletion}</strong>
            </p>
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.75rem" }}>
            <ActionButton
              label="Chat with CA"
              variant="secondary"
              size="md"
              icon={<MessageSquare size={16} />}
              onClick={() => navigate('/customer/conversations')}
            />
            <ActionButton
              label="Application Details"
              variant="secondary"
              size="md"
              onClick={() => navigate(`/customer/applications/${application.id}`)}
            />
          </Surface>
        </Surface>
      </Surface>

      {/* Timeline Stepper Container */}
      <Panel elevation="low" padding={6} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "clamp(1rem, 2.4615384615384617vw, 2rem)" }}>
        <Surface style={{ marginBottom: "1.5rem" }}>
          <Title level={2}>
            <Inline style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--navy)" }}>
              Filing Progression Milestones
            </Inline>
          </Title>
          <p style={{ color: "var(--muted)", fontSize: "0.8125rem", marginTop: "0.125rem", margin: 0 }}>
            Standard operating procedure tracking from initial verification through to final government certification.
          </p>
        </Surface>

        {/* Vertical Stepper Timeline */}
        <Surface style={{ position: 'relative', paddingLeft: "1rem" }}>
          {application.milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'completed';
            const isInProgress = milestone.status === 'in_progress';
            const isLast = idx === application.milestones.length - 1;

            return (
              <Surface key={milestone.stage} style={{ display: 'flex', gap: "1.25rem", position: 'relative', paddingBottom: isLast ? '0' : "2.25rem" }}>
                {/* Connecting Line */}
                {!isLast && (
                  <Surface
                    style={{
                      position: 'absolute',
                      left: "1.0625rem",
                      top: "2.25rem",
                      bottom: '0',
                      width: "0.125rem",
                      background: isCompleted ? "var(--teal)" : "var(--border)",
                    }}
                  />
                )}

                {/* Status Dot / Icon */}
                <Surface
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: '50%',
                    background: isCompleted
                      ? "#dcfce7"
                      : isInProgress
                      ? "#e0f2fe"
                      : "var(--sage-light)",
                    color: isCompleted
                      ? "#16a34a"
                      : isInProgress
                      ? "var(--blue)"
                      : "#687d93",
                    border: isCompleted
                      ? "0.125rem solid #16a34a"
                      : isInProgress
                      ? "0.125rem solid var(--blue)"
                      : "0.125rem solid #cbd5e1",
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
                    <Inline style={{ fontSize: "0.875rem", fontWeight: 700 }}>{milestone.stage}</Inline>
                  )}
                </Surface>

                {/* Milestone Content */}
                <Surface style={{ flex: 1, paddingTop: "0.25rem" }}>
                  <Surface style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: "0.625rem" }}>
                    <Inline style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>
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

                  <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "0.25rem", margin: "0.25rem 0 0 0" }}>
                    {milestone.description}
                  </p>

                  {milestone.timestamp && (
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.375rem", display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                      <Calendar size={13} /> {milestone.timestamp}
                    </Surface>
                  )}

                  {milestone.remarks && (
                    <Surface
                      style={{
                        marginTop: "0.625rem",
                        background: "#fffbeb",
                        border: "0.0625rem solid #fef3c7",
                        borderRadius: "0.5rem",
                        padding: "0.625rem 0.75rem",
                        fontSize: "0.8125rem",
                        color: "#92400e",
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
      </Panel>
    </Surface>
  );
};

export default ApplicationTrackerPage;
