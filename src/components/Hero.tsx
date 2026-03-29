import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import heroImage1 from '@/assets/campus-aerial-day.jpeg';
import heroImage3 from '@/assets/campus-aerial-night.jpeg';
import heroImage4 from '@/assets/campus-gardens.jpeg';
import heroImage5 from '@/assets/campus-plaza.jpeg';

const heroSlides = [
  { image: heroImage1 },
  { image: heroImage3 },
  { image: heroImage4 },
  { image: heroImage5 },
];

const Hero: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen min-h-[500px] max-h-[900px] flex items-end sm:items-center overflow-hidden -mt-[calc(2.25rem+5rem)] md:-mt-[calc(2.25rem+6rem)] pt-[calc(2.25rem+5rem)] md:pt-[calc(2.25rem+6rem)]"
    >
      {/* Background - smooth crossfade with blur */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <motion.img
            key={index}
            src={slide.image}
            alt="CapitalMed"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
            initial={false}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(200,90%,8%)]/60 via-[hsl(200,85%,10%)]/40 to-[hsl(200,80%,12%)]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(200,85%,8%)]/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 pb-20 md:pb-0">
        <div className="max-w-2xl">
          {/* La Plaza Hospital Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4"
          >
            <span className="text-accent text-xs font-bold tracking-wider uppercase">{t('hero.laPlaza')}</span>
            <span className="text-white/40">|</span>
            <span className="text-white/70 text-xs">{t('hero.laPlaza.tagline')}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-secondary text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-3 sm:mb-4"
          >
            {t('hero.smartCity')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 tracking-tight leading-[1.1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 sm:mb-4 font-light drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
          >
            {t('hero.tagline')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8 max-w-lg leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 max-w-lg"
          >
            <Link to="/location" className="w-full sm:w-auto">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-[8px] px-8 h-12 text-sm font-semibold w-full sm:w-auto">
                <MapPin className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('nav.location')}
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 rounded-[8px] px-8 h-12 text-sm font-semibold border-0 w-full sm:w-auto">
                {t('hero.cta.learn')}
              </Button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-5 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10"
          >
            {[
              { value: '577K m²', label: 'Campus Area' },
              { value: '$1.2B', label: 'Investment' },
              { value: '4,500+', label: 'Hospital Beds' },
              { value: '100+', label: 'Specialties' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                <p className="text-white font-bold text-base sm:text-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">{stat.value}</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex items-center justify-center gap-2 sm:gap-3 z-20 px-4 sm:px-6 pointer-events-none pb-2 sm:pb-8">
        <button onClick={prevSlide} className="pointer-events-auto w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all cursor-pointer active:scale-95 shrink-0">
          {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
        <div className="pointer-events-auto flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${index === currentSlide ? 'w-8 bg-accent' : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="pointer-events-auto w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all cursor-pointer active:scale-95 shrink-0">
          {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </section>
  );
};

export default Hero;
