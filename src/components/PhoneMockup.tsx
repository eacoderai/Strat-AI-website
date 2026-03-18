import { motion } from 'motion/react';
import { useState } from 'react';
import { Code2, MessageSquare, TrendingUp, Zap, FileCode, Activity } from 'lucide-react';

interface PhoneMockupProps {
  variant?: 'strategy' | 'code' | 'chat' | 'analysis';
  className?: string;
}

export function PhoneMockup({ variant = 'strategy', className = '' }: PhoneMockupProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        rotateY: isHovered ? 10 : 0,
        rotateX: isHovered ? -5 : 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Phone Frame */}
      <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
        <div className="bg-white rounded-[2.5rem] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10" />
          
          {/* Screen Content */}
          <div className="h-[600px] bg-gradient-to-br from-purple-50 to-indigo-50 relative overflow-hidden">
            {variant === 'strategy' && <StrategyFormScreen />}
            {variant === 'code' && <CodeGenerationScreen />}
            {variant === 'chat' && <ChatScreen />}
            {variant === 'analysis' && <AnalysisScreen />}
          </div>
        </div>
      </div>

      {/* 3D Shadow */}
      <div
        className="absolute inset-0 bg-black/20 rounded-[3rem] blur-3xl -z-10"
        style={{ transform: 'translateZ(-50px)' }}
      />
    </motion.div>
  );
}

function StrategyFormScreen() {
  return (
    <div className="p-6 pt-12 h-full">
      {/* Header */}
      <div className="mb-6">
        <motion.h3 
          className="text-gray-800 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Submit Strategy
        </motion.h3>
        <p className="text-gray-500 text-sm">Describe your trading idea</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <motion.div
          className="bg-white rounded-2xl p-4 shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <label className="text-gray-600 text-sm mb-2 block">Strategy Name</label>
          <div className="h-2 bg-gray-200 rounded w-3/4" />
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-4 shadow-sm h-32"
          whileHover={{ scale: 1.02 }}
        >
          <label className="text-gray-600 text-sm mb-2 block">Strategy Description</label>
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded" />
            <div className="h-2 bg-gray-200 rounded w-5/6" />
            <div className="h-2 bg-gray-200 rounded w-4/6" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-4 shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <label className="text-gray-600 text-sm mb-2 block">Instrument</label>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">SPY / BTC / EURUSD</span>
            <div className="w-4 h-4 border-2 border-purple-600 rounded" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-4 shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <label className="text-gray-600 text-sm mb-2 block">Platform</label>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs">TradingView</div>
            <div className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">MetaTrader</div>
            <div className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">Exchange API</div>
          </div>
        </motion.div>
      </div>

      {/* Generate Button */}
      <motion.button
        className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)' }}
        whileTap={{ scale: 0.98 }}
      >
        <Zap className="w-5 h-5" />
        Generate Code
      </motion.button>

      {/* Help Button */}
      <motion.button
        className="w-full mt-3 py-3 text-purple-600 text-sm"
        whileHover={{ scale: 1.02 }}
      >
        View Example Strategies
      </motion.button>
    </div>
  );
}

function CodeGenerationScreen() {
  return (
    <div className="p-6 pt-12 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-800">Generated Code</h3>
          <p className="text-green-600 text-sm flex items-center gap-1">
            <span className="w-2 h-2 bg-green-600 rounded-full" />
            Multi-Platform • Ready
          </p>
        </div>
        <motion.div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Code2 className="w-5 h-5 text-white" />
        </motion.div>
      </div>

      {/* Code Block */}
      <motion.div
        className="bg-gray-900 rounded-2xl p-4 mb-4 h-64 overflow-hidden relative"
        whileHover={{ scale: 1.02 }}
      >
        <div className="space-y-2 text-xs font-mono">
          <div className="text-purple-400">// StratAI • Strategy Logic</div>
          <div className="text-green-400">asset = "SPY | BTC | EURUSD"</div>
          <div className="text-blue-400">risk_per_trade = <span className="text-white">0.01</span></div>
          <div className="text-blue-400">stop = <span className="text-white">1.5 * ATR</span></div>
          <div className="text-blue-400">take_profit = <span className="text-white">3.0 * risk</span></div>
          <div className="text-gray-500">...</div>
          <div className="text-yellow-400">if <span className="text-white">entry_condition</span></div>
          <div className="text-white">{'{'}</div>
          <div className="pl-4 text-gray-400">place_order(size_from_risk, stop, take_profit)</div>
          <div className="text-white">{'}'}</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent" />
      </motion.div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          className="py-3 bg-white rounded-xl border-2 border-purple-600 text-purple-600 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileCode className="w-4 h-4" />
          Copy
        </motion.button>
        <motion.button
          className="py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </motion.button>
      </div>

      {/* Chat CTA */}
      <motion.button
        className="w-full mt-3 py-3 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
      >
        <MessageSquare className="w-4 h-4" />
        Tweak with AI Chat
      </motion.button>
    </div>
  );
}

function ChatScreen() {
  return (
    <div className="p-6 pt-12 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-gray-800 mb-1">AI Code Assistant</h3>
        <p className="text-gray-500 text-sm">Refine your strategy</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-3 overflow-hidden">
        {/* User Message */}
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-purple-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
            <p className="text-sm">Add a trailing stop based on 1.5× ATR</p>
          </div>
        </motion.div>

        {/* AI Message */}
        <motion.div
          className="flex justify-start"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <Code2 className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-gray-500">StratAI</span>
            </div>
            <p className="text-sm text-gray-700">I've updated your logic with a trailing stop. It will now adjust stops as price moves in your favor.</p>
          </div>
        </motion.div>

        {/* User Message */}
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-purple-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
            <p className="text-sm">Show me the updated code</p>
          </div>
        </motion.div>
      </div>

      {/* Input Area */}
      <motion.div
        className="mt-4 bg-white rounded-2xl shadow-sm flex items-center gap-2 p-3"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex-1 h-2 bg-gray-200 rounded" />
        <motion.div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

function AnalysisScreen() {
  return (
    <div className="p-6 pt-12 h-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-gray-800 mb-1">Strategy Analysis</h3>
        <p className="text-gray-500 text-sm">Simulated backtest results</p>
      </div>

      {/* Performance Chart */}
      <motion.div
        className="bg-white rounded-3xl p-6 mb-6 shadow-lg"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 text-sm">Equity Curve</span>
          <span className="text-green-600 text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +24.8%
          </span>
        </div>
        <div className="h-32 relative">
          <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
            <motion.path
              d="M 0 80 L 50 75 L 100 70 L 150 55 L 200 50 L 250 35 L 300 30"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <motion.path
              d="M 0 80 L 50 75 L 100 70 L 150 55 L 200 50 L 250 35 L 300 30 L 300 100 L 0 100 Z"
              fill="url(#areaGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: 'Win Rate', value: '68%', icon: Activity, color: 'text-green-600' },
          { label: 'Profit Factor', value: '2.4', icon: TrendingUp, color: 'text-blue-600' },
          { label: 'Max Drawdown', value: '12%', icon: TrendingUp, color: 'text-orange-600' },
          { label: 'Total Trades', value: '142', icon: Activity, color: 'text-purple-600' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl p-4 shadow-sm"
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-gray-500 text-xs">{stat.label}</span>
            </div>
            <div className={`${stat.color}`}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Warning */}
      <motion.div
        className="bg-yellow-50 border border-yellow-200 rounded-xl p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-yellow-700 text-xs">⚠️ Always test on demo before live trading</p>
      </motion.div>
    </div>
  );
}
