/**
 * Backend configuration helper.
 * Reads VITE_API_BASE_URL without assuming legacy PHP endpoints.
 */

export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  const trimmed = (typeof envUrl === 'string' ? envUrl : '').trim();
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
}

export function isBackendConfigured(): boolean {
  return getApiBaseUrl().length > 0;
}
