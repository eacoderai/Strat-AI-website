import { motion } from 'motion/react';
import { Check, X, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const comparisonData = [
  {
    category: "Core Features",
    features: [
      { name: "Strategy generations / month", free: "2", pro: "10", elite: "Unlimited" },
      { name: "Strategy Planner (Manual)", free: true, pro: true, elite: true },
      { name: "Code Engine (Algo)", free: false, pro: true, elite: true },
      { name: "Risk Management Tools", free: true, pro: true, elite: true },
      { name: "Psychology Checklist", free: true, pro: true, elite: true },
    ]
  },
  {
    category: "Languages & Platforms",
    features: [
      { name: "MQL5 Support", free: true, pro: true, elite: true },
      { name: "MQL4 Support", free: false, pro: true, elite: true },
      { name: "Pine Script", free: false, pro: true, elite: true },
      { name: "QuantConnect", free: false, pro: true, elite: true },
      { name: "cTrader", free: false, pro: true, elite: true },
      { name: "Crypto automation", free: false, pro: true, elite: true },
    ]
  },
  {
    category: "Advanced Tools",
    features: [
      { name: "Backtest UI + performance metrics", free: false, pro: true, elite: true },
      { name: "Save Strategy Versions", free: false, pro: "Last 3", elite: "Unlimited" },
      { name: "Downloads enabled", free: false, pro: true, elite: true },
      { name: "Code converter", free: false, pro: true, elite: true },
      { name: "AI Chat Assistant", free: false, pro: "Standard", elite: "Priority" },
      { name: "Trading journal + AI reports", free: false, pro: false, elite: true },
      { name: "Professional strategy audit", free: false, pro: false, elite: true },
    ]
  },
  {
    category: "Support",
    features: [
      { name: "Support response time", free: "Community only", pro: "Within 48h", elite: "Within 12h" },
    ]
  }
];

const faqs = [
  {
    question: "Do I need coding skills?",
    answer: "No! StratAI is designed for everyone. You describe your strategy idea in plain English, and our AI handles the rest—whether it's a structured plan or MQL/Pine Script code."
  },
  {
    question: "Can I switch from manual to automated later?",
    answer: "Yes! Every strategy you create can be a structured plan or converted into executable code with a single click."
  },
  {
    question: "What’s ‘Manual Re-analysis’?",
    answer: "Elite users can upload execution journals. Our AI analyzes performance, patterns, and helps you refine rules."
  },
  {
    question: "Is there a long-term commitment?",
    answer: "No. Plans are month-to-month. You can upgrade, downgrade, or cancel at any time."
  }
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-background min-h-screen pt-3 pb-3">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-bold text-foreground mb-6"
          >
            Choose Your <span className="text-primary">Trading Edge</span>
          </motion.h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Transparent pricing for traders at every level. Save 15% with annual billing.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-6 px-4 text-foreground font-bold text-xl w-1/4">Feature</th>
                <th className="py-6 px-4 text-center w-1/4">
                  <div className="text-foreground font-bold text-xl mb-1">Free</div>
                  <div className="text-muted-foreground text-sm font-normal">$0/mo</div>
                </th>
                <th className="py-6 px-4 text-center w-1/4 bg-primary/5 rounded-t-3xl">
                  <div className="text-primary font-bold text-xl mb-1">Pro</div>
                  <div className="text-muted-foreground text-sm font-normal">$24/mo</div>
                </th>
                <th className="py-6 px-4 text-center w-1/4">
                  <div className="text-accent font-bold text-xl mb-1">Elite</div>
                  <div className="text-muted-foreground text-sm font-normal">$59/mo</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((category, catIdx) => (
                <div key={catIdx} className="contents">
                  <tr className="bg-muted/30">
                    <td colSpan={4} className="py-4 px-4 font-bold text-foreground uppercase tracking-wider text-sm">
                      {category.category}
                    </td>
                  </tr>
                  {category.features.map((feature, featIdx) => (
                    <tr key={featIdx} className="border-b border-border hover:bg-white/5 transition-colors">
                      <td className="py-5 px-4 text-foreground">{feature.name}</td>
                      <td className="py-5 px-4 text-center">{renderValue(feature.free)}</td>
                      <td className="py-5 px-4 text-center bg-primary/5">{renderValue(feature.pro)}</td>
                      <td className="py-5 px-4 text-center">{renderValue(feature.elite)}</td>
                    </tr>
                  ))}
                </div>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-10 px-4"></td>
                <td className="py-10 px-4 text-center">
                  <Button variant="outline" className="w-full" onClick={() => navigate('/waitlist')}>Start Free</Button>
                </td>
                <td className="py-10 px-4 text-center bg-primary/5 rounded-b-3xl">
                  <Button className="w-full bg-primary" onClick={() => navigate('/waitlist?plan=pro')}>Upgrade to Pro</Button>
                </td>
                <td className="py-10 px-4 text-center">
                  <Button className="w-full bg-accent hover:bg-accent/90" onClick={() => navigate('/waitlist?plan=elite')}>Get Elite</Button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="border border-border rounded-2xl overflow-hidden bg-card"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-foreground flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 pb-6 text-muted-foreground leading-relaxed ${openFaq === i ? 'block' : 'hidden'}`}>
                  {faq.answer}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderValue(val: string | boolean) {
  if (typeof val === 'boolean') {
    return val ? <Check className="w-6 h-6 text-primary mx-auto" /> : <X className="w-6 h-6 text-muted-foreground/30 mx-auto" />;
  }
  return <span className="text-foreground font-medium">{val}</span>;
}
