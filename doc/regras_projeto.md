# Regras de Negócio e Projeto

## 1. Autenticação e Segurança (RBAC)
- **Sistema de Login**: O sistema deve utilizar exclusivamente o **Supabase Auth**.
- **Gestão de Senhas**: Nenhuma senha de usuário deve ser armazenada em tabelas criadas manualmente.
- **Hierarquia de Permissões (Roles)**:
    1.  **USER**: Usuário padrão/Participante. Pode se inscrever em eventos e ver seu próprio perfil.
    2.  **STAFF**: Voluntários e equipes de serviço. Pode ver listas de presença parciais.
    3.  **COORD**: Coordenadores de frentes ou eventos específicos. Pode gerenciar inscrições do seu evento.
    4.  **CONCELHO**: Diretoria/Conselho. Acesso irrestrito a relatórios e visualização de todos os eventos/inscrições.
    5.  **ADMIN**: Superusuário. Acesso total ao sistema, incluindo configurações e gestão de usuários.

## 2. Acesso a Dados (RLS)
- **USER**: Vê apenas seus dados.
- **STAFF+**: Vê dados necessários para operação (lista de inscritos, etc), conforme filtros seguros.

## 3. Gestão de Eventos
- Um evento só aparece na listagem pública se `is_published` for `true`.
- Eventos passados não devem permitir novas inscrições.

## 4. Inscrições
- Um usuário não pode se inscrever duas vezes no mesmo evento (restrição de unicidade par `user_id` + `event_id`).
- Cancelamentos mantêm o registro com status `cancelled`.
