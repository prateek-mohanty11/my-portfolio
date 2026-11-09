import rateLimit from 'express-rate-limit';

/**
 * Rate Limiter for Contact Form Submissions
 * Restricts each client IP to 5 submissions every 15 minutes to prevent spam attacks.
 */
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 submissions per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many contact inquiries received from this network. Please wait 15 minutes before trying again.'
  },
  statusCode: 429
});

/**
 * General API Rate Limiter
 * Broad limit for health check and general API traffic: 60 requests per minute.
 */
export const generalRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
  standardHeaders: true,
  legacyHeaders: false
});

