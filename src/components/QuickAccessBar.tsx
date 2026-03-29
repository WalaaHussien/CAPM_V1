import React from 'react';
import { motion } from 'framer-motion';
import { Users, Stethoscope, CalendarCheck, Siren, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const QuickAccessBar: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const actions = [
    { icon: Users, label: t('quick.bar.patients'), href: '/patient-portal', color: 'bg-primary hover:bg-primary/90 text-primary-foreground' },
    { icon: Stethoscope, label: t('quick.bar.doctors'), href: '/doctors', color: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' },
    { icon: CalendarCheck, label: t('quick.bar.bookNow'), href: '/contact', color: 'bg-accent hover:bg-accent/90 text-accent-foreground' },
    { icon: Siren, label: t('quick.bar.emergency'), href: 'tel:16999', color: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground', isExternal: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card border-b border-border shadow-sm sticky top-0 z-40"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12 gap-2">
          {/* Quick action buttons */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin flex-1">
            {actions.map((action) => {
              const Icon = action.icon;
              const content = (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${action.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {action.label}
                </span>
              );

              return action.isExternal ? (
                <a key={action.label} href={action.href}>
                  {content}
                </a>
              ) : (
                <Link key={action.label} to={action.href}>
                  {content}
                </Link>
              );
            })}
          </div>

          {/* Hotline */}
          <a
            href="tel:16999"
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-destructive/10 rounded-full hover:bg-destructive/20 transition-colors group"
          >
            <Phone className="w-3.5 h-3.5 text-destructive animate-pulse" />
            <span className="text-xs font-bold text-destructive">{t('quick.bar.hotline')}: 16999</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickAccessBar;
