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
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Heading level={1}>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            CA Communication & Queries
          </span>
        </Heading>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
          Direct communication channel with your assigned Chartered Accountant for query resolution and filing clarifications.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'flex-start' }}>
        {/* Left Column: Chat Container */}
        <div style={{ gridColumn: 'span 2' }}>
          <Card elevation="low" padding={0} style={{ borderRadius: '16px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '620px' }}>
            {/* Chat Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e2e8f0',
                background: '#f8fafc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#e0f2fe', color: '#0066cc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCheck size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '14.5px' }}>
                    {currentApp.assignedCA?.name || 'Operations Desk'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#16a34a' }}>
                    {currentApp.assignedCA ? `ID: ${currentApp.assignedCA.id} • Active on your file` : 'Allocation Desk'}
                  </div>
                </div>
              </div>

              {/* Application Selector */}
              <div>
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12.5px',
                    color: '#0f172a',
                    background: '#ffffff',
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
              </div>
            </div>

            {/* Message Stream */}
            <div
              style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                background: '#f8fafc',
              }}
            >
              {messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isCustomer ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '75%',
                        padding: '12px 16px',
                        borderRadius: isCustomer ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                        background: isCustomer ? '#0066cc' : '#ffffff',
                        color: isCustomer ? '#ffffff' : '#1e293b',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                        border: isCustomer ? 'none' : '1px solid #e2e8f0',
                        fontSize: '13.5px',
                        lineHeight: 1.5,
                      }}
                    >
                      <div>{msg.message}</div>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', padding: '0 4px' }}>
                      {msg.senderName} • {msg.timestamp}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input Form */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: '16px 20px',
                background: '#ffffff',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1 }}>
                <TextInput
                  label="Type your message"
                  placeholder="Type your message or ask a question..."
                  value={inputText}
                  onChange={(val) => setInputText(val)}
                  width="100%"
                />
              </div>

              <div style={{ paddingTop: '20px' }}>
                <Button
                  label="Send"
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={<Send size={15} />}
                  isDisabled={!inputText.trim()}
                />
              </div>
            </form>
          </Card>
        </div>

        {/* Right Column: CA Information & SLA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card elevation="low" padding={4} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <ShieldCheck size={18} color="#0066cc" />
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                Official Communication Record
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
              All messages exchanged in this conversation thread are permanently attached to Application Dossier <strong>#{selectedAppId}</strong> for compliance auditing.
            </p>
          </Card>

          <Card elevation="low" padding={4} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Clock size={18} color="#f59e0b" />
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                Working Hours &amp; Response SLA
              </span>
            </div>
            <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '12.5px', color: '#475569', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Monday – Saturday: 09:30 AM – 06:30 PM IST</li>
              <li>Expected response time: within 2 hours during business sessions</li>
              <li>For urgent filing deadlines, contact our helpline at +91 9120000000</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerConversationsPage;
