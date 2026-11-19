import type { DemoRole, DemoRoleConfig, DemoSession } from './demoTypes';

export const DEMO_ROLES: Record<DemoRole, DemoRoleConfig> = {
  admin: {
    id: 'admin',
    name: 'Main Admin',
    badge: 'Enterprise Platform',
    description: 'Manage users, services, applications, and platform operations.',
    dashboardPath: '/admin',
    loginParam: 'admin',
    iconName: 'ShieldCheck',
  },
  coordinator: {
    id: 'coordinator',
    name: 'Operations Coordinator',
    badge: 'Operations Desk',
    description: 'Monitor service requests and coordinate operational activities.',
    dashboardPath: '/coordinator',
    loginParam: 'coordinator',
    iconName: 'ClipboardCheck',
  },
  franchise: {
    id: 'franchise',
    name: 'Franchise',
    badge: 'Regional Network',
    description: 'Manage agent networks and review performance.',
    dashboardPath: '/franchise',
    loginParam: 'franchise',
    iconName: 'Building2',
  },
  agent: {
    id: 'agent',
    name: 'Agent',
    badge: 'Partner Network',
    description: 'Manage customers, applications, and earnings.',
    dashboardPath: '/agent',
    loginParam: 'agent',
    iconName: 'Briefcase',
  },
  ca: {
    id: 'ca',
    name: 'Chartered Accountant',
    badge: 'Regulatory Desk',
    description: 'Review assigned applications and manage service fulfilment.',
    dashboardPath: '/ca',
    loginParam: 'ca',
    iconName: 'Scale',
  },
  customer: {
    id: 'customer',
    name: 'Customer',
    badge: 'Client Portal',
    description: 'Track services, applications, and documents.',
    dashboardPath: '/customer',
    loginParam: 'customer',
    iconName: 'User',
  },
};

export const DEMO_ROLES_LIST: DemoRoleConfig[] = [
  DEMO_ROLES.admin,
  DEMO_ROLES.coordinator,
  DEMO_ROLES.franchise,
  DEMO_ROLES.agent,
  DEMO_ROLES.ca,
  DEMO_ROLES.customer,
];

export const DEMO_STORAGE_KEY = 'finservkart_demo_session';

/**
 * Checks whether demo mode is enabled via environment variable VITE_DEMO_MODE.
 * Defaults to true for client demo previews on Vercel unless explicitly disabled with 'false'.
 */
export function isDemoModeEnabled(): boolean {
  const envVal = import.meta.env.VITE_DEMO_MODE;
  if (typeof envVal === 'string') {
    return envVal.trim().toLowerCase() !== 'false';
  }
  return true;
}

/**
 * Retrieves the active demo session from sessionStorage.
 * Returns null if demo mode is disabled or if no valid session exists.
 */
export function getStoredDemoSession(): DemoSession | null {
  if (!isDemoModeEnabled()) return null;
  if (typeof window === 'undefined' || !window.sessionStorage) return null;

  try {
    const raw = window.sessionStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DemoSession>;
    if (parsed && parsed.role && DEMO_ROLES[parsed.role as DemoRole]) {
      return {
        role: parsed.role as DemoRole,
        startedAt: typeof parsed.startedAt === 'number' ? parsed.startedAt : Date.now(),
      };
    }
  } catch {
    // Malformed JSON or storage security restriction
  }
  return null;
}

/**
 * Stores a demo session in sessionStorage.
 */
export function storeDemoSession(role: DemoRole): DemoSession | null {
  if (!isDemoModeEnabled()) return null;
  if (typeof window === 'undefined' || !window.sessionStorage) return null;

  const session: DemoSession = {
    role,
    startedAt: Date.now(),
  };

  try {
    window.sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Storage quota or restriction
  }
  return session;
}

/**
 * Clears the active demo session from sessionStorage.
 */
export function removeDemoSession(): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    window.sessionStorage.removeItem(DEMO_STORAGE_KEY);
  } catch {
    // ignore
  }
}
