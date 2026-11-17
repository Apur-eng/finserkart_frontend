import { AppShell } from '@astryxdesign/core/AppShell';
import { Badge } from '@astryxdesign/core/Badge';
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
        <Link to="/customer/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
            Finservkart
          </span>
        </Link>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <Badge label="Customer Portal" variant="blue" />
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Link back to public site */}
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

        {/* Notifications Icon Button */}
        <Link
          to="/customer/notifications"
          style={{
            position: 'relative',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
            textDecoration: 'none',
            background: currentPath === '/customer/notifications' ? '#f1f5f9' : '#ffffff',
          }}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#ef4444',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 700,
                borderRadius: '999px',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff',
              }}
            >
              {unreadCount}
            </span>
          )}
        </Link>

        {/* User Pill */}
        <div
          onClick={() => navigate('/customer/profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 12px 4px 6px',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            background: '#f8fafc',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#0066cc',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            {INITIAL_CUSTOMER_PROFILE.fname[0]}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>
              {INITIAL_CUSTOMER_PROFILE.fname} {INITIAL_CUSTOMER_PROFILE.lname}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              {INITIAL_CUSTOMER_PROFILE.CustID}
            </div>
          </div>
        </div>

        {/* Sign Out Action */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '6px',
          }}
          title="Sign out of customer session"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );

  // Custom SideNav Sidebar
  const customerSideNav = (
    <div
      style={{
        width: '260px',
        borderRight: '1px solid #e2e8f0',
        background: '#ffffff',
        minHeight: 'calc(100vh - 64px)',
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '8px 12px 4px 12px' }}>
          Overview
        </div>

        <Link
          to="/customer/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/dashboard' || currentPath === '/customer' ? '#e0f2fe' : 'transparent',
            color: currentPath === '/customer/dashboard' || currentPath === '/customer' ? '#0066cc' : '#475569',
          }}
        >
          <Home size={18} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/customer/applications"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath.startsWith('/customer/applications') && currentPath !== '/customer/applications/new' ? '#e0f2fe' : 'transparent',
            color: currentPath.startsWith('/customer/applications') && currentPath !== '/customer/applications/new' ? '#0066cc' : '#475569',
          }}
        >
          <Layers size={18} />
          <span>My Applications</span>
        </Link>

        <Link
          to="/customer/applications/new"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/applications/new' ? '#e0f2fe' : 'transparent',
            color: currentPath === '/customer/applications/new' ? '#0066cc' : '#475569',
          }}
        >
          <PlusCircle size={18} />
          <span>New Application</span>
        </Link>

        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '16px 12px 4px 12px' }}>
          Workstation
        </div>

        <Link
          to="/customer/documents"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/documents' ? '#e0f2fe' : 'transparent',
            color: currentPath === '/customer/documents' ? '#0066cc' : '#475569',
          }}
        >
          <FileText size={18} />
          <span>Document Centre</span>
        </Link>

        <Link
          to="/customer/documents/upload"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/documents/upload' ? '#e0f2fe' : 'transparent',
            color: currentPath === '/customer/documents/upload' ? '#0066cc' : '#475569',
          }}
        >
          <UploadCloud size={18} />
          <span>Document Upload</span>
        </Link>

        <Link
          to="/customer/conversations"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/conversations' ? '#e0f2fe' : 'transparent',
            color: currentPath === '/customer/conversations' ? '#0066cc' : '#475569',
          }}
        >
          <MessageSquare size={18} />
          <span>Conversations (CA)</span>
        </Link>

        <Link
          to="/customer/payments"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/payments' ? '#e0f2fe' : 'transparent',
            color: currentPath === '/customer/payments' ? '#0066cc' : '#475569',
          }}
        >
          <Receipt size={18} />
          <span>Payments &amp; Invoices</span>
        </Link>

        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '16px 12px 4px 12px' }}>
          Account &amp; Help
        </div>

        <Link
          to="/customer/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/profile' ? '#e0f2fe' : 'transparent',
            color: currentPath === '/customer/profile' ? '#0066cc' : '#475569',
          }}
        >
          <User size={18} />
          <span>Profile &amp; Bank Info</span>
        </Link>

        <Link
          to="/customer/notifications"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/notifications' ? '#e0f2fe' : 'transparent',
            color: currentPath === '/customer/notifications' ? '#0066cc' : '#475569',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={18} />
            <span>Notifications</span>
          </div>
          {unreadCount > 0 && (
            <span style={{ background: '#ef4444', color: '#fff', fontSize: '11px', padding: '1px 6px', borderRadius: '10px' }}>
              {unreadCount}
            </span>
          )}
        </Link>

        <Link
          to="/customer/support"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            background: currentPath === '/customer/support' ? '#e0f2fe' : 'transparent',
            color: currentPath === '/customer/support' ? '#0066cc' : '#475569',
          }}
        >
          <HelpCircle size={18} />
          <span>Customer Support</span>
        </Link>
      </div>

      {/* Assigned Agent Box */}
      <div
        style={{
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '12px',
          fontSize: '12px',
          marginTop: '20px',
        }}
      >
        <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>
          Assigned Business Agent
        </div>
        <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
          {INITIAL_CUSTOMER_PROFILE.agentName}
        </div>
        <div style={{ color: '#0066cc', fontSize: '11px', marginTop: '1px' }}>
          ID: {INITIAL_CUSTOMER_PROFILE.agentId}
        </div>
      </div>
    </div>
  );

  return (
    <AppShell
      height="auto"
      variant="surface"
      topNav={customerTopNav}
      contentPadding={0}
    >
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        {customerSideNav}
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

export default CustomerLayout;
