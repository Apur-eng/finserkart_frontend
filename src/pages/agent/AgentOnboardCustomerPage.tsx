import { Surface, Inline } from '../../components/Surface';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-92)", margin: '0 auto' }}>
      {/* Back button & Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <button
          type="button"
          onClick={() => navigate('/agent/customers')}
          style={{
            background: 'none',
            border: 'none',
            color: "var(--color-fsk-65)",
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
          <ArrowLeft size={16} /> Back to Customer Directory
        </button>

        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Onboard New Customer
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Register client credentials and link their account directly under your partner referral code.
        </p>
      </Surface>

      {isSubmitted ? (
        <Card elevation="low" padding={6} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-81)", background: "var(--color-fsk-38)", textAlign: 'center' }}>
          <Surface style={{ width: "var(--spacing-fsk-93)", height: "var(--spacing-fsk-93)", borderRadius: '50%', background: "var(--color-fsk-64)", color: "var(--color-fsk-65)", display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "0 auto var(--spacing-fsk-5)" }}>
            <CheckCircle2 size={32} />
          </Surface>

          <Heading level={2}>
            <Inline style={{ fontSize: "var(--font-fsk-83)", fontWeight: 800, color: "var(--color-fsk-7)" }}>
              Customer Successfully Onboarded!
            </Inline>
          </Heading>

          <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", maxWidth: "var(--spacing-fsk-94)", margin: "var(--spacing-fsk-35) auto var(--spacing-fsk-2)", lineHeight: 1.6 }}>
            Client <strong>{fname} {lname}</strong> ({businessName || 'Individual'}) has been registered under your referral code <strong>{agent.referralCode}</strong> with Customer ID: <strong style={{ color: "var(--color-fsk-65)" }}>{generatedCustId}</strong>.
          </p>

          <Surface style={{ display: 'flex', justifyContent: 'center', gap: "var(--spacing-fsk-23)" }}>
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
          </Surface>
        </Card>
      ) : (
        <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <form onSubmit={handleSubmit}>
            <VStack gap={4}>
              {/* Partner Attribution Notice */}
              <Banner
                status="info"
                title="Partner Referral Attribution"
                description={`This customer will be locked to your agent profile (${agent.fname} ${agent.lname} - ${agent.referralCode}) for all future statutory and tax recurring commissions.`}
              />

              {/* Personal Information */}
              <Surface>
                <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-8)" }}>
                  Client Contact Identity
                </Surface>
                <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-23)" }}>
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
                </Surface>
              </Surface>

              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-23)" }}>
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
              </Surface>

              {/* Enterprise Information */}
              <Surface style={{ borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingTop: "var(--spacing-fsk-5)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-8)" }}>
                  Business Enterprise Details
                </Surface>

                <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-23)", marginBottom: "var(--spacing-fsk-23)" }}>
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
                </Surface>

                <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-23)" }}>
                  <Surface>
                    <label style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)", display: 'block', marginBottom: "var(--spacing-fsk-17)" }}>
                      Entity Structure
                    </label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)",
                        borderRadius: "var(--radius-fsk-37)",
                        border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                        fontSize: "var(--font-fsk-14)",
                        color: "var(--color-fsk-7)",
                        background: "var(--color-fsk-38)",
                        outline: 'none',
                      }}
                    >
                      <option value="Private Limited Company">Private Limited Company</option>
                      <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                      <option value="Sole Proprietorship">Sole Proprietorship</option>
                      <option value="Partnership Firm">Partnership Firm</option>
                      <option value="One Person Company (OPC)">One Person Company (OPC)</option>
                    </select>
                  </Surface>

                  <Surface>
                    <label style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)", display: 'block', marginBottom: "var(--spacing-fsk-17)" }}>
                      Primary Service Required
                    </label>
                    <select
                      value={initialService}
                      onChange={(e) => setInitialService(e.target.value)}
                      style={{
                        width: '100%',
                        padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)",
                        borderRadius: "var(--radius-fsk-37)",
                        border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                        fontSize: "var(--font-fsk-14)",
                        color: "var(--color-fsk-7)",
                        background: "var(--color-fsk-38)",
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
                  </Surface>
                </Surface>
              </Surface>

              {/* Geographical Address */}
              <Surface style={{ borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingTop: "var(--spacing-fsk-5)" }}>
                <Surface style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-8)" }}>
                  Location &amp; Pincode
                </Surface>

                <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-23)" }}>
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
                </Surface>
              </Surface>

              {/* Pre-locked Referral Code */}
              <Surface style={{ borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-46)", paddingTop: "var(--spacing-fsk-5)" }}>
                <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-23)" }}>
                  <Surface>
                    <label style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)", display: 'block', marginBottom: "var(--spacing-fsk-17)" }}>
                      Partner Referral Code (Auto-Locked)
                    </label>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)", background: "var(--color-fsk-46)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-59)", fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-18)", fontWeight: 600 }}>
                      <Lock size={15} color="var(--color-fsk-9)" />
                      <Inline>{agent.referralCode} ({agent.id})</Inline>
                    </Surface>
                  </Surface>

                  <Surface>
                    <label style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)", display: 'block', marginBottom: "var(--spacing-fsk-17)" }}>
                      Affiliated Franchise
                    </label>
                    <Surface style={{ padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)", background: "var(--color-fsk-46)", borderRadius: "var(--radius-fsk-37)", border: "var(--spacing-fsk-22) solid var(--color-fsk-59)", fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-18)", fontWeight: 600 }}>
                      {agent.franchiseCode} - {agent.franchiseName}
                    </Surface>
                  </Surface>
                </Surface>
              </Surface>

              <Surface style={{ marginTop: "var(--spacing-fsk-8)" }}>
                <Button
                  label="Register Customer &amp; Create Account"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<UserPlus size={16} />}
                  width="100%"
                  isDisabled={!fname.trim() || !email.trim() || !phone.trim()}
                />
              </Surface>
            </VStack>
          </form>
        </Card>
      )}
    </Surface>
  );
};

export default AgentOnboardCustomerPage;
