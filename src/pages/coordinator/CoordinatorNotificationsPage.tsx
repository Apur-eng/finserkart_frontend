import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
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
        return <FileCheck size={18} color="#059669" />;
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
              Operational Alerts &amp; SLA Warnings
            </span>
          </Heading>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
            Real-time notifications regarding unassigned applications, statutory SLA deadlines, and document inspection bottlenecks.
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
              border: filter === tab ? '1px solid #d97706' : '1px solid #cbd5e1',
              background: filter === tab ? '#fffbeb' : '#ffffff',
              color: filter === tab ? '#d97706' : '#475569',
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
              border: item.isRead ? '1px solid #e2e8f0' : '1px solid #fde68a',
              background: item.isRead ? '#ffffff' : '#fffdf7',
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
                  color: '#d97706',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Resolve in Command Queue <ExternalLink size={12} />
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
                  background: '#d97706',
                }}
              />
            )}
          </Card>
        ))}

        {filtered.length === 0 && (
          <Card elevation="low" padding={6} style={{ textAlign: 'center', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <Bell size={28} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>No unread operational alerts</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>All SLA timers and queues are operating nominally.</div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoordinatorNotificationsPage;
