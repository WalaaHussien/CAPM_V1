import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Building2, DollarSign, HeartPulse, Stethoscope, ShieldCheck } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, Legend
} from 'recharts';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const COLORS = [
  'hsl(193, 100%, 45%)', 'hsl(193, 100%, 33%)', 'hsl(40, 90%, 52%)',
  'hsl(350, 65%, 50%)', 'hsl(193, 80%, 55%)', 'hsl(193, 70%, 50%)',
  'hsl(193, 100%, 48%)', 'hsl(40, 80%, 48%)'
];

const HealthcarePage: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const isAr = language === 'ar';

  // GDP Healthcare Spending Comparison
  const gdpData = [
    { country: isAr ? 'مصر' : 'Egypt', spending: 1.5 },
    { country: isAr ? 'المغرب' : 'Morocco', spending: 6.2 },
    { country: isAr ? 'تركيا' : 'Turkey', spending: 4.6 },
    { country: isAr ? 'السعودية' : 'Saudi Arabia', spending: 6.4 },
    { country: isAr ? 'الإمارات' : 'UAE', spending: 4.2 },
    { country: isAr ? 'الأردن' : 'Jordan', spending: 7.5 },
  ];

  // Hospital Choice Parameters
  const hospitalParams = [
    { param: isAr ? 'النظافة' : 'Cleanliness', score: 95 },
    { param: isAr ? 'جودة الخدمة' : 'Service Quality', score: 88 },
    { param: isAr ? 'بنك الدم' : 'Blood Banks', score: 75 },
    { param: isAr ? 'المعدات المتقدمة' : 'Advanced Equipment', score: 82 },
    { param: isAr ? 'أطباء مؤهلون' : 'Qualified Doctors', score: 90 },
    { param: isAr ? 'الأسعار' : 'Prices', score: 60 },
    { param: isAr ? 'التمريض' : 'Nursing', score: 70 },
  ];

  // Overseas Treatment Interest
  const overseasData = [
    { name: isAr ? 'لا يرغبون بالعلاج بالخارج' : 'Not interested abroad', value: 80 },
    { name: isAr ? 'يرغبون بالعلاج بالخارج' : 'Willing to go abroad', value: 17 },
    { name: isAr ? 'غير متأكدين' : 'Uncertain', value: 3 },
  ];

  // CAPITALMED Reception
  const receptionData = [
    { name: isAr ? 'استقبال إيجابي' : 'Positive Reception', value: 85 },
    { name: isAr ? 'محايد' : 'Neutral', value: 10 },
    { name: isAr ? 'متحفظ' : 'Reserved', value: 5 },
  ];

  // Healthcare Problems
  const problemsData = [
    { problem: isAr ? 'ضعف النظافة' : 'Poor Hygiene', severity: 85 },
    { problem: isAr ? 'نقص التعقيم' : 'Lack of Sterilization', severity: 80 },
    { problem: isAr ? 'نقص الحضّانات' : 'Lack of Incubators', severity: 70 },
    { problem: isAr ? 'ضعف الطوارئ' : 'Weak Emergency', severity: 75 },
    { problem: isAr ? 'أطباء طلاب' : 'Student Doctors', severity: 65 },
    { problem: isAr ? 'غرف عمليات قديمة' : 'Old OR Equipment', severity: 72 },
    { problem: isAr ? 'ضعف التمريض' : 'Poor Nursing', severity: 78 },
  ];

  // Most Renowned Hospitals
  const renownedData = [
    { hospital: isAr ? 'كليوباترا' : 'Cleopatra', score: 92 },
    { hospital: isAr ? 'الجنزوري' : 'Elganzoory', score: 85 },
    { hospital: isAr ? 'السلام الدولي' : 'El Salam El Dawli', score: 80 },
    { hospital: isAr ? 'وادي النيل' : 'Wadi El Nil', score: 78 },
    { hospital: isAr ? 'مصر للطيران' : 'Masr Lel Tayaran', score: 75 },
    { hospital: isAr ? 'دار الفؤاد' : 'Dar El Fouad', score: 88 },
  ];

  // Radar Data: Quality Metrics
  const qualityRadar = [
    { metric: isAr ? 'النظافة' : 'Cleanliness', current: 40, capitalmed: 95 },
    { metric: isAr ? 'التعقيم' : 'Sterilization', current: 45, capitalmed: 98 },
    { metric: isAr ? 'المعدات' : 'Equipment', current: 50, capitalmed: 95 },
    { metric: isAr ? 'التمريض' : 'Nursing', current: 35, capitalmed: 90 },
    { metric: isAr ? 'الأسعار' : 'Affordability', current: 55, capitalmed: 75 },
    { metric: isAr ? 'التشخيص' : 'Diagnosis', current: 60, capitalmed: 95 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            {isAr ? 'نظرة شاملة' : 'Comprehensive Overview'}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isAr ? 'نظام الرعاية الصحية في مصر' : 'Healthcare System Overview'}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/90 max-w-3xl mx-auto">
            {isAr
              ? 'تحليل شامل لواقع الرعاية الصحية في مصر وكيف تسعى كابيتال ميد لتغيير هذا الواقع'
              : 'A comprehensive analysis of Egypt\'s healthcare landscape and how CAPITALMED aims to transform it'}
          </motion.p>
        </div>
      </section>

      {/* Overview Text Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="section-title">{isAr ? 'التحديات الرئيسية' : 'Key Challenges'}</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                { icon: DollarSign, text: isAr ? 'مصر تنفق 1.5% فقط من الناتج المحلي على الرعاية الصحية' : 'Egypt spends only 1.5% of GDP on healthcare' },
                { icon: Users, text: isAr ? 'نسبة الممرضين إلى السكان منخفضة جداً' : 'Very low nurse-to-population ratio' },
                { icon: TrendingUp, text: isAr ? 'تكاليف الرعاية الصحية في تزايد مستمر' : 'Healthcare costs are continuously rising' },
                { icon: Building2, text: isAr ? 'انعدام الثقة في المستشفيات العامة' : 'Lack of confidence in public hospitals' },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="premium-card p-5 flex gap-4">
                  <item.icon className="w-6 h-6 text-destructive shrink-0 mt-1" />
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAPITALMED Differentiation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              {isAr ? 'ما الذي يميز كابيتال ميد؟' : 'What Makes CAPITALMED Different?'}
            </h2>
            <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-sm">
              {isAr ? 'مدينة صحية ذكية متكاملة تخدم أكثر من 5 ملايين عميل سنوياً' : 'A smart fully-fledged Healthcare City serving 5M+ clients annually'}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { n: '4,000+', l: isAr ? 'سرير' : 'Beds' },
                { n: '700', l: isAr ? 'عناية مركزة' : 'ICUs' },
                { n: '70', l: isAr ? 'غرفة عمليات' : 'ORs' },
                { n: '15,000+', l: isAr ? 'مقدم رعاية' : 'Providers' },
              ].map((s, i) => (
                <div key={i} className="bg-primary/5 border border-primary/15 rounded-xl p-5 text-center">
                  <p className="text-2xl font-bold text-primary">{s.n}</p>
                  <p className="text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Charts Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="section-label">{isAr ? 'بحث تسويقي' : 'Marketing Research'}</p>
            <h2 className="section-title">{isAr ? 'بيانات وأبحاث السوق' : 'Market Research & Data'}</h2>
            <p className="section-subtitle">
              {isAr
                ? 'تم إجراء 250 مقابلة معمقة مع العملاء والأطباء والممرضين من قطاعات مختلفة في القاهرة الكبرى'
                : '250 in-depth interviews with customers, doctors, and nurses across Greater Cairo sectors (A, B, C1)'}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            {/* GDP Chart */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="premium-card p-6">
              <h3 className="font-semibold mb-1">{isAr ? 'الإنفاق الصحي كنسبة من الناتج المحلي' : 'Healthcare Spending (% of GDP)'}</h3>
              <p className="text-xs text-muted-foreground mb-4">{isAr ? 'مقارنة بين الدول' : 'Country Comparison'}</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gdpData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 10% 85%)" />
                  <XAxis dataKey="country" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="spending" fill="hsl(193, 100%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Hospital Parameters */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="premium-card p-6">
              <h3 className="font-semibold mb-1">{isAr ? 'معايير اختيار المستشفى' : 'Hospital Choice Parameters'}</h3>
              <p className="text-xs text-muted-foreground mb-4">{isAr ? 'ما يبحث عنه المرضى' : 'What patients look for'}</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hospitalParams} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 10% 85%)" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="param" type="category" width={100} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(160, 60%, 40%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            {/* Overseas Treatment */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="premium-card p-6">
              <h3 className="font-semibold mb-1">{isAr ? 'الرغبة في العلاج بالخارج' : 'Overseas Treatment Interest'}</h3>
              <p className="text-xs text-muted-foreground mb-4">{isAr ? '80% لا يرغبون بالسفر للعلاج' : '80% no longer interested in overseas treatment'}</p>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={overseasData} cx="50%" cy="50%" outerRadius={90} innerRadius={45} dataKey="value" labelLine={false}>
                    {overseasData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ direction: isAr ? 'rtl' : 'ltr' }} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* CAPITALMED Reception */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="premium-card p-6">
              <h3 className="font-semibold mb-1">{isAr ? 'استقبال مفهوم كابيتال ميد' : 'CAPITALMED Concept Reception'}</h3>
              <p className="text-xs text-muted-foreground mb-4">{isAr ? 'ردود فعل إيجابية من الأغلبية' : 'Well received among majority of respondents'}</p>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={receptionData} cx="50%" cy="50%" outerRadius={90} innerRadius={45} dataKey="value" labelLine={false}>
                    {receptionData.map((_, i) => <Cell key={i} fill={COLORS[i + 3]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ direction: isAr ? 'rtl' : 'ltr' }} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            {/* Healthcare Problems */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="premium-card p-6">
              <h3 className="font-semibold mb-1">{isAr ? 'مشاكل القطاع الصحي' : 'Healthcare Sector Problems'}</h3>
              <p className="text-xs text-muted-foreground mb-4">{isAr ? 'حسب آراء المرضى' : 'According to patient feedback'}</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={problemsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 10% 85%)" />
                  <XAxis dataKey="problem" tick={{ fontSize: 9 }} height={60} />
                  <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="severity" fill="hsl(350, 65%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Most Renowned Hospitals */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="premium-card p-6">
              <h3 className="font-semibold mb-1">{isAr ? 'أشهر المستشفيات الخاصة' : 'Most Renowned Private Hospitals'}</h3>
              <p className="text-xs text-muted-foreground mb-4">{isAr ? 'أعلى 6 مستشفيات' : 'Top 6 hospitals by recognition'}</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={renownedData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 10% 85%)" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="hospital" type="category" width={110} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(199, 85%, 50%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Radar Chart */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="premium-card p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold mb-1 text-center">{isAr ? 'كابيتال ميد مقابل المعايير الحالية' : 'CAPITALMED vs Current Standards'}</h3>
            <p className="text-xs text-muted-foreground mb-4 text-center">{isAr ? 'مقارنة جودة الخدمات' : 'Healthcare Quality Comparison'}</p>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={qualityRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name={isAr ? 'المعيار الحالي' : 'Current Standard'} dataKey="current" stroke="hsl(350, 65%, 50%)" fill="hsl(350, 65%, 50%)" fillOpacity={0.2} />
                <Radar name="CAPITALMED" dataKey="capitalmed" stroke="hsl(193, 100%, 45%)" fill="hsl(193, 100%, 45%)" fillOpacity={0.3} />
                <Legend wrapperStyle={{ direction: isAr ? 'rtl' : 'ltr' }} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-primary/5 border border-primary/15 rounded-xl p-10 md:p-14 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              {isAr ? 'كابيتال ميد: أمل جديد للرعاية الصحية' : 'CAPITALMED: A New Hope for Healthcare'}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {isAr
                ? 'مشروع لتغيير واقع الرعاية الصحية في مصر والشرق الأوسط'
                : 'A project to revolutionize healthcare in Egypt and the Middle East'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/investment">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-[8px]">
                  {isAr ? 'فرص الاستثمار' : 'Investment Opportunities'}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="rounded-[8px]">
                  {isAr ? 'تواصل معنا' : 'Contact Us'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HealthcarePage;
