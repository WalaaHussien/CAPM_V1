import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
      className="relative flex min-h-screen items-end overflow-hidden sm:items-center"
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
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(193,100%,10%)]/80 via-[hsl(193,100%,18%)]/55 to-[hsl(193,90%,24%)]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(193,100%,8%)]/50 to-transparent" />
        {/* Cyan glow accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_40%,hsl(193_100%_50%_/_0.12)_0%,transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container pb-24 pt-48 sm:pt-48 md:pb-12 lg:pt-48">
        <div className="max-w-2xl lg:max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:mb-4 sm:text-sm"
          >
            {t('hero.smartCity')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4 font-brand text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:mb-5 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-4 text-lg font-light text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:mb-5 sm:text-xl md:text-2xl"
          >
            {t('hero.tagline')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-8 max-w-xl text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)] sm:mb-10 sm:text-base"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex max-w-2xl flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Link to="/location" className="w-full sm:w-auto">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-[8px] px-8 h-12 text-sm font-semibold w-full sm:w-auto">
                <MapPin className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('nav.location')}
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button size="lg" className="bg-white/10 text-white hover:bg-primary hover:text-primary-foreground rounded-[8px] px-8 h-12 text-sm font-semibold border border-white/30 hover:border-primary w-full sm:w-auto backdrop-blur-sm transition-all duration-200">
                {t('hero.cta.learn')}
              </Button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-5 border-t border-white/10 pt-6 sm:mt-12 sm:gap-x-8 sm:pt-8"
          >
            {[
              { value: '577K m²', label: 'Campus Area' },
              { value: '$1.2B', label: 'Investment' },
              { value: '4,000+', label: 'Hospital Beds' },
              { value: '~100', label: 'Specialties' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                <p className="text-white font-bold text-base sm:text-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">{stat.value}</p>
                <p className="text-white/80 text-xs uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="hero-carousel-controls absolute inset-x-0 bottom-5 z-20 px-4 pb-2 sm:bottom-8 sm:px-6 sm:pb-6">
        <button onClick={prevSlide} className="hero-carousel-arrow">
          {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
        <div className="hero-carousel-track">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`hero-carousel-indicator ${index === currentSlide ? 'hero-carousel-indicator--active' : 'hero-carousel-indicator--idle'
                }`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="hero-carousel-arrow">
          {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </section>
  );
};

export default Hero;
