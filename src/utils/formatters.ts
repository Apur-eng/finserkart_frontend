/**
 * Utility functions for Finservkart formatting & code generators
 */

export function formatCurrency(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}

export function parseDocuments(docString: string): string[] {
  if (!docString) return [];
  return docString
    .split(/\r?\n/)
    .map((d) => d.trim())
    .filter((d) => d.length > 0);
}

export function parseTerms(termsString: string): string[] {
  if (!termsString) return [];
  return termsString
    .split('/')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

/**
 * Generates customer ID in exact existing format: CID-{4-digit-random}
 */
export function generateCustomerId(): string {
  const ran = Math.floor(1000 + Math.random() * 9000);
  return `CID-${ran}`;
}

/**
 * Generates tracking order PID in exact existing format: FSK{YY}{Letter}{Number}
 */
export function generateOrderId(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const randomNumber = Math.floor(10 + Math.random() * 90);
  return `FSK${year}${randomLetter}${randomNumber}`;
}
