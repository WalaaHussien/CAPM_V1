import React from 'react';
import { motion } from 'framer-motion';
import QuickAccessBar from '@/components/QuickAccessBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, showFooter = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <div className="fixed top-0 left-0 right-0 z-[51]">
        <QuickAccessBar />
      </div>
      <div className="fixed top-12 left-0 right-0 z-50">
        <Header />
      </div>
      <div className="pt-[calc(3rem+5rem)] md:pt-[calc(3rem+6rem)]" />
      <main className="relative z-0">{children}</main>
      {showFooter && <Footer />}
    </motion.div>
  );
};

export default PageLayout;
