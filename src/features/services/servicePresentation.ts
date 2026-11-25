import { Building2, Calculator, FileCheck2, FileText, Receipt, WalletCards } from 'lucide-react';
export function servicePresentation(name: string) {
  if (/gst/i.test(name)) return { Icon: Receipt, tone:'sage', description:'Explore GST registration requirements, fees and application support.' };
  if (/itr|income tax/i.test(name)) return { Icon: FileText, tone:'cream', description:'Get ready for income tax filing with clear requirements and professional assistance.' };
  if (/company|incorporation/i.test(name)) return { Icon: Building2, tone:'blue', description:'Take the next step for your business. Review registration details and required documents.' };
  if (/account|audit/i.test(name)) return { Icon: Calculator, tone:'sage', description:'Find professional support for business records, accounting and audit requirements.' };
  if (/cibil|credit/i.test(name)) return { Icon: WalletCards, tone:'cream', description:'Explore available credit-related assistance and review the service terms before applying.' };
  return { Icon: FileCheck2, tone:'blue', description:'Review the scope, required documents and fees, then apply through your account.' };
}
