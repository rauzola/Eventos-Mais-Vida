# Documentação Técnica e de Código

## Arquitetura de Banco de Dados (Supabase/PostgreSQL)

### Modelagem de Dados

#### 1. Tabela: `public.profiles`
Armazena dados de perfil do usuário, estendendo a tabela `auth.users` do Supabase.

| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | UUID (PK) | Chave estrangeira para `auth.users.id`. |
| `email` | TEXT | Email do usuário (sincronizado). |
| `full_name` | TEXT | Nome completo. |
| `avatar_url` | TEXT | URL da imagem de avatar. |
| `role` | TEXT | Papel no sistema: `USER`, `STAFF`, `COORD`, `CONCELHO`, `ADMIN`. Default: `USER`. |
| `created_at` | TIMESTAMPTZ | Data de criação. |
| `updated_at` | TIMESTAMPTZ | Data de atualização. |

#### 2. Tabela: `public.events`
Armazena os eventos criados no sistema.

| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | UUID (PK) | Identificador único do evento. |
| `owner_id` | UUID (FK) | Referência para `profiles.id` (criador). |
| `title` | TEXT | Título do evento. |
| `slug` | TEXT | Identificador amigável para URL (único). |
| `description` | TEXT | Descrição detalhada. |
| `start_date` | TIMESTAMPTZ | Início do evento. |
| `end_date` | TIMESTAMPTZ | Fim do evento. |
| `location` | TEXT | Localização presencial presencial. |
| `cover_image_url` | TEXT | Imagem de capa. |
| `capacity` | INTEGER | Capacidade máxima (Null = ilimitado). |
| `price` | DECIMAL | Valor do ingresso. |
| `is_published` | BOOLEAN | Define visibilidade pública. |

#### 3. Tabela: `public.registrations`
Vínculo entre usuários e eventos (inscrições).

| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | UUID (PK) | Identificador da inscrição. |
| `user_id` | UUID (FK) | Participante (`profiles.id`). |
| `event_id` | UUID (FK) | Evento alvo (`events.id`). |
| `status` | TEXT | Status: `pending`, `confirmed`, `cancelled`, `waitlist`. |
| `created_at` | TIMESTAMPTZ | Data da inscrição. |

## Escolhas Tecnológicas
- **Autenticação**: Supabase Auth (Native).
- **Banco de Dados**: PostgreSQL (via Supabase).
- **ORM/Query Builder**: Supabase Client (Nativo) - `@supabase/supabase-js`. Decidido por suportar RLS nativamente e simplificar a arquitetura.
    - *Nota*: Evitar ORMs como Prisma para este projeto para manter compatibilidade total com Auth/RLS sem adapters complexos.
- **Gestão de Conteúdo (CMS)**:
    - Textos e conteúdos dinâmicos simples serão geridos via tabelas do Supabase (`pages_content` se necessário).
    - Ferramentas externas de CMS (ex: Prismic) **não** serão utilizadas na v1 para reduzir complexidade.
- **Segurança**: RLS (Row Level Security) nas tabelas para isolamento de dados por usuário.
