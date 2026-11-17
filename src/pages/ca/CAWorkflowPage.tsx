import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      {/* Back button & Header */}
      <div style={{ marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => navigate('/ca/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: '#7c3aed',
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
          <ArrowLeft size={16} /> Back to Assigned Queue
        </button>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#7c3aed' }}>
                Workflow Controller #{application.id}
              </span>
              <Badge
                label={currentStatus}
                variant={currentStatus === 'Completed' ? 'green' : 'orange'}
              />
              <Badge label={`Stage ${currentStage} of ${application.totalStages}`} variant="purple" />
            </div>

            <Heading level={1}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </span>
            </Heading>

            <p style={{ color: '#64748b', fontSize: '13.5px', marginTop: '4px', margin: 0 }}>
              Client: <strong style={{ color: '#0f172a' }}>{application.customerName}</strong> ({application.businessName}) • Deadline: <strong style={{ color: '#d97706' }}>{application.deadline}</strong>
            </p>
          </div>
        </div>
      </div>

      {isSaved && (
        <div style={{ marginBottom: '24px' }}>
          <Banner
            status="success"
            title="Workflow Stage Updated Successfully"
            description="The client and operations coordinator have been notified of this milestone progression."
          />
        </div>
      )}

      {/* Workflow Controls Form */}
      <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '28px' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
          Update Overall Filing Status &amp; CA Remarks
        </div>

        <form onSubmit={handleSaveStatus}>
          <VStack gap={3}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                  Filing Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13.5px',
                    color: '#0f172a',
                    background: '#ffffff',
                    outline: 'none',
                  }}
                >
                  <option value="Assigned">Assigned</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Action Required">Action Required (Client OTP / Doc)</option>
                </select>
              </div>

              <TextInput
                label="CA Official Remarks / Portal Reference"
                placeholder="e.g. Draft ARN generated. Waiting for client OTP verification on GSTN."
                value={remarks}
                onChange={(val) => setRemarks(val)}
                isRequired
                width="100%"
              />
            </div>

            <div style={{ marginTop: '8px' }}>
              <Button
                label="Save Status &amp; Notify Stakeholders"
                variant="primary"
                size="md"
                type="submit"
                icon={<Save size={16} />}
              />
            </div>
          </VStack>
        </form>
      </Card>

      {/* Interactive Milestone Stages */}
      <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
          Statutory Milestone Advancement
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {application.milestones.map((m) => {
            const isCurrent = m.stage === currentStage;
            const isPast = m.stage < currentStage;

            return (
              <div
                key={m.stage}
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  padding: '16px',
                  borderRadius: '12px',
                  border: isCurrent ? '2px solid #7c3aed' : '1px solid #f1f5f9',
                  background: isCurrent ? '#f5f3ff' : '#f8fafc',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isPast ? '#ecfdf5' : isCurrent ? '#7c3aed' : '#f1f5f9',
                    color: isPast ? '#059669' : isCurrent ? '#ffffff' : '#94a3b8',
                    border: isPast ? '2px solid #059669' : isCurrent ? '2px solid #7c3aed' : '2px solid #cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                    flexShrink: 0,
                  }}
                >
                  {isPast ? <CheckCircle2 size={18} /> : m.stage}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                      Stage {m.stage}: {m.title}
                    </div>
                    <Badge
                      label={isPast ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                      variant={isPast ? 'green' : isCurrent ? 'purple' : 'neutral'}
                    />
                  </div>

                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '4px 0 0 0' }}>
                    {m.description}
                  </p>

                  {m.timestamp && (
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} /> {m.timestamp}
                    </div>
                  )}

                  {isCurrent && (
                    <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => handleAdvanceStage(m.stage + 1)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '6px',
                          border: 'none',
                          background: '#7c3aed',
                          color: '#ffffff',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <CheckCircle2 size={14} /> Complete Stage {m.stage} &amp; Advance
                      </button>
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

export default CAWorkflowPage;
