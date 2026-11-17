import { Badge } from '@astryxdesign/core/Badge';
import { Banner } from '@astryxdesign/core/Banner';
import { Card } from '@astryxdesign/core/Card';
import { TextInput } from '@astryxdesign/core/TextInput';
import {
  CheckCircle,
  Clock,
  Headphones,
  HelpCircle
} from 'lucide-react';
import React, { useState } from 'react';
import {
  INITIAL_ADMIN_SUPPORT_TICKETS,
  type AdminSupportTicketItem
} from '../../features/admin/adminData';

export const AdminSupportPage: React.FC = () => {
  const [tickets, setTickets] = useState<AdminSupportTicketItem[]>(INITIAL_ADMIN_SUPPORT_TICKETS);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const handleResolve = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Resolved' } : t))
    );
    setBannerMessage(`Support enquiry ${id} marked as Resolved.`);
  };

  const handleEscalate = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'In Progress', priority: 'High' } : t))
    );
    setBannerMessage(`Support enquiry ${id} escalated to High Priority.`);
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>
          <Headphones size={16} /> Platform Helpdesk & Grievance Governance
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
          Customer & Partner Support Enquiries
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
          Monitor, reassign and resolve escalated customer, agent, franchise, and CA inquiries.
        </p>
      </div>

      {bannerMessage && (
        <Banner
          status="success"
          title="Support Desk"
          description={bannerMessage}
        />
      )}

      {/* Ticket Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <Card elevation="low" padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Open Enquiries</span>
            <HelpCircle size={20} color="#dc2626" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>
            {tickets.filter((t) => t.status === 'Open').length}
          </div>
          <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>
            Requires immediate triage
          </div>
        </Card>

        <Card elevation="low" padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>In Investigation</span>
            <Clock size={20} color="#eab308" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>
            {tickets.filter((t) => t.status === 'In Progress').length}
          </div>
          <div style={{ fontSize: '12px', color: '#d97706', marginTop: '4px' }}>
            Assigned to operations desk
          </div>
        </Card>

        <Card elevation="low" padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Resolved Tickets</span>
            <CheckCircle size={20} color="#16a34a" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '12px' }}>
            {tickets.filter((t) => t.status === 'Resolved').length}
          </div>
          <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '4px' }}>
            Average resolution SLA: 3.2 hrs
          </div>
        </Card>
      </div>

      {/* Ticket Queue Card */}
      <Card elevation="low" padding={5}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Live Grievance Queue
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
              Enquiries across Customer, Agent, and CA stakeholder groups.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['All', 'High', 'Medium', 'Low'].map((pri) => (
                <button
                  key={pri}
                  type="button"
                  onClick={() => setPriorityFilter(pri)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: priorityFilter === pri ? '1px solid #dc2626' : '1px solid #e2e8f0',
                    background: priorityFilter === pri ? '#fee2e2' : '#ffffff',
                    color: priorityFilter === pri ? '#991b1b' : '#64748b',
                  }}
                >
                  {pri} Priority
                </button>
              ))}
            </div>

            <div style={{ width: '280px' }}>
              <TextInput
                label="Search Tickets"
                placeholder="Search subject, user or ID..."
                value={searchTerm}
                onChange={(val) => setSearchTerm(val)}
              />
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Ticket Code</th>
                <th style={{ padding: '12px 16px' }}>Initiator</th>
                <th style={{ padding: '12px 16px' }}>Stakeholder Role</th>
                <th style={{ padding: '12px 16px' }}>Subject</th>
                <th style={{ padding: '12px 16px' }}>Priority</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Last Updated</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Resolution Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                    {t.id}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                    {t.userName}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge
                      label={t.userRole}
                      variant={
                        t.userRole === 'Customer'
                          ? 'blue'
                          : t.userRole === 'Agent'
                          ? 'yellow'
                          : 'purple'
                      }
                    />
                  </td>
                  <td style={{ padding: '14px 16px', color: '#334155', maxWidth: '320px' }}>
                    {t.subject}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge
                      label={t.priority}
                      variant={
                        t.priority === 'High'
                          ? 'red'
                          : t.priority === 'Medium'
                          ? 'yellow'
                          : 'gray'
                      }
                    />
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge
                      label={t.status}
                      variant={
                        t.status === 'Resolved'
                          ? 'green'
                          : t.status === 'In Progress'
                          ? 'blue'
                          : 'yellow'
                      }
                    />
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    {t.lastUpdated}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    {t.status !== 'Resolved' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => handleResolve(t.id)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            background: '#16a34a',
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: '12px',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          Resolve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEscalate(t.id)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            background: '#fee2e2',
                            color: '#dc2626',
                            fontWeight: 600,
                            fontSize: '12px',
                            border: '1px solid #fecaca',
                            cursor: 'pointer',
                          }}
                        >
                          Escalate
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>Closed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
