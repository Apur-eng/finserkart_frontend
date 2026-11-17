import { Badge } from '@astryxdesign/core/Badge';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import {
  ArrowLeft,
  CheckCircle2,
  FileCheck,
  UserCheck
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CoordinatorApplication } from '../../features/coordinator/coordinatorData';
import {
  INITIAL_COORDINATOR_APPLICATIONS,
  INITIAL_COORDINATOR_CAS
} from '../../features/coordinator/coordinatorData';

export const CoordinatorApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cas = INITIAL_COORDINATOR_CAS;

  const initialApp =
    INITIAL_COORDINATOR_APPLICATIONS.find((a) => a.id === id) || INITIAL_COORDINATOR_APPLICATIONS[0];

  const [application, setApplication] = useState<CoordinatorApplication>(initialApp);
  const [selectedCAId, setSelectedCAId] = useState(application.assignedCAId || cas[0].id);
  const [isSaved, setIsSaved] = useState(false);

  const handleAssignCA = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenCA = cas.find((c) => c.id === selectedCAId);
    if (!chosenCA) return;

    setApplication((prev) => ({
      ...prev,
      assignedCAId: chosenCA.id,
      assignedCAName: chosenCA.name,
      assignmentStatus: 'Assigned',
      status: 'Assigned',
    }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Back button & Header */}
      <div style={{ marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => navigate('/coordinator/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: '#d97706',
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
          <ArrowLeft size={16} /> Back to Application Queue
        </button>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#d97706' }}>
                Operational Dossier #{application.id}
              </span>
              <Badge
                label={application.assignmentStatus}
                variant={application.assignmentStatus === 'Assigned' ? 'green' : 'orange'}
              />
              <Badge label={`SLA: ${application.slaDeadline}`} variant="blue" />
            </div>

            <Heading level={1}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </span>
            </Heading>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Order Fee</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
              ₹{application.amount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {isSaved && (
        <div style={{ marginBottom: '24px' }}>
          <Banner
            status="success"
            title="CA Assignment Successfully Executed"
            description="The selected Chartered Accountant has been notified, and the application has transitioned into their assigned queue."
          />
        </div>
      )}

      {/* Grid: Client info & CA Assignment Form */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        {/* Client Identity */}
        <Card elevation="low" padding={5} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
            Applicant Enterprise Information
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Client Contact</span>
              <strong style={{ color: '#0f172a' }}>{application.customerName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Enterprise Name</span>
              <span style={{ color: '#0f172a' }}>{application.businessName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Service Domain</span>
              <span style={{ color: '#0f172a' }}>{application.category}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2px' }}>
              <span style={{ color: '#64748b' }}>Submission Date</span>
              <span style={{ color: '#0f172a' }}>{application.submittedDate}</span>
            </div>
          </div>
        </Card>

        {/* CA Allocation Desk */}
        <Card elevation="low" padding={5} style={{ borderRadius: '12px', border: '1px solid #fde68a', background: '#fffdf7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <UserCheck size={18} color="#d97706" />
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#78350f' }}>CA Allocation Controller</span>
          </div>

          <form onSubmit={handleAssignCA}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#78350f', display: 'block', marginBottom: '6px' }}>
                Assign Chartered Accountant
              </label>
              <select
                value={selectedCAId}
                onChange={(e) => setSelectedCAId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #fde68a',
                  fontSize: '13px',
                  color: '#0f172a',
                  background: '#ffffff',
                  outline: 'none',
                }}
              >
                {cas.map((ca) => (
                  <option key={ca.id} value={ca.id}>
                    {ca.name} ({ca.specialization}) - {ca.activeCaseload}/{ca.capacityLimit} cases [{ca.availability}]
                  </option>
                ))}
              </select>
            </div>

            <Button
              label={application.assignmentStatus === 'Assigned' ? 'Reassign CA' : 'Confirm CA Allocation'}
              variant="primary"
              size="md"
              type="submit"
              icon={<CheckCircle2 size={16} />}
              width="100%"
            />
          </form>
        </Card>
      </div>

      {/* Document Verification Status */}
      <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Document Verification Status</div>
          <Badge label={application.docVerificationStatus} variant="green" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileCheck size={18} color="#059669" />
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>Premises_Electricity_Bill.pdf</div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>Address Proof • Verified by Operations Coordinator Desk</div>
              </div>
            </div>
            <Badge label="Verified & Cleared" variant="green" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CoordinatorApplicationDetailsPage;
