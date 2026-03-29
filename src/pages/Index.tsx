import React from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import About from '@/components/About';
import Pillars from '@/components/Pillars';
import HotlineBar from '@/components/HotlineBar';
import SuccessStories from '@/components/SuccessStories';

const Index: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main>
        <Hero />
        <Pillars />
        <Stats />
        <Services />
        <HotlineBar />
        <About />
        <SuccessStories />
      </main>
    </motion.div>
  );
};

export default Index;
