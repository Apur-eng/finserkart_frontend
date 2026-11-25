import { Notice, ActionButton, Panel, Title, Field, Stack } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  CheckCircle2,
  Download,
  FileCheck,
  UploadCloud
} from 'lucide-react';
import React, { useState } from 'react';
import type { CADeliverable } from '../../features/ca/caData';
import {
  INITIAL_CA_APPLICATIONS,
  INITIAL_CA_DELIVERABLES
} from '../../features/ca/caData';

export const CADeliverablesPage: React.FC = () => {
  const applications = INITIAL_CA_APPLICATIONS;
  const [deliverables, setDeliverables] = useState<CADeliverable[]>(INITIAL_CA_DELIVERABLES);

  const [selectedAppId, setSelectedAppId] = useState(applications[0].id);
  const [deliverableName, setDeliverableName] = useState('');
  const [certNumber, setCertNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUploadDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliverableName.trim()) return;

    const currentApp = applications.find((a) => a.id === selectedAppId) || applications[0];

    const newDeliverable: CADeliverable = {
      id: `DELIV-2026-${Math.floor(100 + Math.random() * 900)}`,
      applicationId: currentApp.id,
      serviceName: currentApp.serviceName,
      customerName: `${currentApp.customerName} (${currentApp.businessName})`,
      deliverableName: deliverableName.trim(),
      fileType: 'Official Govt Certificate',
      uploadDate: 'Today, Just now',
      fileSize: '1.5 MB',
      status: 'Released to Client',
      certNumber: certNumber || 'REG-PENDING',
    };

    setDeliverables((prev) => [newDeliverable, ...prev]);
    setIsSuccess(true);
    setDeliverableName('');
    setCertNumber('');
    setTimeout(() => setIsSuccess(false), 3500);
  };

  return (
    <Surface style={{ maxWidth: "62.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Deliverables Handover &amp; Certificate Upload
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Upload final government registration certificates, MCA incorporation packs, and approved tax filings for client release.
        </p>
      </Surface>

      {isSuccess && (
        <Surface style={{ marginBottom: "1.5rem" }}>
          <Notice
            status="success"
            title="Certificate Successfully Released to Client"
            description="The client has received an automated email notification with the downloadable certificate in their Document Centre."
          />
        </Surface>
      )}

      {/* Upload Form */}
      <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "1rem" }}>
          <UploadCloud size={20} color="#7c3aed" />
          <Inline style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Upload Approved Statutory Deliverable</Inline>
        </Surface>

        <form onSubmit={handleUploadDeliverable}>
          <Stack gap={3}>
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
              <Surface>
                <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)", display: 'block', marginBottom: "0.375rem" }}>
                  Target Application
                </label>
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
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
                  {applications.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.id} - {app.customerName} ({app.serviceName})
                    </option>
                  ))}
                </select>
              </Surface>

              <Field
                label="Statutory Registration / Certificate Number"
                placeholder="e.g. 09ABCDE1234F1Z5 or UDYAM-UP-50-0019283"
                value={certNumber}
                onChange={(val) => setCertNumber(val)}
                isRequired
                width="100%"
              />
            </Surface>

            <Field
              label="Deliverable File Name &amp; Description"
              placeholder="e.g. GST_Registration_Certificate_Form_REG_06.pdf"
              value={deliverableName}
              onChange={(val) => setDeliverableName(val)}
              isRequired
              width="100%"
            />

            <Surface style={{ marginTop: "0.5rem" }}>
              <ActionButton
                label="Upload &amp; Release to Client"
                variant="primary"
                size="md"
                type="submit"
                icon={<FileCheck size={16} />}
                isDisabled={!deliverableName.trim()}
              />
            </Surface>
          </Stack>
        </form>
      </Panel>

      {/* Deliverables List */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ padding: "1rem 1.25rem", borderBottom: "0.0625rem solid var(--border)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Released Deliverables History</Surface>
          <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{deliverables.length} deliverables</Inline>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "0.875rem 1.125rem" }}>Deliverable &amp; Certificate</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Application &amp; Service</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Client Handover</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Date Released</th>
                <th style={{ padding: "0.875rem 1.125rem" }}>Status</th>
                <th style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>Download</th>
              </tr>
            </thead>
            <tbody>
              {deliverables.map((deliv) => (
                <tr key={deliv.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                      <Surface style={{ width: "2.125rem", height: "2.125rem", borderRadius: "0.5rem", background: "#ecfdf5", color: "var(--teal)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle2 size={18} />
                      </Surface>
                      <Surface>
                        <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{deliv.deliverableName}</Surface>
                        {deliv.certNumber && (
                          <Surface style={{ fontSize: "0.8125rem", color: "var(--teal)", fontFamily: 'monospace' }}>
                            Cert: {deliv.certNumber}
                          </Surface>
                        )}
                      </Surface>
                    </Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--navy)" }}>{deliv.serviceName}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#7c3aed", fontFamily: 'monospace' }}>#{deliv.applicationId}</Surface>
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "#334155" }}>
                    {deliv.customerName}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", color: "var(--muted)" }}>
                    {deliv.uploadDate}
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem" }}>
                    <Badge label={deliv.status} variant={deliv.status === 'Released to Client' ? 'green' : 'orange'} />
                  </td>

                  <td style={{ padding: "0.875rem 1.125rem", textAlign: 'right' }}>
                    <button
                      type="button"
                      title="Download Certificate"
                      style={{
                        padding: "0.375rem",
                        borderRadius: "0.375rem",
                        border: "0.0625rem solid #cbd5e1",
                        background: "var(--white)",
                        cursor: 'pointer',
                        color: "var(--muted)",
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      </Panel>
    </Surface>
  );
};

export default CADeliverablesPage;
