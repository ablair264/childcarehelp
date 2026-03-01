import { useEffect } from 'react';
import { Clock, ArrowRight, BookOpen, Layers, Scale, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import type { Page } from '../types';

type Props = { onBack: () => void; onNavigate: (p: Page) => void };

export default function BlogIndexPage({ onBack, onNavigate }: Props) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const posts = [
    {
      slug: 'blog-combining-schemes' as Page,
      title: 'The Complete Guide to Combining Childcare Schemes: How to Stack Your Savings in 2025',
      excerpt: 'Discover how to legally combine multiple childcare support programmes to reduce your annual costs by up to £10,000. Learn which schemes work together and which to avoid.',
      readTime: '8 min read',
      category: 'Strategy',
      icon: Layers,
      color: 'bg-purple',
    },
    {
      slug: 'blog-30-hours-guide' as Page,
      title: "30 Hours Free Childcare: The Working Parent's Complete Application Guide for 2025",
      excerpt: 'Everything you need to know about securing your 30 hours free childcare entitlement. From eligibility checks to application deadlines and reconfirmation requirements.',
      readTime: '10 min read',
      category: 'Guide',
      icon: Clock,
      color: 'bg-green',
    },
    {
      slug: 'blog-tfc-vs-uc' as Page,
      title: 'Tax-Free Childcare vs Universal Credit: Which Saves You More in 2025?',
      excerpt: 'A detailed comparison to help you choose between Tax-Free Childcare and Universal Credit childcare element. Real-world scenarios and crossover calculations included.',
      readTime: '7 min read',
      category: 'Comparison',
      icon: Scale,
      color: 'bg-yellow',
    },
  ];

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple hover:text-purple/80 transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="text-center mb-16">
          <Badge className="bg-purple-light text-purple border-0 mb-4">
            <BookOpen className="w-4 h-4 mr-2" />Parent Resources
          </Badge>
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-dark mb-4">
            Childcare Funding <span className="text-purple">Guides</span>
          </h1>
          <p className="text-lg text-light max-w-2xl mx-auto">
            Expert advice and practical strategies to help you maximise your childcare savings and navigate the UK funding system with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="group card-hover border-0 shadow-card overflow-hidden cursor-pointer flex flex-col"
              onClick={() => onNavigate(post.slug)}
            >
              <div className={`${post.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <post.icon className="w-8 h-8" />
                  <Badge className="bg-white/20 text-white border-0">{post.category}</Badge>
                </div>
                <h2 className="font-heading font-bold text-xl leading-tight group-hover:scale-[1.02] transition-transform">
                  {post.title}
                </h2>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <p className="text-light mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-purple/10">
                  <span className="text-sm text-light flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {post.readTime}
                  </span>
                  <span className="text-purple font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-16 border-0 shadow-card bg-gradient-to-r from-purple-light to-cream">
          <CardContent className="p-8 md:p-12 text-center">
            <Mail className="w-12 h-12 text-purple mx-auto mb-4" />
            <h2 className="font-heading font-bold text-2xl text-dark mb-2">Stay Updated</h2>
            <p className="text-light mb-6 max-w-md mx-auto">
              Get the latest childcare funding news, tips, and policy changes delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-purple/30 focus:border-purple outline-none"
              />
              <Button
                className="gradient-purple text-white rounded-full px-6"
                onClick={() => toast.info('Newsletter coming soon!')}
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-light mt-3">We respect your privacy. Unsubscribe at any time.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
