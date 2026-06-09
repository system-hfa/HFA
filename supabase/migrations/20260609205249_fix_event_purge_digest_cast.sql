-- complete_event_purge hashes events.title, which is varchar. The remote
-- pgcrypto digest overload accepts text/bytea but did not apply an implicit
-- varchar-to-text cast during PL/pgSQL resolution.

create or replace function public.digest(p_value character varying, p_algorithm text)
returns bytea
language sql
immutable
strict
set search_path = public, extensions, pg_catalog, pg_temp
as $$
  select digest(p_value::text, p_algorithm);
$$;

comment on function public.digest(character varying, text) is
  'Compatibility overload used by synthetic event purge title hashing.';
