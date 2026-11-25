import { ActionButton, Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
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
    <Surface style={{ maxWidth: "62.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            CA Communication & Queries
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Direct communication channel with your assigned Chartered Accountant for query resolution and filing clarifications.
        </p>
      </Surface>

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "1.5rem", alignItems: 'flex-start' }}>
        {/* Left Column: Chat Container */}
        <Surface style={{ gridColumn: 'span 2' }}>
          <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden', display: 'flex', flexDirection: 'column', height: "38.75rem" }}>
            {/* Chat Header */}
            <Surface
              style={{
                padding: "1rem 1.25rem",
                borderBottom: "0.0625rem solid var(--border)",
                background: "var(--cream)",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.75rem" }}>
                <Surface style={{ width: "2.375rem", height: "2.375rem", borderRadius: '50%', background: "#e0f2fe", color: "var(--blue)", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCheck size={20} />
                </Surface>
                <Surface>
                  <Surface style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.90625rem" }}>
                    {currentApp.assignedCA?.name || 'Operations Desk'}
                  </Surface>
                  <Surface style={{ fontSize: "0.8125rem", color: "#16a34a" }}>
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
                    padding: "0.375rem 0.75rem",
                    borderRadius: "0.5rem",
                    border: "0.0625rem solid #cbd5e1",
                    fontSize: "0.8125rem",
                    color: "var(--navy)",
                    background: "var(--white)",
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
                padding: "1.25rem",
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: "0.875rem",
                background: "var(--cream)",
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
                        padding: "0.75rem 1rem",
                        borderRadius: isCustomer ? "0.875rem 0.875rem 0.125rem 0.875rem" : "0.875rem 0.875rem 0.875rem 0.125rem",
                        background: isCustomer ? "var(--blue)" : "var(--white)",
                        color: isCustomer ? "var(--white)" : "#243b53",
                        boxShadow: "var(--shadow-panel)",
                        border: isCustomer ? 'none' : "0.0625rem solid #e2e8f0",
                        fontSize: "0.8125rem",
                        lineHeight: 1.5,
                      }}
                    >
                      <Surface>{msg.message}</Surface>
                    </Surface>
                    <Surface style={{ fontSize: "0.8125rem", color: "#687d93", marginTop: "0.25rem", padding: "0 0.25rem" }}>
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
                padding: "1rem 1.25rem",
                background: "var(--white)",
                borderTop: "0.0625rem solid var(--border)",
                display: 'flex',
                gap: "0.625rem",
                alignItems: 'center',
              }}
            >
              <Surface style={{ flex: 1 }}>
                <Field
                  label="Type your message"
                  placeholder="Type your message or ask a question..."
                  value={inputText}
                  onChange={(val) => setInputText(val)}
                  width="100%"
                />
              </Surface>

              <Surface style={{ paddingTop: "1.25rem" }}>
                <ActionButton
                  label="Send"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<Send size={15} />}
                  isDisabled={!inputText.trim()}
                />
              </Surface>
            </form>
          </Panel>
        </Surface>

        {/* Right Column: CA Information & SLA */}
        <Surface style={{ display: 'flex', flexDirection: 'column', gap: "1.25rem" }}>
          <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.75rem" }}>
              <ShieldCheck size={18} color="var(--blue)" />
              <Inline style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>
                Official Communication Record
              </Inline>
            </Surface>
            <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
              All messages exchanged in this conversation thread are permanently attached to Application Dossier <strong>#{selectedAppId}</strong> for compliance auditing.
            </p>
          </Panel>

          <Panel elevation="low" padding={4} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Clock size={18} color="#f59e0b" />
              <Inline style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)" }}>
                Working Hours &amp; Response SLA
              </Inline>
            </Surface>
            <ul style={{ paddingLeft: "1.125rem", margin: 0, fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: "0.375rem" }}>
              <li>Monday – Saturday: 09:30 AM – 06:30 PM IST</li>
              <li>Expected response time: within 2 hours during business sessions</li>
              <li>For urgent filing deadlines, contact our helpline at +91 9120000000</li>
            </ul>
          </Panel>
        </Surface>
      </Surface>
    </Surface>
  );
};

export default CustomerConversationsPage;
