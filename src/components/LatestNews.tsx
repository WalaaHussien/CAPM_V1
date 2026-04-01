import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

import heroHospital from '@/assets/hero-hospital.jpg';
import adminBuilding from '@/assets/admin-building.png';
import hospitalInterior from '@/assets/hero-hospital-interior.jpg';

const LatestNews: React.FC = () => {
    const { t, language } = useLanguage();

    const articles = language === 'ar'
        ? [
            { id: 1, title: 'كابيتال ميد تعلن عن إطلاق المرحلة الأولى', excerpt: 'المستشفى الجامعي يستقبل أول مرضاه.', date: '٧ يناير ٢٠٢٦', category: 'Announcements', image: heroHospital },
            { id: 2, title: 'شراكة استراتيجية مع ميونخ هيلث', excerpt: 'اتفاقية تاريخية لإنشاء مركز تميز.', date: '٥ يناير ٢٠٢٦', category: 'Partnerships', image: adminBuilding },
            { id: 3, title: 'وحدة القلب المتقدمة تحسن النتائج', excerpt: 'تحسن بنسبة ١٥٪ في أوقات التعافي.', date: '٢٨ ديسمبر ٢٠٢٥', category: 'Clinical', image: hospitalInterior },
        ]
        : language === 'fr'
            ? [
                { id: 1, title: 'CAPITALMED annonce le lancement de la Phase 1', excerpt: 'L\'hôpital universitaire accueille ses premiers patients.', date: '07 Jan 2026', category: 'Annonces', image: heroHospital },
                { id: 2, title: 'Partenariat stratégique avec Munich Health', excerpt: 'Un accord historique pour la chirurgie robotique.', date: '05 Jan 2026', category: 'Partenariats', image: adminBuilding },
                { id: 3, title: 'L\'unité cardiologique avancée améliore les résultats', excerpt: 'Amélioration de 15% des temps de récupération.', date: '28 Déc 2025', category: 'Clinique', image: hospitalInterior },
            ]
            : [
                { id: 1, title: 'CAPITALMED Announces Phase 1 Launch', excerpt: 'The University Hospital welcomes its first patients.', date: '07 Jan 2026', category: 'Announcements', image: heroHospital },
                { id: 2, title: 'Strategic Partnership with Munich Health', excerpt: 'A landmark agreement for robotic surgery training.', date: '05 Jan 2026', category: 'Partnerships', image: adminBuilding },
                { id: 3, title: 'Advanced Cardiology Unit Improves Outcomes', excerpt: '15% improvement in recovery times.', date: '28 Dec 2025', category: 'Clinical', image: hospitalInterior },
            ];

    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container">
                <div className="text-center mb-12">
                    <p className="section-label">{t('misc.latestUpdates')}</p>
                    <h2 className="section-title">{t('news.hero.title')}</h2>
                    <p className="section-subtitle">{t('news.hero.subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {articles.map((article, i) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-card overflow-hidden p-0"
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{article.category}</span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {article.date}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-base mb-2 line-clamp-2">{article.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link to="/news">
                        <Button variant="outline" size="lg" className="rounded-full px-8">
                            {t('news.readMore')} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;
