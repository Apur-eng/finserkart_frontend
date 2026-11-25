import type { Variants, Transition } from 'motion/react';

/**
 * Premium Cubic Bezier curves for Financial Platforms
 */
export const MOTION_EASE = {
  // Smooth deceleration for entrances
  outFluid: [0.16, 1, 0.3, 1] as [number, number, number, number],
  // Standard natural curve for hover/tap
  standard: [0.2, 0, 0, 1] as [number, number, number, number],
  // Soft exit curve
  inSoft: [0.4, 0, 1, 1] as [number, number, number, number],
};

/**
 * Standard Transitions
 */
export const standardTransition: Transition = {
  duration: 0.5,
  ease: MOTION_EASE.outFluid,
};

/**
 * Hero Section 5-Step Entrance Animation Sequence
 * Matches exact Finservkart requirements:
 * 1. Intro label appears (350–400ms)
 * 2. Main headline fades upward (500–650ms)
 * 3. Supporting description appears (400–500ms)
 * 4. Primary & secondary CTAs reveal (350–450ms)
 * 5. Illustration / feature card enters smoothly (550–650ms)
 * Stagger between items: 80–120ms (default: 100ms)
 */
export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 100ms stagger between steps
      delayChildren: 0.05,
    },
  },
};

export const heroLabelVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38, // 380ms
      ease: MOTION_EASE.outFluid,
    },
  },
};

export const heroHeadlineVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58, // 580ms (range: 500–650ms)
      ease: MOTION_EASE.outFluid,
    },
  },
};

export const heroDescriptionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45, // 450ms (range: 400–500ms)
      ease: MOTION_EASE.outFluid,
    },
  },
};

export const heroCtaVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // 400ms (range: 350–450ms)
      ease: MOTION_EASE.outFluid,
    },
  },
};

export const heroIllustrationVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6, // 600ms
      ease: MOTION_EASE.outFluid,
      delay: 0.15,
    },
  },
};

/**
 * General Fade-Up Variant for cards and items
 */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: MOTION_EASE.outFluid,
    },
  },
};

/**
 * Stagger Container for Card Grids
 */
export const staggerGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09, // 90ms stagger (range: 80–100ms)
    },
  },
};

/**
 * Public Page Route Transitions
 */
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: MOTION_EASE.outFluid,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: MOTION_EASE.inSoft,
    },
  },
};

/**
 * Modal & Drawer Dialog Transitions
 */
export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

export const modalDialogVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: MOTION_EASE.outFluid,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.2,
      ease: MOTION_EASE.inSoft,
    },
  },
};
