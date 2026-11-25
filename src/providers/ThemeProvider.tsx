import type { ReactNode } from 'react';
/** Stable application/test boundary; appearance is now ordinary CSS. */
export function ThemeProvider({ children }: { children: ReactNode; mode?: 'light' | 'dark' | 'system' }) { return <>{children}</>; }
export default ThemeProvider;
