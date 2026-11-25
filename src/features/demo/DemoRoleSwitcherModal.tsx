import { ActionButton, Title, Row, Typography, Stack } from '../../components/ui';
import React from 'react';
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
        padding: '1rem',
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
          background: 'var(--white)',
          borderRadius: 'var(--radius-panel)',
          boxShadow: 'var(--shadow-panel)',
          padding: '1.25rem',
          border: '1px solid var(--sage-light)',
        }}
      >
        <Stack gap={4}>
          <Row hAlign="between" vAlign="center">
            <Stack gap={1}>
              <Typography type="label" color="accent">DEMO ROLE SWITCHER</Typography>
              <Title level={2} id="demo-switcher-title" style={{ margin: 0, fontSize: '1.25rem' }}>
                Switch Perspective
              </Title>
              <Typography type="supporting">
                Select a user role to explore its dedicated dashboard and sample workflows.
              </Typography>
            </Stack>
            <ActionButton
              label="Close"
              icon={<X size={18} aria-hidden="true" />}
              variant="ghost"
              onClick={closeSwitcher}
            />
          </Row>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '0.75rem',
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
                    borderRadius: 'var(--radius-small)',
                    border: isSelected
                      ? '2px solid var(--blue)'
                      : '1px solid var(--sage-light)',
                    background: isSelected
                      ? 'var(--status-info-subtle)'
                      : 'var(--white)',
                    padding: '0.75rem',
                    transition: 'border-color 0.15s, background-color 0.15s',
                  }}
                >
                  <Row gap={3} vAlign="start">
                    <div
                      style={{
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-small)',
                        background: isSelected
                          ? 'var(--blue)'
                          : 'var(--sage-light)',
                        color: isSelected ? '#ffffff' : 'var(--navy)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <Stack gap={1} style={{ flex: 1, minWidth: 0 }}>
                      <Row hAlign="between" vAlign="center">
                        <Typography weight="bold" size="base">
                          {role.name}
                        </Typography>
                        {isSelected && (
                          <Row gap={1} vAlign="center">
                            <CheckCircle2 size={14} color="var(--blue)" />
                            <Typography size="xsm" color="accent" weight="bold">Active</Typography>
                          </Row>
                        )}
                      </Row>
                      <Typography type="supporting" size="xsm">
                        {role.description}
                      </Typography>
                    </Stack>
                  </Row>
                </div>
              );
            })}
          </div>

          <Row hAlign="end" gap={2} paddingBlockStart={2} style={{ borderTop: '1px solid var(--sage-light)' }}>
            <ActionButton label="Cancel" variant="secondary" onClick={closeSwitcher} />
          </Row>
        </Stack>
      </div>
    </div>
  );
};

export default DemoRoleSwitcherModal;
