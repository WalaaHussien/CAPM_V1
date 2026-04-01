import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck, FileText, Pill, Activity, MessageSquare,
  CreditCard, Clock, Shield, ArrowRight, User, LogOut,
  Stethoscope, TestTube, Heart, Thermometer, Mail, Lock, Eye, EyeOff
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface Patient {
  id: string;
  patient_id: string;
  name: string;
  date_of_birth: string | null;
  gender: string | null;
  blood_type: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  insurance_provider: string | null;
  insurance_number: string | null;
  allergies: string[] | null;
  chronic_conditions: string[] | null;
  current_medications: string[] | null;
}

interface MedicalRecord {
  id: string;
  title: string;
  record_type: string;
  date: string | null;
  doctor_name: string | null;
  department: string | null;
  description: string | null;
  notes: string | null;
  results: any;
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const MOCK_RECORDS: MedicalRecord[] = [
  {
    id: 'rec-1', title: 'Annual Checkup', record_type: 'visit',
    date: '2026-02-10', doctor_name: 'Dr. Sarah Johnson', department: 'Internal Medicine',
    description: 'Routine annual physical examination',
    notes: 'All vitals normal, continue current medications', results: null,
  },
  {
    id: 'rec-2', title: 'Upcoming Cardiology Appointment', record_type: 'appointment',
    date: '2026-04-15', doctor_name: 'Dr. Mohamed Hassan', department: 'Cardiology',
    description: 'Follow-up for blood pressure management', notes: null, results: null,
  },
  {
    id: 'rec-3', title: 'Complete Blood Count (CBC)', record_type: 'lab_result',
    date: '2026-02-10', doctor_name: 'Dr. Sarah Johnson', department: 'Laboratory',
    description: 'Complete blood count panel',
    notes: 'WBC: 7.2 · RBC: 4.8 · Hgb: 14.2 — All within normal range',
    results: { wbc: '7.2', rbc: '4.8', hgb: '14.2' },
  },
  {
    id: 'rec-4', title: 'Lisinopril Prescription', record_type: 'prescription',
    date: '2026-02-10', doctor_name: 'Dr. Sarah Johnson', department: 'Internal Medicine',
    description: 'Lisinopril 10mg once daily for blood pressure control',
    notes: 'Refill in 3 months', results: null,
  },
];

const buildMockPatient = (name: string, email: string, phone: string): Patient => ({
  id: 'mock-' + Math.random().toString(36).slice(2, 10),
  patient_id: 'PAT-' + Math.random().toString(36).toUpperCase().slice(2, 10),
  name,
  date_of_birth: '1990-05-15',
  gender: 'Male',
  blood_type: 'O+',
  phone,
  email,
  address: '123 Health Street, Cairo, Egypt',
  emergency_contact_name: 'Ahmed Ali',
  emergency_contact_phone: '+20 100 000 0000',
  insurance_provider: 'MedCare Insurance',
  insurance_number: 'MC-2024-00123',
  allergies: ['Penicillin'],
  chronic_conditions: ['Hypertension'],
  current_medications: ['Lisinopril 10mg', 'Aspirin 81mg'],
});

// Mock user store (in-memory, resets on page reload)
const mockUsers: Map<string, { name: string; phone: string; password: string }> = new Map([
  ['demo@hospital.com', { name: 'Demo Patient', phone: '+20 100 000 0000', password: 'demo123' }],
]);
// ──────────────────────────────────────────────────────────────────────────────

const PatientPortalPage: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [showRegister, setShowRegister] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regService, setRegService] = useState('');
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});
  const [showRegPassword, setShowRegPassword] = useState(false);

  const txt = (en: string, ar: string, fr: string) =>
    language === 'ar' ? ar : language === 'fr' ? fr : en;

  const handleLogin = () => {
    setLoginError('');
    setLoading(true);
    // Simulate async
    setTimeout(() => {
      const user = mockUsers.get(emailInput.trim().toLowerCase());
      if (!user || user.password !== passwordInput) {
        setLoginError(txt('Invalid email or password', 'البريد الإلكتروني أو كلمة المرور غير صحيحة', 'E-mail ou mot de passe invalide'));
        setLoading(false);
        return;
      }
      setPatient(buildMockPatient(user.name, emailInput.trim(), user.phone));
      setRecords(MOCK_RECORDS);
      setIsLoggedIn(true);
      setLoading(false);
    }, 600);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPatient(null);
    setRecords([]);
    setEmailInput('');
    setPasswordInput('');
  };

  const validateRegistration = () => {
    const errors: Record<string, string> = {};
    if (!regName.trim()) errors.name = txt('Required', 'مطلوب', 'Requis');
    if (!regEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail))
      errors.email = txt('Invalid email', 'بريد إلكتروني غير صالح', 'E-mail invalide');
    if (!regPassword || regPassword.length < 6)
      errors.password = txt('Minimum 6 characters', 'الحد الأدنى 6 أحرف', 'Minimum 6 caractères');
    if (!regPhone.trim() || !/^[\d+\-() ]{7,}$/.test(regPhone))
      errors.phone = txt('Invalid phone number', 'رقم هاتف غير صالح', 'Téléphone invalide');
    if (!regService) errors.service = txt('Please select', 'يرجى الاختيار', 'Veuillez sélectionner');
    setRegErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = () => {
    if (!validateRegistration()) return;
    setLoading(true);
    setTimeout(() => {
      if (mockUsers.has(regEmail.trim().toLowerCase())) {
        setRegErrors({ email: txt('This email is already registered. Please log in.', 'هذا البريد مسجل بالفعل. يرجى تسجيل الدخول.', 'Cet e-mail est déjà enregistré. Veuillez vous connecter.') });
        setLoading(false);
        return;
      }
      // Save to in-memory store and auto-login
      mockUsers.set(regEmail.trim().toLowerCase(), { name: regName.trim(), phone: regPhone.trim(), password: regPassword });
      setPatient(buildMockPatient(regName.trim(), regEmail.trim(), regPhone.trim()));
      setRecords([]);
      setIsLoggedIn(true);
      setShowRegister(false);
      setLoading(false);
    }, 600);
  };

  const medicalServices = [
    { value: 'cardiology', en: 'Cardiology', ar: 'أمراض القلب', fr: 'Cardiologie' },
    { value: 'neurology', en: 'Neurology', ar: 'أمراض الأعصاب', fr: 'Neurologie' },
    { value: 'orthopedics', en: 'Orthopedics', ar: 'جراحة العظام', fr: 'Orthopédie' },
    { value: 'pediatrics', en: 'Pediatrics', ar: 'طب الأطفال', fr: 'Pédiatrie' },
    { value: 'oncology', en: 'Oncology', ar: 'الأورام', fr: 'Oncologie' },
    { value: 'general', en: 'General Medicine', ar: 'الطب العام', fr: 'Médecine générale' },
    { value: 'surgery', en: 'Surgery', ar: 'الجراحة', fr: 'Chirurgie' },
    { value: 'ophthalmology', en: 'Ophthalmology', ar: 'طب العيون', fr: 'Ophtalmologie' },
    { value: 'ent', en: 'ENT', ar: 'أنف وأذن وحنجرة', fr: 'ORL' },
  ];

  const appointments = records.filter(r => r.record_type === 'appointment');
  const labResults = records.filter(r => r.record_type === 'lab_result' || r.record_type === 'test');
  const prescriptions = records.filter(r => r.record_type === 'prescription');
  const visits = records.filter(r => r.record_type === 'visit' || r.record_type === 'consultation');

  if (!isLoggedIn) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
        <section className="page-hero">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('portal.label')}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4">{t('portal.title')}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/90 max-w-2xl mx-auto">{t('portal.subtitle')}</motion.p>
          </div>
        </section>

        <section className="py-16 -mt-8 relative z-10">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="premium-card p-8 max-w-md mx-auto">

              {/* --- LOGIN VIEW --- */}
              {!showRegister ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-center">
                    {txt('Login to Your Portal', 'تسجيل الدخول إلى بوابتك', 'Connexion à votre portail')}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6 text-center">
                    {txt(
                      'Enter your email and password to access your medical records',
                      'أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى سجلاتك الطبية',
                      'Entrez votre e-mail et mot de passe pour accéder à vos dossiers médicaux'
                    )}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        {txt('Email Address', 'البريد الإلكتروني', 'Adresse e-mail')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="rounded-[8px] pl-10"
                          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        {txt('Password', 'كلمة المرور', 'Mot de passe')}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          className="rounded-[8px] pl-10 pr-10"
                          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {loginError && (
                      <p className="text-destructive text-sm text-center">{loginError}</p>
                    )}

                    <Button
                      onClick={handleLogin}
                      disabled={loading || !emailInput.trim() || !passwordInput}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-[8px]"
                      size="lg"
                    >
                      {loading
                        ? txt('Verifying...', 'جاري التحقق...', 'Vérification...')
                        : txt('Log In', 'تسجيل الدخول', 'Se connecter')}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      {txt("Don't have an account?", 'ليس لديك حساب؟', 'Pas de compte ?')}{' '}
                      <button onClick={() => { setShowRegister(true); setLoginError(''); }} className="text-primary font-semibold hover:underline">
                        {txt('Register Now', 'سجل الآن', 'Inscrivez-vous')}
                      </button>
                    </p>

                    {/* Demo hint */}
                    <div className="rounded-lg bg-muted/60 border border-border px-4 py-3 text-xs text-muted-foreground text-center space-y-0.5">
                      <p className="font-semibold text-foreground">{txt('Demo account', 'حساب تجريبي', 'Compte démo')}</p>
                      <p>demo@hospital.com &nbsp;/&nbsp; demo123</p>
                    </div>
                  </div>
                </>

                /* --- REGISTRATION FORM --- */
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-center">
                    {txt('Create Account', 'إنشاء حساب', 'Créer un compte')}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6 text-center">
                    {txt(
                      'Fill out the form below to register for the patient portal',
                      'أكمل النموذج أدناه للتسجيل في بوابة المريض',
                      'Remplissez le formulaire ci-dessous pour vous inscrire au portail patient'
                    )}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        {txt('Full Name', 'الاسم الكامل', 'Nom complet')} *
                      </label>
                      <Input
                        placeholder={txt('Enter your full name', 'أدخل اسمك الكامل', 'Entrez votre nom complet')}
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className={`rounded-[8px] ${regErrors.name ? 'border-destructive' : ''}`}
                      />
                      {regErrors.name && <p className="text-destructive text-xs mt-1">{regErrors.name}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        {txt('Email Address', 'البريد الإلكتروني', 'Adresse e-mail')} *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className={`rounded-[8px] pl-10 ${regErrors.email ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {regErrors.email && <p className="text-destructive text-xs mt-1">{regErrors.email}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        {txt('Password', 'كلمة المرور', 'Mot de passe')} *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showRegPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className={`rounded-[8px] pl-10 pr-10 ${regErrors.password ? 'border-destructive' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showRegPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {regErrors.password && <p className="text-destructive text-xs mt-1">{regErrors.password}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        {txt('Phone Number', 'رقم الهاتف', 'Numéro de téléphone')} *
                      </label>
                      <Input
                        type="tel"
                        placeholder="+20 xx xxxx xxxx"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className={`rounded-[8px] ${regErrors.phone ? 'border-destructive' : ''}`}
                      />
                      {regErrors.phone && <p className="text-destructive text-xs mt-1">{regErrors.phone}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        {txt('Medical Service', 'الخدمة الطبية', 'Service médical')} *
                      </label>
                      <Select value={regService} onValueChange={setRegService}>
                        <SelectTrigger className={`rounded-[8px] ${regErrors.service ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder={txt('Select service...', 'اختر الخدمة...', 'Sélectionnez...')} />
                        </SelectTrigger>
                        <SelectContent>
                          {medicalServices.map(s => (
                            <SelectItem key={s.value} value={s.value}>
                              {language === 'ar' ? s.ar : language === 'fr' ? s.fr : s.en}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {regErrors.service && <p className="text-destructive text-xs mt-1">{regErrors.service}</p>}
                    </div>
                    <Button
                      onClick={handleRegister}
                      disabled={loading}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-[8px]"
                      size="lg"
                    >
                      {loading
                        ? txt('Registering...', 'جاري التسجيل...', 'Inscription...')
                        : txt('Register', 'تسجيل', "S'inscrire")}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      {txt('Already have an account?', 'لديك حساب بالفعل؟', 'Déjà un compte ?')}{' '}
                      <button onClick={() => { setShowRegister(false); setLoginError(''); }} className="text-primary font-semibold hover:underline">
                        {txt('Log In', 'سجل الدخول', 'Se connecter')}
                      </button>
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </section>
      </motion.div>
    );
  }

  // Dashboard
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <section className="page-hero">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            {t('portal.label')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-4xl font-bold text-white md:text-5xl"
          >
            {t('portal.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-white/90"
          >
            {t('portal.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-2 pt-10 md:pt-12">
        <div className="premium-card flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
              {patient?.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{language === 'ar' ? 'مرحباً،' : 'Welcome,'} {patient?.name}</h2>
              <p className="text-sm text-muted-foreground">{language === 'ar' ? 'رقم المريض:' : 'Patient ID:'} {patient?.patient_id}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="rounded-[8px] border-none bg-destructive text-white hover:bg-destructive/90">
            <LogOut className="mr-2 h-4 w-4" />
            {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-8 pt-6">
        <Tabs defaultValue="overview" dir={isRTL ? 'rtl' : 'ltr'}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
            <TabsTrigger value="overview">{language === 'ar' ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
            <TabsTrigger value="appointments">{language === 'ar' ? 'المواعيد' : 'Appointments'}</TabsTrigger>
            <TabsTrigger value="doctors">{language === 'ar' ? 'الأطباء' : 'Doctors'}</TabsTrigger>
            <TabsTrigger value="results">{language === 'ar' ? 'النتائج' : 'Results'}</TabsTrigger>
            <TabsTrigger value="medications">{language === 'ar' ? 'الأدوية' : 'Medications'}</TabsTrigger>
            <TabsTrigger value="profile">{language === 'ar' ? 'الملف الشخصي' : 'Profile'}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: CalendarCheck, label: language === 'ar' ? 'المواعيد القادمة' : 'Upcoming Appointments', value: appointments.length, color: 'text-primary' },
                { icon: TestTube, label: language === 'ar' ? 'نتائج الفحوصات' : 'Test Results', value: labResults.length, color: 'text-accent' },
                { icon: Pill, label: language === 'ar' ? 'الأدوية الحالية' : 'Current Medications', value: patient?.current_medications?.length || 0, color: 'text-primary' },
                { icon: FileText, label: language === 'ar' ? 'إجمالي السجلات' : 'Total Records', value: records.length, color: 'text-muted-foreground' },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: i * 0.1 }}
                  className="premium-card p-5">
                  <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Patient Info Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="premium-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-destructive" />
                  {language === 'ar' ? 'المعلومات الصحية' : 'Health Information'}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">{language === 'ar' ? 'فصيلة الدم' : 'Blood Type'}</span><span className="font-medium">{patient?.blood_type || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">{language === 'ar' ? 'الحساسية' : 'Allergies'}</span><span className="font-medium">{patient?.allergies?.join(', ') || language === 'ar' ? 'لا يوجد' : 'None'}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">{language === 'ar' ? 'الأمراض المزمنة' : 'Chronic Conditions'}</span><span className="font-medium">{patient?.chronic_conditions?.join(', ') || language === 'ar' ? 'لا يوجد' : 'None'}</span></div>
                </div>
              </div>
              <div className="premium-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  {language === 'ar' ? 'التأمين' : 'Insurance'}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">{language === 'ar' ? 'شركة التأمين' : 'Provider'}</span><span className="font-medium">{patient?.insurance_provider || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">{language === 'ar' ? 'رقم التأمين' : 'Policy Number'}</span><span className="font-medium">{patient?.insurance_number || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">{language === 'ar' ? 'جهة اتصال الطوارئ' : 'Emergency Contact'}</span><span className="font-medium">{patient?.emergency_contact_name || '—'}</span></div>
                </div>
              </div>
            </div>

            {/* Recent Records */}
            {records.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4">{language === 'ar' ? 'أحدث السجلات' : 'Recent Records'}</h3>
                <div className="space-y-3">
                  {records.slice(0, 5).map(record => (
                    <div key={record.id} className="premium-card p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-accent" />
                        <div>
                          <p className="font-medium text-sm">{record.title}</p>
                          <p className="text-xs text-muted-foreground">{record.doctor_name} • {record.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">{record.record_type}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{record.date ? new Date(record.date).toLocaleDateString() : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <h3 className="text-lg font-semibold mb-4">{language === 'ar' ? 'المواعيد' : 'Appointments'}</h3>
            {appointments.length > 0 ? appointments.map(apt => (
              <div key={apt.id} className="premium-card p-5 mb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{apt.title}</p>
                    <p className="text-sm text-muted-foreground">{apt.doctor_name} — {apt.department}</p>
                    <p className="text-sm text-muted-foreground">{apt.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{apt.date ? new Date(apt.date).toLocaleDateString() : ''}</p>
                    <Badge className="mt-1">{language === 'ar' ? 'مؤكد' : 'Confirmed'}</Badge>
                  </div>
                </div>
              </div>
            )) : <p className="text-muted-foreground text-center py-10">{language === 'ar' ? 'لا توجد مواعيد' : 'No appointments found'}</p>}
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors">
            <h3 className="text-lg font-semibold mb-4">{language === 'ar' ? 'أطبائك' : 'Your Doctors'}</h3>
            {(() => {
              const doctors = [...new Set(records.filter(r => r.doctor_name).map(r => JSON.stringify({ name: r.doctor_name, dept: r.department })))].map(s => JSON.parse(s));
              return doctors.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {doctors.map((doc, i) => (
                    <div key={i} className="premium-card p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.dept}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-muted-foreground text-center py-10">{language === 'ar' ? 'لا يوجد أطباء مسجلون' : 'No doctors on record'}</p>;
            })()}
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            <h3 className="text-lg font-semibold mb-4">{language === 'ar' ? 'نتائج الفحوصات' : 'Test Results'}</h3>
            {labResults.length > 0 ? labResults.map(result => (
              <div key={result.id} className="premium-card p-5 mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{result.title}</p>
                    <p className="text-sm text-muted-foreground">{result.doctor_name} — {result.department}</p>
                    {result.description && <p className="text-sm mt-2">{result.description}</p>}
                    {result.notes && <p className="text-xs text-muted-foreground mt-1 italic">{result.notes}</p>}
                  </div>
                  <p className="text-xs text-muted-foreground">{result.date ? new Date(result.date).toLocaleDateString() : ''}</p>
                </div>
              </div>
            )) : <p className="text-muted-foreground text-center py-10">{language === 'ar' ? 'لا توجد نتائج فحوصات' : 'No test results found'}</p>}
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications">
            <h3 className="text-lg font-semibold mb-4">{language === 'ar' ? 'الأدوية الحالية' : 'Current Medications'}</h3>
            {patient?.current_medications && patient.current_medications.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {patient.current_medications.map((med, i) => (
                  <div key={i} className="premium-card p-4 flex items-center gap-3">
                    <Pill className="w-5 h-5 text-accent" />
                    <span className="font-medium text-sm">{med}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-muted-foreground text-center py-10">{language === 'ar' ? 'لا توجد أدوية مسجلة' : 'No medications on record'}</p>}

            {/* Prescriptions */}
            {prescriptions.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">{language === 'ar' ? 'الوصفات الطبية' : 'Prescriptions'}</h3>
                {prescriptions.map(rx => (
                  <div key={rx.id} className="premium-card p-5 mb-3">
                    <p className="font-semibold">{rx.title}</p>
                    <p className="text-sm text-muted-foreground">{rx.doctor_name} • {rx.date ? new Date(rx.date).toLocaleDateString() : ''}</p>
                    {rx.description && <p className="text-sm mt-1">{rx.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="premium-card p-8 max-w-2xl">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {language === 'ar' ? 'الملف الشخصي' : 'Personal Profile'}
              </h3>
              <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                {[
                  [language === 'ar' ? 'الاسم' : 'Name', patient?.name],
                  [language === 'ar' ? 'رقم المريض' : 'Patient ID', patient?.patient_id],
                  [language === 'ar' ? 'تاريخ الميلاد' : 'Date of Birth', patient?.date_of_birth],
                  [language === 'ar' ? 'الجنس' : 'Gender', patient?.gender],
                  [language === 'ar' ? 'فصيلة الدم' : 'Blood Type', patient?.blood_type],
                  [language === 'ar' ? 'الهاتف' : 'Phone', patient?.phone],
                  [language === 'ar' ? 'البريد الإلكتروني' : 'Email', patient?.email],
                  [language === 'ar' ? 'العنوان' : 'Address', patient?.address],
                  [language === 'ar' ? 'شركة التأمين' : 'Insurance Provider', patient?.insurance_provider],
                  [language === 'ar' ? 'رقم التأمين' : 'Insurance Number', patient?.insurance_number],
                  [language === 'ar' ? 'جهة اتصال الطوارئ' : 'Emergency Contact', patient?.emergency_contact_name],
                  [language === 'ar' ? 'هاتف الطوارئ' : 'Emergency Phone', patient?.emergency_contact_phone],
                ].map(([label, value], i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-muted-foreground text-xs">{label}</span>
                    <span className="font-medium">{value || '—'}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </motion.div>
  );
};

export default PatientPortalPage;
