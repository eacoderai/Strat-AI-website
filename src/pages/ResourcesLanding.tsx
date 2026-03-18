import Seo from '@/components/docs/Seo';
import DocLayout from '@/components/docs/DocLayout';

export default function ResourcesLanding() {
  const featuredPosts = [
    {
      title: 'Why Your Trading Journal is Useless (And How to Fix It)',
      preview:
        'Most traders log entries but miss patterns. Here’s how AI finds what you overlook: win triggers, risk leaks, emotional bias.',
      category: 'Journal Analysis',
      assetTags: ['stocks', 'crypto', 'forex'],
      cta: { label: 'Try AI Journal Scan →', href: '#' },
    },
    {
      title: 'From English to Execution: Building a Strategy in 60 Seconds',
      preview:
        "Watch us turn ‘Buy pullbacks to VWAP in uptrend’ into backtestable Pine Script — no coding, no guesswork.",
      category: 'Strategy Building',
      assetTags: ['stocks', 'crypto', 'forex'],
      cta: { label: 'Join Waitlist', href: '/waitlist' },
    },
    {
      title: 'The Quant’s Edge: Why Logic > Luck in 2026',
      preview:
        'Data beats intuition. How structured strategy frameworks outperform discretionary trading (with real backtests).',
      category: 'Trading Psychology',
      assetTags: ['stocks', 'crypto', 'forex'],
      cta: { label: 'Read Full Study', href: '#' },
    },
  ];

  const categories = [
    {
      category: 'Strategy Building',
      description: 'Turn ideas into executable logic',
      sampleTitles: [
        '5 Natural Language Prompts That Generate Profitable Strategies',
        'How to Add Risk Filters Without Coding',
        'Breakout vs. Mean Reversion: AI Logic Comparison',
      ],
    },
    {
      category: 'Journal Analysis',
      description: 'Unlock hidden patterns in your trades',
      sampleTitles: [
        'Your Journal Reveals 3 Leaks You’re Ignoring',
        'How AI Spots Emotional Trading (Before You Do)',
        'From Losses to Lessons: A Case Study',
      ],
    },
    {
      category: 'Trading Psychology',
      description: 'Build discipline, not just systems',
      sampleTitles: [
        'Why Your Edge Fails (And How to Systemize It)',
        'The Builder’s Mindset vs. The Gambler’s Trap',
        'How Structured Logic Reduces FOMO',
      ],
    },
    {
      category: 'AI Insights',
      description: 'Behind StratAI’s engine (no hype)',
      sampleTitles: [
        'White-Box AI: Why You See Every Line of Logic',
        'How We Avoid Overfitting in Strategy Generation',
        'Training on 10k+ Real Strategies: What We Learned',
      ],
    },
    {
      category: 'Market Edge',
      description: 'Tactical insights for builders',
      sampleTitles: [
        'Volatility Regimes: Adapting Your Strategy Logic',
        'Session Filters That Actually Work',
        'Volume Confirmation: Beyond the Basics',
      ],
    },
  ];

  return (
    <>
      <Seo title="StratAI Blog | StratAI" description="StratAI Blog: where strategy meets intelligence. Insights for builders, not signal-chasers." />
      <DocLayout title="StratAI Blog" subtitle="Where strategy meets intelligence">
        <div className="rounded-xl border bg-card px-6 py-6">
          <div className="text-sm text-gray-600">Insights for builders. Not signal-chasers.</div>
        </div>

        <div className="rounded-xl border bg-card">
          <div className="px-6 pt-6">
            <h4>🔥 Featured Posts</h4>
            <div className="text-sm text-gray-600">(Rotate monthly)</div>
          </div>
          <div className="px-6 pb-6">
            <div className="grid gap-4">
              {featuredPosts.map((post) => (
                <div key={post.title} className="rounded-xl border p-5">
                  <div className="flex flex-col gap-2">
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-gray-600">{post.preview}</div>
                    <div className="text-xs text-gray-500">{post.category}</div>
                    <div className="flex flex-wrap gap-2">
                      {post.assetTags.map((tag) => (
                        <span key={tag} className="asset-tag text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={post.cta.href} className="text-purple-600 hover:text-purple-700 transition-colors text-sm w-fit">
                      {post.cta.label}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card">
          <div className="px-6 pt-6">
            <h4>📂 Categories</h4>
            <div className="text-sm text-gray-600">(Organized for trader intent)</div>
          </div>
          <div className="px-6 pb-6">
            <div className="grid gap-4">
              {categories.map((c) => (
                <div key={c.category} className="rounded-xl border p-5">
                  <div className="font-medium">{c.category}</div>
                  <div className="text-sm text-gray-600 mt-1">{c.description}</div>
                  <div className="mt-3">
                    <ul className="list-disc ml-4 text-sm text-gray-600 space-y-1">
                      {c.sampleTitles.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DocLayout>
    </>
  );
}
