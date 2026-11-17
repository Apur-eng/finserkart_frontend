import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  PlusCircle,
  UserCheck,
  UserPlus
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_AGENT_PROFILE } from '../../features/agent/agentData';

export const AgentOnboardCustomerPage: React.FC = () => {
  const navigate = useNavigate();
  const agent = INITIAL_AGENT_PROFILE;

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pan, setPan] = useState('');
  const [entityType, setEntityType] = useState('Private Limited Company');
  const [city, setCity] = useState('Lucknow');
  const [state, setState] = useState('Uttar Pradesh');
  const [pincode, setPincode] = useState('226010');
  const [initialService, setInitialService] = useState('GST Registration');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedCustId, setGeneratedCustId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fname || !email || !phone) return;

    const newId = `CUST-2026-${Math.floor(100 + Math.random() * 900)}`;
    setGeneratedCustId(newId);
    setIsSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      {/* Back button & Header */}
      <div style={{ marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => navigate('/agent/customers')}
          style={{
            background: 'none',
            border: 'none',
            color: '#059669',
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
          <ArrowLeft size={16} /> Back to Customer Directory
        </button>

        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Onboard New Customer
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Register client credentials and link their account directly under your partner referral code.
        </p>
      </div>

      {isSubmitted ? (
        <Card elevation="low" padding={6} style={{ borderRadius: '14px', border: '1px solid #a7f3d0', background: '#ffffff', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={32} />
          </div>

          <Heading level={2}>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
              Customer Successfully Onboarded!
            </span>
          </Heading>

          <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '520px', margin: '10px auto 20px', lineHeight: 1.6 }}>
            Client <strong>{fname} {lname}</strong> ({businessName || 'Individual'}) has been registered under your referral code <strong>{agent.referralCode}</strong> with Customer ID: <strong style={{ color: '#059669' }}>{generatedCustId}</strong>.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <Button
              label="Submit Service Application for Client"
              variant="primary"
              size="md"
              icon={<PlusCircle size={16} />}
              onClick={() => navigate('/agent/applications')}
            />
            <Button
              label="View Customer Directory"
              variant="secondary"
              size="md"
              icon={<UserCheck size={16} />}
              onClick={() => navigate('/agent/customers')}
            />
          </div>
        </Card>
      ) : (
        <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <form onSubmit={handleSubmit}>
            <VStack gap={4}>
              {/* Partner Attribution Notice */}
              <Banner
                status="info"
                title="Partner Referral Attribution"
                description={`This customer will be locked to your agent profile (${agent.fname} ${agent.lname} - ${agent.referralCode}) for all future statutory and tax recurring commissions.`}
              />

              {/* Personal Information */}
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                  Client Contact Identity
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <TextInput
                    label="First Name"
                    placeholder="e.g. Ramesh"
                    value={fname}
                    onChange={(val) => setFname(val)}
                    isRequired
                    width="100%"
                  />
                  <TextInput
                    label="Last Name"
                    placeholder="e.g. Gupta"
                    value={lname}
                    onChange={(val) => setLname(val)}
                    isRequired
                    width="100%"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <TextInput
                  label="Email Address"
                  placeholder="client@business.com"
                  value={email}
                  onChange={(val) => setEmail(val)}
                  isRequired
                  width="100%"
                />
                <TextInput
                  label="Mobile Number"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(val) => setPhone(val)}
                  isRequired
                  width="100%"
                />
              </div>

              {/* Enterprise Information */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                  Business Enterprise Details
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <TextInput
                    label="Enterprise / Trade Name"
                    placeholder="e.g. Awadh Biofuel & Agro Solutions"
                    value={businessName}
                    onChange={(val) => setBusinessName(val)}
                    isRequired
                    width="100%"
                  />
                  <TextInput
                    label="PAN (Personal or Enterprise)"
                    placeholder="ABCDE1234F"
                    value={pan}
                    onChange={(val) => setPan(val.toUpperCase())}
                    width="100%"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                      Entity Structure
                    </label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13.5px',
                        color: '#0f172a',
                        background: '#ffffff',
                        outline: 'none',
                      }}
                    >
                      <option value="Private Limited Company">Private Limited Company</option>
                      <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                      <option value="Sole Proprietorship">Sole Proprietorship</option>
                      <option value="Partnership Firm">Partnership Firm</option>
                      <option value="One Person Company (OPC)">One Person Company (OPC)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                      Primary Service Required
                    </label>
                    <select
                      value={initialService}
                      onChange={(e) => setInitialService(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13.5px',
                        color: '#0f172a',
                        background: '#ffffff',
                        outline: 'none',
                      }}
                    >
                      <option value="GST Registration">GST Registration</option>
                      <option value="Private Limited Company Registration">Private Limited Company Registration</option>
                      <option value="Trademark Application Filing">Trademark Application Filing</option>
                      <option value="FSSAI Food License Registration">FSSAI Food License Registration</option>
                      <option value="MSME / Udyam Registration">MSME / Udyam Registration</option>
                      <option value="Accounting & Tax Audit">Accounting &amp; Tax Audit</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Geographical Address */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                  Location &amp; Pincode
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                  <TextInput
                    label="City"
                    placeholder="e.g. Lucknow"
                    value={city}
                    onChange={(val) => setCity(val)}
                    isRequired
                    width="100%"
                  />
                  <TextInput
                    label="State"
                    placeholder="e.g. Uttar Pradesh"
                    value={state}
                    onChange={(val) => setState(val)}
                    isRequired
                    width="100%"
                  />
                  <TextInput
                    label="Pincode"
                    placeholder="226010"
                    value={pincode}
                    onChange={(val) => setPincode(val)}
                    isRequired
                    width="100%"
                  />
                </div>
              </div>

              {/* Pre-locked Referral Code */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                      Partner Referral Code (Auto-Locked)
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: '#f1f5f9', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', color: '#475569', fontWeight: 600 }}>
                      <Lock size={15} color="#64748b" />
                      <span>{agent.referralCode} ({agent.id})</span>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                      Affiliated Franchise
                    </label>
                    <div style={{ padding: '10px 12px', background: '#f1f5f9', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', color: '#475569', fontWeight: 600 }}>
                      {agent.franchiseCode} - {agent.franchiseName}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <Button
                  label="Register Customer &amp; Create Account"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<UserPlus size={16} />}
                  width="100%"
                  isDisabled={!fname.trim() || !email.trim() || !phone.trim()}
                />
              </div>
            </VStack>
          </form>
        </Card>
      )}
    </div>
  );
};

export default AgentOnboardCustomerPage;
