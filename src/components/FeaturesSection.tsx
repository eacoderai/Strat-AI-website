import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { PhoneMockup } from './PhoneMockup';
import { Check, Layout, Bot, FileText, Shield, Zap, TrendingUp, Code2, LineChart } from 'lucide-react';
import stockIcon from '../assets/stock-icon.svg';
import cryptoIcon from '../assets/crypto-icon.svg';
import forexIcon from '../assets/forex-icon.svg';

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<'manual' | 'algo'>('manual');
  const navigate = useNavigate();

  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            The AI Strategy Engine. <span className="text-primary">Two Ways to Build.</span>
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your AI strategy engine — for stocks, crypto, and forex. Use natural language to create plans or executable logic.
          </p>
        </div>

        <div className="asset-examples grid md:grid-cols-3 gap-6 mb-16">
          <div className="example rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <img src={stockIcon} alt="" className="w-8 h-8 text-primary" />
              <h3 className="text-foreground font-bold text-lg">Stocks</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-3">
              "Buy SPY when price crosses above 50 EMA with volume &gt; 1.5x average"
            </p>
            <span className="text-primary text-sm font-semibold">→ Pine Script + backtest-ready</span>
          </div>
          <div className="example rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <img src={cryptoIcon} alt="" className="w-8 h-8 text-primary" />
              <h3 className="text-foreground font-bold text-lg">Crypto</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-3">
              "Long SOL if 15m RSI &lt; 30 and funding rate &lt; -0.01%"
            </p>
            <span className="text-primary text-sm font-semibold">→ Binance API logic + risk filters</span>
          </div>
          <div className="example rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <img src={forexIcon} alt="" className="w-8 h-8 text-primary" />
              <h3 className="text-foreground font-bold text-lg">Forex</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-3">
              "Sell GBPUSD on London open breakout with ATR-based stop"
            </p>
            <span className="text-primary text-sm font-semibold">→ MQL5 + session filter</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-card border border-border rounded-2xl">
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                activeTab === 'manual'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Layout className="w-5 h-5" />
              <span className="font-semibold">For Manual Traders</span>
            </button>
            <button
              onClick={() => setActiveTab('algo')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                activeTab === 'algo'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bot className="w-5 h-5" />
              <span className="font-semibold">For Algo Traders</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'manual' ? (
            <motion.div
              key="manual"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                  Strategy Planner
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Turn Ideas into Actionable Plans
                </h3>
                <ul className="space-y-4 mb-8">
                  {[
                    { icon: <Check className="text-accent" />, text: 'Clear entry/exit rules with stop-loss & take-profit' },
                    { icon: <Shield className="text-accent" />, text: 'Risk management (1% rule, daily loss limit)' },
                    { icon: <Zap className="text-accent" />, text: 'Psychology checklist to avoid emotional trades' },
                    { icon: <FileText className="text-accent" />, text: 'Printable PDF for journaling' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <div className="mt-1">{item.icon}</div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => navigate('/waitlist')}
                  className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-6 h-auto text-lg font-semibold"
                >
                  Get My Strategy Plan
                </Button>
              </div>
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full group-hover:scale-110 transition-transform" />
                  <PhoneMockup variant="strategy" className="w-[280px] sm:w-[320px] relative z-10" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="algo"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-1 flex justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:scale-110 transition-transform" />
                  <PhoneMockup variant="code" className="w-[280px] sm:w-[320px] relative z-10" />
                </div>
              </div>
              <div className="order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                  Code Engine
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Generate Strategy Code Instantly.
                </h3>
                <ul className="space-y-4 mb-8">
                  {[
                    { icon: <Code2 className="text-primary" />, text: 'Export to TradingView (stocks), MetaTrader (forex), or exchange APIs (crypto)' },
                    { icon: <TrendingUp className="text-primary" />, text: 'Position sizing: % risk per trade' },
                    { icon: <LineChart className="text-primary" />, text: 'Backtesting preview (Engineer only)' },
                    { icon: <Zap className="text-primary" />, text: 'Code converter (Engineer only)' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <div className="mt-1">{item.icon}</div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => navigate('/waitlist')}
                  className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-6 h-auto text-lg font-semibold"
                >
                  Generate Strategy Code
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
