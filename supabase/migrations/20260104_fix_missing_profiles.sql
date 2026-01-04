-- Script de Correção: Criar perfis para usuários que já existiam
-- Execute isso no SQL Editor do Supabase

insert into public.profiles (id, email, full_name, role)
select 
  id, 
  email, 
  coalesce(raw_user_meta_data->>'full_name', 'Usuario Sem Nome'), 
  'ADMIN' -- Forçando ADMIN para usuários antigos (cuidado em produção!)
from auth.users
where id not in (select id from public.profiles);
