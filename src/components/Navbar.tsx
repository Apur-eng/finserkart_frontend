import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '@astryxdesign/core/Button';
import { Drawer } from '@astryxdesign/core/Drawer';
import { HStack } from '@astryxdesign/core/HStack';
import { VStack } from '@astryxdesign/core/VStack';
import { Text } from '@astryxdesign/core/Text';
import { Menu, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useCompactViewport } from '../hooks/useCompactViewport';

const links = [['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/contact', 'Contact']];
const roles = [
  ['customer', 'Customer Login'],
  ['agent', 'Agent Login'],
  ['franchise', 'Franchise Login'],
  ['ca', 'CA Login'],
  ['coordinator', 'Operations Coordinator Login'],
  ['admin', 'Main Admin Login'],
];
const linkStyle = { padding: 'var(--spacing-3)', borderRadius: 'var(--radius-element)', textDecoration: 'none', fontWeight: 600 };

export function Navbar() {
  const compact = useCompactViewport();
  const { pathname, search } = useLocation();
  const route = pathname + search;
  const [openAt, setOpenAt] = useState<string | null>(null);
  const navigation = <>
    {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}
      style={({ isActive }) => ({ ...linkStyle, color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
        background: isActive ? 'var(--color-fsk-info-subtle)' : 'transparent' })}>{label}</NavLink>)}
  </>;
  return <VStack as="header" style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--color-background-surface)',
    borderBottom: 'thin solid var(--color-background-muted)' }} hAlign="center" paddingInline={4}>
    <a className="skip-link" href="#public-content">Skip to content</a>
    <HStack width="100%" maxWidth={1240} paddingBlock={3} hAlign="between" vAlign="center" gap={3}>
      <Link to="/" aria-label="Finservkart home" style={{ textDecoration: 'none', color: 'var(--color-fsk-brand)' }}>
        <HStack gap={2} vAlign="center"><ShieldCheck aria-hidden="true" /><Text size="xl" weight="bold" color="inherit">Finservkart</Text></HStack>
      </Link>
      {!compact && <HStack as="nav" aria-label="Main navigation" gap={1} vAlign="center">{navigation}</HStack>}
      <HStack gap={2} vAlign="center">
        {!compact && <>
          <Link to="/explore-demo" style={{ ...linkStyle, border: '1px solid var(--color-accent)', color: 'var(--color-accent)' }}>Explore Demo</Link>
          <details onKeyDown={(event) => { if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus(); } }}
            style={{ position: 'relative' }}>
            <summary style={{ ...linkStyle, cursor: 'pointer', color: 'var(--color-text-primary)' }}>Login</summary>
            <VStack padding={2} gap={1} style={{ position: 'absolute', right: 0, zIndex: 50,
              minWidth: 'max-content', background: 'var(--color-background-surface)', borderRadius: 'var(--radius-container)', boxShadow: 'var(--shadow-fsk-card)' }}>
              {roles.map(([role, label]) => <Link key={role} to={`/login?role=${role}`} style={linkStyle}
                onClick={(event) => { const details = event.currentTarget.closest('details'); if (details) details.open = false; }}>{label}</Link>)}
            </VStack>
          </details>
          <Link to="/register" style={{ ...linkStyle, background: 'var(--color-accent)', color: 'var(--color-background-surface)' }}>Create account <ArrowUpRight aria-hidden="true" size={16} /></Link>
        </>}
        {compact && <Button label="Menu" icon={<Menu aria-hidden="true" />} variant="secondary"
          aria-expanded={openAt === route} onClick={() => setOpenAt(route)} />}
      </HStack>
    </HStack>
    {compact && <Drawer label="Main navigation" isOpen={openAt === route} onOpenChange={(open) => setOpenAt(open ? route : null)} width={340}>
      <VStack gap={3}>
        <Button label="Close menu" variant="secondary" onClick={() => setOpenAt(null)} />
        <Link to="/explore-demo" style={{ ...linkStyle, background: 'var(--color-fsk-info-subtle)', color: 'var(--color-accent)' }}>Explore Demo</Link>
        <VStack as="nav" aria-label="Main navigation">{navigation}</VStack>
        <Text type="label">Your account</Text>
        {roles.map(([role, label]) => <Link key={role} to={`/login?role=${role}`} style={linkStyle}>{label}</Link>)}
        <Link to="/login" style={linkStyle}>Unified Login</Link>
        <Link to="/register" style={linkStyle}>Create New Account</Link>
      </VStack>
    </Drawer>}
  </VStack>;
}
export default Navbar;
