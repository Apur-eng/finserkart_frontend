import { AppShell } from '@astryxdesign/core/AppShell';
import { Badge } from '@astryxdesign/core/Badge';
import {
  BarChart3,
  Briefcase,
  Building,
  Coins,
  ExternalLink,
  Home,
  LogOut,
  User,
  UserCheck,
  Users,
  Wallet
} from 'lucide-react';
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { INITIAL_FRANCHISE_PROFILE } from '../features/franchise/franchiseData';

export const FranchiseLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const franchise = INITIAL_FRANCHISE_PROFILE;

  const franchiseTopNav = (
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
        <Link to="/franchise/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <Building size={20} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
            Finservkart
          </span>
        </Link>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <Badge label="Franchise Portal" variant="blue" />
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

        {/* User Pill */}
        <Link
          to="/franchise/profile"
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
              background: '#0284c7',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            {franchise.directorName[0]}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#0f172a' }}>
              {franchise.directorName}
            </span>
            <span style={{ fontSize: '10.5px', color: '#64748b' }}>{franchise.id}</span>
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
    { label: 'Dashboard', icon: <Home size={18} />, path: '/franchise/dashboard' },
    { label: 'Associated Agents', icon: <Users size={18} />, path: '/franchise/agents' },
    { label: 'Customer Directory', icon: <UserCheck size={18} />, path: '/franchise/customers' },
    { label: 'Applications Overview', icon: <Briefcase size={18} />, path: '/franchise/applications' },
    { label: 'Commission Ledger', icon: <Coins size={18} />, path: '/franchise/commissions' },
    { label: 'Franchise Payouts', icon: <Wallet size={18} />, path: '/franchise/payouts' },
    { label: 'Performance Reports', icon: <BarChart3 size={18} />, path: '/franchise/reports' },
    { label: 'Franchise Profile', icon: <User size={18} />, path: '/franchise/profile' },
  ];

  const franchiseSideNav = (
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
          Franchise Operations
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/franchise/dashboard' && currentPath.startsWith(item.path));
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
                  color: isActive ? '#0284c7' : '#475569',
                  background: isActive ? '#f0f9ff' : 'transparent',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              >
                <span style={{ color: isActive ? '#0284c7' : '#64748b' }}>{item.icon}</span>
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
          {franchise.name}
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
          {franchise.city} • {franchise.id}
        </div>
      </div>
    </aside>
  );

  return (
    <AppShell
      height="auto"
      variant="surface"
      topNav={franchiseTopNav}
      contentPadding={0}
    >
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        {franchiseSideNav}
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

export default FranchiseLayout;
