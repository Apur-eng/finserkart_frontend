import { Surface, Inline } from '../../components/Surface';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { TextInput } from '@astryxdesign/core/TextInput';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-78)", margin: '0 auto' }}>
      {/* Header */}
      <Surface style={{ marginBottom: "var(--spacing-fsk-26)" }}>
        <Heading level={1}>
          <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
            Customer Communications & Queries
          </Inline>
        </Heading>
        <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
          Direct advisory channel with client applicants for filing clarifications, OTP requests, and document deficiencies.
        </p>
      </Surface>

      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "var(--spacing-fsk-2)", alignItems: 'flex-start' }}>
        {/* Left: Applications Thread Selector */}
        <Card elevation="low" padding={3} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
          <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-57)", textTransform: 'uppercase', padding: "var(--spacing-fsk-17) var(--spacing-fsk-12) var(--spacing-fsk-8)" }}>
            Active Client Threads
          </Surface>

          <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-17)" }}>
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
                    padding: "var(--spacing-fsk-35) var(--spacing-fsk-8)",
                    borderRadius: "var(--radius-fsk-37)",
                    border: 'none',
                    background: isSelected ? "var(--color-fsk-53)" : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: "var(--spacing-fsk-47)" }}>
                    <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: isSelected ? 700 : 600, color: isSelected ? "var(--color-fsk-41)" : "var(--color-fsk-7)" }}>
                      {app.customerName}
                    </Inline>
                    <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)", fontFamily: 'monospace' }}>#{app.id}</Inline>
                  </Surface>
                  <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{app.serviceName}</Inline>
                </button>
              );
            })}
          </Surface>
        </Card>

        {/* Right: Message Window */}
        <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
          {/* Header of Conversation */}
          <Surface
            style={{
              padding: "var(--spacing-fsk-23) var(--spacing-fsk-2)",
              borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
              background: "var(--color-fsk-27)",
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
              <Surface
                style={{
                  width: "var(--spacing-fsk-85)",
                  height: "var(--spacing-fsk-85)",
                  borderRadius: '50%',
                  background: "var(--color-fsk-53)",
                  color: "var(--color-fsk-41)",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: "var(--font-fsk-14)",
                }}
              >
                {currentApp.customerName[0]}
              </Surface>
              <Surface>
                <Surface style={{ fontSize: "var(--font-fsk-91)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                  {currentApp.customerName} ({currentApp.businessName})
                </Surface>
                <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
                  Filing: {currentApp.serviceName} • Dossier #{currentApp.id}
                </Surface>
              </Surface>
            </Surface>

            <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-65)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)", fontWeight: 600 }}>
              <ShieldCheck size={14} /> Official Advisory Channel
            </Surface>
          </Surface>

          {/* Messages Body */}
          <Surface
            style={{
              padding: "var(--spacing-fsk-2)",
              minHeight: "var(--spacing-fsk-98)",
              maxHeight: "var(--spacing-fsk-99)",
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: "var(--spacing-fsk-5)",
              background: "var(--color-fsk-100)",
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
                      gap: "var(--spacing-fsk-17)",
                      marginBottom: "var(--spacing-fsk-29)",
                      fontSize: "var(--font-fsk-14)",
                      color: "var(--color-fsk-57)",
                    }}
                  >
                    <Inline>{msg.senderName}</Inline>
                    <Inline>•</Inline>
                    <Inline style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-47)" }}>
                      <Clock size={10} /> {msg.timestamp}
                    </Inline>
                  </Surface>

                  <Surface
                    style={{
                      maxWidth: '75%',
                      padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)",
                      borderRadius: isCA ? "var(--spacing-fsk-23) var(--spacing-fsk-23) var(--spacing-fsk-47) var(--spacing-fsk-23)" : "var(--spacing-fsk-23) var(--spacing-fsk-23) var(--spacing-fsk-23) var(--spacing-fsk-47)",
                      background: isCA ? "var(--color-fsk-41)" : "var(--color-fsk-38)",
                      color: isCA ? "var(--color-fsk-38)" : "var(--color-fsk-7)",
                      fontSize: "var(--font-fsk-14)",
                      lineHeight: 1.5,
                      border: isCA ? 'none' : "var(--spacing-fsk-22) solid var(--color-fsk-163)",
                      boxShadow: "var(--shadow-fsk-card)",
                    }}
                  >
                    {msg.message}
                  </Surface>
                </Surface>
              );
            })}
          </Surface>

          {/* Footer Input */}
          <Surface style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-36)", borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: "var(--spacing-fsk-35)", alignItems: 'center' }}>
              <Surface style={{ flex: 1 }}>
                <TextInput
                  label="Advisory Message"
                  placeholder={`Send regulatory advice or instructions to ${currentApp.customerName}...`}
                  value={inputText}
                  onChange={(val) => setInputText(val)}
                  width="100%"
                />
              </Surface>
              <Button
                label="Send"
                variant="primary"
                size="md"
                type="submit"
                icon={<Send size={15} />}
                isDisabled={!inputText.trim()}
              />
            </form>
          </Surface>
        </Card>
      </Surface>
    </Surface>
  );
};

export default CAConversationsPage;
