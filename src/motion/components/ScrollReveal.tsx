import React, { useRef, type ReactNode } from 'react';
import { useScrollReveal, type ScrollRevealOptions } from '../core/gsap/useScrollReveal';

export interface ScrollRevealProps extends ScrollRevealOptions {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Declarative ScrollReveal Component
 * Applies GSAP ScrollTrigger to smoothly reveal content when scrolled into view.
 * Default: 20px upward movement, 550ms duration, once: true.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  as: Component = 'div',
  className,
  style,
  yOffset = 20,
  duration = 0.55,
  delay = 0,
  triggerHook = 'top 85%',
  once = true,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useScrollReveal(containerRef, {
    yOffset,
    duration,
    delay,
    triggerHook,
    once,
  });

  const Element = Component as any;

  return (
    <Element ref={containerRef} className={className} style={style}>
      {children}
    </Element>
  );
};

export default ScrollReveal;
