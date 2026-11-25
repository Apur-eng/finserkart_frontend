import { ActionButton, Panel, Title, Stack } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
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
    <Surface style={{ maxWidth: "56.25rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <button
          type="button"
          onClick={() => navigate('/customer/documents')}
          style={{
            background: 'none',
            border: 'none',
            color: "var(--blue)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: "0.375rem",
            padding: 0,
            marginBottom: "0.75rem",
          }}
        >
          <ArrowLeft size={16} /> Back to Document Centre
        </button>

        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Upload Documents
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Attach identification documents, premises proofs, and filings for verification by your assigned Chartered Accountant.
        </p>
      </Surface>

      {isSuccess ? (
        <Panel elevation="low" padding={6} style={{ borderRadius: "1rem", border: "0.0625rem solid #bbf7d0", background: "#f0fdf4", textAlign: 'center' }}>
          <Surface style={{ width: "3.5rem", height: "3.5rem", borderRadius: '50%', background: "#dcfce7", color: "#16a34a", display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "0 auto 1rem auto" }}>
            <CheckCircle2 size={32} />
          </Surface>

          <Title level={2}>
            <Inline style={{ fontSize: "1.375rem", fontWeight: 800, color: "#166534" }}>
              Documents Uploaded Successfully!
            </Inline>
          </Title>

          <p style={{ color: "#15803d", fontSize: "0.90625rem", maxWidth: "36.25rem", margin: "0.75rem auto 1.5rem auto", lineHeight: 1.6 }}>
            {stagedFiles.length} document(s) uploaded and queued for inspection by the verification desk for application <strong>{selectedAppId}</strong>.
          </p>

          <Surface style={{ display: 'flex', justifyContent: 'center', gap: "1rem" }}>
            <ActionButton
              label="Return to Document Centre"
              variant="primary"
              size="md"
              onClick={() => navigate('/customer/documents')}
            />
            <ActionButton
              label="Track Application"
              variant="secondary"
              size="md"
              onClick={() => navigate(`/customer/applications/${selectedAppId}/tracker`)}
            />
          </Surface>
        </Panel>
      ) : (
        <form onSubmit={handleSubmit}>
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "1.5rem" }}>
            <Stack gap={4}>
              {/* Service Application Selector */}
              <Surface>
                <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)", display: 'block', marginBottom: "0.375rem" }}>
                  Target Application
                </label>
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: "0.625rem 0.875rem",
                    borderRadius: "0.5rem",
                    border: "0.0625rem solid #cbd5e1",
                    fontSize: "0.875rem",
                    color: "var(--navy)",
                    background: "var(--white)",
                    outline: 'none',
                  }}
                >
                  {applications.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.id} - {app.serviceName} ({app.status})
                    </option>
                  ))}
                </select>
              </Surface>

              {/* Document Category Selector */}
              <Surface>
                <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)", display: 'block', marginBottom: "0.375rem" }}>
                  Document Category
                </label>
                <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "0.5rem" }}>
                  {categories.map((cat) => {
                    const isSelected = docCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setDocCategory(cat)}
                        style={{
                          padding: "0.375rem 0.75rem",
                          borderRadius: "0.5rem",
                          border: isSelected ? "0.0625rem solid var(--blue)" : "0.0625rem solid #cbd5e1",
                          background: isSelected ? "#e0f2fe" : "var(--white)",
                          color: isSelected ? "var(--blue)" : "var(--muted)",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </Surface>
              </Surface>

              {/* Dropzone Container */}
              <Surface
                onClick={handleSimulatedAddFile}
                style={{
                  border: "0.125rem dashed var(--blue)",
                  borderRadius: "1rem",
                  background: "var(--cream)",
                  padding: "clamp(1rem, 2.769230769230769vw, 2.25rem) 1.25rem",
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                <Surface style={{ width: "3rem", height: "3rem", borderRadius: '50%', background: "#e0f2fe", color: "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "0 auto 0.75rem auto" }}>
                  <UploadCloud size={24} />
                </Surface>
                <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>
                  Click to Browse or Drag &amp; Drop Files Here
                </Surface>
                <p style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.25rem", margin: "0.25rem 0 0 0" }}>
                  Supported formats: PDF, JPG, PNG (Maximum file size: 10 MB per file)
                </p>
              </Surface>

              {/* Staged Uploads List */}
              {stagedFiles.length > 0 && (
                <Surface>
                  <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.625rem" }}>
                    Staged for Upload ({stagedFiles.length})
                  </Surface>

                  <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.5rem" }}>
                    {stagedFiles.map((file, idx) => (
                      <Surface
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: "0.625rem 0.875rem",
                          borderRadius: "0.5rem",
                          background: "var(--sage-light)",
                          border: "0.0625rem solid var(--border)",
                        }}
                      >
                        <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                          <FileText size={18} color="var(--blue)" />
                          <Surface>
                            <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)" }}>
                              {file.name}
                            </Surface>
                            <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
                              {file.size} • Category: {file.type}
                            </Surface>
                          </Surface>
                        </Surface>

                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: "#ef4444",
                            padding: "0.25rem",
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </Surface>
                    ))}
                  </Surface>
                </Surface>
              )}

              {/* Submit ActionButton */}
              <Surface style={{ marginTop: "0.5rem" }}>
                <ActionButton
                  label={isUploading ? 'Uploading to Verification Desk...' : `Upload ${stagedFiles.length} Document(s)`}
                  variant="primary"
                  size="md"
                  width="100%"
                  type="submit"
                  isLoading={isUploading}
                  isDisabled={stagedFiles.length === 0}
                  icon={<UploadCloud size={16} />}
                />
              </Surface>
            </Stack>
          </Panel>
        </form>
      )}
    </Surface>
  );
};

export default DocumentUploadPage;
