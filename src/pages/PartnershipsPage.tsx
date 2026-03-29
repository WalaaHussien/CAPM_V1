import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Microscope, Stethoscope, Cpu, Building2, ExternalLink } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };


const brandEntities = [
  { name: 'ElKalaa Ventures', desc: 'A group of industries in health, education, and investment, headed by Dr. Hassan Al-Kalla', icon: Building2 },
  { name: 'BUC — Badr University in Cairo', desc: 'Premier university offering medical and healthcare education', icon: GraduationCap },
  { name: 'CIRA', desc: 'Cairo for Investment and Real Estate Development S.A.E.', icon: Building2 },
  { name: 'EHCS', desc: 'Egyptians for Health Care Services — The company that owns CAPITALMED', icon: Stethoscope },
  { name: 'CAPITALMED', desc: 'The Capital of Medicine in the Middle East — Healthcare City', icon: Stethoscope },
];

const PartnershipsPage: React.FC = () => {
  const { t, language } = useLanguage();

  const brandEntities = language === 'ar' ? [
    { name: 'القلعة فينتشرز', desc: 'مجموعة صناعات في الصحة والتعليم والاستثمار، بقيادة د. حسن القلعة', icon: Building2 },
    { name: 'جامعة بدر بالقاهرة', desc: 'جامعة رائدة تقدم التعليم الطبي والرعاية الصحية', icon: GraduationCap },
    { name: 'سيرا', desc: 'القاهرة للاستثمار والتطوير العقاري ش.م.م.', icon: Building2 },
    { name: 'EHCS', desc: 'المصريون لخدمات الرعاية الصحية — الشركة المالكة لكابيتال ميد', icon: Stethoscope },
    { name: 'كابيتال ميد', desc: 'عاصمة الطب في الشرق الأوسط — المدينة الطبية', icon: Stethoscope },
  ] : [
    { name: 'ElKalaa Ventures', desc: 'A group of industries in health, education, and investment, headed by Dr. Hassan Al-Kalla', icon: Building2 },
    { name: 'BUC — Badr University in Cairo', desc: 'Premier university offering medical and healthcare education', icon: GraduationCap },
    { name: 'CIRA', desc: 'Cairo for Investment and Real Estate Development S.A.E.', icon: Building2 },
    { name: 'EHCS', desc: 'Egyptians for Health Care Services — The company that owns CAPITALMED', icon: Stethoscope },
    { name: 'CAPITALMED', desc: 'The Capital of Medicine in the Middle East — Healthcare City', icon: Stethoscope },
  ];

  const partners = language === 'ar' ? [
    { name: 'جونز هوبكنز للطب', country: 'الولايات المتحدة', type: 'أكاديمي', focus: 'البحث الطبي', key: true },
    { name: 'مركز القلب الألماني', country: 'ألمانيا', type: 'سريري', focus: 'أمراض القلب', key: true },
    { name: 'مايو كلينك', country: 'الولايات المتحدة', type: 'بحثي', focus: 'متعدد التخصصات', key: true },
    { name: 'مؤسسة NHS', country: 'المملكة المتحدة', type: 'رعاية صحية', focus: 'الصحة العامة', key: false },
    { name: 'شاريتيه برلين', country: 'ألمانيا', type: 'أكاديمي', focus: 'التعليم الطبي', key: false },
    { name: 'مستشفى سنغافورة العام', country: 'سنغافورة', type: 'سريري', focus: 'متعدد التخصصات', key: false },
    { name: 'كليفلاند كلينك', country: 'الولايات المتحدة', type: 'سريري', focus: 'رعاية القلب', key: false },
    { name: 'معهد كارولينسكا', country: 'السويد', type: 'بحثي', focus: 'البحث', key: false },
  ] : [
    { name: 'Johns Hopkins Medicine', country: 'USA', type: 'Academic', focus: 'Medical Research', key: true },
    { name: 'German Heart Center', country: 'Germany', type: 'Clinical', focus: 'Cardiology', key: true },
    { name: 'Mayo Clinic', country: 'USA', type: 'Research', focus: 'Multi-specialty', key: true },
    { name: 'NHS Foundation Trust', country: 'UK', type: 'Healthcare', focus: 'Public Health', key: false },
    { name: 'Charité Berlin', country: 'Germany', type: 'Academic', focus: 'Medical Education', key: false },
    { name: 'Singapore General Hospital', country: 'Singapore', type: 'Clinical', focus: 'Multi-specialty', key: false },
    { name: 'Cleveland Clinic', country: 'USA', type: 'Clinical', focus: 'Heart Care', key: false },
    { name: 'Karolinska Institute', country: 'Sweden', type: 'Research', focus: 'Research', key: false },
  ];

  const areas = [
    { icon: Stethoscope, title: t('partnerships.areas.clinical'), desc: t('partnerships.areas.clinical.desc') },
    { icon: Microscope, title: t('partnerships.areas.research'), desc: t('partnerships.areas.research.desc') },
    { icon: GraduationCap, title: t('partnerships.areas.education'), desc: t('partnerships.areas.education.desc') },
    { icon: Cpu, title: t('partnerships.areas.technology'), desc: t('partnerships.areas.technology.desc') },
  ];

  return (
    <PageLayout>
      <main>
        <section className="page-hero">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('partnerships.hero.label')}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4">{t('partnerships.hero.title')}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/60 max-w-2xl mx-auto mb-8">{t('partnerships.hero.subtitle')}</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-center gap-10">
              {[{ n: '15+', l: t('partnerships.stats.partners') }, { n: '8', l: t('partnerships.stats.countries') }, { n: '4', l: t('partnerships.stats.continents') }].map((s, i) => (
                <div key={i} className="text-center"><p className="text-2xl font-bold text-white">{s.n}</p><p className="text-xs text-white/50">{s.l}</p></div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Brand Architecture Section */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="section-label">{language === 'ar' ? 'الهيكل المؤسسي' : 'Corporate Structure'}</p>
              <h2 className="section-title">{language === 'ar' ? 'هيكل العلامات التجارية' : 'Brand Architecture'}</h2>
              <p className="section-subtitle">{language === 'ar' ? 'مجموعة صناعات في الصحة والتعليم والاستثمار، بقيادة د. حسن القلعة' : 'A group of industries in health, education, and investment, headed by Dr. Hassan Al-Kalla'}</p>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {brandEntities.map((entity, i) => {
                const Icon = entity.icon;
                return (
                  <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-5 text-center">
                    <div className="h-16 flex items-center justify-center mb-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm mb-2">{entity.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{entity.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('partnerships.areas.title')}</h2>
            <p className="section-subtitle">{t('partnerships.areas.subtitle')}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {areas.map((area, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-6 text-center">
                <area.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-2">{area.title}</h3>
                <p className="text-xs text-muted-foreground">{area.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('partnerships.global.title')}</h2>
            <p className="section-subtitle">{t('partnerships.global.subtitle')}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {partners.map((partner, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">{partner.type}</Badge>
                  {partner.key && <span className="text-[10px] text-accent font-medium">{t('partnerships.keyPartner')}</span>}
                </div>
                <h3 className="font-semibold text-sm mb-1">{partner.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">{partner.country}</p>
                <p className="text-xs text-primary">{partner.focus}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </PageLayout>
  );
};

export default PartnershipsPage;
