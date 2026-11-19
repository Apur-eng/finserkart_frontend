import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Document Review & Audit Desk
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Examine applicant proofs, legal deeds, and identity documents. Approve compliant attachments or flag filing defects.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, var(--spacing-fsk-45))", maxWidth: "var(--spacing-fsk-50)" }}>
            <TextInput
              label="Search Documents"
              placeholder="Search by document name, application ID, or client..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)" }}>
            {(['All', 'Pending Review', 'Approved', 'Defective / Rejected'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  borderRadius: "var(--radius-fsk-28)",
                  border: activeTab === tab ? "var(--spacing-fsk-22) solid var(--color-fsk-41)" : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                  background: activeTab === tab ? "var(--color-fsk-53)" : "var(--color-fsk-38)",
                  color: activeTab === tab ? "var(--color-fsk-41)" : "var(--color-fsk-18)",
                  fontSize: "var(--font-fsk-14)",
                  fontWeight: activeTab === tab ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab}
              </button>
            ))}
          </Surface>
        </Surface>
      </Card>

      {/* Documents Review List */}
      <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-23)" }}>
        {filteredDocs.map((doc) => (
          <Card
            key={doc.id}
            elevation="low"
            padding={4}
            style={{
              borderRadius: "var(--radius-fsk-28)",
              border: doc.status === 'Defective / Rejected' ? "var(--spacing-fsk-22) solid var(--color-fsk-58)" : "var(--spacing-fsk-22) solid var(--color-fsk-163)",
              background: "var(--color-fsk-38)",
            }}
          >
            <Surface style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: "var(--spacing-fsk-5)" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-23)" }}>
                <Surface
                  style={{
                    width: "var(--spacing-fsk-76)",
                    height: "var(--spacing-fsk-76)",
                    borderRadius: "var(--radius-fsk-68)",
                    background: "var(--color-fsk-27)",
                    border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: "var(--color-fsk-41)",
                  }}
                >
                  <FileText size={22} />
                </Surface>
                <Surface>
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
                    <Inline style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>{doc.fileName}</Inline>
                    <Badge
                      label={doc.status}
                      variant={doc.status === 'Approved' ? 'green' : doc.status === 'Pending Review' ? 'orange' : 'red'}
                    />
                  </Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
                    Type: <strong>{doc.fileType}</strong> • {doc.fileSize} • Client: <strong style={{ color: "var(--color-fsk-7)" }}>{doc.customerName}</strong> ({doc.serviceName} - #{doc.applicationId})
                  </Surface>
                  {doc.reviewNotes && (
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: doc.status === 'Defective / Rejected' ? "var(--color-fsk-60)" : "var(--color-fsk-103)", marginTop: "var(--spacing-fsk-29)" }}>
                      <strong>Audit Note:</strong> {doc.reviewNotes}
                    </Surface>
                  )}
                </Surface>
              </Surface>

              {/* Action Buttons */}
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
                <button
                  type="button"
                  title="Download File"
                  style={{
                    padding: "var(--spacing-fsk-12) var(--spacing-fsk-8)",
                    borderRadius: "var(--radius-fsk-37)",
                    border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                    background: "var(--color-fsk-38)",
                    cursor: 'pointer',
                    color: "var(--color-fsk-18)",
                    fontSize: "var(--font-fsk-14)",
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: "var(--spacing-fsk-29)",
                  }}
                >
                  <Download size={14} /> Download
                </button>

                {doc.status !== 'Approved' && (
                  <button
                    type="button"
                    onClick={() => handleApprove(doc.id)}
                    style={{
                      padding: "var(--spacing-fsk-12) var(--spacing-fsk-23)",
                      borderRadius: "var(--radius-fsk-37)",
                      border: "var(--spacing-fsk-22) solid var(--color-fsk-81)",
                      background: "var(--color-fsk-64)",
                      color: "var(--color-fsk-65)",
                      fontSize: "var(--font-fsk-14)",
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: "var(--spacing-fsk-29)",
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
                      padding: "var(--spacing-fsk-12) var(--spacing-fsk-23)",
                      borderRadius: "var(--radius-fsk-37)",
                      border: "var(--spacing-fsk-22) solid var(--color-fsk-58)",
                      background: "var(--color-fsk-80)",
                      color: "var(--color-fsk-104)",
                      fontSize: "var(--font-fsk-14)",
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: "var(--spacing-fsk-29)",
                    }}
                  >
                    <XCircle size={14} /> Flag Defect
                  </button>
                )}
              </Surface>
            </Surface>
          </Card>
        ))}

        {filteredDocs.length === 0 && (
          <Card elevation="low" padding={6} style={{ textAlign: 'center', borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <FileText size={28} color="var(--color-fsk-57)" style={{ margin: "0 auto var(--spacing-fsk-8)" }} />
            <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>No documents matching filters</Surface>
            <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-29)" }}>All client document queues are up to date.</Surface>
          </Card>
        )}
      </Surface>
    </Surface>
  );
};

export default CADocumentReviewPage;
