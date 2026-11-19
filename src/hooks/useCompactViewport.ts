import { useSyncExternalStore } from 'react';

const query = '(max-width: 1023px)';
const subscribe = (listener: () => void) => {
  if (!window.matchMedia) return () => {};
  const media = window.matchMedia(query);
  media.addEventListener('change', listener);
  return () => media.removeEventListener('change', listener);
};
export function useCompactViewport() {
  return useSyncExternalStore(subscribe, () => window.matchMedia?.(query).matches ?? false, () => false);
}
