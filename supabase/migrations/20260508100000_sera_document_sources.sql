-- Metadados de origem da narrativa + armazenamento de documentos + rate limit de extração

DO $$ BEGIN
  ALTER TYPE public.event_input_type ADD VALUE IF NOT EXISTS 'docx';
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE public.analyses
  ADD COLUMN IF NOT EXISTS source_type text DEFAULT 'text',
  ADD COLUMN IF NOT EXISTS source_file_name text,
  ADD COLUMN IF NOT EXISTS source_word_count integer,
  ADD COLUMN IF NOT EXISTS source_file_url text;

ALTER TABLE public.analyses DROP CONSTRAINT IF EXISTS analyses_source_type_check;
ALTER TABLE public.analyses
  ADD CONSTRAINT analyses_source_type_check
  CHECK (source_type IS NULL OR source_type IN ('text', 'pdf', 'docx'));

COMMENT ON COLUMN public.analyses.source_file_url IS 'Path ou URL do objeto no bucket analysis-documents';

CREATE TABLE IF NOT EXISTS public.sera_document_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sera_document_uploads_user_created
  ON public.sera_document_uploads (user_id, created_at DESC);

ALTER TABLE public.sera_document_uploads ENABLE ROW LEVEL SECURITY;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'analysis-documents',
  'analysis-documents',
  false,
  10485760,
  ARRAY[
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "analysis_documents_select_own" ON storage.objects;
DROP POLICY IF EXISTS "analysis_documents_insert_own" ON storage.objects;
DROP POLICY IF EXISTS "analysis_documents_delete_own" ON storage.objects;

CREATE POLICY "analysis_documents_select_own"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'analysis-documents'
    AND COALESCE((storage.foldername (name))[1], '') = auth.uid()::text
  );

CREATE POLICY "analysis_documents_insert_own"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'analysis-documents'
    AND COALESCE((storage.foldername (name))[1], '') = auth.uid()::text
  );

CREATE POLICY "analysis_documents_delete_own"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'analysis-documents'
    AND COALESCE((storage.foldername (name))[1], '') = auth.uid()::text
  );

COMMENT ON TABLE public.sera_document_uploads IS 'Contagem de extrações; escrita via service_role nas rotas /api.';
