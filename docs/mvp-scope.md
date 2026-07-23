# Escopo do MVP

## Implementado nesta entrega

- Configuração inicial do projeto.
- npm como package manager único e registry oficial configurado.
- Autenticação local para acesso ao painel.
- Sessão persistida, logout e proteção básica contra repetição de tentativas de login.
- Estrutura multitenant por `organizationId`.
- Usuários de demonstração para Administrador, Marketing, Comercial, Operacional e Gestor.
- Perfis e permissões iniciais.
- Layout administrativo e menu principal.
- Página inicial do painel.
- Banco de dados inicial, migration e seed manual.
- Preparação para deploy na Vercel sem seed/migration destrutiva no build.
- Testes das regras críticas de autenticação, rate limiting e isolamento por organização.

## Ainda não implementado

- CRM, funil Kanban e oportunidades.
- Contatos, empresas e leads.
- WhatsApp, Instagram, campanhas e integrações reais.
- Inteligência artificial.
- Visitas técnicas e propostas.

## Critérios de aceite da próxima entrega funcional

- Usuário só acessa dados da própria organização em todos os repositórios.
- CRUD de usuários respeita RBAC e auditoria.
- Recuperação de senha usa tokens curtos e rate limiting distribuído.
