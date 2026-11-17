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
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 20px 80px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#0066cc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Get in Touch
        </span>
        <Heading level={1}>
          <span style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', display: 'block', marginTop: '6px' }}>
            We're Here to Support Your Business
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0 auto' }}>
          Have questions regarding service requirements, tax filing, or custom corporate compliance? Reach our advisory team.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px' }}>
        {/* Contact Form */}
        <Card elevation="low" padding={4}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Send Us a Message
          </h3>

          {errorMessage && (
            <div style={{ marginBottom: '20px' }}>
              <Banner status="error" title={errorMessage} />
            </div>
          )}

          {successMessage && (
            <div style={{ marginBottom: '20px' }}>
              <Banner status="success" title={successMessage} />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <VStack gap={3}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
              </div>

              <div>
                <TextInput
                  type="email"
                  label="Email Address"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(val) => setEmail(val)}
                  isRequired
                  width="100%"
                />
              </div>

              <div>
                <TextInput
                  label="Subject"
                  placeholder="e.g. GST Registration Inquiry"
                  value={subject}
                  onChange={(val) => setSubject(val)}
                  isRequired
                  width="100%"
                />
              </div>

              <div>
                <TextArea
                  label="Message / Requirements"
                  placeholder="Describe your inquiry or requirement..."
                  value={message}
                  onChange={(val) => setMessage(val)}
                  rows={4}
                  isRequired
                  width="100%"
                />
              </div>

              <div style={{ marginTop: '8px' }}>
                <Button
                  label={isLoading ? 'Sending...' : 'Send Message'}
                  variant="primary"
                  size="md"
                  width="100%"
                  type="submit"
                  isLoading={isLoading}
                  endContent={<Send size={15} style={{ marginLeft: '6px' }} />}
                />
              </div>
            </VStack>
          </form>
        </Card>

        {/* Office & Map Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card elevation="low" padding={4}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
              Office Headquarters
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin size={20} color="#0066cc" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#0f172a' }}>Finservkart Corporate Office</strong>
                  <div style={{ color: '#64748b', marginTop: '2px' }}>
                    Jankipuram Garden, Jankipuram, Lucknow, Uttar Pradesh 226021, India
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={20} color="#0066cc" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0f172a' }}>Direct Phone</strong>
                  <div style={{ color: '#64748b' }}>+91 9120000000</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={20} color="#0066cc" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0f172a' }}>Email Support</strong>
                  <div style={{ color: '#64748b' }}>info@finservkart.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={20} color="#0066cc" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#0f172a' }}>Working Hours</strong>
                  <div style={{ color: '#64748b' }}>Monday – Saturday: 9:30 AM – 6:30 PM IST</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Embedded Google Map matching original website */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '280px', border: '1px solid #e2e8f0' }}>
            <iframe
              title="Finservkart Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7114.536523637259!2d80.95776159273686!3d26.926708772270473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399957a1a4d5f6e3%3A0xdc4f658729c7b67b!2sJankipuram%20Garden%2C%20Jankipuram%2C%20Lucknow%2C%20Uttar%20Pradesh%20226021!5e0!3m2!1sen!2sin!4v1710649185981!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

