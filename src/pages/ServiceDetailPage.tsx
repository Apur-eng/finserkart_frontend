import { Badge } from '@astryxdesign/core/Badge';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Spinner } from '@astryxdesign/core/Spinner';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { AlertCircle, ArrowLeft, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useService } from '../features/services/useServices';
import { formatCurrency, parseDocuments, parseTerms } from '../utils/formatters';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: service, isLoading, isError } = useService(id);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '16px' }}>
        <Spinner />
        <span style={{ color: '#64748b', fontSize: '15px' }}>Loading service details...</span>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div style={{ maxWidth: '640px', margin: '80px auto', padding: '32px', textAlign: 'center', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <AlertCircle size={48} color="#ef4444" style={{ marginBottom: '16px' }} />
        <Heading level={2}>Service Not Found</Heading>
        <p style={{ color: '#64748b', margin: '12px 0 24px 0' }}>
          The requested service could not be located in the current Finservkart catalogue.
        </p>
        <Button label="Back to All Services" variant="primary" onClick={() => navigate('/services')} />
      </div>
    );
  }

  const documents = parseDocuments(service.required_documents);
  const terms = parseTerms(service.terms);
  const servicePrice = parseFloat(service.service_price || '0');
  const govtFees = parseFloat(service.govt_fees || '0');
  const totalAmount = parseFloat(service.total_amt || String(servicePrice + govtFees));

  const imageUrl = service.service_image
    ? `/services/${service.service_image}`
    : '/services/service-1.jpg';

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 20px 80px 20px' }}>
      {/* Back Button */}
      <div style={{ marginBottom: '24px' }}>
        <Button
          label="Back to Services"
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={() => navigate('/services')}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px' }}>
        {/* Left Column: Image & Document Checklist */}
        <div>
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              height: '320px',
              width: '100%',
              boxShadow: '0 8px 30px rgba(0, 102, 204, 0.12)',
              marginBottom: '32px',
              backgroundColor: '#f1f5f9',
            }}
          >
            <img
              src={imageUrl}
              alt={service.service_name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/services/service-1.jpg';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Required Documents Section */}
          <Card elevation="low" padding={4}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <FileText size={22} color="#0066cc" />
              <Heading level={3}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
                  Required Documents Checklist
                </span>
              </Heading>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
              Please prepare the following documents. You will upload these during the application process:
            </p>

            <VStack gap={3}>
              {documents.map((doc, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '14px', color: '#1e293b', fontWeight: 500, lineHeight: 1.4 }}>
                    {doc}
                  </span>
                </div>
              ))}
            </VStack>
          </Card>
        </div>

        {/* Right Column: Pricing, Terms, Application CTA */}
        <div>
          <div style={{ marginBottom: '12px' }}>
            <Badge label="Verified Financial Service" variant="green" />
          </div>

          <Heading level={1}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
              {service.service_name}
            </span>
          </Heading>

          <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: '16px 0 24px 0' }}>
            Professional service execution handled directly through our verified Chartered Accountant network and coordinator workflow engine.
          </p>

          {/* Transparent Pricing Card */}
          <Card elevation="med" padding={4}>
            <Heading level={3}>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'block' }}>
                Transparent Pricing Breakdown
              </span>
            </Heading>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#475569' }}>
                <span>Professional Net Fee:</span>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>{formatCurrency(servicePrice)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#475569' }}>
                <span>Government Statutory Fees:</span>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>
                  {govtFees > 0 ? formatCurrency(govtFees) : 'Included / ₹0'}
                </span>
              </div>

              <div style={{ height: '1px', background: '#e2e8f0', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Total Payable Amount:</span>
                <span style={{ fontSize: '28px', fontWeight: 800, color: '#0052a3' }}>
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>

            <Button
              label={`Apply for ${service.service_name}`}
              variant="primary"
              size="lg"
              width="100%"
              onClick={() => navigate(`/login?serviceId=${service.id}`)}
            />

            <div style={{ marginTop: '14px', textAlign: 'center' }}>
              <Text type="supporting">
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  Don't have an account?{' '}
                  <span
                    onClick={() => navigate('/register')}
                    style={{ color: '#0066cc', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Register free as a customer
                  </span>
                </span>
              </Text>
            </div>
          </Card>

          {/* Terms & Conditions Box */}
          {terms.length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <Banner status="info" title="Service Terms & Regulatory Disclosures">
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#1e3a8a', lineHeight: 1.5 }}>
                  {terms.map((term, i) => (
                    <li key={i}>{term}</li>
                  ))}
                </ul>
              </Banner>
            </div>
          )}

          {/* Assurance Box */}
          <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <ShieldCheck size={28} color="#10b981" />
            <div style={{ fontSize: '13px', color: '#475569' }}>
              <strong>100% Data Confidentiality Guarantee:</strong> Uploaded business proofs and identification are handled in compliance with Information Technology Act standards.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;

