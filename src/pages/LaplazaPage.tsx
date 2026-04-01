import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, MapPin, Stethoscope, Users, Clock, Phone, HeartPulse, Shield, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const LaplazaPage: React.FC = () => {
    const { t, isRTL } = useLanguage();

    const features = [
        { icon: Stethoscope, titleEn: 'Multi-Specialty Care', titleAr: 'رعاية متعددة التخصصات', titleFr: 'Soins multi-spécialités', descEn: 'Comprehensive medical services across all major specialties under one roof.', descAr: 'خدمات طبية شاملة عبر جميع التخصصات الرئيسية تحت سقف واحد.', descFr: 'Des services médicaux complets dans toutes les grandes spécialités sous un même toit.' },
        { icon: HeartPulse, titleEn: '24/7 Emergency', titleAr: 'طوارئ على مدار الساعة', titleFr: 'Urgences 24h/24', descEn: 'Round-the-clock emergency department with rapid response teams.', descAr: 'قسم طوارئ يعمل على مدار الساعة مع فرق استجابة سريعة.', descFr: 'Service d\'urgence permanent avec des équipes de réponse rapide.' },
        { icon: Users, titleEn: 'Expert Medical Team', titleAr: 'فريق طبي متميز', titleFr: 'Équipe médicale experte', descEn: 'Board-certified physicians and internationally trained specialists.', descAr: 'أطباء معتمدون ومتخصصون مدربون دولياً.', descFr: 'Médecins certifiés et spécialistes formés à l\'international.' },
        { icon: Shield, titleEn: 'Insurance Partners', titleAr: 'شركاء التأمين', titleFr: 'Partenaires assurance', descEn: 'Accepted by major local and international insurance providers.', descAr: 'مقبول من قبل شركات التأمين المحلية والدولية الكبرى.', descFr: 'Accepté par les principaux assureurs locaux et internationaux.' },
        { icon: Bed, titleEn: 'Premium Facilities', titleAr: 'مرافق متميزة', titleFr: 'Installations premium', descEn: 'State-of-the-art medical equipment and comfortable patient suites.', descAr: 'أحدث المعدات الطبية وأجنحة مريحة للمرضى.', descFr: 'Équipements médicaux de pointe et suites patient confortables.' },
        { icon: Clock, titleEn: 'Outpatient Clinics', titleAr: 'العيادات الخارجية', titleFr: 'Consultations externes', descEn: 'Convenient outpatient services with minimal wait times.', descAr: 'خدمات العيادات الخارجية مع أوقات انتظار قصيرة.', descFr: 'Services ambulatoires avec des temps d\'attente minimaux.' },
    ];

    const getLocalized = (en: string, ar: string, fr: string) => {
        return isRTL ? ar : t('nav.laplaza').startsWith('Hôpital') ? fr : en;
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="page-hero">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                        {t('laPlaza.tagline')}
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-brand text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('laPlaza.badge')}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-white/90 max-w-2xl mx-auto">
                        {getLocalized(
                            'A CAPITALMED hospital delivering world-class healthcare with compassion and excellence.',
                            'مستشفى تابع لكابيتال ميد يقدم رعاية صحية عالمية المستوى بتعاطف وتميز.',
                            'Un hôpital CAPITALMED offrant des soins de santé de classe mondiale avec compassion et excellence.'
                        )}
                    </motion.p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {/* La Plaza Brand Mark removed — logo is in navbar */}
                            <p className="section-label">
                                {getLocalized('CAPITALMED Hospital', 'مستشفى كابيتال ميد', 'Hôpital CAPITALMED')}
                            </p>
                            <h2 className="section-title mb-5">
                                {getLocalized('Welcome to Laplaza Hospital', 'مرحباً بكم في مستشفى لابلازا', 'Bienvenue à l\'Hôpital Laplaza')}
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {getLocalized(
                                    'Laplaza Hospital is CAPITALMED\'s flagship community hospital, designed to provide accessible, high-quality healthcare to the residents of Badr City and the surrounding areas. With a focus on patient-centered care, our hospital combines modern medical technology with a warm, welcoming environment. From routine check-ups to complex procedures, our dedicated team of healthcare professionals is committed to your well-being at every step.',
                                    'مستشفى لابلازا هو المستشفى المجتمعي الرئيسي لكابيتال ميد، مصمم لتقديم رعاية صحية عالية الجودة وبأسعار معقولة لسكان مدينة بدر والمناطق المحيطة. مع التركيز على الرعاية المتمحورة حول المريض، يجمع مستشفانا بين التكنولوجيا الطبية الحديثة وبيئة دافئة ومرحبة. من الفحوصات الروتينية إلى الإجراءات المعقدة، فريقنا المتفاني من المتخصصين في الرعاية الصحية ملتزم برفاهيتكم في كل خطوة.',
                                    'L\'Hôpital Laplaza est l\'hôpital communautaire phare de CAPITALMED, conçu pour fournir des soins de santé accessibles et de haute qualité aux résidents de Badr City et des environs. Axé sur des soins centrés sur le patient, notre hôpital allie technologie médicale moderne et environnement chaleureux et accueillant. Des bilans de routine aux procédures complexes, notre équipe dévouée de professionnels de santé s\'engage pour votre bien-être à chaque étape.'
                                )}
                            </p>
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {[
                            { value: '200+', labelEn: 'Hospital Beds', labelAr: 'سرير', labelFr: 'Lits d\'hôpital' },
                            { value: '50+', labelEn: 'Specialists', labelAr: 'أخصائي', labelFr: 'Spécialistes' },
                            { value: '24/7', labelEn: 'Emergency Care', labelAr: 'رعاية طوارئ', labelFr: 'Urgences' },
                            { value: '15+', labelEn: 'Departments', labelAr: 'قسم', labelFr: 'Départements' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="premium-card text-center p-6"
                            >
                                <div className="stat-number text-primary">{stat.value}</div>
                                <div className="text-muted-foreground text-sm">
                                    {getLocalized(stat.labelEn, stat.labelAr, stat.labelFr)}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section >

            {/* Features Grid */}
            < section className="py-20 bg-muted/30" >
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="section-label">
                            {getLocalized('What We Offer', 'ما نقدمه', 'Ce que nous offrons')}
                        </p>
                        <h2 className="section-title mb-4">
                            {getLocalized('Our Services', 'خدماتنا', 'Nos services')}
                        </h2>
                        <p className="section-subtitle">
                            {getLocalized(
                                'Comprehensive healthcare services tailored to meet the needs of our community.',
                                'خدمات رعاية صحية شاملة مصممة لتلبية احتياجات مجتمعنا.',
                                'Des services de santé complets adaptés aux besoins de notre communauté.'
                            )}
                        </p>
                    </div>
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                whileHover={{ y: -4, boxShadow: '0 12px 24px -4px rgba(0,40,100,0.08)' }}
                                className="premium-card p-6 cursor-pointer"
                            >
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors duration-300">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {getLocalized(feature.titleEn, feature.titleAr, feature.titleFr)}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {getLocalized(feature.descEn, feature.descAr, feature.descFr)}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section >

            {/* Location & Contact */}
            < section className="py-20" >
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="premium-card p-8 md:p-12">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <p className="section-label">
                                        {getLocalized('Get In Touch', 'تواصل معنا', 'Contactez-nous')}
                                    </p>
                                    <h2 className="section-title text-2xl md:text-3xl mb-4">
                                        {getLocalized('Visit Laplaza Hospital', 'زوروا مستشفى لابلازا', 'Visitez l\'Hôpital Laplaza')}
                                    </h2>
                                    <div className="space-y-4 text-muted-foreground">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <span>{getLocalized('CAPITALMED Healthcare City, Badr City, New Cairo, Egypt', 'كابيتال ميد سيتي الصحية، مدينة بدر، القاهرة الجديدة، مصر', 'CAPITALMED Healthcare City, Badr City, Nouveau Caire, Égypte')}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                                            <span dir="ltr">16999</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                                            <span>{getLocalized('24/7 Emergency Services', 'خدمات الطوارئ على مدار الساعة', 'Urgences 24h/24')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Link to="/doctors">
                                        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                            {t('hero.cta.doctor')}
                                        </Button>
                                    </Link>
                                    <Link to="/contact">
                                        <Button variant="outline" className="w-full">
                                            {t('contact.title')}
                                        </Button>
                                    </Link>
                                    <Link to="/patient-portal">
                                        <Button variant="outline" className="w-full">
                                            {t('nav.patientPortal')}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section >
        </motion.div >
    );
};

export default LaplazaPage;
