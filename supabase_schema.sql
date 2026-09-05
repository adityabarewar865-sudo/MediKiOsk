-- Supabase Database Schema for Ayurvedic Hospital Pre-OPD & Doctor Dashboard
-- Execute this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create 'patients' table
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL,
    abha_id TEXT,
    complaints TEXT NOT NULL,
    timeline TEXT NOT NULL,
    diet TEXT,
    sleep TEXT,
    bowel TEXT
);

-- 2. Create 'opd_queue' table
CREATE TABLE IF NOT EXISTS public.opd_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    token_number TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Ready for Doctor' CHECK (status IN ('Ready for Doctor', 'In Consultation', 'Completed', 'Cancelled'))
);

-- 3. Create 'case_sheets' table
CREATE TABLE IF NOT EXISTS public.case_sheets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    queue_id UUID REFERENCES public.opd_queue(id) ON DELETE SET NULL,
    ashtavidha_pariksha JSONB DEFAULT '{}'::jsonb,
    hpi TEXT,
    diagnosis TEXT,
    prescriptions JSONB DEFAULT '[]'::jsonb,
    doctor_notes TEXT
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opd_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_sheets ENABLE ROW LEVEL SECURITY;

-- 5. Add RLS Policies for Anon access (ideal for hackathon/prototypes)
CREATE POLICY "Allow public read access on patients" ON public.patients FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on patients" ON public.patients FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on patients" ON public.patients FOR UPDATE USING (true);

CREATE POLICY "Allow public read access on opd_queue" ON public.opd_queue FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on opd_queue" ON public.opd_queue FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on opd_queue" ON public.opd_queue FOR UPDATE USING (true);

CREATE POLICY "Allow public read access on case_sheets" ON public.case_sheets FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on case_sheets" ON public.case_sheets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on case_sheets" ON public.case_sheets FOR UPDATE USING (true);

-- Enable real-time updates for opd_queue
ALTER PUBLICATION supabase_realtime ADD TABLE public.opd_queue;
