import { ActionButton, Panel, Title, Field, Stack } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Sparkles,
  UploadCloud
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VERIFIED_INITIAL_SERVICES } from '../../api/client';
import { INITIAL_CUSTOMER_PROFILE } from '../../features/customer/customerData';

export const NewApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const services = VERIFIED_INITIAL_SERVICES;
  const profile = INITIAL_CUSTOMER_PROFILE;

  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0].id);
  const [enterpriseName, setEnterpriseName] = useState(profile.businessName);
  const [panNumber, setPanNumber] = useState(profile.pan);
  const [applicantRemarks, setApplicantRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const requiredDocs = selectedService.required_documents.split('\n').filter(Boolean);

  const price = parseFloat(selectedService.service_price || '0');
  const govtFees = parseFloat(selectedService.govt_fees || '0');
  const totalAmount = parseFloat(selectedService.total_amt || String(price + govtFees));

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <Surface style={{ maxWidth: "62.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <button
          type="button"
          onClick={() => navigate('/customer/applications')}
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
          <ArrowLeft size={16} /> Back to Applications
        </button>

        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Submit New Service Application
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Select a verified financial or compliance service to generate your application dossier and assign a Chartered Accountant.
        </p>
      </Surface>

      {isSubmitted ? (
        <Panel elevation="low" padding={6} style={{ borderRadius: "1rem", border: "0.0625rem solid #bbf7d0", background: "#f0fdf4", textAlign: 'center' }}>
          <Surface style={{ width: "3.5rem", height: "3.5rem", borderRadius: '50%', background: "#dcfce7", color: "#16a34a", display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "0 auto 1rem auto" }}>
            <CheckCircle2 size={32} />
          </Surface>

          <Title level={2}>
            <Inline style={{ fontSize: "1.375rem", fontWeight: 800, color: "#166534" }}>
              Application Lodged Successfully!
            </Inline>
          </Title>

          <p style={{ color: "#15803d", fontSize: "0.90625rem", maxWidth: "36.25rem", margin: "0.75rem auto 1.5rem auto", lineHeight: 1.6 }}>
            Your application for <strong>{selectedService.service_name}</strong> has been registered under Application Reference <strong>FK-SRV-9240</strong>. A Chartered Accountant will be assigned within 2 working hours.
          </p>

          <Surface style={{ display: 'flex', justifyContent: 'center', gap: "1rem" }}>
            <ActionButton
              label="Track Application"
              variant="primary"
              size="md"
              icon={<ArrowRight size={16} />}
              onClick={() => navigate('/customer/applications/FK-SRV-9041/tracker')}
            />
            <ActionButton
              label="Upload Documents Now"
              variant="secondary"
              size="md"
              icon={<UploadCloud size={16} />}
              onClick={() => navigate('/customer/documents/upload')}
            />
          </Surface>
        </Panel>
      ) : (
        <form onSubmit={handleApply}>
          <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "clamp(1rem, 2.1538461538461537vw, 1.75rem)", alignItems: 'flex-start' }}>
            {/* Left Column: Service Selector & Details */}
            <Surface>
              <Surface style={{ marginBottom: "1rem", fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>
                1. Select Desired Service
              </Surface>

              <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.625rem", marginBottom: "1.5rem" }}>
                {services.map((svc) => {
                  const isSelected = svc.id === selectedServiceId;
                  return (
                    <Surface
                      key={svc.id}
                      onClick={() => setSelectedServiceId(svc.id)}
                      style={{
                        padding: "0.875rem 1rem",
                        borderRadius: "1rem",
                        border: isSelected ? "0.125rem solid var(--blue)" : "0.0625rem solid #e2e8f0",
                        background: isSelected ? "#f0f7ff" : "var(--white)",
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <Surface>
                        <Surface style={{ fontWeight: 700, color: isSelected ? "var(--blue)" : "var(--navy)", fontSize: "0.875rem" }}>
                          {svc.service_name}
                        </Surface>
                        <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.125rem" }}>
                          Standard Processing: 3-5 Business Days
                        </Surface>
                      </Surface>
                      <Surface style={{ textAlign: 'right' }}>
                        <Surface style={{ fontWeight: 800, color: "var(--navy)", fontSize: "0.9375rem" }}>
                          ₹{parseFloat(svc.total_amt || svc.service_price).toLocaleString('en-IN')}
                        </Surface>
                        {parseFloat(svc.govt_fees) > 0 && (
                          <Surface style={{ fontSize: "0.8125rem", color: "#687d93" }}>
                            Govt fee: ₹{svc.govt_fees}
                          </Surface>
                        )}
                      </Surface>
                    </Surface>
                  );
                })}
              </Surface>

              {/* Required Documents Checklist */}
              <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--cream)" }}>
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <FileText size={18} color="var(--blue)" />
                  <Inline style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>
                    Required Documents Checklist
                  </Inline>
                </Surface>
                <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.5rem" }}>
                  {requiredDocs.map((doc, idx) => (
                    <Surface key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: "0.5rem", fontSize: "0.8125rem", color: "#334155" }}>
                      <CheckCircle2 size={15} color="#16a34a" style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                      <Inline>{doc}</Inline>
                    </Surface>
                  ))}
                </Surface>
              </Panel>
            </Surface>

            {/* Right Column: Applicant Details & Payment Summary */}
            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1.5rem" }}>
              <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
                <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
                  2. Applicant &amp; Entity Information
                </Surface>

                <Stack gap={3}>
                  <Field
                    label="Legal Entity / Business Name"
                    placeholder="Enter business name"
                    value={enterpriseName}
                    onChange={(val) => setEnterpriseName(val)}
                    isRequired
                    width="100%"
                  />

                  <Field
                    label="PAN / Identification Number"
                    placeholder="e.g. ABCDE1234F"
                    value={panNumber}
                    onChange={(val) => setPanNumber(val)}
                    isRequired
                    width="100%"
                  />

                  <Field
                    label="Specific Instructions or Remarks (Optional)"
                    placeholder="Add any specific requirements or previous filing references"
                    value={applicantRemarks}
                    onChange={(val) => setApplicantRemarks(val)}
                    width="100%"
                  />
                </Stack>

                <Surface style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "0.0625rem solid var(--border)" }}>
                  <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.75rem" }}>
                    3. Fee &amp; Payment Summary
                  </Surface>

                  <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.5rem", fontSize: "0.8125rem" }}>
                    <Surface style={{ display: 'flex', justifyContent: 'space-between', color: "var(--muted)" }}>
                      <Inline>Professional CA Drafting Fee</Inline>
                      <Inline>₹{price.toLocaleString('en-IN')}</Inline>
                    </Surface>
                    <Surface style={{ display: 'flex', justifyContent: 'space-between', color: "var(--muted)" }}>
                      <Inline>Statutory Government Department Fees</Inline>
                      <Inline>₹{govtFees.toLocaleString('en-IN')}</Inline>
                    </Surface>
                    <Surface style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: "1rem", color: "var(--navy)", paddingTop: "0.5rem", borderTop: "0.0625rem solid var(--sage-light)" }}>
                      <Inline>Total Payable</Inline>
                      <Inline style={{ color: "var(--blue)" }}>₹{totalAmount.toLocaleString('en-IN')}</Inline>
                    </Surface>
                  </Surface>

                  <Surface style={{ marginTop: "1.25rem" }}>
                    <ActionButton
                      label={isSubmitting ? 'Submitting Application...' : `Confirm & Submit Application (₹${totalAmount.toLocaleString('en-IN')})`}
                      variant="primary"
                      size="md"
                      width="100%"
                      type="submit"
                      isLoading={isSubmitting}
                      icon={<Sparkles size={16} />}
                    />
                  </Surface>

                  <Surface style={{ fontSize: "0.8125rem", color: "#687d93", textAlign: 'center', marginTop: "0.75rem" }}>
                    <ShieldCheck size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: "0.25rem" }} />
                    Government fee receipt &amp; electronic invoice issued upon clearance.
                  </Surface>
                </Surface>
              </Panel>
            </Surface>
          </Surface>
        </form>
      )}
    </Surface>
  );
};

export default NewApplicationPage;
