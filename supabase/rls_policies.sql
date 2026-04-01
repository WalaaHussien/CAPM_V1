-- ================================================================
-- Patient Portal — Custom Auth via PostgreSQL RPC
-- Paste this ENTIRE script into Supabase SQL Editor and click RUN
-- Dashboard: https://supabase.com/dashboard/project/schibsibupltlhbylmws/sql/new
-- ================================================================

-- ========================
-- STEP 1: Enable pgcrypto for bcrypt password hashing
-- ========================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ========================
-- STEP 2: Add password_hash + session_token columns to patients
-- ========================
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS session_token UUID;

-- ========================
-- STEP 3: Register Patient RPC
-- Called from client: supabase.rpc('register_patient', {...})
-- ========================
CREATE OR REPLACE FUNCTION public.register_patient(
  p_name TEXT,
  p_email TEXT,
  p_password TEXT,
  p_phone TEXT
) RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  v_id UUID;
  v_patient_id TEXT;
  v_session UUID;
BEGIN
  -- Check if email already exists
  IF EXISTS (SELECT 1 FROM public.patients WHERE LOWER(email) = LOWER(p_email) AND password_hash IS NOT NULL) THEN
    RETURN json_build_object('success', false, 'error', 'EMAIL_EXISTS');
  END IF;

  v_id := gen_random_uuid();
  v_patient_id := 'PAT-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
  v_session := gen_random_uuid();

  INSERT INTO public.patients (id, patient_id, name, email, phone, password_hash, session_token)
  VALUES (v_id, v_patient_id, TRIM(p_name), LOWER(TRIM(p_email)), TRIM(p_phone), crypt(p_password, gen_salt('bf')), v_session);

  RETURN json_build_object(
    'success', true,
    'session_token', v_session,
    'patient', json_build_object(
      'id', v_id,
      'patient_id', v_patient_id,
      'name', TRIM(p_name),
      'email', LOWER(TRIM(p_email)),
      'phone', TRIM(p_phone)
    )
  );
END;
$$;

-- ========================
-- STEP 4: Login Patient RPC
-- Called from client: supabase.rpc('login_patient', {...})
-- ========================
CREATE OR REPLACE FUNCTION public.login_patient(
  p_email TEXT,
  p_password TEXT
) RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  v_patient RECORD;
  v_session UUID;
  v_records JSON;
BEGIN
  SELECT * INTO v_patient
  FROM public.patients
  WHERE LOWER(email) = LOWER(TRIM(p_email))
    AND password_hash IS NOT NULL
    AND password_hash = crypt(p_password, password_hash);

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'INVALID_CREDENTIALS');
  END IF;

  -- Generate new session token
  v_session := gen_random_uuid();
  UPDATE public.patients SET session_token = v_session WHERE id = v_patient.id;

  -- Get medical records
  SELECT COALESCE(json_agg(
    json_build_object(
      'id', r.id, 'title', r.title, 'record_type', r.record_type,
      'date', r.date, 'doctor_name', r.doctor_name, 'department', r.department,
      'description', r.description, 'notes', r.notes, 'results', r.results
    ) ORDER BY r.date DESC
  ), '[]'::json)
  INTO v_records
  FROM public.medical_records r
  WHERE r.patient_id = v_patient.id;

  RETURN json_build_object(
    'success', true,
    'session_token', v_session,
    'patient', json_build_object(
      'id', v_patient.id, 'patient_id', v_patient.patient_id,
      'name', v_patient.name, 'email', v_patient.email, 'phone', v_patient.phone,
      'date_of_birth', v_patient.date_of_birth, 'gender', v_patient.gender,
      'blood_type', v_patient.blood_type, 'address', v_patient.address,
      'emergency_contact_name', v_patient.emergency_contact_name,
      'emergency_contact_phone', v_patient.emergency_contact_phone,
      'insurance_provider', v_patient.insurance_provider,
      'insurance_number', v_patient.insurance_number,
      'allergies', v_patient.allergies, 'chronic_conditions', v_patient.chronic_conditions,
      'current_medications', v_patient.current_medications
    ),
    'records', v_records
  );
END;
$$;

-- ========================
-- STEP 5: Restore Session RPC (page refresh)
-- Called from client: supabase.rpc('restore_session', {...})
-- ========================
CREATE OR REPLACE FUNCTION public.restore_session(
  p_patient_id UUID,
  p_session_token UUID
) RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  v_patient RECORD;
  v_records JSON;
BEGIN
  SELECT * INTO v_patient
  FROM public.patients
  WHERE id = p_patient_id AND session_token = p_session_token;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false);
  END IF;

  SELECT COALESCE(json_agg(
    json_build_object(
      'id', r.id, 'title', r.title, 'record_type', r.record_type,
      'date', r.date, 'doctor_name', r.doctor_name, 'department', r.department,
      'description', r.description, 'notes', r.notes, 'results', r.results
    ) ORDER BY r.date DESC
  ), '[]'::json)
  INTO v_records
  FROM public.medical_records r
  WHERE r.patient_id = v_patient.id;

  RETURN json_build_object(
    'success', true,
    'patient', json_build_object(
      'id', v_patient.id, 'patient_id', v_patient.patient_id,
      'name', v_patient.name, 'email', v_patient.email, 'phone', v_patient.phone,
      'date_of_birth', v_patient.date_of_birth, 'gender', v_patient.gender,
      'blood_type', v_patient.blood_type, 'address', v_patient.address,
      'emergency_contact_name', v_patient.emergency_contact_name,
      'emergency_contact_phone', v_patient.emergency_contact_phone,
      'insurance_provider', v_patient.insurance_provider,
      'insurance_number', v_patient.insurance_number,
      'allergies', v_patient.allergies, 'chronic_conditions', v_patient.chronic_conditions,
      'current_medications', v_patient.current_medications
    ),
    'records', v_records
  );
END;
$$;

-- ========================
-- STEP 6: Grant execute to anon role (PostgREST)
-- ========================
GRANT EXECUTE ON FUNCTION public.register_patient(TEXT, TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.login_patient(TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.restore_session(UUID, UUID) TO anon;

-- ========================
-- DONE! No Supabase Auth needed.
-- Registration + Login via bcrypt-secured RPC functions.
-- Session tokens for session persistence.
-- ================================================================
-- Click Save

-- ========================
-- STEP 7: Newsletter Subscribers Table
-- ========================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT newsletter_subscribers_email_key UNIQUE (email)
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON public.newsletter_subscribers
  FOR INSERT TO anon WITH CHECK (true);

GRANT INSERT ON public.newsletter_subscribers TO anon;
