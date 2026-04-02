import React from 'react';
import { motion } from 'framer-motion';
import { Users, Stethoscope, Siren } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface QuickAccessBarProps {
  compact?: boolean;
}

const QuickAccessBar: React.FC<QuickAccessBarProps> = ({ compact = false }) => {
  const { t } = useLanguage();

  const actions = [
    { icon: Users, label: t('quick.bar.patients'), href: '/patient-portal', color: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' },
    { icon: Stethoscope, label: t('quick.bar.doctors'), href: '/doctors', color: 'text-primary-foreground', gradient: 'linear-gradient(135deg, hsl(193 100% 56%), hsl(193 100% 45%))' },
    { icon: Siren, label: t('quick.bar.emergency'), href: 'tel:16999', color: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground', isExternal: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={cn('hero-quick-access', compact && 'hero-quick-access--compact')}
    >
      <div className={cn('hero-quick-access__list', compact && 'hero-quick-access__list--compact')}>
        {actions.map((action) => {
          const Icon = action.icon;
          const content = (
            <span
              className={cn('hero-quick-access__item', compact && 'hero-quick-access__item--compact', action.color)}
              style={action.gradient ? { background: action.gradient } : undefined}
            >
              <Icon className={cn('shrink-0', compact ? 'h-3.5 w-3.5 sm:h-4 sm:w-4' : 'h-4 w-4')} />
              {action.label}
            </span>
          );

          return action.isExternal ? (
            <a key={action.label} href={action.href} className={cn('hero-quick-access__link', compact && 'hero-quick-access__link--compact')}>
              {content}
            </a>
          ) : (
            <Link key={action.label} to={action.href} className={cn('hero-quick-access__link', compact && 'hero-quick-access__link--compact')}>
              {content}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuickAccessBar;
