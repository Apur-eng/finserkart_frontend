import { Surface, Inline } from '../../components/Surface';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  Clock,
  Send,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import React, { useState } from 'react';
import type { ChatMessage } from '../../features/customer/customerData';
import {
  INITIAL_APPLICATIONS,
  INITIAL_CONVERSATIONS,
  INITIAL_CUSTOMER_PROFILE
} from '../../features/customer/customerData';

export const CustomerConversationsPage: React.FC = () => {
  const profile = INITIAL_CUSTOMER_PROFILE;
  const applications = INITIAL_APPLICATIONS;

  const [selectedAppId, setSelectedAppId] = useState(applications[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CONVERSATIONS);
  const [inputText, setInputText] = useState('');

  const currentApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const newMsg: ChatMessage = {
      id: `MSG-${Date.now()}`,
      applicationId: selectedAppId,
      sender: 'customer',
      senderName: `${profile.fname} ${profile.lname}`,
      timestamp: 'Just now',
      message: text,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulated CA Response
    setTimeout(() => {
      const caReply: ChatMessage = {
        id: `MSG-CA-${Date.now()}`,
        applicationId: selectedAppId,
        sender: 'ca',
        senderName: currentApp.assignedCA?.name || 'Assigned CA',
        timestamp: 'Just now',
        message: 'Thank you for the update. I have recorded this in your statutory application draft.',
      };
      setMessages((prev) => [...prev, caReply]);
    }, 1200);
  };

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            CA Communication & Queries
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Direct communication channel with your assigned Chartered Accountant for query resolution and filing clarifications.
        </p>
      </Surface>

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "var(--spacing-fsk-26)", alignItems: 'flex-start' }}>
        {/* Left Column: Chat Container */}
        <Surface style={{ gridColumn: 'span 2' }}>
          <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden', display: 'flex', flexDirection: 'column', height: "var(--spacing-fsk-117)" }}>
            {/* Chat Header */}
            <Surface
              style={{
                padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
                borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
                background: "var(--color-fsk-27)",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-8)" }}>
                <Surface style={{ width: "var(--spacing-fsk-90)", height: "var(--spacing-fsk-90)", borderRadius: '50%', background: "var(--color-fsk-112)", color: "var(--color-fsk-15)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCheck size={20} />
                </Surface>
                <Surface>
                  <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)", fontSize: "var(--font-fsk-91)" }}>
                    {currentApp.assignedCA?.name || 'Operations Desk'}
                  </Surface>
                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)" }}>
                    {currentApp.assignedCA ? `ID: ${currentApp.assignedCA.id} • Active on your file` : 'Allocation Desk'}
                  </Surface>
                </Surface>
              </Surface>

              {/* Application Selector */}
              <Surface>
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                  style={{
                    padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                    borderRadius: "var(--radius-fsk-37)",
                    border: "var(--spacing-fsk-22) solid var(--color-fsk-59)",
                    fontSize: "var(--font-fsk-14)",
                    color: "var(--color-fsk-7)",
                    background: "var(--color-fsk-38)",
                    outline: 'none',
                    fontWeight: 600,
                  }}
                >
                  {applications.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.id} - {app.serviceName}
                    </option>
                  ))}
                </select>
              </Surface>
            </Surface>

            {/* Message Stream */}
            <Surface
              style={{
                flex: 1,
                padding: "var(--spacing-fsk-2)",
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: "var(--spacing-fsk-23)",
                background: "var(--color-fsk-27)",
              }}
            >
              {messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                return (
                  <Surface
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isCustomer ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Surface
                      style={{
                        maxWidth: '75%',
                        padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)",
                        borderRadius: isCustomer ? "var(--spacing-fsk-23) var(--spacing-fsk-23) var(--spacing-fsk-47) var(--spacing-fsk-23)" : "var(--spacing-fsk-23) var(--spacing-fsk-23) var(--spacing-fsk-23) var(--spacing-fsk-47)",
                        background: isCustomer ? "var(--color-fsk-15)" : "var(--color-fsk-38)",
                        color: isCustomer ? "var(--color-fsk-38)" : "var(--color-fsk-113)",
                        boxShadow: "var(--shadow-fsk-card)",
                        border: isCustomer ? 'none' : "var(--spacing-fsk-22) solid var(--color-fsk-163)",
                        fontSize: "var(--font-fsk-14)",
                        lineHeight: 1.5,
                      }}
                    >
                      <Surface>{msg.message}</Surface>
                    </Surface>
                    <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)", marginTop: "var(--spacing-fsk-29)", padding: "0 var(--spacing-fsk-29)" }}>
                      {msg.senderName} • {msg.timestamp}
                    </Surface>
                  </Surface>
                );
              })}
            </Surface>

            {/* Message Input Form */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
                background: "var(--color-fsk-38)",
                borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
                display: 'flex',
                gap: "var(--spacing-fsk-35)",
                alignItems: 'center',
              }}
            >
              <Surface style={{ flex: 1 }}>
                <TextInput
                  label="Type your message"
                  placeholder="Type your message or ask a question..."
                  value={inputText}
                  onChange={(val) => setInputText(val)}
                  width="100%"
                />
              </Surface>

              <Surface style={{ paddingTop: "var(--spacing-fsk-2)" }}>
                <Button
                  label="Send"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<Send size={15} />}
                  isDisabled={!inputText.trim()}
                />
              </Surface>
            </form>
          </Card>
        </Surface>

        {/* Right Column: CA Information & SLA */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-2)" }}>
          <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-8)" }}>
              <ShieldCheck size={18} color="var(--color-fsk-15)" />
              <Inline style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                Official Communication Record
              </Inline>
            </Surface>
            <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-18)", lineHeight: 1.5, margin: 0 }}>
              All messages exchanged in this conversation thread are permanently attached to Application Dossier <strong>#{selectedAppId}</strong> for compliance auditing.
            </p>
          </Card>

          <Card elevation="low" padding={4} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-8)" }}>
              <Clock size={18} color="var(--color-fsk-32)" />
              <Inline style={{ fontSize: "var(--font-fsk-24)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                Working Hours &amp; Response SLA
              </Inline>
            </Surface>
            <ul style={{ paddingLeft: "var(--spacing-fsk-36)", margin: 0, fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-18)", lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-17)" }}>
              <li>Monday – Saturday: 09:30 AM – 06:30 PM IST</li>
              <li>Expected response time: within 2 hours during business sessions</li>
              <li>For urgent filing deadlines, contact our helpline at +91 9120000000</li>
            </ul>
          </Card>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default CustomerConversationsPage;
