/**
 * HTML Sanitization and Text Cleaning Utilities
 * Prevents HTML injection, script execution, and header manipulation in email clients.
 */

const HTML_ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;'
};

/**
 * Escapes characters that have special meaning in HTML contexts.
 */
export function escapeHtml(input: string): string {
  if (!input) return '';
  return input.replace(/[&<>"'`/]/g, (match) => HTML_ENTITY_MAP[match] || match);
}

/**
 * Strips carriage returns and newlines from single-line headers (Name, Subject)
 * to prevent email header injection attacks (CRLF injection).
 */
export function sanitizeHeader(input: string): string {
  if (!input) return '';
  return input.replace(/[\r\n\t]/g, ' ').trim();
}

/**
 * Normalizes multi-line body text: converts linebreaks to <br/> while escaping HTML entities.
 */
export function formatMessageToHtml(rawMessage: string): string {
  const escaped = escapeHtml(rawMessage.trim());
  return escaped.replace(/\r?\n/g, '<br />');
}

