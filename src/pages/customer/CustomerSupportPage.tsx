import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
import {
  LifeBuoy,
  Mail,
  MapPin,
  Phone,
  Send
} from 'lucide-react';
import React, { useState } from 'react';
import type { SupportTicket } from '../../features/customer/customerData';
import { INITIAL_APPLICATIONS, INITIAL_SUPPORT_TICKETS } from '../../features/customer/customerData';

export const CustomerSupportPage: React.FC = () => {
  const applications = INITIAL_APPLICATIONS;
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_SUPPORT_TICKETS);

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<SupportTicket['category']>('Filing Query');
  const [selectedAppId, setSelectedAppId] = useState(applications[0].id);
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<SupportTicket['priority']>('Medium');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    const newTicket: SupportTicket = {
      id: `TCK-2026-${Math.floor(100 + Math.random() * 900)}`,
      subject: subject.trim(),
      category: category,
      applicationId: selectedAppId,
      status: 'Open',
      priority: priority,
      createdAt: 'Just now',
      lastReply: 'Ticket received. Assigned to Helpdesk.',
    };

    setTickets((prev) => [newTicket, ...prev]);
    setSubject('');
    setMessage('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const faqs = [
    {
      q: 'How long does GST registration typically take?',
      a: 'Once all documents (PAN, Aadhaar, electricity bill, and premises NOC) are verified, filing is completed within 24 to 48 hours. ARN acknowledgement is issued immediately, and GSTIN registration certificate is approved by the tax officer within 3 to 7 working days.',
    },
    {
      q: 'How is a Chartered Accountant assigned to my application?',
      a: 'Our Operations Coordinator desk automatically reviews your application scope and assigns a certified CA specializing in that discipline (e.g. corporate incorporation, GST audit, or trademark filing). You will be notified in your portal once assigned.',
    },
    {
      q: 'Where can I download my payment tax invoice?',
      a: 'All invoices are available instantly under Payments & Invoices in your portal. You can view or print official GST-compliant tax invoices anytime.',
    },
  ];

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Customer Support & Helpdesk
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Submit support inquiries, report filing hurdles, or speak directly with our Lucknow operational team.
        </p>
      </Surface>

      {isSubmitted && (
        <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
          <Banner
            status="success"
            title="Support Ticket Created Successfully"
            description="Your inquiry has been assigned to our operations coordinator team. Expected response within 2 hours."
          />
        </Surface>
      )}

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "var(--spacing-fsk-20)", alignItems: 'flex-start' }}>
        {/* Left Column: Create Ticket Form */}
        <Surface>
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", marginBottom: "var(--spacing-fsk-20)" }}>
            <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-5)" }}>
              Create Support Ticket
            </Surface>

            <form onSubmit={handleCreateTicket}>
              <VStack gap={3}>
                <TextInput
                  label="Ticket Subject"
                  placeholder="e.g. Query regarding DSC signature in Pvt Ltd"
                  value={subject}
                  onChange={(val) => setSubject(val)}
                  isRequired
                  width="100%"
                />

                <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-23)" }}>
                  <Surface>
                    <label style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)", display: 'block', marginBottom: "var(--spacing-fsk-17)" }}>
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
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
                      <option value="Filing Query">Filing Query</option>
                      <option value="Document Request">Document Request</option>
                      <option value="Billing & Refund">Billing &amp; Refund</option>
                      <option value="Technical">Technical</option>
                    </select>
                  </Surface>

                  <Surface>
                    <label style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)", display: 'block', marginBottom: "var(--spacing-fsk-17)" }}>
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
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
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </Surface>

                  <Surface>
                    <label style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-7)", display: 'block', marginBottom: "var(--spacing-fsk-17)" }}>
                      Related Application
                    </label>
                    <select
                      value={selectedAppId}
                      onChange={(e) => setSelectedAppId(e.target.value)}
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
                      {applications.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.id} ({app.serviceName})
                        </option>
                      ))}
                    </select>
                  </Surface>
                </Surface>

                <TextInput
                  label="Inquiry Details"
                  placeholder="Describe your issue or question in detail..."
                  value={message}
                  onChange={(val) => setMessage(val)}
                  width="100%"
                />

                <Surface style={{ marginTop: "var(--spacing-fsk-12)" }}>
                  <Button
                    label="Submit Support Ticket"
                    variant="primary"
                    size="md"
                    width="100%"
                    type="submit"
                    icon={<Send size={15} />}
                    isDisabled={!subject.trim()}
                  />
                </Surface>
              </VStack>
            </form>
          </Card>

          {/* Active Tickets List */}
          <Surface style={{ fontSize: "var(--font-fsk-10)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-8)" }}>
            My Active Support Tickets ({tickets.length})
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-8)" }}>
            {tickets.map((t) => (
              <Card key={t.id} elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
                <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: "var(--spacing-fsk-12)" }}>
                  <Surface>
                    <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-15)" }}>{t.id}</Inline>
                    <Surface style={{ fontSize: "var(--font-fsk-91)", fontWeight: 700, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-47)" }}>
                      {t.subject}
                    </Surface>
                  </Surface>
                  <Badge
                    label={t.status}
                    variant={t.status === 'Resolved' ? 'green' : t.status === 'In Progress' ? 'orange' : 'blue'}
                  />
                </Surface>

                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginBottom: "var(--spacing-fsk-12)" }}>
                  Category: <strong>{t.category}</strong> {t.applicationId ? `• File: ${t.applicationId}` : ''} • Created: {t.createdAt}
                </Surface>

                <Surface style={{ background: "var(--color-fsk-27)", padding: "var(--spacing-fsk-12) var(--spacing-fsk-8)", borderRadius: "var(--radius-fsk-37)", fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-25)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)" }}>
                  <strong>Latest Note:</strong> {t.lastReply}
                </Surface>
              </Card>
            ))}
          </Surface>
        </Surface>

        {/* Right Column: Contact Channels & FAQs */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-26)" }}>
          {/* Helpdesk Contact Card */}
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-23)" }}>
              <Surface style={{ width: "var(--spacing-fsk-90)", height: "var(--spacing-fsk-90)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-112)", color: "var(--color-fsk-15)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LifeBuoy size={20} />
              </Surface>
              <Surface>
                <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 600, textTransform: 'uppercase' }}>
                  Customer Support Center
                </Inline>
                <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                  Direct Channels
                </Surface>
              </Surface>
            </Surface>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-8)", fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-25)" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                <Phone size={16} color="var(--color-fsk-15)" />
                <Inline>+91 9120000000 (Mon–Sat, 9:30 AM–6:30 PM)</Inline>
              </Surface>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                <Mail size={16} color="var(--color-fsk-15)" />
                <Inline>support@finservkart.com</Inline>
              </Surface>
              <Surface style={{ display: 'flex', alignItems: 'flex-start', gap: "var(--spacing-fsk-35)" }}>
                <MapPin size={16} color="var(--color-fsk-15)" style={{ flexShrink: 0, marginTop: "var(--spacing-fsk-47)" }} />
                <Inline>Jankipuram Garden, Jankipuram, Lucknow, UP 226021</Inline>
              </Surface>
            </Surface>
          </Card>

          {/* FAQs Accordion */}
          <Card elevation="low" padding={5} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-23)" }}>
              Frequently Asked Questions
            </Surface>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-23)" }}>
              {faqs.map((faq, idx) => (
                <Surface key={idx} style={{ borderBottom: idx === faqs.length - 1 ? 'none' : "var(--spacing-fsk-22) solid var(--color-fsk-165)", paddingBottom: idx === faqs.length - 1 ? 0 : "var(--spacing-fsk-8)" }}>
                  <Surface style={{ fontWeight: 700, fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-29)" }}>
                    {faq.q}
                  </Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", lineHeight: 1.5 }}>
                    {faq.a}
                  </Surface>
                </Surface>
              ))}
            </Surface>
          </Card>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default CustomerSupportPage;
