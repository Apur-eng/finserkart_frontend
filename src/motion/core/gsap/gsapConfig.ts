import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

// Global defaults for financial services UI: subtle, stable, professional
gsap.defaults({
  ease: 'power2.out',
  duration: 0.55,
});

export { gsap, ScrollTrigger };
