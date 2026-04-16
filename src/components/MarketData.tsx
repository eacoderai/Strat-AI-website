import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, DollarSign, Bitcoin, BarChart3 } from 'lucide-react';

interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto' | 'forex';
}

const STOCK_SYMBOLS = ['SPY', 'AAPL', 'MSFT', 'GOOGL', 'NVDA'];
const FOREX_PAIRS = ['EUR', 'GBP', 'USD', 'AUD'];
const CRYPTO_SYMBOLS = ['bitcoin', 'ethereum', 'solana'];

export function MarketData() {
  const [allItems, setAllItems] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAlphaVantageStockData = async (symbols: string[]): Promise<MarketItem[]> => {
    const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

    if (!API_KEY) {
      return [];
    }

    const stockNames: Record<string, string> = {
      'SPY': 'S&P 500 ETF',
      'AAPL': 'Apple Inc.',
      'MSFT': 'Microsoft Corp.',
      'GOOGL': 'Alphabet Inc.',
      'NVDA': 'NVIDIA Corp.'
    };

    try {
      const results: MarketItem[] = [];

      for (const symbol of symbols) {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
          const quote = data['Global Quote'];
          results.push({
            symbol: symbol,
            name: stockNames[symbol] || symbol,
            price: parseFloat(quote['05. price']) || 0,
            change: parseFloat(quote['09. change']) || 0,
            changePercent: parseFloat(quote['10. change percent']?.replace('%', '')) || 0,
            type: 'stock' as const
          });
        }
      }

      return results;
    } catch (error) {
      console.error('Error fetching Alpha Vantage stock data:', error);
    }
    return [];
  };

  const fetchAlphaVantageForexData = async (currencies: string[]): Promise<MarketItem[]> => {
    const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

    if (!API_KEY) {
      return [];
    }

    const forexPairs = [
      { from: 'EUR', to: 'USD', symbol: 'EUR/USD', name: 'Euro/US Dollar' },
      { from: 'GBP', to: 'USD', symbol: 'GBP/USD', name: 'British Pound/US Dollar' },
      { from: 'USD', to: 'JPY', symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen' },
      { from: 'AUD', to: 'USD', symbol: 'AUD/USD', name: 'Australian Dollar/US Dollar' }
    ];

    try {
      const results: MarketItem[] = [];

      for (const pair of forexPairs) {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${pair.from}&to_currency=${pair.to}&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data['Realtime Currency Exchange Rate']) {
          const rate = data['Realtime Currency Exchange Rate'];
          results.push({
            symbol: pair.symbol,
            name: pair.name,
            price: parseFloat(rate['5. Exchange Rate']) || 0,
            change: 0,
            changePercent: 0,
            type: 'forex' as const
          });
        }
      }

      return results;
    } catch (error) {
      console.error('Error fetching Alpha Vantage forex data:', error);
    }
    return [];
  };

  const fetchCoinAPICryptoData = async (): Promise<MarketItem[]> => {
    const API_KEY = import.meta.env.VITE_COINAPI_KEY;

    if (!API_KEY) {
      return [];
    }

    const cryptoPairs = [
      { base: 'BTC', quote: 'USD', symbol: 'BTC', name: 'Bitcoin' },
      { base: 'ETH', quote: 'USD', symbol: 'ETH', name: 'Ethereum' },
      { base: 'SOL', quote: 'USD', symbol: 'SOL', name: 'Solana' }
    ];

    try {
      const results: MarketItem[] = [];

      for (const pair of cryptoPairs) {
        const response = await fetch(
          `https://rest.coinapi.io/v1/exchangerate/${pair.base}/${pair.quote}`,
          { headers: { 'X-CoinAPI-Key': API_KEY } }
        );
        const data = await response.json();

        if (data.rate) {
          results.push({
            symbol: pair.symbol,
            name: pair.name,
            price: data.rate || 0,
            change: 0,
            changePercent: 0,
            type: 'crypto' as const
          });
        }
      }

      return results;
    } catch (error) {
      console.error('Error fetching CoinAPI crypto data:', error);
    }
    return [];
  };

  const fetchDemoData = (): MarketItem[] => {
    const demoStocks: MarketItem[] = [
      { symbol: 'SPY', name: 'S&P 500 ETF', price: 512.45, change: 2.34, changePercent: 0.46, type: 'stock' },
      { symbol: 'AAPL', name: 'Apple Inc.', price: 189.30, change: -1.25, changePercent: -0.66, type: 'stock' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.80, change: 3.45, changePercent: 0.84, type: 'stock' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 175.60, change: 0.89, changePercent: 0.51, type: 'stock' },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.20, change: 12.50, changePercent: 1.45, type: 'stock' },
    ];

    const demoCrypto: MarketItem[] = [
      { symbol: 'BTC', name: 'Bitcoin', price: 67450.00, change: 1250.50, changePercent: 1.89, type: 'crypto' },
      { symbol: 'ETH', name: 'Ethereum', price: 3520.00, change: -45.30, changePercent: -1.27, type: 'crypto' },
      { symbol: 'SOL', name: 'Solana', price: 145.60, change: 8.90, changePercent: 6.51, type: 'crypto' },
    ];

    const demoForex: MarketItem[] = [
      { symbol: 'EUR/USD', name: 'Euro/US Dollar', price: 1.0865, change: 0.0012, changePercent: 0.11, type: 'forex' },
      { symbol: 'GBP/USD', name: 'British Pound/US Dollar', price: 1.2745, change: -0.0023, changePercent: -0.18, type: 'forex' },
      { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen', price: 149.85, change: 0.45, changePercent: 0.30, type: 'forex' },
      { symbol: 'AUD/USD', name: 'Australian Dollar/US Dollar', price: 0.6545, change: -0.0015, changePercent: -0.23, type: 'forex' },
    ];

    return [...demoStocks, ...demoCrypto, ...demoForex];
  };

  const fetchAllData = async () => {
    setLoading(true);

    const [stocks, forex, crypto] = await Promise.all([
      fetchAlphaVantageStockData(STOCK_SYMBOLS),
      fetchAlphaVantageForexData(FOREX_PAIRS),
      fetchCoinAPICryptoData()
    ]);

    const demoData = fetchDemoData();

    const stocksData = stocks.length > 0 ? stocks : demoData.filter(item => item.type === 'stock');
    const forexData = forex.length > 0 ? forex : demoData.filter(item => item.type === 'forex');
    const cryptoData = crypto.length > 0 ? crypto : demoData.filter(item => item.type === 'crypto');

    const maxLen = Math.max(stocksData.length, forexData.length, cryptoData.length);
    const interleavedItems: MarketItem[] = [];
    for (let i = 0; i < maxLen; i++) {
      if (forexData[i]) interleavedItems.push(forexData[i]);
      if (cryptoData[i]) interleavedItems.push(cryptoData[i]);
      if (stocksData[i]) interleavedItems.push(stocksData[i]);
    }
    setAllItems(interleavedItems);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number, type: 'stock' | 'crypto' | 'forex') => {
    if (type === 'forex') {
      return price.toFixed(4);
    } else if (type === 'crypto') {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return price.toFixed(2);
  };

  const MarketCard = ({ item }: { item: MarketItem }) => {
    const isPositive = item.change >= 0;
    const Icon = item.type === 'crypto' ? Bitcoin : item.type === 'forex' ? DollarSign : BarChart3;

    return (
      <div className="flex items-center gap-4 px-5 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors whitespace-nowrap">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
          item.type === 'crypto' ? 'bg-orange-500/20' :
          item.type === 'forex' ? 'bg-green-500/20' : 'bg-blue-500/20'
        }`}>
          <Icon className={`w-4 h-4 ${
            item.type === 'crypto' ? 'text-orange-500' :
            item.type === 'forex' ? 'text-green-500' : 'text-blue-500'
          }`} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm">{item.symbol}</span>
          <span className="text-xs text-gray-500">{item.name}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-semibold text-sm">${formatPrice(item.price, item.type)}</span>
          <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-10 relative z-10 overflow-hidden" style={{ height: '171px', color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="hidden md:flex items-center justify-between" style={{ paddingTop: 0, paddingBottom: 0, marginTop: -25, marginBottom: -25 }}>
          <div>
            <h2 className="text-2xl font-bold mb-1">Live Market Data</h2>
            <p className="text-sm text-gray-500">
              Real-time prices for stocks, crypto, and forex
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          <div className="flex gap-4 pr-4">
            {allItems.map((item) => (
              <MarketCard key={item.symbol} item={item} />
            ))}
          </div>
          <div className="flex gap-4 pr-4" aria-hidden="true">
            {allItems.map((item) => (
              <MarketCard key={`dup-${item.symbol}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
