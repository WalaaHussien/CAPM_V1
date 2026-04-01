import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const COOKIE_CONSENT_KEY = 'cookie-consent';

const CookieConsent: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const { t, isRTL } = useLanguage();

    useEffect(() => {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ essential: true, analytics: true, marketing: true, timestamp: Date.now() }));
        setVisible(false);
    };

    const handleEssentialOnly = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ essential: true, analytics: false, marketing: false, timestamp: Date.now() }));
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ essential: true, analytics: false, marketing: false, timestamp: Date.now() }));
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 inset-x-0 z-[9999] p-4 md:p-6"
                    dir={isRTL ? 'rtl' : 'ltr'}
                >
                    <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl p-6 md:p-8">
                        <div className="flex items-start gap-4">
                            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 shrink-0">
                                <Cookie className="w-6 h-6 text-primary" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {t('cookies.title')}
                                    </h3>
                                    <button
                                        onClick={handleDecline}
                                        className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1"
                                        aria-label="Close"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    {t('cookies.description')}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        onClick={handleAcceptAll}
                                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                                        size="sm"
                                    >
                                        {t('cookies.acceptAll')}
                                    </Button>
                                    <Button
                                        onClick={handleEssentialOnly}
                                        variant="outline"
                                        size="sm"
                                    >
                                        {t('cookies.essentialOnly')}
                                    </Button>
                                    <Button
                                        onClick={handleDecline}
                                        variant="ghost"
                                        size="sm"
                                        className="text-muted-foreground"
                                    >
                                        {t('cookies.decline')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
