# Segurança e Privacidade

## Controles implementados na entrega atual

- Hash de senha com PBKDF2-SHA512, salt aleatório, comparação em tempo constante e mínimo de 12 caracteres.
- Server Action de login com erro genérico para credenciais inválidas ou usuário inativo.
- Cookie de sessão HTTP-only, `sameSite=lax` e `secure` em produção.
- RBAC inicial com permissões por papel.
- Helpers de tenant que bloqueiam acesso a registros de outra organização.
- `.env.example` sem credenciais reais.

## Princípios para próximas fases

- LGPD por padrão: finalidade, minimização, consentimento, retenção e rastreabilidade.
- Nenhum segredo no código; usar variáveis de ambiente por ambiente.
- Autorização baseada em papéis e contexto de organização.
- Validação de entrada em toda fronteira externa.
- Logs de auditoria para ações importantes.
- Rate limiting em login, recuperação e formulários públicos.

## IA e privacidade

Recursos de IA devem permitir revisão humana, registrar origem da recomendação e evitar envio de dados pessoais a fornecedores sem base legal, contrato e configuração explícita.
