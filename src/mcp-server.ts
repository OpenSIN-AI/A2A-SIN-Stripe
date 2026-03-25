import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { executeStripeAgentAction } from './runtime.js';

const onboardingSaveSchema = z.object({ ownerEmail: z.string().optional(), notes: z.string().optional(), confirm: z.boolean().optional() });

const TOOLS = [
  ['sin-stripe_help', 'Describe available agent actions.', async () => executeStripeAgentAction({ action: 'agent.help' })],
  ['sin-stripe_health', 'Check base agent readiness.', async () => executeStripeAgentAction({ action: 'sin.stripe.health' })],
  ['sin-stripe_keys_status', 'Check Stripe secret presence without returning values.', async () => executeStripeAgentAction({ action: 'sin.stripe.keys.status' })],
  ['sin-stripe_onboarding_plan', 'Return the under-3-minute Stripe onboarding plan.', async () => executeStripeAgentAction({ action: 'sin.stripe.onboarding.plan' })],
  ['sin-stripe_payment_links_plan', 'Return the payment links automation plan.', async () => executeStripeAgentAction({ action: 'sin.stripe.payment_links.plan' })],
  ['sin-stripe_webhook_plan', 'Return the webhook automation plan.', async () => executeStripeAgentAction({ action: 'sin.stripe.webhook.plan' })],
  ['sin-stripe_setup_fastlane_plan', 'Return the combined fastlane onboarding plan.', async () => executeStripeAgentAction({ action: 'sin.stripe.setup.fastlane.plan' })],
] as const;

export async function startMcpServer(): Promise<void> {
  const server = new Server({ name: 'sin-stripe', version: '0.1.0' }, { capabilities: { tools: {} } });
  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS.map(([name, description]) => ({ name, description, inputSchema: { type: 'object', properties: {} } })) }));
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const tool = TOOLS.find(([name]) => name === request.params.name);
    if (!tool) return { content: [{ type: 'text', text: `Unknown tool: ${request.params.name}` }], isError: true };
    const result = await tool[2]();
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  });
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
