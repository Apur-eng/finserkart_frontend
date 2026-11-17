import { AppShell } from '@astryxdesign/core/AppShell';
import { Badge } from '@astryxdesign/core/Badge';
import {
  Bell,
  CheckSquare,
  CreditCard,
  ExternalLink,
  FileCheck,
  Home,
  Layers,
  LogOut,
  Sliders,
  UserCheck
} from 'lucide-react';
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { INITIAL_COORDINATOR_NOTIFICATIONS, INITIAL_COORDINATOR_PROFILE } from '../features/coordinator/coordinatorData';

export const CoordinatorLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const coord = INITIAL_COORDINATOR_PROFILE;
  const unreadCount = INITIAL_COORDINATOR_NOTIFICATIONS.filter((n) => !n.isRead).length;

  const coordinatorTopNav = (
    <header
      style={{
        height: '64px',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Brand Lockup */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link to="/coordinator/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <Sliders size={20} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
            Finservkart
          </span>
        </Link>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <Badge label="Operations Desk" variant="orange" />
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link
          to="/"
          style={{
            fontSize: '13px',
            color: '#64748b',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <ExternalLink size={14} /> Public Website
        </Link>

        {/* Notifications */}
        <Link
          to="/coordinator/notifications"
          style={{
            position: 'relative',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
            textDecoration: 'none',
            background: currentPath === '/coordinator/notifications' ? '#f1f5f9' : '#ffffff',
          }}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#ef4444',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 700,
                borderRadius: '999px',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff',
              }}
            >
              {unreadCount}
            </span>
          )}
        </Link>

        {/* User Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#d97706',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            {coord.name[0]}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#0f172a' }}>
              {coord.name}
            </span>
            <span style={{ fontSize: '10.5px', color: '#64748b' }}>Operations Command</span>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          title="Sign Out"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );

  const navItems = [
    { label: 'Operational Dashboard', icon: <Home size={18} />, path: '/coordinator/dashboard' },
    { label: 'Application Queue', icon: <Layers size={18} />, path: '/coordinator/applications' },
    { label: 'CA Assignment Desk', icon: <CheckSquare size={18} />, path: '/coordinator/assignments' },
    { label: 'CA Capacity Management', icon: <UserCheck size={18} />, path: '/coordinator/cas' },
    { label: 'Document Monitoring', icon: <FileCheck size={18} />, path: '/coordinator/documents' },
    { label: 'Transaction Overview', icon: <CreditCard size={18} />, path: '/coordinator/transactions' },
    { label: 'Operational Alerts', icon: <Bell size={18} />, path: '/coordinator/notifications', badge: unreadCount > 0 ? String(unreadCount) : undefined },
  ];

  const coordinatorSideNav = (
    <aside
      style={{
        width: '240px',
        background: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 12px',
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <div>
        <div
          style={{
            padding: '8px 12px 14px',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#94a3b8',
          }}
        >
          Operations Management
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/coordinator/dashboard' && currentPath.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#d97706' : '#475569',
                  background: isActive ? '#fffbeb' : 'transparent',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: isActive ? '#d97706' : '#64748b' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && <Badge label={item.badge} variant="red" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        style={{
          background: '#f8fafc',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          padding: '12px',
          fontSize: '12px',
          color: '#475569',
        }}
      >
        <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
          Operations Command Desk
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
          {coord.location}
        </div>
      </div>
    </aside>
  );

  return (
    <AppShell
      height="auto"
      variant="surface"
      topNav={coordinatorTopNav}
      contentPadding={0}
    >
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        {coordinatorSideNav}
        <main
          style={{
            flex: 1,
            background: '#f8fafc',
            padding: '32px 36px 64px 36px',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </main>
      </div>
    </AppShell>
  );
};

export default CoordinatorLayout;
