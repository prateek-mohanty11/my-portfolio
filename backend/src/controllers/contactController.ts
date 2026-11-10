import type { Request, Response, NextFunction } from 'express';
import { contactSchema } from '../validators/contactSchema.js';
import { sendContactEmail } from '../config/mailer.js';

/**
 * Handles POST /api/contact
 */
export async function handleContactSubmission(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // 1. Strict schema validation
    const parsedData = contactSchema.parse(req.body);

    // 2. Honeypot Bot Detection
    // The '_gotcha' field is hidden via CSS in the frontend. Normal users will never fill it.
    // If a bot fills it, silently return success without sending an email.
    if (parsedData._gotcha && parsedData._gotcha.trim().length > 0) {
      console.warn('[Honeypot Triggered] Dropped spam submission from bot.');
      res.status(200).json({
        success: true,
        message: "Your message has been sent successfully. I'll get back to you soon."
      });
      return;
    }

    // 3. Dispatch email via Resend Email API
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    try {
      await sendContactEmail({
        name: parsedData.name,
        email: parsedData.email,
        subject: parsedData.subject,
        message: parsedData.message,
        ip: clientIp,
        userAgent
      });

      res.status(200).json({
        success: true,
        message: "Your message has been sent successfully. I'll get back to you soon."
      });
    } catch (emailError: any) {
      const errorMsg = emailError?.message || '';

      if (errorMsg === 'RESEND_API_KEY_MISSING' || !process.env.RESEND_API_KEY) {
        res.status(503).json({
          success: false,
          message:
            'Email delivery service is currently awaiting Resend configuration. Please configure RESEND_API_KEY, or email directly.'
        });
        return;
      }

      // Safe production error response without leaking API keys or message contents
      res.status(500).json({
        success: false,
        message:
          'Unable to deliver email at this moment due to a mail service issue. Please try again shortly or email directly.'
      });
    }
  } catch (err) {
    next(err);
  }
}
