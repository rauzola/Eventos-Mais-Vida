# Regras de Negócio e Projeto

## 1. Autenticação e Segurança
- **Sistema de Login**: O sistema deve utilizar exclusivamente o **Supabase Auth**.
- **Gestão de Senhas**: Nenhuma senha de usuário deve ser armazenada em tabelas criadas manualmente.
- **Acesso a Dados (RLS)**:
    - Usuários só podem visualizar/editar seus próprios perfis.
    - Organizadores só podem editar eventos que eles criaram (exceto Admins).
    - Perfis de usuários comuns são parcialmente públicos (apenas nome/avatar) para listas de participantes, se aplicável, mas dados sensíveis devem ser privados.

## 2. Gestão de Eventos
- Um evento só aparece na listagem pública se `is_published` for `true`.
- Eventos passados não devem permitir novas inscrições, mas devem permanecer visíveis como histórico.

## 3. Inscrições
- Um usuário não pode se inscrever duas vezes no mesmo evento (restrição de unicidade par `user_id` + `event_id`).
- Cancelamentos de inscrição devem manter o registro, apenas alterando o status para `cancelled`.
