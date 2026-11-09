import { Router } from 'express';
import { handleContactSubmission } from '../controllers/contactController.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// POST /api/contact — protected by rate limiter and validation
router.post('/', contactRateLimiter, handleContactSubmission);

export default router;

