import { ActionButton, Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CoordinatorNotification } from '../../features/coordinator/coordinatorData';
import { INITIAL_COORDINATOR_NOTIFICATIONS } from '../../features/coordinator/coordinatorData';

export const CoordinatorNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<CoordinatorNotification[]>(INITIAL_COORDINATOR_NOTIFICATIONS);
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  const filtered = notifications.filter((n) => (filter === 'Unread' ? !n.isRead : true));

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type: CoordinatorNotification['type']) => {
    switch (type) {
      case 'unassigned':
        return <AlertTriangle size={18} color="#d97706" />;
      case 'sla':
        return <Clock size={18} color="#dc2626" />;
      default:
        return <FileCheck size={18} color="var(--teal)" />;
    }
  };

  return (
    <Surface style={{ maxWidth: "53.75rem", margin: '0 auto' }}>
      {/* Header */}
      <Surface
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        <Surface>
          <Title level={1}>
            <Inline style={{ fontSize: "1.625rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.02em' }}>
              Operational Alerts &amp; SLA Warnings
            </Inline>
          </Title>
          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
            Real-time notifications regarding unassigned applications, statutory SLA deadlines, and document inspection bottlenecks.
          </p>
        </Surface>

        <Surface style={{ display: 'flex', gap: "0.5rem" }}>
          <ActionButton
            label="Mark All as Read"
            variant="secondary"
            size="sm"
            icon={<CheckCircle2 size={14} />}
            onClick={handleMarkAllRead}
          />
        </Surface>
      </Surface>

      {/* Filter Tabs */}
      <Surface style={{ display: 'flex', gap: "0.5rem", marginBottom: "1.25rem" }}>
        {(['All', 'Unread'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            style={{
              padding: "0.375rem 0.875rem",
              borderRadius: "1rem",
              border: filter === tab ? "0.0625rem solid #d97706" : "0.0625rem solid #cbd5e1",
              background: filter === tab ? "#fffbeb" : "var(--white)",
              color: filter === tab ? "#d97706" : "var(--muted)",
              fontSize: "0.8125rem",
              fontWeight: filter === tab ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {tab} {tab === 'Unread' ? `(${notifications.filter((n) => !n.isRead).length})` : ''}
          </button>
        ))}
      </Surface>

      {/* Notifications List */}
      <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.75rem" }}>
        {filtered.map((item) => (
          <Panel
            key={item.id}
            elevation="low"
            padding={4}
            style={{
              borderRadius: "1rem",
              border: item.isRead ? "0.0625rem solid #e2e8f0" : "0.0625rem solid #fde68a",
              background: item.isRead ? "var(--white)" : "#fffdf7",
              display: 'flex',
              gap: "1rem",
              alignItems: 'flex-start',
              position: 'relative',
            }}
          >
            <Surface
              style={{
                width: "2.375rem",
                height: "2.375rem",
                borderRadius: "0.625rem",
                background: "var(--white)",
                border: "0.0625rem solid var(--border)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {getIcon(item.type)}
            </Surface>

            <Surface style={{ flex: 1 }}>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "0.25rem" }}>
                <Inline style={{ fontSize: "0.90625rem", fontWeight: 700, color: "var(--navy)" }}>
                  {item.title}
                </Inline>
                <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)", display: 'flex', alignItems: 'center', gap: "0.25rem" }}>
                  <Clock size={12} /> {item.timestamp}
                </Inline>
              </Surface>

              <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, margin: "0 0 0.625rem 0" }}>
                {item.description}
              </p>

              <Link
                to={item.linkUrl}
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#d97706",
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: "0.25rem",
                }}
              >
                Resolve in Command Queue <ExternalLink size={12} />
              </Link>
            </Surface>

            {!item.isRead && (
              <Inline
                style={{
                  position: 'absolute',
                  top: "0.75rem",
                  right: "0.75rem",
                  width: "0.5rem",
                  height: "0.5rem",
                  borderRadius: '50%',
                  background: "#d97706",
                }}
              />
            )}
          </Panel>
        ))}

        {filtered.length === 0 && (
          <Panel elevation="low" padding={6} style={{ textAlign: 'center', borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Bell size={28} color="#687d93" style={{ margin: "0 auto 0.75rem" }} />
            <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>No unread operational alerts</Surface>
            <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.25rem" }}>All SLA timers and queues are operating nominally.</Surface>
          </Panel>
        )}
      </Surface>
    </Surface>
  );
};

export default CoordinatorNotificationsPage;
