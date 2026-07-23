# ADR 0002 — Multitenancy por organizationId

## Status

Aceita.

## Decisão

Usar `organizationId` nas entidades de negócio desde o início, com filtros obrigatórios derivados da sessão e possibilidade futura de Row Level Security no PostgreSQL.

## Consequências

- Facilita evolução SaaS.
- Exige testes específicos contra vazamento entre organizações.
- Permite relatórios e configurações por tenant.
