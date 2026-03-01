import { useEffect } from 'react';
import {
  CheckCircle,
  X,
  Clock,
  Calendar,
  CreditCard,
  ArrowRight,
  Sparkles,
  Layers,
  Scale,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Page } from '../types';

type Props = { onBack: () => void; onNavigate: (p: Page) => void };

export default function BlogCombiningSchemesPage({ onBack, onNavigate }: Props) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <article className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Nav */}
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

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-purple-light text-purple border-0">Strategy</Badge>
            <span className="text-sm text-light">8 min read</span>
          </div>
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-dark mb-6 leading-tight">
            The Complete Guide to Combining Childcare Schemes: How to Stack Your Savings in 2025
          </h1>
          <p className="text-xl text-light leading-relaxed">
            With the cost of childcare in the UK reaching record highs, savvy parents are discovering that the secret to maximising savings isn't choosing between government schemes—it's combining them strategically.
          </p>
        </div>

        {/* Hero visual */}
        <div className="w-full h-64 md:h-80 bg-gradient-to-br from-purple/20 via-pink/20 to-yellow/20 rounded-2xl mb-12 flex items-center justify-center">
          <Layers className="w-24 h-24 text-purple/40" />
        </div>

        {/* Content */}
        <div className="space-y-10 text-light leading-relaxed">

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">Understanding the Stacking Rules</h2>
            <p>Before diving into combinations, it's crucial to understand which schemes can work together. The UK government allows certain programmes to run concurrently whilst others are mutually exclusive. Getting this wrong could cost you thousands in lost support.</p>

            <div className="bg-green/10 rounded-xl p-6 border border-green/20 mt-6">
              <h3 className="font-bold text-dark mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green" /> Compatible Combinations
              </h3>
              <ul className="space-y-2 text-sm">
                <li>30 Hours Free Childcare + Tax-Free Childcare</li>
                <li>15 Hours Universal + Tax-Free Childcare</li>
                <li>Universal Credit Childcare Element (instead of Tax-Free Childcare)</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border border-red-200 mt-4">
              <h3 className="font-bold text-dark mb-3 flex items-center gap-2">
                <X className="w-5 h-5 text-red-500" /> Prohibited Combinations
              </h3>
              <ul className="space-y-2 text-sm">
                <li>Tax-Free Childcare + Universal Credit</li>
                <li>Tax-Free Childcare + Working Tax Credit</li>
                <li>Childcare Vouchers (closed to new entrants) + Tax-Free Childcare</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">The Power Combo: 30 Hours + Tax-Free Childcare</h2>
            <p>For working families with 3-4 year olds, this combination delivers maximum impact. Here's how the maths works in practice:</p>

            <Card className="border-0 shadow-card bg-cream mt-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-dark mb-4">Real-World Scenario</h3>
                <p className="mb-4"><strong>Sarah and James</strong> both work full-time with a 3-year-old daughter attending nursery 40 hours per week at £7 per hour.</p>
                <div className="space-y-4">
                  {[
                    { n: 1, color: 'bg-purple', title: 'Apply 30 Hours Free Childcare', desc: '30 hours per week term-time (38 weeks) = 1,140 hours annually', value: '£7,980 saved per year', vc: 'text-purple' },
                    { n: 2, color: 'bg-green', title: 'Add Tax-Free Childcare on Remaining Costs', desc: 'Government tops up 20% on remaining £70/week', value: '£1,316 per year', vc: 'text-green' },
                  ].map((s) => (
                    <div key={s.n} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full ${s.color} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>{s.n}</div>
                      <div>
                        <p className="font-medium text-dark">{s.title}</p>
                        <p className="text-sm">{s.desc}</p>
                        <p className={`text-sm font-medium ${s.vc}`}>{s.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-purple/20">
                  <p className="text-2xl font-bold text-dark">Combined Annual Savings: <span className="text-purple">£9,296</span></p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">Strategic Timing: When to Apply</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { color: 'bg-purple-light', ic: <Clock className="w-6 h-6 text-purple mb-2" />, title: 'Tax-Free Childcare', desc: 'Apply as soon as you start paying for childcare. Available from birth until age 11.' },
                { color: 'bg-green/20', ic: <Calendar className="w-6 h-6 text-green mb-2" />, title: '30 Hours Free', desc: "Apply the term before your child turns 3. Don't miss the cut-off dates!" },
                { color: 'bg-yellow/30', ic: <CreditCard className="w-6 h-6 text-dark mb-2" />, title: 'Universal Credit', desc: 'Apply when childcare costs begin. Paid in arrears, so budget for the first month.' },
              ].map((c) => (
                <div key={c.title} className={`${c.color} rounded-xl p-4`}>
                  {c.ic}
                  <h4 className="font-bold text-dark mb-2">{c.title}</h4>
                  <p className="text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">The 2-Year-Old Advantage</h2>
            <p>Families receiving qualifying benefits can also combine support for 2-year-olds. Eligible benefits include:</p>
            <div className="bg-cream rounded-xl p-6 border border-purple/10 mt-4">
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                {['Income Support', "Jobseeker's Allowance (income-based)", 'Employment and Support Allowance', 'Universal Credit (under £15,400)', 'Tax Credits (under £16,190)', 'Pension Credit'].map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green flex-shrink-0" /> {b}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">Common Stacking Mistakes to Avoid</h2>
            <div className="space-y-4">
              {[
                { title: 'Mistake 1: Accepting the First Scheme Offered', desc: "Many parents automatically take Tax-Free Childcare without checking if Universal Credit would provide more support. For lower earners, UC's 85% contribution typically beats TFC's 20%." },
                { title: 'Mistake 2: Not Adjusting for Changing Circumstances', desc: 'Returning to work, changing hours, or relationship status changes can affect eligibility. Review your combination every 6 months.' },
                { title: "Mistake 3: Ignoring the 'Stretched Hours' Option", desc: 'Some providers allow you to stretch 30 hours over 52 weeks (22.8 hours/week) rather than 38 weeks term-time only.' },
              ].map((m) => (
                <div key={m.title} className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
                  <h4 className="font-bold text-dark mb-1">{m.title}</h4>
                  <p className="text-sm">{m.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">The 2025/26 Updates You Need to Know</h2>
            <div className="bg-purple/10 rounded-xl p-6 border border-purple/20">
              <Sparkles className="w-8 h-8 text-purple mb-3" />
              <h4 className="font-bold text-dark mb-2">September 2025 Expansion</h4>
              <p>Working parents of children from 9 months old can access 30 hours free childcare. This represents the final phase of the government's childcare expansion programme.</p>
            </div>
          </section>

          <section className="bg-cream rounded-2xl p-8">
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">Your Action Plan for Maximum Savings</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'This Week', items: ['Check eligibility for all schemes', 'Gather income and cost information', 'Calculate best combination'] },
                { label: 'This Month', items: ['Apply for primary scheme', 'Set up Tax-Free Childcare account', 'Speak to childcare provider'] },
                { label: 'Ongoing', items: ['Reconfirm eligibility quarterly', 'Review combination annually', 'Keep cost records'] },
              ].map((col) => (
                <div key={col.label}>
                  <h4 className="font-bold text-purple mb-2">{col.label}</h4>
                  <ul className="text-sm space-y-1">
                    {col.items.map((i) => <li key={i}>• {i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 pt-12 border-t border-purple/10">
          <Card className="border-0 shadow-card gradient-purple text-white">
            <CardContent className="p-8 text-center">
              <h3 className="font-heading font-bold text-2xl mb-2">Start Calculating Your Savings</h3>
              <p className="mb-6 text-white/80">Use our comprehensive calculator to discover which scheme combination maximises your family's savings.</p>
              <Button className="bg-white text-purple hover:bg-yellow hover:text-dark font-bold rounded-full px-8" onClick={() => onNavigate('home')}>
                Try the Calculator <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Related */}
        <div className="mt-12">
          <h3 className="font-heading font-bold text-xl text-dark mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <button onClick={() => onNavigate('blog-30-hours-guide')} className="text-left group">
              <Card className="border-0 shadow-card card-hover h-full">
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 text-green mb-3" />
                  <h4 className="font-bold text-dark mb-2 group-hover:text-purple transition-colors">30 Hours Free Childcare: Complete Application Guide</h4>
                  <p className="text-sm text-light">Everything you need to know about securing your 30 hours entitlement.</p>
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
