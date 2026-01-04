-- 1. Create Enum for Roles
create type public.app_role as enum ('USER', 'STAFF', 'COORD', 'CONCELHO', 'ADMIN');

-- 2. Create Profiles Table
create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade primary key,
  full_name text,
  email text, -- Copied from auth.users for easier querying
  avatar_url text,
  role public.app_role not null default 'USER',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Enable RLS
alter table public.profiles enable row level security;

-- 4. Create Trigger to Auto-Create Profile on Signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    coalesce((new.raw_user_meta_data->>'role')::public.app_role, 'USER')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Create RLS Policies

-- Policy: Users can view their own profile
create policy "Users can view own profile"
  on public.profiles
  for select
  using ( auth.uid() = id );

-- Policy: Admin and Concelho can view all profiles
create policy "Admins and Concelho can view all profiles"
  on public.profiles
  for select
  using ( 
    auth.uid() in (
      select id from public.profiles where role in ('ADMIN', 'CONCELHO')
    )
  );

-- Policy: Users can update their own profile
create policy "Users can update own profile"
  on public.profiles
  for update
  using ( auth.uid() = id );

-- Policy: Admins can update any profile
create policy "Admins can update any profile"
  on public.profiles
  for update
  using ( 
    auth.uid() in (
      select id from public.profiles where role = 'ADMIN'
    )
  );
