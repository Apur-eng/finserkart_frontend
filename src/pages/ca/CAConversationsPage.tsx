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
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Customer Communications & Queries
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Direct advisory channel with client applicants for filing clarifications, OTP requests, and document deficiencies.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px', alignItems: 'flex-start' }}>
        {/* Left: Applications Thread Selector */}
        <Card elevation="low" padding={3} style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', padding: '6px 8px 12px' }}>
            Active Client Threads
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isSelected ? '#f5f3ff' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '2px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: isSelected ? 700 : 600, color: isSelected ? '#7c3aed' : '#0f172a' }}>
                      {app.customerName}
                    </span>
                    <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>#{app.id}</span>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#64748b' }}>{app.serviceName}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Right: Message Window */}
        <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
          {/* Header of Conversation */}
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#f5f3ff',
                  color: '#7c3aed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '13px',
                }}
              >
                {currentApp.customerName[0]}
              </div>
              <div>
                <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a' }}>
                  {currentApp.customerName} ({currentApp.businessName})
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                  Filing: {currentApp.serviceName} • Dossier #{currentApp.id}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '11.5px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <ShieldCheck size={14} /> Official Advisory Channel
            </div>
          </div>

          {/* Messages Body */}
          <div
            style={{
              padding: '20px',
              minHeight: '340px',
              maxHeight: '440px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              background: '#fcfcfc',
            }}
          >
            {messages.map((msg) => {
              const isCA = msg.sender === 'ca';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isCA ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '4px',
                      fontSize: '11px',
                      color: '#94a3b8',
                    }}
                  >
                    <span>{msg.senderName}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Clock size={10} /> {msg.timestamp}
                    </span>
                  </div>

                  <div
                    style={{
                      maxWidth: '75%',
                      padding: '12px 16px',
                      borderRadius: isCA ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                      background: isCA ? '#7c3aed' : '#ffffff',
                      color: isCA ? '#ffffff' : '#0f172a',
                      fontSize: '13.5px',
                      lineHeight: 1.5,
                      border: isCA ? 'none' : '1px solid #e2e8f0',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    }}
                  >
                    {msg.message}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Input */}
          <div style={{ padding: '14px 18px', borderTop: '1px solid #e2e8f0', background: '#ffffff' }}>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <TextInput
                  label="Advisory Message"
                  placeholder={`Send regulatory advice or instructions to ${currentApp.customerName}...`}
                  value={inputText}
                  onChange={(val) => setInputText(val)}
                  width="100%"
                />
              </div>
              <Button
                label="Send"
                variant="primary"
                size="md"
                type="submit"
                icon={<Send size={15} />}
                isDisabled={!inputText.trim()}
              />
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CAConversationsPage;
