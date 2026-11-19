import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "var(--spacing-fsk-33)", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-20)" }}>
      {/* Header */}
      <Surface>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)", color: "var(--color-fsk-34)", fontSize: "var(--font-fsk-14)", fontWeight: 600 }}>
          <Headphones size={16} /> Platform Helpdesk & Grievance Governance
        </Surface>
        <h1 style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
          Customer & Partner Support Enquiries
        </h1>
        <p style={{ fontSize: "var(--font-fsk-24)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
          Monitor, reassign and resolve escalated customer, agent, franchise, and CA inquiries.
        </p>
      </Surface>

      {bannerMessage && (
        <Banner
          status="success"
          title="Support Desk"
          description={bannerMessage}
        />
      )}

      {/* Ticket Metrics */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))", gap: "var(--spacing-fsk-5)" }}>
        <Card elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 500 }}>Open Enquiries</Inline>
            <HelpCircle size={20} color="var(--color-fsk-34)" />
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-8)" }}>
            {tickets.filter((t) => t.status === 'Open').length}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-34)", marginTop: "var(--spacing-fsk-29)" }}>
            Requires immediate triage
          </Surface>
        </Card>

        <Card elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 500 }}>In Investigation</Inline>
            <Clock size={20} color="var(--color-fsk-55)" />
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-8)" }}>
            {tickets.filter((t) => t.status === 'In Progress').length}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-54)", marginTop: "var(--spacing-fsk-29)" }}>
            Assigned to operations desk
          </Surface>
        </Card>

        <Card elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", fontWeight: 500 }}>Resolved Tickets</Inline>
            <CheckCircle size={20} color="var(--color-fsk-39)" />
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-16)", fontWeight: 800, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-8)" }}>
            {tickets.filter((t) => t.status === 'Resolved').length}
          </Surface>
          <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", marginTop: "var(--spacing-fsk-29)" }}>
            Average resolution SLA: 3.2 hrs
          </Surface>
        </Card>
      </Surface>

      {/* Ticket Queue Card */}
      <Card elevation="low" padding={5}>
        <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-2)", flexWrap: 'wrap', gap: "var(--spacing-fsk-5)" }}>
          <Surface>
            <h2 style={{ fontSize: "var(--font-fsk-30)", fontWeight: 700, color: "var(--color-fsk-7)", margin: 0 }}>
              Live Grievance Queue
            </h2>
            <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
              Enquiries across Customer, Agent, and CA stakeholder groups.
            </p>
          </Surface>

          <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-8)", alignItems: 'center', flexWrap: 'wrap' }}>
            <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-17)" }}>
              {['All', 'High', 'Medium', 'Low'].map((pri) => (
                <button
                  key={pri}
                  type="button"
                  onClick={() => setPriorityFilter(pri)}
                  style={{
                    padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                    borderRadius: "var(--radius-fsk-42)",
                    fontSize: "var(--font-fsk-14)",
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: priorityFilter === pri ? "var(--spacing-fsk-22) solid var(--color-fsk-34)" : "var(--spacing-fsk-22) solid var(--color-fsk-163)",
                    background: priorityFilter === pri ? "var(--color-fsk-43)" : "var(--color-fsk-38)",
                    color: priorityFilter === pri ? "var(--color-fsk-44)" : "var(--color-fsk-9)",
                  }}
                >
                  {pri} Priority
                </button>
              ))}
            </Surface>

            <Surface style={{ width: "var(--spacing-fsk-45)" }}>
              <TextInput
                label="Search Tickets"
                placeholder="Search subject, user or ID..."
                value={searchTerm}
                onChange={(val) => setSearchTerm(val)}
              />
            </Surface>
          </Surface>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "var(--font-fsk-14)" }}>
            <thead>
              <tr style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)", color: "var(--color-fsk-9)", fontWeight: 600 }}>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Ticket Code</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Initiator</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Stakeholder Role</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Subject</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Priority</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Status</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)" }}>Last Updated</th>
                <th style={{ padding: "var(--spacing-fsk-8) var(--spacing-fsk-5)", textAlign: 'right' }}>Resolution Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((t) => (
                <tr key={t.id} style={{ borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-46)" }}>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                    {t.id}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", fontWeight: 600, color: "var(--color-fsk-7)" }}>
                    {t.userName}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>
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
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-25)", maxWidth: "var(--spacing-fsk-79)" }}>
                    {t.subject}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>
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
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)" }}>
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
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", color: "var(--color-fsk-9)" }}>
                    {t.lastUpdated}
                  </td>
                  <td style={{ padding: "var(--spacing-fsk-23) var(--spacing-fsk-5)", textAlign: 'right' }}>
                    {t.status !== 'Resolved' ? (
                      <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)", justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => handleResolve(t.id)}
                          style={{
                            padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                            borderRadius: "var(--radius-fsk-42)",
                            background: "var(--color-fsk-39)",
                            color: "var(--color-fsk-38)",
                            fontWeight: 600,
                            fontSize: "var(--font-fsk-14)",
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
                            padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
                            borderRadius: "var(--radius-fsk-42)",
                            background: "var(--color-fsk-43)",
                            color: "var(--color-fsk-34)",
                            fontWeight: 600,
                            fontSize: "var(--font-fsk-14)",
                            border: "var(--spacing-fsk-22) solid var(--color-fsk-58)",
                            cursor: 'pointer',
                          }}
                        >
                          Escalate
                        </button>
                      </Surface>
                    ) : (
                      <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", fontWeight: 600 }}>Closed</Inline>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      </Card>
    </Surface>
  );
};
