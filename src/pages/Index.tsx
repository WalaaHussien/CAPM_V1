import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuickAccessBar from '@/components/QuickAccessBar';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import About from '@/components/About';
import Pillars from '@/components/Pillars';
import HotlineBar from '@/components/HotlineBar';
import SuccessStories from '@/components/SuccessStories';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background overflow-x-hidden"
    >
      <Header />
      <main>
        <Hero />
        <QuickAccessBar />
        <Pillars />
        <Stats />
        <Services />
        <HotlineBar />
        <About />
        <SuccessStories />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
