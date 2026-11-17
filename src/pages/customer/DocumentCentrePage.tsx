import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '16px',
        }}
      >
        <div>
          <Heading level={1}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Document Centre
            </span>
          </Heading>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
            Central repository for your identity proofs, business premises records, and official government deliverable certificates.
          </p>
        </div>

        <Button
          label="Upload Document"
          variant="primary"
          size="md"
          icon={<UploadCloud size={16} />}
          onClick={() => navigate('/customer/documents/upload')}
        />
      </div>

      {/* Filter and Search Card */}
      <Card elevation="low" padding={4} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: isActive ? '1px solid #0066cc' : '1px solid #e2e8f0',
                    background: isActive ? '#e0f2fe' : '#ffffff',
                    color: isActive ? '#0066cc' : '#475569',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <span>{tab === 'Deliverable' ? 'Government Certificates' : tab}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      background: isActive ? '#0066cc' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#64748b',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div style={{ width: '280px' }}>
            <TextInput
              label="Search files"
              placeholder="Search by filename or ID..."
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              width="100%"
            />
          </div>
        </div>
      </Card>

      {/* Documents Table */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 16px' }}>Document Name</th>
                <th style={{ padding: '14px 16px' }}>Application ID &amp; Service</th>
                <th style={{ padding: '14px 16px' }}>Type</th>
                <th style={{ padding: '14px 16px' }}>File Size</th>
                <th style={{ padding: '14px 16px' }}>Uploaded On</th>
                <th style={{ padding: '14px 16px' }}>Verification Status</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: doc.status === 'Deliverable' ? '#dcfce7' : '#e0f2fe', color: doc.status === 'Deliverable' ? '#16a34a' : '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {doc.status === 'Deliverable' ? <FileCheck size={18} /> : <FileText size={18} />}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{doc.fileName}</div>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>DOC-ID: {doc.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 600, color: '#0066cc' }}>{doc.applicationId}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{doc.serviceName}</div>
                  </td>
                  <td style={{ padding: '16px', color: '#475569' }}>
                    {doc.fileType}
                  </td>
                  <td style={{ padding: '16px', color: '#64748b', fontSize: '13px' }}>
                    {doc.fileSize}
                  </td>
                  <td style={{ padding: '16px', color: '#475569', fontSize: '13px' }}>
                    {doc.uploadDate}
                  </td>
                  <td style={{ padding: '16px' }}>
                    {getDocStatusBadge(doc.status)}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <a
                      href={doc.downloadUrl}
                      download
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        color: '#0066cc',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Download size={14} /> Download
                    </a>
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

export default DocumentCentrePage;
