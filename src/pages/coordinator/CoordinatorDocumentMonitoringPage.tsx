import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  CheckCircle2,
  Download,
  FileText
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import type { CoordinatorDocumentMonitorItem } from '../../features/coordinator/coordinatorData';
import { INITIAL_COORDINATOR_DOC_MONITORS } from '../../features/coordinator/coordinatorData';

export const CoordinatorDocumentMonitoringPage: React.FC = () => {
  const [docs, setDocs] = useState<CoordinatorDocumentMonitorItem[]>(INITIAL_COORDINATOR_DOC_MONITORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'All' | 'Pending Review' | 'Verified'>('All');

  const filtered = useMemo(() => {
    return docs.filter((d) => {
      const matchesSearch =
        d.docName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.docType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filter === 'All' ? true : d.verificationStatus === filter;

      return matchesSearch && matchesFilter;
    });
  }, [docs, searchQuery, filter]);

  const handleVerify = (id: string) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, verificationStatus: 'Verified' as const } : d))
    );
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Document Monitoring &amp; Verification Flow
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Track applicant documentation uploads, identify verification bottlenecks, and clear proofs for statutory filing.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '420px' }}>
            <TextInput
              label="Search Documents"
              placeholder="Search by document name, application ID, or client..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {(['All', 'Pending Review', 'Verified'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: filter === tab ? '1px solid #d97706' : '1px solid #cbd5e1',
                  background: filter === tab ? '#fffbeb' : '#ffffff',
                  color: filter === tab ? '#d97706' : '#475569',
                  fontSize: '13px',
                  fontWeight: filter === tab ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Documents List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map((doc) => (
          <Card
            key={doc.id}
            elevation="low"
            padding={4}
            style={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: doc.verificationStatus === 'Verified' ? '#ecfdf5' : '#fffbeb',
                  color: doc.verificationStatus === 'Verified' ? '#059669' : '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileText size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a' }}>{doc.docName}</span>
                  <Badge
                    label={doc.verificationStatus}
                    variant={doc.verificationStatus === 'Verified' ? 'green' : 'orange'}
                  />
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  {doc.docType} • Application: <strong style={{ color: '#0f172a' }}>{doc.serviceName} (#{doc.applicationId})</strong> • Client: {doc.customerName}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Uploaded {doc.uploadedAt} • Assigned to: {doc.assignedCA}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                title="Download Proof"
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  cursor: 'pointer',
                  color: '#475569',
                  fontSize: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Download size={13} /> View
              </button>

              {doc.verificationStatus !== 'Verified' && (
                <button
                  type="button"
                  onClick={() => handleVerify(doc.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: '1px solid #a7f3d0',
                    background: '#ecfdf5',
                    color: '#059669',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <CheckCircle2 size={13} /> Mark Verified
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoordinatorDocumentMonitoringPage;
