# Integrações

## Estratégia

Integrações devem ser implementadas por portas e adaptadores para evitar acoplamento com fornecedor. Cada adaptador deve ter configuração por organização, logs, retries, idempotência e tratamento de rate limits.

## Futuras integrações

- WhatsApp Cloud API para mensagens e captação.
- Instagram e Facebook para leads e atendimento social.
- E-mail para envio, recebimento e rastreamento.
- Formulários do site institucional.
- Google Calendar para reuniões e visitas.
- Google Ads e Meta Ads para atribuição de campanhas.
- n8n para automações.
- Storage S3 compatível para anexos.
- Assinatura eletrônica.
- Ferramentas financeiras e APIs externas.

## Segurança

Credenciais devem ser criptografadas em repouso, rotacionáveis e nunca expostas no front-end.
