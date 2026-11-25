import { Notice, ActionButton, Panel, Title, Field, Stack } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "62.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Customer Support & Helpdesk
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Submit support inquiries, report filing hurdles, or speak directly with our Lucknow operational team.
        </p>
      </Surface>

      {isSubmitted && (
        <Surface style={{ marginBottom: "1.5rem" }}>
          <Notice
            status="success"
            title="Support Ticket Created Successfully"
            description="Your inquiry has been assigned to our operations coordinator team. Expected response within 2 hours."
          />
        </Surface>
      )}

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "clamp(1rem, 2.1538461538461537vw, 1.75rem)", alignItems: 'flex-start' }}>
        {/* Left Column: Create Ticket Form */}
        <Surface>
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", marginBottom: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
            <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
              Create Support Ticket
            </Surface>

            <form onSubmit={handleCreateTicket}>
              <Stack gap={3}>
                <Field
                  label="Ticket Subject"
                  placeholder="e.g. Query regarding DSC signature in Pvt Ltd"
                  value={subject}
                  onChange={(val) => setSubject(val)}
                  isRequired
                  width="100%"
                />

                <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "0.875rem" }}>
                  <Surface>
                    <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)", display: 'block', marginBottom: "0.375rem" }}>
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
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
                      <option value="Filing Query">Filing Query</option>
                      <option value="Document Request">Document Request</option>
                      <option value="Billing & Refund">Billing &amp; Refund</option>
                      <option value="Technical">Technical</option>
                    </select>
                  </Surface>

                  <Surface>
                    <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)", display: 'block', marginBottom: "0.375rem" }}>
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
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
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </Surface>

                  <Surface>
                    <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy)", display: 'block', marginBottom: "0.375rem" }}>
                      Related Application
                    </label>
                    <select
                      value={selectedAppId}
                      onChange={(e) => setSelectedAppId(e.target.value)}
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
                      {applications.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.id} ({app.serviceName})
                        </option>
                      ))}
                    </select>
                  </Surface>
                </Surface>

                <Field
                  label="Inquiry Details"
                  placeholder="Describe your issue or question in detail..."
                  value={message}
                  onChange={(val) => setMessage(val)}
                  width="100%"
                />

                <Surface style={{ marginTop: "0.5rem" }}>
                  <ActionButton
                    label="Submit Support Ticket"
                    variant="primary"
                    size="md"
                    width="100%"
                    type="submit"
                    icon={<Send size={15} />}
                    isDisabled={!subject.trim()}
                  />
                </Surface>
              </Stack>
            </form>
          </Panel>

          {/* Active Tickets List */}
          <Surface style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.75rem" }}>
            My Active Support Tickets ({tickets.length})
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.75rem" }}>
            {tickets.map((t) => (
              <Panel key={t.id} elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
                <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: "0.5rem" }}>
                  <Surface>
                    <Inline style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--blue)" }}>{t.id}</Inline>
                    <Surface style={{ fontSize: "0.90625rem", fontWeight: 700, color: "var(--navy)", marginTop: "0.125rem" }}>
                      {t.subject}
                    </Surface>
                  </Surface>
                  <Badge
                    label={t.status}
                    variant={t.status === 'Resolved' ? 'green' : t.status === 'In Progress' ? 'orange' : 'blue'}
                  />
                </Surface>

                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
                  Category: <strong>{t.category}</strong> {t.applicationId ? `• File: ${t.applicationId}` : ''} • Created: {t.createdAt}
                </Surface>

                <Surface style={{ background: "var(--cream)", padding: "0.5rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.8125rem", color: "#334155", border: "0.0625rem solid var(--border)" }}>
                  <strong>Latest Note:</strong> {t.lastReply}
                </Surface>
              </Panel>
            ))}
          </Surface>
        </Surface>

        {/* Right Column: Contact Channels & FAQs */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1.5rem" }}>
          {/* Helpdesk Contact Panel */}
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", marginBottom: "0.875rem" }}>
              <Surface style={{ width: "2.375rem", height: "2.375rem", borderRadius: "0.5rem", background: "#e0f2fe", color: "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LifeBuoy size={20} />
              </Surface>
              <Surface>
                <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 600, textTransform: 'uppercase' }}>
                  Customer Support Center
                </Inline>
                <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>
                  Direct Channels
                </Surface>
              </Surface>
            </Surface>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.75rem", fontSize: "0.8125rem", color: "#334155" }}>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                <Phone size={16} color="var(--blue)" />
                <Inline>+91 9120000000 (Mon–Sat, 9:30 AM–6:30 PM)</Inline>
              </Surface>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                <Mail size={16} color="var(--blue)" />
                <Inline>support@finservkart.com</Inline>
              </Surface>
              <Surface style={{ display: 'flex', alignItems: 'flex-start', gap: "0.625rem" }}>
                <MapPin size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                <Inline>Jankipuram Garden, Jankipuram, Lucknow, UP 226021</Inline>
              </Surface>
            </Surface>
          </Panel>

          {/* FAQs Accordion */}
          <Panel elevation="low" padding={5} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.875rem" }}>
              Frequently Asked Questions
            </Surface>

            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.875rem" }}>
              {faqs.map((faq, idx) => (
                <Surface key={idx} style={{ borderBottom: idx === faqs.length - 1 ? 'none' : "0.0625rem solid #f1f5f9", paddingBottom: idx === faqs.length - 1 ? 0 : "0.75rem" }}>
                  <Surface style={{ fontWeight: 700, fontSize: "0.8125rem", color: "var(--navy)", marginBottom: "0.25rem" }}>
                    {faq.q}
                  </Surface>
                  <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5 }}>
                    {faq.a}
                  </Surface>
                </Surface>
              ))}
            </Surface>
          </Panel>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default CustomerSupportPage;
