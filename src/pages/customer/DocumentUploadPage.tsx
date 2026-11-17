import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { VStack } from '@astryxdesign/core/VStack';
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Trash2,
  UploadCloud
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_APPLICATIONS } from '../../features/customer/customerData';

interface StagedFile {
  name: string;
  size: string;
  type: string;
}

export const DocumentUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const applications = INITIAL_APPLICATIONS;

  const [selectedAppId, setSelectedAppId] = useState(applications[0].id);
  const [docCategory, setDocCategory] = useState('PAN Card');
  const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([
    { name: 'Rent_Agreement_Signed.pdf', size: '2.4 MB', type: 'Rent Agreement' },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    'PAN Card',
    'Aadhaar Card',
    'Bank Statement / Cheque',
    'Rent Agreement / Electricity Bill',
    'Board Resolution / NOC',
    'Other KYC Document',
  ];

  const handleSimulatedAddFile = () => {
    const demoFiles: StagedFile[] = [
      { name: 'NOC_Property_Owner.pdf', size: '1.6 MB', type: docCategory },
      { name: 'Bank_Statement_6Months.pdf', size: '3.1 MB', type: docCategory },
      { name: 'Board_Resolution_Director.pdf', size: '890 KB', type: docCategory },
    ];
    const next = demoFiles[stagedFiles.length % demoFiles.length];
    setStagedFiles((prev) => [...prev, next]);
  };

  const handleRemoveFile = (index: number) => {
    setStagedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stagedFiles.length === 0) return;

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => navigate('/customer/documents')}
          style={{
            background: 'none',
            border: 'none',
            color: '#0066cc',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0,
            marginBottom: '12px',
          }}
        >
          <ArrowLeft size={16} /> Back to Document Centre
        </button>

        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Upload Documents
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Attach identification documents, premises proofs, and filings for verification by your assigned Chartered Accountant.
        </p>
      </div>

      {isSuccess ? (
        <Card elevation="low" padding={6} style={{ borderRadius: '16px', border: '1px solid #bbf7d0', background: '#f0fdf4', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <CheckCircle2 size={32} />
          </div>

          <Heading level={2}>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#166534' }}>
              Documents Uploaded Successfully!
            </span>
          </Heading>

          <p style={{ color: '#15803d', fontSize: '14.5px', maxWidth: '580px', margin: '12px auto 24px auto', lineHeight: 1.6 }}>
            {stagedFiles.length} document(s) uploaded and queued for inspection by the verification desk for application <strong>{selectedAppId}</strong>.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Button
              label="Return to Document Centre"
              variant="primary"
              size="md"
              onClick={() => navigate('/customer/documents')}
            />
            <Button
              label="Track Application"
              variant="secondary"
              size="md"
              onClick={() => navigate(`/customer/applications/${selectedAppId}/tracker`)}
            />
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '24px' }}>
            <VStack gap={4}>
              {/* Service Application Selector */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                  Target Application
                </label>
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    color: '#0f172a',
                    background: '#ffffff',
                    outline: 'none',
                  }}
                >
                  {applications.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.id} - {app.serviceName} ({app.status})
                    </option>
                  ))}
                </select>
              </div>

              {/* Document Category Selector */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                  Document Category
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {categories.map((cat) => {
                    const isSelected = docCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setDocCategory(cat)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: isSelected ? '1px solid #0066cc' : '1px solid #cbd5e1',
                          background: isSelected ? '#e0f2fe' : '#ffffff',
                          color: isSelected ? '#0066cc' : '#475569',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dropzone Container */}
              <div
                onClick={handleSimulatedAddFile}
                style={{
                  border: '2px dashed #0066cc',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  padding: '36px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e0f2fe', color: '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                  <UploadCloud size={24} />
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                  Click to Browse or Drag &amp; Drop Files Here
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', margin: '4px 0 0 0' }}>
                  Supported formats: PDF, JPG, PNG (Maximum file size: 10 MB per file)
                </p>
              </div>

              {/* Staged Uploads List */}
              {stagedFiles.length > 0 && (
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                    Staged for Upload ({stagedFiles.length})
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {stagedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: '#f1f5f9',
                          border: '1px solid #e2e8f0',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <FileText size={18} color="#0066cc" />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                              {file.name}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>
                              {file.size} • Category: {file.type}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#ef4444',
                            padding: '4px',
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div style={{ marginTop: '8px' }}>
                <Button
                  label={isUploading ? 'Uploading to Verification Desk...' : `Upload ${stagedFiles.length} Document(s)`}
                  variant="primary"
                  size="md"
                  width="100%"
                  type="submit"
                  isLoading={isUploading}
                  isDisabled={stagedFiles.length === 0}
                  icon={<UploadCloud size={16} />}
                />
              </div>
            </VStack>
          </Card>
        </form>
      )}
    </div>
  );
};

export default DocumentUploadPage;
