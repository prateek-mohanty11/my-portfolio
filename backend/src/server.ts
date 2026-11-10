import dotenv from 'dotenv';

// Load environment variables before anything else
dotenv.config();

import { app } from './app.js';

const PORT = parseInt(process.env.PORT || '5000', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`
======================================================
  Portfolio Contact API Server Active
======================================================
  Environment : ${NODE_ENV}
  Port        : ${PORT}
  Health Check: http://localhost:${PORT}/api/health
  Contact API : http://localhost:${PORT}/api/contact
  Provider    : Resend Email API
  Receiver    : ${process.env.CONTACT_RECEIVER || 'prateekmohanty2006@gmail.com'}
======================================================
  `);
});

// Graceful Shutdown Handling
const handleTermination = (signal: string) => {
  console.log(`Received ${signal}. Gracefully terminating server...`);
  server.close(() => {
    console.log('HTTP server closed cleanly.');
    process.exit(0);
  });
};

process.on('SIGINT', () => handleTermination('SIGINT'));
process.on('SIGTERM', () => handleTermination('SIGTERM'));

