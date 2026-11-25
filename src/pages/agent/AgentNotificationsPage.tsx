import { ActionButton, Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import {
  Bell,
  CheckCircle2,
  Clock,
  Coins,
  ExternalLink,
  Sparkles,
  UserCheck,
  Wallet
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { AgentNotification } from '../../features/agent/agentData';
import { INITIAL_AGENT_NOTIFICATIONS } from '../../features/agent/agentData';

export const AgentNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<AgentNotification[]>(INITIAL_AGENT_NOTIFICATIONS);
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  const filtered = notifications.filter((n) => (filter === 'Unread' ? !n.isRead : true));

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type: AgentNotification['type']) => {
    switch (type) {
      case 'commission':
        return <Coins size={18} color="var(--teal)" />;
      case 'customer':
        return <UserCheck size={18} color="var(--blue)" />;
      case 'payout':
        return <Wallet size={18} color="#7c3aed" />;
      default:
        return <Sparkles size={18} color="#d97706" />;
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
              Notifications & Activity
            </Inline>
          </Title>
          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginTop: "0.25rem", margin: 0 }}>
            Real-time partner updates, commission releases, customer onboardings, and payout confirmations.
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
              border: filter === tab ? "0.0625rem solid #059669" : "0.0625rem solid #cbd5e1",
              background: filter === tab ? "#ecfdf5" : "var(--white)",
              color: filter === tab ? "var(--teal)" : "var(--muted)",
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
              border: item.isRead ? "0.0625rem solid #e2e8f0" : "0.0625rem solid #a7f3d0",
              background: item.isRead ? "var(--white)" : "#f0fdf4",
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
                  color: "var(--teal)",
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: "0.25rem",
                }}
              >
                Inspect Details <ExternalLink size={12} />
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
                  background: "var(--teal)",
                }}
              />
            )}
          </Panel>
        ))}

        {filtered.length === 0 && (
          <Panel elevation="low" padding={6} style={{ textAlign: 'center', borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)" }}>
            <Bell size={28} color="#687d93" style={{ margin: "0 auto 0.75rem" }} />
            <Surface style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--navy)" }}>No unread notifications</Surface>
            <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", marginTop: "0.25rem" }}>You are completely caught up!</Surface>
          </Panel>
        )}
      </Surface>
    </Surface>
  );
};

export default AgentNotificationsPage;
