import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Document Monitoring &amp; Verification Flow
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Track applicant documentation uploads, identify verification bottlenecks, and clear proofs for statutory filing.
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
            {(['All', 'Pending Review', 'Verified'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                style={{
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                  borderRadius: "var(--radius-fsk-28)",
                  border: filter === tab ? "var(--spacing-fsk-22) solid var(--color-fsk-54)" : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                  background: filter === tab ? "var(--color-fsk-66)" : "var(--color-fsk-38)",
                  color: filter === tab ? "var(--color-fsk-54)" : "var(--color-fsk-18)",
                  fontSize: "var(--font-fsk-14)",
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
      </Card>

      {/* Documents List */}
      <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-8)" }}>
        {filtered.map((doc) => (
          <Card
            key={doc.id}
            elevation="low"
            padding={4}
            style={{
              borderRadius: "var(--radius-fsk-28)",
              border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
              background: "var(--color-fsk-38)",
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: "var(--spacing-fsk-5)",
            }}
          >
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-8)" }}>
              <Surface
                style={{
                  width: "var(--spacing-fsk-67)",
                  height: "var(--spacing-fsk-67)",
                  borderRadius: "var(--radius-fsk-68)",
                  background: doc.verificationStatus === 'Verified' ? "var(--color-fsk-64)" : "var(--color-fsk-66)",
                  color: doc.verificationStatus === 'Verified' ? "var(--color-fsk-65)" : "var(--color-fsk-54)",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileText size={20} />
              </Surface>
              <Surface>
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
                  <Inline style={{ fontSize: "var(--font-fsk-91)", fontWeight: 700, color: "var(--color-fsk-7)" }}>{doc.docName}</Inline>
                  <Badge
                    label={doc.verificationStatus}
                    variant={doc.verificationStatus === 'Verified' ? 'green' : 'orange'}
                  />
                </Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
                  {doc.docType} • Application: <strong style={{ color: "var(--color-fsk-7)" }}>{doc.serviceName} (#{doc.applicationId})</strong> • Client: {doc.customerName}
                </Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)" }}>
                  Uploaded {doc.uploadedAt} • Assigned to: {doc.assignedCA}
                </Surface>
              </Surface>
            </Surface>

            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
              <button
                type="button"
                title="Download Proof"
                style={{
                  padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                  borderRadius: "var(--radius-fsk-42)",
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
                <Download size={13} /> View
              </button>

              {doc.verificationStatus !== 'Verified' && (
                <button
                  type="button"
                  onClick={() => handleVerify(doc.id)}
                  style={{
                    padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                    borderRadius: "var(--radius-fsk-42)",
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
                  <CheckCircle2 size={13} /> Mark Verified
                </button>
              )}
            </Surface>
          </Card>
        ))}
      </Surface>
    </Surface>
  );
};

export default CoordinatorDocumentMonitoringPage;
