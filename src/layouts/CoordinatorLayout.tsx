import { Surface, Inline } from '../components/Surface';
import { PortalShell } from '../components/PortalShell';
import { StatusTag as Badge } from '../components/StatusTag';
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
        flexWrap: 'wrap', gap: "var(--spacing-fsk-8)", paddingBlock: "var(--spacing-fsk-8)",
        minHeight: "var(--spacing-fsk-141)",
        background: "var(--color-fsk-38)",
        borderBottom: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: "0 var(--spacing-fsk-26)",
        boxShadow: "var(--shadow-fsk-card)",
      }}
    >
      {/* Brand Lockup */}
      <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-8)" }}>
        <Link to="/coordinator/dashboard" style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", textDecoration: 'none' }}>
          <Surface
            style={{
              width: "var(--spacing-fsk-52)",
              height: "var(--spacing-fsk-52)",
              borderRadius: "var(--radius-fsk-37)",
              background: "var(--color-fsk-brand)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: "var(--color-fsk-38)",
            }}
          >
            <Sliders size={20} />
          </Surface>
          <Inline style={{ fontSize: "var(--font-fsk-30)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.01em' }}>
            Finservkart
          </Inline>
        </Link>
        <Inline style={{ color: "var(--color-fsk-59)" }}>|</Inline>
        <Badge label="Operations Desk" variant="orange" />
      </Surface>

      {/* Right Controls */}
      <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-5)" }}>
        <Link
          to="/"
          style={{
            fontSize: "var(--font-fsk-14)",
            color: "var(--color-fsk-9)",
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-86)",
          }}
        >
          <ExternalLink size={14} /> Public Website
        </Link>

        {/* Notifications */}
        <Link
          to="/coordinator/notifications" aria-label="Notifications"
          style={{
            position: 'relative',
            width: "var(--spacing-fsk-85)",
            height: "var(--spacing-fsk-85)",
            borderRadius: "var(--radius-fsk-37)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: "var(--color-fsk-18)",
            textDecoration: 'none',
            background: currentPath === '/coordinator/notifications' ? "var(--color-fsk-46)" : "var(--color-fsk-38)",
          }}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <Inline
              style={{
                position: 'absolute',
                top: "var(--spacing-fsk-143)",
                right: "var(--spacing-fsk-143)",
                background: "var(--color-fsk-129)",
                color: "var(--color-fsk-38)",
                fontSize: "var(--font-fsk-14)",
                fontWeight: 700,
                borderRadius: "var(--radius-fsk-77)",
                width: "var(--spacing-fsk-36)",
                height: "var(--spacing-fsk-36)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: "var(--spacing-fsk-47) solid var(--color-fsk-38)",
              }}
            >
              {unreadCount}
            </Inline>
          )}
        </Link>

        {/* User Pill */}
        <Surface
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-35)",
            padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
            borderRadius: "var(--radius-fsk-77)",
            background: "var(--color-fsk-27)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
          }}
        >
          <Surface
            style={{
              width: "var(--spacing-fsk-71)",
              height: "var(--spacing-fsk-71)",
              borderRadius: '50%',
              background: "var(--color-fsk-54)",
              color: "var(--color-fsk-38)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "var(--font-fsk-14)",
              fontWeight: 700,
            }}
          >
            {coord.name[0]}
          </Surface>
          <Surface style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-7)" }}>
              {coord.name}
            </Inline>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>Operations Command</Inline>
          </Surface>
        </Surface>

        {/* Logout */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          title="Sign Out"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: "var(--spacing-fsk-12)",
            color: "var(--color-fsk-57)",
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LogOut size={18} />
        </button>
      </Surface>
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
        width: '100%',
        background: "var(--color-fsk-38)",
        borderRight: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: "var(--spacing-fsk-5) var(--spacing-fsk-8)",
        minHeight: "calc(100vh - var(--spacing-fsk-141))",
      }}
    >
      <Surface>
        <Surface
          style={{
            padding: "var(--spacing-fsk-12) var(--spacing-fsk-8) var(--spacing-fsk-23)",
            fontSize: "var(--font-fsk-14)",
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: "var(--color-fsk-57)",
          }}
        >
          Operations Management
        </Surface>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-29)" }}>
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
                  padding: "var(--spacing-fsk-142) var(--spacing-fsk-8)",
                  borderRadius: "var(--radius-fsk-37)",
                  textDecoration: 'none',
                  fontSize: "var(--font-fsk-14)",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--color-fsk-54)" : "var(--color-fsk-18)",
                  background: isActive ? "var(--color-fsk-66)" : 'transparent',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              >
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                  <Inline style={{ color: isActive ? "var(--color-fsk-54)" : "var(--color-fsk-9)" }}>{item.icon}</Inline>
                  <Inline>{item.label}</Inline>
                </Surface>
                {item.badge && <Badge label={item.badge} variant="red" />}
              </Link>
            );
          })}
        </nav>
      </Surface>

      <Surface
        style={{
          background: "var(--color-fsk-27)",
          borderRadius: "var(--radius-fsk-68)",
          border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
          padding: "var(--spacing-fsk-8)",
          fontSize: "var(--font-fsk-14)",
          color: "var(--color-fsk-18)",
        }}
      >
        <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)", marginBottom: "var(--spacing-fsk-29)" }}>
          Operations Command Desk
        </Surface>
        <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", lineHeight: 1.4 }}>
          {coord.location}
        </Surface>
      </Surface>
    </aside>
  );

  return (
    <PortalShell header={coordinatorTopNav} navigation={coordinatorSideNav}>
      <Outlet />
    </PortalShell>
  );
};

export default CoordinatorLayout;
