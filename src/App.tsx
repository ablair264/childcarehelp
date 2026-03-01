import { useState, useEffect, useRef } from 'react';
import type { Page } from './types';
import BlogIndexPage from './pages/BlogIndex';
import BlogCombiningSchemesPage from './pages/BlogCombiningSchemes';
import Blog30HoursGuidePage from './pages/Blog30HoursGuide';
import BlogTFCvsUCPage from './pages/BlogTFCvsUC';
import {
  CheckCircle,
  Clock,
  Calculator,
  Baby,
  Users,
  CreditCard,
  PiggyBank,
  Menu,
  X,
  ArrowRight,
  Star,
  HelpCircle,
  Calendar,
  Building2,
  Heart,
  Sparkles,
  Shield,
  Zap,
  ExternalLink,
  Cookie,
  ChevronLeft,
  Layers,
  Scale,
  BookOpen,
  Mail,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Extend window for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// ─── Cookie Consent ──────────────────────────────────────────────────────────
function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false });

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent');
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = (all: boolean) => {
    const consent = all
      ? { analytics: true, marketing: true, essential: true, timestamp: Date.now() }
      : { ...prefs, essential: true, timestamp: Date.now() };
    localStorage.setItem('cookie_consent', JSON.stringify(consent));

    // Update GA consent in real time
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
      });
      if (consent.analytics) {
        window.gtag('event', 'page_view');
      }

    }

    setVisible(false);
    toast.success('Cookie preferences saved!');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
      <div className="max-w-4xl mx-auto glass rounded-2xl shadow-2xl border border-purple/10 overflow-hidden">
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 bg-purple/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <Cookie className="w-5 h-5 text-purple" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-dark text-lg mb-1">We use cookies 🍪</h3>
              <p className="text-light text-sm leading-relaxed">
                We use cookies to improve your experience, analyse site traffic, and personalise content.
                You can choose which cookies you accept below. Essential cookies are always active.{' '}
                <button
                  onClick={() => navigate('cookies')}
                  className="text-purple underline underline-offset-2 hover:text-purple/80 transition-colors"
                >
                  Read our Cookie Policy
                </button>
              </p>
            </div>
          </div>

          {showDetails && (
            <div className="mb-4 space-y-3 bg-white/50 rounded-xl p-4">
              {[
                { key: 'essential', label: 'Essential', desc: 'Required for the site to function. Cannot be disabled.', forced: true },
                { key: 'analytics', label: 'Analytics', desc: 'Help us understand how visitors use the site (e.g. Google Analytics).', forced: false },
                { key: 'marketing', label: 'Marketing', desc: 'Used to show relevant ads and measure campaign effectiveness.', forced: false },
              ].map(({ key, label, desc, forced }) => (
                <div key={key} className="flex items-start gap-3">
                  <button
                    disabled={forced}
                    onClick={() => !forced && setPrefs(p => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                    className={`mt-0.5 w-10 h-6 rounded-full transition-colors flex-shrink-0 relative ${forced || prefs[key as keyof typeof prefs]
                      ? 'bg-purple'
                      : 'bg-gray-300'
                      } ${forced ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${forced || prefs[key as keyof typeof prefs] ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                  </button>
                  <div>
                    <p className="font-medium text-dark text-sm">{label} {forced && <span className="text-light text-xs">(Always on)</span>}</p>
                    <p className="text-light text-xs">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3 items-center">
            <Button
              className="gradient-purple text-white rounded-full px-6 btn-squish"
              onClick={() => accept(true)}
            >
              Accept All
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 border-purple text-purple hover:bg-purple hover:text-white"
              onClick={() => accept(false)}
            >
              {showDetails ? 'Save Preferences' : 'Essential Only'}
            </Button>
            <button
              className="text-sm text-light hover:text-purple transition-colors ml-auto underline underline-offset-2"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide options' : 'Manage preferences'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Module-level navigate helper ───────────────────────────────────────────
let _navigate: (p: Page) => void = () => {};
function navigate(p: Page) { _navigate(p); }

// ─── Navigation Component ─────────────────────────────────────────────────────
function Navigation({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Funding Guide', href: '#schemes' },
    { name: 'Eligibility Checker', href: '#calculator' },
    { name: 'How It Works', href: '#pathway' },
    { name: 'FAQs', href: '#faq' },
  ];

  const scrollTo = (href: string) => {
    if (page !== 'home') { onNavigate('home'); setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 100); }
    else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass shadow-soft py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-dark">
              UK Childcare Help
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm rounded-full px-2 py-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm font-medium text-light hover:text-purple rounded-full hover:bg-purple-light transition-all relative group"
              >
                {link.name}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              className="gradient-purple text-white rounded-full px-6 btn-squish hover:shadow-glow"
              onClick={() => scrollTo('#calculator')}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-purple-light transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass rounded-2xl p-4 animate-slide-up">
            {navLinks.map((link) => (
              <button
                key={link.name}
                className="block w-full text-left px-4 py-3 text-dark hover:text-purple hover:bg-purple-light rounded-xl transition-all"
                onClick={() => { setIsMobileMenuOpen(false); scrollTo(link.href); }}
              >
                {link.name}
              </button>
            ))}
            <Button className="w-full mt-3 gradient-purple text-white rounded-xl" onClick={() => { setIsMobileMenuOpen(false); scrollTo('#calculator'); }}>
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav >
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({ x: (e.clientX - rect.left - rect.width / 2) / 50, y: (e.clientY - rect.top - rect.height / 2) / 50 });
      }
    };
    const hero = heroRef.current;
    if (hero) { hero.addEventListener('mousemove', handleMouseMove); return () => hero.removeEventListener('mousemove', handleMouseMove); }
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{ backgroundImage: 'url(/gradient-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow/30 rounded-full animate-float-slow" style={{ transform: `translate(${mousePosition.x * -2}px, ${mousePosition.y * -2}px)` }} />
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink/30 shape-blob animate-float" style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }} />
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-green/30 rounded-full animate-bounce-soft" style={{ transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)` }} />
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-purple/20 rounded-full animate-pulse-soft" />
        <Sparkles className="absolute bottom-1/4 right-10 w-8 h-8 text-yellow animate-wiggle" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <Badge className="bg-purple-light text-purple border-0 px-4 py-2 text-sm font-medium animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              UK Childcare Funding Guide 2026
            </Badge>
            <h1 className="font-heading font-extrabold text-5xl lg:text-6xl xl:text-7xl text-dark leading-tight animate-slide-up">
              Childcare Funding{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Made Simple</span>
                <span className="absolute bottom-2 left-0 right-0 h-4 bg-yellow/50 -rotate-1 rounded-lg" />
              </span>
            </h1>
            <p className="text-lg text-light max-w-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Discover how much you could save with our easy-to-use guide and eligibility tools. From 15 to 30 free hours, Tax-Free Childcare, and more — we've got you covered.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="gradient-purple text-white rounded-full px-8 py-6 text-lg btn-squish hover:shadow-glow" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                Check Your Eligibility
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-2 border-purple text-purple hover:bg-purple hover:text-white transition-all" onClick={() => document.getElementById('schemes')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Funding Options
              </Button>
            </div>
            <div className="flex gap-8 pt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div><p className="font-heading font-bold text-3xl text-purple">£7,500</p><p className="text-sm text-light">Max savings/year</p></div>
              <div className="w-px bg-purple/20" />
              <div><p className="font-heading font-bold text-3xl text-purple">30</p><p className="text-sm text-light">Free hours/week</p></div>
              <div className="w-px bg-purple/20" />
              <div><p className="font-heading font-bold text-3xl text-purple">9m+</p><p className="text-sm text-light">From 9 months</p></div>
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative" style={{ transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`, transition: 'transform 0.1s ease-out' }}>
              <div className="absolute -inset-4 bg-gradient-to-r from-purple/20 via-pink/20 to-yellow/20 rounded-3xl animate-spin-slow" />
              <img src="/hero-child.jpg" alt="Happy child with toy truck" className="relative rounded-3xl shadow-2xl w-full max-w-lg object-cover" />
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-card animate-bounce-soft">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-dark">Eligible!</p>
                    <p className="text-sm text-light">30 hours funding</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 glass rounded-2xl p-3 shadow-card animate-float">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink fill-pink" />
                  <span className="font-medium text-dark">Loved by families</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Funding Schemes ──────────────────────────────────────────────────────────
function FundingSchemes() {
  const schemes = [
    { title: '15 Hours Free', subtitle: 'Universal Entitlement', description: 'All 3-4 year olds in England get 15 hours free childcare per week, regardless of income or work status.', icon: Clock, color: 'bg-purple', badge: 'For Everyone', details: ['570 hours per year', 'From term after 3rd birthday', 'No application needed'] },
    { title: '30 Hours Free', subtitle: 'Working Families', description: 'Eligible working families can get up to 30 hours free childcare for children from 9 months to 4 years.', icon: Calendar, color: 'bg-green', badge: 'Working Parents', details: ['1,140 hours per year', 'Both parents working 16+ hrs', 'Earn under £100k each'] },
    { title: 'Tax-Free Childcare', subtitle: 'Government Top-up', description: 'Get £2 for every £8 you spend on childcare, up to £2,000 per child per year.', icon: PiggyBank, color: 'bg-yellow', badge: '20% Top-up', details: ['Up to £500 every 3 months', 'For children under 12', 'Can combine with other schemes'] },
    { title: 'Universal Credit', subtitle: 'Childcare Costs', description: 'Claim back up to 85% of your childcare costs if you are on Universal Credit.', icon: CreditCard, color: 'bg-pink', badge: 'Up to 85% Back', details: ['Max £1,032/month (1 child)', 'Max £1,769/month (2+ children)', 'Paid in arrears'] },
  ];

  return (
    <section id="schemes" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-purple-light text-purple border-0 mb-4">Funding Options</Badge>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark mb-4">Choose Your <span className="text-purple">Support</span></h2>
          <p className="text-lg text-light max-w-2xl mx-auto">The UK government offers several schemes to help with childcare costs. Find the one that works best for your family.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {schemes.map((scheme, index) => (
            <Card key={scheme.title} className="group card-hover border-0 shadow-card overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className={`${scheme.color} text-white p-6`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <scheme.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="font-heading font-bold text-xl">{scheme.title}</CardTitle>
                      <p className="text-white/80 text-sm">{scheme.subtitle}</p>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white border-0">{scheme.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-light mb-4">{scheme.description}</p>
                <ul className="space-y-2">
                  {scheme.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-dark">
                      <CheckCircle className="w-4 h-4 text-green flex-shrink-0" />{detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-6 border-0 shadow-card bg-gradient-to-r from-purple-light to-cream">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple/10 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-purple" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-dark">Good News!</h3>
                <p className="text-light">You can combine multiple schemes to maximize your savings.</p>
              </div>
            </div>
            <Button variant="outline" className="border-purple text-purple hover:bg-purple hover:text-white" onClick={() => toast.info('Tax-Free Childcare can be used alongside 15/30 hours funding!')}>
              Learn How <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// ─── Corrected Eligibility Calculator ───────────────────────────────────────────────────
function EligibilityCalculator() {
  // ─── State ─────────────────────────────────────────────────────────────────
  const [children, setChildren] = useState(1);
  const [hoursPerWeek, setHoursPerWeek] = useState(30);
  const [childAge, setChildAge] = useState<'9m-2' | '2-3' | '3-4'>('3-4');
  
  // Work status
  const [isWorking, setIsWorking] = useState(true);
  const [workHoursPerWeek] = useState(16);
  const [partnerWorks, setPartnerWorks] = useState(true);
  const [partnerWorkHours] = useState(16);
  
  // Income
  const [parent1Income, setParent1Income] = useState<number | ''>('');
  const [parent2Income, setParent2Income] = useState<number | ''>('');
  const [isSingleParent, setIsSingleParent] = useState(false);
  
  // Benefits & other schemes
  const [receivesUniversalCredit, setReceivesUniversalCredit] = useState(false);
  const [receivesTaxCredits, setReceivesTaxCredits] = useState(false);
  const [onBenefits, setOnBenefits] = useState(false); // For 2-year-old eligibility
  
  // Costs
  const [hourlyRate, setHourlyRate] = useState<string>('6.50');
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [additionalWeeklySpend, setAdditionalWeeklySpend] = useState<string>(''); // For TFC calculation
  
  // ─── Constants ─────────────────────────────────────────────────────────────
  const MIN_WORK_HOURS = 16;
  const MAX_INCOME_30HRS = 100000;
  const TFC_TOP_UP_RATE = 0.20; // 20% top-up
  const TFC_MAX_ANNUAL_PER_CHILD = 2000;
  const UC_MAX_MONTHLY_1_CHILD = 1031.88;
  const UC_MAX_MONTHLY_2PLUS_CHILDREN = 1768.94;
  const ANNUAL_WEEKS = 38; // Term-time only
  
  // ─── Helper Functions ──────────────────────────────────────────────────────
  const parsedRate = parseFloat(hourlyRate) || 6.50;
  const parsedAdditionalSpend = parseFloat(additionalWeeklySpend) || 0;
  
  const income1 = typeof parent1Income === 'number' ? parent1Income : 0;
  const income2 = typeof parent2Income === 'number' ? parent2Income : 0;
  
  // Check 30-hour working eligibility
  const meetsWorkRequirements = () => {
    if (!isWorking) return false;
    if (workHoursPerWeek < MIN_WORK_HOURS) return false;
    
    if (isSingleParent) {
      return true; // Single parent just needs to work 16+ hrs
    }
    
    // Both parents must work 16+ hours
    if (!partnerWorks || partnerWorkHours < MIN_WORK_HOURS) return false;
    return true;
  };
  
  // Check income limits for 30 hours
  const meetsIncomeRequirements = () => {
    if (income1 > MAX_INCOME_30HRS) return false;
    if (!isSingleParent && income2 > MAX_INCOME_30HRS) return false;
    return true;
  };
  
  // Determine eligible free hours based on age and circumstances
  const getEligibleFreeHours = () => {
    // 3-4 year olds: Universal 15 hours for everyone
    if (childAge === '3-4') {
      if (meetsWorkRequirements() && meetsIncomeRequirements()) {
        return 30;
      }
      return 15; // Universal entitlement
    }
    
    // 2-3 year olds: 15 hours if on benefits, 30 if working
    if (childAge === '2-3') {
      if (meetsWorkRequirements() && meetsIncomeRequirements()) {
        return 30;
      }
      if (onBenefits) {
        return 15; // Disadvantaged 2-year-old funding
      }
      return 0;
    }
    
    // 9m-2 year olds: 30 hours only if working (from Sept 2025 rollout)
    if (childAge === '9m-2') {
      if (meetsWorkRequirements() && meetsIncomeRequirements()) {
        return 30;
      }
      return 0;
    }
    
    return 0;
  };
  
  // ─── Calculations ──────────────────────────────────────────────────────────
  const eligibleFreeHours = getEligibleFreeHours();
  const actualFreeHours = Math.min(eligibleFreeHours, hoursPerWeek);
  const freeHoursWeeklyCost = actualFreeHours * parsedRate;
  const freeHoursAnnualSavings = freeHoursWeeklyCost * ANNUAL_WEEKS;
  
  // Calculate remaining costs after free hours
  const remainingWeeklyHours = Math.max(0, hoursPerWeek - actualFreeHours);
  const remainingWeeklyCost = remainingWeeklyHours * parsedRate;
  
  // Tax-Free Childcare calculation
  const calculateTFC = () => {
    // Cannot use TFC if receiving Universal Credit or Tax Credits
    if (receivesUniversalCredit || receivesTaxCredits) return 0;
    if (parsedAdditionalSpend <= 0) return 0;
    
    // TFC is 20% of what you pay, up to £2,000/year per child
    const annualSpend = parsedAdditionalSpend * 52; // User inputs weekly spend beyond free hours
    const potentialTopUp = annualSpend * TFC_TOP_UP_RATE;
    const maxTopUp = children * TFC_MAX_ANNUAL_PER_CHILD;
    
    return Math.min(potentialTopUp, maxTopUp);
  };
  
  const tfcSavings = calculateTFC();
  
  // Universal Credit childcare calculation (alternative to TFC)
  const calculateUC = () => {
    if (!receivesUniversalCredit) return 0;
    
    // UC covers up to 85% of remaining costs
    const monthlyRemainingCost = (remainingWeeklyCost * 52) / 12;
    const maxMonthly = children === 1 ? UC_MAX_MONTHLY_1_CHILD : UC_MAX_MONTHLY_2PLUS_CHILDREN;
    const claimableAmount = Math.min(monthlyRemainingCost * 0.85, maxMonthly);
    
    return claimableAmount * 12; // Annual
  };
  
  const ucSavings = calculateUC();
  
  // Total savings (Free Hours + either TFC or UC, not both)
  const totalSavings = Math.round(freeHoursAnnualSavings + (receivesUniversalCredit ? ucSavings : tfcSavings));
  
  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <section id="calculator" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Calculator Form */}
          <div>
            <Badge className="bg-green/20 text-green border-0 mb-4">
              <Calculator className="w-4 h-4 mr-2" />Eligibility Calculator
            </Badge>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark mb-4">
              Calculate Your <span className="text-purple">Savings</span>
            </h2>
            <p className="text-lg text-light mb-8">
              Get an accurate estimate based on current UK government rules (2025/26).
            </p>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6 space-y-8">
                
                {/* ─── Child Details ───────────────────────────────────────── */}
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-lg text-dark flex items-center gap-2">
                    <Baby className="w-5 h-5 text-purple" /> Child Details
                  </h3>
                  
                  <div>
                    <label className="block font-medium text-dark mb-3">Number of Children</label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        value={[children]} 
                        onValueChange={(v) => setChildren(v[0])} 
                        max={5} 
                        min={1} 
                        step={1} 
                        className="flex-1" 
                      />
                      <span className="font-heading font-bold text-2xl text-purple w-8">{children}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-dark mb-3">Child's Age</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { key: '9m-2', label: '9-23 months', note: '30hrs if working' },
                        { key: '2-3', label: '2-3 years', note: '15hrs on benefits' },
                        { key: '3-4', label: '3-4 years', note: '15hrs universal' }
                      ].map((age) => (
                        <button 
                          key={age.key} 
                          onClick={() => setChildAge(age.key as typeof childAge)} 
                          className={`py-3 px-2 rounded-xl border-2 transition-all text-sm flex flex-col items-center gap-1 ${
                            childAge === age.key 
                              ? 'border-purple bg-purple-light text-purple' 
                              : 'border-gray-200 text-light hover:border-purple/50'
                          }`}
                        >
                          <span className="font-medium">{age.label}</span>
                          <span className="text-xs opacity-80">{age.note}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {childAge === '2-3' && (
                    <div className="bg-yellow/10 rounded-xl p-4 border border-yellow/20">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={onBenefits} 
                          onChange={(e) => setOnBenefits(e.target.checked)}
                          className="w-5 h-5 rounded border-purple text-purple focus:ring-purple"
                        />
                        <span className="text-dark">Receiving qualifying benefits (for 15 hours)</span>
                      </label>
                      <p className="text-xs text-light mt-2 ml-8">
                        Includes Income Support, JSA, ESA, Universal Credit, Tax Credits, etc.
                      </p>
                    </div>
                  )}
                </div>

                {/* ─── Work & Income ───────────────────────────────────────── */}
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-lg text-dark flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-purple" /> Work & Income
                  </h3>

                  <div>
                    <label className="block font-medium text-dark mb-3">Are you working?</label>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setIsWorking(true)} 
                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                          isWorking 
                            ? 'border-purple bg-purple-light text-purple' 
                            : 'border-gray-200 text-light hover:border-purple/50'
                        }`}
                      >
                        Yes, 16+ hrs/week
                      </button>
                      <button 
                        onClick={() => setIsWorking(false)} 
                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                          !isWorking 
                            ? 'border-purple bg-purple-light text-purple' 
                            : 'border-gray-200 text-light hover:border-purple/50'
                        }`}
                      >
                        No / Less than 16hrs
                      </button>
                    </div>
                  </div>

                  {isWorking && (
                    <>
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          id="singleParent" 
                          checked={isSingleParent} 
                          onChange={(e) => setIsSingleParent(e.target.checked)}
                          className="w-5 h-5 rounded border-purple text-purple"
                        />
                        <label htmlFor="singleParent" className="text-dark">Single parent household</label>
                      </div>

                      {!isSingleParent && (
                        <div>
                          <label className="block font-medium text-dark mb-3">Partner working 16+ hrs/week?</label>
                          <div className="flex gap-4">
                            <button 
                              onClick={() => setPartnerWorks(true)} 
                              className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                                partnerWorks 
                                  ? 'border-purple bg-purple-light text-purple' 
                                  : 'border-gray-200 text-light hover:border-purple/50'
                              }`}
                            >
                              Yes
                            </button>
                            <button 
                              onClick={() => setPartnerWorks(false)} 
                              className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                                !partnerWorks 
                                  ? 'border-purple bg-purple-light text-purple' 
                                  : 'border-gray-200 text-light hover:border-purple/50'
                              }`}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-dark mb-2">Your annual income</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark">£</span>
                            <input 
                              type="number" 
                              value={parent1Income} 
                              onChange={(e) => setParent1Income(e.target.value ? Number(e.target.value) : '')}
                              placeholder="e.g. 35000"
                              className="w-full pl-8 pr-4 py-2 rounded-xl border-2 border-purple/30 focus:border-purple outline-none"
                            />
                          </div>
                        </div>
                        {!isSingleParent && (
                          <div>
                            <label className="block text-sm font-medium text-dark mb-2">Partner's annual income</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark">£</span>
                              <input 
                                type="number" 
                                value={parent2Income} 
                                onChange={(e) => setParent2Income(e.target.value ? Number(e.target.value) : '')}
                                placeholder="e.g. 35000"
                                className="w-full pl-8 pr-4 py-2 rounded-xl border-2 border-purple/30 focus:border-purple outline-none"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-light">
                        Must be under £100,000 each for 30-hour eligibility. Earning at least £195/week (NMW for 16hrs).
                      </p>
                    </>
                  )}
                </div>

                {/* ─── Other Schemes ───────────────────────────────────────── */}
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-lg text-dark flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-purple" /> Other Support
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={receivesUniversalCredit} 
                        onChange={(e) => {
                          setReceivesUniversalCredit(e.target.checked);
                          if (e.target.checked) setReceivesTaxCredits(false);
                        }}
                        className="w-5 h-5 rounded border-purple text-purple"
                      />
                      <span className="text-dark">Receiving Universal Credit</span>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={receivesTaxCredits} 
                        onChange={(e) => {
                          setReceivesTaxCredits(e.target.checked);
                          if (e.target.checked) setReceivesUniversalCredit(false);
                        }}
                        className="w-5 h-5 rounded border-purple text-purple"
                      />
                      <span className="text-dark">Receiving Tax Credits</span>
                    </label>
                  </div>

                  {(receivesUniversalCredit || receivesTaxCredits) && (
                    <div className="bg-pink/10 rounded-xl p-4 border border-pink/20">
                      <p className="text-sm text-dark">
                        <strong>Note:</strong> You cannot use Tax-Free Childcare with {receivesUniversalCredit ? 'Universal Credit' : 'Tax Credits'}. 
                        We'll calculate which gives you better support.
                      </p>
                    </div>
                  )}
                </div>

                {/* ─── Childcare Costs ─────────────────────────────────────── */}
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-lg text-dark flex items-center gap-2">
                    <PiggyBank className="w-5 h-5 text-purple" /> Childcare Costs
                  </h3>

                  <div>
                    <label className="flex items-center justify-between mb-3">
                      <span className="font-medium text-dark">Hours per week needed</span>
                      <span className="font-heading font-bold text-2xl text-purple">{hoursPerWeek}h</span>
                    </label>
                    <Slider 
                      value={[hoursPerWeek]} 
                      onValueChange={(v) => setHoursPerWeek(v[0])} 
                      max={50} 
                      min={5} 
                      step={5} 
                      className="w-full" 
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-medium text-dark">Nursery hourly rate</label>
                      <button
                        onClick={() => setUseCustomRate(!useCustomRate)}
                        className={`text-xs px-3 py-1 rounded-full border transition-all ${
                          useCustomRate 
                            ? 'border-purple bg-purple-light text-purple' 
                            : 'border-gray-200 text-light hover:border-purple/50'
                        }`}
                      >
                        {useCustomRate ? 'Using custom rate' : 'Use UK average (£6.50)'}
                      </button>
                    </div>

                    {useCustomRate ? (
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark font-medium">£</span>
                        <input
                          type="number"
                          value={hourlyRate}
                          onChange={(e) => setHourlyRate(e.target.value)}
                          min={3}
                          max={25}
                          step={0.25}
                          className="w-full pl-9 pr-16 py-3 rounded-xl border-2 border-purple/30 focus:border-purple outline-none font-medium text-dark"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-light text-sm">/hr</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-purple-light rounded-xl p-4">
                        <PiggyBank className="w-5 h-5 text-purple flex-shrink-0" />
                        <p className="text-sm text-purple">
                          Using UK average of <span className="font-bold">£6.50/hr</span>. 
                          Toggle above to enter your actual rate.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tax-Free Childcare spending input - only show if eligible */}
                  {!receivesUniversalCredit && !receivesTaxCredits && eligibleFreeHours > 0 && (
                    <div className="bg-green/10 rounded-xl p-4 border border-green/20 space-y-3">
                      <label className="block font-medium text-dark">
                        Weekly childcare costs AFTER free hours
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark">£</span>
                        <input
                          type="number"
                          value={additionalWeeklySpend}
                          onChange={(e) => setAdditionalWeeklySpend(e.target.value)}
                          placeholder="e.g. 100"
                          className="w-full pl-8 pr-4 py-2 rounded-xl border-2 border-green/30 focus:border-green outline-none"
                        />
                      </div>
                      <p className="text-xs text-light">
                        Tax-Free Childcare gives 20% back on these costs (max £2,000/year/child). 
                        Based on {remainingWeeklyHours}hrs/week not covered by free hours.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ─── Results Panel ─────────────────────────────────────────────── */}
          <div className="lg:pl-8 lg:sticky lg:top-32">
            <Card className={`border-0 shadow-card overflow-hidden relative ${
              totalSavings > 0 ? 'gradient-purple text-white' : 'bg-gray-100 text-dark'
            }`}>
              {totalSavings > 0 && (
                <>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                </>
              )}
              
              <CardContent className="p-8 relative">
                <div className="text-center mb-8">
                  <p className={`mb-2 ${totalSavings > 0 ? 'text-white/80' : 'text-light'}`}>
                    Your Estimated Annual Savings
                  </p>
                  <div className={`font-heading font-extrabold text-6xl lg:text-7xl ${
                    totalSavings > 0 ? '' : 'text-gray-400'
                  }`}>
                    £{totalSavings.toLocaleString()}
                  </div>
                  
                  {totalSavings === 0 && (
                    <p className="text-light mt-4">
                      Based on your circumstances, you may not be eligible for additional funding. 
                      All 3-4 year olds get 15 universal hours.
                    </p>
                  )}
                </div>

                {totalSavings > 0 && (
                  <div className="space-y-4 mb-8">
                    {/* Free Hours Breakdown */}
                    {freeHoursAnnualSavings > 0 && (
                      <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-yellow" />
                          <div>
                            <span className="font-medium">
                              {eligibleFreeHours === 30 ? '30 Hours Free' : '15 Hours Free'}
                            </span>
                            <p className="text-xs text-white/70">
                              {actualFreeHours}hrs/week × {ANNUAL_WEEKS} weeks
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-lg">£{Math.round(freeHoursAnnualSavings).toLocaleString()}</span>
                      </div>
                    )}

                    {/* Tax-Free Childcare */}
                    {!receivesUniversalCredit && tfcSavings > 0 && (
                      <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <PiggyBank className="w-5 h-5 text-yellow" />
                          <div>
                            <span className="font-medium">Tax-Free Childcare</span>
                            <p className="text-xs text-white/70">20% top-up on your spending</p>
                          </div>
                        </div>
                        <span className="font-bold text-lg">£{Math.round(tfcSavings).toLocaleString()}</span>
                      </div>
                    )}

                    {/* Universal Credit */}
                    {receivesUniversalCredit && ucSavings > 0 && (
                      <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-yellow" />
                          <div>
                            <span className="font-medium">Universal Credit (85% back)</span>
                            <p className="text-xs text-white/70">Up to £{children === 1 ? '1,032' : '1,769'}/month</p>
                          </div>
                        </div>
                        <span className="font-bold text-lg">£{Math.round(ucSavings).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Eligibility Status */}
                <div className={`rounded-xl p-4 mb-6 ${
                  totalSavings > 0 ? 'bg-white/10' : 'bg-white'
                }`}>
                  <h4 className={`font-bold mb-2 ${totalSavings > 0 ? 'text-white' : 'text-dark'}`}>
                    Your Eligibility Status
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      {eligibleFreeHours >= 15 ? (
                        <CheckCircle className={`w-4 h-4 ${totalSavings > 0 ? 'text-green' : 'text-green'}`} />
                      ) : (
                        <X className="w-4 h-4 text-red-400" />
                      )}
                      <span className={totalSavings > 0 ? 'text-white/90' : 'text-light'}>
                        {childAge === '3-4' 
                          ? '15 hours universal (all families)' 
                          : eligibleFreeHours >= 15 
                            ? '15 hours eligible' 
                            : '15 hours not eligible'}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      {eligibleFreeHours === 30 ? (
                        <CheckCircle className={`w-4 h-4 ${totalSavings > 0 ? 'text-green' : 'text-green'}`} />
                      ) : (
                        <X className={`w-4 h-4 ${totalSavings > 0 ? 'text-white/40' : 'text-gray-300'}`} />
                      )}
                      <span className={totalSavings > 0 ? 'text-white/90' : 'text-light'}>
                        30 hours working parent scheme
                        {!meetsWorkRequirements() && isWorking && ' (need 16+ hrs both parents)'}
                        {!meetsIncomeRequirements() && ' (income over £100k)'}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      {!receivesUniversalCredit && !receivesTaxCredits ? (
                        <CheckCircle className={`w-4 h-4 ${totalSavings > 0 ? 'text-green' : 'text-green'}`} />
                      ) : (
                        <X className={`w-4 h-4 ${totalSavings > 0 ? 'text-white/40' : 'text-gray-300'}`} />
                      )}
                      <span className={totalSavings > 0 ? 'text-white/90' : 'text-light'}>
                        Tax-Free Childcare available
                        {(receivesUniversalCredit || receivesTaxCredits) && ' (not with UC/Tax Credits)'}
                      </span>
                    </li>
                  </ul>
                </div>

                <Button 
                  className={`w-full font-bold py-6 rounded-xl btn-squish ${
                    totalSavings > 0 
                      ? 'bg-white text-purple hover:bg-yellow hover:text-dark' 
                      : 'bg-purple text-white hover:bg-purple/90'
                  }`} 
                  onClick={() => window.open('https://www.childcarechoices.gov.uk/', '_blank')}
                >
                  Check Official Eligibility <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <p className={`text-xs mt-4 text-center ${
                  totalSavings > 0 ? 'text-white/60' : 'text-light'
                }`}>
                  *Estimate only. Actual amounts depend on your specific circumstances and provider rates.
                </p>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <a 
                href="https://www.childcarechoices.gov.uk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass rounded-xl p-4 text-center hover:bg-purple-light transition-colors group"
              >
                <ExternalLink className="w-6 h-6 text-purple mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-dark text-sm">Childcare Choices</p>
              </a>
              <a 
                href="https://www.gov.uk/childcare-calculator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass rounded-xl p-4 text-center hover:bg-purple-light transition-colors group"
              >
                <Calculator className="w-6 h-6 text-purple mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-medium text-dark text-sm">Gov Calculator</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { number: '01', title: 'Check Your Status', description: 'Use our calculator or the government eligibility checker to see what funding you qualify for.', icon: CheckCircle, color: 'bg-purple' },
    { number: '02', title: 'Calculate Your Hours', description: 'Determine how many hours of free childcare you need and can claim based on your situation.', icon: Calculator, color: 'bg-green' },
    { number: '03', title: 'Find a Provider', description: 'Search for approved childcare providers in your area that accept government funding.', icon: Building2, color: 'bg-yellow' },
    { number: '04', title: 'Apply Online', description: 'Apply through the government portal and get your eligibility code to share with your provider.', icon: ArrowRight, color: 'bg-pink' },
  ];

  return (
    <section id="pathway" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-green/20 text-green border-0 mb-4"><Zap className="w-4 h-4 mr-2" />Simple Process</Badge>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark mb-4">How It <span className="text-purple">Works</span></h2>
          <p className="text-lg text-light max-w-2xl mx-auto">Getting started with childcare funding is easier than you think. Follow these simple steps to start saving.</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-purple/10 -translate-y-1/2" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <Card key={step.number} className="group card-hover border-0 shadow-card relative bg-white">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <Badge className={`${step.color} text-white border-0 mb-4`}>Step {step.number}</Badge>
                  <h3 className="font-heading font-bold text-xl text-dark mb-3">{step.title}</h3>
                  <p className="text-light text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <Button size="lg" className="gradient-purple text-white rounded-full px-8 btn-squish" onClick={() => window.open('https://www.childcarechoices.gov.uk/', '_blank')}>
            Start Your Application <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const faqs = [
    { question: 'Who is eligible for 30 hours free childcare?', answer: 'To qualify for 30 hours free childcare, both parents (or the sole parent in a single-parent household) must be working at least 16 hours per week at the National Minimum Wage or Living Wage, and each must earn less than £100,000 per year. This applies to children from 9 months old until they start school.' },
    { question: 'Can I combine different funding schemes?', answer: 'Yes! You can combine Tax-Free Childcare with the 15 or 30 hours free childcare entitlement. However, you cannot use Tax-Free Childcare if you are receiving Universal Credit childcare support or Tax Credits. It is worth calculating which option gives you the most support.' },
    { question: 'When can I start using my free hours?', answer: 'Your child becomes eligible the term after they reach the qualifying age. For example, if your child turns 3 in February, they can start from the April term. The cut-off dates are: 31st March (Summer term), 31st August (Autumn term), and 31st December (Spring term).' },
    { question: 'What does the funding cover?', answer: 'Government funding covers the cost of childcare hours only. It typically does not include meals, nappies, additional activities like trips, or extra hours beyond your entitlement. However, these charges must not be mandatory – speak to your provider about alternatives.' },
    { question: 'How do I apply for Tax-Free Childcare?', answer: 'You can apply online through the government website. You will need to create an online childcare account, and for every £8 you pay in, the government will add £2. You can get up to £500 every 3 months (£2,000 per year) for each child.' },
    { question: 'What if I am on Universal Credit?', answer: 'If you are on Universal Credit, you can claim back up to 85% of your childcare costs – up to £1,031.88 per month for one child or £1,768.94 for two or more children. You cannot use Tax-Free Childcare at the same time, so calculate which gives you more support.' },
    { question: 'Do I need to reconfirm my eligibility?', answer: 'Yes, for 30 hours childcare and Tax-Free Childcare, you need to reconfirm your eligibility every 3 months. You will receive a reminder email, and it is quick to do through your online account. If you do not reconfirm, your funding will stop.' },
    { question: 'Can I use any childcare provider?', answer: 'Your childcare provider must be registered with Ofsted (or the equivalent in Scotland, Wales, or Northern Ireland) and signed up to receive government funding. You cannot use the funding for nannies, home carers, or childcare provided by relatives like grandparents.' },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-pink/20 text-pink border-0 mb-4"><HelpCircle className="w-4 h-4 mr-2" />Common Questions</Badge>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark mb-4">Frequently Asked <span className="text-purple">Questions</span></h2>
          <p className="text-lg text-light">Got questions? We've got answers. If you can't find what you're looking for, feel free to reach out.</p>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-purple/10 rounded-2xl px-6 data-[state=open]:shadow-card data-[state=open]:border-purple/30 transition-all">
              <AccordionTrigger className="text-left font-heading font-semibold text-dark hover:text-purple py-5">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-light pb-5">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    { quote: "This website made understanding childcare funding so much easier. We saved over £5,000 in our first year!", author: "Sarah Mitchell", role: "Working Mum of Two", image: "/testimonial-sarah.jpg", rating: 5 },
    { quote: "The eligibility calculator was a game-changer. I had no idea we qualified for 30 hours funding until I checked here.", author: "James Thompson", role: "Single Parent", image: "/testimonial-james.jpg", rating: 5 },
    { quote: "Clear, simple, and actually helpful. The step-by-step guide helped us navigate the application process with confidence.", author: "Emma Wilson", role: "First-Time Mum", image: "/testimonial-emma.jpg", rating: 5 },
  ];

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-yellow/30 text-dark border-0 mb-4"><Heart className="w-4 h-4 mr-2" />Loved by Families</Badge>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark mb-4">What Parents <span className="text-purple">Say</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <Card key={index} className="card-hover border-0 shadow-card bg-white">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow fill-yellow" />)}</div>
                <p className="text-dark mb-6 text-lg leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                  <div><p className="font-heading font-bold text-dark">{t.author}</p><p className="text-sm text-light">{t.role}</p></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple flex items-center justify-center">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">UK Childcare Help</span>
            </div>
            <p className="text-white/60 max-w-md mb-6">Making UK childcare funding simple and accessible for every family. Calculate your savings, check your eligibility, and start your application today.</p>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="border-purple/20 text-black hover:bg-white hover:text-black" onClick={() => toast.info('Newsletter signup coming soon!')}>
                Subscribe for Updates
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[{ name: 'Home', href: '#home' }, { name: 'Funding Guide', href: '#schemes' }, { name: 'Eligibility Checker', href: '#calculator' }, { name: 'How It Works', href: '#pathway' }, { name: 'FAQs', href: '#faq' }].map((link) => (
                <li key={link.name}><a href={link.href} className="text-white/60 hover:text-purple transition-colors">{link.name}</a></li>
              ))}
              <li><button onClick={() => onNavigate('blog')} className="text-white/60 hover:text-purple transition-colors">Blog</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Official Resources</h4>
            <ul className="space-y-3">
              {[{ name: 'Childcare Choices', url: 'https://www.childcarechoices.gov.uk/' }, { name: 'Best Start in Life', url: 'https://beststartinlife.gov.uk/' }, { name: 'GOV.UK Childcare', url: 'https://www.gov.uk/childcare-calculator' }, { name: 'Ofsted', url: 'https://www.ofsted.gov.uk/' }].map((link) => (
                <li key={link.name}><a href={link.url} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-purple transition-colors flex items-center gap-1">{link.name}<ExternalLink className="w-3 h-3" /></a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© 2026 Splitfin Ltd. Information provided for guidance only.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('cookies')} className="hover:text-white transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Legal Page Wrapper ───────────────────────────────────────────────────────
function LegalPage({ title, badge, children, onBack }: { title: string; badge: string; children: React.ReactNode; onBack: () => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-cream pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-purple hover:text-purple/80 transition-colors mb-8 group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>
        <Badge className="bg-purple-light text-purple border-0 mb-4">{badge}</Badge>
        <h1 className="font-heading font-bold text-4xl lg:text-5xl text-dark mb-8">{title}</h1>
        <Card className="border-0 shadow-card bg-white">
          <CardContent className="p-8 prose prose-slate max-w-none">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Privacy Policy Page ──────────────────────────────────────────────────────
function PrivacyPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalPage title="Privacy Policy" badge="Legal" onBack={onBack}>
      <div className="space-y-6 text-light leading-relaxed">
        <p className="text-sm text-light/70">Last updated: 1 January 2025</p>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">1. Who We Are</h2>
          <p>Splitfin Ltd T/A UK Childcare Help ("we", "us", "our") provides information and tools to help UK families understand and access government childcare funding. This Privacy Policy explains how we collect, use, and protect your personal data when you visit <strong>ukchildcarehelp.co.uk</strong>.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">2. Data We Collect</h2>
          <p>We may collect the following types of data:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Usage data</strong> – pages visited, time on site, browser type, device type, and IP address (anonymised where possible).</li>
            <li><strong>Calculator inputs</strong> – number of children, hours, and cost data you enter into our eligibility calculator. This data is processed locally in your browser and is not stored on our servers.</li>
            <li><strong>Cookie preferences</strong> – stored locally in your browser via <code>localStorage</code>.</li>
            <li><strong>Contact data</strong> – if you contact us by email, we collect the information you choose to provide.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">3. Legal Basis for Processing</h2>
          <p>We rely on the following legal bases under UK GDPR:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Legitimate interests</strong> – to operate, improve, and secure our website.</li>
            <li><strong>Consent</strong> – for analytics and marketing cookies (which you can manage at any time).</li>
            <li><strong>Contractual necessity</strong> – if you contact us, to respond to your enquiry.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">4. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To deliver and improve the website and tools.</li>
            <li>To analyse traffic and usage patterns (with your consent).</li>
            <li>To respond to enquiries you send us.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">5. Cookies</h2>
          <p>We use cookies and similar technologies. Please see our <button onClick={() => navigate('cookies')} className="text-purple underline underline-offset-2">Cookie Policy</button> for full details.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">6. Third Parties</h2>
          <p>We may share anonymised, aggregated data with analytics providers (e.g. Google Analytics). We do not sell your personal data to third parties. We link to external government websites; their privacy policies apply once you leave our site.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">7. Data Retention</h2>
          <p>We retain contact enquiry data for up to 12 months. Analytics data is retained as per the provider's settings (typically 26 months). Cookie preference data is stored in your browser until you clear it or it expires.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">8. Your Rights</h2>
          <p>Under UK GDPR you have the right to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Access the personal data we hold about you.</li>
            <li>Rectify inaccurate data.</li>
            <li>Erase your data ("right to be forgotten").</li>
            <li>Restrict or object to processing.</li>
            <li>Data portability.</li>
            <li>Withdraw consent at any time.</li>
          </ul>
          <p className="mt-2">To exercise any of these rights, contact us at <a href="mailto:alastair@splitfin.uk" className="text-purple underline underline-offset-2">alastair@splitfin.uk</a>.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">9. Complaints</h2>
          <p>You have the right to lodge a complaint with the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-purple underline underline-offset-2">Information Commissioner's Office (ICO)</a> if you believe your data has been mishandled.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">10. Changes to This Policy</h2>
          <p>We may update this policy from time to time. We will post any changes on this page with an updated date. Continued use of the site constitutes acceptance of the updated policy.</p>
        </section>
      </div>
    </LegalPage>
  );
}

// ─── Terms of Service Page ────────────────────────────────────────────────────
function TermsPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalPage title="Terms of Service" badge="Legal" onBack={onBack}>
      <div className="space-y-6 text-light leading-relaxed">
        <p className="text-sm text-light/70">Last updated: 1 January 2025</p>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using UK Childcare Help ("the Site"), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">2. Information Only — Not Professional Advice</h2>
          <p>The information, tools, and calculators provided on UK Childcare Help are for <strong>general guidance and informational purposes only</strong>. They do not constitute financial, legal, or professional advice. Government childcare funding rules change frequently; always verify current details with official sources such as <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer" className="text-purple underline underline-offset-2">GOV.UK</a> or <a href="https://www.childcarechoices.gov.uk" target="_blank" rel="noopener noreferrer" className="text-purple underline underline-offset-2">Childcare Choices</a>.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">3. Accuracy of Information</h2>
          <p>We endeavour to keep information up to date and accurate. However, we make no representations or warranties (express or implied) as to the accuracy, completeness, or suitability of information on the Site. We accept no liability for errors or omissions.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">4. Eligibility Calculator</h2>
          <p>The eligibility calculator provides estimates based on information you input. Results are illustrative only. Actual savings will depend on your specific circumstances, your chosen provider, and current government funding rates. We are not responsible for decisions made based on calculator outputs.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">5. Intellectual Property</h2>
          <p>All content on the Site, including text, graphics, logos, and code, is the property of UK Childcare Help or its licensors and is protected by UK copyright law. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">6. External Links</h2>
          <p>The Site contains links to third-party websites (including government sites). These links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">7. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, UK Childcare Help shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of (or inability to use) the Site or any information contained therein.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">8. Governing Law</h2>
          <p>These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">9. Changes to Terms</h2>
          <p>We reserve the right to amend these Terms at any time. Changes take effect when posted to this page. Your continued use of the Site constitutes acceptance of any updated Terms.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">10. Contact</h2>
          <p>Questions about these Terms? Contact us at <a href="mailto:alastair@splitfin.uk" className="text-purple underline underline-offset-2">alastair@splitfin.uk</a>.</p>
        </section>
      </div>
    </LegalPage>
  );
}

// ─── Cookie Policy Page ───────────────────────────────────────────────────────
function CookiePolicyPage({ onBack }: { onBack: () => void }) {
  const resetConsent = () => {
    localStorage.removeItem('cookie_consent');
    toast.success('Cookie preferences cleared. Refresh the page to see the consent banner again.');
  };

  return (
    <LegalPage title="Cookie Policy" badge="Legal" onBack={onBack}>
      <div className="space-y-6 text-light leading-relaxed">
        <p className="text-sm text-light/70">Last updated: 1 January 2025</p>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">1. What Are Cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help sites remember your preferences and understand how you use them. Similar technologies include localStorage (used by this site to store your cookie preferences) and session storage.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">2. How We Use Cookies</h2>
          <p>We use cookies and similar technologies for three purposes, explained in the table below.</p>

          <div className="overflow-x-auto mt-4 rounded-xl border border-purple/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-purple-light text-purple">
                  <th className="text-left p-3 font-semibold rounded-tl-xl">Category</th>
                  <th className="text-left p-3 font-semibold">Purpose</th>
                  <th className="text-left p-3 font-semibold rounded-tr-xl">Required?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple/5">
                <tr className="hover:bg-purple-light/30 transition-colors">
                  <td className="p-3 font-medium text-dark">Essential</td>
                  <td className="p-3">Stores your cookie consent preferences so we don't ask again. Required for the site to work correctly.</td>
                  <td className="p-3"><Badge className="bg-green/20 text-green border-0 text-xs">Always on</Badge></td>
                </tr>
                <tr className="hover:bg-purple-light/30 transition-colors">
                  <td className="p-3 font-medium text-dark">Analytics</td>
                  <td className="p-3">Helps us understand how visitors use the site (e.g. pages visited, time on site) so we can improve it. We may use Google Analytics or a privacy-focused alternative.</td>
                  <td className="p-3"><Badge className="bg-yellow/30 text-dark border-0 text-xs">Optional</Badge></td>
                </tr>
                <tr className="hover:bg-purple-light/30 transition-colors">
                  <td className="p-3 font-medium text-dark">Marketing</td>
                  <td className="p-3">Used to show relevant advertisements and measure campaign effectiveness. Currently not active.</td>
                  <td className="p-3"><Badge className="bg-yellow/30 text-dark border-0 text-xs">Optional</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">3. Third-Party Cookies</h2>
          <p>Some cookies may be set by third-party services we use, such as Google Analytics. These third parties have their own privacy policies and cookie practices. We recommend reviewing their policies for more information:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple underline underline-offset-2">Google Privacy Policy</a></li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">4. Managing Your Preferences</h2>
          <p>You can manage your cookie preferences at any time:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Cookie consent banner</strong> – shown on your first visit. You can select "Manage preferences" to choose categories.</li>
            <li><strong>Browser settings</strong> – most browsers allow you to refuse or delete cookies. See your browser's help documentation for instructions.</li>
            <li><strong>Reset preferences below</strong> – click the button to clear your saved preferences and see the banner again.</li>
          </ul>

          <button
            onClick={resetConsent}
            className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-purple text-purple hover:bg-purple hover:text-white transition-all font-medium text-sm"
          >
            <Cookie className="w-4 h-4" />
            Reset My Cookie Preferences
          </button>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">5. Your Rights</h2>
          <p>Under UK GDPR, you have the right to withdraw consent for non-essential cookies at any time. Withdrawing consent will not affect any processing that already took place. See our <button onClick={() => navigate('privacy')} className="text-purple underline underline-offset-2">Privacy Policy</button> for your full rights.</p>
        </section>

        <section>
          <h2 className="font-heading font-bold text-xl text-dark mb-3">6. Contact</h2>
          <p>Questions about our use of cookies? Email us at <a href="mailto:alastair@splitfin.uk" className="text-purple underline underline-offset-2">alastair@splitfin.uk</a>.</p>
        </section>
      </div>
    </LegalPage>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <HeroSection />
      <FundingSchemes />
      <EligibilityCalculator />
      <HowItWorks />
      <FAQSection />
      <Testimonials />
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState<Page>('home');

  // Wire up module-level navigate helper
  _navigate = setPage;

  return (
    <div className="min-h-screen bg-cream">
      <Navigation page={page} onNavigate={setPage} />
      <main>
        {page === 'home' && <HomePage />}
        {page === 'privacy' && <PrivacyPage onBack={() => setPage('home')} />}
        {page === 'terms' && <TermsPage onBack={() => setPage('home')} />}
        {page === 'cookies' && <CookiePolicyPage onBack={() => setPage('home')} />}
        {page === 'blog' && <BlogIndexPage onBack={() => setPage('home')} onNavigate={setPage} />}
        {page === 'blog-combining-schemes' && <BlogCombiningSchemesPage onBack={() => setPage('blog')} onNavigate={setPage} />}
        {page === 'blog-30-hours-guide' && <Blog30HoursGuidePage onBack={() => setPage('blog')} onNavigate={setPage} />}
        {page === 'blog-tfc-vs-uc' && <BlogTFCvsUCPage onBack={() => setPage('blog')} onNavigate={setPage} />}
      </main>
      <Footer onNavigate={setPage} />
      <CookieConsent />
    </div>
  );
}

export default App;
