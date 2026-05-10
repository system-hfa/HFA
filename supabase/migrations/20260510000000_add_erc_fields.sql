alter table analyses
  add column if not exists erc_level integer,
  add column if not exists erc_label text,
  add column if not exists erc_rationale text,
  add column if not exists erc_technical_barriers text,
  add column if not exists erc_procedural_barriers text,
  add column if not exists erc_hfa_adjustment text;
