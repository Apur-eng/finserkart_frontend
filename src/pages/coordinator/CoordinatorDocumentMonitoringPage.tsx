import { Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Document Monitoring &amp; Verification Flow
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Track applicant documentation uploads, identify verification bottlenecks, and clear proofs for statutory filing.
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
            {(['All', 'Pending Review', 'Verified'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "1rem",
                  border: filter === tab ? "0.0625rem solid #d97706" : "0.0625rem solid #cbd5e1",
                  background: filter === tab ? "#fffbeb" : "var(--white)",
                  color: filter === tab ? "#d97706" : "var(--muted)",
                  fontSize: "0.8125rem",
                  fontWeight: filter === tab ? 600 : 500,
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

      {/* Documents List */}
      <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.75rem" }}>
        {filtered.map((doc) => (
          <Panel
            key={doc.id}
            elevation="low"
            padding={4}
            style={{
              borderRadius: "1rem",
              border: "0.0625rem solid var(--border)",
              background: "var(--white)",
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: "1rem",
            }}
          >
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.75rem" }}>
              <Surface
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "0.625rem",
                  background: doc.verificationStatus === 'Verified' ? "#ecfdf5" : "#fffbeb",
                  color: doc.verificationStatus === 'Verified' ? "var(--teal)" : "#d97706",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileText size={20} />
              </Surface>
              <Surface>
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                  <Inline style={{ fontSize: "0.90625rem", fontWeight: 700, color: "var(--navy)" }}>{doc.docName}</Inline>
                  <Badge
                    label={doc.verificationStatus}
                    variant={doc.verificationStatus === 'Verified' ? 'green' : 'orange'}
                  />
                </Surface>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                  {doc.docType} • Application: <strong style={{ color: "var(--navy)" }}>{doc.serviceName} (#{doc.applicationId})</strong> • Client: {doc.customerName}
                </Surface>
                <Surface style={{ fontSize: "0.8125rem", color: "#687d93" }}>
                  Uploaded {doc.uploadedAt} • Assigned to: {doc.assignedCA}
                </Surface>
              </Surface>
            </Surface>

            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
              <button
                type="button"
                title="Download Proof"
                style={{
                  padding: "0.375rem 0.75rem",
                  borderRadius: "0.375rem",
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
                <Download size={13} /> View
              </button>

              {doc.verificationStatus !== 'Verified' && (
                <button
                  type="button"
                  onClick={() => handleVerify(doc.id)}
                  style={{
                    padding: "0.375rem 0.875rem",
                    borderRadius: "0.375rem",
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
                  <CheckCircle2 size={13} /> Mark Verified
                </button>
              )}
            </Surface>
          </Panel>
        ))}
      </Surface>
    </Surface>
  );
};

export default CoordinatorDocumentMonitoringPage;
