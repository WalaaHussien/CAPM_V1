import React from 'react';
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import About from '@/components/About';
import Pillars from '@/components/Pillars';
import HotlineBar from '@/components/HotlineBar';
import SuccessStories from '@/components/SuccessStories';

const Index: React.FC = () => {
  return (
    <PageLayout>
      <Hero />
      <Pillars />
      <Stats />
      <Services />
      <HotlineBar />
      <About />
      <SuccessStories />
    </PageLayout>
  );
};

export default Index;
