import { useState, useEffect, useRef } from 'react';
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

// ─── Simple page router ───────────────────────────────────────────────────────
type Page = 'home' | 'privacy' | 'terms' | 'cookies';
let _navigate: (p: Page) => void = () => { };
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
              UK Childcare<span className="text-purple">Help</span>
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
    </nav>
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
              UK Childcare Funding Guide 2025
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

// ─── Eligibility Calculator ───────────────────────────────────────────────────
function EligibilityCalculator() {
  const [children, setChildren] = useState(1);
  const [hoursPerWeek, setHoursPerWeek] = useState(30);
  const [isWorking, setIsWorking] = useState(true);
  const [childAge, setChildAge] = useState('3-4');
  const [hourlyRate, setHourlyRate] = useState<string>('6.50');
  const [useCustomRate, setUseCustomRate] = useState(false);

  const parsedRate = parseFloat(hourlyRate) || 6.50;

  const calculateSavings = () => {
    const freeHours = isWorking && hoursPerWeek > 15 ? 30 : 15;
    const actualFreeHours = Math.min(freeHours, hoursPerWeek);
    const weeklySavings = actualFreeHours * parsedRate;
    const annualSavings = weeklySavings * 38;
    const taxFreeSavings = children * 2000;
    return Math.round(annualSavings + taxFreeSavings);
  };

  const savings = calculateSavings();
  const freeHoursAmount = Math.round(savings * 0.7);
  const tfcAmount = Math.round(savings * 0.3);

  return (
    <section id="calculator" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Calculator Form */}
          <div>
            <Badge className="bg-green/20 text-green border-0 mb-4">
              <Calculator className="w-4 h-4 mr-2" />Eligibility Calculator
            </Badge>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark mb-4">
              Calculate Your <span className="text-purple">Savings</span>
            </h2>
            <p className="text-lg text-light mb-8">Answer a few quick questions to see how much you could save on childcare costs.</p>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6 space-y-8">
                {/* Number of Children */}
                <div>
                  <label className="flex items-center justify-between mb-4">
                    <span className="font-medium text-dark">Number of Children</span>
                    <span className="font-heading font-bold text-2xl text-purple">{children}</span>
                  </label>
                  <Slider value={[children]} onValueChange={(v) => setChildren(v[0])} max={5} min={1} step={1} className="w-full" />
                  <div className="flex justify-between text-sm text-light mt-2"><span>1</span><span>5</span></div>
                </div>

                {/* Hours per Week */}
                <div>
                  <label className="flex items-center justify-between mb-4">
                    <span className="font-medium text-dark">Hours per Week Needed</span>
                    <span className="font-heading font-bold text-2xl text-purple">{hoursPerWeek}h</span>
                  </label>
                  <Slider value={[hoursPerWeek]} onValueChange={(v) => setHoursPerWeek(v[0])} max={50} min={5} step={5} className="w-full" />
                  <div className="flex justify-between text-sm text-light mt-2"><span>5h</span><span>50h</span></div>
                </div>

                {/* Nursery Hourly Cost */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium text-dark">Nursery Hourly Cost</label>
                    <button
                      onClick={() => setUseCustomRate(!useCustomRate)}
                      className={`text-xs px-3 py-1 rounded-full border transition-all ${useCustomRate ? 'border-purple bg-purple-light text-purple' : 'border-gray-200 text-light hover:border-purple/50'}`}
                    >
                      {useCustomRate ? '✓ Custom rate' : 'Use my nursery\'s rate'}
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
                        placeholder="e.g. 7.50"
                        className="w-full pl-9 pr-16 py-3 rounded-xl border-2 border-purple/30 focus:border-purple outline-none font-medium text-dark transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-light text-sm">/hr</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 bg-purple-light rounded-xl p-4">
                      <PiggyBank className="w-5 h-5 text-purple flex-shrink-0" />
                      <p className="text-sm text-purple">
                        Using UK average of <span className="font-bold">£6.50/hr</span>. Toggle above to enter your nursery's actual rate for a more accurate estimate.
                      </p>
                    </div>
                  )}

                  {useCustomRate && parsedRate > 0 && (
                    <p className="text-xs text-light mt-2">
                      UK average is £6.50/hr. You've entered £{parsedRate.toFixed(2)}/hr.
                    </p>
                  )}
                </div>

                {/* Working Status */}
                <div>
                  <label className="block font-medium text-dark mb-4">Are both parents working? (or single parent)</label>
                  <div className="flex gap-4">
                    {[true, false].map((val) => (
                      <button key={String(val)} onClick={() => setIsWorking(val)} className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${isWorking === val ? 'border-purple bg-purple-light text-purple' : 'border-gray-200 text-light hover:border-purple/50'}`}>
                        <div className="flex items-center justify-center gap-2">
                          {val ? <CheckCircle className="w-5 h-5" /> : <X className="w-5 h-5" />}
                          {val ? 'Yes' : 'No'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Child Age */}
                <div>
                  <label className="block font-medium text-dark mb-4">Child's Age</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['9m-2', '2-3', '3-4'].map((age) => (
                      <button key={age} onClick={() => setChildAge(age)} className={`py-3 px-2 rounded-xl border-2 transition-all text-sm ${childAge === age ? 'border-purple bg-purple-light text-purple' : 'border-gray-200 text-light hover:border-purple/50'}`}>
                        {age === '9m-2' ? '9-23 months' : age === '2-3' ? '2-3 years' : '3-4 years'}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:pl-8">
            <Card className="border-0 shadow-card gradient-purple text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <CardContent className="p-8 relative">
                <div className="text-center mb-8">
                  <p className="text-white/80 mb-2">Your Estimated Annual Savings</p>
                  <div className="font-heading font-extrabold text-6xl lg:text-7xl">£{savings.toLocaleString()}</div>
                  <p className="text-white/60 text-sm mt-2">
                    *Based on {useCustomRate && parsedRate > 0 ? `£${parsedRate.toFixed(2)}/hr (your rate)` : '£6.50/hr UK average'}
                  </p>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-yellow" /><span>Free Hours Funding</span></div>
                    <span className="font-bold">£{freeHoursAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-3"><PiggyBank className="w-5 h-5 text-yellow" /><span>Tax-Free Childcare</span></div>
                    <span className="font-bold">£{tfcAmount.toLocaleString()}</span>
                  </div>
                </div>
                <Button className="w-full bg-white text-purple hover:bg-yellow hover:text-dark font-bold py-6 rounded-xl btn-squish" onClick={() => toast.success('Check your eligibility on the government website!')}>
                  Check Official Eligibility <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4 text-center"><CheckCircle className="w-6 h-6 text-green mx-auto mb-2" /><p className="font-medium text-dark text-sm">16+ hrs work/week</p></div>
              <div className="glass rounded-xl p-4 text-center"><Shield className="w-6 h-6 text-purple mx-auto mb-2" /><p className="font-medium text-dark text-sm">Under £100k income</p></div>
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
              <span className="font-heading font-bold text-xl">UK Childcare<span className="text-purple">Help</span></span>
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
      </main>
      <Footer onNavigate={setPage} />
      <CookieConsent />
    </div>
  );
}

export default App;
