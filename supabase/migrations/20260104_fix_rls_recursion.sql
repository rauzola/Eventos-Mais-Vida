-- CORREÇÃO DE RLS: Recursão Infinita
-- O erro acontecia porque a política checava a tabela 'profiles' para saber se você era admin,
-- o que disparava a política de novo num loop eterno.

-- 1. Removemos a política problemática antiga
drop policy if exists "Admins and Concelho can view all profiles" on public.profiles;
drop policy if exists "Admins can update any profile" on public.profiles;

-- 2. Criamos uma função segura (Security Definer) para ler o role
-- Security Definer = Executa com permissões de "Deus" (bypassa RLS), quebrando o loop.
create or replace function public.is_admin_or_concelho()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 
    from public.profiles 
    where id = auth.uid() 
    and role in ('ADMIN', 'CONCELHO')
  );
$$;

create or replace function public.is_admin_only()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 
    from public.profiles 
    where id = auth.uid() 
    and role = 'ADMIN'
  );
$$;

-- 3. Recriamos as políticas usando as funções seguras

-- Leitura: Vê se é dono OU se é Admin/Concelho
create policy "View profiles policy"
  on public.profiles
  for select
  using (
    auth.uid() = id
    OR
    public.is_admin_or_concelho() = true
  );

-- Admin Update: Admin pode editar qualquer um
create policy "Admin update policy"
  on public.profiles
  for update
  using (
    public.is_admin_only() = true
  );
