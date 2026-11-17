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
        return <Clock size={18} color="#0066cc" />;
      case 'document':
        return <FileText size={18} color="#16a34a" />;
      case 'message':
        return <MessageSquare size={18} color="#9333ea" />;
      case 'payment':
        return <Receipt size={18} color="#0066cc" />;
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
            Operational updates, CA query dispatches, document approvals, and payment receipts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            label="Mark All Read"
            variant="secondary"
            size="sm"
            onClick={handleMarkAllRead}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
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
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                border: isActive ? '1px solid #0066cc' : '1px solid #e2e8f0',
                background: isActive ? '#e0f2fe' : '#ffffff',
                color: isActive ? '#0066cc' : '#475569',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span>{tab}</span>
              <span style={{ fontSize: '11px', padding: '1px 6px', borderRadius: '10px', background: isActive ? '#0066cc' : '#f1f5f9', color: isActive ? '#fff' : '#64748b' }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <Card elevation="low" padding={0} style={{ borderRadius: '14px', border: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              style={{
                padding: '16px 20px',
                borderBottom: idx === filtered.length - 1 ? 'none' : '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
                background: item.isRead ? '#ffffff' : '#f8fafc',
                transition: 'background-color 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {getNotificationIcon(item.type)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a' }}>
                      {item.title}
                    </span>
                    {!item.isRead && (
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#0066cc',
                          display: 'inline-block',
                        }}
                      />
                    )}
                  </div>

                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginTop: '4px', margin: '4px 0 0 0' }}>
                    {item.description}
                  </p>

                  <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '6px' }}>
                    {item.timestamp}
                  </div>
                </div>
              </div>

              <Link
                to={item.linkUrl}
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#0066cc',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                  paddingTop: '2px',
                }}
              >
                View <ExternalLink size={13} />
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CustomerNotificationsPage;
