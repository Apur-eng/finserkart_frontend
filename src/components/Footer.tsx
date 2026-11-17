import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: '#0a1120', color: '#cbd5e1', paddingTop: '64px', paddingBottom: '32px', marginTop: '64px', borderTop: '1px solid #1e293b' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          {/* Brand & Office */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <ShieldCheck size={20} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>Finservkart</span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#94a3b8', marginBottom: '20px' }}>
              Your trusted partner in navigating the intricate landscape of financial services, business registration, taxation, and statutory compliance.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="#0066cc" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Jankipuram Garden, Jankipuram, Lucknow, Uttar Pradesh 226021</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#0066cc" style={{ flexShrink: 0 }} />
                <span>+91 9120000000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#0066cc" style={{ flexShrink: 0 }} />
                <span>info@finservkart.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li>
                <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>About Us</Link>
              </li>
              <li>
                <Link to="/services" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Our Services</Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* User & Partner Portals */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Portals & Logins</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li>
                <Link to="/login?role=customer" style={{ color: '#94a3b8', textDecoration: 'none' }}>Customer Portal</Link>
              </li>
              <li>
                <Link to="/login?role=agent" style={{ color: '#94a3b8', textDecoration: 'none' }}>Agent Partner Portal</Link>
              </li>
              <li>
                <Link to="/login?role=ca" style={{ color: '#94a3b8', textDecoration: 'none' }}>CA Workstation</Link>
              </li>
              <li>
                <Link to="/register" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }}>Create New Customer Account</Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Compliance & Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li>
                <Link to="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms & Conditions</Link>
              </li>
              <li>
                <span style={{ color: '#94a3b8' }}>Refund & Cancellation Policy</span>
              </li>
              <li>
                <span style={{ color: '#94a3b8' }}>Security & RBI Guidelines</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: '24px', borderTop: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#64748b', gap: '12px' }}>
          <div>
            &copy; {new Date().getFullYear()} Finservkart Financial Services. All rights reserved.
          </div>
          <div>
            Preserving verified PHP backend & MySQL contracts.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
