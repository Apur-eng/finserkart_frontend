import { Notice, ActionButton, Panel, Title, Field, Stack } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
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
    <Surface style={{ maxWidth: "55rem", margin: '0 auto' }}>
      {/* Back button & Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <button
          type="button"
          onClick={() => navigate('/agent/customers')}
          style={{
            background: 'none',
            border: 'none',
            color: "var(--teal)",
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
          <ArrowLeft size={16} /> Back to Customer Directory
        </button>

        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Onboard New Customer
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Register client credentials and link their account directly under your partner referral code.
        </p>
      </Surface>

      {isSubmitted ? (
        <Panel elevation="low" padding={6} style={{ borderRadius: "1rem", border: "0.0625rem solid #a7f3d0", background: "var(--white)", textAlign: 'center' }}>
          <Surface style={{ width: "3.5rem", height: "3.5rem", borderRadius: '50%', background: "#ecfdf5", color: "var(--teal)", display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "0 auto 1rem" }}>
            <CheckCircle2 size={32} />
          </Surface>

          <Title level={2}>
            <Inline style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--navy)" }}>
              Customer Successfully Onboarded!
            </Inline>
          </Title>

          <p style={{ color: "var(--muted)", fontSize: "0.875rem", maxWidth: "32.5rem", margin: "0.625rem auto 1.25rem", lineHeight: 1.6 }}>
            Client <strong>{fname} {lname}</strong> ({businessName || 'Individual'}) has been registered under your referral code <strong>{agent.referralCode}</strong> with Customer ID: <strong style={{ color: "var(--teal)" }}>{generatedCustId}</strong>.
          </p>

          <Surface style={{ display: 'flex', justifyContent: 'center', gap: "0.875rem" }}>
            <ActionButton
              label="Submit Service Application for Client"
              variant="primary"
              size="md"
              icon={<PlusCircle size={16} />}
              onClick={() => navigate('/agent/applications')}
            />
            <ActionButton
              label="View Customer Directory"
              variant="secondary"
              size="md"
              icon={<UserCheck size={16} />}
              onClick={() => navigate('/agent/customers')}
            />
          </Surface>
        </Panel>
      ) : (
        <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <form onSubmit={handleSubmit}>
            <Stack gap={4}>
              {/* Partner Attribution Notice */}
              <Notice
                status="info"
                title="Partner Referral Attribution"
                description={`This customer will be locked to your agent profile (${agent.fname} ${agent.lname} - ${agent.referralCode}) for all future statutory and tax recurring commissions.`}
              />

              {/* Personal Information */}
              <Surface>
                <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.75rem" }}>
                  Client Contact Identity
                </Surface>
                <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "0.875rem" }}>
                  <Field
                    label="First Name"
                    placeholder="e.g. Ramesh"
                    value={fname}
                    onChange={(val) => setFname(val)}
                    isRequired
                    width="100%"
                  />
                  <Field
                    label="Last Name"
                    placeholder="e.g. Gupta"
                    value={lname}
                    onChange={(val) => setLname(val)}
                    isRequired
                    width="100%"
                  />
                </Surface>
              </Surface>

              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "0.875rem" }}>
                <Field
                  label="Email Address"
                  placeholder="client@business.com"
                  value={email}
                  onChange={(val) => setEmail(val)}
                  isRequired
                  width="100%"
                />
                <Field
                  label="Mobile Number"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(val) => setPhone(val)}
                  isRequired
                  width="100%"
                />
              </Surface>

              {/* Enterprise Information */}
              <Surface style={{ borderTop: "0.0625rem solid var(--sage-light)", paddingTop: "1rem" }}>
                <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.75rem" }}>
                  Business Enterprise Details
                </Surface>

                <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "0.875rem", marginBottom: "0.875rem" }}>
                  <Field
                    label="Enterprise / Trade Name"
                    placeholder="e.g. Awadh Biofuel & Agro Solutions"
                    value={businessName}
                    onChange={(val) => setBusinessName(val)}
                    isRequired
                    width="100%"
                  />
                  <Field
                    label="PAN (Personal or Enterprise)"
                    placeholder="ABCDE1234F"
                    value={pan}
                    onChange={(val) => setPan(val.toUpperCase())}
                    width="100%"
                  />
                </Surface>

                <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "0.875rem" }}>
                  <Surface>
                    <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)", display: 'block', marginBottom: "0.375rem" }}>
                      Entity Structure
                    </label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: "0.625rem 0.75rem",
                        borderRadius: "0.5rem",
                        border: "0.0625rem solid #cbd5e1",
                        fontSize: "0.8125rem",
                        color: "var(--navy)",
                        background: "var(--white)",
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
                    <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)", display: 'block', marginBottom: "0.375rem" }}>
                      Primary Service Required
                    </label>
                    <select
                      value={initialService}
                      onChange={(e) => setInitialService(e.target.value)}
                      style={{
                        width: '100%',
                        padding: "0.625rem 0.75rem",
                        borderRadius: "0.5rem",
                        border: "0.0625rem solid #cbd5e1",
                        fontSize: "0.8125rem",
                        color: "var(--navy)",
                        background: "var(--white)",
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
              <Surface style={{ borderTop: "0.0625rem solid var(--sage-light)", paddingTop: "1rem" }}>
                <Surface style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.75rem" }}>
                  Location &amp; Pincode
                </Surface>

                <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "0.875rem" }}>
                  <Field
                    label="City"
                    placeholder="e.g. Lucknow"
                    value={city}
                    onChange={(val) => setCity(val)}
                    isRequired
                    width="100%"
                  />
                  <Field
                    label="State"
                    placeholder="e.g. Uttar Pradesh"
                    value={state}
                    onChange={(val) => setState(val)}
                    isRequired
                    width="100%"
                  />
                  <Field
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
              <Surface style={{ borderTop: "0.0625rem solid var(--sage-light)", paddingTop: "1rem" }}>
                <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "0.875rem" }}>
                  <Surface>
                    <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)", display: 'block', marginBottom: "0.375rem" }}>
                      Partner Referral Code (Auto-Locked)
                    </label>
                    <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", padding: "0.625rem 0.75rem", background: "var(--sage-light)", borderRadius: "0.5rem", border: "0.0625rem solid #cbd5e1", fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>
                      <Lock size={15} color="var(--muted)" />
                      <Inline>{agent.referralCode} ({agent.id})</Inline>
                    </Surface>
                  </Surface>

                  <Surface>
                    <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)", display: 'block', marginBottom: "0.375rem" }}>
                      Affiliated Franchise
                    </label>
                    <Surface style={{ padding: "0.625rem 0.75rem", background: "var(--sage-light)", borderRadius: "0.5rem", border: "0.0625rem solid #cbd5e1", fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600 }}>
                      {agent.franchiseCode} - {agent.franchiseName}
                    </Surface>
                  </Surface>
                </Surface>
              </Surface>

              <Surface style={{ marginTop: "0.75rem" }}>
                <ActionButton
                  label="Register Customer &amp; Create Account"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<UserPlus size={16} />}
                  width="100%"
                  isDisabled={!fname.trim() || !email.trim() || !phone.trim()}
                />
              </Surface>
            </Stack>
          </form>
        </Panel>
      )}
    </Surface>
  );
};

export default AgentOnboardCustomerPage;
