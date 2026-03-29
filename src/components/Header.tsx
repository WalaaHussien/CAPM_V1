import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, ChevronDown, Globe, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import darkLogo from '@/assets/dark_logo.svg';
import lightLogo from '@/assets/light_logo.svg';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MegaMenu from '@/components/header/MegaMenu';
import MobileNav from '@/components/header/MobileNav';
import SearchBar from '@/components/SearchBar';

interface HeaderProps {
  isScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled = false }) => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  const mainNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
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
    : 'text-primary-foreground drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]';
  const hoverColor = isScrolled ? 'hover:text-primary' : 'hover:text-primary-foreground/70';
  const headerSurface = isScrolled
    ? 'bg-background/95 border-b border-border/80 shadow-sm backdrop-blur-lg'
    : 'bg-primary-dark/95 backdrop-blur-sm';
  const utilityTextColor = isScrolled ? 'text-muted-foreground' : 'text-primary-foreground/70';

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-[var(--quick-access-height)] z-50 w-full transition-[background-color,border-color,box-shadow] duration-300 ${headerSurface}`}
    >
      {/* Top Bar */}
      <div className={`hidden md:block border-b ${isScrolled ? 'border-border/70' : 'border-primary-foreground/10'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-9 text-xs">
            <div className={`flex items-center gap-4 ${utilityTextColor}`}>
              <a href="tel:+201234567890" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <Phone className="w-3 h-3" />
                <span>+20 2 1234 5678</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-7 text-xs ${textColor} ${isScrolled ? 'hover:bg-muted' : 'hover:bg-primary-foreground/10'}`}
                  >
                    <Globe className="w-3.5 h-3.5 mr-1" />
                    {language === 'en' ? 'EN' : 'عربي'}
                    <ChevronDown className="w-3 h-3 ml-0.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="bg-popover">
                  <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('ar')}>العربية</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo - swaps between light/dark based on scroll */}
          <Link to="/" className="relative flex h-16 shrink-0 items-center md:h-20">
            <img
              src={isScrolled ? darkLogo : lightLogo}
              alt="CapitalMed"
              className="h-full w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
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
          <div className="hidden lg:flex items-center gap-3">
            <SearchBar />
            <Link to="/doctors">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-[8px] px-6 text-sm font-semibold">
                {t('hero.cta.doctor')}
              </Button>
            </Link>
          </div>

          {/* Mobile: Search + Menu */}
          <div className="flex lg:hidden items-center gap-1">
            <SearchBar />
            <Button
              variant="ghost"
              size="icon"
              className={`${textColor} ${isScrolled ? 'hover:bg-muted' : 'hover:bg-primary-foreground/10'}`}
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
