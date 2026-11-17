import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  CheckCircle2,
  Download,
  FileText,
  XCircle
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import type { CADocumentItem } from '../../features/ca/caData';
import { INITIAL_CA_DOCUMENTS } from '../../features/ca/caData';

export const CADocumentReviewPage: React.FC = () => {
  const [docs, setDocs] = useState<CADocumentItem[]>(INITIAL_CA_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Pending Review' | 'Approved' | 'Defective / Rejected'>('All');

  const filteredDocs = useMemo(() => {
    return docs.filter((d) => {
      const matchesSearch =
        d.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.fileType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = activeTab === 'All' ? true : d.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [docs, searchQuery, activeTab]);

  const handleApprove = (id: string) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: 'Approved', reviewNotes: 'Verified and approved by CA Vivek Agrawal' } : d
      )
    );
  };

  const handleReject = (id: string) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: 'Defective / Rejected', reviewNotes: 'Document illegible or missing landlord signature' } : d
      )
    );
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Document Review & Audit Desk
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Examine applicant proofs, legal deeds, and identity documents. Approve compliant attachments or flag filing defects.
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
            {(['All', 'Pending Review', 'Approved', 'Defective / Rejected'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: activeTab === tab ? '1px solid #7c3aed' : '1px solid #cbd5e1',
                  background: activeTab === tab ? '#f5f3ff' : '#ffffff',
                  color: activeTab === tab ? '#7c3aed' : '#475569',
                  fontSize: '13px',
                  fontWeight: activeTab === tab ? 600 : 500,
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

      {/* Documents Review List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredDocs.map((doc) => (
          <Card
            key={doc.id}
            elevation="low"
            padding={4}
            style={{
              borderRadius: '12px',
              border: doc.status === 'Defective / Rejected' ? '1px solid #fecaca' : '1px solid #e2e8f0',
              background: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#7c3aed',
                  }}
                >
                  <FileText size={22} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{doc.fileName}</span>
                    <Badge
                      label={doc.status}
                      variant={doc.status === 'Approved' ? 'green' : doc.status === 'Pending Review' ? 'orange' : 'red'}
                    />
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
                    Type: <strong>{doc.fileType}</strong> • {doc.fileSize} • Client: <strong style={{ color: '#0f172a' }}>{doc.customerName}</strong> ({doc.serviceName} - #{doc.applicationId})
                  </div>
                  {doc.reviewNotes && (
                    <div style={{ fontSize: '12px', color: doc.status === 'Defective / Rejected' ? '#b91c1c' : '#15803d', marginTop: '4px' }}>
                      <strong>Audit Note:</strong> {doc.reviewNotes}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  title="Download File"
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    cursor: 'pointer',
                    color: '#475569',
                    fontSize: '12.5px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Download size={14} /> Download
                </button>

                {doc.status !== 'Approved' && (
                  <button
                    type="button"
                    onClick={() => handleApprove(doc.id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid #a7f3d0',
                      background: '#ecfdf5',
                      color: '#059669',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <CheckCircle2 size={14} /> Approve Document
                  </button>
                )}

                {doc.status !== 'Defective / Rejected' && (
                  <button
                    type="button"
                    onClick={() => handleReject(doc.id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid #fecaca',
                      background: '#fff1f2',
                      color: '#e11d48',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <XCircle size={14} /> Flag Defect
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filteredDocs.length === 0 && (
          <Card elevation="low" padding={6} style={{ textAlign: 'center', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <FileText size={28} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>No documents matching filters</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>All client document queues are up to date.</div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CADocumentReviewPage;
