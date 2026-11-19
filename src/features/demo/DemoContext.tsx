import React, { useCallback, useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DEMO_ROLES,
  getStoredDemoSession,
  isDemoModeEnabled,
  removeDemoSession,
  storeDemoSession,
} from './demoConfig';
import { DemoContext, type DemoContextValue } from './demoContextDef';
import type { DemoRole, DemoSession } from './demoTypes';

export const DemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const enabled = isDemoModeEnabled();
  const navigate = useNavigate();

  const [session, setSession] = useState<DemoSession | null>(() => {
    if (!enabled) return null;
    return getStoredDemoSession();
  });

  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const enterDemo = useCallback(
    (role: DemoRole, targetPath?: string) => {
      if (!enabled) return;
      const newSession = storeDemoSession(role);
      setSession(newSession);
      setIsSwitcherOpen(false);
      const destination = targetPath || DEMO_ROLES[role].dashboardPath;
      navigate(destination);
    },
    [enabled, navigate]
  );

  const switchDemoRole = useCallback(
    (role: DemoRole) => {
      enterDemo(role);
    },
    [enterDemo]
  );

  const exitDemo = useCallback(
    (redirectPath: string = '/explore-demo') => {
      removeDemoSession();
      setSession(null);
      setIsSwitcherOpen(false);
      navigate(redirectPath);
    },
    [navigate]
  );

  const currentRole = session?.role ?? null;
  const currentRoleConfig = currentRole ? DEMO_ROLES[currentRole] : null;
  const isDemoActive = enabled && session !== null;

  const value = useMemo<DemoContextValue>(
    () => ({
      isDemoModeEnabled: enabled,
      isDemoActive,
      currentRole,
      currentRoleConfig,
      isSwitcherOpen,
      openSwitcher: () => setIsSwitcherOpen(true),
      closeSwitcher: () => setIsSwitcherOpen(false),
      enterDemo,
      switchDemoRole,
      exitDemo,
    }),
    [enabled, isDemoActive, currentRole, currentRoleConfig, isSwitcherOpen, enterDemo, switchDemoRole, exitDemo]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};

export default DemoProvider;
