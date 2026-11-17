import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
                Application Dossier #{application.id}
              </span>
              <Badge
                label={application.status}
                variant={application.status === 'Completed' ? 'green' : 'orange'}
              />
              <Badge label={`Priority: ${application.priority}`} variant="red" />
            </div>

            <Heading level={1}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </span>
            </Heading>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
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
          </div>
        </div>
      </div>

      {/* Grid: Client info & Regulatory Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        {/* Client Info */}
        <Card elevation="low" padding={5} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <User size={18} color="#7c3aed" />
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Applicant Client Information</span>
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
              <span style={{ color: '#7c3aed', fontFamily: 'monospace' }}>{application.customerId}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2px' }}>
              <span style={{ color: '#64748b' }}>Assigned On</span>
              <span style={{ color: '#0f172a' }}>{application.assignedDate}</span>
            </div>
          </div>
        </Card>

        {/* Regulatory Scope */}
        <Card elevation="low" padding={5} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <ShieldCheck size={18} color="#059669" />
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Statutory Execution Scope</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Target Filing Deadline</span>
              <strong style={{ color: '#d97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} /> {application.deadline}
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Current Milestone</span>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>Stage {application.currentStage} of {application.totalStages}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Professional Commission</span>
              <strong style={{ color: '#7c3aed' }}>₹{application.caCommission.toLocaleString('en-IN')}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2px' }}>
              <span style={{ color: '#64748b' }}>Uploaded Documents</span>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>{application.documents.length} verified files</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Associated Documents */}
      <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Associated Statutory Documents</div>
          <Button
            label="Open Audit Desk"
            variant="secondary"
            size="sm"
            icon={<FileCheck size={14} />}
            onClick={() => navigate('/ca/documents')}
          />
        </div>

        {application.documents.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {application.documents.map((doc) => (
              <div
                key={doc.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #f1f5f9',
                  background: '#f8fafc',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>{doc.fileName}</div>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                      {doc.fileType} • {doc.fileSize} • Uploaded by {doc.uploadedBy}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Badge label={doc.status} variant={doc.status === 'Approved' ? 'green' : 'orange'} />
                  <button
                    type="button"
                    title="Download Copy"
                    style={{
                      padding: '6px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      cursor: 'pointer',
                      color: '#475569',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px', color: '#64748b', fontSize: '13.5px' }}>
            No documents uploaded yet for this application dossier.
          </div>
        )}
      </Card>
    </div>
  );
};

export default CAApplicationDetailsPage;
