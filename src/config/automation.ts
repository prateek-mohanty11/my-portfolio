/**
 * Antigravity Automation & Integration Configuration
 * 
 * This file serves as the centralized configuration and integration hub
 * for future Antigravity automated workflows, Webhooks, API endpoints,
 * and AI-powered sidecar features.
 * 
 * DO NOT expose private secrets or API keys here.
 * Only public endpoints, environment variable references, and configuration flags.
 */

export interface AutomationConfig {
  version: string;
  features: {
    // Contact submission webhook (e.g., Formspree, Resend, or custom Antigravity agent webhook)
    contactWebhookUrl: string | null;
    
    // Future AI Assistant / Interactive agent twin
    enableAiAssistant: boolean;
    aiAssistantEndpoint: string | null;
    
    // Resume document integration
    resumeDocumentUrl: string | null;
    
    // GitHub dynamic syncing via Antigravity cron automation
    enableGitHubCronSync: boolean;
    
    // LeetCode dynamic syncing via proxy worker
    enableLeetCodeWorkerSync: boolean;
    
    // Sound FX (ambient synthetic audio feedback using Web Audio API)
    enableAudioFeedback: boolean;
  };
  telemetry: {
    environment: 'production' | 'development';
    lastSynchronized: string;
  };
}

export const automationConfig: AutomationConfig = {
  version: '2.0.0-antigravity-ready',
  features: {
    // When deploying a real contact webhook, update this URL or set VITE_CONTACT_WEBHOOK_URL
    contactWebhookUrl: (import.meta as any).env?.VITE_CONTACT_WEBHOOK_URL || null,
    
    // AI Assistant Sidecar flag (ready for Antigravity AI Twin agent)
    enableAiAssistant: true,
    aiAssistantEndpoint: (import.meta as any).env?.VITE_AI_ASSISTANT_URL || null,
    
    // Configure resume URL here when ready to publish resume PDF
    resumeDocumentUrl: (import.meta as any).env?.VITE_RESUME_URL || '/resume/Prateek_Mohanty_AI_ML_Resume.pdf',
    
    enableGitHubCronSync: false,
    enableLeetCodeWorkerSync: false,
    enableAudioFeedback: true,
  },
  telemetry: {
    environment: (import.meta as any).env?.MODE === 'production' ? 'production' : 'development',
    lastSynchronized: new Date().toISOString(),
  }
};

