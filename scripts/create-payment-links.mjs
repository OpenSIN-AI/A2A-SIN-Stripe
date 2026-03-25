#!/usr/bin/env node
console.log(JSON.stringify({
  ok: true,
  script: 'create-payment-links',
  note: 'Placeholder automation entrypoint. Intended flow: use Stripe API when STRIPE_SECRET_KEY exists, otherwise attach to dashboard session and create payment links via browser lane.',
  prices: { pilot: 6, ops: 18, fleet: 44 },
}, null, 2));
