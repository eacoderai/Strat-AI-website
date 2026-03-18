import Seo from '@/components/docs/Seo';
import DocLayout from '@/components/docs/DocLayout';

export default function Documentation() {
  return (
    <>
      <Seo title="StratAI Mobile Documentation | StratAI" description="StratAI Mobile Documentation: getting started, workflow, builder, journaling, execution, security, troubleshooting, and support for stocks, crypto, and forex." />
      <DocLayout title="StratAI Mobile Documentation" subtitle="Your AI strategy engine — simplified for stocks, crypto, and forex">
        <div className="rounded-xl border bg-card px-6 py-6">
          <h4 className="mb-2">Getting Started</h4>
          <ul className="list-disc ml-4 text-sm text-gray-600 space-y-1">
            <li>Download StratAI from the App Store or Google Play</li>
            <li>Create your account with email or Google</li>
            <li>Tap "New Strategy" to begin → No coding required</li>
          </ul>
          <div className="mt-3 text-sm text-purple-600">→ Download Guide</div>
        </div>
        <div className="rounded-xl border bg-card px-6 py-6">
          <h4 className="mb-2">Core Workflow</h4>
          <p className="text-sm text-gray-600">Describe → Generate → Execute</p>
          <ul className="list-disc ml-4 text-sm text-gray-600 space-y-1 mt-3">
            <li>Describe: Type your edge in plain English ("Buy when RSI &lt; 30 and volume spikes")</li>
            <li>Generate: AI creates your strategy logic (MQL4, MQL5, Pine Script, or exchange APIs) or trading plan</li>
            <li>Execute: Deploy to broker, backtest, or save as draft</li>
          </ul>
          <div className="mt-3 text-sm text-purple-600">→ Full Workflow Guide</div>
        </div>
        <div className="rounded-xl border bg-card px-6 py-6">
          <h4 className="mb-2">Strategy Builder</h4>
          <p className="text-sm text-gray-600">Create any strategy in 3 steps:</p>
          <ul className="list-disc ml-4 text-sm text-gray-600 space-y-1 mt-3">
            <li>Input: Describe your logic in natural language</li>
            <li>Refine: Adjust risk rules, timeframes, or filters with AI</li>
            <li>Output: Get executable code or a structured trading plan</li>
          </ul>
          <div className="mt-3 text-sm text-purple-600">→ Strategy Builder Tutorial</div>
        </div>
        <div className="rounded-xl border bg-card px-6 py-6">
          <h4 className="mb-2">Trading Journal</h4>
          <p className="text-sm text-gray-600">AI-powered journal analysis:</p>
          <ul className="list-disc ml-4 text-sm text-gray-600 space-y-1 mt-3">
            <li>Upload your trade history (CSV or manual entry)</li>
            <li>
              StratAI identifies hidden patterns:
              <ul className="list-disc ml-4 text-sm text-gray-600 space-y-1 mt-1">
                <li>Win/loss triggers</li>
                <li>Risk management leaks</li>
                <li>Overlooked opportunities</li>
              </ul>
            </li>
          </ul>
          <div className="mt-3 text-sm text-purple-600">→ Journal Guide</div>
        </div>
        <div className="rounded-xl border bg-card px-6 py-6">
          <h4 className="mb-2">Execution &amp; Backtesting</h4>
          <ul className="list-disc ml-4 text-sm text-gray-600 space-y-1">
            <li>Deploy: Export to TradingView (stocks), MetaTrader (forex), or exchange APIs (crypto)</li>
            <li>Backtest: Run historical tests with 1 click</li>
            <li>Sandbox: Test strategies risk-free with virtual funds</li>
          </ul>
          <div className="mt-3 text-sm text-purple-600">→ Execution Guide</div>
        </div>
        <div className="rounded-xl border bg-card px-6 py-6">
          <h4 className="mb-2">Account &amp; Security</h4>
          <ul className="list-disc ml-4 text-sm text-gray-600 space-y-1">
            <li>All data stays on your device (no cloud processing)</li>
            <li>Biometric login (Face ID/Touch ID)</li>
            <li>Export strategies as encrypted files</li>
          </ul>
          <div className="mt-3 text-sm text-purple-600">→ Security Overview</div>
        </div>
        <div className="rounded-xl border bg-card px-6 py-6">
          <h4 className="mb-2">Troubleshooting</h4>
          <p className="text-sm text-gray-600">Common issues:</p>
          <ul className="list-disc ml-4 text-sm text-gray-600 space-y-1 mt-3">
            <li>"App won’t generate logic" → Check internet connection + clear cache</li>
            <li>"Broker connection failed" → Verify API keys in Settings &gt; Platforms</li>
            <li>"Journal not loading" → Ensure CSV format matches template</li>
          </ul>
          <div className="mt-3 text-sm text-purple-600">→ Full Troubleshooting</div>
        </div>
        <div className="rounded-xl border bg-card px-6 py-6">
          <h4 className="mb-2">Support</h4>
          <ul className="list-disc ml-4 text-sm text-gray-600 space-y-1">
            <li>24/7 chat support in-app</li>
            <li>Email: support@stratai.ai</li>
            <li>Priority response for StratAI Pro subscribers</li>
          </ul>
          <div className="mt-3 text-sm text-purple-600">→ Contact Support</div>
        </div>
      </DocLayout>
    </>
  );
}
