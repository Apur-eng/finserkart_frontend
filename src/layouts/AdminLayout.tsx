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
        <Link to="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", textDecoration: 'none' }}>
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
            <ShieldAlert size={20} />
          </Surface>
          <Inline style={{ fontSize: "var(--font-fsk-30)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.01em' }}>
            Finservkart
          </Inline>
        </Link>
        <Inline style={{ color: "var(--color-fsk-59)" }}>|</Inline>
        <Badge label="Central Admin" variant="red" />
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

        {/* Security badge */}
        <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-39)", display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-29)", fontWeight: 600 }}>
          <ShieldCheck size={14} /> Root Clearance Level 5
        </Surface>

        {/* User Pill */}
        <Link
          to="/admin/profile"
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
              background: "var(--color-fsk-34)",
              color: "var(--color-fsk-38)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "var(--font-fsk-14)",
              fontWeight: 700,
            }}
          >
            A
          </Surface>
          <Surface style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <Inline style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-7)" }}>
              Super Admin
            </Inline>
            <Inline style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>{admin.email}</Inline>
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
          Central Platform Control
        </Surface>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-29)" }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/admin/dashboard' && currentPath.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: "var(--spacing-fsk-35)",
                  padding: "var(--spacing-fsk-142) var(--spacing-fsk-8)",
                  borderRadius: "var(--radius-fsk-37)",
                  textDecoration: 'none',
                  fontSize: "var(--font-fsk-14)",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--color-fsk-34)" : "var(--color-fsk-18)",
                  background: isActive ? "var(--color-fsk-51)" : 'transparent',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              >
                <Inline style={{ color: isActive ? "var(--color-fsk-34)" : "var(--color-fsk-9)" }}>{item.icon}</Inline>
                <Inline>{item.label}</Inline>
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
          Super Admin Console
        </Surface>
        <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", lineHeight: 1.4 }}>
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
