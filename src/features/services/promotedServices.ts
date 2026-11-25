import { Building2, ClipboardCheck, FileText, Receipt } from 'lucide-react';
import type { ServiceRecord } from '../../api/types';

const categories = [
  { pattern: /gst.*registration/i, Icon: Receipt },
  { pattern: /itr|income tax.*filing/i, Icon: FileText },
  { pattern: /company.*registration|incorporation/i, Icon: Building2 },
  { pattern: /tax audit|business compliance/i, Icon: ClipboardCheck },
];

// Select records from the existing catalogue; never fabricate a missing service.
export function selectPromotedServices(services: ServiceRecord[]) {
  const used = new Set<string>();
  return categories.flatMap(({ pattern, Icon }) => {
    const service = services.find(item => !used.has(item.id) && pattern.test(item.service_name));
    if (!service) return [];
    used.add(service.id);
    return [{ service, Icon }];
  });
}

