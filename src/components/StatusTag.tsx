import type { HTMLAttributes, ReactNode } from 'react';
const tones: Record<string, string> = { green: 'success', red: 'error', orange: 'warning', yellow: 'warning', neutral: 'neutral' };
export function StatusTag({ label, variant = 'neutral', icon, className = '', ...props }: HTMLAttributes<HTMLSpanElement> & { label: ReactNode; variant?: string; icon?: ReactNode }) {
  return <span {...props} className={`status-tag status-${tones[variant] ?? 'info'} ${className}`}>{icon}{label}</span>;
}
