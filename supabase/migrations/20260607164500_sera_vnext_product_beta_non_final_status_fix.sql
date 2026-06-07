alter table public.sera_vnext_analyses
  drop constraint if exists sera_vnext_analyses_no_final_status;

alter table public.sera_vnext_analyses
  add constraint sera_vnext_analyses_no_final_status check (
    status !~* '(CLASSIFIED|READY|RELEASED)'
    and review_status !~* '(CLASSIFIED|READY|RELEASED)'
  );
