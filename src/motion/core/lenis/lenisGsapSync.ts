import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin safely (with jsdom / ssr guard)
if (typeof window !== 'undefined') {
  if (typeof window.matchMedia !== 'function') {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  }
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Synchronizes Lenis smooth scrolling with GSAP ScrollTrigger using a single,
 * unified animation frame loop. Prevents duplicate RAF loops and ensures
 * zero jitter or lag between smooth scroll position and scroll-triggered animations.
 */
export function synchronizeLenisWithGsap(lenis: Lenis): () => void {
  // Update GSAP ScrollTrigger on every Lenis scroll tick
  const onScroll = () => {
    ScrollTrigger.update();
  };
  lenis.on('scroll', onScroll);

  // Hook Lenis into GSAP's internal ticker to avoid multiple independent RAF loops
  const tickerCallback = (time: number) => {
    // GSAP ticker time is in seconds; Lenis expects milliseconds
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);

  // Turn off GSAP's lag smoothing to prevent visual stutter during tab focus switches
  gsap.ticker.lagSmoothing(0);

  // Recalculate ScrollTrigger measurements with Lenis active
  if (typeof window !== 'undefined') {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }

  // Cleanup handler
  return () => {
    lenis.off('scroll', onScroll);
    gsap.ticker.remove(tickerCallback);
  };
}
