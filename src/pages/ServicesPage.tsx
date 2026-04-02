import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart, Brain, Stethoscope, Baby, Bone, Eye,
  Pill, Syringe, Activity, Microscope, Ribbon, Ear,
  ArrowRight, AlertTriangle, Building2, Hotel, ShoppingBag,
  Dna, Wind, Smile, Shield, Monitor, GraduationCap,
  Bed, Clock, ChevronLeft, ChevronRight, Users, Compass,
  Zap, Waypoints, FlaskConical
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage2 from '@/assets/campus-img-15.jpeg';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServicesPage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const services = [
    { icon: Building2, name: 'University Hospital Center', nameAr: 'المركز الطبي الجامعي' },
    { icon: Stethoscope, name: "Doctors' Plaza", nameAr: 'بلازا الأطباء' },
    { icon: Activity, name: 'Rehab & Wellness Institute', nameAr: 'معهد التأهيل والعافية' },
    { icon: Monitor, name: 'Virtual Hospital', nameAr: 'المستشفى الافتراضي' },
    { icon: Compass, name: 'Simulation Center', nameAr: 'مركز المحاكاة' },
    { icon: Shield, name: 'Emergency and Trauma Institute', nameAr: 'معهد الطوارئ والحوادث' },
    { icon: Bone, name: 'Ortho & Musculoskeletal Institute', nameAr: 'معهد العظام والجهاز الحركي' },
    { icon: Brain, name: 'Neuro and Spine Institute', nameAr: 'معهد الأعصاب والعمود الفقري' },
    { icon: Heart, name: 'Cardiovascular & Pulmonary Institute', nameAr: 'معهد القلب والرئة' },
    { icon: Waypoints, name: 'Transplant Institute', nameAr: 'معهد زراعة الأعضاء' },
    { icon: Dna, name: 'Precision Medicine Institute', nameAr: 'معهد الطب الدقيق' },
    { icon: Ribbon, name: 'Oncology Institute', nameAr: 'معهد الأورام' },
    { icon: GraduationCap, name: 'Human Resources Development Institute', nameAr: 'معهد تنمية الموارد البشرية' },
    { icon: Bed, name: 'Assisted Living Care Institute', nameAr: 'معهد رعاية المعيشة المساعدة' },
    { icon: Clock, name: 'Long-term Care Institute', nameAr: 'معهد الرعاية طويلة الأمد' },
    { icon: Syringe, name: 'Advanced Nursing Care Institute', nameAr: 'معهد التمريض المتقدم' },
    { icon: Baby, name: 'Women & Children Institute', nameAr: 'معهد المرأة والطفل' },
    { icon: Smile, name: 'Dentistry & Maxillofacial Institute', nameAr: 'معهد طب الأسنان والوجه والفكين' },
    { icon: Users, name: 'Geriatric Healthcare Institute', nameAr: 'معهد رعاية كبار السن' },
    { icon: Zap, name: 'Behavioral & Mental Health Institute', nameAr: 'معهد الصحة النفسية والسلوكية' },
    { icon: FlaskConical, name: 'Healthcare Research Institute', nameAr: 'معهد أبحاث الرعاية الصحية' },
    { icon: Building2, name: 'Central Command Building', nameAr: 'مبنى القيادة المركزية' },
    { icon: Hotel, name: 'Hotel & Residential Area', nameAr: 'الفندق والمنطقة السكنية' },
    { icon: ShoppingBag, name: 'Shopping Mall', nameAr: 'المركز التجاري' },
    { icon: Microscope, name: 'Two Central Utility Buildings', nameAr: 'مبنيان للمرافق المركزية' },
    { icon: Eye, name: 'Buildings for Future Expansion', nameAr: 'مباني التوسع المستقبلي' },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
    setTimeout(checkScroll, 400);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">


      {/* Hero with staggered animations */}
      <section className="page-hero">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('misc.healthcareExcellence')}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4">{t('services.page.title')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/90 max-w-2xl mx-auto">{t('services.page.subtitle')}</motion.p>
        </div>
      </section>

      {/* Services Slider - 3 rows x 5 columns */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-2">CAPITALMED Services Mix</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">26 {isRTL ? 'خدمة ومرفق' : 'Services & Facilities'}</h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')} disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${canScrollLeft ? 'border-primary text-primary hover:bg-primary hover:text-white' : 'border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll('right')} disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${canScrollRight ? 'border-primary text-primary hover:bg-primary hover:text-white' : 'border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div ref={sliderRef} onScroll={checkScroll}
            className="overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="grid grid-rows-3 grid-flow-col auto-cols-[200px] gap-4">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.03, 0.3) }}
                    whileHover={{ y: -4 }}
                    className="premium-card p-5 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent transition-colors duration-300">
                      <Icon className="w-5 h-5 text-accent group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xs font-semibold text-foreground leading-tight">
                      {isRTL ? service.nameAr : service.name}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency - Dark neutral background with red accents */}
      <section className="py-20 bg-red-50/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div className="h-px flex-1 bg-destructive/20" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('services.emergency.title')}</h2>
              <p className="text-gray-600 mb-6">{t('services.emergency.desc')}</p>
              <ul className="space-y-2 mb-8">
                {['24/7', 'trauma', 'ambulance', 'rapid'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-800 text-sm">
                    <div className="w-1.5 h-1.5 bg-destructive rounded-full" />
                    {t(`services.emergency.${item}`)}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-destructive hover:bg-destructive/90 text-white rounded-[8px]">
                {t('services.emergency.call')}
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-video rounded-xl overflow-hidden bg-muted/30 border border-border">
              <img src={heroImage2} alt="Emergency" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-primary/5 border border-primary/15 rounded-xl p-10 md:p-14 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-3">{t('services.cta.title')}</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t('services.cta.subtitle')}</p>
            <div className="flex justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-[8px]">
                  {t('services.cta.contact')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
};

export default ServicesPage;
