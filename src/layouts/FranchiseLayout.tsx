import { Surface, Inline } from '../components/Surface';
import { PortalShell } from '../components/PortalShell';
import { StatusTag as Badge } from '../components/StatusTag';
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
        <Link to="/franchise/dashboard" style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", textDecoration: 'none' }}>
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
            <Building size={20} />
          </Surface>
          <Inline style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.01em' }}>
            Finservkart
          </Inline>
        </Link>
        <Inline style={{ color: "#cbd5e1" }}>|</Inline>
        <Badge label="Franchise Portal" variant="blue" />
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

        {/* User Pill */}
        <Link
          to="/franchise/profile"
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
              background: "#0284c7",
              color: "var(--white)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "0.8125rem",
              fontWeight: 700,
            }}
          >
            {franchise.directorName[0]}
          </Surface>
          <Surface style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <Inline style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--navy)" }}>
              {franchise.directorName}
            </Inline>
            <Inline style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{franchise.id}</Inline>
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
          Franchise Operations
        </Surface>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: "0.25rem" }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/franchise/dashboard' && currentPath.startsWith(item.path));
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
                  color: isActive ? "#0284c7" : "var(--muted)",
                  background: isActive ? "#f0f9ff" : 'transparent',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              >
                <Inline style={{ color: isActive ? "#0284c7" : "var(--muted)" }}>{item.icon}</Inline>
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
          {franchise.name}
        </Surface>
        <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.4 }}>
          {franchise.city} • {franchise.id}
        </Surface>
      </Surface>
    </aside>
  );

  return (
    <PortalShell header={franchiseTopNav} navigation={franchiseSideNav}>
      <Outlet />
    </PortalShell>
  );
};

export default FranchiseLayout;
