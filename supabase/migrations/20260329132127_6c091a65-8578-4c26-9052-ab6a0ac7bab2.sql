
CREATE TABLE public.patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id text UNIQUE NOT NULL,
  name text NOT NULL,
  date_of_birth date,
  gender text,
  blood_type text,
  phone text,
  email text,
  address text,
  emergency_contact_name text,
  emergency_contact_phone text,
  insurance_provider text,
  insurance_number text,
  allergies text[],
  chronic_conditions text[],
  current_medications text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.medical_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  record_type text NOT NULL,
  title text NOT NULL,
  description text,
  doctor_name text,
  department text,
  date timestamptz DEFAULT now(),
  results jsonb,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public patient lookup" ON public.patients
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public medical records read" ON public.medical_records
  FOR SELECT TO anon, authenticated
  USING (true);
