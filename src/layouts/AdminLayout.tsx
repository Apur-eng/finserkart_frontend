import { AppShell } from '@astryxdesign/core/AppShell';
import { Badge } from '@astryxdesign/core/Badge';
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
        <Link to="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <ShieldAlert size={20} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
            Finservkart
          </span>
        </Link>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <Badge label="Central Admin" variant="red" />
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

        {/* Security badge */}
        <div style={{ fontSize: '11px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
          <ShieldCheck size={14} /> Root Clearance Level 5
        </div>

        {/* User Pill */}
        <Link
          to="/admin/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#dc2626',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#0f172a' }}>
              Super Admin
            </span>
            <span style={{ fontSize: '10.5px', color: '#64748b' }}>{admin.email}</span>
          </div>
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
          Central Platform Control
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/admin/dashboard' && currentPath.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#dc2626' : '#475569',
                  background: isActive ? '#fef2f2' : 'transparent',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              >
                <span style={{ color: isActive ? '#dc2626' : '#64748b' }}>{item.icon}</span>
                <span>{item.label}</span>
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
          Super Admin Console
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
          Finservkart Enterprise Platform
        </div>
      </div>
    </aside>
  );

  return (
    <AppShell
      height="auto"
      variant="surface"
      topNav={adminTopNav}
      contentPadding={0}
    >
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        {adminSideNav}
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

export default AdminLayout;
