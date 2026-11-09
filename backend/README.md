# Portfolio Contact API Backend

Production-ready, secure email-delivery backend for **Prateek Mohanty's Personal Portfolio**.

Built with **Node.js, Express, TypeScript, Nodemailer, Zod, Helmet, CORS, and Express-Rate-Limit**.

---

## 1. Architecture Overview

- **Public Portfolio Email**: `prateekmohanty2006@gmail.com` (displayed on the portfolio website for direct manual contact and copying).
- **Private Contact-Form Destination**: `mohantyprateek777@gmail.com` (configured securely in backend environment variables as `CONTACT_RECEIVER`).
- **Endpoint**: `POST /api/contact`
- **Health Check**: `GET /api/health`

### Security Highlights
- **Helmet Security Headers**: Hardens HTTP response headers.
- **Strict CORS**: Restricted to your verified portfolio origins (`http://localhost:5173`, `https://prateek-mohanty.vercel.app`).
- **Rate Limiting**: Limits submissions to 5 per 15 minutes per IP to block spam floods.
- **Zod Validation**: Server-side length and RFC 5322 email syntax validation.
- **Honeypot Trap**: Invisible `_gotcha` field that silently traps automated spam bots without delivering junk mail.
- **HTML Sanitization**: Escapes user content to prevent HTML/script injection inside email clients.
- **No Sensitive Credential Leaks**: SMTP passwords, stack traces, and internal errors are never exposed in API responses or frontend client code.

---

## 2. Gmail SMTP Setup (Step-by-Step for Prateek)

Google requires an **App Password** for automated SMTP sending (standard Gmail passwords are not accepted).

### Step 1: Open Google Security
1. Go to your Google Account Security settings:
   👉 **https://myaccount.google.com/security**

### Step 2: Enable 2-Step Verification
1. Under **"How you sign in to Google"**, verify that **2-Step Verification** is turned **ON**.
2. If it is off, follow Google's prompt to enable it with your phone number or authenticator.

### Step 3: Generate a Google App Password
1. In the search bar at the top of your Google Account page, type **"App passwords"** (or navigate to https://myaccount.google.com/apppasswords).
2. For **App Name**, enter: `Portfolio Contact Form`
3. Click **Create**.
4. Google will display a **16-character password** (e.g. `abcd efgh ijkl mnop`).
5. Copy this 16-character code (you will not be able to see it again).

### Step 4: Configure `backend/.env`
1. Inside the `backend/` directory, create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
2. Set your credentials:
   ```env
   PORT=5000
   NODE_ENV=development

   FRONTEND_URL=http://localhost:5173,https://prateek-mohanty.vercel.app

   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true

   # The Gmail account you use to send emails:
   SMTP_USER=your-email@gmail.com

   # The 16-character App Password generated in Step 3 (remove spaces):
   SMTP_APP_PASSWORD=abcdefghijklmnop

   # Where visitor messages should be delivered:
   CONTACT_RECEIVER=mohantyprateek777@gmail.com
   ```

> **NEVER COMMIT `.env` TO GIT.** Both root `.gitignore` and `backend/.gitignore` are already configured to keep `.env` private.

---

## 3. Local Installation & Development

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start Backend in Development Mode
```bash
npm run dev
```
The server will start at `http://localhost:5000` with hot-reloading powered by `tsx`.

### 3. Verify Health
Open in your browser or run:
```bash
curl http://localhost:5000/api/health
```
Expected output:
```json
{
  "status": "ok",
  "timestamp": "2026-11-09T...",
  "uptime": 1.2
}
```

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 4. Deploying the Backend for Free (Render.com)

Render provides a free Web Service tier ideal for Node.js Express APIs.

### Steps to Deploy on Render:
1. Push your repository to GitHub.
2. Sign in to [Render.com](https://render.com/) with GitHub.
3. Click **New +** &rarr; **Web Service**.
4. Select your `my-portfolio` repository.
5. Configure the service settings:
   - **Name**: `prateek-portfolio-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
6. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `FRONTEND_URL` = `https://prateek-mohanty.vercel.app`
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `465`
   - `SMTP_SECURE` = `true`
   - `SMTP_USER` = your Gmail address
   - `SMTP_APP_PASSWORD` = your 16-character Google App Password
   - `CONTACT_RECEIVER` = `mohantyprateek777@gmail.com`
7. Click **Create Web Service**.
8. Once deployed, Render will provide a public URL like:
   `https://prateek-portfolio-api.onrender.com`

---

## 5. Connecting Frontend on Vercel

In your Vercel Dashboard for `prateek-mohanty`:
1. Go to **Settings** &rarr; **Environment Variables**.
2. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://prateek-portfolio-api.onrender.com` (your deployed Render URL, no trailing slash)
3. Redeploy the latest commit on Vercel.

Your portfolio contact form will now securely transmit visitor submissions straight to `mohantyprateek777@gmail.com`!

