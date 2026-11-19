import { Surface, Inline } from '../../components/Surface';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-124)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <button
          type="button"
          onClick={() => navigate('/customer/documents')}
          style={{
            background: 'none',
            border: 'none',
            color: "var(--color-fsk-15)",
            fontSize: "var(--font-fsk-14)",
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-17)",
            padding: 0,
            marginBottom: "var(--spacing-fsk-8)",
          }}
        >
          <ArrowLeft size={16} /> Back to Document Centre
        </button>

        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Upload Documents
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Attach identification documents, premises proofs, and filings for verification by your assigned Chartered Accountant.
        </p>
      </Surface>

      {isSuccess ? (
        <Card elevation="low" padding={6} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-125)", background: "var(--color-fsk-75)", textAlign: 'center' }}>
          <Surface style={{ width: "var(--spacing-fsk-93)", height: "var(--spacing-fsk-93)", borderRadius: '50%', background: "var(--color-fsk-116)", color: "var(--color-fsk-39)", display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "0 auto var(--spacing-fsk-5) auto" }}>
            <CheckCircle2 size={32} />
          </Surface>

          <Heading level={2}>
            <Inline style={{ fontSize: "var(--font-fsk-83)", fontWeight: 800, color: "var(--color-fsk-126)" }}>
              Documents Uploaded Successfully!
            </Inline>
          </Heading>

          <p style={{ color: "var(--color-fsk-103)", fontSize: "var(--font-fsk-91)", maxWidth: "var(--spacing-fsk-127)", margin: "var(--spacing-fsk-8) auto var(--spacing-fsk-26) auto", lineHeight: 1.6 }}>
            {stagedFiles.length} document(s) uploaded and queued for inspection by the verification desk for application <strong>{selectedAppId}</strong>.
          </p>

          <Surface style={{ display: 'flex', justifyContent: 'center', gap: "var(--spacing-fsk-5)" }}>
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
          </Surface>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-26)" }}>
            <VStack gap={4}>
              {/* Service Application Selector */}
              <Surface>
                <label style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)", display: 'block', marginBottom: "var(--spacing-fsk-17)" }}>
                  Target Application
                </label>
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: "var(--spacing-fsk-35) var(--spacing-fsk-23)",
                    borderRadius: "var(--radius-fsk-37)",
                    border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                    fontSize: "var(--font-fsk-24)",
                    color: "var(--color-fsk-7)",
                    background: "var(--color-fsk-38)",
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
                <label style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)", display: 'block', marginBottom: "var(--spacing-fsk-17)" }}>
                  Document Category
                </label>
                <Surface style={{ display: 'flex', flexWrap: 'wrap', gap: "var(--spacing-fsk-12)" }}>
                  {categories.map((cat) => {
                    const isSelected = docCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setDocCategory(cat)}
                        style={{
                          padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                          borderRadius: "var(--radius-fsk-37)",
                          border: isSelected ? "var(--spacing-fsk-22) solid var(--color-fsk-162)" : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                          background: isSelected ? "var(--color-fsk-112)" : "var(--color-fsk-38)",
                          color: isSelected ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
                          fontSize: "var(--font-fsk-14)",
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
                  border: "var(--spacing-fsk-47) dashed var(--color-fsk-15)",
                  borderRadius: "var(--radius-fsk-28)",
                  background: "var(--color-fsk-27)",
                  padding: "var(--spacing-fsk-122) var(--spacing-fsk-2)",
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                <Surface style={{ width: "var(--spacing-fsk-128)", height: "var(--spacing-fsk-128)", borderRadius: '50%', background: "var(--color-fsk-112)", color: "var(--color-fsk-15)", display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "0 auto var(--spacing-fsk-8) auto" }}>
                  <UploadCloud size={24} />
                </Surface>
                <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                  Click to Browse or Drag &amp; Drop Files Here
                </Surface>
                <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-29)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
                  Supported formats: PDF, JPG, PNG (Maximum file size: 10 MB per file)
                </p>
              </Surface>

              {/* Staged Uploads List */}
              {stagedFiles.length > 0 && (
                <Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-35)" }}>
                    Staged for Upload ({stagedFiles.length})
                  </Surface>

                  <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-12)" }}>
                    {stagedFiles.map((file, idx) => (
                      <Surface
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: "var(--spacing-fsk-35) var(--spacing-fsk-23)",
                          borderRadius: "var(--radius-fsk-37)",
                          background: "var(--color-fsk-46)",
                          border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
                        }}
                      >
                        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                          <FileText size={18} color="var(--color-fsk-15)" />
                          <Surface>
                            <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                              {file.name}
                            </Surface>
                            <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
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
                            color: "var(--color-fsk-129)",
                            padding: "var(--spacing-fsk-29)",
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </Surface>
                    ))}
                  </Surface>
                </Surface>
              )}

              {/* Submit Button */}
              <Surface style={{ marginTop: "var(--spacing-fsk-12)" }}>
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
              </Surface>
            </VStack>
          </Card>
        </form>
      )}
    </Surface>
  );
};

export default DocumentUploadPage;
