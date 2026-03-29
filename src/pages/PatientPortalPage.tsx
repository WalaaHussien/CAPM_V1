import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarCheck, FileText, Pill, Activity, MessageSquare,
  CreditCard, Clock, Shield, ArrowRight, User, LogOut,
  Heart, Droplets, Phone, Mail, MapPin, AlertTriangle,
  Stethoscope, FlaskConical, Syringe, ScanLine, ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

type Patient = {
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
};

type MedicalRecord = {
  id: string;
  record_type: string;
  title: string;
  description: string | null;
  doctor_name: string | null;
  department: string | null;
  date: string;
  notes: string | null;
};

const recordTypeIcons: Record<string, React.ElementType> = {
  visit: Stethoscope,
  lab: FlaskConical,
  prescription: Pill,
  surgery: Syringe,
  imaging: ScanLine,
};

const recordTypeColors: Record<string, string> = {
  visit: 'bg-primary/10 text-primary',
  lab: 'bg-accent/10 text-accent',
  prescription: 'bg-secondary/10 text-secondary',
  surgery: 'bg-destructive/10 text-destructive',
  imaging: 'bg-muted text-muted-foreground',
};

const PatientPortalPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [patientIdInput, setPatientIdInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('patient_id', patientIdInput.trim().toUpperCase())
        .ilike('name', nameInput.trim())
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast({ title: 'Access Denied', description: 'Invalid Patient ID or name. Please try again.', variant: 'destructive' });
        setIsLoading(false);
        return;
      }

      setPatient(data as Patient);

      const { data: recordsData } = await supabase
        .from('medical_records')
        .select('*')
        .eq('patient_id', data.id)
        .order('date', { ascending: false });

      setRecords((recordsData || []) as MedicalRecord[]);
    } catch {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    setPatient(null);
    setRecords([]);
    setPatientIdInput('');
    setNameInput('');
    setActiveTab('overview');
  };

  const portalFeatures = [
    { icon: CalendarCheck, key: 'appointments' },
    { icon: FileText, key: 'records' },
    { icon: Pill, key: 'prescriptions' },
    { icon: Activity, key: 'results' },
    { icon: MessageSquare, key: 'messaging' },
    { icon: CreditCard, key: 'billing' },
    { icon: Clock, key: 'history' },
    { icon: Shield, key: 'insurance' },
  ];

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'records', label: 'Medical Records' },
    { key: 'medications', label: 'Medications' },
  ];

  if (patient) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
        <Header />
        <section className="page-hero !py-10">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Welcome back,</p>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{patient.name}</h1>
                <p className="text-white/50 text-xs mt-1">Patient ID: {patient.patient_id}</p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="border-white/20 text-white hover:bg-white/10">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 -mt-6 relative z-10">
          {/* Tabs */}
          <div className="flex gap-1 bg-card rounded-t-xl border border-border p-1 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-card border border-t-0 border-border rounded-b-xl p-6 mb-10">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Patient Info */}
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h3 className="font-semibold text-base mb-4 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Personal Information</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[
                            { label: 'Date of Birth', value: patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString() : 'N/A' },
                            { label: 'Gender', value: patient.gender || 'N/A' },
                            { label: 'Blood Type', value: patient.blood_type || 'N/A', icon: Droplets },
                            { label: 'Phone', value: patient.phone || 'N/A', icon: Phone },
                            { label: 'Email', value: patient.email || 'N/A', icon: Mail },
                            { label: 'Address', value: patient.address || 'N/A', icon: MapPin },
                          ].map((item, i) => (
                            <div key={i} className="bg-muted/50 rounded-lg p-3">
                              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                              <p className="text-sm font-medium">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-base mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-destructive" /> Emergency Contact</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-destructive/5 border border-destructive/10 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Contact Name</p>
                            <p className="text-sm font-medium">{patient.emergency_contact_name || 'N/A'}</p>
                          </div>
                          <div className="bg-destructive/5 border border-destructive/10 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Contact Phone</p>
                            <p className="text-sm font-medium">{patient.emergency_contact_phone || 'N/A'}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-base mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Insurance</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-accent/5 border border-accent/10 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Provider</p>
                            <p className="text-sm font-medium">{patient.insurance_provider || 'N/A'}</p>
                          </div>
                          <div className="bg-accent/5 border border-accent/10 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground mb-1">Policy Number</p>
                            <p className="text-sm font-medium">{patient.insurance_number || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                      <div className="bg-destructive/5 border border-destructive/10 rounded-xl p-4">
                        <h4 className="font-semibold text-sm mb-3 text-destructive flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Allergies</h4>
                        {patient.allergies && patient.allergies.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {patient.allergies.map((a, i) => <Badge key={i} variant="destructive" className="text-xs">{a}</Badge>)}
                          </div>
                        ) : <p className="text-xs text-muted-foreground">No known allergies</p>}
                      </div>

                      <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                        <h4 className="font-semibold text-sm mb-3 text-primary flex items-center gap-2"><Heart className="w-4 h-4" /> Chronic Conditions</h4>
                        {patient.chronic_conditions && patient.chronic_conditions.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {patient.chronic_conditions.map((c, i) => <Badge key={i} variant="outline" className="text-xs border-primary/30 text-primary">{c}</Badge>)}
                          </div>
                        ) : <p className="text-xs text-muted-foreground">None reported</p>}
                      </div>

                      <div className="bg-accent/5 border border-accent/10 rounded-xl p-4">
                        <h4 className="font-semibold text-sm mb-3 text-accent flex items-center gap-2"><Pill className="w-4 h-4" /> Current Medications</h4>
                        {patient.current_medications && patient.current_medications.length > 0 ? (
                          <ul className="space-y-2">
                            {patient.current_medications.map((m, i) => (
                              <li key={i} className="text-xs flex items-center gap-2"><ChevronRight className="w-3 h-3 text-accent" /> {m}</li>
                            ))}
                          </ul>
                        ) : <p className="text-xs text-muted-foreground">No current medications</p>}
                      </div>

                      <div className="bg-muted/50 rounded-xl p-4">
                        <h4 className="font-semibold text-sm mb-2">Recent Activity</h4>
                        <p className="text-xs text-muted-foreground">{records.length} medical records on file</p>
                        <p className="text-xs text-muted-foreground mt-1">Last visit: {records.length > 0 ? new Date(records[0].date).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'records' && (
                <motion.div key="records" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="font-semibold text-base mb-4">Medical Records</h3>
                  {records.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No medical records found.</p>
                  ) : (
                    <div className="space-y-3">
                      {records.map(record => {
                        const Icon = recordTypeIcons[record.record_type] || FileText;
                        const colorClass = recordTypeColors[record.record_type] || 'bg-muted text-muted-foreground';
                        return (
                          <div key={record.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium text-sm">{record.title}</h4>
                                  <Badge variant="outline" className="text-[10px] capitalize">{record.record_type}</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mb-2">{record.description}</p>
                                <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                                  {record.doctor_name && <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3" />{record.doctor_name}</span>}
                                  {record.department && <span>{record.department}</span>}
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(record.date).toLocaleDateString()}</span>
                                </div>
                                {record.notes && (
                                  <div className="mt-2 bg-muted/50 rounded p-2">
                                    <p className="text-xs text-muted-foreground"><span className="font-medium">Notes:</span> {record.notes}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'medications' && (
                <motion.div key="medications" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="font-semibold text-base mb-4">Current Medications</h3>
                  {patient.current_medications && patient.current_medications.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {patient.current_medications.map((med, i) => (
                        <div key={i} className="border border-border rounded-lg p-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <Pill className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{med}</p>
                            <p className="text-xs text-muted-foreground">Active prescription</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-muted-foreground text-sm">No current medications.</p>}

                  <h3 className="font-semibold text-base mb-4 mt-8">Prescription History</h3>
                  {records.filter(r => r.record_type === 'prescription').length > 0 ? (
                    <div className="space-y-3">
                      {records.filter(r => r.record_type === 'prescription').map(rec => (
                        <div key={rec.id} className="border border-border rounded-lg p-4">
                          <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                          <p className="text-xs text-muted-foreground">{rec.description}</p>
                          <p className="text-[11px] text-muted-foreground mt-2">{rec.doctor_name} — {new Date(rec.date).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-muted-foreground text-sm">No prescription records found.</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <Footer />
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />

      <section className="page-hero">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('portal.label')}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4">{t('portal.title')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto">{t('portal.subtitle')}</motion.p>
        </div>
      </section>

      {/* Login Form */}
      <section className="py-10 -mt-8 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="premium-card p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-center">{t('portal.access.title')}</h2>
            <p className="text-muted-foreground text-sm mb-6 text-center">Enter your Patient ID and name to access your medical profile</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="patientId" className="text-sm">Patient ID</Label>
                <Input id="patientId" placeholder="e.g. PAT-001" value={patientIdInput}
                  onChange={e => setPatientIdInput(e.target.value)} required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="patientName" className="text-sm">Full Name</Label>
                <Input id="patientName" placeholder="e.g. Ahmed Hassan" value={nameInput}
                  onChange={e => setNameInput(e.target.value)} required className="mt-1" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-[8px]" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Access My Profile'}
              </Button>
            </form>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-[11px] text-muted-foreground text-center">
                <strong>Demo credentials:</strong> Patient ID: PAT-001, Name: Ahmed Hassan
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="section-title">{t('portal.features.title')}</h2>
            <p className="section-subtitle">{t('portal.features.subtitle')}</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {portalFeatures.map((feature) => (
              <motion.div key={feature.key} variants={fadeUp} whileHover={{ y: -4 }}
                className="group premium-card p-6 cursor-pointer text-center">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{t(`portal.feature.${feature.key}.title`)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(`portal.feature.${feature.key}.desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[hsl(200,90%,14%)] rounded-xl p-10 md:p-14 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">{t('portal.cta.title')}</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">{t('portal.cta.desc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-[8px]">
                  {t('portal.cta.contact')}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default PatientPortalPage;
