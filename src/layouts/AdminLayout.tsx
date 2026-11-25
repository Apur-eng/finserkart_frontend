import { Surface, Inline } from '../components/Surface';
import { PortalShell } from '../components/PortalShell';
import { StatusTag as Badge } from '../components/StatusTag';
import {
  Activity,
  Award,
  BarChart,
  Briefcase,
  Coins,
  CreditCard,
  ExternalLink,
  Headphones,
  Home,
  LogOut,
  Settings,
  ShieldAlert,
  ShieldCheck,
  User,
  Users
} from 'lucide-react';
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { INITIAL_ADMIN_PROFILE } from '../features/admin/adminData';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const admin = INITIAL_ADMIN_PROFILE;

  const adminTopNav = (
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
        <Link to="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", textDecoration: 'none' }}>
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
            <ShieldAlert size={20} />
          </Surface>
          <Inline style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.01em' }}>
            Finservkart
          </Inline>
        </Link>
        <Inline style={{ color: "#cbd5e1" }}>|</Inline>
        <Badge label="Central Admin" variant="red" />
      </Surface>

      {/* Right Controls */}
      <Surface style={{ display: 'flex', alignItems: 'center', gap: "1rem" }}>
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

        {/* Security badge */}
        <Surface style={{ fontSize: "0.8125rem", color: "#16a34a", display: 'flex', alignItems: 'center', gap: "0.25rem", fontWeight: 600 }}>
          <ShieldCheck size={14} /> Root Clearance Level 5
        </Surface>

        {/* User Pill */}
        <Link
          to="/admin/profile"
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
              background: "#dc2626",
              color: "var(--white)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "0.8125rem",
              fontWeight: 700,
            }}
          >
            A
          </Surface>
          <Surface style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--navy)" }}>
              Super Admin
            </Inline>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{admin.email}</Inline>
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
    { label: 'Platform Analytics', icon: <Home size={18} />, path: '/admin/dashboard' },
    { label: 'User Management', icon: <Users size={18} />, path: '/admin/users' },
    { label: 'Application Manager', icon: <Briefcase size={18} />, path: '/admin/applications' },
    { label: 'CA Allocation Oversight', icon: <Award size={18} />, path: '/admin/cas' },
    { label: 'Commissions & Payouts', icon: <Coins size={18} />, path: '/admin/commissions' },
    { label: 'Service Catalogue', icon: <CreditCard size={18} />, path: '/admin/services' },
    { label: 'Financial Records', icon: <BarChart size={18} />, path: '/admin/finances' },
    { label: 'Support Oversight', icon: <Headphones size={18} />, path: '/admin/support' },
    { label: 'System Activity Logs', icon: <Activity size={18} />, path: '/admin/activity' },
    { label: 'Platform Settings', icon: <Settings size={18} />, path: '/admin/settings' },
    { label: 'Administrator Profile', icon: <User size={18} />, path: '/admin/profile' },
  ];

  const adminSideNav = (
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
          Central Platform Control
        </Surface>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: "0.25rem" }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/admin/dashboard' && currentPath.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: "0.625rem",
                  padding: "0.5625rem 0.75rem",
                  borderRadius: "0.5rem",
                  textDecoration: 'none',
                  fontSize: "0.8125rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#dc2626" : "var(--muted)",
                  background: isActive ? "#fef2f2" : 'transparent',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              >
                <Inline style={{ color: isActive ? "#dc2626" : "var(--muted)" }}>{item.icon}</Inline>
                <Inline>{item.label}</Inline>
              </Link>
            );
          })}
        </nav>
      </Surface>

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
          Super Admin Console
        </Surface>
        <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.4 }}>
          Finservkart Enterprise Platform
        </Surface>
      </Surface>
    </aside>
  );

  return (
    <PortalShell header={adminTopNav} navigation={adminSideNav}>
      <Outlet />
    </PortalShell>
  );
};

export default AdminLayout;
