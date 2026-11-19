import { Surface, Inline } from '../components/Surface';
import { StatusTag as Badge } from '../components/StatusTag';
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
      <Surface style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: "var(--spacing-fsk-138)", gap: "var(--spacing-fsk-5)" }}>
        <Spinner />
        <Inline style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-19)" }}>Loading service details...</Inline>
      </Surface>
    );
  }

  if (isError || !service) {
    return (
      <Surface style={{ maxWidth: "var(--spacing-fsk-11)", margin: "var(--spacing-fsk-3) auto", padding: "var(--spacing-fsk-114)", textAlign: 'center', background: "var(--color-fsk-38)", borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
        <AlertCircle size={48} color="var(--color-fsk-129)" style={{ marginBottom: "var(--spacing-fsk-5)" }} />
        <Heading level={2}>Service Not Found</Heading>
        <p style={{ color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-8) 0 var(--spacing-fsk-26) 0" }}>
          The requested service could not be located in the current Finservkart catalogue.
        </p>
        <Button label="Back to All Services" variant="primary" onClick={() => navigate('/services')} />
      </Surface>
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto', padding: "var(--spacing-fsk-1) var(--spacing-fsk-2) var(--spacing-fsk-3) var(--spacing-fsk-2)" }}>
      {/* Back Button */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Button
          label="Back to Services"
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={() => navigate('/services')}
        />
      </Surface>

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 21.25rem), 1fr))", gap: "var(--spacing-fsk-1)" }}>
        {/* Left Column: Image & Document Checklist */}
        <Surface>
          <Surface
            style={{
              borderRadius: "var(--radius-fsk-28)",
              overflow: 'hidden',
              height: "var(--spacing-fsk-79)",
              width: '100%',
              boxShadow: "var(--shadow-fsk-card)",
              marginBottom: "var(--spacing-fsk-114)",
              backgroundColor: "var(--color-fsk-46)",
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
          </Surface>

          {/* Required Documents Section */}
          <Card elevation="low" padding={4}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-5)" }}>
              <FileText size={22} color="var(--color-fsk-15)" />
              <Heading level={3}>
                <Inline style={{ fontSize: "var(--font-fsk-61)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                  Required Documents Checklist
                </Inline>
              </Heading>
            </Surface>
            <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginBottom: "var(--spacing-fsk-2)" }}>
              Please prepare the following documents. You will upload these during the application process:
            </p>

            <VStack gap={3}>
              {documents.map((doc, index) => (
                <Surface
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: "var(--spacing-fsk-8)",
                    padding: "var(--spacing-fsk-8)",
                    background: "var(--color-fsk-27)",
                    borderRadius: "var(--radius-fsk-37)",
                    border: "var(--spacing-fsk-22) solid var(--color-fsk-46)",
                  }}
                >
                  <CheckCircle2 size={18} color="var(--color-fsk-31)" style={{ flexShrink: 0, marginTop: "var(--spacing-fsk-47)" }} />
                  <Inline style={{ fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-113)", fontWeight: 500, lineHeight: 1.4 }}>
                    {doc}
                  </Inline>
                </Surface>
              ))}
            </VStack>
          </Card>
        </Surface>

        {/* Right Column: Pricing, Terms, Application CTA */}
        <Surface>
          <Surface style={{ marginBottom: "var(--spacing-fsk-8)" }}>
            <Badge label="Verified Financial Service" variant="green" />
          </Surface>

          <Heading level={1}>
            <Inline style={{ fontSize: "var(--font-fsk-95)", fontWeight: 800, color: "var(--color-fsk-7)", lineHeight: 1.2 }}>
              {service.service_name}
            </Inline>
          </Heading>

          <p style={{ fontSize: "var(--font-fsk-19)", color: "var(--color-fsk-18)", lineHeight: 1.6, margin: "var(--spacing-fsk-5) 0 var(--spacing-fsk-26) 0" }}>
            Professional service execution handled directly through our verified Chartered Accountant network and coordinator workflow engine.
          </p>

          {/* Transparent Pricing Card */}
          <Card elevation="med" padding={4}>
            <Heading level={3}>
              <Inline style={{ fontSize: "var(--font-fsk-30)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-5)", display: 'block' }}>
                Transparent Pricing Breakdown
              </Inline>
            </Heading>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-8)", marginBottom: "var(--spacing-fsk-2)" }}>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-18)" }}>
                <Inline>Professional Net Fee:</Inline>
                <Inline style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>{formatCurrency(servicePrice)}</Inline>
              </Surface>

              <Surface style={{ display: 'flex', justifyContent: 'space-between', fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-18)" }}>
                <Inline>Government Statutory Fees:</Inline>
                <Inline style={{ fontWeight: 600, color: "var(--color-fsk-7)" }}>
                  {govtFees > 0 ? formatCurrency(govtFees) : 'Included / ₹0'}
                </Inline>
              </Surface>

              <Surface style={{ height: "var(--spacing-fsk-22)", background: "var(--color-fsk-21)", margin: "var(--spacing-fsk-29) 0" }} />

              <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Inline style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)" }}>Total Payable Amount:</Inline>
                <Inline style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-139)" }}>
                  {formatCurrency(totalAmount)}
                </Inline>
              </Surface>
            </Surface>

            <Button
              label={`Apply for ${service.service_name}`}
              variant="primary"
              size="lg"
              width="100%"
              onClick={() => navigate(`/login?serviceId=${service.id}`)}
            />

            <Surface style={{ marginTop: "var(--spacing-fsk-23)", textAlign: 'center' }}>
              <Text type="supporting">
                <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
                  Don't have an account?{' '}
                  <Inline
                    onClick={() => navigate('/register')}
                    style={{ color: "var(--color-fsk-15)", fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Register free as a customer
                  </Inline>
                </Inline>
              </Text>
            </Surface>
          </Card>

          {/* Terms & Conditions Box */}
          {terms.length > 0 && (
            <Surface style={{ marginTop: "var(--spacing-fsk-114)" }}>
              <Banner status="info" title="Service Terms & Regulatory Disclosures">
                <ul style={{ margin: 0, paddingLeft: "var(--spacing-fsk-36)", fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-140)", lineHeight: 1.5 }}>
                  {terms.map((term, i) => (
                    <li key={i}>{term}</li>
                  ))}
                </ul>
              </Banner>
            </Surface>
          )}

          {/* Assurance Box */}
          <Surface style={{ marginTop: "var(--spacing-fsk-26)", padding: "var(--spacing-fsk-5)", background: "var(--color-fsk-27)", borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-23)" }}>
            <ShieldCheck size={28} color="var(--color-fsk-31)" />
            <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-18)" }}>
              <strong>100% Data Confidentiality Guarantee:</strong> Uploaded business proofs and identification are handled in compliance with Information Technology Act standards.
            </Surface>
          </Surface>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default ServiceDetailPage;

