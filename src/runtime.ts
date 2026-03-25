import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

const DEFAULT_STATE_PATH = join(homedir(), '.config', 'sin', 'sin-stripe', 'onboarding-state.json');

type OnboardingState = {
  ownerEmail?: string;
  notes?: string;
  updatedAt?: string;
};

export type StripeAgentAction =
  | { action: 'agent.help' }
  | { action: 'sin.stripe.health' }
  | { action: 'sin.stripe.onboarding.status' }
  | { action: 'sin.stripe.onboarding.save'; ownerEmail?: string; notes?: string; confirm?: boolean }
  | { action: 'sin.stripe.keys.status' }
  | { action: 'sin.stripe.onboarding.plan' }
  | { action: 'sin.stripe.payment_links.plan' }
  | { action: 'sin.stripe.webhook.plan' }
  | { action: 'sin.stripe.setup.fastlane.plan' };

export async function executeStripeAgentAction(action: StripeAgentAction): Promise<unknown> {
  switch (action.action) {
    case 'agent.help':
      return {
        ok: true,
        agent: 'sin-stripe',
        actions: [
          'sin.stripe.health',
          'sin.stripe.keys.status',
          'sin.stripe.onboarding.plan',
          'sin.stripe.payment_links.plan',
          'sin.stripe.webhook.plan',
          'sin.stripe.setup.fastlane.plan',
          'sin.stripe.onboarding.status',
          'sin.stripe.onboarding.save',
        ],
      };
    case 'sin.stripe.health':
      return { ok: true, agent: 'sin-stripe', team: 'Team - Finance', primaryModel: 'openai/gpt-5.4' };
    case 'sin.stripe.keys.status':
      return {
        ok: true,
        requiredSecrets: ['STRIPE_SECRET_KEY', 'STRIPE_PUBLISHABLE_KEY', 'STRIPE_WEBHOOK_SECRET'],
        present: {
          STRIPE_SECRET_KEY: Boolean(process.env.STRIPE_SECRET_KEY?.trim()),
          STRIPE_PUBLISHABLE_KEY: Boolean(process.env.STRIPE_PUBLISHABLE_KEY?.trim()),
          STRIPE_WEBHOOK_SECRET: Boolean(process.env.STRIPE_WEBHOOK_SECRET?.trim()),
        },
        note: 'Use SIN-Passwordmanager for secret fanout. Never paste raw Stripe secrets into agent chats.',
      };
    case 'sin.stripe.onboarding.plan':
      return {
        ok: true,
        goal: 'Stripe in under 3 minutes for end users.',
        sequence: [
          'CLI preflight: detect keys, account mode, and target URLs',
          'Browser lane only for blocked dashboard steps',
          'Create prices/payment links or verify existing ones',
          'Create webhook endpoint and capture whsec secret',
          'Fanout secrets to Pages / Spaces / local surfaces',
          'Run dry-run checkout + webhook smoke test',
        ],
      };
    case 'sin.stripe.payment_links.plan':
      return {
        ok: true,
        scripts: [
          'scripts/create-payment-links.mjs',
          'scripts/bootstrap-under-3-minutes.mjs',
        ],
        browserHelpers: [
          'scripts/browser-open-dashboard.applescript',
          'scripts/browser-dismiss-prompts.applescript',
        ],
        note: 'Prefer API / CLI path first; only use browser steps for settings the dashboard still blocks behind UI.',
      };
    case 'sin.stripe.webhook.plan':
      return {
        ok: true,
        scripts: [
          'scripts/configure-webhook.mjs',
          'scripts/bootstrap-under-3-minutes.mjs',
        ],
        target: 'https://opensin.pages.dev/api/stripe-webhook',
        successRedirect: 'https://opensin.pages.dev/#/checkout-success',
      };
    case 'sin.stripe.setup.fastlane.plan':
      return {
        ok: true,
        underThreeMinutes: true,
        lanes: {
          cli: ['create-payment-links.mjs', 'configure-webhook.mjs'],
          browser: ['browser-open-dashboard.applescript', 'browser-dismiss-prompts.applescript'],
        },
        outcome: 'User receives live checkout links + webhook secret fanout without manual Stripe archaeology.',
      };
    case 'sin.stripe.onboarding.status':
      return { ok: true, statePath: DEFAULT_STATE_PATH, state: await readState() };
    case 'sin.stripe.onboarding.save':
      if (!action.confirm) throw new Error('input_required:confirm=true required');
      return {
        ok: true,
        statePath: DEFAULT_STATE_PATH,
        state: await writeState({ ownerEmail: clean(action.ownerEmail), notes: clean(action.notes), updatedAt: new Date().toISOString() }),
      };
  }
}

async function readState(): Promise<OnboardingState | null> {
  try { return JSON.parse(await readFile(DEFAULT_STATE_PATH, 'utf8')) as OnboardingState; } catch { return null; }
}
async function writeState(state: OnboardingState) {
  await mkdir(dirname(DEFAULT_STATE_PATH), { recursive: true });
  await writeFile(DEFAULT_STATE_PATH, `${JSON.stringify(state, null, 2)}
`, 'utf8');
  return state;
}
function clean(value: string | undefined) {
  const normalized = String(value || '').trim();
  return normalized || undefined;
}
