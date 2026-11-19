import { Surface, Inline } from './/Surface';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const copyrightYear = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: "var(--color-fsk-145)", color: "var(--color-fsk-59)", paddingTop: "var(--spacing-fsk-13)", paddingBottom: "var(--spacing-fsk-114)", marginTop: "var(--spacing-fsk-13)", borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-113)" }}>
      <Surface style={{ maxWidth: "var(--spacing-fsk-0)", margin: '0 auto', padding: "0 var(--spacing-fsk-2)" }}>
        <Surface style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))", gap: "var(--spacing-fsk-1)", marginBottom: "var(--spacing-fsk-4)" }}>
          {/* Brand & Office */}
          <Surface>
            <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)", marginBottom: "var(--spacing-fsk-5)" }}>
              <Surface style={{ width: "var(--spacing-fsk-62)", height: "var(--spacing-fsk-62)", borderRadius: "var(--radius-fsk-37)", background: "var(--color-fsk-brand)", display: 'flex', alignItems: 'center', justifyContent: 'center', color: "var(--color-fsk-38)" }}>
                <ShieldCheck size={20} />
              </Surface>
              <Inline style={{ fontSize: "var(--font-fsk-61)", fontWeight: 700, color: "var(--color-fsk-38)" }}>Finservkart</Inline>
            </Surface>
            <p style={{ fontSize: "var(--font-fsk-24)", lineHeight: 1.6, color: "var(--color-fsk-57)", marginBottom: "var(--spacing-fsk-2)" }}>
              Your trusted partner in navigating the intricate landscape of financial services, business registration, taxation, and statutory compliance.
            </p>
            <Surface style={{ display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)", fontSize: "var(--font-fsk-14)" }}>
              <Surface style={{ display: 'flex', alignItems: 'flex-start', gap: "var(--spacing-fsk-35)" }}>
                <MapPin size={16} color="var(--color-fsk-15)" style={{ flexShrink: 0, marginTop: "var(--spacing-fsk-47)" }} />
                <Inline>Jankipuram Garden, Jankipuram, Lucknow, Uttar Pradesh 226021</Inline>
              </Surface>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                <Phone size={16} color="var(--color-fsk-15)" style={{ flexShrink: 0 }} />
                <Inline>+91 9120000000</Inline>
              </Surface>
              <Surface style={{ display: 'flex', alignItems: 'center', gap: "var(--spacing-fsk-35)" }}>
                <Mail size={16} color="var(--color-fsk-15)" style={{ flexShrink: 0 }} />
                <Inline>info@finservkart.com</Inline>
              </Surface>
            </Surface>
          </Surface>

          {/* Quick Links */}
          <Surface>
            <h4 style={{ color: "var(--color-fsk-38)", fontSize: "var(--font-fsk-10)", fontWeight: 600, marginBottom: "var(--spacing-fsk-5)" }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)", fontSize: "var(--font-fsk-24)" }}>
              <li>
                <Link to="/" style={{ color: "var(--color-fsk-57)", textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
              </li>
              <li>
                <Link to="/about" style={{ color: "var(--color-fsk-57)", textDecoration: 'none', transition: 'color 0.2s' }}>About Us</Link>
              </li>
              <li>
                <Link to="/services" style={{ color: "var(--color-fsk-57)", textDecoration: 'none', transition: 'color 0.2s' }}>Our Services</Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: "var(--color-fsk-57)", textDecoration: 'none', transition: 'color 0.2s' }}>Contact Us</Link>
              </li>
            </ul>
          </Surface>

          {/* User & Partner Portals */}
          <Surface>
            <h4 style={{ color: "var(--color-fsk-38)", fontSize: "var(--font-fsk-10)", fontWeight: 600, marginBottom: "var(--spacing-fsk-5)" }}>Portals & Logins</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)", fontSize: "var(--font-fsk-24)" }}>
              <li>
                <Link to="/login?role=customer" style={{ color: "var(--color-fsk-57)", textDecoration: 'none' }}>Customer Portal</Link>
              </li>
              <li>
                <Link to="/login?role=agent" style={{ color: "var(--color-fsk-57)", textDecoration: 'none' }}>Agent Partner Portal</Link>
              </li>
              <li>
                <Link to="/login?role=ca" style={{ color: "var(--color-fsk-57)", textDecoration: 'none' }}>CA Workstation</Link>
              </li>
              <li>
                <Link to="/register" style={{ color: "var(--color-fsk-146)", textDecoration: 'none', fontWeight: 600 }}>Create New Customer Account</Link>
              </li>
            </ul>
          </Surface>

          {/* Support & Legal */}
          <Surface>
            <h4 style={{ color: "var(--color-fsk-38)", fontSize: "var(--font-fsk-10)", fontWeight: 600, marginBottom: "var(--spacing-fsk-5)" }}>Compliance & Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: "var(--spacing-fsk-35)", fontSize: "var(--font-fsk-24)" }}>
              <li>
                <Link to="/privacy-policy" style={{ color: "var(--color-fsk-57)", textDecoration: 'none' }}>Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" style={{ color: "var(--color-fsk-57)", textDecoration: 'none' }}>Terms & Conditions</Link>
              </li>
              <li>
                <Inline style={{ color: "var(--color-fsk-57)" }}>Refund & Cancellation Policy</Inline>
              </li>
              <li>
                <Inline style={{ color: "var(--color-fsk-57)" }}>Security & RBI Guidelines</Inline>
              </li>
            </ul>
          </Surface>
        </Surface>

        {/* Bottom Bar */}
        <Surface style={{ paddingTop: "var(--spacing-fsk-26)", borderTop: "var(--spacing-fsk-22) solid var(--color-fsk-113)", display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: "var(--font-fsk-14)", color: "var(--color-fsk-9)", gap: "var(--spacing-fsk-8)" }}>
          <Surface>
            &copy; {copyrightYear} Finservkart Financial Services. All rights reserved.
          </Surface>
          <Surface>
            Financial services for every stage of your business.
          </Surface>
        </Surface>
      </Surface>
    </footer>
  );
};

export default Footer;
