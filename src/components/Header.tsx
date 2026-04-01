import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, ChevronDown, Globe, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

import lightLogo from '@/assets/light_logo.svg';
import darkLogo from '@/assets/dark_logo.svg';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MegaMenu from '@/components/header/MegaMenu';
import MobileNav from '@/components/header/MobileNav';
import SearchBar from '@/components/SearchBar';

const Header: React.FC = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  const mainNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.laplaza'), href: '/laplaza' },
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.doctors'), href: '/doctors' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const handleMoreEnter = () => {
    clearTimeout(megaMenuTimeout.current);
    setIsMegaMenuOpen(true);
  };

  const handleMoreLeave = () => {
    megaMenuTimeout.current = setTimeout(() => setIsMegaMenuOpen(false), 200);
  };

  const textColor = isScrolled
    ? 'text-foreground'
    : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]';
  const hoverColor = isScrolled ? 'hover:text-foreground/70' : 'hover:text-white/70';
  const headerClasses = [
    'site-header fixed inset-x-0 top-0 z-50 transition-all duration-300',
    isScrolled ? 'site-header--scrolled' : 'site-header--top',
  ].join(' ');

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={headerClasses}
    >
      {/* Hotline + Top Bar */}
      <div className={`border-b ${isScrolled ? 'border-border/20' : 'border-white/10'}`}>
        <div className="container">
          <div className="header-utility-bar text-xs">
            <div className="header-utility-bar__language">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className={`h-8 text-xs ${textColor}`}>
                    <Globe className="w-3.5 h-3.5 mr-1" />
                    {language === 'en' ? 'EN' : language === 'fr' ? 'FR' : 'عربي'}
                    <ChevronDown className="w-3 h-3 ml-0.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="bg-popover">
                  <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('fr')}>Français</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('ar')}>العربية</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <a href="tel:16999" className={`header-utility-bar__phone font-bold transition-colors ${isScrolled ? 'text-foreground hover:text-accent' : 'text-white hover:text-accent'}`}>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/20">
                <Phone className="w-3 h-3 text-destructive animate-pulse" />
              </div>
              <span className="text-destructive font-bold text-sm">16999</span>
              <span className={`${isScrolled ? 'text-muted-foreground' : 'text-white/50'} font-normal hidden sm:inline`}>24/7</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container">
        <div className="flex min-h-[4.75rem] items-center justify-between gap-4 py-3 md:min-h-[5.5rem]">
          {/* Logo + optional sub-brand */}
          <div className="flex shrink-0 items-center gap-3">
            <Link to="/" className="flex items-center relative h-14 md:h-[4.5rem]">
              <img
                src={isScrolled ? darkLogo : lightLogo}
                alt="CapitalMed"
                className={`h-full w-auto object-contain transition-all duration-300 ${!isScrolled ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]' : ''}`}
              />
            </Link>

            {/* La Plaza sub-brand — shown only on /laplaza */}
            {location.pathname === '/laplaza' && (
              <div className={`flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`h-8 w-px ${isScrolled ? 'bg-border' : 'bg-white/25'}`} />
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className={`text-[8px] font-semibold tracking-[0.2em] uppercase leading-none mb-0.5 ${isScrolled ? 'text-muted-foreground' : 'text-white/50'}`}>
                    {language === 'ar' ? 'مستشفى تابع لكابيتال ميد' : language === 'fr' ? 'Un Hôpital CAPITALMED' : 'A CAPITALMED Hospital'}
                  </p>
                  <p className={`font-brand text-base font-bold tracking-[0.15em] uppercase leading-none ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                    {language === 'ar' ? 'لا بلازا' : 'LA PLAZA'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'active' : ''} ${textColor} ${hoverColor}`}
              >
                {item.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={handleMoreEnter}
              onMouseLeave={handleMoreLeave}
            >
              <button
                className={`nav-link flex items-center gap-1 ${textColor} ${hoverColor}`}
                onClick={() => setIsMegaMenuOpen((v) => !v)}
              >
                {t('nav.more')}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </nav>

          {/* Search + CTA */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <SearchBar />
            <Link to="/patient-portal">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-[10px] px-6 text-sm font-semibold shadow-sm">
                {t('nav.patientPortal')}
              </Button>
            </Link>
          </div>

          {/* Mobile: Search + Menu */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <SearchBar />
            <Button
              variant="ghost"
              size="icon"
              className={`${textColor} h-11 w-11 rounded-full`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      <div
        onMouseEnter={handleMoreEnter}
        onMouseLeave={handleMoreLeave}
      >
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </div>

      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </motion.header>
  );
};

export default Header;
