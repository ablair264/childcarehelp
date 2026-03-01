import { useEffect } from 'react';
import {
  CheckCircle,
  Clock,
  Calculator,
  CreditCard,
  PiggyBank,
  ArrowRight,
  Shield,
  Scale,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Page } from '../types';

type Props = { onBack: () => void; onNavigate: (p: Page) => void };

export default function BlogTFCvsUCPage({ onBack, onNavigate }: Props) {
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
            <Badge className="bg-yellow/30 text-dark border-0">Comparison</Badge>
            <span className="text-sm text-light">7 min read</span>
          </div>
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-dark mb-6 leading-tight">
            Tax-Free Childcare vs Universal Credit: Which Saves You More in 2025?
          </h1>
          <p className="text-xl text-light leading-relaxed">
            Choosing between Tax-Free Childcare and Universal Credit's childcare element is one of the most financially significant decisions working parents face. Pick wrong, and you could lose thousands annually.
          </p>
        </div>

        <div className="w-full h-64 md:h-80 bg-gradient-to-br from-yellow/20 via-orange-100 to-red-50 rounded-2xl mb-12 flex items-center justify-center">
          <Scale className="w-24 h-24 text-yellow/60" />
        </div>

        <div className="space-y-10 text-light leading-relaxed">

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">The Fundamental Difference</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-light rounded-xl p-6">
                <PiggyBank className="w-8 h-8 text-purple mb-3" />
                <h3 className="font-bold text-dark text-lg mb-2">Tax-Free Childcare</h3>
                <ul className="space-y-2 text-sm">
                  {['Government adds £2 for every £8 you pay', '20% discount on childcare costs', 'Available under £100,000 income'].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green flex-shrink-0 mt-0.5" />{i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green/20 rounded-xl p-6">
                <CreditCard className="w-8 h-8 text-green mb-3" />
                <h3 className="font-bold text-dark text-lg mb-2">Universal Credit</h3>
                <ul className="space-y-2 text-sm">
                  {['Reimburses up to 85% of costs', 'For working parents on UC', 'Paid monthly in arrears'].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green flex-shrink-0 mt-0.5" />{i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">Real-World Scenarios</h2>
            <div className="space-y-6">
              <Card className="border-0 shadow-card bg-cream">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-green text-white">Scenario A</Badge>
                    <span className="text-sm text-light">Single Parent, One Child, Moderate Income</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div><p className="text-light mb-1">Annual childcare</p><p className="font-bold text-dark">£8,000</p></div>
                    <div><p className="text-light mb-1">Earnings</p><p className="font-bold text-dark">£20,000/year</p></div>
                    <div><p className="text-light mb-1">UC eligible</p><p className="font-bold text-green">Yes</p></div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple/10 grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-3"><p className="text-sm text-light">Tax-Free Childcare</p><p className="font-bold text-dark">£1,600 saved</p></div>
                    <div className="bg-green/20 rounded-lg p-3"><p className="text-sm text-light">Universal Credit</p><p className="font-bold text-green">£6,800 saved ✓</p></div>
                  </div>
                  <p className="mt-3 text-sm font-medium text-green">Winner: Universal Credit by £5,200</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card bg-cream">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-purple text-white">Scenario B</Badge>
                    <span className="text-sm text-light">Dual-Income Family, Two Children, Higher Income</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div><p className="text-light mb-1">Annual childcare</p><p className="font-bold text-dark">£15,000</p></div>
                    <div><p className="text-light mb-1">Income</p><p className="font-bold text-dark">£80,000 combined</p></div>
                    <div><p className="text-light mb-1">UC eligible</p><p className="font-bold text-red-500">No</p></div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple/10">
                    <div className="bg-purple/20 rounded-lg p-3">
                      <p className="text-sm text-light">Tax-Free Childcare only option</p>
                      <p className="font-bold text-purple">£3,000 saved (capped at £2k per child)</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-medium text-purple">Winner: Tax-Free Childcare (only option)</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">The Crossover Point</h2>
            <div className="bg-yellow/10 rounded-xl p-6 border border-yellow/20">
              <div className="flex items-center gap-4 mb-4">
                <Calculator className="w-8 h-8 text-yellow" />
                <div>
                  <p className="font-bold text-dark">The Break-Even Calculation</p>
                  <p className="text-sm">If annual childcare costs exceed £2,353 and you're UC eligible, UC typically wins</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3">
                  <p className="font-medium text-dark">Tax-Free Childcare max</p>
                  <p className="text-2xl font-bold text-purple">£2,000/child</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="font-medium text-dark">Universal Credit max</p>
                  <p className="text-2xl font-bold text-green">£12,382/year</p>
                  <p className="text-xs text-light">(for one child)</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">Beyond the Numbers: Critical Considerations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-dark flex items-center gap-2"><Clock className="w-5 h-5 text-purple" /> Cash Flow Impact</h4>
                <div className="bg-cream rounded-xl p-4">
                  <p className="font-medium text-dark mb-1">Tax-Free Childcare</p>
                  <p className="text-sm">Pay £8, get £2 added immediately. Manageable cash flow.</p>
                </div>
                <div className="bg-cream rounded-xl p-4">
                  <p className="font-medium text-dark mb-1">Universal Credit</p>
                  <p className="text-sm">Pay full cost upfront, claim back 85% the following month. Requires £1,000+ float.</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-dark flex items-center gap-2"><Shield className="w-5 h-5 text-purple" /> Stability</h4>
                <div className="bg-cream rounded-xl p-4">
                  <p className="font-medium text-dark mb-1">Tax-Free Childcare</p>
                  <p className="text-sm">Fixed 20% contribution regardless of income changes (under £100k).</p>
                </div>
                <div className="bg-cream rounded-xl p-4">
                  <p className="font-medium text-dark mb-1">Universal Credit</p>
                  <p className="text-sm">Tapered withdrawal—earn more, receive less. Effective marginal rates can exceed 70%.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">The Hidden Trap: Claiming Both</h2>
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
                <span className="text-red-500 text-lg">⚠️</span> Warning
              </h4>
              <p className="mb-3">Thousands of parents inadvertently claim both schemes, resulting in:</p>
              <ul className="space-y-1 text-sm">
                <li>• Demand for repayment from HMRC</li>
                <li>• Potential penalties</li>
                <li>• Future exclusion from schemes</li>
              </ul>
              <div className="mt-4 bg-white rounded-lg p-3">
                <p className="font-medium text-dark">The Rule:</p>
                <p className="text-sm">You cannot receive Tax-Free Childcare in any week where you receive Universal Credit, Working Tax Credit, or Child Tax Credit.</p>
              </div>
            </div>
          </section>

          <section className="bg-purple/10 rounded-2xl p-8 border border-purple/20">
            <h2 className="font-heading font-bold text-2xl text-dark mb-6">Decision Framework</h2>
            <div className="space-y-4">
              {[
                { n: 1, title: 'Check Universal Credit Eligibility', desc: 'Use entitledto.co.uk or turn2us.org.uk calculators. Consider household income, housing costs, and savings over £6,000.' },
                { n: 2, title: 'Calculate Both Scenarios', desc: 'UC: 85% of costs (capped) vs TFC: 20% of costs (capped at £2,000/child)' },
                { n: 3, title: 'Consider Non-Financial Factors', desc: 'Can you manage the cash flow gap with UC? Will your income fluctuate?' },
                { n: 4, title: 'Check Other Benefits Interaction', desc: 'UC claimants may also get free school meals and council tax reduction.' },
              ].map((s) => (
                <div key={s.n} className="flex gap-4">
                  <div className="w-8 h-8 bg-purple text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">{s.n}</div>
                  <div>
                    <p className="font-bold text-dark">{s.title}</p>
                    <p className="text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl text-dark mb-4">The Bottom Line</h2>
            <div className="bg-green/10 rounded-xl p-6 border border-green/20">
              <p className="mb-4">For most families, the calculation is straightforward:</p>
              <ul className="space-y-2">
                {[
                  ['If eligible for Universal Credit:', 'It almost always provides more support than Tax-Free Childcare'],
                  ['If not eligible for Universal Credit:', 'Tax-Free Childcare provides valuable 20% savings'],
                  ['If borderline:', 'Consider long-term income trajectory and administrative preferences'],
                ].map(([bold, rest]) => (
                  <li key={bold} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
                    <span><strong>{bold}</strong> {rest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-12 border-t border-purple/10">
          <Card className="border-0 shadow-card gradient-purple text-white">
            <CardContent className="p-8 text-center">
              <Scale className="w-12 h-12 text-white/80 mx-auto mb-3" />
              <h3 className="font-heading font-bold text-2xl mb-2">Calculate Your Best Option</h3>
              <p className="mb-6 text-white/80">Use our calculator to see exactly which scheme saves your family more.</p>
              <Button className="bg-white text-purple hover:bg-yellow hover:text-dark font-bold rounded-full px-8" onClick={() => onNavigate('home')}>
                Compare Schemes <ArrowRight className="w-5 h-5 ml-2" />
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
            <button onClick={() => onNavigate('blog-30-hours-guide')} className="text-left group">
              <Card className="border-0 shadow-card card-hover h-full">
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 text-green mb-3" />
                  <h4 className="font-bold text-dark mb-2 group-hover:text-purple transition-colors">30 Hours Free Childcare: Complete Application Guide</h4>
                  <p className="text-sm text-light">Everything you need to know about securing your 30 hours entitlement.</p>
                </CardContent>
              </Card>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
