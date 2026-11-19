import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Deliverables Handover &amp; Certificate Upload
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Upload final government registration certificates, MCA incorporation packs, and approved tax filings for client release.
        </p>
      </Surface>

      {isSuccess && (
        <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
          <Banner
            status="success"
            title="Certificate Successfully Released to Client"
            description="The client has received an automated email notification with the downloadable certificate in their Document Centre."
          />
        </Surface>
      )}

      {/* Upload Form */}
      <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-20)" }}>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-5)" }}>
          <UploadCloud size={20} color="var(--color-fsk-41)" />
          <Inline style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Upload Approved Statutory Deliverable</Inline>
        </Surface>

        <form onSubmit={handleUploadDeliverable}>
          <VStack gap={3}>
            <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
              <Surface>
                <label style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)", display: 'block', marginBottom: "var(--spacing-fsk-17)" }}>
                  Target Application
                </label>
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
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
                  {applications.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.id} - {app.customerName} ({app.serviceName})
                    </option>
                  ))}
                </select>
              </Surface>

              <TextInput
                label="Statutory Registration / Certificate Number"
                placeholder="e.g. 09ABCDE1234F1Z5 or UDYAM-UP-50-0019283"
                value={certNumber}
                onChange={(val) => setCertNumber(val)}
                isRequired
                width="100%"
              />
            </Surface>

            <TextInput
              label="Deliverable File Name &amp; Description"
              placeholder="e.g. GST_Registration_Certificate_Form_REG_06.pdf"
              value={deliverableName}
              onChange={(val) => setDeliverableName(val)}
              isRequired
              width="100%"
            />

            <Surface style={{ marginTop: "var(--spacing-fsk-12)" }}>
              <Button
                label="Upload &amp; Release to Client"
                variant="primary"
                size="md"
                type="submit"
                icon={<FileCheck size={16} />}
                isDisabled={!deliverableName.trim()}
              />
            </Surface>
          </VStack>
        </form>
      </Card>

      {/* Deliverables List */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Released Deliverables History</Surface>
          <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{deliverables.length} deliverables</Inline>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Deliverable &amp; Certificate</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Application &amp; Service</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Client Handover</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Date Released</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>Status</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>Download</th>
              </tr>
            </thead>
            <tbody>
              {deliverables.map((deliv) => (
                <tr key={deliv.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                      <Surface style={{ width: "var(--spacing-fsk-52)", height: "var(--spacing-fsk-52)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-64)", color: "var(--color-fsk-65)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle2 size={18} />
                      </Surface>
                      <Surface>
                        <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{deliv.deliverableName}</Surface>
                        {deliv.certNumber && (
                          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-65)", fontFamily: 'monospace' }}>
                            Cert: {deliv.certNumber}
                          </Surface>
                        )}
                      </Surface>
                    </Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>{deliv.serviceName}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-41)", fontFamily: 'monospace' }}>#{deliv.applicationId}</Surface>
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-25)" }}>
                    {deliv.customerName}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", color: "var(--color-fsk-9)" }}>
                    {deliv.uploadDate}
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)" }}>
                    <Badge label={deliv.status} variant={deliv.status === 'Released to Client' ? 'green' : 'orange'} />
                  </td>

                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", textAlign: 'right' }}>
                    <button
                      type="button"
                      title="Download Certificate"
                      style={{
                        padding: "var(--spacing-fsk-17)",
                        borderRadius: "var(--radius-fsk-42)",
                        border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                        background: "var(--color-fsk-38)",
                        cursor: 'pointer',
                        color: "var(--color-fsk-18)",
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
      </Card>
    </Surface>
  );
};

export default CADeliverablesPage;
