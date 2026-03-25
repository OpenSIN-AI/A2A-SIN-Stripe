#!/usr/bin/env node
console.log(JSON.stringify({
  ok: true,
  script: 'bootstrap-under-3-minutes',
  steps: [
    'Check keys and existing links',
    'Create or replace payment links',
    'Configure webhook + whsec fanout',
    'Verify checkout + webhook',
  ],
}, null, 2));
