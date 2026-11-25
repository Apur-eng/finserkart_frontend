import React, { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { synchronizeLenisWithGsap } from './lenisGsapSync';
import { useReducedMotion } from '../variants/useReducedMotion';

interface LenisContextValue {
  lenis: Lenis | null;
  isSmoothEnabled: boolean;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; immediate?: boolean; duration?: number }) => void;
}

const defaultContext: LenisContextValue = {
  lenis: null,
  isSmoothEnabled: false,
  scrollTo: () => {},
};

export const LenisContext = createContext<LenisContextValue>(defaultContext);

export interface LenisProviderProps {
  children: ReactNode;
  /**
   * Optional manual override for reduced motion (e.g. for user toggle in accessibility menu).
   */
  forceDisableSmooth?: boolean;
}

/**
 * Returns true if the pathname corresponds to an authenticated portal dashboard.
 * Dashboards are strictly exempted from Lenis smooth scrolling to preserve native data-table scrolling,
 * keyboard accessibility, and immediate zero-latency interaction.
 */
export function isDashboardRoute(pathname: string): boolean {
  return /^\/(customer|admin|coordinator|franchise|agent|ca)(\/|$)/.test(pathname);
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children, forceDisableSmooth = false }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const cleanupSyncRef = useRef<(() => void) | null>(null);

  const isDashboard = isDashboardRoute(location.pathname);
  const shouldEnableSmooth = !prefersReducedMotion && !forceDisableSmooth && !isDashboard;

  useEffect(() => {
    // If smooth scrolling should not be active (e.g. on dashboard or when reduced motion is requested)
    if (!shouldEnableSmooth) {
      if (lenisInstance) {
        if (cleanupSyncRef.current) {
          cleanupSyncRef.current();
          cleanupSyncRef.current = null;
        }
        lenisInstance.destroy();
        setLenisInstance(null);
      }
      return;
    }

    // Polyfill ResizeObserver for JSDOM / headless testing environments if missing
    if (typeof window !== 'undefined' && typeof window.ResizeObserver === 'undefined') {
      (window as unknown as { ResizeObserver: unknown }).ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
      };
    }

    // Initialize Lenis with weighted, smoothly decelerating settings tailored for financial platforms
    const lenis = new Lenis({
      duration: 1.1, // Controlled duration; avoids delayed sluggishness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Natural exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.25,
      infinite: false,
    });

    setLenisInstance(lenis);

    // Synchronize single RAF with GSAP ScrollTrigger
    const unbindGsap = synchronizeLenisWithGsap(lenis);
    cleanupSyncRef.current = unbindGsap;

    return () => {
      if (cleanupSyncRef.current) {
        cleanupSyncRef.current();
        cleanupSyncRef.current = null;
      }
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [shouldEnableSmooth]);

  // Handle route changes: scroll to top smoothly on public navigation if page didn't remember state
  useEffect(() => {
    if (lenisInstance && !isDashboard) {
      lenisInstance.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, lenisInstance, isDashboard]);

  const scrollTo = (target: string | number | HTMLElement, options?: { offset?: number; immediate?: boolean; duration?: number }) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, options);
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
      }
    }
  };

  return (
    <LenisContext.Provider
      value={{
        lenis: lenisInstance,
        isSmoothEnabled: shouldEnableSmooth,
        scrollTo,
      }}
    >
      {children}
    </LenisContext.Provider>
  );
};

export function useLenis(): LenisContextValue {
  return useContext(LenisContext);
}

export default LenisProvider;
