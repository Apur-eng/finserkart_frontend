import { Notice, ActionButton, Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "62.5rem", margin: '0 auto' }}>
      {/* Back button & Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <button
          type="button"
          onClick={() => navigate('/coordinator/applications')}
          style={{
            background: 'none',
            border: 'none',
            color: "#d97706",
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
          <ArrowLeft size={16} /> Back to Application Queue
        </button>

        <Surface style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: "1rem" }}>
          <Surface>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.375rem" }}>
              <Inline style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#d97706" }}>
                Operational Dossier #{application.id}
              </Inline>
              <Badge
                label={application.assignmentStatus}
                variant={application.assignmentStatus === 'Assigned' ? 'green' : 'orange'}
              />
              <Badge label={`SLA: ${application.slaDeadline}`} variant="blue" />
            </Surface>

            <Title level={1}>
              <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
                {application.serviceName}
              </Inline>
            </Title>
          </Surface>

          <Surface style={{ textAlign: 'right' }}>
            <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Order Fee</Surface>
            <Surface style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--navy)" }}>
              ₹{application.amount.toLocaleString('en-IN')}
            </Surface>
          </Surface>
        </Surface>
      </Surface>

      {isSaved && (
        <Surface style={{ marginBottom: "1.5rem" }}>
          <Notice
            status="success"
            title="CA Assignment Successfully Executed"
            description="The selected Chartered Accountant has been notified, and the application has transitioned into their assigned queue."
          />
        </Surface>
      )}

      {/* Grid: Client info & CA Assignment Form */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "1.25rem", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
        {/* Client Identity */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.875rem" }}>
            Applicant Enterprise Information
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem", fontSize: "0.8125rem" }}>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Client Contact</Inline>
              <strong style={{ color: "var(--navy)" }}>{application.customerName}</strong>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Enterprise Name</Inline>
              <Inline style={{ color: "var(--navy)" }}>{application.businessName}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', borderBottom: "0.0625rem solid var(--sage-light)", paddingBottom: "0.5rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Service Domain</Inline>
              <Inline style={{ color: "var(--navy)" }}>{application.category}</Inline>
            </Surface>
            <Surface style={{ display: 'flex', justifyContent: 'space-between', paddingTop: "0.125rem" }}>
              <Inline style={{ color: "var(--muted)" }}>Submission Date</Inline>
              <Inline style={{ color: "var(--navy)" }}>{application.submittedDate}</Inline>
            </Surface>
          </Surface>
        </Panel>

        {/* CA Allocation Desk */}
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid #fde68a", background: "#fffdf7" }}>
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.875rem" }}>
            <UserCheck size={18} color="#d97706" />
            <Inline style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#78350f" }}>CA Allocation Controller</Inline>
          </Surface>

          <form onSubmit={handleAssignCA}>
            <Surface style={{ marginBottom: "0.875rem" }}>
              <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#78350f", display: 'block', marginBottom: "0.375rem" }}>
                Assign Chartered Accountant
              </label>
              <select
                value={selectedCAId}
                onChange={(e) => setSelectedCAId(e.target.value)}
                style={{
                  width: '100%',
                  padding: "0.625rem 0.75rem",
                  borderRadius: "0.5rem",
                  border: "0.0625rem solid #fde68a",
                  fontSize: "0.8125rem",
                  color: "var(--navy)",
                  background: "var(--white)",
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

            <ActionButton
              label={application.assignmentStatus === 'Assigned' ? 'Reassign CA' : 'Confirm CA Allocation'}
              variant="primary"
              size="md"
              type="submit"
              icon={<CheckCircle2 size={16} />}
              width="100%"
            />
          </form>
        </Panel>
      </Surface>

      {/* Document Verification Status */}
      <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
        <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem" }}>
          <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Document Verification Status</Surface>
          <Badge label={application.docVerificationStatus} variant="green" />
        </Surface>

        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem" }}>
          <Surface
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: "0.75rem 0.875rem",
              borderRadius: "0.625rem",
              border: "0.0625rem solid var(--sage-light)",
              background: "var(--cream)",
            }}
          >
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
              <FileCheck size={18} color="var(--teal)" />
              <Surface>
                <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)" }}>Premises_Electricity_Bill.pdf</Surface>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Address Proof • Verified by Operations Coordinator Desk</Surface>
              </Surface>
            </Surface>
            <Badge label="Verified & Cleared" variant="green" />
          </Surface>
        </Surface>
      </Panel>
    </Surface>
  );
};

export default CoordinatorApplicationDetailsPage;
