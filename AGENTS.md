# SIN-Stripe

- Team: Team - Finance
- Team Manager: pending dedicated Team - Finance manager
- Slug: sin-stripe
- Repo: https://github.com/Delqhi/sin-stripe
- Docs Tab: pending Team - Finance docs tab

Arbeitsregel:
- Jede neue Action muss in `runtime.ts`, `mcp-server.ts`, `a2a-http.ts`, `metadata.ts` und `A2A-CARD.md` synchronisiert werden.
- Fokus: Stripe in unter 3 Minuten produktiv machen, nicht Dokumentation aufblasen.
- Browser-Skripte und CLI-Skripte müssen zusammen gedacht werden: erst CLI-Preflight, dann Browser-Lane nur für die letzten blockierenden Schritte.
- Keine Secrets in Logs. Alle Schlüssel nur über SIN-Passwordmanager / Secret-Fanout.
<<<<<<< HEAD
=======

---

## 📚 Documentation

Full documentation: **[docs.opensin.ai](https://docs.opensin.ai)**

| Section | Link |
|---------|------|
| Getting Started | [Guide](https://docs.opensin.ai/guide/getting-started) |
| API Reference | [API](https://docs.opensin.ai/api/overview) |
| Tutorials | [Tutorials](https://docs.opensin.ai/tutorials/agent-basics) |
| Integrations | [Integrations](https://docs.opensin.ai/integrations/telegram) |
| Architecture | [Architecture](https://docs.opensin.ai/architecture/overview) |
| Community | [Discord](https://discord.gg/opensin) |

## Boundary Guidance for Agents

When modifying this repo:

- Prefer Stripe integration and payment setup work.
- Keep claims scoped to this integration surface.
- Do not redefine broader finance, product, ops, or docs canon from here.

## Boundary Guidance for Agents

When modifying this repo:

- Prefer Stripe integration and payment setup work.
- Keep claims scoped to this integration surface.
- Do not redefine broader finance, product, ops, or docs canon from here.
>>>>>>> 0b57675 (docs: add stripe boundary guidance)
