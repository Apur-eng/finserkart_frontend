import { Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Document Review & Audit Desk
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Examine applicant proofs, legal deeds, and identity documents. Approve compliant attachments or flag filing defects.
        </p>
      </Surface>

      {/* Filter and Search Bar */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "1rem", alignItems: 'center', justifyContent: 'space-between' }}>
          <Surface style={{ flex: '1', minWidth: "min(100%, 17.5rem)", maxWidth: "26.25rem" }}>
            <Field
              label="Search Documents"
              placeholder="Search by document name, application ID, or client..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.5rem" }}>
            {(['All', 'Pending Review', 'Approved', 'Defective / Rejected'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "1rem",
                  border: activeTab === tab ? "0.0625rem solid #7c3aed" : "0.0625rem solid #cbd5e1",
                  background: activeTab === tab ? "#f5f3ff" : "var(--white)",
                  color: activeTab === tab ? "#7c3aed" : "var(--muted)",
                  fontSize: "0.8125rem",
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
      </Panel>

      {/* Documents Review List */}
      <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.875rem" }}>
        {filteredDocs.map((doc) => (
          <Panel
            key={doc.id}
            elevation="low"
            padding={4}
            style={{
              borderRadius: "1rem",
              border: doc.status === 'Defective / Rejected' ? "0.0625rem solid #fecaca" : "0.0625rem solid #e2e8f0",
              background: "var(--white)",
            }}
          >
            <Surface style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: "1rem" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.875rem" }}>
                <Surface
                  style={{
                    width: "2.625rem",
                    height: "2.625rem",
                    borderRadius: "0.625rem",
                    background: "var(--cream)",
                    border: "0.0625rem solid var(--border)",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: "#7c3aed",
                  }}
                >
                  <FileText size={22} />
                </Surface>
                <Surface>
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                    <Inline style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>{doc.fileName}</Inline>
                    <Badge
                      label={doc.status}
                      variant={doc.status === 'Approved' ? 'green' : doc.status === 'Pending Review' ? 'orange' : 'red'}
                    />
                  </Surface>
                  <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                    Type: <strong>{doc.fileType}</strong> • {doc.fileSize} • Client: <strong style={{ color: "var(--navy)" }}>{doc.customerName}</strong> ({doc.serviceName} - #{doc.applicationId})
                  </Surface>
                  {doc.reviewNotes && (
                    <Surface style={{ fontSize: "0.8125rem", color: doc.status === 'Defective / Rejected' ? "#b91c1c" : "#15803d", marginTop: "0.25rem" }}>
                      <strong>Audit Note:</strong> {doc.reviewNotes}
                    </Surface>
                  )}
                </Surface>
              </Surface>

              {/* Action Buttons */}
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                <button
                  type="button"
                  title="Download File"
                  style={{
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.5rem",
                    border: "0.0625rem solid #cbd5e1",
                    background: "var(--white)",
                    cursor: 'pointer',
                    color: "var(--muted)",
                    fontSize: "0.8125rem",
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: "0.25rem",
                  }}
                >
                  <Download size={14} /> Download
                </button>

                {doc.status !== 'Approved' && (
                  <button
                    type="button"
                    onClick={() => handleApprove(doc.id)}
                    style={{
                      padding: "0.5rem 0.875rem",
                      borderRadius: "0.5rem",
                      border: "0.0625rem solid #a7f3d0",
                      background: "#ecfdf5",
                      color: "var(--teal)",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: "0.25rem",
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
                      padding: "0.5rem 0.875rem",
                      borderRadius: "0.5rem",
                      border: "0.0625rem solid #fecaca",
                      background: "#fff1f2",
                      color: "#e11d48",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: "0.25rem",
                    }}
                  >
                    <XCircle size={14} /> Flag Defect
                  </button>
                )}
              </Surface>
            </Surface>
          </Panel>
        ))}

        {filteredDocs.length === 0 && (
          <Panel elevation="low" padding={6} style={{ textAlign: 'center', borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <FileText size={28} color="#687d93" style={{ margin: "0 auto 0.75rem" }} />
            <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>No documents matching filters</Surface>
            <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.25rem" }}>All client document queues are up to date.</Surface>
          </Panel>
        )}
      </Surface>
    </Surface>
  );
};

export default CADocumentReviewPage;
