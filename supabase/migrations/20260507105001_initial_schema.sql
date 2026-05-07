-- Enable UUID generation helpers
create extension if not exists "pgcrypto";

-- Enums
create type public.tenant_plan as enum ('trial', 'basic', 'pro', 'enterprise');
create type public.user_role as enum ('admin', 'analyst', 'viewer');
create type public.event_input_type as enum ('text', 'pdf', 'audio_transcript');
create type public.event_status as enum ('received', 'processing', 'completed', 'failed');
create type public.corrective_action_status as enum ('pending', 'in_progress', 'completed', 'cancelled');
create type public.credit_transaction_type as enum ('purchase', 'consumption', 'refund', 'bonus');

-- Shared updated_at trigger function
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  slug varchar(100) not null unique,
  logo_url text,
  plan public.tenant_plan not null default 'trial',
  credits_balance integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.users (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  email varchar(255) not null unique,
  full_name varchar(255),
  role public.user_role not null default 'viewer',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  submitted_by uuid references public.users(id) on delete set null,
  title varchar(255) not null,
  raw_input text not null,
  input_type public.event_input_type not null,
  status public.event_status not null default 'received',
  credits_used integer not null default 0,
  occurred_at timestamptz,
  operation_type varchar(100),
  aircraft_type varchar(100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.analyses (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null unique references public.events(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,

  event_summary text,

  escape_point text,
  unsafe_agent varchar(255),
  unsafe_act text,

  perception_code varchar(10),
  perception_name varchar(100),
  perception_justification text,
  perception_discarded jsonb,

  objective_code varchar(10),
  objective_name varchar(100),
  objective_justification text,
  objective_discarded jsonb,

  action_code varchar(10),
  action_name varchar(100),
  action_justification text,
  action_discarded jsonb,

  conclusions text,
  recommendations jsonb,
  preconditions jsonb,

  pdf_url text,
  raw_llm_output jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.corrective_actions (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid not null references public.analyses(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  title varchar(255) not null,
  description text,
  related_failure varchar(10),
  status public.corrective_action_status not null default 'pending',
  responsible varchar(255),
  due_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete restrict,
  type public.credit_transaction_type not null,
  amount integer not null,
  event_id uuid references public.events(id) on delete set null,
  stripe_payment_id varchar(255),
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.credit_packages (
  id uuid primary key default gen_random_uuid(),
  name varchar(100) not null,
  credits integer not null,
  price_brl numeric(10, 2) not null,
  stripe_price_id varchar(255) not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Foreign key and query performance indexes
create index idx_users_tenant_id on public.users(tenant_id);
create index idx_events_tenant_id on public.events(tenant_id);
create index idx_events_submitted_by on public.events(submitted_by);
create index idx_events_status on public.events(status);
create index idx_analyses_tenant_id on public.analyses(tenant_id);
create index idx_corrective_actions_analysis_id on public.corrective_actions(analysis_id);
create index idx_corrective_actions_tenant_id on public.corrective_actions(tenant_id);
create index idx_corrective_actions_status on public.corrective_actions(status);
create index idx_credit_transactions_tenant_id on public.credit_transactions(tenant_id);
create index idx_credit_transactions_user_id on public.credit_transactions(user_id);
create index idx_credit_transactions_event_id on public.credit_transactions(event_id);
create index idx_credit_packages_is_active on public.credit_packages(is_active);

-- Auto-update updated_at on row updates
create trigger set_tenants_updated_at
before update on public.tenants
for each row execute function public.set_updated_at();

create trigger set_users_updated_at
before update on public.users
for each row execute function public.set_updated_at();

create trigger set_events_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create trigger set_analyses_updated_at
before update on public.analyses
for each row execute function public.set_updated_at();

create trigger set_corrective_actions_updated_at
before update on public.corrective_actions
for each row execute function public.set_updated_at();

create trigger set_credit_transactions_updated_at
before update on public.credit_transactions
for each row execute function public.set_updated_at();

create trigger set_credit_packages_updated_at
before update on public.credit_packages
for each row execute function public.set_updated_at();
