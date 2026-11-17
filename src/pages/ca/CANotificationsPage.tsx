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
        return <Briefcase size={18} color="#7c3aed" />;
      case 'document':
        return <FileText size={18} color="#059669" />;
      case 'message':
        return <MessageSquare size={18} color="#0066cc" />;
      case 'payout':
        return <Wallet size={18} color="#d97706" />;
      default:
        return <Bell size={18} color="#475569" />;
    }
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '16px',
        }}
      >
        <div>
          <Heading level={1}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Notifications & Activity
            </span>
          </Heading>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
            Operational assignment dispatches, client document uploads, customer queries, and payout disbursements.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            label="Mark All as Read"
            variant="secondary"
            size="sm"
            icon={<CheckCircle2 size={14} />}
            onClick={handleMarkAllRead}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {(['All', 'Unread'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: filter === tab ? '1px solid #7c3aed' : '1px solid #cbd5e1',
              background: filter === tab ? '#f5f3ff' : '#ffffff',
              color: filter === tab ? '#7c3aed' : '#475569',
              fontSize: '13px',
              fontWeight: filter === tab ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {tab} {tab === 'Unread' ? `(${notifications.filter((n) => !n.isRead).length})` : ''}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map((item) => (
          <Card
            key={item.id}
            elevation="low"
            padding={4}
            style={{
              borderRadius: '12px',
              border: item.isRead ? '1px solid #e2e8f0' : '1px solid #ddd6fe',
              background: item.isRead ? '#ffffff' : '#f5f3ff',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {getIcon(item.type)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a' }}>
                  {item.title}
                </span>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {item.timestamp}
                </span>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                {item.description}
              </p>

              <Link
                to={item.linkUrl}
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#7c3aed',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Inspect Filing <ExternalLink size={12} />
              </Link>
            </div>

            {!item.isRead && (
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#7c3aed',
                }}
              />
            )}
          </Card>
        ))}

        {filtered.length === 0 && (
          <Card elevation="low" padding={6} style={{ textAlign: 'center', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <Bell size={28} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>No unread notifications</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Your regulatory alerts are completely up to date!</div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CANotificationsPage;
