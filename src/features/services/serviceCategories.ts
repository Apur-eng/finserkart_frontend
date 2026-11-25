export const SERVICE_CATEGORIES = [
  'Business registration',
  'Tax & compliance',
  'Finance & accounting',
] as const;

export function serviceCategory(serviceName: string): string {
  const name = serviceName.toLowerCase();
  if (/company registration|trust|ngo|huf|incorporation|llp/.test(name)) return 'Business registration';
  if (/gst|itr|tax|audit|labour|compliance|shop act/.test(name)) return 'Tax & compliance';
  return 'Finance & accounting';
}
