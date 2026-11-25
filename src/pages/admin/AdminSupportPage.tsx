import { Notice, Panel, Field } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import { StatusTag as Badge } from '../../components/StatusTag';
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
    <Surface style={{ maxWidth: "85rem", margin: '0 auto', display: 'flex', flexDirection: 'column', gap: "clamp(1rem, 2.1538461538461537vw, 1.75rem)" }}>
      {/* Header */}
      <Surface>
        <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem", color: "#dc2626", fontSize: "0.8125rem", fontWeight: 600 }}>
          <Headphones size={16} /> Platform Helpdesk & Grievance Governance
        </Surface>
        <h1 style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", margin: "0.25rem 0 0 0" }}>
          Customer & Partner Support Enquiries
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
          Monitor, reassign and resolve escalated customer, agent, franchise, and CA inquiries.
        </p>
      </Surface>

      {bannerMessage && (
        <Notice
          status="success"
          title="Support Desk"
          description={bannerMessage}
        />
      )}

      {/* Ticket Metrics */}
      <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))", gap: "1rem" }}>
        <Panel elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>Open Enquiries</Inline>
            <HelpCircle size={20} color="#dc2626" />
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.75rem" }}>
            {tickets.filter((t) => t.status === 'Open').length}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#dc2626", marginTop: "0.25rem" }}>
            Requires immediate triage
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>In Investigation</Inline>
            <Clock size={20} color="#eab308" />
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.75rem" }}>
            {tickets.filter((t) => t.status === 'In Progress').length}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#d97706", marginTop: "0.25rem" }}>
            Assigned to operations desk
          </Surface>
        </Panel>

        <Panel elevation="low" padding={4}>
          <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", fontWeight: 500 }}>Resolved Tickets</Inline>
            <CheckCircle size={20} color="#16a34a" />
          </Surface>
          <Surface style={{ fontSize: "clamp(1.5rem, 2.1538461538461537vw, 1.75rem)", fontWeight: 800, color: "var(--navy)", marginTop: "0.75rem" }}>
            {tickets.filter((t) => t.status === 'Resolved').length}
          </Surface>
          <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", marginTop: "0.25rem" }}>
            Average resolution SLA: 3.2 hrs
          </Surface>
        </Panel>
      </Surface>

      {/* Ticket Queue Panel */}
      <Panel elevation="low" padding={5}>
        <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1.25rem", flexWrap: 'wrap', gap: "1rem" }}>
          <Surface>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
              Live Grievance Queue
            </h2>
            <p style={{ fontSize: "0.8125rem", color: "var(--muted)", margin: "0.25rem 0 0 0" }}>
              Enquiries across Customer, Agent, and CA stakeholder groups.
            </p>
          </Surface>

          <Surface style={{ display: 'flex', gap: "0.75rem", alignItems: 'center', flexWrap: 'wrap' }}>
            <Surface style={{ display: 'flex', gap: "0.375rem" }}>
              {['All', 'High', 'Medium', 'Low'].map((pri) => (
                <button
                  key={pri}
                  type="button"
                  onClick={() => setPriorityFilter(pri)}
                  style={{
                    padding: "0.375rem 0.75rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: priorityFilter === pri ? "0.0625rem solid #dc2626" : "0.0625rem solid #e2e8f0",
                    background: priorityFilter === pri ? "#fee2e2" : "var(--white)",
                    color: priorityFilter === pri ? "#991b1b" : "var(--muted)",
                  }}
                >
                  {pri} Priority
                </button>
              ))}
            </Surface>

            <Surface style={{ width: "17.5rem" }}>
              <Field
                label="Search Tickets"
                placeholder="Search subject, user or ID..."
                value={searchTerm}
                onChange={(val) => setSearchTerm(val)}
              />
            </Surface>
          </Surface>
        </Surface>

        <Surface style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ borderBottom: "0.0625rem solid var(--border)", color: "var(--muted)", fontWeight: 600 }}>
                <th style={{ padding: "0.75rem 1rem" }}>Ticket Code</th>
                <th style={{ padding: "0.75rem 1rem" }}>Initiator</th>
                <th style={{ padding: "0.75rem 1rem" }}>Stakeholder Role</th>
                <th style={{ padding: "0.75rem 1rem" }}>Subject</th>
                <th style={{ padding: "0.75rem 1rem" }}>Priority</th>
                <th style={{ padding: "0.75rem 1rem" }}>Status</th>
                <th style={{ padding: "0.75rem 1rem" }}>Last Updated</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: 'right' }}>Resolution Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((t) => (
                <tr key={t.id} style={{ borderBottom: "0.0625rem solid var(--sage-light)" }}>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 700, color: "var(--navy)" }}>
                    {t.id}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 600, color: "var(--navy)" }}>
                    {t.userName}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
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
                  <td style={{ padding: "0.875rem 1rem", color: "#334155", maxWidth: "20rem" }}>
                    {t.subject}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
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
                  <td style={{ padding: "0.875rem 1rem" }}>
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
                  <td style={{ padding: "0.875rem 1rem", color: "var(--muted)" }}>
                    {t.lastUpdated}
                  </td>
                  <td style={{ padding: "0.875rem 1rem", textAlign: 'right' }}>
                    {t.status !== 'Resolved' ? (
                      <Surface style={{ display: 'flex', gap: "0.5rem", justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => handleResolve(t.id)}
                          style={{
                            padding: "0.375rem 0.75rem",
                            borderRadius: "0.375rem",
                            background: "#16a34a",
                            color: "var(--white)",
                            fontWeight: 600,
                            fontSize: "0.8125rem",
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
                            padding: "0.375rem 0.75rem",
                            borderRadius: "0.375rem",
                            background: "#fee2e2",
                            color: "#dc2626",
                            fontWeight: 600,
                            fontSize: "0.8125rem",
                            border: "0.0625rem solid #fecaca",
                            cursor: 'pointer',
                          }}
                        >
                          Escalate
                        </button>
                      </Surface>
                    ) : (
                      <Inline style={{ fontSize: "0.8125rem", color: "#16a34a", fontWeight: 600 }}>Closed</Inline>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      </Panel>
    </Surface>
  );
};
