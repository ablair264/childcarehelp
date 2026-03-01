import { useEffect } from 'react';
import {
  CheckCircle,
  Clock,
  Calendar,
  Building2,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Scale,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Page } from '../types';

type Props = { onBack: () => void; onNavigate: (p: Page) => void };

export default function Blog30HoursGuidePage({ onBack, onNavigate }: Props) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <article className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-purple hover:text-purple/80 transition-colors group">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Blog</span>
          </button>
          <button onClick={() => onNavigate('blog')} className="text-sm text-light hover:text-purple transition-colors">
            View All Articles
          </button>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-green/20 text-green border-0">Guide</Badge>
            <span className="text-sm text-light">10 min read</span>
          </div>
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-dark mb-6 leading-tight">
            30 Hours Free Childcare: The Working Parent's Complete Application Guide for 2025
          </h1>
          <p className="text-xl text-light leading-relaxed">
            The 30 hours free childcare scheme represents one of the most valuable benefits available to working parents, potentially worth over £6,000 per year. Yet thousands of eligible families miss out due to confusing processes or missed deadlines.
          </p>
        </div>

        <div className="w-full h-64 md:h-80 bg-gradient-to-br from-green/20 via-teal-100 to-blue-100 rounded-2xl mb-12 flex items-center justify-center">
          <Clock className="w-24 h-24 text-green/40" />
        </div>

        <div className="space-y-10 text-light leading-relaxed">

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">What 30 Hours Actually Means</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { val: '1,140', label: 'Hours per year', color: 'text-purple', bg: 'bg-purple-light' },
                { val: '38', label: 'Weeks (term-time)', color: 'text-green', bg: 'bg-green/20' },
                { val: '£6,000+', label: 'Potential value', color: 'text-dark', bg: 'bg-yellow/30' },
              ].map((s) => (
                <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
                  <p className={`text-3xl font-bold ${s.color} mb-1`}>{s.val}</p>
                  <p className="text-sm text-dark">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-yellow/10 rounded-xl p-6 border border-yellow/20">
              <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow" /> The "Stretched" Option
              </h4>
              <p>Many providers allow you to spread 1,140 hours across 52 weeks at approximately 22 hours per week, making budgeting easier and reducing holiday care costs.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">Eligibility: The Detailed Breakdown</h2>
            <div className="space-y-6">
              <div className="bg-cream rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple" /> Work Requirements
                </h4>
                <p className="mb-3">Both parents in a couple (or sole parent) must:</p>
                <ul className="space-y-2">
                  {[
                    'Work at least 16 hours per week',
                    'Earn at least £195.36/week (National Minimum Wage for 21+ at 16hrs)',
                    'Have annual income under £100,000 each',
                  ].map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple/10 rounded-xl p-6 border border-purple/20">
                <h4 className="font-bold text-dark mb-3">Special Circumstances</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {[
                    { label: 'Self-employed', desc: 'Count average weekly hours and income' },
                    { label: 'Zero-hours contracts', desc: 'Qualify if regularly earn above threshold' },
                    { label: 'On maternity leave', desc: 'Count as working if employed before leave' },
                    { label: 'Students', desc: 'Count as working if receiving student finance' },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="font-medium text-dark mb-1">{s.label}</p>
                      <p>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">The Critical Application Timeline</h2>
            <p className="mb-6">Missing deadlines means waiting months for the next entry point:</p>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple/20" />
              <div className="space-y-6">
                {[
                  { n: 1, color: 'bg-purple', bg: 'bg-purple-light', title: 'Summer Term (Starts April)', desc: 'Apply between 1st January and 31st March' },
                  { n: 2, color: 'bg-green', bg: 'bg-green/20', title: 'Autumn Term (Starts September)', desc: 'Apply between 1st June and 31st August' },
                  { n: 3, color: 'bg-yellow', bg: 'bg-yellow/30', title: 'Spring Term (Starts January)', desc: 'Apply between 1st October and 31st December' },
                ].map((s) => (
                  <div key={s.n} className="relative pl-12">
                    <div className={`absolute left-0 w-8 h-8 ${s.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>{s.n}</div>
                    <div className={`${s.bg} rounded-xl p-4`}>
                      <p className="font-bold text-dark">{s.title}</p>
                      <p className="text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border border-red-200 mt-6">
              <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-red-500" /> The Golden Rule
              </h4>
              <p>Apply before the deadline even if your child hasn't reached the age threshold yet. You can apply up to 16 weeks before they become eligible.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">Step-by-Step Application Process</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Create Your Government Gateway Account', desc: 'Visit gov.uk with your National Insurance number and ID (passport or driving licence).' },
                { step: 2, title: 'Complete the Childcare Service Application', desc: 'Provide employment details, income estimates, and child information.' },
                { step: 3, title: 'Receive Your Eligibility Code', desc: 'Get your 11-digit code immediately. Save this securely!' },
                { step: 4, title: 'Choose Your Provider', desc: "Ensure they're Ofsted registered and signed up for the scheme." },
                { step: 5, title: 'Complete the Parent Declaration Form', desc: 'Confirm your code, hours needed, and attendance days.' },
                { step: 6, title: 'Provider Claims the Funding', desc: "They submit claims to the local authority. You're all set!" },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 bg-cream rounded-xl p-4">
                  <div className="w-10 h-10 bg-purple text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">{s.step}</div>
                  <div>
                    <h4 className="font-bold text-dark">{s.title}</h4>
                    <p className="text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">The Reconfirmation Trap</h2>
            <p className="mb-6">Every 3 months, you must reconfirm eligibility. Set your own reminders—the government emails often land in spam.</p>
            <div className="grid grid-cols-4 gap-2">
              {['January', 'April', 'July', 'October'].map((month) => (
                <div key={month} className="bg-purple-light rounded-lg p-3 text-center">
                  <Calendar className="w-5 h-5 text-purple mx-auto mb-1" />
                  <p className="text-sm font-medium text-dark">{month}</p>
                  <p className="text-xs text-light">Reconfirm by 1st</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-green/10 rounded-2xl p-8 border border-green/20">
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">Your 30 Hours Checklist</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'Before Applying', items: ['Calculate adjusted income (after pensions)', 'Confirm 16+ hours work each', 'Check application deadline', 'Gather NI numbers'] },
                { label: 'After Approval', items: ['Find provider with availability', 'Complete declaration form', 'Set quarterly reminders', 'Understand extra charges'] },
              ].map((col) => (
                <div key={col.label}>
                  <h4 className="font-bold text-purple mb-2">{col.label}</h4>
                  <ul className="space-y-1 text-sm">
                    {col.items.map((i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green flex-shrink-0" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-12 pt-12 border-t border-purple/10">
          <Card className="border-0 shadow-card gradient-purple text-white">
            <CardContent className="p-8 text-center">
              <h3 className="font-heading font-bold text-2xl mb-2">Check Your Eligibility Now</h3>
              <p className="mb-6 text-white/80">Use our calculator to see if you qualify for 30 hours and how much you could save.</p>
              <Button className="bg-white text-purple hover:bg-yellow hover:text-dark font-bold rounded-full px-8" onClick={() => onNavigate('home')}>
                Start Calculation <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h3 className="font-heading font-bold text-xl text-dark mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <button onClick={() => onNavigate('blog-combining-schemes')} className="text-left group">
              <Card className="border-0 shadow-card card-hover h-full">
                <CardContent className="p-6">
                  <Layers className="w-8 h-8 text-purple mb-3" />
                  <h4 className="font-bold text-dark mb-2 group-hover:text-purple transition-colors">Combining Childcare Schemes Guide</h4>
                  <p className="text-sm text-light">Stack multiple schemes to maximise your annual savings.</p>
                </CardContent>
              </Card>
            </button>
            <button onClick={() => onNavigate('blog-tfc-vs-uc')} className="text-left group">
              <Card className="border-0 shadow-card card-hover h-full">
                <CardContent className="p-6">
                  <Scale className="w-8 h-8 text-yellow mb-3" />
                  <h4 className="font-bold text-dark mb-2 group-hover:text-purple transition-colors">Tax-Free Childcare vs Universal Credit</h4>
                  <p className="text-sm text-light">Which scheme saves you more? Detailed comparison with real scenarios.</p>
                </CardContent>
              </Card>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
