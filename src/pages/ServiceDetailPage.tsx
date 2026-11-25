import { Notice, ActionButton, Panel, Title, LoadingIndicator, Typography, Stack } from '../components/ui';
import { Surface, Inline } from '../components/Surface';
import { StatusTag as Badge } from '../components/StatusTag';
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
      <Surface style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: "25rem", gap: "1rem" }}>
        <LoadingIndicator />
        <Inline style={{ color: "var(--muted)", fontSize: "0.9375rem" }}>Loading service details...</Inline>
      </Surface>
    );
  }

  if (isError || !service) {
    return (
      <Surface style={{ maxWidth: "40rem", margin: "clamp(1rem, 6.153846153846154vw, 5rem) auto", padding: "clamp(1rem, 2.4615384615384617vw, 2rem)", textAlign: 'center', background: "var(--white)", borderRadius: "1rem", border: "0.0625rem solid var(--border)" }}>
        <AlertCircle size={48} color="#ef4444" style={{ marginBottom: "1rem" }} />
        <Title level={2}>Service Not Found</Title>
        <p style={{ color: "var(--muted)", margin: "0.75rem 0 1.5rem 0" }}>
          The requested service could not be located in the current Finservkart catalogue.
        </p>
        <ActionButton label="Back to All Services" variant="primary" onClick={() => navigate('/services')} />
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
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto', padding: "clamp(1rem, 3.076923076923077vw, 2.5rem) 1.25rem clamp(1rem, 6.153846153846154vw, 5rem) 1.25rem" }}>
      {/* Back ActionButton */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <ActionButton
          label="Back to Services"
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={() => navigate('/services')}
        />
      </Surface>

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 21.25rem), 1fr))", gap: "clamp(1rem, 3.076923076923077vw, 2.5rem)" }}>
        {/* Left Column: Image & Document Checklist */}
        <Surface>
          <Surface
            style={{
              borderRadius: "1rem",
              overflow: 'hidden',
              height: "20rem",
              width: '100%',
              boxShadow: "var(--shadow-panel)",
              marginBottom: "clamp(1rem, 2.4615384615384617vw, 2rem)",
              backgroundColor: "var(--sage-light)",
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
          <Panel elevation="low" padding={4}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "1rem" }}>
              <FileText size={22} color="var(--blue)" />
              <Title level={3}>
                <Inline style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)" }}>
                  Required Documents Checklist
                </Inline>
              </Title>
            </Surface>
            <p style={{ fontSize: "0.8125rem", color: "var(--muted)", marginBottom: "1.25rem" }}>
              Please prepare the following documents. You will upload these during the application process:
            </p>

            <Stack gap={3}>
              {documents.map((doc, index) => (
                <Surface
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: "0.75rem",
                    padding: "0.75rem",
                    background: "var(--cream)",
                    borderRadius: "0.5rem",
                    border: "0.0625rem solid var(--sage-light)",
                  }}
                >
                  <CheckCircle2 size={18} color="var(--teal)" style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                  <Inline style={{ fontSize: "0.875rem", color: "#243b53", fontWeight: 500, lineHeight: 1.4 }}>
                    {doc}
                  </Inline>
                </Surface>
              ))}
            </Stack>
          </Panel>
        </Surface>

        {/* Right Column: Pricing, Terms, Application CTA */}
        <Surface>
          <Surface style={{ marginBottom: "0.75rem" }}>
            <Badge label="Verified Financial Service" variant="green" />
          </Surface>

          <Title level={1}>
            <Inline style={{ fontSize: "clamp(1.5rem, 2.4615384615384617vw, 2rem)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.2 }}>
              {service.service_name}
            </Inline>
          </Title>

          <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.6, margin: "1rem 0 1.5rem 0" }}>
            Professional service execution handled directly through our verified Chartered Accountant network and coordinator workflow engine.
          </p>

          {/* Transparent Pricing Panel */}
          <Panel elevation="med" padding={4}>
            <Title level={3}>
              <Inline style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem", display: 'block' }}>
                Transparent Pricing Breakdown
              </Inline>
            </Title>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.75rem", marginBottom: "1.25rem" }}>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', fontSize: "0.875rem", color: "var(--muted)" }}>
                <Inline>Professional Net Fee:</Inline>
                <Inline style={{ fontWeight: 600, color: "var(--navy)" }}>{formatCurrency(servicePrice)}</Inline>
              </Surface>

              <Surface style={{ display: 'flex', justifyContent: 'space-between', fontSize: "0.875rem", color: "var(--muted)" }}>
                <Inline>Government Statutory Fees:</Inline>
                <Inline style={{ fontWeight: 600, color: "var(--navy)" }}>
                  {govtFees > 0 ? formatCurrency(govtFees) : 'Included / ₹0'}
                </Inline>
              </Surface>

              <Surface style={{ height: "0.0625rem", background: "var(--border)", margin: "0.25rem 0" }} />

              <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Inline style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)" }}>Total Payable Amount:</Inline>
                <Inline style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "#1947b3" }}>
                  {formatCurrency(totalAmount)}
                </Inline>
              </Surface>
            </Surface>

            <ActionButton
              label={`Apply for ${service.service_name}`}
              variant="primary"
              size="lg"
              width="100%"
              onClick={() => navigate(`/login?serviceId=${service.id}`)}
            />

            <Surface style={{ marginTop: "0.875rem", textAlign: 'center' }}>
              <Typography type="supporting">
                <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
                  Don't have an account?{' '}
                  <Inline
                    onClick={() => navigate('/register')}
                    style={{ color: "var(--blue)", fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Register free as a customer
                  </Inline>
                </Inline>
              </Typography>
            </Surface>
          </Panel>

          {/* Terms & Conditions Box */}
          {terms.length > 0 && (
            <Surface style={{ marginTop: "clamp(1rem, 2.4615384615384617vw, 2rem)" }}>
              <Notice status="info" title="Service Terms & Regulatory Disclosures">
                <ul style={{ margin: 0, paddingLeft: "1.125rem", fontSize: "0.8125rem", color: "#1e3a8a", lineHeight: 1.5 }}>
                  {terms.map((term, i) => (
                    <li key={i}>{term}</li>
                  ))}
                </ul>
              </Notice>
            </Surface>
          )}

          {/* Assurance Box */}
          <Surface style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--cream)", borderRadius: "1rem", border: "0.0625rem solid var(--border)", display: 'flex', alignItems: 'center', gap: "0.875rem" }}>
            <ShieldCheck size={28} color="var(--teal)" />
            <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
              <strong>100% Data Confidentiality Guarantee:</strong> Uploaded business proofs and identification are handled in compliance with Information Technology Act standards.
            </Surface>
          </Surface>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default ServiceDetailPage;

