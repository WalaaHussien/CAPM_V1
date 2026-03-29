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
      <div className="pt-12">
        <Header />
      </div>
      <main>{children}</main>
      {showFooter && <Footer />}
    </motion.div>
  );
};

export default PageLayout;
