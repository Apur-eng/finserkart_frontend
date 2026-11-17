import { useQuery } from '@tanstack/react-query';
import api from '../../api/client';
import type { ServiceRecord } from '../../api/types';

export function useServices(term?: string) {
  return useQuery<ServiceRecord[], Error>({
    queryKey: ['services', term || ''],
    queryFn: () => api.searchServices(term),
  });
}

export function useService(id?: string) {
  return useQuery<ServiceRecord | null, Error>({
    queryKey: ['service', id],
    queryFn: () => (id ? api.getServiceById(id) : Promise.resolve(null)),
    enabled: Boolean(id),
  });
}

