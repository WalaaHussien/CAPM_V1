import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Phone, Calendar, Stethoscope, Users, Award,
  GraduationCap, Globe, Heart, Brain, Bone, Eye,
  Baby, Activity, Microscope, Scissors, Wind, Smile,
  Shield, Zap, FlaskConical, Dna
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

interface Specialty {
  icon: React.ElementType;
  color: string;
  image: string;
  teamSize: string;
  fellowships: string;
  name_en: string; name_ar: string; name_fr: string;
  desc_en: string; desc_ar: string; desc_fr: string;
  highlights_en: string[]; highlights_ar: string[]; highlights_fr: string[];
}

const specialties: Specialty[] = [
  {
    icon: Heart, color: 'from-accent to-[hsl(40,85%,35%)]',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600&h=400',
    teamSize: '45+', fellowships: '12',
    name_en: 'Cardiology', name_ar: 'أمراض القلب والأوعية الدموية', name_fr: 'Cardiologie',
    desc_en: 'Comprehensive cardiac care from diagnosis through advanced intervention and rehabilitation.',
    desc_ar: 'رعاية قلبية شاملة من التشخيص إلى التدخل المتقدم وإعادة التأهيل.',
    desc_fr: 'Soins cardiaques complets du diagnostic à l\'intervention avancée et à la réhabilitation.',
    highlights_en: ['Interventional Cardiology', 'Electrophysiology', 'Heart Surgery', 'Cardiac Rehab'],
    highlights_ar: ['قسطرة القلب', 'الفيزيولوجيا الكهربية', 'جراحة القلب', 'تأهيل قلبي'],
    highlights_fr: ['Cardiologie interventionnelle', 'Électrophysiologie', 'Chirurgie cardiaque', 'Réhabilitation'],
  },
  {
    icon: Brain, color: 'from-primary to-[hsl(193,100%,33%)]',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600&h=400',
    teamSize: '38+', fellowships: '10',
    name_en: 'Neurology & Neurosurgery', name_ar: 'الأعصاب وجراحة المخ والأعصاب', name_fr: 'Neurologie & Neurochirurgie',
    desc_en: 'Expert neurological care covering the full spectrum of brain, spine, and nervous system conditions.',
    desc_ar: 'رعاية عصبية متخصصة تغطي أمراض المخ والعمود الفقري والجهاز العصبي.',
    desc_fr: 'Soins neurologiques experts couvrant les maladies du cerveau, de la colonne vertébrale et du système nerveux.',
    highlights_en: ['Stroke Center', 'Epilepsy', 'Brain Tumor Surgery', 'Spine Surgery'],
    highlights_ar: ['مركز السكتة الدماغية', 'الصرع', 'جراحة أورام المخ', 'جراحة العمود الفقري'],
    highlights_fr: ['Centre AVC', 'Épilepsie', 'Tumeurs cérébrales', 'Chirurgie spinale'],
  },
  {
    icon: Bone, color: 'from-primary to-[hsl(193,100%,33%)]',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600&h=400',
    teamSize: '52+', fellowships: '15',
    name_en: 'Orthopedics & Sports Medicine', name_ar: 'العظام وطب الرياضة', name_fr: 'Orthopédie & Médecine du Sport',
    desc_en: 'Advanced orthopedic care for bones, joints, and muscles with minimally invasive techniques.',
    desc_ar: 'رعاية عظام متقدمة للعظام والمفاصل والعضلات باستخدام تقنيات طفيفة التوغل.',
    desc_fr: 'Soins orthopédiques avancés pour les os, articulations et muscles avec des techniques mini-invasives.',
    highlights_en: ['Joint Replacement', 'Arthroscopy', 'Spine Disorders', 'Sports Injury Rehab'],
    highlights_ar: ['تبديل المفاصل', 'تنظير المفاصل', 'أمراض العمود الفقري', 'تأهيل الرياضة'],
    highlights_fr: ['Remplacement articulaire', 'Arthroscopie', 'Troubles spinaux', 'Rééducation sportive'],
  },
  {
    icon: Baby, color: 'from-primary to-[hsl(193,100%,33%)]',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=600&h=400',
    teamSize: '60+', fellowships: '18',
    name_en: 'Women & Children', name_ar: 'صحة المرأة والأطفال', name_fr: 'Femmes & Enfants',
    desc_en: 'Specialized care for women\'s health, maternity, and pediatric services in a nurturing environment.',
    desc_ar: 'رعاية متخصصة لصحة المرأة والأمومة وخدمات طب الأطفال في بيئة داعمة.',
    desc_fr: 'Soins spécialisés pour la santé des femmes, maternité et services pédiatriques.',
    highlights_en: ['High-Risk Pregnancy', 'NICU', 'Pediatric Surgery', 'Women\'s Oncology'],
    highlights_ar: ['الحمل عالي الخطورة', 'حضانات المواليد', 'جراحة الأطفال', 'أورام المرأة'],
    highlights_fr: ['Grossesse à risque', 'NICU', 'Chirurgie pédiatrique', 'Oncologie féminine'],
  },
  {
    icon: Microscope, color: 'from-primary to-[hsl(193,100%,33%)]',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400',
    teamSize: '70+', fellowships: '20',
    name_en: 'Oncology & Cancer Care', name_ar: 'الأورام وعلاج السرطان', name_fr: 'Oncologie & Soins du Cancer',
    desc_en: 'Multidisciplinary cancer care integrating the latest in diagnosis, surgery, chemotherapy and radiotherapy.',
    desc_ar: 'رعاية متعددة التخصصات تدمج أحدث تقنيات التشخيص والجراحة والكيماوي والإشعاعي.',
    desc_fr: 'Soins oncologiques multidisciplinaires intégrant les dernières avancées en diagnostic et traitement.',
    highlights_en: ['Medical Oncology', 'Radiation Therapy', 'Surgical Oncology', 'Palliative Care'],
    highlights_ar: ['الأورام الطبية', 'العلاج الإشعاعي', 'الجراحة الأورامية', 'الرعاية التلطيفية'],
    highlights_fr: ['Oncologie médicale', 'Radiothérapie', 'Oncologie chirurgicale', 'Soins palliatifs'],
  },
  {
    icon: Eye, color: 'from-primary to-[hsl(193,100%,33%)]',
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=600&h=400',
    teamSize: '25+', fellowships: '8',
    name_en: 'Ophthalmology', name_ar: 'طب وجراحة العيون', name_fr: 'Ophtalmologie',
    desc_en: 'Full-service eye care from routine exams to complex vitreoretinal surgery and corneal transplants.',
    desc_ar: 'رعاية شاملة للعيون من الفحوصات الروتينية إلى جراحة الشبكية وزراعة القرنية.',
    desc_fr: 'Soins oculaires complets des examens de routine aux chirurgies vitréo-rétiniennes complexes.',
    highlights_en: ['LASIK Surgery', 'Retinal Surgery', 'Cataract Surgery', 'Glaucoma Treatment'],
    highlights_ar: ['جراحة الليزك', 'جراحة الشبكية', 'عمليات المياه البيضاء', 'علاج الجلوكوما'],
    highlights_fr: ['Chirurgie LASIK', 'Chirurgie rétinienne', 'Chirurgie cataracte', 'Glaucome'],
  },
  {
    icon: Activity, color: 'from-primary to-[hsl(193,100%,33%)]',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600&h=400',
    teamSize: '55+', fellowships: '14',
    name_en: 'Internal Medicine', name_ar: 'الطب الباطني', name_fr: 'Médecine Interne',
    desc_en: 'Comprehensive adult medicine managing complex multi-system diseases with a patient-centered approach.',
    desc_ar: 'طب شامل للبالغين لإدارة الأمراض المعقدة بنهج يركز على المريض.',
    desc_fr: 'Médecine adulte complète pour la gestion des maladies complexes multi-systémiques.',
    highlights_en: ['Endocrinology & Diabetes', 'Gastroenterology', 'Rheumatology', 'Nephrology'],
    highlights_ar: ['الغدد الصماء والسكري', 'أمراض الجهاز الهضمي', 'الروماتيزم', 'أمراض الكلى'],
    highlights_fr: ['Endocrinologie', 'Gastroentérologie', 'Rhumatologie', 'Néphrologie'],
  },
  {
    icon: Scissors, color: 'from-primary to-[hsl(193,100%,33%)]',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80&w=600&h=400',
    teamSize: '48+', fellowships: '16',
    name_en: 'Surgery & Minimally Invasive', name_ar: 'الجراحة العامة وطفيفة التوغل', name_fr: 'Chirurgie Générale & Mini-Invasive',
    desc_en: 'Advanced surgical expertise using robotic and laparoscopic techniques for faster recovery.',
    desc_ar: 'خبرة جراحية متقدمة باستخدام تقنيات الروبوت والمنظار لتعافي أسرع.',
    desc_fr: 'Expertise chirurgicale avancée utilisant des techniques robotiques et laparoscopiques.',
    highlights_en: ['Robotic Surgery', 'Laparoscopy', 'Bariatric Surgery', 'Transplant Surgery'],
    highlights_ar: ['الجراحة الروبوتية', 'المنظار', 'جراحة السمنة', 'جراحة الزراعة'],
    highlights_fr: ['Chirurgie robotique', 'Laparoscopie', 'Chirurgie bariatrique', 'Transplantation'],
  },
  {
    icon: Wind, color: 'from-primary to-[hsl(193,100%,33%)]',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=600&h=400',
    teamSize: '30+', fellowships: '9',
    name_en: 'Pulmonology & Chest', name_ar: 'أمراض الصدر والتنفس', name_fr: 'Pneumologie',
    desc_en: 'Specialist care for respiratory conditions, lung disease, and sleep disorders.',
    desc_ar: 'رعاية متخصصة للأمراض التنفسية وأمراض الرئة واضطرابات النوم.',
    desc_fr: 'Soins spécialisés pour les maladies respiratoires et les troubles du sommeil.',
    highlights_en: ['Asthma & COPD', 'Bronchoscopy', 'Sleep Studies', 'Pulmonary Rehab'],
    highlights_ar: ['الربو وأمراض الرئة', 'تنظير القصبات', 'دراسات النوم', 'تأهيل رئوي'],
    highlights_fr: ['Asthme & BPCO', 'Bronchoscopie', 'Études du sommeil', 'Réhabilitation'],
  },
  {
    icon: Smile, color: 'from-primary to-[hsl(193,100%,33%)]',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600&h=400',
    teamSize: '35+', fellowships: '11',
    name_en: 'Dentistry & Maxillofacial', name_ar: 'طب الأسنان وجراحة الفك والوجه', name_fr: 'Dentisterie & Maxillo-Faciale',
    desc_en: 'Comprehensive dental and maxillofacial services from preventive care to complex reconstructive surgery.',
    desc_ar: 'خدمات أسنان وجراحة فك شاملة من الرعاية الوقائية إلى الجراحة التجميلية.',
    desc_fr: 'Services dentaires et maxillo-faciaux complets des soins préventifs à la chirurgie reconstructive.',
    highlights_en: ['Dental Implants', 'Orthodontics', 'Oral Surgery', 'Cosmetic Dentistry'],
    highlights_ar: ['زراعة الأسنان', 'تقويم الأسنان', 'جراحة الفم', 'تجميل الأسنان'],
    highlights_fr: ['Implants dentaires', 'Orthodontie', 'Chirurgie buccale', 'Dentisterie esthétique'],
  },
  {
    icon: Shield, color: 'from-accent to-[hsl(40,85%,33%)]',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=600&h=400',
    teamSize: '40+', fellowships: '10',
    name_en: 'Emergency & Trauma', name_ar: 'الطوارئ والحوادث', name_fr: 'Urgences & Traumatologie',
    desc_en: '24/7 emergency and trauma services with state-of-the-art resuscitation and critical care.',
    desc_ar: 'خدمات طوارئ على مدار الساعة مع أحدث مرافق الإنعاش والرعاية الحرجة.',
    desc_fr: 'Services d\'urgence 24h/24 avec des installations de réanimation de pointe.',
    highlights_en: ['Level 1 Trauma', 'Resuscitation', 'Critical Care ICU', 'Rapid Response'],
    highlights_ar: ['مركز صدمات', 'الإنعاش', 'العناية المركزة', 'استجابة سريعة'],
    highlights_fr: ['Traumatologie Niv. 1', 'Réanimation', 'Soins intensifs', 'Réponse rapide'],
  },
  {
    icon: Dna, color: 'from-primary to-[hsl(193,100%,33%)]',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600&h=400',
    teamSize: '28+', fellowships: '12',
    name_en: 'Precision Medicine & Genetics', name_ar: 'الطب الدقيق والجينات', name_fr: 'Médecine de Précision & Génétique',
    desc_en: 'Personalized treatment plans based on your unique genetic profile and biomarkers.',
    desc_ar: 'خطط علاجية شخصية مبنية على ملفك الجيني الفريد ومؤشراتك الحيوية.',
    desc_fr: 'Plans de traitement personnalisés basés sur votre profil génétique unique.',
    highlights_en: ['Genomic Testing', 'Targeted Therapy', 'Molecular Diagnostics', 'Personalized Oncology'],
    highlights_ar: ['الاختبارات الجينومية', 'العلاج الموجه', 'التشخيص الجزيئي', 'أورام شخصية'],
    highlights_fr: ['Tests génomiques', 'Thérapie ciblée', 'Diagnostics moléculaires', 'Oncologie personnalisée'],
  },
];

const DoctorsPage: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const txt = (en: string, ar: string, fr: string) =>
    language === 'ar' ? ar : language === 'fr' ? fr : en;

  const teamHighlights = [
    { icon: Users, value: '500+', labelEn: 'Medical Professionals', labelAr: 'متخصص طبي', labelFr: 'Professionnels médicaux' },
    { icon: Award, value: '100+', labelEn: 'Board-Certified Specialists', labelAr: 'أخصائي معتمد', labelFr: 'Spécialistes certifiés' },
    { icon: GraduationCap, value: '50+', labelEn: 'International Fellowships', labelAr: 'زمالة دولية', labelFr: 'Bourses internationales' },
    { icon: Globe, value: '20+', labelEn: 'Languages Spoken', labelAr: 'لغة متحدثة', labelFr: 'Langues parlées' },
  ];

  const filtered = specialties.filter((s) => {
    const name = language === 'ar' ? s.name_ar : language === 'fr' ? s.name_fr : s.name_en;
    const desc = language === 'ar' ? s.desc_ar : language === 'fr' ? s.desc_fr : s.desc_en;
    const q = searchQuery.toLowerCase();
    return !q || name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">

      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('misc.expertTeam')}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4">{t('doctors.page.title')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/90 max-w-2xl mx-auto">
            {txt(
              'World-class specialties at CAPITALMED — each led by board-certified experts dedicated to your care.',
              'تخصصات عالمية في كابيتال ميد — كل منها يقوده أطباء معتمدون دولياً مكرسون لرعايتك.',
              'Spécialités de classe mondiale à CAPITALMED — dirigées par des experts certifiés dévoués à vos soins.'
            )}
          </motion.p>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamHighlights.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="premium-card text-center p-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{txt(stat.labelEn, stat.labelAr, stat.labelFr)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-6 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="relative max-w-xl mx-auto">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
            <Input
              placeholder={txt('Search specialty or procedure…', 'ابحث عن تخصص أو إجراء…', 'Rechercher une spécialité…')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${isRTL ? 'pr-10' : 'pl-10'} rounded-[8px]`}
            />
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="py-14">
        <div className="container mx-auto px-6">
          <div className="mb-6 text-muted-foreground text-sm">
            {txt(`${filtered.length} specialties`, `${filtered.length} تخصص`, `${filtered.length} spécialités`)}
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((spec, i) => {
              const name = language === 'ar' ? spec.name_ar : language === 'fr' ? spec.name_fr : spec.name_en;
              const desc = language === 'ar' ? spec.desc_ar : language === 'fr' ? spec.desc_fr : spec.desc_en;
              const highlights = language === 'ar' ? spec.highlights_ar : language === 'fr' ? spec.highlights_fr : spec.highlights_en;
              return (
                <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }}
                  className="premium-card overflow-hidden flex flex-col group">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img src={spec.image} alt={name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} w-11 h-11 rounded-xl bg-gradient-to-br ${spec.color} flex items-center justify-center shadow-lg`}>
                      <spec.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20`}>
                      <Users className="w-3 h-3 text-white/80" />
                      <span className="text-xs text-white font-medium">{spec.teamSize} {txt('doctors', 'طبيب', 'médecins')}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-base mb-2">{name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {highlights.map((h, j) => (
                        <Badge key={j} className="text-[11px] font-normal rounded-full bg-primary text-primary-foreground">{h}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 border-t border-border pt-3">
                      <GraduationCap className="w-3.5 h-3.5 text-primary" />
                      <span>{spec.fellowships} {txt('international fellowships', 'زمالة دولية', 'bourses internationales')}</span>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Stethoscope className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                {txt('No specialties found', 'لا توجد تخصصات مطابقة', 'Aucune spécialité trouvée')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Expertise Banner */}
      <section className="py-10 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: FlaskConical, en: 'Research-Driven Care', ar: 'رعاية قائمة على البحث العلمي', fr: 'Soins basés sur la recherche' },
              { icon: Award, en: 'Board-Certified Physicians', ar: 'أطباء معتمدون دولياً', fr: 'Médecins certifiés' },
              { icon: Globe, en: 'International Standards', ar: 'معايير دولية', fr: 'Normes internationales' },
              { icon: Zap, en: 'Advanced Technology', ar: 'تكنولوجيا متقدمة', fr: 'Technologie avancée' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2 min-w-[120px] text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium">{txt(item.en, item.ar, item.fr)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="premium-card p-8 md:p-12 text-center max-w-3xl mx-auto">
            <Stethoscope className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">
              {txt('Need Help Finding the Right Specialty?', 'تحتاج مساعدة في اختيار التخصص المناسب؟', 'Besoin d\'aide pour trouver la bonne spécialité ?')}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {txt(
                'Our patient services team is available 24/7 to guide you to the right specialist and schedule your appointment.',
                'فريق خدمات المرضى لدينا متاح على مدار الساعة لإرشادك إلى الأخصائي المناسب وحجز موعدك.',
                'Notre équipe est disponible 24h/24 pour vous orienter vers le bon spécialiste.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                  <Phone className="w-4 h-4 mr-2" />{t('contact.title')}
                </Button>
              </Link>
              <a href="tel:16999">
                <Button variant="outline" className="px-8">
                  <Calendar className="w-4 h-4 mr-2" />
                  {txt('Call 16999', 'اتصل 16999', 'Appelez le 16999')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default DoctorsPage;
