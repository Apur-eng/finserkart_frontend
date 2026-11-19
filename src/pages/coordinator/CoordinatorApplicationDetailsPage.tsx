import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: '0 auto' }}>
      {/* Back button & Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <button
          type="button"
          onClick={() => navigate('/coordinator/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: "var(--color-fsk-54)",
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
          <ArrowLeft size={16} /> Back to Application Queue
        </button>

        <Surface style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: "var(--spacing-fsk-5)" }}>
          <Surface>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-17)" }}>
              <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-54)" }}>
                Operational Dossier #{application.id}
              </Inline>
              <Badge
                label={application.assignmentStatus}
                variant={application.assignmentStatus === 'Assigned' ? 'green' : 'orange'}
              />
              <Badge label={`SLA: ${application.slaDeadline}`} variant="blue" />
            </Surface>

            <Heading level={1}>
              <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </Inline>
            </Heading>
          </Surface>

          <Surface style={{ textAlign: 'right' }}>
            <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Order Fee</Surface>
            <Surface style={{ fontSize: "var(--font-fsk-83)", fontWeight: 800, color: "var(--color-fsk-7)" }}>
              ₹{application.amount.toLocaleString('en-IN')}
            </Surface>
          </Surface>
        </Surface>
      </Surface>

      {isSaved && (
        <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
          <Banner
            status="success"
            title="CA Assignment Successfully Executed"
            description="The selected Chartered Accountant has been notified, and the application has transitioned into their assigned queue."
          />
        </Surface>
      )}

      {/* Grid: Client info & CA Assignment Form */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "var(--spacing-fsk-2)", marginBottom: "var(--spacing-fsk-20)" }}>
        {/* Client Identity */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-23)" }}>
            Applicant Enterprise Information
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)", fontSize: "var(--font-fsk-14)" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Client Contact</Inline>
              <strong style={{ color: "var(--color-fsk-7)" }}>{application.customerName}</strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Enterprise Name</Inline>
              <Inline style={{ color: "var(--color-fsk-7)" }}>{application.businessName}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingBottom: "var(--spacing-fsk-12)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Service Domain</Inline>
              <Inline style={{ color: "var(--color-fsk-7)" }}>{application.category}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "var(--spacing-fsk-47)" }}>
              <Inline style={{ color: "var(--color-fsk-9)" }}>Submission Date</Inline>
              <Inline style={{ color: "var(--color-fsk-7)" }}>{application.submittedDate}</Inline>
            </Surface>
          </Surface>
        </Card>

        {/* CA Allocation Desk */}
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-88)", background: "var(--color-fsk-107)" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-23)" }}>
            <UserCheck size={18} color="var(--color-fsk-54)" />
            <Inline style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-108)" }}>CA Allocation Controller</Inline>
          </Surface>

          <form onSubmit={handleAssignCA}>
            <Surface style={{ marginBottom: "var(--spacing-fsk-23)" }}>
              <label style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-108)", display: 'block', marginBottom: "var(--spacing-fsk-17)" }}>
                Assign Chartered Accountant
              </label>
              <select
                value={selectedCAId}
                onChange={(e) => setSelectedCAId(e.target.value)}
                style={{
                  width: '100%',
                  padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)",
                  borderRadius: "var(--radius-fsk-37)",
                  border: "var(--spacing-fsk-22) solid var(--color-fsk-88)",
                  fontSize: "var(--font-fsk-14)",
                  color: "var(--color-fsk-7)",
                  background: "var(--color-fsk-38)",
                  outline: 'none',
                }}
              >
                {cas.map((ca) => (
                  <option key={ca.id} value={ca.id}>
                    {ca.name} ({ca.specialization}) - {ca.activeCaseload}/{ca.capacityLimit} cases [{ca.availability}]
                  </option>
                ))}
              </select>
            </Surface>

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
      </Surface>

      {/* Document Verification Status */}
      <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
        <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-5)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Document Verification Status</Surface>
          <Badge label={application.docVerificationStatus} variant="green" />
        </Surface>

        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)" }}>
          <Surface
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: "var(--spacing-fsk-8) var(--spacing-fsk-23)",
              borderRadius: "var(--radius-fsk-68)",
              border: "var(--spacing-fsk-22) solid var(--color-fsk-46)",
              background: "var(--color-fsk-27)",
            }}
          >
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
              <FileCheck size={18} color="var(--color-fsk-65)" />
              <Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Premises_Electricity_Bill.pdf</Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Address Proof • Verified by Operations Coordinator Desk</Surface>
              </Surface>
            </Surface>
            <Badge label="Verified & Cleared" variant="green" />
          </Surface>
        </Surface>
      </Card>
    </Surface>
  );
};

export default CoordinatorApplicationDetailsPage;
