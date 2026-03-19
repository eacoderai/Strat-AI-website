import { motion } from 'motion/react';
import { PhoneMockup } from './PhoneMockup';
import { Shield, Lock, CheckCircle2 } from 'lucide-react';

export function DataManagement() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Icon */}
            <motion.div
              className="mb-8 inline-flex"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <h2 className="text-gray-800 mb-6">
              Secure & Reliable Code Conversion
            </h2>
            
            <p className="text-gray-600 mb-8">
              Convert your existing strategy logic between MQL4, MQL5, Pine Script, and exchange APIs. Our AI preserves your rules while adapting to platform-specific requirements.
            </p>

            {/* Feature Points */}
            <div className="space-y-4">
              {[
                'End-to-end encryption for all data',
                'No trading credentials required',
                'Code sanitization and security checks',
                'GDPR & CCPA compliant',
              ].map((point, index) => (
                <motion.div
                  key={point}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{point}</span>
                </motion.div>
              ))}
            </div>

            {/* Security Badge */}
            <motion.div
              className="mt-8 inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05 }}
            >
              <Lock className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-800">Bank-Grade Security</p>
                <p className="text-xs text-gray-500">Your strategies are safe with us</p>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4"
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

          {/* Right - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <PhoneMockup variant="analysis" className="w-[260px] sm:w-[320px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
