-- ====================================================================
-- MEDIKIOSK: AI-POWERED CLINICAL HISTORY SOFTWARE FOR MINISTRY OF AYUSH
-- Problem Statement ID: 26047
-- Database Schema for Supabase (PostgreSQL 15+)
-- ====================================================================

-- 1. Enable pgcrypto for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ====================================================================
-- TABLE 1: patients
-- Stores patient demographic and identification details
-- ====================================================================
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    full_name TEXT NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 0 AND age <= 130),
    gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
    phone TEXT,
    abha_id TEXT UNIQUE,
    preferred_language TEXT DEFAULT 'English',
    blood_group TEXT,
    address_city TEXT
);

-- Index for speedy ABHA / Phone lookup
CREATE INDEX IF NOT EXISTS idx_patients_abha ON patients(abha_id);
CREATE INDEX IF NOT EXISTS idx_patients_phone ON patients(phone);

-- ====================================================================
-- TABLE 2: intake_records
-- Stores comprehensive SOCRATES symptoms & Ayurvedic Dashavidha Pariksha
-- ====================================================================
CREATE TABLE IF NOT EXISTS intake_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,

    -- SOCRATES Clinical History Parameters
    site TEXT NOT NULL,                           -- Anatomical region (e.g. Epigastrium, Thorax, Knee Joint)
    onset TEXT NOT NULL,                          -- Sudden (<24h), Gradual (Days), Insidious (Months)
    character TEXT NOT NULL,                      -- Burning (Daha), Sharp (Toda), Throbbing (Spandana), Dull (Manda Ruja)
    radiation TEXT DEFAULT 'No radiation',        -- Propagation path
    associations JSONB DEFAULT '[]'::jsonb,       -- Co-symptoms: Nausea, Vomiting, Dyspnea, Vertigo, Fever, etc.
    time_course TEXT,                             -- Constant, Intermittent, Morning aggravation, Post-prandial
    exacerbating_factors TEXT,                    -- Spicy foods, cold weather, exertion, stress
    relieving_factors TEXT,                       -- Warm water, fasting (Langhana), rest, herbal decoctions
    severity INTEGER NOT NULL CHECK (severity BETWEEN 1 AND 10), -- 1 to 10 VAS scale

    -- Ayurvedic Constitutional & Dashavidha Pariksha Parameters
    prakriti TEXT NOT NULL,                       -- Vata, Pitta, Kapha, Vata-Pitta, Pitta-Kapha, Vata-Kapha, Sama
    vikriti TEXT,                                 -- Present doshic imbalance (e.g. Pitta-Vata Prakopa)
    agni TEXT NOT NULL,                           -- Sama (Balanced), Vishama (Irregular), Tikshna (Hyper), Manda (Hypo)
    koshtha TEXT NOT NULL,                        -- Krura (Hard/Constipated), Mridu (Soft/Sensitive), Madhyama (Balanced)
    dhatu_sarata TEXT DEFAULT 'Madhyama',         -- Rasa, Rakta, Mamsa, Meda, Asthi, Majja, Shukra
    satmya TEXT DEFAULT 'Madhyama',               -- Habituation & adaptability
    satva TEXT DEFAULT 'Madhyama',                -- Pravara (High), Madhyama (Medium), Avara (Low mental resilience)
    ahara_shakti TEXT DEFAULT 'Madhyama',         -- Abhyavaharana & Jaranashakti (Food intake & digestion)
    vyayama_shakti TEXT DEFAULT 'Madhyama',       -- Physical endurance & exercise capacity
    vaya TEXT DEFAULT 'Madhyama',                 -- Balya (Child), Madhyama (Adult), Vriddha (Geriatric)

    -- Clinical Notes & Prior Medical Background
    current_medications TEXT,
    allergies TEXT,
    prior_surgeries TEXT,
    report_notes TEXT,
    report_file_url TEXT,

    -- AI Triage & Synthesis Outputs
    ai_clinical_summary TEXT,                     -- Synthesized clinical impression
    triage_level TEXT DEFAULT 'Routine / OPD' 
        CHECK (triage_level IN ('Red Flag / Emergency', 'Urgent / Priority', 'Routine / OPD')),
    red_flag_symptoms JSONB DEFAULT '[]'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_intake_patient_id ON intake_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_intake_created_at ON intake_records(created_at DESC);

-- ====================================================================
-- TABLE 3: doctor_queue
-- Real-time OPD queue management with emergency red-flag triage
-- ====================================================================
CREATE TABLE IF NOT EXISTS doctor_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    intake_id UUID NOT NULL REFERENCES intake_records(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    token_number TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'WAITING' 
        CHECK (status IN ('WAITING', 'IN_CONSULTATION', 'COMPLETED', 'ESCALATED')),
    is_emergency BOOLEAN DEFAULT FALSE,
    triage_color TEXT DEFAULT 'green' 
        CHECK (triage_color IN ('red', 'yellow', 'green')),
    arrived_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    doctor_notes TEXT,
    ayush_prescription JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_doctor_queue_status ON doctor_queue(status);
CREATE INDEX IF NOT EXISTS idx_doctor_queue_arrived_at ON doctor_queue(arrived_at DESC);
CREATE INDEX IF NOT EXISTS idx_doctor_queue_emergency ON doctor_queue(is_emergency);

-- ====================================================================
-- AUTOMATIC QUEUE ENQUEUE TRIGGER
-- Automatically places patient in doctor_queue on intake submission
-- ====================================================================
CREATE OR REPLACE FUNCTION fn_enqueue_patient()
RETURNS TRIGGER AS $$
DECLARE
    v_token TEXT;
    v_count INTEGER;
    v_is_emergency BOOLEAN;
    v_color TEXT;
BEGIN
    -- Calculate sequential token for today
    SELECT COUNT(*) + 1 INTO v_count 
    FROM doctor_queue 
    WHERE arrived_at >= CURRENT_DATE;

    v_token := 'AYU-' || LPAD(v_count::TEXT, 3, '0');

    -- Triage color determination
    IF NEW.triage_level = 'Red Flag / Emergency' THEN
        v_is_emergency := TRUE;
        v_color := 'red';
    ELSIF NEW.triage_level = 'Urgent / Priority' THEN
        v_is_emergency := FALSE;
        v_color := 'yellow';
    ELSE
        v_is_emergency := FALSE;
        v_color := 'green';
    END IF;

    INSERT INTO doctor_queue (
        intake_id,
        patient_id,
        token_number,
        status,
        is_emergency,
        triage_color,
        arrived_at
    ) VALUES (
        NEW.id,
        NEW.patient_id,
        v_token,
        'WAITING',
        v_is_emergency,
        v_color,
        NEW.created_at
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS trg_after_intake_insert ON intake_records;
CREATE TRIGGER trg_after_intake_insert
AFTER INSERT ON intake_records
FOR EACH ROW
EXECUTE FUNCTION fn_enqueue_patient();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enables anonymous access for public kiosk intake & clinical dashboard
-- ====================================================================
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE intake_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_queue ENABLE ROW LEVEL SECURITY;

-- Patients policies
DROP POLICY IF EXISTS "Allow anon read patients" ON patients;
CREATE POLICY "Allow anon read patients" ON patients FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow anon insert patients" ON patients;
CREATE POLICY "Allow anon insert patients" ON patients FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon update patients" ON patients;
CREATE POLICY "Allow anon update patients" ON patients FOR UPDATE USING (true);

-- Intake records policies
DROP POLICY IF EXISTS "Allow anon read intake_records" ON intake_records;
CREATE POLICY "Allow anon read intake_records" ON intake_records FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow anon insert intake_records" ON intake_records;
CREATE POLICY "Allow anon insert intake_records" ON intake_records FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon update intake_records" ON intake_records;
CREATE POLICY "Allow anon update intake_records" ON intake_records FOR UPDATE USING (true);

-- Doctor queue policies
DROP POLICY IF EXISTS "Allow anon read doctor_queue" ON doctor_queue;
CREATE POLICY "Allow anon read doctor_queue" ON doctor_queue FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow anon insert doctor_queue" ON doctor_queue;
CREATE POLICY "Allow anon insert doctor_queue" ON doctor_queue FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon update doctor_queue" ON doctor_queue;
CREATE POLICY "Allow anon update doctor_queue" ON doctor_queue FOR UPDATE USING (true);

-- ====================================================================
-- REALTIME SUBSCRIPTIONS
-- Enable Supabase Realtime broadcast for live OPD queue updates
-- ====================================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'doctor_queue'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE doctor_queue;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'intake_records'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE intake_records;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'patients'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE patients;
    END IF;
END $$;

-- ====================================================================
-- SEED DATA: Realistic Clinical Profiles for Ministry of Ayush OPD
-- ====================================================================
DO $$
DECLARE
    v_p1_id UUID := '11111111-1111-1111-1111-111111111111';
    v_p2_id UUID := '22222222-2222-2222-2222-222222222222';
    v_p3_id UUID := '33333333-3333-3333-3333-333333333333';
    v_i1_id UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    v_i2_id UUID := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
    v_i3_id UUID := 'cccccccc-cccc-cccc-cccc-cccccccccccc';
BEGIN
    -- Patient 1: Amlapitta (GERD / Pitta Aggravation)
    INSERT INTO patients (id, full_name, age, gender, phone, abha_id, preferred_language, blood_group, address_city)
    VALUES (v_p1_id, 'Rajesh Sharma', 46, 'Male', '+91 98765 43210', '91-4501-8823-1092', 'Hindi', 'B+', 'New Delhi')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO intake_records (
        id, patient_id, site, onset, character, radiation, associations, time_course, 
        exacerbating_factors, relieving_factors, severity, prakriti, vikriti, agni, koshtha,
        dhatu_sarata, satmya, satva, ahara_shakti, vyayama_shakti, vaya,
        current_medications, allergies, report_notes, ai_clinical_summary, triage_level, red_flag_symptoms
    ) VALUES (
        v_i1_id, v_p1_id, 'Epigastrium / Urdhvaga', 'Gradual (2-3 weeks)', 'Burning / Daha', 
        'Retrosternal radiation to throat', '["Sour Eructation / Amlodgara", "Nausea", "Headache"]'::jsonb, 
        'Postprandial (2 hours after meals)', 'Spicy and oily food, irregular meal timings, late night sleep',
        'Cold milk, coconut water', 6, 'Pitta-Vata', 'Pitta Prakopa with Samata', 
        'Tikshna Agni (Hyperactive)', 'Mridu (Soft/Sensitive)',
        'Rakta Sara', 'Katu-Amla Satmya', 'Madhyama', 'Pravara', 'Madhyama', 'Madhyama',
        'Antacids SOS', 'None known', 'Endoscopy report: Mild erythematous gastritis',
        'Classical Urdhvaga Amlapitta presentation driven by Tikshnagni and Pitta-Vata morbidity. No cardiac red flags detected.',
        'Routine / OPD', '[]'::jsonb
    ) ON CONFLICT (id) DO NOTHING;

    -- Patient 2: Sandhigata Vata (Osteoarthritis / Vata Aggravation)
    INSERT INTO patients (id, full_name, age, gender, phone, abha_id, preferred_language, blood_group, address_city)
    VALUES (v_p2_id, 'Meenakshi Sundaram', 63, 'Female', '+91 98112 34567', '91-6203-9114-5541', 'English', 'O+', 'Chennai')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO intake_records (
        id, patient_id, site, onset, character, radiation, associations, time_course, 
        exacerbating_factors, relieving_factors, severity, prakriti, vikriti, agni, koshtha,
        dhatu_sarata, satmya, satva, ahara_shakti, vyayama_shakti, vaya,
        current_medications, allergies, report_notes, ai_clinical_summary, triage_level, red_flag_symptoms
    ) VALUES (
        v_i2_id, v_p2_id, 'Bilateral Knee Joints / Janu Sandhi', 'Insidious (>6 months)', 'Throbbing / Pricking (Toda)', 
        'Local joint pain radiating down calves', '["Morning Stiffness / Sandhistambha", "Crepitus / Atopa", "Restricted flexion"]'::jsonb, 
        'Morning & Cold evenings', 'Climbing stairs, cold exposure, prolong standing',
        'Warm sesame oil application (Abhyanga), fomentation (Swedana), rest', 7, 'Vata-Kapha', 'Vata Vriddhi with Dhatukshaya', 
        'Manda Agni (Sluggish)', 'Krura (Hard/Constipated)',
        'Asthi Sara Avara', 'Snigdha Satmya', 'Madhyama', 'Madhyama', 'Avara', 'Vriddha',
        'Calcium + Vit D3 supplements', 'Sulfa drugs allergy', 'X-Ray Knee: Bilateral medial compartment joint space narrowing with osteophytes',
        'Classic Sandhigata Vata (Osteoarthritis) with Asthi-Majja Dhatu involvement and Vata exacerbation. Indicative of Janu Basti and Rasayana line of management.',
        'Urgent / Priority', '[]'::jsonb
    ) ON CONFLICT (id) DO NOTHING;

    -- Patient 3: RED-FLAG EMERGENCY: Tamaka Shwasa / Acute Dyspnea with Retrosternal Pressure
    INSERT INTO patients (id, full_name, age, gender, phone, abha_id, preferred_language, blood_group, address_city)
    VALUES (v_p3_id, 'Vikramaditya Verma', 58, 'Male', '+91 99887 76655', '91-1094-8842-3301', 'Hindi', 'A+', 'Varanasi')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO intake_records (
        id, patient_id, site, onset, character, radiation, associations, time_course, 
        exacerbating_factors, relieving_factors, severity, prakriti, vikriti, agni, koshtha,
        dhatu_sarata, satmya, satva, ahara_shakti, vyayama_shakti, vaya,
        current_medications, allergies, report_notes, ai_clinical_summary, triage_level, red_flag_symptoms
    ) VALUES (
        v_i3_id, v_p3_id, 'Retrosternal / Precordial & Thorax', 'Sudden (<3 hours)', 'Severe Crushing & Pricking (Shoola/Gaurava)', 
        'Radiating to left shoulder and jaw', '["Acute Dyspnea / Shwasa Kashtata", "Cold Sweats / Sweda", "Dizziness / Bhrama", "Palpitations"]'::jsonb, 
        'Continuous worsening', 'Lying flat worsens breathlessness, any exertion',
        'Sitting upright slightly relieves breathing', 9, 'Pitta-Vata', 'Pranavaha Sroto Rodha & Hridaya Upadrava', 
        'Vishama Agni', 'Madhyama',
        'Rasa Sara', 'Madhyama', 'Avara', 'Avara', 'Avara', 'Madhyama',
        'Anti-hypertensives (Amlodipine 5mg)', 'Penicillin', 'Prior ECG 6 months ago normal',
        'CRITICAL RED-FLAG ALERT: Acute retrosternal crushing discomfort radiating to left shoulder with diaphoresis, dyspnea, and severity 9/10. High suspicion of acute cardiovascular compromise / severe Pranavaha Srotas obstruction. IMMEDIATE TRIAGE ESCALATION REQUIRED.',
        'Red Flag / Emergency', '["Retrosternal crushing pain", "Radiation to left shoulder and jaw", "Acute severe dyspnea", "Profuse cold diaphoresis", "Pain severity 9/10"]'::jsonb
    ) ON CONFLICT (id) DO NOTHING;

END $$;
