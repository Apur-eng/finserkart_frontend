import { ActionButton, SidePanel, Row, Stack } from './ui';
import { useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useCompactViewport } from '../hooks/useCompactViewport';
import { DemoBanner } from '../features/demo/DemoBanner';

export function PortalShell({ header, navigation, children }: { header: ReactNode; navigation: ReactNode; children: ReactNode }) {
  const compact = useCompactViewport();
  const { pathname } = useLocation();
  const [openAt, setOpenAt] = useState<string | null>(null);
  return (
    <Stack minHeight="100dvh" gap={0} style={{ background: 'var(--cream)' }}>
      <a href="#portal-content" className="skip-link">Skip to content</a>
      <DemoBanner />
      <Stack style={{ position: 'sticky', top: 0, zIndex: 30, background: 'var(--white)' }}>
        {header}
        {compact && <Row paddingInline={3} paddingBlock={2}>
          <ActionButton label="Portal navigation" icon={<Menu aria-hidden="true" />} variant="secondary"
            aria-expanded={openAt === pathname} onClick={() => setOpenAt(pathname)} />
        </Row>}
      </Stack>
      <Row gap={0} vAlign="stretch" style={{ flex: 1 }}>
        {!compact && <Stack as="nav" aria-label="Portal navigation" width={256}
          style={{ flexShrink: 0, background: 'var(--white)' }}>{navigation}</Stack>}
        <Stack as="main" id="portal-content" tabIndex={-1} padding={compact ? 3 : 6}
          style={{ flex: 1, minWidth: 0 }}>
          <Stack width="100%" maxWidth={1480} style={{ marginInline: 'auto' }}>{children}</Stack>
        </Stack>
      </Row>
      {compact && <SidePanel isOpen={openAt === pathname} onOpenChange={(open) => setOpenAt(open ? pathname : null)}
        label="Portal navigation" side="start" width={300} padding={0}>
        <Stack padding={3}><ActionButton label="Close navigation" variant="secondary" onClick={() => setOpenAt(null)} /></Stack>
        <Stack as="nav" aria-label="Portal navigation">{navigation}</Stack>
      </SidePanel>}
    </Stack>
  );
}
