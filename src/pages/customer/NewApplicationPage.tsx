import { Surface, Inline } from '../../components/Surface';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <button
          type="button"
          onClick={() => navigate('/customer/applications')}
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
          <ArrowLeft size={16} /> Back to Applications
        </button>

        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Submit New Service Application
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Select a verified financial or compliance service to generate your application dossier and assign a Chartered Accountant.
        </p>
      </Surface>

      {isSubmitted ? (
        <Card elevation="low" padding={6} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-125)", background: "var(--color-fsk-75)", textAlign: 'center' }}>
          <Surface style={{ width: "var(--spacing-fsk-93)", height: "var(--spacing-fsk-93)", borderRadius: '50%', background: "var(--color-fsk-116)", color: "var(--color-fsk-39)", display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "0 auto var(--spacing-fsk-5) auto" }}>
            <CheckCircle2 size={32} />
          </Surface>

          <Heading level={2}>
            <Inline style={{ fontSize: "var(--font-fsk-83)", fontWeight: 800, color: "var(--color-fsk-126)" }}>
              Application Lodged Successfully!
            </Inline>
          </Heading>

          <p style={{ color: "var(--color-fsk-103)", fontSize: "var(--font-fsk-91)", maxWidth: "var(--spacing-fsk-127)", margin: "var(--spacing-fsk-8) auto var(--spacing-fsk-26) auto", lineHeight: 1.6 }}>
            Your application for <strong>{selectedService.service_name}</strong> has been registered under Application Reference <strong>FK-SRV-9240</strong>. A Chartered Accountant will be assigned within 2 working hours.
          </p>

          <Surface style={{ display: 'flex', justifyContent: 'center', gap: "var(--spacing-fsk-5)" }}>
            <Button
              label="Track Application"
              variant="primary"
              size="md"
              icon={<ArrowRight size={16} />}
              onClick={() => navigate('/customer/applications/FK-SRV-9041/tracker')}
            />
            <Button
              label="Upload Documents Now"
              variant="secondary"
              size="md"
              icon={<UploadCloud size={16} />}
              onClick={() => navigate('/customer/documents/upload')}
            />
          </Surface>
        </Card>
      ) : (
        <form onSubmit={handleApply}>
          <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "var(--spacing-fsk-20)", alignItems: 'flex-start' }}>
            {/* Left Column: Service Selector & Details */}
            <Surface>
              <Surface style={{ marginBottom: "var(--spacing-fsk-5)", fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                1. Select Desired Service
              </Surface>

              <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-26)" }}>
                {services.map((svc) => {
                  const isSelected = svc.id === selectedServiceId;
                  return (
                    <Surface
                      key={svc.id}
                      onClick={() => setSelectedServiceId(svc.id)}
                      style={{
                        padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)",
                        borderRadius: "var(--radius-fsk-28)",
                        border: isSelected ? "var(--spacing-fsk-47) solid var(--color-fsk-162)" : "var(--spacing-fsk-22) solid var(--color-fsk-163)",
                        background: isSelected ? "var(--color-fsk-130)" : "var(--color-fsk-38)",
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <Surface>
                        <Surface style={{ fontWeight: 700, color: isSelected ? "var(--color-fsk-15)" : "var(--color-fsk-7)", fontSize: "var(--font-fsk-24)" }}>
                          {svc.service_name}
                        </Surface>
                        <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
                          Standard Processing: 3-5 Business Days
                        </Surface>
                      </Surface>
                      <Surface style={{ textAlign: 'right' }}>
                        <Surface style={{ fontWeight: 800, color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-19)" }}>
                          ₹{parseFloat(svc.total_amt || svc.service_price).toLocaleString('en-IN')}
                        </Surface>
                        {parseFloat(svc.govt_fees) > 0 && (
                          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)" }}>
                            Govt fee: ₹{svc.govt_fees}
                          </Surface>
                        )}
                      </Surface>
                    </Surface>
                  );
                })}
              </Surface>

              {/* Required Documents Checklist */}
              <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-27)" }}>
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-8)" }}>
                  <FileText size={18} color="var(--color-fsk-15)" />
                  <Inline style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                    Required Documents Checklist
                  </Inline>
                </Surface>
                <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-12)" }}>
                  {requiredDocs.map((doc, idx) => (
                    <Surface key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: "var(--spacing-fsk-12)", fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-25)" }}>
                      <CheckCircle2 size={15} color="var(--color-fsk-39)" style={{ flexShrink: 0, marginTop: "var(--spacing-fsk-47)" }} />
                      <Inline>{doc}</Inline>
                    </Surface>
                  ))}
                </Surface>
              </Card>
            </Surface>

            {/* Right Column: Applicant Details & Payment Summary */}
            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-26)" }}>
              <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-5)" }}>
                  2. Applicant &amp; Entity Information
                </Surface>

                <VStack gap={3}>
                  <TextInput
                    label="Legal Entity / Business Name"
                    placeholder="Enter business name"
                    value={enterpriseName}
                    onChange={(val) => setEnterpriseName(val)}
                    isRequired
                    width="100%"
                  />

                  <TextInput
                    label="PAN / Identification Number"
                    placeholder="e.g. ABCDE1234F"
                    value={panNumber}
                    onChange={(val) => setPanNumber(val)}
                    isRequired
                    width="100%"
                  />

                  <TextInput
                    label="Specific Instructions or Remarks (Optional)"
                    placeholder="Add any specific requirements or previous filing references"
                    value={applicantRemarks}
                    onChange={(val) => setApplicantRemarks(val)}
                    width="100%"
                  />
                </VStack>

                <Surface style={{ marginTop: "var(--spacing-fsk-26)", paddingTop: "var(--spacing-fsk-5)", borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                  <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-8)" }}>
                    3. Fee &amp; Payment Summary
                  </Surface>

                  <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-12)", fontSize: "var(--font-fsk-14)" }}>
                    <Surface style={{ display: 'flex', justifyContent: 'space-between', color: "var(--color-fsk-9)" }}>
                      <Inline>Professional CA Drafting Fee</Inline>
                      <Inline>₹{price.toLocaleString('en-IN')}</Inline>
                    </Surface>
                    <Surface style={{ display: 'flex', justifyContent: 'space-between', color: "var(--color-fsk-9)" }}>
                      <Inline>Statutory Government Department Fees</Inline>
                      <Inline>₹{govtFees.toLocaleString('en-IN')}</Inline>
                    </Surface>
                    <Surface style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: "var(--font-fsk-10)", color: "var(--color-fsk-7)", paddingTop: "var(--spacing-fsk-12)", borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                      <Inline>Total Payable</Inline>
                      <Inline style={{ color: "var(--color-fsk-15)" }}>₹{totalAmount.toLocaleString('en-IN')}</Inline>
                    </Surface>
                  </Surface>

                  <Surface style={{ marginTop: "var(--spacing-fsk-2)" }}>
                    <Button
                      label={isSubmitting ? 'Submitting Application...' : `Confirm & Submit Application (₹${totalAmount.toLocaleString('en-IN')})`}
                      variant="primary"
                      size="md"
                      width="100%"
                      type="submit"
                      isLoading={isSubmitting}
                      icon={<Sparkles size={16} />}
                    />
                  </Surface>

                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)", textAlign: 'center', marginTop: "var(--spacing-fsk-8)" }}>
                    <ShieldCheck size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: "var(--spacing-fsk-29)" }} />
                    Government fee receipt &amp; electronic invoice issued upon clearance.
                  </Surface>
                </Surface>
              </Card>
            </Surface>
          </Surface>
        </form>
      )}
    </Surface>
  );
};

export default NewApplicationPage;
