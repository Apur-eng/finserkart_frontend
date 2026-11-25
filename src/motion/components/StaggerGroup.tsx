import React, { useRef, type ReactNode } from 'react';
import { useStaggerReveal, type StaggerRevealOptions } from '../core/gsap/useStaggerReveal';

export interface StaggerGroupProps extends StaggerRevealOptions {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Declarative StaggerGroup Component
 * Applies GSAP ScrollTrigger to stagger reveals of children (service cards, metrics, steps).
 * Default: 20px upward movement, 550ms duration, 90ms stagger, once: true.
 */
export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  as: Component = 'div',
  className,
  style,
  childSelector = '> *',
  yOffset = 20,
  duration = 0.55,
  stagger = 0.09,
  triggerHook = 'top 82%',
  once = true,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useStaggerReveal(containerRef, {
    childSelector,
    yOffset,
    duration,
    stagger,
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

export default StaggerGroup;
