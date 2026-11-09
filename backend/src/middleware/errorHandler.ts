import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * Centralized Error Handling Middleware
 * Guarantees that internal errors, stack traces, or credentials are never leaked to client requests.
 */
export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // 1. Zod Validation Errors
  if (err instanceof ZodError) {
    const errorMessages = err.errors.map((e) => e.message);
    res.status(400).json({
      success: false,
      message: errorMessages[0] || 'Invalid form submission.',
      errors: errorMessages
    });
    return;
  }

  // 2. Malformed JSON Body
  if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    res.status(400).json({
      success: false,
      message: 'Invalid JSON payload received.'
    });
    return;
  }

  // 3. Payload Too Large
  if (err.type === 'entity.too.large' || err.status === 413) {
    res.status(413).json({
      success: false,
      message: 'Payload exceeds the maximum allowed size.'
    });
    return;
  }

  // 4. Default Internal Server Error (Sanitized)
  console.error('[Backend Error Log]:', err?.message || err);
  
  res.status(500).json({
    success: false,
    message: 'An unexpected internal error occurred. Please try again or email directly.'
  });
}

