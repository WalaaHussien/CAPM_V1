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
      className="min-h-screen overflow-visible bg-background"
      style={{ '--quick-access-height': '3rem' } as React.CSSProperties}
    >
      <div className="sticky top-0 z-[60]">
        <QuickAccessBar />
      </div>
      <div className="sticky top-[var(--quick-access-height)] z-50">
        <Header />
      </div>
      <main className="relative z-0">{children}</main>
      {showFooter && <Footer />}
    </motion.div>
  );
};

export default PageLayout;
