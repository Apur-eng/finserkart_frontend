import { ActionButton, Panel, Title, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import {
  Clock,
  Send,
  ShieldCheck
} from 'lucide-react';
import React, { useState } from 'react';
import type { ChatMessage } from '../../features/customer/customerData';
import {
  INITIAL_CA_APPLICATIONS,
  INITIAL_CA_PROFILE
} from '../../features/ca/caData';

export const CAConversationsPage: React.FC = () => {
  const ca = INITIAL_CA_PROFILE;
  const applications = INITIAL_CA_APPLICATIONS;

  const [selectedAppId, setSelectedAppId] = useState(applications[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'MSG-CA-01',
      applicationId: 'FK-SRV-9041',
      sender: 'customer',
      senderName: 'Ananya Verma',
      timestamp: 'Yesterday at 02:40 PM',
      message: 'Hello CA Vivek, I have uploaded the updated premises electricity bill as requested. Could you please check if it meets the requirements?',
    },
    {
      id: 'MSG-CA-02',
      applicationId: 'FK-SRV-9041',
      sender: 'ca',
      senderName: 'CA Vivek Agrawal',
      timestamp: 'Yesterday at 04:15 PM',
      message: 'Hello Ananya. I have reviewed the bill. The address matches your partnership deed, but please make sure the owner NOC is signed by the registered landlord.',
    },
    {
      id: 'MSG-CA-03',
      applicationId: 'FK-SRV-9041',
      sender: 'customer',
      senderName: 'Ananya Verma',
      timestamp: 'Today at 10:15 AM',
      message: 'Got it, the landlord signed copy has been uploaded to the document section. What is the next step for ARN filing?',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const currentApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const newMsg: ChatMessage = {
      id: `MSG-CA-${Date.now()}`,
      applicationId: selectedAppId,
      sender: 'ca',
      senderName: `CA ${ca.fname} ${ca.lname}`,
      timestamp: 'Just now',
      message: text,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <Surface style={{ maxWidth: "62.5rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "1.5rem" }}>
        <Title level={1}>
          <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
            Customer Communications & Queries
          </Inline>
        </Title>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
          Direct advisory channel with client applicants for filing clarifications, OTP requests, and document deficiencies.
        </p>
      </Surface>

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1.25rem", alignItems: 'flex-start' }}>
        {/* Left: Applications Thread Selector */}
        <Panel elevation="low" padding={3} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
          <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#687d93", textTransform: 'uppercase', padding: "0.375rem 0.5rem 0.75rem" }}>
            Active Client Threads
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.375rem" }}>
            {applications.map((app) => {
              const isSelected = app.id === selectedAppId;
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => setSelectedAppId(app.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left',
                    padding: "0.625rem 0.75rem",
                    borderRadius: "0.5rem",
                    border: 'none',
                    background: isSelected ? "#f5f3ff" : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: "0.125rem" }}>
                    <Inline style={{ fontSize: "0.8125rem", fontWeight: isSelected ? 700 : 600, color: isSelected ? "#7c3aed" : "var(--navy)" }}>
                      {app.customerName}
                    </Inline>
                    <Inline style={{ fontSize: "0.8125rem", color: "#687d93", fontFamily: 'monospace' }}>#{app.id}</Inline>
                  </Surface>
                  <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{app.serviceName}</Inline>
                </button>
              );
            })}
          </Surface>
        </Panel>

        {/* Right: Message Window */}
        <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
          {/* Header of Conversation */}
          <Surface
            style={{
              padding: "0.875rem 1.25rem",
              borderBottom: "0.0625rem solid var(--border)",
              background: "var(--cream)",
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
              <Surface
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: '50%',
                  background: "#f5f3ff",
                  color: "#7c3aed",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                }}
              >
                {currentApp.customerName[0]}
              </Surface>
              <Surface>
                <Surface style={{ fontSize: "0.90625rem", fontWeight: 700, color: "var(--navy)" }}>
                  {currentApp.customerName} ({currentApp.businessName})
                </Surface>
                <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
                  Filing: {currentApp.serviceName} • Dossier #{currentApp.id}
                </Surface>
              </Surface>
            </Surface>

            <Surface style={{ fontSize: "0.8125rem", color: "var(--teal)", display: 'flex', alignItems: 'center', gap: "0.25rem", fontWeight: 600 }}>
              <ShieldCheck size={14} /> Official Advisory Channel
            </Surface>
          </Surface>

          {/* Messages Body */}
          <Surface
            style={{
              padding: "1.25rem",
              minHeight: "21.25rem",
              maxHeight: "27.5rem",
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: "1rem",
              background: "#fcfcfc",
            }}
          >
            {messages.map((msg) => {
              const isCA = msg.sender === 'ca';
              return (
                <Surface
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isCA ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Surface
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: "0.375rem",
                      marginBottom: "0.25rem",
                      fontSize: "0.8125rem",
                      color: "#687d93",
                    }}
                  >
                    <Inline>{msg.senderName}</Inline>
                    <Inline>•</Inline>
                    <Inline style={{ display: 'flex', alignItems: 'center', gap: "0.125rem" }}>
                      <Clock size={10} /> {msg.timestamp}
                    </Inline>
                  </Surface>

                  <Surface
                    style={{
                      maxWidth: '75%',
                      padding: "0.75rem 1rem",
                      borderRadius: isCA ? "0.875rem 0.875rem 0.125rem 0.875rem" : "0.875rem 0.875rem 0.875rem 0.125rem",
                      background: isCA ? "#7c3aed" : "var(--white)",
                      color: isCA ? "var(--white)" : "var(--navy)",
                      fontSize: "0.8125rem",
                      lineHeight: 1.5,
                      border: isCA ? 'none' : "0.0625rem solid #e2e8f0",
                      boxShadow: "var(--shadow-panel)",
                    }}
                  >
                    {msg.message}
                  </Surface>
                </Surface>
              );
            })}
          </Surface>

          {/* Footer Input */}
          <Surface style={{ padding: "0.875rem 1.125rem", borderTop: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: "0.625rem", alignItems: 'center' }}>
              <Surface style={{ flex: 1 }}>
                <Field
                  label="Advisory Message"
                  placeholder={`Send regulatory advice or instructions to ${currentApp.customerName}...`}
                  value={inputText}
                  onChange={(val) => setInputText(val)}
                  width="100%"
                />
              </Surface>
              <ActionButton
                label="Send"
                variant="primary"
                size="md"
                type="submit"
                icon={<Send size={15} />}
                isDisabled={!inputText.trim()}
              />
            </form>
          </Surface>
        </Panel>
      </Surface>
    </Surface>
  );
};

export default CAConversationsPage;
