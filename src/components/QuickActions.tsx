import React from 'react';
import { motion } from 'framer-motion';
import { UserSearch, Calendar, Building2, Stethoscope, Plane, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const quickActions = [
  { key: 'quick.doctor', desc: 'quick.doctor.desc', cta: 'quick.doctor.cta', icon: UserSearch, href: '/doctors', accent: 'hsl(var(--accent))', iconBg: 'bg-accent/10', btnClass: 'bg-accent text-accent-foreground group-hover:bg-accent/90' },
  { key: 'quick.appointments', desc: 'quick.appointments.desc', cta: 'quick.appointments.cta', icon: Calendar, href: '/contact', accent: 'hsl(var(--accent))', iconBg: 'bg-accent/10', btnClass: 'bg-accent text-accent-foreground group-hover:bg-accent/90' },
  { key: 'quick.facilities', desc: 'quick.facilities.desc', cta: 'quick.facilities.cta', icon: Building2, href: '/facilities', accent: 'hsl(var(--accent))', iconBg: 'bg-accent/10', btnClass: 'bg-accent text-accent-foreground group-hover:bg-accent/90' },
  { key: 'quick.specializations', desc: 'quick.specializations.desc', cta: 'quick.specializations.cta', icon: Stethoscope, href: '/services', accent: 'hsl(var(--accent))', iconBg: 'bg-accent/10', btnClass: 'bg-accent text-accent-foreground group-hover:bg-accent/90' },
  { key: 'quick.tourism', desc: 'quick.tourism.desc', cta: 'quick.tourism.cta', icon: Plane, href: '/medical-tourism', accent: 'hsl(var(--accent))', iconBg: 'bg-accent/10', btnClass: 'bg-accent text-accent-foreground group-hover:bg-accent/90' },
];

const QuickActions: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative -mt-14 z-20 pb-16">
      <div className="container mx-auto px-6">
        <p className="text-center text-white/80 text-xs font-semibold uppercase tracking-[0.2em] mb-8">
          {t('quick.title')}
        </p>

        {/* All 5 cards in a single row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-6xl mx-auto">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.key}
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ perspective: 800 }}
                className={index === 4 ? 'col-span-2 md:col-span-1' : ''}
              >
                <Link to={action.href} className="block group h-full">
                  <motion.div
                    whileHover={{
                      rotateY: -5,
                      rotateX: 5,
                      scale: 1.04,
                      z: 30,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm border border-white/60 p-5 h-full flex flex-col items-center text-center transition-shadow duration-300 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] cursor-pointer"
                    style={{
                      transformStyle: 'preserve-3d',
                      boxShadow: '0 8px 32px -8px rgba(0,0,0,0.12), 0 2px 8px -2px rgba(0,0,0,0.08)',
                    }}
                  >
                    {/* Accent top border */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ background: action.accent }}
                    />

                    {/* Floating glow on hover */}
                    <div
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500"
                      style={{ background: action.accent }}
                    />

                    {/* Icon */}
                    <div
                      className={`relative z-10 w-14 h-14 rounded-2xl ${action.iconBg} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <Icon className="w-7 h-7" style={{ color: action.accent }} />
                    </div>

                    {/* Text */}
                    <h3
                      className="relative z-10 text-sm font-bold text-foreground mb-1 leading-tight"
                      style={{ transform: 'translateZ(15px)' }}
                    >
                      {t(action.key)}
                    </h3>
                    <p
                      className="relative z-10 text-[11px] text-muted-foreground mb-3 leading-relaxed line-clamp-2"
                      style={{ transform: 'translateZ(10px)' }}
                    >
                      {t(action.desc)}
                    </p>

                    {/* CTA */}
                    <span
                      className={`relative z-10 mt-auto inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all duration-300 ${action.btnClass}`}
                      style={{ transform: 'translateZ(25px)' }}
                    >
                      {t(action.cta)}
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
