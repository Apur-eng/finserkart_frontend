import type { HTMLAttributes } from 'react';
/** Unstyled semantic containers for existing operational screens. */
export function Surface(props: HTMLAttributes<HTMLDivElement>) { return <div {...props} />; }
export function Inline(props: HTMLAttributes<HTMLSpanElement>) { return <span {...props} />; }
