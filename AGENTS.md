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
