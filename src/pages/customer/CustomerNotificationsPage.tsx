import { ActionButton, Panel, Title } from '../../components/ui';
import { Surface, Inline } from '../../components/Surface';
import {
  Bell,
  Clock,
  ExternalLink,
  FileText,
  MessageSquare,
  Receipt
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CustomerNotification } from '../../features/customer/customerData';
import { INITIAL_NOTIFICATIONS } from '../../features/customer/customerData';

export const CustomerNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<CustomerNotification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  const filtered = notifications.filter((n) => (filter === 'Unread' ? !n.isRead : true));

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getNotificationIcon = (type: CustomerNotification['type']) => {
    switch (type) {
      case 'milestone':
        return <Clock size={18} color="var(--blue)" />;
      case 'document':
        return <FileText size={18} color="#16a34a" />;
      case 'message':
        return <MessageSquare size={18} color="#9333ea" />;
      case 'payment':
        return <Receipt size={18} color="var(--blue)" />;
      default:
        return <Bell size={18} color="var(--muted)" />;
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
            Operational updates, CA query dispatches, document approvals, and payment receipts.
          </p>
        </Surface>

        <Surface style={{ display: 'flex', gap: "0.5rem" }}>
          <ActionButton
            label="Mark All Read"
            variant="secondary"
            size="sm"
            onClick={handleMarkAllRead}
          />
        </Surface>
      </Surface>

      {/* Filter Tabs */}
      <Surface style={{ display: 'flex', gap: "0.5rem", marginBottom: "1.25rem" }}>
        {(['All', 'Unread'] as const).map((tab) => {
          const isActive = filter === tab;
          const count =
            tab === 'All'
              ? notifications.length
              : notifications.filter((n) => !n.isRead).length;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: "0.375rem",
                padding: "0.375rem 0.875rem",
                borderRadius: "0.5rem",
                border: isActive ? "0.0625rem solid var(--blue)" : "0.0625rem solid #e2e8f0",
                background: isActive ? "#e0f2fe" : "var(--white)",
                color: isActive ? "var(--blue)" : "var(--muted)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Inline>{tab}</Inline>
              <Inline style={{ fontSize: "0.8125rem", padding: "0.0625rem 0.375rem", borderRadius: "0.625rem", background: isActive ? "var(--blue)" : "var(--sage-light)", color: isActive ? "var(--white)" : "var(--muted)" }}>
                {count}
              </Inline>
            </button>
          );
        })}
      </Surface>

      {/* Notifications List */}
      <Panel elevation="low" padding={0} style={{ borderRadius: "1rem", border: "0.0625rem solid var(--border)", background: "var(--white)", overflow: 'hidden' }}>
        <Surface style={{ display: 'flex', flexDirection: 'column' }}>
          {filtered.map((item, idx) => (
            <Surface
              key={item.id}
              style={{
                padding: "1rem 1.25rem",
                borderBottom: idx === filtered.length - 1 ? 'none' : "0.0625rem solid #f1f5f9",
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: "1rem",
                background: item.isRead ? "var(--white)" : "var(--cream)",
                transition: 'background-color 0.15s ease',
              }}
            >
              <Surface style={{ display: 'flex', alignItems: 'flex-start', gap: "0.875rem" }}>
                <Surface
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "0.5rem",
                    background: "var(--sage-light)",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: "0.125rem",
                  }}
                >
                  {getNotificationIcon(item.type)}
                </Surface>

                <Surface>
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.5rem" }}>
                    <Inline style={{ fontSize: "0.90625rem", fontWeight: 700, color: "var(--navy)" }}>
                      {item.title}
                    </Inline>
                    {!item.isRead && (
                      <Inline
                        style={{
                          width: "0.5rem",
                          height: "0.5rem",
                          borderRadius: '50%',
                          background: "var(--blue)",
                          display: 'inline-block',
                        }}
                      />
                    )}
                  </Surface>

                  <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.5, marginTop: "0.25rem", margin: "0.25rem 0 0 0" }}>
                    {item.description}
                  </p>

                  <Surface style={{ fontSize: "0.8125rem", color: "#687d93", marginTop: "0.375rem" }}>
                    {item.timestamp}
                  </Surface>
                </Surface>
              </Surface>

              <Link
                to={item.linkUrl}
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "var(--blue)",
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: "0.25rem",
                  whiteSpace: 'nowrap',
                  paddingTop: "0.125rem",
                }}
              >
                View <ExternalLink size={13} />
              </Link>
            </Surface>
          ))}
        </Surface>
      </Panel>
    </Surface>
  );
};

export default CustomerNotificationsPage;
