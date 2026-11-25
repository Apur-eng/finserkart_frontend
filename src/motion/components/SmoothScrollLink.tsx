import React, { type ReactNode } from 'react';
import { useLenis } from '../core/lenis/LenisProvider';

export interface SmoothScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string; // Target ID or selector (e.g. "#services")
  offset?: number;
  duration?: number;
  children: ReactNode;
  className?: string;
}

/**
 * SmoothScrollLink
 * Intercepts in-page anchor clicks and executes a weighted, smooth scroll via Lenis.
 */
export const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({
  to,
  offset = -80, // Default header clearance
  duration,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const { scrollTo, isSmoothEnabled } = useLenis();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (to.startsWith('#')) {
      e.preventDefault();
      if (isSmoothEnabled) {
        scrollTo(to, { offset, duration });
      } else {
        const target = document.querySelector(to);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    if (onClick) onClick(e);
  };

  return (
    <a href={to} onClick={handleClick} className={`fsk-motion-focus-visible ${className}`} {...props}>
      {children}
    </a>
  );
};

export default SmoothScrollLink;
