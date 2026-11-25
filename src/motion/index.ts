/**
 * Finservkart Premium Motion & Smooth Scroll System
 * Public API
 */

// Styles
import './styles/motion.css';

// Lenis Core
export { LenisProvider, useLenis, LenisContext, isDashboardRoute } from './core/lenis/LenisProvider';
export { synchronizeLenisWithGsap } from './core/lenis/lenisGsapSync';

// GSAP Core
export { gsap, ScrollTrigger } from './core/gsap/gsapConfig';
export { useScrollReveal, type ScrollRevealOptions } from './core/gsap/useScrollReveal';
export { useStaggerReveal, type StaggerRevealOptions } from './core/gsap/useStaggerReveal';

// Motion Variants & Hooks
export {
  MOTION_EASE,
  heroContainerVariants,
  heroLabelVariants,
  heroHeadlineVariants,
  heroDescriptionVariants,
  heroCtaVariants,
  heroIllustrationVariants,
  fadeUpVariants,
  staggerGridVariants,
  pageTransitionVariants,
  modalBackdropVariants,
  modalDialogVariants,
  standardTransition,
} from './core/variants/motionVariants';
export { useReducedMotion } from './core/variants/useReducedMotion';

// Components
export { HeroEntrance } from './components/HeroEntrance';
export { ScrollReveal, type ScrollRevealProps } from './components/ScrollReveal';
export { StaggerGroup, type StaggerGroupProps } from './components/StaggerGroup';
export { PageTransition, type PageTransitionProps } from './components/PageTransition';
export { InteractiveCard, type InteractiveCardProps } from './components/InteractiveCard';
export { SmoothScrollLink, type SmoothScrollLinkProps } from './components/SmoothScrollLink';
