import { createContext, useContext } from 'react';
import type { DemoRole, DemoRoleConfig } from './demoTypes';

export interface DemoContextValue {
  isDemoModeEnabled: boolean;
  isDemoActive: boolean;
  currentRole: DemoRole | null;
  currentRoleConfig: DemoRoleConfig | null;
  isSwitcherOpen: boolean;
  openSwitcher: () => void;
  closeSwitcher: () => void;
  enterDemo: (role: DemoRole, targetPath?: string) => void;
  switchDemoRole: (role: DemoRole) => void;
  exitDemo: (redirectPath?: string) => void;
}

export const defaultDemoContextValue: DemoContextValue = {
  isDemoModeEnabled: true,
  isDemoActive: false,
  currentRole: null,
  currentRoleConfig: null,
  isSwitcherOpen: false,
  openSwitcher: () => {},
  closeSwitcher: () => {},
  enterDemo: () => {},
  switchDemoRole: () => {},
  exitDemo: () => {},
};

export const DemoContext = createContext<DemoContextValue>(defaultDemoContextValue);

export function useDemo(): DemoContextValue {
  return useContext(DemoContext);
}
