import { motion } from 'motion/react';
import { ShieldCheck, Lock, Database, Server } from 'lucide-react';

export function DataManagement() {
  return (
    <section className="py-24 bg-card/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              Institutional-Grade Security
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Your Strategies. <span className="text-primary">Your Edge.</span> Secured.
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              We treat strategy logic like private keys. StratAI uses end-to-end encryption and decentralized storage patterns to ensure your edge remains yours.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground">Zero-Knowledge Storage</h4>
                <p className="text-muted-foreground text-sm">We can't see your strategies. They are encrypted before they ever hit our servers.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground">Private Database</h4>
                <p className="text-muted-foreground text-sm">No data sharing. Your trade history and logic are isolated in your own secure silo.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center">
                  <Server className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground">AWS Secure Cloud</h4>
                <p className="text-muted-foreground text-sm">Hosted on highly-available, SOC2-compliant infrastructure for 99.9% uptime.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground">Audit Trails</h4>
                <p className="text-muted-foreground text-sm">Every access point is logged and monitored for unauthorized activity.</p>
              </div>
            </div>

            <motion.div
              className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-yellow-800 text-sm">
                ⚠️ <strong>Important:</strong> StratAI generates strategy logic using AI. This is not financial advice. Always test strategies on a demo account before live use. Past performance is not indicative of future results.
              </p>
            </motion.div>
          </motion.div>

          {/* Right - App Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <img 
              src="/Apple iPhone 16 Pro Max (1320x2868)/Apple iPhone 16 Pro Max Screenshot 3.png" 
              alt="StratAI App Performance Auditor Screenshot" 
              className="w-[260px] sm:w-[320px] rounded-[3rem] shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
