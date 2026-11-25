import { Surface, Inline } from '../components/Surface';
import { PortalShell } from '../components/PortalShell';
import { StatusTag as Badge } from '../components/StatusTag';
import {
  Bell,
  FileText,
  HelpCircle,
  Home,
  Layers,
  LogOut,
  MessageSquare,
  PlusCircle,
  Receipt,
  ShieldCheck,
  UploadCloud,
  User,
  ExternalLink
} from 'lucide-react';
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { INITIAL_CUSTOMER_PROFILE, INITIAL_NOTIFICATIONS } from '../features/customer/customerData';

export const CustomerLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const unreadCount = INITIAL_NOTIFICATIONS.filter((n) => !n.isRead).length;

  // Custom TopNav Header
  const customerTopNav = (
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
        <Link to="/customer/dashboard" style={{ display: 'flex', alignItems: 'center', gap: "0.625rem", textDecoration: 'none' }}>
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
            <ShieldCheck size={20} />
          </Surface>
          <Inline style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy)", letterSpacing: '-0.01em' }}>
            Finservkart
          </Inline>
        </Link>
        <Inline style={{ color: "#cbd5e1" }}>|</Inline>
        <Badge label="Customer Portal" variant="blue" />
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
          to="/customer/notifications" aria-label="Notifications"
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
            background: currentPath === '/customer/notifications' ? "var(--sage-light)" : "var(--white)",
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
        <Link  to="/customer/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.625rem",
            padding: "0.25rem 0.75rem 0.25rem 0.375rem",
            borderRadius: "1rem",
            border: "0.0625rem solid var(--border)",
            background: "var(--cream)",
            cursor: 'pointer',
          }}
        >
          <Surface
            style={{
              width: "1.75rem",
              height: "1.75rem",
              borderRadius: '50%',
              background: "var(--blue)",
              color: "var(--white)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "0.8125rem",
              fontWeight: 700,
            }}
          >
            {INITIAL_CUSTOMER_PROFILE.fname[0]}
          </Surface>
          <Surface>
            <Surface style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--navy)", lineHeight: 1.2 }}>
              {INITIAL_CUSTOMER_PROFILE.fname} {INITIAL_CUSTOMER_PROFILE.lname}
            </Surface>
            <Surface style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
              {INITIAL_CUSTOMER_PROFILE.CustID}
            </Surface>
          </Surface>
        </Link>

        {/* Sign Out Action */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: "0.5rem",
            color: "var(--muted)",
            display: 'flex',
            alignItems: 'center',
            borderRadius: "0.375rem",
          }}
          title="Sign out of customer session"
        >
          <LogOut size={18} />
        </button>
      </Surface>
    </header>
  );

  // Custom SideNav Sidebar
  const customerSideNav = (
    <Surface
      style={{
        width: '100%',
        borderRight: "0.0625rem solid var(--border)",
        background: "var(--white)",
        minHeight: "calc(100vh - 4rem)",
        padding: "1rem 0.75rem",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Surface style={{ display: 'flex', flexDirection: 'column', gap: "0.25rem" }}>
        <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#687d93", textTransform: 'uppercase', letterSpacing: '0.05em', padding: "0.5rem 0.75rem 0.25rem 0.75rem" }}>
          Overview
        </Surface>

        <Link
          to="/customer/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.625rem",
            padding: "0.625rem 0.875rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/dashboard' || currentPath === '/customer' ? "#e0f2fe" : 'transparent',
            color: currentPath === '/customer/dashboard' || currentPath === '/customer' ? "var(--blue)" : "var(--muted)",
          }}
        >
          <Home size={18} />
          <Inline>Dashboard</Inline>
        </Link>

        <Link
          to="/customer/applications"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.625rem",
            padding: "0.625rem 0.875rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath.startsWith('/customer/applications') && currentPath !== '/customer/applications/new' ? "#e0f2fe" : 'transparent',
            color: currentPath.startsWith('/customer/applications') && currentPath !== '/customer/applications/new' ? "var(--blue)" : "var(--muted)",
          }}
        >
          <Layers size={18} />
          <Inline>My Applications</Inline>
        </Link>

        <Link
          to="/customer/applications/new"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.625rem",
            padding: "0.625rem 0.875rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/applications/new' ? "#e0f2fe" : 'transparent',
            color: currentPath === '/customer/applications/new' ? "var(--blue)" : "var(--muted)",
          }}
        >
          <PlusCircle size={18} />
          <Inline>New Application</Inline>
        </Link>

        <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#687d93", textTransform: 'uppercase', letterSpacing: '0.05em', padding: "1rem 0.75rem 0.25rem 0.75rem" }}>
          Workstation
        </Surface>

        <Link
          to="/customer/documents"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.625rem",
            padding: "0.625rem 0.875rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/documents' ? "#e0f2fe" : 'transparent',
            color: currentPath === '/customer/documents' ? "var(--blue)" : "var(--muted)",
          }}
        >
          <FileText size={18} />
          <Inline>Document Centre</Inline>
        </Link>

        <Link
          to="/customer/documents/upload"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.625rem",
            padding: "0.625rem 0.875rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/documents/upload' ? "#e0f2fe" : 'transparent',
            color: currentPath === '/customer/documents/upload' ? "var(--blue)" : "var(--muted)",
          }}
        >
          <UploadCloud size={18} />
          <Inline>Document Upload</Inline>
        </Link>

        <Link
          to="/customer/conversations"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.625rem",
            padding: "0.625rem 0.875rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/conversations' ? "#e0f2fe" : 'transparent',
            color: currentPath === '/customer/conversations' ? "var(--blue)" : "var(--muted)",
          }}
        >
          <MessageSquare size={18} />
          <Inline>Conversations (CA)</Inline>
        </Link>

        <Link
          to="/customer/payments"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.625rem",
            padding: "0.625rem 0.875rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/payments' ? "#e0f2fe" : 'transparent',
            color: currentPath === '/customer/payments' ? "var(--blue)" : "var(--muted)",
          }}
        >
          <Receipt size={18} />
          <Inline>Payments &amp; Invoices</Inline>
        </Link>

        <Surface style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#687d93", textTransform: 'uppercase', letterSpacing: '0.05em', padding: "1rem 0.75rem 0.25rem 0.75rem" }}>
          Account &amp; Help
        </Surface>

        <Link
          to="/customer/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.625rem",
            padding: "0.625rem 0.875rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/profile' ? "#e0f2fe" : 'transparent',
            color: currentPath === '/customer/profile' ? "var(--blue)" : "var(--muted)",
          }}
        >
          <User size={18} />
          <Inline>Profile &amp; Bank Info</Inline>
        </Link>

        <Link
          to="/customer/notifications" aria-label="Notifications"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: "0.625rem 0.875rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/notifications' ? "#e0f2fe" : 'transparent',
            color: currentPath === '/customer/notifications' ? "var(--blue)" : "var(--muted)",
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "0.625rem" }}>
            <Bell size={18} />
            <Inline>Notifications</Inline>
          </Surface>
          {unreadCount > 0 && (
            <Inline style={{ background: "#ef4444", color: "var(--white)", fontSize: "0.8125rem", padding: "0.0625rem 0.375rem", borderRadius: "0.625rem" }}>
              {unreadCount}
            </Inline>
          )}
        </Link>

        <Link
          to="/customer/support"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "0.625rem",
            padding: "0.625rem 0.875rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/support' ? "#e0f2fe" : 'transparent',
            color: currentPath === '/customer/support' ? "var(--blue)" : "var(--muted)",
          }}
        >
          <HelpCircle size={18} />
          <Inline>Customer Support</Inline>
        </Link>
      </Surface>

      {/* Assigned Agent Box */}
      <Surface
        style={{
          background: "var(--cream)",
          borderRadius: "1rem",
          border: "0.0625rem solid var(--border)",
          padding: "0.75rem",
          fontSize: "0.8125rem",
          marginTop: "1.25rem",
        }}
      >
        <Surface style={{ color: "var(--muted)", fontSize: "0.8125rem", textTransform: 'uppercase', fontWeight: 600 }}>
          Assigned Business Agent
        </Surface>
        <Surface style={{ fontWeight: 700, color: "var(--navy)", marginTop: "0.125rem" }}>
          {INITIAL_CUSTOMER_PROFILE.agentName}
        </Surface>
        <Surface style={{ color: "var(--blue)", fontSize: "0.8125rem", marginTop: "0.0625rem" }}>
          ID: {INITIAL_CUSTOMER_PROFILE.agentId}
        </Surface>
      </Surface>
    </Surface>
  );

  return (
    <PortalShell header={customerTopNav} navigation={customerSideNav}>
      <Outlet />
    </PortalShell>
  );
};

export default CustomerLayout;
