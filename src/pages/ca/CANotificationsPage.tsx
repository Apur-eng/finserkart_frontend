import { Surface, Inline } from '../../components/Surface';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import {
  Bell,
  Briefcase,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  MessageSquare,
  Wallet
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CANotification } from '../../features/ca/caData';
import { INITIAL_CA_NOTIFICATIONS } from '../../features/ca/caData';

export const CANotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<CANotification[]>(INITIAL_CA_NOTIFICATIONS);
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  const filtered = notifications.filter((n) => (filter === 'Unread' ? !n.isRead : true));

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type: CANotification['type']) => {
    switch (type) {
      case 'assignment':
        return <Briefcase size={18} color="var(--color-fsk-41)" />;
      case 'document':
        return <FileText size={18} color="var(--color-fsk-65)" />;
      case 'message':
        return <MessageSquare size={18} color="var(--color-fsk-15)" />;
      case 'payout':
        return <Wallet size={18} color="var(--color-fsk-54)" />;
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
            Operational assignment dispatches, client document uploads, customer queries, and payout disbursements.
          </p>
        </Surface>

        <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)" }}>
          <Button
            label="Mark All as Read"
            variant="secondary"
            size="sm"
            icon={<CheckCircle2 size={14} />}
            onClick={handleMarkAllRead}
          />
        </Surface>
      </Surface>

      {/* Filter Tabs */}
      <Surface style={{ display: 'flex', gap: "var(--spacing-fsk-12)", marginBottom: "var(--spacing-fsk-2)" }}>
        {(['All', 'Unread'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            style={{
              padding: "var(--spacing-fsk-17) var(--spacing-fsk-23)",
              borderRadius: "var(--radius-fsk-28)",
              border: filter === tab ? "var(--spacing-fsk-22) solid var(--color-fsk-41)" : "var(--spacing-fsk-22) solid var(--color-fsk-59)",
              background: filter === tab ? "var(--color-fsk-53)" : "var(--color-fsk-38)",
              color: filter === tab ? "var(--color-fsk-41)" : "var(--color-fsk-18)",
              fontSize: "var(--font-fsk-14)",
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
      <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-8)" }}>
        {filtered.map((item) => (
          <Card
            key={item.id}
            elevation="low"
            padding={4}
            style={{
              borderRadius: "var(--radius-fsk-28)",
              border: item.isRead ? "var(--spacing-fsk-22) solid var(--color-fsk-163)" : "var(--spacing-fsk-22) solid var(--color-fsk-97)",
              background: item.isRead ? "var(--color-fsk-38)" : "var(--color-fsk-53)",
              display: 'flex',
              gap: "var(--spacing-fsk-5)",
              alignItems: 'flex-start',
              position: 'relative',
            }}
          >
            <Surface
              style={{
                width: "var(--spacing-fsk-90)",
                height: "var(--spacing-fsk-90)",
                borderRadius: "var(--radius-fsk-68)",
                background: "var(--color-fsk-38)",
                border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {getIcon(item.type)}
            </Surface>

            <Surface style={{ flex: 1 }}>
              <Surface style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "var(--spacing-fsk-29)" }}>
                <Inline style={{ fontSize: "var(--font-fsk-91)", fontWeight: 700, color: "var(--color-fsk-7)" }}>
                  {item.title}
                </Inline>
                <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)" }}>
                  <Clock size={12} /> {item.timestamp}
                </Inline>
              </Surface>

              <p style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-18)", lineHeight: 1.5, margin: "0 0 var(--spacing-fsk-35) 0" }}>
                {item.description}
              </p>

              <Link
                to={item.linkUrl}
                style={{
                  fontSize: "var(--font-fsk-14)",
                  fontWeight: 600,
                  color: "var(--color-fsk-41)",
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: "var(--spacing-fsk-29)",
                }}
              >
                Inspect Filing <ExternalLink size={12} />
              </Link>
            </Surface>

            {!item.isRead && (
              <Inline
                style={{
                  position: 'absolute',
                  top: "var(--spacing-fsk-8)",
                  right: "var(--spacing-fsk-8)",
                  width: "var(--spacing-fsk-12)",
                  height: "var(--spacing-fsk-12)",
                  borderRadius: '50%',
                  background: "var(--color-fsk-41)",
                }}
              />
            )}
          </Card>
        ))}

        {filtered.length === 0 && (
          <Card elevation="low" padding={6} style={{ textAlign: 'center', borderRadius: "var(--radius-fsk-28)", border: "var(--spacing-fsk-22) solid var(--color-fsk-21)", background: "var(--color-fsk-38)" }}>
            <Bell size={28} color="var(--color-fsk-57)" style={{ margin: "0 auto var(--spacing-fsk-8)" }} />
            <Surface style={{ fontSize: "var(--font-fsk-19)", fontWeight: 700, color: "var(--color-fsk-7)" }}>No unread notifications</Surface>
            <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", marginTop: "var(--spacing-fsk-29)" }}>Your regulatory alerts are completely up to date!</Surface>
          </Card>
        )}
      </Surface>
    </Surface>
  );
};

export default CANotificationsPage;
