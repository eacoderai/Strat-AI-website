import { useEffect, useMemo, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Seo from './docs/Seo';
import { Button } from './ui/button';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Apple, 
  PlayCircle, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Star, 
  ArrowRight,
  ChevronRight,
  Smartphone,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=REPLACE_ME';
const APP_STORE_URL = 'https://apps.apple.com/app/idREPLACE_ME';

const REVIEWS = [
  {
    name: "Alex Rivera",
    role: "Day Trader",
    content: "StratAI has completely changed my strategy building process. No more coding nightmares!",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Algo Developer",
    content: "The MQL5 generation is flawless. It saved me weeks of manual work.",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "Forex Specialist",
    content: "Clean UI and powerful AI. The deep link integration makes switching devices seamless.",
    rating: 5
  }
];

function normalizeRef(value: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!/^[A-Z0-9]{4,10}$/i.test(trimmed)) return null;
  return trimmed.toUpperCase();
}

function setReferralCookie(ref: string) {
  const secure = window.location.protocol === 'https:';
  const parts = [
    `stratai_ref=${encodeURIComponent(ref)}`,
    'Max-Age=2592000',
    'Path=/',
    'SameSite=Lax',
  ];
  if (secure) parts.push('Secure');
  document.cookie = parts.join('; ');
}

function getCookieValue(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function withRef(url: string, ref: string) {
  const join = url.includes('?') ? '&' : '?';
  return `${url}${join}ref=${encodeURIComponent(ref)}`;
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function AppDownloadCTA() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDownloadRoute = location.pathname === '/download';
  const isHomeRoute = location.pathname === '/';
  const containerRef = useRef(null);
  
  const { scrollY } = useScroll();
  const [showStickyBar, setShowStickyBar] = useState(false);

  const queryRef = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return normalizeRef(params.get('ref'));
  }, [location.search]);

  const [effectiveRef, setEffectiveRef] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('ios');

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 600) setShowStickyBar(true);
      else setShowStickyBar(false);
    });
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    if (!isDownloadRoute) return;

    const existingCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const previousHref = existingCanonical?.href;
    const canonicalHref = 'https://getstratai.com/download';

    let canonical = existingCanonical;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;

    return () => {
      if (canonical) {
        canonical.href = previousHref || 'https://getstratai.com/';
      }
    };
  }, [isDownloadRoute]);

  useEffect(() => {
    if (!isDownloadRoute && !isHomeRoute) return;

    const stored = normalizeRef(localStorage.getItem('stratai_ref')) || normalizeRef(getCookieValue('stratai_ref'));
    if (queryRef) {
      setEffectiveRef(queryRef);
      try {
        localStorage.setItem('stratai_ref', queryRef);
      } catch {}
      try {
        setReferralCookie(queryRef);
      } catch {}
      fetch('/api/referrals/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ref: queryRef, path: window.location.pathname, userAgent: navigator.userAgent }),
      }).catch(() => {});
    } else {
      setEffectiveRef(stored);
    }
  }, [isDownloadRoute, isHomeRoute, queryRef]);

  useEffect(() => {
    if (!isDownloadRoute) return;
    if (!queryRef) return;
    if (!isMobileDevice()) return;

    const deepLink = `stratai://download?ref=${encodeURIComponent(queryRef)}`;
    const t1 = window.setTimeout(() => {
      window.location.href = deepLink;
    }, 300);
    const t2 = window.setTimeout(() => {
      if (document.visibilityState === 'visible') setShowHint(true);
    }, 1500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [isDownloadRoute, queryRef]);

  const trackClick = (option: string) => {
    // Analytics tracking placeholder
    console.log(`Download option clicked: ${option}`);
    if (window.gtag) {
      window.gtag('event', 'download_click', {
        'download_option': option,
        'referral_ref': effectiveRef
      });
    }
  };

  if (!isDownloadRoute && !isHomeRoute) return null;

  const playUrl = queryRef ? withRef(PLAY_STORE_URL, queryRef) : PLAY_STORE_URL;
  const appUrl = queryRef ? withRef(APP_STORE_URL, queryRef) : APP_STORE_URL;

  if (isHomeRoute) {
    return (
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Experience StratAI on Mobile</h2>
          <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto">
            Trade with intelligence from anywhere. Get the app now.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-8 text-lg font-bold shadow-lg shadow-primary/20 group"
              onClick={() => { trackClick('home_waitlist'); navigate('/waitlist'); }}
            >
              <Apple className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
              Join Waitlist
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-2xl h-14 px-8 text-lg font-bold border-2 hover:bg-primary/5 group"
              onClick={() => { trackClick('home_android'); navigate('/download'); }}
            >
              <PlayCircle className="w-6 h-6 mr-2 text-primary group-hover:scale-110 transition-transform" />
              Get Android App
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative bg-background overflow-x-hidden" ref={containerRef}>
      <Seo title="Download StratAI App" description="Download the StratAI mobile app for iOS and Android. Build AI trading strategies on the go." />
      
      {/* Sticky Download Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-background/80 backdrop-blur-lg border-b border-border py-3 px-6 shadow-xl"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/src/assets/StratAI Logo.png" alt="Logo" className="h-8 w-auto" />
                <span className="font-bold text-foreground hidden sm:inline">StratAI App</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 rounded-full text-xs" 
                  onClick={() => { trackClick('sticky_waitlist'); navigate('/waitlist'); }}
                >
                  <Apple className="w-3.5 h-3.5 mr-1.5" /> Join App Store Waitlist
                </Button>
                <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={() => { trackClick('sticky_android'); window.location.href = playUrl; }}>
                  <PlayCircle className="w-3.5 h-3.5 mr-1.5" /> Android
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-0 pb-0 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4" />
              Now Available on Mobile
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-extrabold text-foreground mb-6 leading-[1.1]">
              Trading Intelligence <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                In Your Pocket.
              </span>
            </h1>
            
            <p className="text-muted-foreground text-xl mb-10 leading-relaxed max-w-xl">
              Take the power of StratAI wherever you go. Build, backtest, and execute professional trading strategies directly from your mobile device.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-8 text-lg font-bold shadow-lg shadow-primary/20 group"
                onClick={() => { trackClick('hero_waitlist'); navigate('/waitlist'); }}
              >
                <Apple className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                Join Waitlist
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-2xl h-14 px-8 text-lg font-bold border-2 hover:bg-primary/5 group"
                onClick={() => { trackClick('hero_android'); window.location.href = playUrl; }}
              >
                <PlayCircle className="w-6 h-6 mr-2 text-primary group-hover:scale-110 transition-transform" />
                Google Play
              </Button>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">5,000+</span>
                <span className="text-sm text-muted-foreground">Active Users</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-foreground">4.9</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">App Store Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Central Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative z-10 w-full max-w-[320px] aspect-[1320/2868] rounded-[3rem] border-8 border-slate-900 bg-slate-900 shadow-2xl overflow-hidden group perspective-1000">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20" />
              
              <AnimatePresence mode="wait">
                {activeTab === 'ios' && (
                  <motion.img
                    key="ios-img"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src="/Apple iPhone 16 Pro Max (1320x2868)/Apple iPhone 16 Pro Max Screenshot 1.png"
                    alt="StratAI iOS"
                    className="w-full h-full object-cover"
                  />
                )}
                {activeTab === 'android' && (
                  <motion.img
                    key="android-img"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src="/Apple iPhone 16 Pro Max (1320x2868)/Apple iPhone 16 Pro Max Screenshot 2.png"
                    alt="StratAI Android"
                    className="w-full h-full object-cover"
                  />
                )}
              </AnimatePresence>

              {/* Interactive Overlays */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 z-30">
                <Button 
                  className="rounded-full bg-white text-black hover:bg-white/90 scale-90 group-hover:scale-100 transition-transform"
                  onClick={() => trackClick(`mockup_${activeTab}`)}
                >
                  Preview Features <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Platform Selectors */}
            <div className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
              {(['ios', 'android'] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setActiveTab(platform)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border-2 shadow-lg ${
                    activeTab === platform 
                      ? 'bg-primary border-primary text-white scale-110' 
                      : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {platform === 'ios' && <Apple className="w-6 h-6" />}
                  {platform === 'android' && <PlayCircle className="w-6 h-6" />}
                </button>
              ))}
            </div>

            {/* Background Parallax Decorations */}
            <motion.div 
              style={{ y: useTransform(scrollY, [0, 1000], [0, 200]) }}
              className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" 
            />
            <motion.div 
              style={{ y: useTransform(scrollY, [0, 1000], [0, -150]) }}
              className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" 
            />
          </motion.div>
        </div>
      </section>

      {/* Referral Section (if active) */}
      {effectiveRef && (
        <section className="py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-primary/5 to-card p-8 md:p-12 relative overflow-hidden"
            >
              <div className="relative z-10">
                <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 border-none px-4 py-1">Exclusive Offer</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-4 text-center sm:text-left">Use Referral Code</h2>
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                  <div className="bg-background border-2 border-dashed border-primary/30 rounded-2xl px-8 py-4 text-3xl font-mono font-bold text-primary tracking-widest flex-1 text-center">
                    {effectiveRef}
                  </div>
                  <Button
                    size="lg"
                    className="h-16 px-8 rounded-2xl min-w-[160px]"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(effectiveRef);
                        setCopied(true);
                        window.setTimeout(() => setCopied(false), 1500);
                      } catch {}
                    }}
                  >
                    {copied ? <><Check className="mr-2 w-5 h-5" /> Copied</> : <><Copy className="mr-2 w-5 h-5" /> Copy Code</>}
                  </Button>
                </div>
                <p className="text-muted-foreground text-center sm:text-left flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  Paste this code in the app Profile → ‘Have a code?’ to unlock premium rewards.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-0" />
            </motion.div>
          </div>
        </section>
      )}

      {/* Trust Elements & Features */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-foreground mb-4">Secure & Professional</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trusted by thousands of traders worldwide. Your data and strategies are protected by industry-leading security.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="p-8 rounded-3xl bg-background border border-border hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Enterprise Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                256-bit encryption and secure strategy storage ensures your edge remains yours.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-background border border-border hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Community Driven</h3>
              <p className="text-muted-foreground leading-relaxed">
                Regular updates based on feedback from our professional trading community.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-background border border-border hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Verified Results</h3>
              <p className="text-muted-foreground leading-relaxed">
                Strategies built with StratAI undergo rigorous backtesting before being deployed.
              </p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <Card key={i} className="bg-background border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-foreground italic mb-6">"{review.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{review.name}</div>
                      <div className="text-sm text-muted-foreground">{review.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download Options List (Alternative for accessibility) */}
      <section className="py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">All Download Options</h2>
            <p className="text-muted-foreground">Choose the version that works best for your device.</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => { trackClick('list_waitlist'); navigate('/waitlist'); }}
              className="w-full flex items-center justify-between p-6 rounded-3xl bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Apple className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Apple App Store</div>
                  <div className="text-sm text-muted-foreground">Join the Waitlist for iOS</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </button>

            <a 
              href={playUrl} 
              className="flex items-center justify-between p-6 rounded-3xl bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              onClick={() => trackClick('list_android')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Google Play Store</div>
                  <div className="text-sm text-muted-foreground">For all Android devices</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {showHint && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm">
                Tried opening the app automatically? If it didn't work, make sure you have the app installed or use one of the links above.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="pt-0 pb-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to automate your trading?</h2>
          <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto">
            Join the elite group of traders using AI to gain a competitive edge in the markets.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 rounded-2xl h-16 px-12 text-xl font-bold"
            onClick={() => navigate('/waitlist')}
          >
            Join the Waitlist <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </section>
    </div>
  );
}
