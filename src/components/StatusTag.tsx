import { Badge, type BadgeProps } from '@astryxdesign/core/Badge';
import { Text } from '@astryxdesign/core/Text';
import { Inline } from './Surface';

const tones: Record<string, string> = { green: 'success', red: 'error', orange: 'warning', yellow: 'warning' };
export function StatusTag({ label, variant = 'neutral', icon, style, ref: _ref, xstyle: _xstyle, ...props }: BadgeProps) {
  if (typeof label === 'number' || (typeof label === 'string' && /^\d+\+?$/.test(label))) {
    return <Badge label={label} variant={variant} icon={icon} style={style} {...props} />;
  }
  const tone = tones[variant] ?? 'info';
  return <Inline {...props} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-1)',
    padding: 'var(--spacing-1) var(--spacing-2)', borderRadius: 'var(--radius-element)',
    color: `var(--color-fsk-${tone})`, background: `var(--color-fsk-${tone}-subtle)`, ...style }}>
    {icon}<Text type="supporting" color="inherit" weight="medium">{label}</Text>
  </Inline>;
}
