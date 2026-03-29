import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Stethoscope, CalendarCheck, Siren, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuickAccessBarProps {
  isScrolled?: boolean;
}

const QuickAccessBar: React.FC<QuickAccessBarProps> = ({ isScrolled = false }) => {
  const { t, isRTL } = useLanguage();
  const neutralActionTone = isScrolled
    ? 'bg-muted text-foreground hover:bg-muted/80'
    : 'bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground';
  const hotlineSurface = isScrolled
    ? 'bg-muted hover:bg-muted/80'
    : 'bg-primary-foreground/10 hover:bg-primary-foreground/20';
  const hotlineText = isScrolled ? 'text-foreground' : 'text-primary-foreground';
  const hotlineIcon = isScrolled ? 'text-primary animate-pulse' : 'text-primary-foreground animate-pulse';

  const actions = [
    { icon: HeartPulse, label: t('quick.bar.patients'), href: '/patient-portal', color: neutralActionTone },
    { icon: Stethoscope, label: t('quick.bar.doctors'), href: '/doctors', color: neutralActionTone },
    { icon: CalendarCheck, label: t('quick.bar.bookNow'), href: '/contact', color: 'bg-accent hover:bg-accent/90 text-accent-foreground' },
    { icon: Siren, label: t('quick.bar.emergency'), href: 'tel:16999', color: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground', isExternal: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={`sticky top-0 z-[60] border-b shadow-sm transition-[background-color,border-color,box-shadow] duration-300 ${
        isScrolled
          ? 'bg-background/95 border-border/80 backdrop-blur-lg'
          : 'bg-primary/95 border-primary/20 backdrop-blur-sm'
      }`}
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
            className={`hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full transition-colors group ${hotlineSurface}`}
          >
            <Phone className={`w-3.5 h-3.5 ${hotlineIcon}`} />
            <span className={`text-xs font-bold ${hotlineText}`}>{t('quick.bar.hotline')}: 16999</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickAccessBar;
