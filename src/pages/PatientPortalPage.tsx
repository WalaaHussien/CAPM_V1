import React from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck, FileText, Pill, Activity, MessageSquare,
  CreditCard, Clock, Shield, ArrowRight, User
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PatientPortalPage: React.FC = () => {
  const { t, isRTL } = useLanguage();

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      

      {/* Hero */}
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

      {/* Login/Register CTA */}
      <section className="py-10 -mt-8 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="premium-card p-8 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">{t('portal.access.title')}</h2>
            <p className="text-muted-foreground text-sm mb-6">{t('portal.access.desc')}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-[8px] px-8">
                {t('portal.login')}
              </Button>
              <Button size="lg" variant="outline" className="rounded-[8px] px-8">
                {t('portal.register')}
              </Button>
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

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {portalFeatures.map((feature) => (
              <motion.div
                key={feature.key}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group premium-card p-6 cursor-pointer text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {t(`portal.feature.${feature.key}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`portal.feature.${feature.key}.desc`)}
                </p>
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

      
    </motion.div>
  );
};

export default PatientPortalPage;
