import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto' }}>
      {/* Header */}
      <Surface
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: "var(--spacing-fsk-26)",
          gap: "var(--spacing-fsk-5)",
        }}
      >
        <Surface>
          <Heading level={1}>
            <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
              Document Centre
            </Inline>
          </Heading>
          <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
            Central repository for your identity proofs, business premises records, and official government deliverable certificates.
          </p>
        </Surface>

        <Button
          label="Upload Document"
          variant="primary"
          size="md"
          icon={<UploadCloud size={16} />}
          onClick={() => navigate('/customer/documents/upload')}
        />
      </Surface>

      {/* Filter and Search Card */}
      <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
        <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-5)", justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Tabs */}
          <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-12)" }}>
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
                    gap: "var(--spacing-fsk-17)",
                    padding: "var(--spacing-fsk-12) var(--spacing-fsk-23)",
                    borderRadius: "var(--radius-fsk-37)",
                    border: isActive ? "var(--spacing-fsk-22) solid var(--color-fsk-162)" : "var(--spacing-fsk-22) solid var(--color-fsk-163)",
                    background: isActive ? "var(--color-fsk-112)" : "var(--color-fsk-38)",
                    color: isActive ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
                    fontSize: "var(--font-fsk-14)",
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Inline>{tab === 'Deliverable' ? 'Government Certificates' : tab}</Inline>
                  <Inline
                    style={{
                      fontSize: "var(--font-fsk-14)",
                      padding: "var(--spacing-fsk-22) var(--spacing-fsk-17)",
                      borderRadius: "var(--radius-fsk-68)",
                      background: isActive ? "var(--color-fsk-15)" : "var(--color-fsk-46)",
                      color: isActive ? "var(--color-fsk-38)" : "var(--color-fsk-9)",
                    }}
                  >
                    {count}
                  </Inline>
                </button>
              );
            })}
          </Surface>

          {/* Search Box */}
          <Surface style={{ width: "var(--spacing-fsk-45)" }}>
            <TextInput
              label="Search files"
              placeholder="Search by filename or ID..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </Surface>
        </Surface>
      </Card>

      {/* Documents Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ background: "var(--color-fsk-27)", borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontWeight: 600, fontSize: "var(--font-fsk-14)", textTransform: 'uppercase' }}>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Document Name</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Application ID &amp; Service</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Type</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>File Size</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Uploaded On</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>Verification Status</th>
                <th style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-5)" }}>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                      <Surface style={{ width: "var(--spacing-fsk-52)", height: "var(--spacing-fsk-52)", borderRadius: "var(--radius-fsk-37)", background: doc.status === 'Deliverable' ? "var(--color-fsk-116)" : "var(--color-fsk-112)", color: doc.status === 'Deliverable' ? "var(--color-fsk-39)" : "var(--color-fsk-15)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {doc.status === 'Deliverable' ? <FileCheck size={18} /> : <FileText size={18} />}
                      </Surface>
                      <Surface>
                        <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)" }}>{doc.fileName}</Surface>
                        <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>DOC-ID: {doc.id}</Surface>
                      </Surface>
                    </Surface>
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)" }}>
                    <Surface style={{ fontWeight: 600, color: "var(--color-fsk-15)" }}>{doc.applicationId}</Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{doc.serviceName}</Surface>
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)", color: "var(--color-fsk-18)" }}>
                    {doc.fileType}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)", color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)" }}>
                    {doc.fileSize}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)", color: "var(--color-fsk-18)", fontSize: "var(--font-fsk-14)" }}>
                    {doc.uploadDate}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)" }}>
                    {getDocStatusBadge(doc.status)}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-5)", textAlign: 'right' }}>
                    <a
                      href={doc.downloadUrl}
                      download
                      style={{
                        padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                        borderRadius: "var(--radius-fsk-42)",
                        border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                        background: "var(--color-fsk-38)",
                        color: "var(--color-fsk-15)",
                        fontSize: "var(--font-fsk-14)",
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: "var(--spacing-fsk-17)",
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
      </Card>
    </Surface>
  );
};

export default DocumentCentrePage;
