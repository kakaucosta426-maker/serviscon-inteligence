# ADR 0001 — Next.js modular para o MVP

## Status

Aceita.

## Contexto

O produto precisa validar rapidamente CRM, captação, atividades e visitas sem criar complexidade operacional excessiva.

## Decisão

Usar Next.js modular com TypeScript, Prisma e PostgreSQL no MVP. Manter módulos de domínio isolados para permitir extração futura de serviços.

## Consequências

- Menor custo inicial de infraestrutura.
- Menos duplicação entre front-end e back-end.
- Necessidade de disciplina arquitetural para evitar monólito desorganizado.
