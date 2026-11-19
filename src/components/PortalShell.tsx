import { useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@astryxdesign/core/Button';
import { Drawer } from '@astryxdesign/core/Drawer';
import { HStack } from '@astryxdesign/core/HStack';
import { VStack } from '@astryxdesign/core/VStack';
import { Menu } from 'lucide-react';
import { useCompactViewport } from '../hooks/useCompactViewport';
import { DemoBanner } from '../features/demo/DemoBanner';

export function PortalShell({ header, navigation, children }: { header: ReactNode; navigation: ReactNode; children: ReactNode }) {
  const compact = useCompactViewport();
  const { pathname } = useLocation();
  const [openAt, setOpenAt] = useState<string | null>(null);
  return (
    <VStack minHeight="100dvh" gap={0} style={{ background: 'var(--color-background-body)' }}>
      <a href="#portal-content" className="skip-link">Skip to content</a>
      <DemoBanner />
      <VStack style={{ position: 'sticky', top: 0, zIndex: 30, background: 'var(--color-background-surface)' }}>
        {header}
        {compact && <HStack paddingInline={3} paddingBlock={2}>
          <Button label="Portal navigation" icon={<Menu aria-hidden="true" />} variant="secondary"
            aria-expanded={openAt === pathname} onClick={() => setOpenAt(pathname)} />
        </HStack>}
      </VStack>
      <HStack gap={0} vAlign="stretch" style={{ flex: 1 }}>
        {!compact && <VStack as="nav" aria-label="Portal navigation" width={256}
          style={{ flexShrink: 0, background: 'var(--color-background-surface)' }}>{navigation}</VStack>}
        <VStack as="main" id="portal-content" tabIndex={-1} padding={compact ? 3 : 6}
          style={{ flex: 1, minWidth: 0 }}>
          <VStack width="100%" maxWidth={1480} style={{ marginInline: 'auto' }}>{children}</VStack>
        </VStack>
      </HStack>
      {compact && <Drawer isOpen={openAt === pathname} onOpenChange={(open) => setOpenAt(open ? pathname : null)}
        label="Portal navigation" side="start" width={300} padding={0}>
        <VStack padding={3}><Button label="Close navigation" variant="secondary" onClick={() => setOpenAt(null)} /></VStack>
        <VStack as="nav" aria-label="Portal navigation">{navigation}</VStack>
      </Drawer>}
    </VStack>
  );
}
