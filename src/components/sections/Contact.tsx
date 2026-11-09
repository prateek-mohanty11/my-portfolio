import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Code2, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { profileData } from '../../data/profile';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [gotcha, setGotcha] = useState(''); // Invisible Honeypot field for spam prevention
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopied(true);

    // Cyberpunk-colored celebratory confetti burst
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00D9FF', '#9B5CFF', '#F5F5FA']
    });

    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    // 1. Client-side input validation
    if (name.trim().length < 2) {
      setErrorMessage('Please provide a name with at least 2 characters.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (subject.trim().length < 3) {
      setErrorMessage('Please provide a subject with at least 3 characters.');
      return;
    }

    if (message.trim().length < 10) {
      setErrorMessage('Message must be at least 10 characters long.');
      return;
    }

    setIsSubmitting(true);

    // 2. Resolve backend API base URL from Vite environment variable
    const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          _gotcha: gotcha.trim()
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        // Success state: display confirmation, trigger celebratory confetti, and clear form
        setSuccessMessage("Your message has been sent successfully. I'll get back to you soon.");
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setGotcha('');

        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#00D9FF', '#9B5CFF', '#10B981']
        });
      } else {
        // Error response from backend: preserve inputs for retry
        const serverError =
          data?.message ||
          (response.status === 429
            ? 'Too many messages sent. Please wait a few minutes before trying again.'
            : 'Unable to deliver message at this time. Please try again or email directly.');
        setErrorMessage(serverError);
      }
    } catch (networkError: any) {
      // Backend unavailable or network failure: preserve inputs for retry
      setErrorMessage(
        `Unable to reach the contact delivery service. If the backend is starting up, please wait a moment and retry, or write directly to ${profileData.contact.email}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-[#08090D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-t from-[#9B5CFF]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <SectionHeading
          eyebrow="08 // INITIATE COLLABORATION"
          title="Have an interesting idea? Let's build something."
          subtitle="I'm always interested in exploring new technologies, collaborating on meaningful projects and connecting with people who enjoy building things."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Details & Public Email Card */}
          <div className="lg:col-span-5 space-y-6">
            <TiltCard
              maxTilt={4}
              className="p-7 sm:p-8 rounded-2xl bg-[#0C0E15] border border-white/[0.08] shadow-sm glow-card"
            >
              <span className="text-[11px] font-mono text-[#00D9FF] tracking-wider uppercase block mb-2">
                // DIRECT INBOX
              </span>
              <h3 className="font-display font-extrabold text-2xl text-[#F5F5FA] tracking-tight mb-3">
                Reach out directly
              </h3>
              <p className="text-xs sm:text-sm text-[#9095A6] font-sans leading-relaxed mb-6">
                Whether you want to discuss AI systems, explore creative development opportunities, or brainstorm project ideas, feel free to drop an email.
              </p>

              {/* Public Portfolio Email Copier Card */}
              <div className="p-4 rounded-xl bg-[#121520] border border-white/[0.06] flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-[#9B5CFF]/15 text-[#9B5CFF] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[10px] font-mono text-[#5C6275] uppercase tracking-wider">PRIMARY EMAIL</span>
                    <a
                      href={`mailto:${profileData.contact.email}`}
                      className="font-mono text-xs sm:text-sm text-[#F5F5FA] hover:text-[#00D9FF] truncate block transition-colors"
                    >
                      {profileData.contact.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-lg bg-[#08090D] text-[#9095A6] hover:text-[#00D9FF] hover:bg-[#151824] border border-white/5 transition-all flex-shrink-0 cursor-pointer"
                  aria-label="Copy Email Address"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-white/[0.08]">
                <span className="text-[11px] font-mono text-[#5C6275] block mb-3 uppercase tracking-wider">
                  // CONNECT ON SOCIALS:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={profileData.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg bg-[#121520] border border-white/[0.06] hover:border-[#00D9FF]/40 text-center text-[11px] font-mono text-[#F5F5FA] hover:text-[#00D9FF] transition-all flex flex-col items-center gap-1.5"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profileData.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg bg-[#121520] border border-white/[0.06] hover:border-[#00D9FF]/40 text-center text-[11px] font-mono text-[#F5F5FA] hover:text-[#00D9FF] transition-all flex flex-col items-center gap-1.5"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={profileData.contact.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg bg-[#121520] border border-white/[0.06] hover:border-amber-400/40 text-center text-[11px] font-mono text-[#F5F5FA] hover:text-amber-400 transition-all flex flex-col items-center gap-1.5"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>LeetCode</span>
                  </a>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Backend-Powered Interactive Contact Form UI */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-2xl bg-[#0C0E15] border border-white/[0.08] shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-[#9B5CFF]" />
                <h4 className="font-display font-extrabold text-xl text-[#F5F5FA] tracking-tight">
                  Send a Direct Message
                </h4>
              </div>

              {/* Success Notification Banner */}
              {successMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-start gap-2.5 animate-fadeIn"
                >
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Error Notification Banner */}
              {errorMessage && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mb-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-start gap-2.5 animate-fadeIn"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
                  <div className="flex-1">
                    <p className="font-semibold text-rose-200 mb-1">Transmission Alert</p>
                    <p>{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot field for bot deterrence (hidden visually & from accessibility tree) */}
                <input
                  type="text"
                  name="_gotcha"
                  value={gotcha}
                  onChange={(e) => setGotcha(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[11px] font-mono text-[#5C6275] mb-1.5 uppercase tracking-wider">
                      Your Name <span className="text-[#00D9FF]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={80}
                      disabled={isSubmitting}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-lg bg-[#08090D] border border-white/[0.08] text-sm text-[#F5F5FA] placeholder-[#5C6275] focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all font-sans disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[11px] font-mono text-[#5C6275] mb-1.5 uppercase tracking-wider">
                      Your Email <span className="text-[#00D9FF]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={120}
                      disabled={isSubmitting}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#08090D] border border-white/[0.08] text-sm text-[#F5F5FA] placeholder-[#5C6275] focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all font-sans disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono text-[#A3A8B8] mb-1.5 uppercase">
                    Subject / Topic <span className="text-[#00D9FF]">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    minLength={3}
                    maxLength={120}
                    disabled={isSubmitting}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Collaboration on AI Project / Inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-[#151824] border border-white/10 text-sm text-[#F5F5FA] placeholder-[#A3A8B8]/40 focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-mono text-[#A3A8B8] uppercase">
                      Message <span className="text-[#00D9FF]">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-[#5C6275]">
                      {message.length} / 3000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    minLength={10}
                    maxLength={3000}
                    disabled={isSubmitting}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about what you'd like to build..."
                    className="w-full px-4 py-3 rounded-xl bg-[#151824] border border-white/10 text-sm text-[#F5F5FA] placeholder-[#A3A8B8]/40 focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition-all resize-none disabled:opacity-50"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] font-mono text-[#9095A6]">
                    Your message will be delivered securely to my inbox.
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-xs text-white bg-gradient-to-r from-[#9B5CFF] to-[#7B2CBF] hover:from-[#8A4CE6] hover:to-[#6A23A6] shadow-[0_0_20px_rgba(155,92,255,0.35)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
