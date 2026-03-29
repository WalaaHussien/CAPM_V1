import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Users, DollarSign, Hospital, AlertTriangle, Target, Lightbulb, BarChart3, MapPin, CheckCircle2 } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const CHART_COLORS = [
  'hsl(200, 80%, 40%)', 'hsl(160, 70%, 40%)', 'hsl(30, 85%, 55%)',
  'hsl(350, 70%, 50%)', 'hsl(260, 60%, 55%)', 'hsl(45, 80%, 50%)',
  'hsl(180, 60%, 45%)', 'hsl(10, 75%, 55%)',
];

// Mock research data based on PDF
const commonProblemsData = [
  { name: 'Overcrowding', value: 68 },
  { name: 'Long Wait Times', value: 62 },
  { name: 'Lack of Hygiene', value: 58 },
  { name: 'Poor Equipment', value: 54 },
  { name: 'Unqualified Staff', value: 48 },
  { name: 'High Costs', value: 45 },
  { name: 'Misdiagnosis', value: 38 },
  { name: 'No Blood Bank', value: 32 },
];

const hospitalChoiceData = [
  { name: 'Cleanliness', value: 29 },
  { name: 'Blood Bank', value: 15 },
  { name: 'Recovery Rate', value: 12 },
  { name: 'Doctor Expertise', value: 11 },
  { name: 'Recommendation', value: 10 },
  { name: 'Word of Mouth', value: 8 },
  { name: 'Clinic Quality', value: 8 },
  { name: 'Prices', value: 7 },
];

const priceVsQualityData = [
  { name: 'Dar El Fouad', quality: 85, price: 90 },
  { name: 'Cleopatra', quality: 78, price: 75 },
  { name: 'El Salam', quality: 72, price: 65 },
  { name: 'Wadi El Nil', quality: 70, price: 70 },
  { name: 'Masr Tayaran', quality: 65, price: 55 },
  { name: 'Elganzoory', quality: 68, price: 60 },
];

const medicalCityReception = [
  { name: 'Strongly Support', value: 42 },
  { name: 'Support', value: 31 },
  { name: 'Neutral', value: 15 },
  { name: 'Skeptical', value: 8 },
  { name: 'Against', value: 4 },
];

const overseasCareData = [
  { name: 'Not Interested', value: 83 },
  { name: 'Willing', value: 17 },
];

const doctorQualityData = [
  { subject: 'Diagnosis', A: 72 },
  { subject: 'Communication', A: 58 },
  { subject: 'Availability', A: 45 },
  { subject: 'Experience', A: 80 },
  { subject: 'Empathy', A: 55 },
  { subject: 'Follow-up', A: 40 },
];

const bestHospitalData = [
  { name: 'Dar El Fouad', votes: 28 },
  { name: 'Cleopatra', votes: 22 },
  { name: 'El Salam Dawli', votes: 18 },
  { name: 'Wadi El Nil', votes: 15 },
  { name: 'Masr Tayaran', votes: 10 },
  { name: 'Others', votes: 7 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-xs text-muted-foreground">{p.name}: <span className="font-medium text-foreground">{p.value}%</span></p>
        ))}
      </div>
    );
  }
  return null;
};

const HealthcareOverviewPage: React.FC = () => {
  const { t } = useLanguage();

  const challenges = [
    { icon: TrendingDown, title: t('healthcare.challenge.gdp'), desc: t('healthcare.challenge.gdp.desc') },
    { icon: Users, title: t('healthcare.challenge.nursing'), desc: t('healthcare.challenge.nursing.desc') },
    { icon: DollarSign, title: t('healthcare.challenge.costs'), desc: t('healthcare.challenge.costs.desc') },
    { icon: Hospital, title: t('healthcare.challenge.quality'), desc: t('healthcare.challenge.quality.desc') },
    { icon: AlertTriangle, title: t('healthcare.challenge.investment'), desc: t('healthcare.challenge.investment.desc') },
    { icon: Target, title: t('healthcare.challenge.ratios'), desc: t('healthcare.challenge.ratios.desc') },
  ];

  const objectives = [
    t('healthcare.obj.1'), t('healthcare.obj.2'), t('healthcare.obj.3'), t('healthcare.obj.4'), t('healthcare.obj.5'),
  ];

  const differentiators = [
    t('healthcare.diff.1'), t('healthcare.diff.2'), t('healthcare.diff.3'), t('healthcare.diff.4'),
    t('healthcare.diff.5'), t('healthcare.diff.6'), t('healthcare.diff.7'), t('healthcare.diff.8'), t('healthcare.diff.9'),
  ];

  const researchAreas = [
    'Heliopolis', 'Nasr City', 'Zamalek', 'Maadi', 'Mohandeseen', 'Dokki', '6th of October', 'Sheikh Zayed', 'New Cairo'
  ];

  const patientAspirations = [
    t('healthcare.aspire.1'), t('healthcare.aspire.2'), t('healthcare.aspire.3'), t('healthcare.aspire.4'),
    t('healthcare.aspire.5'), t('healthcare.aspire.6'), t('healthcare.aspire.7'), t('healthcare.aspire.8'),
    t('healthcare.aspire.9'), t('healthcare.aspire.10'), t('healthcare.aspire.11'),
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('healthcare.hero.label')}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4">{t('healthcare.hero.title')}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-3xl mx-auto">{t('healthcare.hero.subtitle')}</motion.p>
        </div>
      </section>

      {/* Challenges */}
      <section className="container mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="section-title">{t('healthcare.challenges.title')}</h2>
          <p className="section-subtitle">{t('healthcare.challenges.subtitle')}</p>
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
              <h2 className="section-title text-left">{t('healthcare.analysis.title')}</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{t('healthcare.analysis.desc')}</p>
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
              <h2 className="section-title text-left">{t('healthcare.diff.title')}</h2>
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
          <p className="section-label">{t('healthcare.research.label')}</p>
          <h2 className="section-title">{t('healthcare.research.title')}</h2>
          <p className="section-subtitle">{t('healthcare.research.subtitle')}</p>
        </motion.div>

        {/* Areas Covered */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h3 className="font-semibold text-base mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> {t('healthcare.areas.title')}</h3>
          <div className="flex flex-wrap gap-2">
            {researchAreas.map((area, i) => (
              <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">{area}</span>
            ))}
          </div>
        </motion.div>

        {/* Patient Aspirations */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="font-semibold text-base mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-accent" /> {t('healthcare.aspirations.title')}</h3>
            <ul className="space-y-2">
              {patientAspirations.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />{a}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="font-semibold text-base mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> {t('healthcare.params.title')}</h3>
            <div className="space-y-3">
              {hospitalChoiceData.map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{p.name}</span>
                    <span className="font-semibold text-primary">{p.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${(p.value / 29) * 100}%` }} viewport={{ once: true }}
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
          <h3 className="font-semibold text-lg mb-6 text-center">{t('healthcare.findings.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">80%</p>
              <p className="text-xs text-muted-foreground">{t('healthcare.finding.1')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent mb-2">73%</p>
              <p className="text-xs text-muted-foreground">{t('healthcare.finding.2')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary mb-2">61%</p>
              <p className="text-xs text-muted-foreground">{t('healthcare.finding.3')}</p>
            </div>
          </div>
        </motion.div>

        {/* DYNAMIC CHARTS */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <h3 className="section-title">{t('healthcare.charts.title')}</h3>
          <p className="section-subtitle">{t('healthcare.charts.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Chart 1: Common Problems */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card p-6">
            <h4 className="font-semibold text-sm mb-4 text-center">{t('healthcare.chart.problems')}</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={commonProblemsData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Respondents" radius={[0, 4, 4, 0]}>
                  {commonProblemsData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Chart 2: Hospital Choice Parameters */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="premium-card p-6">
            <h4 className="font-semibold text-sm mb-4 text-center">{t('healthcare.chart.params')}</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={hospitalChoiceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {hospitalChoiceData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Chart 3: Price vs Quality */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card p-6">
            <h4 className="font-semibold text-sm mb-4 text-center">{t('healthcare.chart.priceQuality')}</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceVsQualityData} margin={{ left: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="quality" name="Quality Score" fill="hsl(200, 80%, 40%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="price" name="Price Level" fill="hsl(30, 85%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Chart 4: Medical City Concept Reception */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="premium-card p-6">
            <h4 className="font-semibold text-sm mb-4 text-center">{t('healthcare.chart.reception')}</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={medicalCityReception} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3}>
                  {medicalCityReception.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Chart 5: Doctor Qualifications Radar */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card p-6">
            <h4 className="font-semibold text-sm mb-4 text-center">{t('healthcare.chart.doctorQuality')}</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={doctorQualityData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                <PolarRadiusAxis tick={{ fontSize: 9 }} />
                <Radar name="Score" dataKey="A" stroke="hsl(200, 80%, 40%)" fill="hsl(200, 80%, 40%)" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Chart 6: Best Hospital Rankings */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="premium-card p-6">
            <h4 className="font-semibold text-sm mb-4 text-center">{t('healthcare.chart.bestHospital')}</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bestHospitalData} margin={{ left: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="votes" name="Votes %" radius={[4, 4, 0, 0]}>
                  {bestHospitalData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Overseas Care & Top Hospitals */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card p-6">
            <h4 className="font-semibold text-sm mb-4 text-center">{t('healthcare.chart.overseas')}</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={overseasCareData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} fontSize={11}>
                  <Cell fill="hsl(200, 80%, 40%)" />
                  <Cell fill="hsl(30, 85%, 55%)" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground text-center mt-2">{t('healthcare.overseas.note')}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="font-semibold text-base mb-6 text-center">{t('healthcare.hospitals.title')}</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Cleopatra', 'Elganzoory Hospital', 'El Salam El Dawli', 'Wadi El Nil', 'Masr Lel Tayaran', 'Dar El Fouad'].map((h, i) => (
                <span key={i} className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium">{h}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HealthcareOverviewPage;
