import { Surface, Inline } from '../components/Surface';
import { PortalShell } from '../components/PortalShell';
import { StatusTag as Badge } from '../components/StatusTag';
import {
  Bell,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  FileCheck,
  FolderArchive,
  Home,
  LogOut,
  MessageSquare,
  Scale,
  User
} from 'lucide-react';
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { INITIAL_CA_NOTIFICATIONS, INITIAL_CA_PROFILE } from '../features/ca/caData';

export const CALayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const ca = INITIAL_CA_PROFILE;
  const unreadCount = INITIAL_CA_NOTIFICATIONS.filter((n) => !n.isRead).length;

  const caTopNav = (
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
        <Link to="/ca/dashboard" style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", textDecoration: 'none' }}>
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
            <Scale size={20} />
          </Surface>
          <Inline style={{ fontSize: "var(--font-fsk-30)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.01em' }}>
            Finservkart
          </Inline>
        </Link>
        <Inline style={{ color: "var(--color-fsk-59)" }}>|</Inline>
        <Badge label="CA Portal" variant="purple" />
      </Surface>

      {/* Right Controls */}
      <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-5)" }}>
        {/* Link back to public site */}
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

        {/* Notifications Icon Button */}
        <Link
          to="/ca/notifications" aria-label="Notifications"
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
            background: currentPath === '/ca/notifications' ? "var(--color-fsk-46)" : "var(--color-fsk-38)",
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
        <Link
          to="/ca/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-35)",
            padding: "var(--spacing-fsk-17) var(--spacing-fsk-8)",
            borderRadius: "var(--radius-fsk-77)",
            background: "var(--color-fsk-27)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Surface
            style={{
              width: "var(--spacing-fsk-71)",
              height: "var(--spacing-fsk-71)",
              borderRadius: '50%',
              background: "var(--color-fsk-41)",
              color: "var(--color-fsk-38)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "var(--font-fsk-14)",
              fontWeight: 700,
            }}
          >
            {ca.fname[0]}
            {ca.lname[0]}
          </Surface>
          <Surface style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-7)" }}>
              CA {ca.fname} {ca.lname}
            </Inline>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{ca.membershipNo}</Inline>
          </Surface>
        </Link>

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
    { label: 'Dashboard', icon: <Home size={18} />, path: '/ca/dashboard' },
    { label: 'Assigned Applications', icon: <Briefcase size={18} />, path: '/ca/applications' },
    { label: 'Document Review', icon: <FileCheck size={18} />, path: '/ca/documents' },
    { label: 'Customer Conversations', icon: <MessageSquare size={18} />, path: '/ca/conversations' },
    { label: 'Deliverables Handover', icon: <CheckCircle2 size={18} />, path: '/ca/deliverables' },
    { label: 'Completed Applications', icon: <FolderArchive size={18} />, path: '/ca/completed' },
    { label: 'Profile & Credentials', icon: <User size={18} />, path: '/ca/profile' },
    { label: 'Notifications', icon: <Bell size={18} />, path: '/ca/notifications', badge: unreadCount > 0 ? String(unreadCount) : undefined },
  ];

  const caSideNav = (
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
          CA Regulatory Desk
        </Surface>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-29)" }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/ca/dashboard' && currentPath.startsWith(item.path));
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
                  color: isActive ? "var(--color-fsk-41)" : "var(--color-fsk-18)",
                  background: isActive ? "var(--color-fsk-53)" : 'transparent',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              >
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                  <Inline style={{ color: isActive ? "var(--color-fsk-41)" : "var(--color-fsk-9)" }}>{item.icon}</Inline>
                  <Inline>{item.label}</Inline>
                </Surface>
                {item.badge && <Badge label={item.badge} variant="red" />}
              </Link>
            );
          })}
        </nav>
      </Surface>

      {/* Professional Practice Box */}
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
          Practicing Firm
        </Surface>
        <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", lineHeight: 1.4 }}>
          {ca.firmName} ({ca.city})
        </Surface>
      </Surface>
    </aside>
  );

  return (
    <PortalShell header={caTopNav} navigation={caSideNav}>
      <Outlet />
    </PortalShell>
  );
};

export default CALayout;
