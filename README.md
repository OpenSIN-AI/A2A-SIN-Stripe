---
title: SIN-Stripe
emoji: "💳"
colorFrom: indigo
colorTo: purple
sdk: docker
app_port: 7860
pinned: false
---

# SIN-Stripe

`SIN-Stripe` ist der dedizierte Stripe-Automationsagent für Team Finance.

## Zweck

Endnutzer sollen Stripe nicht manuell in langen Dashboard-Sessions einrichten müssen. `SIN-Stripe` bündelt CLI-Preflights, Browser-Automation, Payment-Link-Erzeugung, Webhook-Fanout und Secret-Fanout in einen unter-3-Minuten-Setup-Flow.

## Deployment

- GitHub repo: `https://github.com/Delqhi/sin-stripe`
- Hugging Face Space: `https://huggingface.co/spaces/delqhi/sin-stripe`
- Landing page: `https://delqhi-sin-stripe.hf.space`
- Public A2A target: `https://a2a.delqhi.com/agents/sin-stripe`

## Kernfähigkeiten

- Stripe-Key-Status prüfen, ohne Geheimnisse auszugeben
- Deterministische Onboarding-Pläne für Login, Payment Links und Webhooks liefern
- Browser-Skripte für Payment-Link- und Webhook-Setup bündeln
- Success-/Webhook-URL-Standards für OpenSIN / SIN Solver standardisieren
- zukünftige Stripe-CLI-Actions für Produkt-, Preis- und Link-Erstellung vorbereiten

## Lokale Kommandos

```bash
sin-stripe serve-a2a
sin-stripe serve-mcp
sin-stripe print-card
sin-stripe run-action '{"action":"agent.help"}'
```
