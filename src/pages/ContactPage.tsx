import { Surface, Inline } from '../components/Surface';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextArea } from '@astryxdesign/core/TextArea';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import api from '../api/client';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Uttar Pradesh');
  const [subject, setSubject] = useState('');
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto', padding: "var(--spacing-fsk-1) var(--spacing-fsk-2) var(--spacing-fsk-3) var(--spacing-fsk-2)" }}>
      <Surface style={{ textAlign: 'center', marginBottom: "var(--spacing-fsk-4)" }}>
        <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-15)", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Get in Touch
        </Inline>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-6)", fontWeight: 800, color: "var(--color-fsk-7)", display: 'block', marginTop: "var(--spacing-fsk-17)" }}>
            We're Here to Support Your Business
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-19)", marginTop: "var(--spacing-fsk-12)", maxWidth: "var(--spacing-fsk-106)", margin: "var(--spacing-fsk-12) auto 0 auto" }}>
          Have questions regarding service requirements, tax filing, or custom corporate compliance? Reach our advisory team.
        </p>
      </Surface>

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 21.25rem), 1fr))", gap: "var(--spacing-fsk-4)" }}>
        {/* Contact Form */}
        <Card elevation="low" padding={4}>
          <h3 style={{ fontSize: "var(--font-fsk-61)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-5)" }}>
            Send Us a Message
          </h3>

          {errorMessage && (
            <Surface style={{ marginBottom: "var(--spacing-fsk-2)" }}>
              <Banner status="error" title={errorMessage} />
            </Surface>
          )}

          {successMessage && (
            <Surface style={{ marginBottom: "var(--spacing-fsk-2)" }}>
              <Banner status="success" title={successMessage} />
            </Surface>
          )}

          <form onSubmit={handleSubmit}>
            <VStack gap={3}>
              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
                <TextInput
                  label="Country"
                  value={country}
                  onChange={(val) => setCountry(val)}
                  isRequired
                  width="100%"
                />
                <TextInput
                  label="State"
                  value={state}
                  onChange={(val) => setState(val)}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
                <TextInput
                  label="Your Name"
                  placeholder="Full name"
                  value={name}
                  onChange={(val) => setName(val)}
                  isRequired
                  width="100%"
                />
                <TextInput
                  label="Phone Number"
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(val) => setPhone(val)}
                  width="100%"
                />
              </Surface>

              <Surface>
                <TextInput
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
                <TextInput
                  label="Subject"
                  placeholder="e.g. GST Registration Inquiry"
                  value={subject}
                  onChange={(val) => setSubject(val)}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface>
                <TextArea
                  label="Message / Requirements"
                  placeholder="Describe your inquiry or requirement..."
                  value={message}
                  onChange={(val) => setMessage(val)}
                  rows={4}
                  isRequired
                  width="100%"
                />
              </Surface>

              <Surface style={{ marginTop: "var(--spacing-fsk-12)" }}>
                <Button
                  label={isLoading ? 'Sending...' : 'Send Message'}
                  variant="primary"
                  size="md"
                  width="100%"
                  type="submit"
                  isLoading={isLoading}
                  endContent={<Send size={15} style={{ marginLeft: "var(--spacing-fsk-17)" }} />}
                />
              </Surface>
            </VStack>
          </form>
        </Card>

        {/* Office & Map Details */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-26)" }}>
          <Card elevation="low" padding={4}>
            <h3 style={{ fontSize: "var(--font-fsk-61)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-5)" }}>
              Office Headquarters
            </h3>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-5)", fontSize: "var(--font-fsk-24)" }}>
              <Surface style={{ display: 'flex', alignItems: 'flex-start', gap: "var(--spacing-fsk-8)" }}>
                <MapPin size={20} color="var(--color-fsk-15)" style={{ flexShrink: 0, marginTop: "var(--spacing-fsk-47)" }} />
                <Surface>
                  <strong style={{ color: "var(--color-fsk-7)" }}>Finservkart Corporate Office</strong>
                  <Surface style={{ color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-47)" }}>
                    Jankipuram Garden, Jankipuram, Lucknow, Uttar Pradesh 226021, India
                  </Surface>
                </Surface>
              </Surface>

              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-8)" }}>
                <Phone size={20} color="var(--color-fsk-15)" style={{ flexShrink: 0 }} />
                <Surface>
                  <strong style={{ color: "var(--color-fsk-7)" }}>Direct Phone</strong>
                  <Surface style={{ color: "var(--color-fsk-9)" }}>+91 9120000000</Surface>
                </Surface>
              </Surface>

              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-8)" }}>
                <Mail size={20} color="var(--color-fsk-15)" style={{ flexShrink: 0 }} />
                <Surface>
                  <strong style={{ color: "var(--color-fsk-7)" }}>Email Support</strong>
                  <Surface style={{ color: "var(--color-fsk-9)" }}>info@finservkart.com</Surface>
                </Surface>
              </Surface>

              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-8)" }}>
                <Clock size={20} color="var(--color-fsk-15)" style={{ flexShrink: 0 }} />
                <Surface>
                  <strong style={{ color: "var(--color-fsk-7)" }}>Working Hours</strong>
                  <Surface style={{ color: "var(--color-fsk-9)" }}>Monday – Saturday: 9:30 AM – 6:30 PM IST</Surface>
                </Surface>
              </Surface>
            </Surface>
          </Card>

          {/* Embedded Google Map matching original website */}
          <Surface style={{ borderRadius: "var(--radius-fsk-28)", overflow: 'hidden', height: "var(--spacing-fsk-45)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
            <iframe
              title="Finservkart Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7114.536523637259!2d80.95776159273686!3d26.926708772270473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399957a1a4d5f6e3%3A0xdc4f658729c7b67b!2sJankipuram%20Garden%2C%20Jankipuram%2C%20Lucknow%2C%20Uttar%20Pradesh%20226021!5e0!3m2!1sen!2sin!4v1710649185981!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </Surface>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default ContactPage;

