import { Link } from 'react-router-dom';

type StrategyExample = {
  title: string;
  description: string;
  risk: string;
};

const STRATEGY_EXAMPLES: StrategyExample[] = [
  {
    title: "RSI Oversold/Overbought",
    description:
      "Buy when RSI(14) < 30, sell when RSI(14) > 70. Use ATR-based stops and a 1:2 risk-reward target.",
    risk: "Max 2% risk per trade",
  },
  {
    title: "Moving Average Crossover",
    description:
      "Buy when EMA(9) crosses above EMA(21). Sell when EMA(9) crosses below EMA(21).",
    risk: "Stop loss at recent swing low/high, 1:2 risk-reward ratio",
  },
  {
    title: "Breakout Strategy",
    description:
      "Buy when price breaks above the previous day's high with volume confirmation. Exit at 3% profit or 1.5% loss.",
    risk: "Position size based on ATR",
  },
  {
    title: "MACD + Bollinger Bands",
    description:
      "Buy when MACD crosses above signal line AND price touches lower Bollinger Band. Sell at upper band.",
    risk: "Stop loss at volatility band, position size by % risk per trade",
  },
];

export default function Examples() {
  return (
    <main className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-gray-800">Strategy Examples</h1>
          <Link
            to="/"
            className="rounded-full px-6 py-2 border-2 hover:bg-gray-50 text-sm"
          >
            ← Back to Home
          </Link>
        </div>

        <p className="text-gray-600 mb-8 max-w-2xl">
          Explore popular, well-structured strategies to use as a starting point.
          You can tweak indicators, risk rules, and exits to fit your style.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STRATEGY_EXAMPLES.map((ex) => (
            <article key={ex.title} className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="text-gray-800 mb-2">{ex.title}</h3>
              <p className="text-gray-600 mb-3">{ex.description}</p>
              <p className="text-gray-700"><span className="font-medium">Risk:</span> {ex.risk}</p>
              <div className="mt-4">
                <Link
                  to={`/builder?title=${encodeURIComponent(ex.title)}&description=${encodeURIComponent(ex.description)}&risk=${encodeURIComponent(ex.risk)}`}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                >
                  Use This Example
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
