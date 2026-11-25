import { ActionButton, Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import {
  Download,
  FileCheck,
  FileText,
  UploadCloud
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CustomerDocument } from '../../features/customer/customerData';
import { INITIAL_DOCUMENTS } from '../../features/customer/customerData';

export const DocumentCentrePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'All' | 'Verified' | 'Deliverable' | 'Under Review'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = useMemo(() => {
    return INITIAL_DOCUMENTS.filter((doc) => {
      const matchesTab =
        activeTab === 'All' ? true : doc.status === activeTab;
      const matchesSearch =
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.applicationId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const getDocStatusBadge = (status: CustomerDocument['status']) => {
    switch (status) {
      case 'Deliverable':
        return <Badge label="Official Deliverable" variant="green" />;
      case 'Verified':
        return <Badge label="Verified by CA" variant="blue" />;
      case 'Under Review':
        return <Badge label="Under Review" variant="orange" />;
      case 'Rejected':
        return <Badge label="Resubmission Required" variant="red" />;
      default:
        return <Badge label={status} variant="neutral" />;
    }
  };

  return (
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        <Surface>
          <Title level={1}>
            <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
              Document Centre
            </Inline>
          </Title>
          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
            Central repository for your identity proofs, business premises records, and official government deliverable certificates.
          </p>
        </Surface>

        <ActionButton
          label="Upload Document"
          variant="primary"
          size="md"
          icon={<UploadCloud size={16} />}
          onClick={() => navigate('/customer/documents/upload')}
        />
      </Surface>

      {/* Filter and Search Panel */}
      <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "1rem", justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Tabs */}
          <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "0.5rem" }}>
            {(['All', 'Deliverable', 'Verified', 'Under Review'] as const).map((tab) => {
              const isActive = activeTab === tab;
              const count =
                tab === 'All'
                  ? INITIAL_DOCUMENTS.length
                  : INITIAL_DOCUMENTS.filter((d) => d.status === tab).length;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: "0.375rem",
                    padding: "0.5rem 0.875rem",
                    borderRadius: "0.5rem",
                    border: isActive ? "0.0625rem solid var(--blue)" : "0.0625rem solid #e2e8f0",
                    background: isActive ? "#e0f2fe" : "var(--white)",
                    color: isActive ? "var(--blue)" : "var(--muted)",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Inline>{tab === 'Deliverable' ? 'Government Certificates' : tab}</Inline>
                  <Inline
                    style={{
                      fontSize: "0.8125rem",
                      padding: "0.0625rem 0.375rem",
                      borderRadius: "0.625rem",
                      background: isActive ? "var(--blue)" : "var(--sage-light)",
                      color: isActive ? "var(--white)" : "var(--muted)",
                    }}
                  >
                    {count}
                  </Inline>
                </button>
              );
            })}
          </Surface>

          {/* Search Box */}
          <Surface style={{ width: "17.5rem" }}>
            <Field
              label="Search files"
              placeholder="Search by filename or ID..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>
        </Surface>
      </Panel>

      {/* Documents Table */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ background: "var(--cream)", borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontWeight: 600, fontSize: "0.8125rem", textTransform: 'uppercase' }}>
                <th style={{ padding: "0.875rem 1rem" }}>Document Name</th>
                <th style={{ padding: "0.875rem 1rem" }}>Application ID &amp; Service</th>
                <th style={{ padding: "0.875rem 1rem" }}>Type</th>
                <th style={{ padding: "0.875rem 1rem" }}>File Size</th>
                <th style={{ padding: "0.875rem 1rem" }}>Uploaded On</th>
                <th style={{ padding: "0.875rem 1rem" }}>Verification Status</th>
                <th style={{ padding: "0.875rem 1rem", textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "1rem" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                      <Surface style={{ width: "2.125rem", height: "2.125rem", borderRadius: "0.5rem", background: doc.status === 'Deliverable' ? "#dcfce7" : "#e0f2fe", color: doc.status === 'Deliverable' ? "#16a34a" : "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {doc.status === 'Deliverable' ? <FileCheck size={18} /> : <FileText size={18} />}
                      </Surface>
                      <Surface>
                        <Surface style={{ fontWeight: 700, color: "var(--navy)" }}>{doc.fileName}</Surface>
                        <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>DOC-ID: {doc.id}</Surface>
                      </Surface>
                    </Surface>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--blue)" }}>{doc.applicationId}</Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{doc.serviceName}</Surface>
                  </td>
                  <td style={{ padding: "1rem", color: "var(--muted)" }}>
                    {doc.fileType}
                  </td>
                  <td style={{ padding: "1rem", color: "var(--muted)", fontSize: "0.8125rem" }}>
                    {doc.fileSize}
                  </td>
                  <td style={{ padding: "1rem", color: "var(--muted)", fontSize: "0.8125rem" }}>
                    {doc.uploadDate}
                  </td>
                  <td style={{ padding: "1rem" }}>
                    {getDocStatusBadge(doc.status)}
                  </td>
                  <td style={{ padding: "1rem", textAlign: 'right' }}>
                    <a
                      href={doc.downloadUrl}
                      download
                      style={{
                        padding: "0.375rem 0.75rem",
                        borderRadius: "0.375rem",
                        border: "0.0625rem solid #cbd5e1",
                        background: "var(--white)",
                        color: "var(--blue)",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: "0.375rem",
                      }}
                    >
                      <Download size={14} /> Download
                    </a>
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

export default DocumentCentrePage;
