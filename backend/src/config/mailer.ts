import { Resend } from 'resend';
import { escapeHtml, sanitizeHeader, formatMessageToHtml } from '../utils/sanitize.js';

export interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip?: string;
  userAgent?: string;
}

export interface SendEmailResult {
  messageId: string;
}

let cachedResendClient: Resend | null = null;

/**
 * Returns an instance of the official Resend client.
 */
export function getResendClient(): Resend {
  if (cachedResendClient) {
    return cachedResendClient;
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      '[Resend Warning] RESEND_API_KEY is not configured in environment variables. Email delivery will be unavailable until configured.'
    );
  }

  cachedResendClient = new Resend(apiKey || '');
  return cachedResendClient;
}

/**
 * Formats and dispatches the visitor inquiry to the recipient email via the Resend API.
 */
export async function sendContactEmail(payload: EmailPayload): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY_MISSING');
  }

  const destinationEmail = process.env.CONTACT_RECEIVER || 'prateekmohanty2006@gmail.com';
  // Use testing sender or configured custom verified sender
  const sender = process.env.RESEND_SENDER || 'Portfolio Contact <onboarding@resend.dev>';

  const sanitizedName = sanitizeHeader(payload.name);
  const sanitizedSubject = sanitizeHeader(payload.subject);
  const sanitizedEmail = sanitizeHeader(payload.email);
  const formattedHtmlMessage = formatMessageToHtml(payload.message);

  const submissionDate = new Date();
  const formattedDateUTC = submissionDate.toUTCString();
  const formattedDateIST = submissionDate.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const mailSubject = `[Portfolio Contact] - ${sanitizedSubject}`;

  // Plain-text alternative fallback
  const textBody = `
NEW INQUIRY FROM PRATEEK MOHANTY'S PORTFOLIO
==================================================

Visitor Name : ${sanitizedName}
Visitor Email: ${sanitizedEmail}
Subject      : ${sanitizedSubject}
Date (IST)   : ${formattedDateIST}
Date (UTC)   : ${formattedDateUTC}

MESSAGE:
--------------------------------------------------
${payload.message.trim()}

--------------------------------------------------
Reply directly to this email or write to: ${sanitizedEmail}
Origin: https://prateek-mohanty.vercel.app/
  `.trim();

  // Premium, Responsive HTML Email Template (matching portfolio dark futuristic aesthetic)
  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(mailSubject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #08090D; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F5F5FA;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #08090D; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #0E111A; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #151824 0%, #1a1530 100%); border-bottom: 1px solid rgba(0, 217, 255, 0.2);">
              <div style="font-family: monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #00D9FF; margin-bottom: 6px;">
                ● // INCOMING PORTFOLIO INQUIRY
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #F5F5FA; letter-spacing: -0.02em;">
                Prateek Mohanty · Portfolio Dispatch
              </h1>
            </td>
          </tr>

          <!-- Meta Information Grid -->
          <tr>
            <td style="padding: 24px 32px 16px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #121520; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; padding: 16px;">
                <tr>
                  <td style="padding: 6px 12px; font-size: 12px; font-family: monospace; color: #9095A6; width: 110px;">FROM:</td>
                  <td style="padding: 6px 12px; font-size: 14px; font-weight: 600; color: #F5F5FA;">${escapeHtml(sanitizedName)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 12px; font-size: 12px; font-family: monospace; color: #9095A6;">EMAIL:</td>
                  <td style="padding: 6px 12px; font-size: 14px; font-family: monospace; color: #00D9FF;">
                    <a href="mailto:${escapeHtml(sanitizedEmail)}" style="color: #00D9FF; text-decoration: none;">${escapeHtml(sanitizedEmail)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 12px; font-size: 12px; font-family: monospace; color: #9095A6;">SUBJECT:</td>
                  <td style="padding: 6px 12px; font-size: 14px; color: #F5F5FA;">${escapeHtml(sanitizedSubject)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 12px; font-size: 12px; font-family: monospace; color: #9095A6;">TIMESTAMP:</td>
                  <td style="padding: 6px 12px; font-size: 12px; font-family: monospace; color: #A3A8B8;">${escapeHtml(formattedDateIST)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 8px 32px 24px 32px;">
              <div style="font-family: monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #9B5CFF; margin-bottom: 8px;">
                // TRANSMITTED MESSAGE
              </div>
              <div style="background-color: #151824; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; font-size: 14px; line-height: 1.65; color: #F5F5FA; word-break: break-word;">
                ${formattedHtmlMessage}
              </div>
            </td>
          </tr>

          <!-- Quick Reply Button -->
          <tr>
            <td style="padding: 0 32px 28px 32px;" align="center">
              <a href="mailto:${escapeHtml(sanitizedEmail)}?subject=${encodeURIComponent(`Re: [Portfolio Contact] - ${sanitizedSubject}`)}"
                 style="display: inline-block; background: linear-gradient(135deg, #9B5CFF 0%, #7B2CBF 100%); color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 8px; box-shadow: 0 4px 16px rgba(155, 92, 255, 0.4);">
                Reply to ${escapeHtml(sanitizedName)}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px; background-color: #0A0C13; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
              <p style="margin: 0; font-size: 11px; font-family: monospace; color: #5C6275;">
                Automated Portfolio Contact Relay · Delivered to private destination: ${escapeHtml(destinationEmail)}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const resend = getResendClient();

  const { data, error } = await resend.emails.send({
    from: sender,
    to: destinationEmail,
    replyTo: `${sanitizedName} <${sanitizedEmail}>`,
    subject: mailSubject,
    text: textBody,
    html: htmlBody
  });

  if (error) {
    // Log useful diagnostic error details without exposing API keys or visitor message content
    console.error('[Resend Delivery Error]:', {
      name: error.name,
      message: error.message
    });
    throw new Error(`RESEND_ERROR: ${error.message}`);
  }

  if (!data?.id) {
    throw new Error('RESEND_ERROR: No message ID returned from Resend API');
  }

  console.log(`[Resend Success]: Email accepted for delivery. Resend ID: ${data.id}`);
  return { messageId: data.id };
}
