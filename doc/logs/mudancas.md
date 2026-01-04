# Logs de Mudanças

---
**Data:** 04/01/2026 | **Hora:** 00:10

**O que foi feito:**
- Limpeza inicial do projeto e remoção de boilerplate do Next.js.
- Criação da estrutura de documentação.

**Como foi feito:**
- Removido arquivo de log antigo `events-mais-vida.md`.
- Removido CSS module `src/app/page.module.css` e SVGs de exemplo em `public/`.
- Simplificado `src/app/page.tsx` para usar apenas Tailwind CSS básico.
- Criado `doc/planning.md` e estrutura de diretórios `doc/logs`.
---
---
**Data:** 04/01/2026 | **Hora:** 00:32

**O que foi feito:**
- Implementação completa da Autenticação via Supabase Auth.
- Configuração de Login, Cadastro, Logout e Rotas Protegidas.

**Como foi feito:**
- Instalado `@supabase/supabase-js` e `@supabase/ssr`.
- Criado padrão de clients em `src/utils/supabase/` (Client, Server, Middleware).
- Configurado `middleware.ts` para proteção de rotas e gestão de sessão (cookies).
- Criada página de login (`src/app/login`) com Server Actions.
- Refinada Interface de Login usando **shadcn/ui** (Card, Input, Label) combinando com mockup visual.
- Implementado fluxo de **Cadastro Dedicado** (`/signup`) e **Recuperação de Senha** (`/forgot-password`).
- Criados lindos **Templates de Email HTML** para o Supabase (Reset Senha, Confirmação, Convite, Magic Link) em `src/emails/`.
- Adicionados templates de **Segurança** (Senha Alterada, MFA, Identidade) para notificações do sistema.
- Corrigido fluxo de **Reset de Senha** com página dedicada `/update-password`.
- Adicionado suporte a **Magic Links com Hash** (`#access_token`) via `AuthHashHandler`.
- Implementado fluxo de **Completar Perfil** (`/complete-profile`) para usuários convidados.
- Implementado sistema de **Permissões (RBAC)** completo com proteção de dados (RLS) e verificação de Roles.
- Corrigido problema de recursão infinita nas políticas de segurança do banco.
- Validado fluxo de login com chaves reais do usuário.
---
---
**Data:** 04/01/2026 | **Hora:** 02:25

**O que foi feito:**
- [Implementação do Layout do Dashboard (V1) com design "Lovable"]
- [Refatoração da Sidebar para componente Fixo e Responsivo]
- [Criação da Landing Page Pública]
- [Correção de erros de serialização no Next.js (Client Components)]

**Como foi feito:**
- [Frontend]: Criado layout em `src/app/(authenticated)/layout.tsx` usando `position: fixed` para sidebar.
- [UI/UX]: Implementado design system com gradientes, blur e ícones Lucide coloridos.
- [Arquitetura]: Separada lógica de `Sidebar` (Server) e `SidebarContent` (Client) para permitir *active states* e evitar erros de montagem.
- [Navegação]: Configurada Home Page (`/`) para redirecionar usuários logados para a dashboard ou exibir landing page para visitantes.
---
