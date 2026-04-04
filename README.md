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

## 📚 Documentation

This repository follows the [Global Dev Docs Standard](https://github.com/OpenSIN-AI/Global-Dev-Docs-Standard).

For contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).
For security policy, see [SECURITY.md](SECURITY.md).
For the complete OpenSIN ecosystem, see [OpenSIN-AI Organization](https://github.com/OpenSIN-AI).

## 🔗 See Also

- [OpenSIN Core](https://github.com/OpenSIN-AI/OpenSIN) — Main platform
- [OpenSIN-Code](https://github.com/OpenSIN-AI/OpenSIN-Code) — CLI
- [OpenSIN-backend](https://github.com/OpenSIN-AI/OpenSIN-backend) — Backend
- [OpenSIN-Infrastructure](https://github.com/OpenSIN-AI/OpenSIN-Infrastructure) — Deploy
- [Global Dev Docs Standard](https://github.com/OpenSIN-AI/Global-Dev-Docs-Standard) — Docs