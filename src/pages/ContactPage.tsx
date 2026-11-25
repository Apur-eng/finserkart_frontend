import { Notice, ActionButton, Panel, Title, MultilineField, Field, Stack } from '../components/ui';
import { Surface, Inline } from '../components/Surface';
import { ArrowUpRight, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';

export const ContactPage: React.FC = () => {
  const [params] = useSearchParams();
  const enquiry = params.get('subject');
  const enquiryTitle = enquiry === 'agent' ? 'Agent partnership enquiry' : enquiry === 'franchise' ? 'Franchise opportunity enquiry' : '';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Uttar Pradesh');
  const [subject, setSubject] = useState(enquiryTitle);
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!name || !email || !subject || !message) {
      setErrorMessage('Please fill in all mandatory inquiry fields.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.submitContact({
        country,
        state,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      });

      if (response.status === 'success') {
        setSuccessMessage(response.message || 'Thank you! We will connect with you very soon.');
        setName('');
        setPhone('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setErrorMessage(response.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Network error submitting contact request.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Surface style={{ maxWidth: "77.5rem", margin: '0 auto', padding: "clamp(1rem, 3.076923076923077vw, 2.5rem) 1.25rem clamp(1rem, 6.153846153846154vw, 5rem) 1.25rem" }}>
      <Surface style={{ textAlign: 'center', marginBottom: "clamp(1rem, 3.6923076923076925vw, 3rem)" }}>
        <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--blue)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Get in Touch
        </Inline>
        <Title level={1}>
          <Inline style={{ fontSize: "clamp(1.5rem, 2.769230769230769vw, 2.25rem)", fontWeight: 800, color: "var(--navy)", display: 'block', marginTop: "0.375rem" }}>
            We're Here to Support Your Business
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.9375rem", marginTop: "0.5rem", maxWidth: "37.5rem", margin: "0.5rem auto 0 auto" }}>
          Have questions regarding service requirements, tax filing, or custom corporate compliance? Reach our advisory team.
        </p>
      </Surface>

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 21.25rem), 1fr))", gap: "clamp(1rem, 3.6923076923076925vw, 3rem)" }}>
        {/* Contact Form */}
        <Panel elevation="low" padding={4}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
            Send Us a Message
          </h3>

          {errorMessage && (
            <Surface style={{ marginBottom: "1.25rem" }}>
              <Notice status="error" title={errorMessage} />
            </Surface>
          )}

          {successMessage && (
            <Surface style={{ marginBottom: "1.25rem" }}>
              <Notice status="success" title={successMessage} />
            </Surface>
          )}

          <form onSubmit={handleSubmit}>
            <Stack gap={3}>
              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
                <Field
                  label="Country"
                  value={country}
                  onChange={(val) => setCountry(val)}
                  isRequired
                  width="100%"
                />
                <Field
                  label="State"
                  value={state}
                  onChange={(val) => setState(val)}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
                <Field
                  label="Your Name"
                  placeholder="Full name"
                  value={name}
                  onChange={(val) => setName(val)}
                  isRequired
                  width="100%"
                />
                <Field
                  label="Phone Number"
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(val) => setPhone(val)}
                  width="100%"
                />
              </Surface>

              <Surface>
                <Field
                  type="email"
                  label="Email Address"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(val) => setEmail(val)}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface>
                <Field
                  label="Subject"
                  placeholder="e.g. GST Registration Inquiry"
                  value={subject}
                  onChange={(val) => setSubject(val)}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface>
                <MultilineField
                  label="Message / Requirements"
                  placeholder="Describe your inquiry or requirement..."
                  value={message}
                  onChange={(val) => setMessage(val)}
                  rows={4}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface style={{ marginTop: "0.5rem" }}>
                <ActionButton
                  label={isLoading ? 'Sending...' : 'Send Message'}
                  variant="primary"
                  size="md"
                  width="100%"
                  type="submit"
                  isLoading={isLoading}
                  endContent={<Send size={15} style={{ marginLeft: "0.375rem" }} />}
                />
              </Surface>
            </Stack>
          </form>
        </Panel>

        <aside className="contact-aside"><p className="eyebrow">LET?S FIND YOUR NEXT STEP</p><h2>{enquiryTitle || 'A conversation starts here.'}</h2><p>{enquiry === 'agent' ? 'Tell us about your experience and the customers you want to support. Ask the team about agent onboarding and applicable programme terms.' : enquiry === 'franchise' ? 'Tell us about your business and the network you want to build. Ask the team about franchise opportunities and onboarding requirements.' : 'Tell us about your service requirements or partnership interests. Include the details that will help the team understand your enquiry.'}</p><div><h3>Service enquiries</h3><p>Ask about document requirements, listed fees or the next step for a service.</p></div><div><h3>Partnership enquiries</h3><p>Explore agent and franchise opportunities. This form sends an enquiry; it does not register a partner account.</p></div><a href="/services">Explore services <ArrowUpRight size={16}/></a></aside>
      </Surface>
    </Surface>
  );
};

export default ContactPage;

