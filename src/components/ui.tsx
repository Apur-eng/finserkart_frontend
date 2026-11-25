import { createElement, useEffect, useId, useRef, type ButtonHTMLAttributes, type CSSProperties, type HTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';

type Space = number | string;
export interface LayoutProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'article' | 'header' | 'nav' | 'main' | 'form' | 'span';
  gap?: Space; padding?: Space; paddingInline?: Space; paddingBlock?: Space; paddingBlockStart?: Space;
  width?: CSSProperties['width']; maxWidth?: CSSProperties['maxWidth']; height?: CSSProperties['height']; minHeight?: CSSProperties['minHeight'];
  hAlign?: 'start' | 'center' | 'end' | 'between'; vAlign?: 'start' | 'center' | 'end' | 'stretch'; wrap?: CSSProperties['flexWrap'];
}
const space = (value?: Space) => typeof value === 'number' ? `${value * .25}rem` : value;
const align = (value?: string) => value === 'between' ? 'space-between' : value === 'start' ? 'flex-start' : value === 'end' ? 'flex-end' : value;
function Layout({ as = 'div', gap, padding, paddingInline, paddingBlock, paddingBlockStart, width, maxWidth, height, minHeight, hAlign, vAlign, wrap, style, className = '', direction, ...props }: LayoutProps & { direction: 'row' | 'column' }) {
  return createElement(as, { ...props, className: `ui-layout ${className}`, style: { display: 'flex', flexDirection: direction, minWidth: 0, gap: space(gap), padding: space(padding), paddingInline: space(paddingInline), paddingBlock: space(paddingBlock), paddingBlockStart: space(paddingBlockStart), width, maxWidth, height, minHeight, flexWrap: wrap, justifyContent: align(direction === 'row' ? hAlign : vAlign), alignItems: align(direction === 'row' ? vAlign : hAlign), ...style } });
}
export function Stack(props: LayoutProps) { return <Layout {...props} direction="column" />; }
export function Row(props: LayoutProps) { return <Layout {...props} direction="row" />; }
export function ResponsiveGrid({ columns, gap = 4, align: vertical, style, ...props }: LayoutProps & { columns: { minWidth: number; max: number }; align?: CSSProperties['alignItems'] }) {
  return <div {...props} style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, max(${columns.minWidth}px, calc((100% - ${(columns.max - 1) * Number(gap) * .25}rem) / ${columns.max}))), 1fr))`, gap: space(gap), alignItems: vertical, ...style }} />;
}
export function Panel({ elevation: _elevation, className = '', ...props }: LayoutProps & { elevation?: string }) { return <Stack {...props} className={`ui-panel ${className}`} />; }
export function Title({ level = 2, type: _type, weight: _weight, textWrap, justify, style, ...props }: HTMLAttributes<HTMLHeadingElement> & { level?: 1 | 2 | 3 | 4 | 5 | 6; type?: string; weight?: string; textWrap?: CSSProperties['textWrap']; justify?: CSSProperties['textAlign'] }) { return createElement(`h${level}`, { ...props, style: { textWrap, textAlign: justify, ...style } }); }
export function Typography({ as = 'span', size, type, weight, color, hasTabularNumbers, justify, className = '', style, ...props }: HTMLAttributes<HTMLElement> & { as?: 'span' | 'p'; size?: string; type?: string; weight?: string; color?: string; hasTabularNumbers?: boolean; justify?: CSSProperties['textAlign'] }) {
  return createElement(as, { ...props, className: `ui-text ${type === 'supporting' ? 'ui-text-muted' : ''} ${className}`, style: { fontSize: size === 'xl' ? '1.25rem' : size === 'sm' || size === 'xsm' ? '.875rem' : undefined, fontWeight: weight === 'bold' ? 700 : weight === 'medium' || type === 'label' ? 600 : undefined, color: color === 'accent' ? 'var(--blue)' : color === 'secondary' ? 'var(--muted)' : color, fontVariantNumeric: hasTabularNumbers ? 'tabular-nums' : undefined, textAlign: justify, ...style } });
}
export function ActionButton({ label, icon, endContent, variant = 'primary', size = 'md', isDisabled, isLoading, width, className = '', style, children, disabled, type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label?: ReactNode; icon?: ReactNode; endContent?: ReactNode; variant?: string; size?: string; isDisabled?: boolean; isLoading?: boolean; width?: CSSProperties['width'] }) {
  return <button {...props} type={type} disabled={disabled || isDisabled || isLoading} aria-busy={isLoading || undefined} className={`button button-${variant} button-${size} ${className}`} style={{ width, ...style }}>{isLoading ? <LoadingIndicator /> : icon}{label ?? children}{endContent}</button>;
}
type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> & { label: string; onChange?: (value: string) => void; isLabelHidden?: boolean; isRequired?: boolean; hasClear?: boolean; startIcon?: ReactNode; width?: CSSProperties['width']; size?: string };
export function Field({ label, onChange, isLabelHidden, isRequired, hasClear, startIcon, width, size: _size, id, className = '', value, required, ...props }: FieldProps) {
  const generated = useId(); const inputId = id ?? generated;
  return <div className={`ui-field ${className}`} style={{ width }}><label htmlFor={inputId} className={isLabelHidden ? 'sr-only' : ''}>{label}{(required || isRequired) && <span aria-hidden="true"> *</span>}</label><div className="ui-input-wrap">{startIcon && <span className="ui-input-icon" aria-hidden="true">{startIcon}</span>}<input {...props} id={inputId} value={value} required={required || isRequired} onChange={event => onChange?.(event.target.value)} />{hasClear && value !== '' && value != null && <button type="button" className="input-clear" aria-label={`Clear ${label}`} onClick={() => onChange?.('')}>×</button>}</div></div>;
}
export function MultilineField({ label, onChange, isRequired, width, id, ...props }: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & { label: string; onChange?: (value: string) => void; isRequired?: boolean; width?: CSSProperties['width'] }) {
  const generated = useId(); const inputId = id ?? generated;
  return <div className="ui-field" style={{ width }}><label htmlFor={inputId}>{label}{isRequired && ' *'}</label><textarea {...props} id={inputId} required={isRequired || props.required} onChange={event => onChange?.(event.target.value)} /></div>;
}
export function Notice({ status = 'info', title, description, children, isDismissable, onDismiss }: { status?: string; title: string; description?: ReactNode; children?: ReactNode; isDismissable?: boolean; onDismiss?: () => void }) { return <div className={`ui-notice notice-${status}`} role={status === 'error' ? 'alert' : 'status'}><strong>{title}</strong>{description && <p>{description}</p>}{children}{isDismissable && <ActionButton label="Dismiss" variant="ghost" onClick={onDismiss} />}</div>; }
export function LoadingIndicator() { return <span role="status" className="loading-indicator"><span className="sr-only">Loading</span></span>; }
export function EmptyState({ title, description, icon, actions }: { title: string; description?: ReactNode; icon?: ReactNode; actions?: ReactNode }) { return <section className="empty-state">{icon}<h2>{title}</h2><p>{description}</p>{actions}</section>; }
export function Divider() { return <hr />; }
export function SidePanel({ isOpen, onOpenChange, label, children, side = 'end', width = 340, padding = 4 }: { isOpen: boolean; onOpenChange: (open: boolean) => void; label: string; children: ReactNode; side?: 'start' | 'end'; width?: number; padding?: number }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current; if (!dialog || !isOpen) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal(); document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = overflow; if (previous instanceof HTMLElement && previous.isConnected) previous.focus(); };
  }, [isOpen]);
  return <dialog ref={ref} className={`side-panel side-panel-${side}`} aria-label={label} style={{ width, padding: space(padding) }} onCancel={event => { event.preventDefault(); onOpenChange(false); }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onOpenChange(false); } }}>{isOpen && children}</dialog>;
}
