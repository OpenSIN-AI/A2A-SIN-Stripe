import process from 'node:process';

export const TEMPLATE_AGENT_ID = 'sin-stripe';
export const TEMPLATE_AGENT_NAME = 'SIN-Stripe';
export const TEMPLATE_AGENT_DESCRIPTION = 'Stripe automation and onboarding specialist for sub-3-minute setup, payment links, redirects, webhooks, and secret fanout.';
export const TEMPLATE_AGENT_VERSION = '2026.03.25';
export const TEMPLATE_AGENT_DEFAULT_HOST = '127.0.0.1';
export const TEMPLATE_AGENT_DEFAULT_PORT = 4672;

export const TEMPLATE_AGENT_SKILLS = [
  { id: 'sin.stripe.health', name: 'Health', description: 'Check base agent readiness.' },
  { id: 'sin.stripe.keys.status', name: 'Stripe Keys Status', description: 'Check whether Stripe-related env vars are present (never returns secret values).' },
  { id: 'sin.stripe.onboarding.plan', name: 'Stripe Onboarding Plan', description: 'Return the under-3-minute setup plan.' },
  { id: 'sin.stripe.payment_links.plan', name: 'Payment Links Plan', description: 'Return the fastest path for product, price, and payment-link creation.' },
  { id: 'sin.stripe.webhook.plan', name: 'Webhook Plan', description: 'Return the safest webhook creation and secret fanout plan.' },
  { id: 'sin.stripe.setup.fastlane.plan', name: 'Setup Fastlane', description: 'Return the combined sub-3-minute onboarding sequence.' },
] as const;

export function resolveTemplateAgentConfig() {
  const host = process.env.SIN_STRIPE_HOST?.trim() || (process.env.PORT ? '0.0.0.0' : process.env.HOST?.trim() || TEMPLATE_AGENT_DEFAULT_HOST);
  const port = parseInteger(process.env.SIN_STRIPE_PORT, parseInteger(process.env.PORT, TEMPLATE_AGENT_DEFAULT_PORT));
  const fallbackPublicHost = host === '0.0.0.0' ? '127.0.0.1' : host;
  const publicBaseUrl = process.env.SIN_STRIPE_PUBLIC_BASE_URL?.trim() || (process.env.SPACE_HOST?.trim() ? `https://${process.env.SPACE_HOST.trim()}` : `http://${fallbackPublicHost}:${port}`);
  return { host, port, publicBaseUrl: publicBaseUrl.replace(/\/+$/, '') };
}

export function buildAgentCard(baseUrl: string) {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
  const rpcUrl = `${normalizedBaseUrl}/a2a/v1`;
  return {
    name: TEMPLATE_AGENT_NAME,
    description: TEMPLATE_AGENT_DESCRIPTION,
    version: TEMPLATE_AGENT_VERSION,
    documentationUrl: normalizedBaseUrl,
    url: rpcUrl,
    capabilities: { streaming: false, pushNotifications: false },
    defaultInputModes: ['text/plain', 'application/json'],
    defaultOutputModes: ['text/plain', 'application/json'],
    skills: [...TEMPLATE_AGENT_SKILLS],
    supportedInterfaces: [{ url: rpcUrl, protocolBinding: 'JSONRPC', protocolVersion: '1.0' }],
  };
}

function parseInteger(input: string | undefined, fallback: number) {
  const parsed = Number.parseInt(String(input || '').trim(), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}
