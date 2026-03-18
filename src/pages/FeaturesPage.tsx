import { motion } from 'motion/react';
import { Layout, Bot, CheckCircle2, Shield, Zap, Code2, LineChart, FileText, Download, Brain, Percent, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PhoneMockup } from '../components/PhoneMockup';

export default function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-bold text-foreground mb-6"
          >
            Everything you need with <span className="text-primary">StratAI</span>
          </motion.h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            StratAI is a universal AI strategy engine. Describe ideas in plain English and generate executable logic or structured plans for stocks, crypto, and forex.
          </p>
        </div>

        {/* Strategy Planner Section */}
        <div id="planner" className="mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Layout className="w-4 h-4" />
                Strategy Planner
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Turn Vague Ideas into <span className="text-primary">Actionable Rules</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Most teams fail without clear rules. StratAI takes your description and builds a professional-grade strategy document in seconds.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Clear Entry/Exit Logic</h4>
                    <p className="text-muted-foreground">Stop guessing. Get exact price levels and conditions for every trade.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Dynamic Risk Management</h4>
                    <p className="text-muted-foreground">Calculated position sizing and daily loss limits based on your capital.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Psychology Checklist</h4>
                    <p className="text-muted-foreground">A pre-trade ritual to ensure you're in the right mindset before executing.</p>
                  </div>
                </div>
              </div>

              <div className="mb-10 p-6 rounded-2xl bg-card border border-primary/20">
                <h4 className="text-primary font-bold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Why it beats vague journaling
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Most journals are just a history of mistakes. The AI Trading Planner turns your journal into a feedback loop. By comparing your executed trades against your AI-generated rules, you identify exactly where you deviated from your edge.
                </p>
              </div>

              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-xl" onClick={() => navigate('/waitlist')}>
                Get My Strategy Plan
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">SAMPLE OUTPUT</div>
              </div>
              <div className="space-y-6 font-mono text-sm">
                <div className="pb-4 border-b border-border">
                  <h4 className="text-primary font-bold mb-2"># STRATEGY: Trend-Following Breakout</h4>
                  <p className="text-muted-foreground">Markets: SPY • BTC • EURUSD | Timeframe: 1H</p>
                </div>
                <div className="space-y-3">
                  <p className="text-foreground"><span className="text-primary">ENTRY:</span> Price closes above 20-day High AND RSI(14) {'>'} 60.</p>
                  <p className="text-foreground"><span className="text-primary">STOP LOSS:</span> 1.5x ATR from entry price.</p>
                  <p className="text-foreground"><span className="text-primary">TAKE PROFIT:</span> 3x Risk (1:3 RR Ratio).</p>
                </div>
                <div className="p-4 bg-background rounded-xl border border-border">
                  <p className="text-accent font-bold mb-2">RISK RULES:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Risk 1% of balance per trade</li>
                    <li>Max 3 open trades simultaneously</li>
                    <li>Stop trading if daily loss {'>'} 2%</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Code Engine Section */}
        <div id="generator">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, order: 2 }}
              whileInView={{ opacity: 1, order: 1 }}
              viewport={{ once: true }}
              className="lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <Bot className="w-4 h-4" />
                Code Engine
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Generate Strategy Code. <span className="text-accent">Deploy with confidence.</span>
              </h2>
              <div className="text-accent font-semibold mb-3">One engine. Every market.</div>
              <div className="text-muted-foreground text-lg mb-8 leading-relaxed">
                <div className="mb-3">Generate executable logic for your platform:</div>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Stocks: Pine Script for TradingView</li>
                  <li>Crypto: JSON/API-ready logic for Binance, Bybit</li>
                  <li>Forex: MQL5 for MetaTrader</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <Code2 className="w-8 h-8 text-accent mb-4" />
                  <h4 className="text-foreground font-bold mb-2">Clean Syntax</h4>
                  <p className="text-muted-foreground text-sm">Optimized, commented code following industry best practices.</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <Zap className="w-8 h-8 text-accent mb-4" />
                  <h4 className="text-foreground font-bold mb-2">One-Click Export</h4>
                  <p className="text-muted-foreground text-sm">Export to TradingView (stocks), MetaTrader (forex), or exchange APIs (crypto).</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <LineChart className="w-8 h-8 text-accent mb-4" />
                  <h4 className="text-foreground font-bold mb-2">Backtest Ready</h4>
                  <p className="text-muted-foreground text-sm">Every strategy is compatible with built-in testers.</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <Download className="w-8 h-8 text-accent mb-4" />
                  <h4 className="text-foreground font-bold mb-2">Cross-Platform</h4>
                  <p className="text-muted-foreground text-sm">Convert logic across TradingView, MetaTrader, and exchange APIs.</p>
                </div>
              </div>

              <div className="mb-10 flex flex-wrap gap-4 items-center">
                <span className="text-sm text-muted-foreground font-medium">Supported Platforms:</span>
                <div className="flex gap-4">
                  <span className="px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold">TradingView (stocks)</span>
                  <span className="px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold">MetaTrader (forex)</span>
                  <span className="px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold">Binance/Bybit (crypto)</span>
                </div>
              </div>

              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-xl" onClick={() => navigate('/waitlist')}>
                Generate Strategy Code
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30, order: 1 }}
              whileInView={{ opacity: 1, x: 0, order: 2 }}
              viewport={{ once: true }}
              className="lg:order-1 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-[120px] rounded-full" />
                <PhoneMockup variant="code" className="w-[300px] sm:w-[340px] relative z-10" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Performance Auditor Section */}
        <div id="journal-analyzer" className="mt-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                Elite Feature · Performance Auditor
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Performance Auditing with <span className="text-accent">Actionable Insights</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Upload your execution history and get a breakdown of your edge, leaks, and optimizations — including deviations from your Strategy Plan.
              </p>
              <div className="mb-10 p-6 rounded-2xl bg-card border border-accent/20">
                <h4 className="text-foreground font-bold mb-2">Upload trade history from:</h4>
                <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
                  <li>TradingView (stocks)</li>
                  <li>MetaTrader (forex)</li>
                  <li>Binance/Bybit (crypto)</li>
                </ul>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Percent className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Key Metrics</h4>
                    <p className="text-muted-foreground">Win rate, profit factor, drawdowns, expectancy — all in one place.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Brain className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Pattern Detection</h4>
                    <p className="text-muted-foreground">Surface profitable conditions and harmful behaviors with AI pattern mining.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Plan Comparisons</h4>
                    <p className="text-muted-foreground">See how execution matched or deviated from your Strategy Plan.</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-xl" onClick={() => navigate('/waitlist')}>
                See How It Works
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <div className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-bold">AI REPORT</div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl bg-background border border-border p-4">
                  <div className="text-muted-foreground text-xs mb-1">Win Rate</div>
                  <div className="text-2xl font-bold text-foreground">61%</div>
                </div>
                <div className="rounded-xl bg-background border border-border p-4">
                  <div className="text-muted-foreground text-xs mb-1">Profit Factor</div>
                  <div className="text-2xl font-bold text-foreground">1.73</div>
                </div>
                <div className="rounded-xl bg-background border border-border p-4">
                  <div className="text-muted-foreground text-xs mb-1">Max Drawdown</div>
                  <div className="text-2xl font-bold text-foreground">-6.4%</div>
                </div>
              </div>
              <div className="p-4 bg-background rounded-xl border border-border mb-4">
                <p className="text-accent font-bold mb-2">Patterns</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>You win 78% on EMA bounces after NY open</li>
                  <li>Losses cluster on GBP pairs during London close</li>
                </ul>
              </div>
              <div className="p-4 bg-background rounded-xl border border-border">
                <p className="text-primary font-bold mb-2">Plan Deviations</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>34% of losers ignored stop policy</li>
                  <li>17% of trades were outside plan hours</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Guaranteed Quality Section */}
        <div className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-card to-background border border-border text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Professional Code Quality</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Our AI engine is trained on thousands of successful strategies and adheres to strict coding standards to ensure your EAs run smoothly on live accounts.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-foreground font-semibold">Error-Free Compilation</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-foreground font-semibold">Latency Optimized</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-foreground font-semibold">Standard Library Usage</p>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">See StratAI in Action</h2>
            <p className="text-muted-foreground">Watch how easily you can go from an idea to a trade-ready strategy.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-video rounded-3xl bg-card border border-border flex flex-col items-center justify-center p-8 group cursor-pointer hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-foreground font-bold mb-2">Manual Planner Demo</h4>
              <p className="text-muted-foreground text-sm text-center">Watch how to generate a 5-page trading plan in 15 seconds.</p>
            </div>
            <div className="aspect-video rounded-3xl bg-card border border-border flex flex-col items-center justify-center p-8 group cursor-pointer hover:border-accent/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code2 className="w-8 h-8 text-accent" />
              </div>
              <h4 className="text-foreground font-bold mb-2">Code Engine Demo</h4>
              <p className="text-muted-foreground text-sm text-center">See a plain-language strategy become executable code.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
