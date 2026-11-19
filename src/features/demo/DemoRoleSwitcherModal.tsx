import React from 'react';
import { Button } from '@astryxdesign/core/Button';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import {
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Scale,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';
import { DEMO_ROLES_LIST } from './demoConfig';
import { useDemo } from './useDemo';
import type { DemoRole } from './demoTypes';

const roleIcons: Record<DemoRole, React.ComponentType<{ size?: number; className?: string; color?: string }>> = {
  admin: ShieldCheck,
  coordinator: ClipboardCheck,
  franchise: Building2,
  agent: Briefcase,
  ca: Scale,
  customer: User,
};

export const DemoRoleSwitcherModal: React.FC = () => {
  const { isSwitcherOpen, closeSwitcher, currentRole, switchDemoRole } = useDemo();

  if (!isSwitcherOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-switcher-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-4)',
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSwitcher();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--color-background-surface)',
          borderRadius: 'var(--radius-container)',
          boxShadow: 'var(--shadow-fsk-card)',
          padding: 'var(--spacing-5)',
          border: '1px solid var(--color-background-muted)',
        }}
      >
        <VStack gap={4}>
          <HStack hAlign="between" vAlign="center">
            <VStack gap={1}>
              <Text type="label" color="accent">DEMO ROLE SWITCHER</Text>
              <Heading level={2} id="demo-switcher-title" style={{ margin: 0, fontSize: '1.25rem' }}>
                Switch Perspective
              </Heading>
              <Text type="supporting">
                Select a user role to explore its dedicated dashboard and sample workflows.
              </Text>
            </VStack>
            <Button
              label="Close"
              icon={<X size={18} aria-hidden="true" />}
              variant="ghost"
              onClick={closeSwitcher}
            />
          </HStack>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--spacing-3)',
            }}
          >
            {DEMO_ROLES_LIST.map((role) => {
              const Icon = roleIcons[role.id];
              const isSelected = currentRole === role.id;

              return (
                <div
                  key={role.id}
                  onClick={() => switchDemoRole(role.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      switchDemoRole(role.id);
                    }
                  }}
                  style={{
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderRadius: 'var(--radius-element)',
                    border: isSelected
                      ? '2px solid var(--color-accent)'
                      : '1px solid var(--color-background-muted)',
                    background: isSelected
                      ? 'var(--color-fsk-info-subtle)'
                      : 'var(--color-background-surface)',
                    padding: 'var(--spacing-3)',
                    transition: 'border-color 0.15s, background-color 0.15s',
                  }}
                >
                  <HStack gap={3} vAlign="start">
                    <div
                      style={{
                        padding: 'var(--spacing-2)',
                        borderRadius: 'var(--radius-element)',
                        background: isSelected
                          ? 'var(--color-accent)'
                          : 'var(--color-background-muted)',
                        color: isSelected ? '#ffffff' : 'var(--color-text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <VStack gap={1} style={{ flex: 1, minWidth: 0 }}>
                      <HStack hAlign="between" vAlign="center">
                        <Text weight="bold" size="base">
                          {role.name}
                        </Text>
                        {isSelected && (
                          <HStack gap={1} vAlign="center">
                            <CheckCircle2 size={14} color="var(--color-accent)" />
                            <Text size="xsm" color="accent" weight="bold">Active</Text>
                          </HStack>
                        )}
                      </HStack>
                      <Text type="supporting" size="xsm">
                        {role.description}
                      </Text>
                    </VStack>
                  </HStack>
                </div>
              );
            })}
          </div>

          <HStack hAlign="end" gap={2} paddingBlockStart={2} style={{ borderTop: '1px solid var(--color-background-muted)' }}>
            <Button label="Cancel" variant="secondary" onClick={closeSwitcher} />
          </HStack>
        </VStack>
      </div>
    </div>
  );
};

export default DemoRoleSwitcherModal;
