import { Surface, Inline } from '../components/Surface';
import { PortalShell } from '../components/PortalShell';
import { StatusTag as Badge } from '../components/StatusTag';
import {
  Bell,
  Coins,
  ExternalLink,
  FileText,
  Home,
  LogOut,
  User,
  UserCheck,
  UserPlus,
  Wallet
} from 'lucide-react';
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { INITIAL_AGENT_NOTIFICATIONS, INITIAL_AGENT_PROFILE } from '../features/agent/agentData';

export const AgentLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const agent = INITIAL_AGENT_PROFILE;
  const unreadCount = INITIAL_AGENT_NOTIFICATIONS.filter((n) => !n.isRead).length;

  const agentTopNav = (
    <header
      style={{
        flexWrap: 'wrap', gap: "0.75rem", paddingBlock: "0.75rem",
        minHeight: "4rem",
        background: "var(--white)",
        borderBottom: "0.0625rem solid var(--border)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: "0 1.5rem",
        boxShadow: "var(--shadow-panel)",
      }}
    >
      {/* Brand Lockup */}
      <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.75rem" }}>
        <Link to="/agent/dashboard" style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", textDecoration: 'none' }}>
          <Surface
            style={{
              width: "2.125rem",
              height: "2.125rem",
              borderRadius: "0.5rem",
              background: "var(--status-brand)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: "var(--white)",
            }}
          >
            <UserCheck size={20} />
          </Surface>
          <Inline style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.01em' }}>
            Finservkart
          </Inline>
        </Link>
        <Inline style={{ color: "#cbd5e1" }}>|</Inline>
        <Badge label="Agent Portal" variant="green" />
      </Surface>

      {/* Right Controls */}
      <Surface style={{ display: 'flex', alignItems: 'center', gap: "1rem" }}>
        {/* Link back to public site */}
        <Link
          to="/"
          style={{
            fontSize: "0.8125rem",
            color: "var(--muted)",
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: "0.3125rem",
          }}
        >
          <ExternalLink size={14} /> Public Website
        </Link>

        {/* Notifications Icon Button */}
        <Link
          to="/agent/notifications" aria-label="Notifications"
          style={{
            position: 'relative',
            width: "2.25rem",
            height: "2.25rem",
            borderRadius: "0.5rem",
            border: "0.0625rem solid var(--border)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: "var(--muted)",
            textDecoration: 'none',
            background: currentPath === '/agent/notifications' ? "var(--sage-light)" : "var(--white)",
          }}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <Inline
              style={{
                position: 'absolute',
                top: "-0.25rem",
                right: "-0.25rem",
                background: "#ef4444",
                color: "var(--white)",
                fontSize: "0.8125rem",
                fontWeight: 700,
                borderRadius: "62.4375rem",
                width: "1.125rem",
                height: "1.125rem",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: "0.125rem solid var(--white)",
              }}
            >
              {unreadCount}
            </Inline>
          )}
        </Link>

        {/* User Pill */}
        <Link
          to="/agent/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.625rem",
            padding: "0.375rem 0.75rem",
            borderRadius: "62.4375rem",
            background: "var(--cream)",
            border: "0.0625rem solid var(--border)",
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Surface
            style={{
              width: "1.75rem",
              height: "1.75rem",
              borderRadius: '50%',
              background: "var(--teal)",
              color: "var(--white)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "0.8125rem",
              fontWeight: 700,
            }}
          >
            {agent.fname[0]}
            {agent.lname[0]}
          </Surface>
          <Surface style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--navy)" }}>
              {agent.fname} {agent.lname}
            </Inline>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{agent.id} • {agent.referralCode}</Inline>
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
            padding: "0.5rem",
            color: "#687d93",
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
    { label: 'Dashboard', icon: <Home size={18} />, path: '/agent/dashboard' },
    { label: 'Onboard Customer', icon: <UserPlus size={18} />, path: '/agent/customers/onboard' },
    { label: 'Customer Directory', icon: <UserCheck size={18} />, path: '/agent/customers' },
    { label: 'Applications', icon: <FileText size={18} />, path: '/agent/applications' },
    { label: 'Commissions', icon: <Coins size={18} />, path: '/agent/commissions' },
    { label: 'Payouts', icon: <Wallet size={18} />, path: '/agent/payouts' },
    { label: 'Profile', icon: <User size={18} />, path: '/agent/profile' },
    { label: 'Notifications', icon: <Bell size={18} />, path: '/agent/notifications', badge: unreadCount > 0 ? String(unreadCount) : undefined },
  ];

  const agentSideNav = (
    <aside
      style={{
        width: '100%',
        background: "var(--white)",
        borderRight: "0.0625rem solid var(--border)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: "1rem 0.75rem",
        minHeight: "calc(100vh - 4rem)",
      }}
    >
      <Surface>
        <Surface
          style={{
            padding: "0.5rem 0.75rem 0.875rem",
            fontSize: "0.8125rem",
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: "#687d93",
          }}
        >
          Agent Business Hub
        </Surface>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: "0.25rem" }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/agent/dashboard' && currentPath.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: "0.5625rem 0.75rem",
                  borderRadius: "0.5rem",
                  textDecoration: 'none',
                  fontSize: "0.8125rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--teal)" : "var(--muted)",
                  background: isActive ? "#ecfdf5" : 'transparent',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              >
                <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
                  <Inline style={{ color: isActive ? "var(--teal)" : "var(--muted)" }}>{item.icon}</Inline>
                  <Inline>{item.label}</Inline>
                </Surface>
                {item.badge && <Badge label={item.badge} variant="red" />}
              </Link>
            );
          })}
        </nav>
      </Surface>

      {/* Franchise Affiliation Box */}
      <Surface
        style={{
          background: "var(--cream)",
          borderRadius: "0.625rem",
          border: "0.0625rem solid var(--border)",
          padding: "0.75rem",
          fontSize: "0.8125rem",
          color: "var(--muted)",
        }}
      >
        <Surface style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.25rem" }}>
          Affiliated Franchise
        </Surface>
        <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.4 }}>
          {agent.franchiseName} ({agent.franchiseCode})
        </Surface>
      </Surface>
    </aside>
  );

  return (
    <PortalShell header={agentTopNav} navigation={agentSideNav}>
      <Outlet />
    </PortalShell>
  );
};

export default AgentLayout;
