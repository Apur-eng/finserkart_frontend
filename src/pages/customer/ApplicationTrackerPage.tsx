import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <button
          type="button"
          onClick={() => navigate('/customer/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: '#0066cc',
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
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0066cc' }}>
                Application Tracker #{application.id}
              </span>
              <Badge label={`Stage ${application.currentStage} of 5`} variant="blue" />
            </div>

            <Heading level={1}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </span>
            </Heading>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
              Submitted on {application.submissionDate} • Estimated Delivery: <strong>{application.estimatedCompletion}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
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
          </div>
        </div>
      </div>

      {/* Timeline Stepper Container */}
      <Card elevation="low" padding={6} style={{ borderRadius: '16px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Heading level={2}>
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
              Filing Progression Milestones
            </span>
          </Heading>
          <p style={{ color: '#64748b', fontSize: '13.5px', marginTop: '2px', margin: 0 }}>
            Standard operating procedure tracking from initial verification through to final government certification.
          </p>
        </div>

        {/* Vertical Stepper Timeline */}
        <div style={{ position: 'relative', paddingLeft: '16px' }}>
          {application.milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'completed';
            const isInProgress = milestone.status === 'in_progress';
            const isLast = idx === application.milestones.length - 1;

            return (
              <div key={milestone.stage} style={{ display: 'flex', gap: '20px', position: 'relative', paddingBottom: isLast ? '0' : '36px' }}>
                {/* Connecting Line */}
                {!isLast && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '17px',
                      top: '36px',
                      bottom: '0',
                      width: '2px',
                      background: isCompleted ? '#10b981' : '#e2e8f0',
                    }}
                  />
                )}

                {/* Status Dot / Icon */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isCompleted
                      ? '#dcfce7'
                      : isInProgress
                      ? '#e0f2fe'
                      : '#f1f5f9',
                    color: isCompleted
                      ? '#16a34a'
                      : isInProgress
                      ? '#0066cc'
                      : '#94a3b8',
                    border: isCompleted
                      ? '2px solid #16a34a'
                      : isInProgress
                      ? '2px solid #0066cc'
                      : '2px solid #cbd5e1',
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
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{milestone.stage}</span>
                  )}
                </div>

                {/* Milestone Content */}
                <div style={{ flex: 1, paddingTop: '4px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                      Stage {milestone.stage}: {milestone.title}
                    </span>
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
                  </div>

                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, marginTop: '4px', margin: '4px 0 0 0' }}>
                    {milestone.description}
                  </p>

                  {milestone.timestamp && (
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} /> {milestone.timestamp}
                    </div>
                  )}

                  {milestone.remarks && (
                    <div
                      style={{
                        marginTop: '10px',
                        background: '#fffbeb',
                        border: '1px solid #fef3c7',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        fontSize: '13px',
                        color: '#92400e',
                      }}
                    >
                      <strong>CA Remarks:</strong> {milestone.remarks}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ApplicationTrackerPage;
