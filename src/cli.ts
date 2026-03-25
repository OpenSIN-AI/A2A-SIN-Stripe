#!/usr/bin/env node

import process from 'node:process';
import { createStripeHttpServer } from './a2a-http.js';
import { buildAgentCard, resolveTemplateAgentConfig } from './metadata.js';
import { startMcpServer } from './mcp-server.js';
import { executeStripeAgentAction, type StripeAgentAction } from './runtime.js';

async function main(): Promise<void> {
  const command = process.argv[2] || 'help';
  switch (command) {
    case 'serve':
    case 'serve-a2a':
      await serveA2A();
      return;
    case 'serve-mcp':
      await startMcpServer();
      return;
    case 'print-card':
      printJson(buildAgentCard(resolveTemplateAgentConfig().publicBaseUrl));
      return;
    case 'run-action':
      await runAction();
      return;
    default:
      printUsage();
  }
}

async function serveA2A() {
  const config = resolveTemplateAgentConfig();
  const handle = createStripeHttpServer();
  await handle.start();
  printJson({ ok: true, command: 'serve-a2a', host: config.host, port: config.port, baseUrl: config.publicBaseUrl });
}

async function runAction() {
  const raw = process.argv[3]?.trim() || (await readStdin()).trim();
  if (!raw) throw new Error('missing_action_json');
  printJson(await executeStripeAgentAction(JSON.parse(raw) as StripeAgentAction));
}

function printUsage() {
  process.stderr.write(
    [
      'Usage:',
      '  sin-stripe serve-a2a',
      '  sin-stripe serve-mcp',
      '  sin-stripe print-card',
      `  sin-stripe run-action '{"action":"agent.help"}'`,
    ].join('\n') + '\n',
  );
}

function printJson(payload: unknown) {
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

async function readStdin() {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
