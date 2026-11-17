import { Badge } from '@astryxdesign/core/Badge';
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
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Customer Support & Helpdesk
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Submit support inquiries, report filing hurdles, or speak directly with our Lucknow operational team.
        </p>
      </div>

      {isSubmitted && (
        <div style={{ marginBottom: '24px' }}>
          <Banner
            status="success"
            title="Support Ticket Created Successfully"
            description="Your inquiry has been assigned to our operations coordinator team. Expected response within 2 hours."
          />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'flex-start' }}>
        {/* Left Column: Create Ticket Form */}
        <div>
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', marginBottom: '28px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
              Create Support Ticket
            </div>

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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
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
                      <option value="Filing Query">Filing Query</option>
                      <option value="Document Request">Document Request</option>
                      <option value="Billing & Refund">Billing &amp; Refund</option>
                      <option value="Technical">Technical</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
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
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                      Related Application
                    </label>
                    <select
                      value={selectedAppId}
                      onChange={(e) => setSelectedAppId(e.target.value)}
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
                      {applications.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.id} ({app.serviceName})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <TextInput
                  label="Inquiry Details"
                  placeholder="Describe your issue or question in detail..."
                  value={message}
                  onChange={(val) => setMessage(val)}
                  width="100%"
                />

                <div style={{ marginTop: '8px' }}>
                  <Button
                    label="Submit Support Ticket"
                    variant="primary"
                    size="md"
                    width="100%"
                    type="submit"
                    icon={<Send size={15} />}
                    isDisabled={!subject.trim()}
                  />
                </div>
              </VStack>
            </form>
          </Card>

          {/* Active Tickets List */}
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
            My Active Support Tickets ({tickets.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tickets.map((t) => (
              <Card key={t.id} elevation="low" padding={4} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0066cc' }}>{t.id}</span>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                      {t.subject}
                    </div>
                  </div>
                  <Badge
                    label={t.status}
                    variant={t.status === 'Resolved' ? 'green' : t.status === 'In Progress' ? 'orange' : 'blue'}
                  />
                </div>

                <div style={{ fontSize: '12.5px', color: '#64748b', marginBottom: '8px' }}>
                  Category: <strong>{t.category}</strong> {t.applicationId ? `• File: ${t.applicationId}` : ''} • Created: {t.createdAt}
                </div>

                <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', color: '#334155', border: '1px solid #e2e8f0' }}>
                  <strong>Latest Note:</strong> {t.lastReply}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Contact Channels & FAQs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Helpdesk Contact Card */}
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#e0f2fe', color: '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LifeBuoy size={20} />
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                  Customer Support Center
                </span>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                  Direct Channels
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#0066cc" />
                <span>+91 9120000000 (Mon–Sat, 9:30 AM–6:30 PM)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#0066cc" />
                <span>support@finservkart.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="#0066cc" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Jankipuram Garden, Jankipuram, Lucknow, UP 226021</span>
              </div>
            </div>
          </Card>

          {/* FAQs Accordion */}
          <Card elevation="low" padding={5} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
              Frequently Asked Questions
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ borderBottom: idx === faqs.length - 1 ? 'none' : '1px solid #f1f5f9', paddingBottom: idx === faqs.length - 1 ? 0 : '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>
                    {faq.q}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.5 }}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportPage;
