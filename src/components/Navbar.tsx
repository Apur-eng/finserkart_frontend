import { Button } from '@astryxdesign/core/Button';
import { HStack } from '@astryxdesign/core/HStack';
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav';
import { Briefcase, ChevronDown, LogIn, Menu, ShieldCheck, User, UserCheck, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 16px' }}>
        <TopNav
          label="Finservkart Navigation"
          heading={
            <TopNavHeading>
              <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <ShieldCheck size={22} />
                </div>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#0052a3', letterSpacing: '-0.02em' }}>
                  Finservkart
                </span>
              </Link>
            </TopNavHeading>
          }
          startContent={
            <HStack gap={1} vAlign="center">
              <TopNavItem
                label="Home"
                isSelected={isActive('/')}
                onClick={() => navigate('/')}
              />
              <TopNavItem
                label="About Us"
                isSelected={isActive('/about')}
                onClick={() => navigate('/about')}
              />
              <TopNavItem
                label="Services"
                isSelected={isActive('/services')}
                onClick={() => navigate('/services')}
              />
              <TopNavItem
                label="Contact"
                isSelected={isActive('/contact')}
                onClick={() => navigate('/contact')}
              />
            </HStack>
          }
          endContent={
            <HStack gap={2} vAlign="center">
              {/* Login dropdown trigger */}
              <div style={{ position: 'relative' }}>
                <Button
                  label="Login"
                  variant="ghost"
                  size="sm"
                  endContent={<ChevronDown size={14} style={{ marginLeft: '4px' }} />}
                  icon={<LogIn size={15} />}
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                />

                {loginDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      marginTop: '8px',
                      background: '#ffffff',
                      borderRadius: '12px',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
                      border: '1px solid #e2e8f0',
                      padding: '8px',
                      minWidth: '220px',
                      zIndex: 1050,
                    }}
                  >
                    <Link
                      to="/login?role=customer"
                      onClick={() => setLoginDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        textDecoration: 'none',
                        color: '#0f172a',
                        fontSize: '14px',
                        borderRadius: '8px',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <User size={16} color="#0066cc" />
                      <div>
                        <div style={{ fontWeight: 600 }}>Customer Login</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>For clients & service buyers</div>
                      </div>
                    </Link>

                    <Link
                      to="/login?role=agent"
                      onClick={() => setLoginDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        textDecoration: 'none',
                        color: '#0f172a',
                        fontSize: '14px',
                        borderRadius: '8px',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <UserCheck size={16} color="#10b981" />
                      <div>
                        <div style={{ fontWeight: 600 }}>Agent Login</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>For registered sales agents</div>
                      </div>
                    </Link>

                    <Link
                      to="/login?role=ca"
                      onClick={() => setLoginDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        textDecoration: 'none',
                        color: '#0f172a',
                        fontSize: '14px',
                        borderRadius: '8px',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <Briefcase size={16} color="#8b5cf6" />
                      <div>
                        <div style={{ fontWeight: 600 }}>CA Login</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Chartered Accountants</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Primary Sign Up Action */}
              <Button
                label="Sign Up"
                variant="primary"
                size="sm"
                onClick={() => navigate('/register')}
              />

              {/* Mobile toggle button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  display: 'none',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                }}
                className="mobile-toggle"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </HStack>
          }
        />

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 0',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, padding: '8px 12px' }}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, padding: '8px 12px' }}
            >
              About Us
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, padding: '8px 12px' }}
            >
              Services
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, padding: '8px 12px' }}
            >
              Contact
            </Link>
            <div style={{ height: '1px', background: '#e2e8f0', margin: '4px 0' }} />
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: 'none', color: '#0066cc', fontWeight: 600, padding: '8px 12px' }}
            >
              Login to Account
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: 'none', color: '#10b981', fontWeight: 600, padding: '8px 12px' }}
            >
              Create New Account
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
