import { useEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger } from './gsapConfig';
import { useReducedMotion } from '../variants/useReducedMotion';

export interface ScrollRevealOptions {
  /**
   * Vertical movement in pixels.
   * Default: 20px (recommended range: 16–24px)
   */
  yOffset?: number;
  /**
   * Duration in seconds.
   * Default: 0.55s (recommended range: 450–650ms)
   */
  duration?: number;
  /**
   * Delay before animation starts in seconds.
   * Default: 0s
   */
  delay?: number;
  /**
   * ScrollTrigger viewport trigger position.
   * Default: 'top 85%'
   */
  triggerHook?: string;
  /**
   * If true, the reveal only animates once when first scrolled into view.
   * Prevents distracting replays on upward scrolls.
   * Default: true
   */
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  options: ScrollRevealOptions = {}
): void {
  const prefersReducedMotion = useReducedMotion();
  const {
    yOffset = 20,
    duration = 0.55,
    delay = 0,
    triggerHook = 'top 85%',
    once = true,
  } = options;

  useEffect(() => {
    const el = targetRef.current;
    if (!el || typeof window === 'undefined') return;

    // Accessibility check: immediately reveal without motion if reduced motion preferred
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: 'transform' });
      return;
    }

    // Set initial resting hidden state
    gsap.set(el, {
      opacity: 0,
      y: yOffset,
      willChange: 'transform, opacity',
    });

    // Create ScrollTrigger tween
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: triggerHook,
        once,
        onEnter: () => {
          // Remove willChange once complete to release GPU layer
          gsap.delayedCall(duration + delay, () => {
            gsap.set(el, { clearProps: 'willChange' });
          });
        },
      },
    });

    // Recalculate triggers
    ScrollTrigger.refresh();

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [targetRef, yOffset, duration, delay, triggerHook, once, prefersReducedMotion]);
}

export default useScrollReveal;
