# Segurança e Privacidade

## Princípios

- LGPD por padrão: finalidade, minimização, consentimento, retenção e rastreabilidade.
- Nenhum segredo no código; usar variáveis de ambiente por ambiente.
- Senhas protegidas com algoritmo forte quando autenticação for implementada.
- Autorização baseada em papéis e contexto de organização.
- Validação de entrada em toda fronteira externa.
- Logs de auditoria para ações importantes.

## Controles mínimos do MVP

- Sessão segura e recuperação de senha com tokens curtos.
- Rate limiting em login, recuperação e formulários públicos.
- Filtros obrigatórios por `organizationId`.
- Consentimento explícito para comunicação em leads e contatos.
- Política de retenção e exclusão lógica.

## IA e privacidade

Recursos de IA devem permitir revisão humana, registrar origem da recomendação e evitar envio de dados pessoais a fornecedores sem base legal, contrato e configuração explícita.
