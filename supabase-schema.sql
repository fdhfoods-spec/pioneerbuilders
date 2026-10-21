-- =========================================================
-- Pioneer Builders — Supabase Enquiry Table Schema
-- Run this script in your Supabase Project:
-- Dashboard -> SQL Editor -> New Query -> Paste & Run
-- =========================================================

-- 1. Create the enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  location TEXT NOT NULL,
  budget TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow anonymous enquiry submissions" ON public.enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to view enquiries" ON public.enquiries;

-- 4. Allow public (anonymous website visitors) to submit enquiries
CREATE POLICY "Allow anonymous enquiry submissions"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 5. Only authenticated team members can read/view submitted enquiries
CREATE POLICY "Allow authenticated users to view enquiries"
ON public.enquiries
FOR SELECT
TO authenticated
USING (true);

-- 6. Create index on created_at for fast chronological querying
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
