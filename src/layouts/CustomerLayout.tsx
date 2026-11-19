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
        <Link to="/customer/dashboard" style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", textDecoration: 'none' }}>
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
            <ShieldCheck size={20} />
          </Surface>
          <Inline style={{ fontSize: "var(--font-fsk-30)", fontWeight: 800, color: "var(--color-fsk-7)", letterSpacing: '-0.01em' }}>
            Finservkart
          </Inline>
        </Link>
        <Inline style={{ color: "var(--color-fsk-59)" }}>|</Inline>
        <Badge label="Customer Portal" variant="blue" />
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
          to="/customer/notifications" aria-label="Notifications"
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
            background: currentPath === '/customer/notifications' ? "var(--color-fsk-46)" : "var(--color-fsk-38)",
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
        <Link  to="/customer/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-35)",
            padding: "var(--spacing-fsk-29) var(--spacing-fsk-8) var(--spacing-fsk-29) var(--spacing-fsk-17)",
            borderRadius: "var(--radius-fsk-28)",
            border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
            background: "var(--color-fsk-27)",
            cursor: 'pointer',
          }}
        >
          <Surface
            style={{
              width: "var(--spacing-fsk-71)",
              height: "var(--spacing-fsk-71)",
              borderRadius: '50%',
              background: "var(--color-fsk-15)",
              color: "var(--color-fsk-38)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: "var(--font-fsk-14)",
              fontWeight: 700,
            }}
          >
            {INITIAL_CUSTOMER_PROFILE.fname[0]}
          </Surface>
          <Surface>
            <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 600, color: "var(--color-fsk-7)", lineHeight: 1.2 }}>
              {INITIAL_CUSTOMER_PROFILE.fname} {INITIAL_CUSTOMER_PROFILE.lname}
            </Surface>
            <Surface style={{ fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)" }}>
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
            padding: "var(--spacing-fsk-12)",
            color: "var(--color-fsk-9)",
            display: 'flex',
            alignItems: 'center',
            borderRadius: "var(--radius-fsk-42)",
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
        borderRight: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
        background: "var(--color-fsk-38)",
        minHeight: "calc(100vh - var(--spacing-fsk-141))",
        padding: "var(--spacing-fsk-5) var(--spacing-fsk-8)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-29)" }}>
        <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-57)", textTransform: 'uppercase', letterSpacing: '0.05em', padding: "var(--spacing-fsk-12) var(--spacing-fsk-8) var(--spacing-fsk-29) var(--spacing-fsk-8)" }}>
          Overview
        </Surface>

        <Link
          to="/customer/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-35)",
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-23)",
            borderRadius: "var(--radius-fsk-37)",
            fontSize: "var(--font-fsk-24)",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/dashboard' || currentPath === '/customer' ? "var(--color-fsk-112)" : 'transparent',
            color: currentPath === '/customer/dashboard' || currentPath === '/customer' ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
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
            gap: "var(--spacing-fsk-35)",
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-23)",
            borderRadius: "var(--radius-fsk-37)",
            fontSize: "var(--font-fsk-24)",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath.startsWith('/customer/applications') && currentPath !== '/customer/applications/new' ? "var(--color-fsk-112)" : 'transparent',
            color: currentPath.startsWith('/customer/applications') && currentPath !== '/customer/applications/new' ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
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
            gap: "var(--spacing-fsk-35)",
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-23)",
            borderRadius: "var(--radius-fsk-37)",
            fontSize: "var(--font-fsk-24)",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/applications/new' ? "var(--color-fsk-112)" : 'transparent',
            color: currentPath === '/customer/applications/new' ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
          }}
        >
          <PlusCircle size={18} />
          <Inline>New Application</Inline>
        </Link>

        <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-57)", textTransform: 'uppercase', letterSpacing: '0.05em', padding: "var(--spacing-fsk-5) var(--spacing-fsk-8) var(--spacing-fsk-29) var(--spacing-fsk-8)" }}>
          Workstation
        </Surface>

        <Link
          to="/customer/documents"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-35)",
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-23)",
            borderRadius: "var(--radius-fsk-37)",
            fontSize: "var(--font-fsk-24)",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/documents' ? "var(--color-fsk-112)" : 'transparent',
            color: currentPath === '/customer/documents' ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
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
            gap: "var(--spacing-fsk-35)",
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-23)",
            borderRadius: "var(--radius-fsk-37)",
            fontSize: "var(--font-fsk-24)",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/documents/upload' ? "var(--color-fsk-112)" : 'transparent',
            color: currentPath === '/customer/documents/upload' ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
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
            gap: "var(--spacing-fsk-35)",
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-23)",
            borderRadius: "var(--radius-fsk-37)",
            fontSize: "var(--font-fsk-24)",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/conversations' ? "var(--color-fsk-112)" : 'transparent',
            color: currentPath === '/customer/conversations' ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
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
            gap: "var(--spacing-fsk-35)",
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-23)",
            borderRadius: "var(--radius-fsk-37)",
            fontSize: "var(--font-fsk-24)",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/payments' ? "var(--color-fsk-112)" : 'transparent',
            color: currentPath === '/customer/payments' ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
          }}
        >
          <Receipt size={18} />
          <Inline>Payments &amp; Invoices</Inline>
        </Link>

        <Surface style={{ fontSize: "var(--font-fsk-14)", fontWeight: 700, color: "var(--color-fsk-57)", textTransform: 'uppercase', letterSpacing: '0.05em', padding: "var(--spacing-fsk-5) var(--spacing-fsk-8) var(--spacing-fsk-29) var(--spacing-fsk-8)" }}>
          Account &amp; Help
        </Surface>

        <Link
          to="/customer/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-35)",
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-23)",
            borderRadius: "var(--radius-fsk-37)",
            fontSize: "var(--font-fsk-24)",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/profile' ? "var(--color-fsk-112)" : 'transparent',
            color: currentPath === '/customer/profile' ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
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
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-23)",
            borderRadius: "var(--radius-fsk-37)",
            fontSize: "var(--font-fsk-24)",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/notifications' ? "var(--color-fsk-112)" : 'transparent',
            color: currentPath === '/customer/notifications' ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
          }}
        >
          <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
            <Bell size={18} />
            <Inline>Notifications</Inline>
          </Surface>
          {unreadCount > 0 && (
            <Inline style={{ background: "var(--color-fsk-129)", color: "var(--color-fsk-38)", fontSize: "var(--font-fsk-14)", padding: "var(--spacing-fsk-22) var(--spacing-fsk-17)", borderRadius: "var(--radius-fsk-68)" }}>
              {unreadCount}
            </Inline>
          )}
        </Link>

        <Link
          to="/customer/support"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: "var(--spacing-fsk-35)",
            padding: "var(--spacing-fsk-35) var(--spacing-fsk-23)",
            borderRadius: "var(--radius-fsk-37)",
            fontSize: "var(--font-fsk-24)",
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/support' ? "var(--color-fsk-112)" : 'transparent',
            color: currentPath === '/customer/support' ? "var(--color-fsk-15)" : "var(--color-fsk-18)",
          }}
        >
          <HelpCircle size={18} />
          <Inline>Customer Support</Inline>
        </Link>
      </Surface>

      {/* Assigned Agent Box */}
      <Surface
        style={{
          background: "var(--color-fsk-27)",
          borderRadius: "var(--radius-fsk-28)",
          border: "var(--spacing-fsk-22) solid var(--color-fsk-21)",
          padding: "var(--spacing-fsk-8)",
          fontSize: "var(--font-fsk-14)",
          marginTop: "var(--spacing-fsk-2)",
        }}
      >
        <Surface style={{ color: "var(--color-fsk-9)", fontSize: "var(--font-fsk-14)", textTransform: 'uppercase', fontWeight: 600 }}>
          Assigned Business Agent
        </Surface>
        <Surface style={{ fontWeight: 700, color: "var(--color-fsk-7)", marginTop: "var(--spacing-fsk-47)" }}>
          {INITIAL_CUSTOMER_PROFILE.agentName}
        </Surface>
        <Surface style={{ color: "var(--color-fsk-15)", fontSize: "var(--font-fsk-14)", marginTop: "var(--spacing-fsk-22)" }}>
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
