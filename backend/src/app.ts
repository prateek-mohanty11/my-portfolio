import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { generalRateLimiter } from './middleware/rateLimiter.js';

export const app = express();

// 1. Trust Reverse Proxy (Essential for Render, Vercel, Railway, Fly.io, Cloudflare)
app.set('trust proxy', 1);

// 2. Helmet Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Not serving HTML directly
    crossOriginEmbedderPolicy: false
  })
);

// 3. CORS Configuration
// Allow configured frontend domains in production & localhost in development
const defaultOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'https://prateek-mohanty.vercel.app'
];

const envOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

app.use(
  cors({
    origin: (requestOrigin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!requestOrigin) return callback(null, true);

      if (
        allowedOrigins.includes(requestOrigin) ||
        process.env.NODE_ENV !== 'production' ||
        requestOrigin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${requestOrigin}`), false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // Cache preflight for 24 hours
  })
);

// 4. Request Body Parsers (10kb maximum payload to prevent DOS)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. Global General Rate Limiter
app.use(generalRateLimiter);

// 6. Health Check Endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 7. Mount Contact Route
app.use('/api/contact', contactRoutes);

// 8. Handle 404 for unknown endpoints
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found.'
  });
});

// 9. Centralized Error Handler
app.use(errorHandler);

