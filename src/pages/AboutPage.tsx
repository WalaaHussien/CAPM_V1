import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, Users, Building2, Stethoscope, ShieldCheck, Briefcase, GraduationCap, Landmark, Globe } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import hospitalPhase1 from '@/assets/campus-aerial-day2.jpeg';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const AboutPage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const values = [
    { icon: Heart, key: 'about.value.compassion' },
    { icon: Award, key: 'about.value.excellence' },
    { icon: Users, key: 'about.value.teamwork' },
    { icon: ShieldCheck, key: 'about.value.integrity' },
  ];

  const milestones = [
    { year: '2020', key: 'about.milestone.1' },
    { year: '2022', key: 'about.milestone.2' },
    { year: '2024', key: 'about.milestone.3' },
    { year: '2026', key: 'about.milestone.4' },
  ];

  return (
    <PageLayout>

      <section className="page-hero">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('misc.aboutCapitalMed')}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4">{t('about.page.title')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto">{t('about.page.subtitle')}</motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="section-title mb-5">{t('about.story.title')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t('about.story.p1')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('about.story.p2')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="rounded-xl overflow-hidden">
                <img src={hospitalPhase1} alt="CapitalMed" className="w-full h-[400px] object-cover" />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-accent text-accent-foreground rounded-xl p-5 shadow-lg">
                <span className="text-2xl font-bold block">6+</span>
                <span className="text-xs text-accent-foreground/70">{t('about.years')}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: t('about.mission'), text: t('about.mission.text'), color: 'bg-accent/10', iconColor: 'text-accent' },
              { icon: Eye, title: t('about.vision'), text: t('about.vision.text'), color: 'bg-secondary/10', iconColor: 'text-secondary' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }} className="premium-card p-8">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-5`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('about.values.title')}</h2>
            <p className="section-subtitle">{t('about.values.subtitle')}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value) => (
              <motion.div key={value.key} variants={fadeUp} whileHover={{ y: -3 }}
                className="premium-card text-center p-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold">{t(value.key)}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('about.timeline.title')}</h2>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-6">
            {milestones.map((milestone, index) => (
              <motion.div key={milestone.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-xs font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < milestones.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                </div>
                <div className="premium-card flex-1 p-5">
                  <span className="text-accent text-sm font-bold">{milestone.year}</span>
                  <p className="text-muted-foreground text-sm mt-1">{t(milestone.key)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Facts from PDF */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('about.keyFacts.title')}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Building2, value: '577,000 m²', label: t('about.keyFacts.landArea') },
              { icon: Globe, value: '1,210,600 m²', label: t('about.keyFacts.builtUp') },
              { icon: Users, value: '15,000+', label: t('about.keyFacts.jobs') },
              { icon: Stethoscope, value: '5M+', label: t('about.keyFacts.patientsAnnually') },
              { icon: Heart, value: '10%', label: t('about.keyFacts.underprivileged') },
              { icon: Award, value: '70%', label: t('about.keyFacts.greenAreas') },
            ].map((fact, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="premium-card p-6 text-center">
                <fact.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">{fact.value}</div>
                <div className="text-muted-foreground text-sm">{fact.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Structure / Brand Architecture */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('about.corporate.title')}</h2>
            <p className="section-subtitle">{t('about.corporate.subtitle')}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Landmark, name: t('about.corporate.elkalaa'), desc: t('about.corporate.elkalaa.desc') },
              { icon: Briefcase, name: t('about.corporate.ehcs'), desc: t('about.corporate.ehcs.desc') },
              { icon: GraduationCap, name: t('about.corporate.buc'), desc: t('about.corporate.buc.desc') },
              { icon: Building2, name: t('about.corporate.cira'), desc: t('about.corporate.cira.desc') },
            ].map((entity, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }} className="premium-card p-6 text-center">
                <entity.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-2">{entity.name}</h3>
                <p className="text-xs text-muted-foreground">{entity.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Building2, value: '19', label: t('about.stat.facilities') },
              { icon: Stethoscope, value: '15,000+', label: t('about.stat.providers') },
              { icon: Users, value: '5M+', label: t('about.stat.patients') },
              { icon: Award, value: '100+', label: t('about.stat.specialties') },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </PageLayout>
  );
};

export default AboutPage;
