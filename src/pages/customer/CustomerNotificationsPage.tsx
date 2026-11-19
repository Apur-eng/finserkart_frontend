import { Surface, Inline } from '../../components/Surface';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
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
        return <Clock size={18} color="var(--color-fsk-15)" />;
      case 'document':
        return <FileText size={18} color="var(--color-fsk-39)" />;
      case 'message':
        return <MessageSquare size={18} color="var(--color-fsk-119)" />;
      case 'payment':
        return <Receipt size={18} color="var(--color-fsk-15)" />;
      default:
        return <Bell size={18} color="var(--color-fsk-18)" />;
    }
  };

  return (
    <Surface style={{ maxWidth: "var(--spacing-fsk-89)", margin: '0 auto' }}>
      {/* Header */}
      <Surface
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: "var(--spacing-fsk-26)",
          gap: "var(--spacing-fsk-5)",
        }}
      >
        <Surface>
          <Heading level={1}>
            <Inline style={{ fontSize: "var(--font-fsk-49)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.02em' }}>
              Notifications & Activity
            </Inline>
          </Heading>
          <p style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-24)", marginTop: "var(--spacing-fsk-29)", margin: 0 }}>
            Operational updates, CA query dispatches, document approvals, and payment receipts.
          </p>
        </Surface>

        <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)" }}>
          <Button
            label="Mark All Read"
            variant="secondary"
            size="sm"
            onClick={handleMarkAllRead}
          />
        </Surface>
      </Surface>

      {/* Filter Tabs */}
      <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-2)" }}>
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
                gap: "var(--spacing-fsk-17)",
                padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
                borderRadius: "var(--radius-fsk-37)",
                border: isActive ? "var(--spacing-fsk-22) solid var(--color-fsk-162)" : "var(--spacing-fsk-22) solid var(--color-fsk-163)",
                background: isActive ? "var(--color-fsk-112)" : "var(--color-fsk-38)",
                color: isActive ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
                fontSize: "var(--font-fsk-14)",
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Inline>{tab}</Inline>
              <Inline style={{ fontSize: "var(--font-fsk-14)", padding: "var(--spacing-fsk-22) var(--spacing-fsk-17)", borderRadius: "var(--radius-fsk-68)", background: isActive ? "var(--color-fsk-15)" : "var(--color-fsk-46)", color: isActive ? "var(--color-fsk-38)" : "var(--color-fsk-9)" }}>
                {count}
              </Inline>
            </button>
          );
        })}
      </Surface>

      {/* Notifications List */}
      <Card elevation="low" padding={0} style={{ borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)", overflow: 'hidden' }}>
        <Surface style={{ display: 'flex', flexDirection: 'column' }}>
          {filtered.map((item, idx) => (
            <Surface
              key={item.id}
              style={{
                padding: "var(--spacing-fsk-5) var(--spacing-fsk-2)",
                borderBottom: idx === filtered.length - 1 ? 'none' : "var(--spacing-fsk-22) solid var(--color-fsk-165)",
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: "var(--spacing-fsk-5)",
                background: item.isRead ? "var(--color-fsk-38)" : "var(--color-fsk-27)",
                transition: 'background-color 0.15s ease',
              }}
            >
              <Surface style={{ display: 'flex', alignItems: 'flex-start', gap: "var(--spacing-fsk-23)" }}>
                <Surface
                  style={{
                    width: "var(--spacing-fsk-85)",
                    height: "var(--spacing-fsk-85)",
                    borderRadius: "var(--radius-fsk-37)",
                    background: "var(--color-fsk-46)",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: "var(--spacing-fsk-47)",
                  }}
                >
                  {getNotificationIcon(item.type)}
                </Surface>

                <Surface>
                  <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-12)" }}>
                    <Inline style={{ fontSize: "var(--font-fsk-91)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                      {item.title}
                    </Inline>
                    {!item.isRead && (
                      <Inline
                        style={{
                          width: "var(--spacing-fsk-12)",
                          height: "var(--spacing-fsk-12)",
                          borderRadius: '50%',
                          background: "var(--color-fsk-15)",
                          display: 'inline-block',
                        }}
                      />
                    )}
                  </Surface>

                  <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-18)", lineHeight: 1.5, marginTop: "var(--spacing-fsk-29)", margin: "var(--spacing-fsk-29) 0 0 0" }}>
                    {item.description}
                  </p>

                  <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-57)", marginTop: "var(--spacing-fsk-17)" }}>
                    {item.timestamp}
                  </Surface>
                </Surface>
              </Surface>

              <Link
                to={item.linkUrl}
                style={{
                  fontSize: "var(--font-fsk-14)",
                  fontWeight: 600,
                  color: "var(--color-fsk-15)",
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: "var(--spacing-fsk-29)",
                  whiteSpace: 'nowrap',
                  paddingTop: "var(--spacing-fsk-47)",
                }}
              >
                View <ExternalLink size={13} />
              </Link>
            </Surface>
          ))}
        </Surface>
      </Card>
    </Surface>
  );
};

export default CustomerNotificationsPage;
