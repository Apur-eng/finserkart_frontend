import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Deliverables Handover &amp; Certificate Upload
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Upload final government registration certificates, MCA incorporation packs, and approved tax filings for client release.
        </p>
      </div>

      {isSuccess && (
        <div style={{ marginBottom: '24px' }}>
          <Banner
            status="success"
            title="Certificate Successfully Released to Client"
            description="The client has received an automated email notification with the downloadable certificate in their Document Centre."
          />
        </div>
      )}

      {/* Upload Form */}
      <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <UploadCloud size={20} color="#7c3aed" />
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Upload Approved Statutory Deliverable</span>
        </div>

        <form onSubmit={handleUploadDeliverable}>
          <VStack gap={3}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                  Target Application
                </label>
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
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
                  {applications.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.id} - {app.customerName} ({app.serviceName})
                    </option>
                  ))}
                </select>
              </div>

              <TextInput
                label="Statutory Registration / Certificate Number"
                placeholder="e.g. 09ABCDE1234F1Z5 or UDYAM-UP-50-0019283"
                value={certNumber}
                onChange={(val) => setCertNumber(val)}
                isRequired
                width="100%"
              />
            </div>

            <TextInput
              label="Deliverable File Name &amp; Description"
              placeholder="e.g. GST_Registration_Certificate_Form_REG_06.pdf"
              value={deliverableName}
              onChange={(val) => setDeliverableName(val)}
              isRequired
              width="100%"
            />

            <div style={{ marginTop: '8px' }}>
              <Button
                label="Upload &amp; Release to Client"
                variant="primary"
                size="md"
                type="submit"
                icon={<FileCheck size={16} />}
                isDisabled={!deliverableName.trim()}
              />
            </div>
          </VStack>
        </form>
      </Card>

      {/* Deliverables List */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Released Deliverables History</div>
          <span style={{ fontSize: '12px', color: '#64748b' }}>{deliverables.length} deliverables</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 18px' }}>Deliverable &amp; Certificate</th>
                <th style={{ padding: '14px 18px' }}>Application &amp; Service</th>
                <th style={{ padding: '14px 18px' }}>Client Handover</th>
                <th style={{ padding: '14px 18px' }}>Date Released</th>
                <th style={{ padding: '14px 18px' }}>Status</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Download</th>
              </tr>
            </thead>
            <tbody>
              {deliverables.map((deliv) => (
                <tr key={deliv.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{deliv.deliverableName}</div>
                        {deliv.certNumber && (
                          <div style={{ fontSize: '11px', color: '#059669', fontFamily: 'monospace' }}>
                            Cert: {deliv.certNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{deliv.serviceName}</div>
                    <div style={{ fontSize: '11px', color: '#7c3aed', fontFamily: 'monospace' }}>#{deliv.applicationId}</div>
                  </td>

                  <td style={{ padding: '14px 18px', color: '#334155' }}>
                    {deliv.customerName}
                  </td>

                  <td style={{ padding: '14px 18px', color: '#64748b' }}>
                    {deliv.uploadDate}
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <Badge label={deliv.status} variant={deliv.status === 'Released to Client' ? 'green' : 'orange'} />
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      type="button"
                      title="Download Certificate"
                      style={{
                        padding: '6px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        cursor: 'pointer',
                        color: '#475569',
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
        </div>
      </Card>
    </div>
  );
};

export default CADeliverablesPage;
