import { z } from 'zod';

/**
 * Strict validation schema for incoming contact form submissions.
 *
 * Validation Constraints:
 * - name: 2–80 characters, trimmed
 * - email: valid RFC 5322 email string, max 120 characters
 * - subject: 3–120 characters, trimmed
 * - message: 10–3000 characters, trimmed
 * - _gotcha: optional honeypot field (bots fill this in, humans do not)
 */
export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(80, { message: 'Name cannot exceed 80 characters' }),
  
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Please provide a valid email address' })
    .max(120, { message: 'Email address cannot exceed 120 characters' }),

  subject: z
    .string({ required_error: 'Subject is required' })
    .trim()
    .min(3, { message: 'Subject must be at least 3 characters long' })
    .max(120, { message: 'Subject cannot exceed 120 characters' }),

  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(3000, { message: 'Message cannot exceed 3000 characters' }),

  // Honeypot field: invisible in frontend. If bots fill this, backend rejects or drops silently.
  _gotcha: z.string().optional()
});

export type ContactInput = z.infer<typeof contactSchema>;

