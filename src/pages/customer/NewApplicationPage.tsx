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
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => navigate('/customer/applications')}
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
          <ArrowLeft size={16} /> Back to Applications
        </button>

        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Submit New Service Application
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Select a verified financial or compliance service to generate your application dossier and assign a Chartered Accountant.
        </p>
      </div>

      {isSubmitted ? (
        <Card elevation="low" padding={6} style={{ borderRadius: '16px', border: '1px solid #bbf7d0', background: '#f0fdf4', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <CheckCircle2 size={32} />
          </div>

          <Heading level={2}>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#166534' }}>
              Application Lodged Successfully!
            </span>
          </Heading>

          <p style={{ color: '#15803d', fontSize: '14.5px', maxWidth: '580px', margin: '12px auto 24px auto', lineHeight: 1.6 }}>
            Your application for <strong>{selectedService.service_name}</strong> has been registered under Application Reference <strong>FK-SRV-9240</strong>. A Chartered Accountant will be assigned within 2 working hours.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
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
          </div>
        </Card>
      ) : (
        <form onSubmit={handleApply}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'flex-start' }}>
            {/* Left Column: Service Selector & Details */}
            <div>
              <div style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                1. Select Desired Service
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {services.map((svc) => {
                  const isSelected = svc.id === selectedServiceId;
                  return (
                    <div
                      key={svc.id}
                      onClick={() => setSelectedServiceId(svc.id)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #0066cc' : '1px solid #e2e8f0',
                        background: isSelected ? '#f0f7ff' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: isSelected ? '#0066cc' : '#0f172a', fontSize: '14px' }}>
                          {svc.service_name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                          Standard Processing: 3-5 Business Days
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '15px' }}>
                          ₹{parseFloat(svc.total_amt || svc.service_price).toLocaleString('en-IN')}
                        </div>
                        {parseFloat(svc.govt_fees) > 0 && (
                          <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>
                            Govt fee: ₹{svc.govt_fees}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Required Documents Checklist */}
              <Card elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <FileText size={18} color="#0066cc" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                    Required Documents Checklist
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {requiredDocs.map((doc, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#334155' }}>
                      <CheckCircle2 size={15} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column: Applicant Details & Payment Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
                  2. Applicant &amp; Entity Information
                </div>

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

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                    3. Fee &amp; Payment Summary
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                      <span>Professional CA Drafting Fee</span>
                      <span>₹{price.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                      <span>Statutory Government Department Fees</span>
                      <span>₹{govtFees.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '16px', color: '#0f172a', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                      <span>Total Payable</span>
                      <span style={{ color: '#0066cc' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '20px' }}>
                    <Button
                      label={isSubmitting ? 'Submitting Application...' : `Confirm & Submit Application (₹${totalAmount.toLocaleString('en-IN')})`}
                      variant="primary"
                      size="md"
                      width="100%"
                      type="submit"
                      isLoading={isSubmitting}
                      icon={<Sparkles size={16} />}
                    />
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#94a3b8', textAlign: 'center', marginTop: '12px' }}>
                    <ShieldCheck size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                    Government fee receipt &amp; electronic invoice issued upon clearance.
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewApplicationPage;
