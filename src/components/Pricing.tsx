import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Check, Zap, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Explore the basics and generate a couple strategies each month.',
    features: [
      '2 strategy generations / month',
      'MetaTrader 5 (MQL5) only',
      'Manual trading plans',
      'AI Chat Assistant locked',
      'Code converter locked',
    ],
    cta: 'Start Free',
    variant: 'outline',
    icon: <Zap className="w-6 h-6 text-muted-foreground" />,
  },
  {
    name: 'Pro',
    price: '24',
    description: 'Unlock more platforms, AI chat, converter, and full backtesting tools.',
    features: [
      '10 strategy generations / month',
      'MQL4, MQL5, Pine Script, QuantConnect, cTrader',
      'Crypto automation (Binance / Bybit / 3Commas / TV alerts)',
      'AI Chat Assistant (standard)',
      'Code converter',
      'Downloads enabled',
      'Backtest UI + performance metrics',
      'Save last 3 versions',
      'Support response within 48h',
    ],
    cta: 'Upgrade to Pro',
    variant: 'default',
    popular: true,
    icon: <Check className="w-6 h-6 text-primary" />,
  },
  {
    name: 'Elite',
    price: '59',
    description: 'Unlimited usage plus journaling, audits, and priority support.',
    features: [
      'Everything in Pro',
      'Unlimited strategy generations',
      'Unlimited version history',
      'Trading journal + AI reports',
      'Professional strategy audit',
      'AI Chat Assistant (priority)',
      'Support response within 12h',
    ],
    cta: 'Get Elite',
    variant: 'default',
    icon: <Crown className="w-6 h-6 text-accent" />,
  },
];

export function Pricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Simple, Transparent <span className="text-primary">Pricing.</span>
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose the plan that fits your strategy workflow. Save 15% with annual billing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-3xl border ${
                plan.popular ? 'border-primary bg-primary/5' : 'border-border bg-background'
              } flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  {plan.icon}
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full h-12 rounded-xl font-bold transition-all ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20' 
                    : 'bg-card border border-border hover:bg-muted text-foreground'
                }`}
                onClick={() => navigate('/waitlist')}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
