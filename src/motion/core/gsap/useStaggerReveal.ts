import { useEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger } from './gsapConfig';
import { useReducedMotion } from '../variants/useReducedMotion';

export interface StaggerRevealOptions {
  /**
   * CSS selector for target child elements inside container.
   * Default: '> *' (direct children)
   */
  childSelector?: string;
  /**
   * Vertical movement in pixels.
   * Default: 20px (recommended range: 16–24px)
   */
  yOffset?: number;
  /**
   * Duration per element in seconds.
   * Default: 0.55s (recommended range: 450–650ms)
   */
  duration?: number;
  /**
   * Stagger delay between items in seconds.
   * Default: 0.09s (recommended range: 80–100ms)
   */
  stagger?: number;
  /**
   * Viewport trigger position.
   * Default: 'top 82%'
   */
  triggerHook?: string;
  /**
   * If true, triggers only once.
   * Default: true
   */
  once?: boolean;
}

export function useStaggerReveal<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  options: StaggerRevealOptions = {}
): void {
  const prefersReducedMotion = useReducedMotion();
  const {
    childSelector = '> *',
    yOffset = 20,
    duration = 0.55,
    stagger = 0.09,
    triggerHook = 'top 82%',
    once = true,
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    const selector = childSelector.startsWith('>') ? `:scope ${childSelector}` : childSelector;
    const items = childSelector === '> *'
      ? Array.from(container.children)
      : Array.from(container.querySelectorAll(selector));
    if (!items.length) return;

    // Accessibility fallback: show items immediately without delay or motion
    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0, clearProps: 'transform' });
      return;
    }

    // Set initial resting hidden state
    gsap.set(items, {
      opacity: 0,
      y: yOffset,
      willChange: 'transform, opacity',
    });

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: triggerHook,
        once,
        onEnter: () => {
          gsap.delayedCall(duration + items.length * stagger, () => {
            gsap.set(items, { clearProps: 'willChange' });
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
  }, [containerRef, childSelector, yOffset, duration, stagger, triggerHook, once, prefersReducedMotion]);
}

export default useStaggerReveal;
