import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Users, DollarSign, Hospital, AlertTriangle, Target, Lightbulb, BarChart3, MapPin, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const HealthcareOverviewPage: React.FC = () => {
  const { t } = useLanguage();

  const challenges = [
    { icon: TrendingDown, title: 'Low GDP Spending', desc: 'Egypt spends only 1.5% of its GDP on healthcare while the next closest country spends 4.7% more.' },
    { icon: Users, title: 'Nursing Staff Shortage', desc: 'A clear shortage of qualified nursing staff to assist hospitals and medical centers deal with healthcare issues.' },
    { icon: DollarSign, title: 'Rising Healthcare Costs', desc: 'Healthcare services\' increasing cost is another challenge that Egyptians suffer from.' },
    { icon: Hospital, title: 'Quality Gap', desc: 'Lack of confidence in public healthcare services forces people toward overcharging private providers.' },
    { icon: AlertTriangle, title: 'Investment Mismatch', desc: 'Majority of investment directed toward private market — predominantly pharmacies and private clinics.' },
    { icon: Target, title: 'Bed & Nurse Ratios', desc: 'Major problems in the ratio of nurses to population and beds to population remain critical.' },
  ];

  const objectives = [
    'Introduce and position CAPITALMED as an international first-of-a-kind healthcare city in the region',
    'Create strong brand awareness & recognition for the project',
    'Build a favorable perception and positive feeling around the project',
    'Raise funds by attracting qualified local and international investors',
    'Provide investment opportunities to Egyptians',
  ];

  const differentiators = [
    'Smart fully-fledged Healthcare City',
    'High-quality integrated personalized tertiary healthcare',
    'Serving more than 5 million clients annually',
    '4,000+ beds, 700 ICUs, and 70 Operating Rooms',
    '15,000+ multi-disciplinary healthcare providers offering ~100 specialties',
    'Highly advanced services guided by the most advanced technology',
    'Affordable highest quality services for all age groups',
    'Academic & research activities mixed with high-tech facilities',
    'Non-Medical amenities: Hotel & Hospitality, Commercial & Retail, Transport',
  ];

  const researchAreas = [
    'Heliopolis', 'Nasr City', 'Zamalek', 'Maadi', 'Mohandeseen', 'Dokki', '6th of October', 'Sheikh Zayed', 'New Cairo'
  ];

  const patientAspirations = [
    'Improving cleanliness & hygiene',
    'Improving sterilization in hospitals',
    'Offering more incubators',
    'Improving emergency units',
    'Qualified doctors, not students',
    'Quality of operating rooms & equipment',
    'Correct diagnosis',
    'Blood bank availability',
    'Post-surgery healthcare',
    'Professional nursing training',
    'In-hospital laboratories and radiology',
  ];

  const qualityParameters = [
    { label: 'Cleanliness', pct: 29 },
    { label: 'Blood Bank Availability', pct: 15 },
    { label: 'Experience & Recovery Rate', pct: 12 },
    { label: 'Expertise of Doctors', pct: 11 },
    { label: 'Doctor\'s Recommendation', pct: 10 },
    { label: 'Word of Mouth', pct: 8 },
    { label: 'Quality of Clinics', pct: 8 },
    { label: 'Prices', pct: 7 },
  ];

  const chartImages = [
    { src: '/images/research/chart-common-problems.jpg', title: 'Common Problems Facing Healthcare Sector' },
    { src: '/images/research/chart-good-hospitals.jpg', title: 'Good Hospitals & Price vs Quality' },
    { src: '/images/research/chart-healthcare-services.jpg', title: 'Healthcare Services & Doctor Qualifications' },
    { src: '/images/research/chart-hospital-parameters.jpg', title: 'Hospital Parameters & Specializations' },
    { src: '/images/research/chart-best-hospital.jpg', title: 'Best Hospitals & Overseas Medical Care' },
    { src: '/images/research/chart-medical-city.jpg', title: 'Medical City Concept Reception' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="page-hero">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Insights & Analysis</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4">Healthcare System Overview</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-lg text-white/60 max-w-3xl mx-auto">Understanding Egypt's healthcare landscape and how CAPITALMED is positioned to transform it</motion.p>
          </div>
        </section>

        {/* Challenges */}
        <section className="container mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">Healthcare Challenges in Egypt</h2>
            <p className="section-subtitle">The quality of healthcare in Egypt varies widely and the public sector is struggling to improve access to quality services</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {challenges.map((c, i) => (
              <motion.div key={i} variants={fadeUp} className="premium-card p-6">
                <c.icon className="w-8 h-8 text-destructive/70 mb-3" />
                <h3 className="font-semibold text-sm mb-2">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Analysis & Objectives */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="section-title text-left">Strategic Analysis</h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Translating clients' insights and important data to achieve a concrete project. CAPITALMED will drive insights and translate them into effective action.
                </p>
                <ul className="space-y-3">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Target className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="section-title text-left">What Makes CAPITALMED Different</h2>
                <ul className="space-y-3">
                  {differentiators.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Marketing Research */}
        <section className="container mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="section-label">Marketing Research</p>
            <h2 className="section-title">CAPITALMED Launch Research</h2>
            <p className="section-subtitle">EHCS contracted with "Inspire" to carry out 250 one-to-one in-depth interviews with customers, doctors, and nurses from sectors A, B, & C1</p>
          </motion.div>

          {/* Areas Covered */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h3 className="font-semibold text-base mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Areas Covered in Greater Cairo</h3>
            <div className="flex flex-wrap gap-2">
              {researchAreas.map((area, i) => (
                <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">{area}</span>
              ))}
            </div>
          </motion.div>

          {/* Patient Aspirations */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="font-semibold text-base mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-accent" /> What Patients Aspire For</h3>
              <ul className="space-y-2">
                {patientAspirations.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />{a}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="font-semibold text-base mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> Parameters for Choosing a Hospital</h3>
              <div className="space-y-3">
                {qualityParameters.map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{p.label}</span>
                      <span className="font-semibold text-primary">{p.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${(p.pct / 29) * 100}%` }} viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }} className="h-full bg-primary rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Key Findings */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="premium-card p-8 mb-16">
            <h3 className="font-semibold text-lg mb-6 text-center">Key Research Findings</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">80%</p>
                <p className="text-xs text-muted-foreground">of interviewees are no longer interested in overseas treatment</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent mb-2">73%</p>
                <p className="text-xs text-muted-foreground">believe a medical city with high caliber doctors is a good idea</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-secondary mb-2">61%</p>
                <p className="text-xs text-muted-foreground">think CAPITALMED will improve the medical sector in Egypt</p>
              </div>
            </div>
          </motion.div>

          {/* Research Charts from PDF */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <h3 className="section-title">Research Data & Charts</h3>
            <p className="section-subtitle">Detailed findings from the CAPITALMED launch research conducted across Greater Cairo</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {chartImages.map((chart, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} className="premium-card overflow-hidden">
                <img src={chart.src} alt={chart.title} className="w-full h-auto" loading="lazy" />
                <div className="p-4">
                  <p className="text-sm font-semibold text-center">{chart.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Top Hospitals */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
            <h3 className="font-semibold text-base mb-6 text-center">Most Renowned Private Hospitals in Egypt</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Cleopatra', 'Elganzoory Hospital', 'El Salam El Dawli', 'Wadi El Nil', 'Masr Lel Tayaran', 'Dar El Fouad'].map((h, i) => (
                <span key={i} className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium">{h}</span>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default HealthcareOverviewPage;
