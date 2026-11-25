import React, { type ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  heroContainerVariants,
  heroDescriptionVariants,
  heroHeadlineVariants,
  heroIllustrationVariants,
  heroLabelVariants,
  heroCtaVariants,
} from '../core/variants/motionVariants';
import { useReducedMotion } from '../core/variants/useReducedMotion';

export interface HeroEntranceProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable Hero Entrance Wrapper
 * Orchestrates the 5-step entrance sequence:
 * Step 1: Introductory Label
 * Step 2: Main Headline (500–650ms)
 * Step 3: Supporting Description (400–500ms)
 * Step 4: Primary & Secondary CTAs (350–450ms)
 * Step 5: Product / Tracking Illustration (550–650ms)
 * Stagger between items: 100ms
 */
export function HeroEntranceRoot({ children, className, style }: HeroEntranceProps) {
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
      initial="hidden"
      animate="visible"
      variants={heroContainerVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function HeroLabel({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div variants={heroLabelVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}

export function HeroHeadline({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div variants={heroHeadlineVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}

export function HeroDescription({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div variants={heroDescriptionVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}

export function HeroActions({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div variants={heroCtaVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}

export function HeroIllustration({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div variants={heroIllustrationVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}

export const HeroEntrance = Object.assign(HeroEntranceRoot, {
  Label: HeroLabel,
  Headline: HeroHeadline,
  Description: HeroDescription,
  Actions: HeroActions,
  Illustration: HeroIllustration,
});

export default HeroEntrance;
