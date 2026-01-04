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
- Validado fluxo de login com chaves reais do usuário.
---
