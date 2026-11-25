import React, { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { pageTransitionVariants } from '../core/variants/motionVariants';
import { useReducedMotion } from '../core/variants/useReducedMotion';

export interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Public Page Transition Component
 * Provides subtle fade and upward settling on route transitions.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children, className, style }) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
