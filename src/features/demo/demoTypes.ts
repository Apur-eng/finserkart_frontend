export type DemoRole = 'admin' | 'coordinator' | 'franchise' | 'agent' | 'ca' | 'customer';

export interface DemoRoleConfig {
  id: DemoRole;
  name: string;
  badge: string;
  description: string;
  dashboardPath: string;
  loginParam: string;
  iconName: 'ShieldCheck' | 'ClipboardCheck' | 'Building2' | 'Briefcase' | 'Scale' | 'User';
}

export interface DemoSession {
  role: DemoRole;
  startedAt: number;
}
