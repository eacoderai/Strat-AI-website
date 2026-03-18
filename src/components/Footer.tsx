import { motion } from 'motion/react';
import { Twitter, Instagram, ShieldCheck, Youtube, Loader2 } from 'lucide-react';
import { SiDiscord, SiReddit, SiTiktok } from '@icons-pack/react-simple-icons';
import { useState } from 'react';
import { enqueue, submitNow } from '../utils/submissionQueue';
import { isValidEmail } from '../utils/validation';
import logo from '../assets/StratAI Logo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'invalid'>('idle');
  const showNewsletter = false;

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!isValidEmail(email)) {
      setStatus('invalid');
      return;
    }

    setStatus('loading');
    const payload = { email, source: 'Newsletter Footer' };
    const ok = await submitNow(payload);
    if (!ok) enqueue(payload);
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <footer className="bg-background border-t border-border text-foreground py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <motion.div
              className="mb-6 flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src={logo} 
                alt="StratAI" 
                className="h-8 sm:h-9 lg:h-10 w-auto object-contain relative z-10" 
                loading="lazy" 
                decoding="async" 
                fetchPriority="low" 
              />
            </motion.div>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              StratAI: The strategy layer for AI. Turn plain-language ideas into executable logic across domains.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: 'https://x.com/_StratAI', label: 'Twitter' },
                { icon: SiTiktok, href: 'https://www.tiktok.com/@_stratai', label: 'TikTok' },
                { icon: Instagram, href: 'https://www.instagram.com/_stratai', label: 'Instagram' },                
                { icon: SiDiscord, href: 'https://discord.com/', label: 'Discord (_stratai_03152)' },
                { icon: SiReddit, href: 'https://www.reddit.com/user/StratAI', label: 'Reddit (u/StratAI)' },
                { icon: Youtube, href: 'https://www.youtube.com/@stratai_trade', label: 'YouTube' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-all"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'Features', href: '/features' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Blog', href: '#' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div className="space-y-8">
            {showNewsletter && (
              <div>
                <h4 className="font-bold mb-6">Newsletter</h4>
                <p className="text-muted-foreground text-xs mb-4">Get trading tips and product updates.</p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'invalid') setStatus('idle');
                    }}
                    disabled={status === 'loading'}
                    className={`bg-card border border-border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-primary transition-colors disabled:opacity-50 ${status === 'invalid' ? 'border-red-500' : ''}`}
                    required
                  />
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-primary text-white rounded-lg px-3 py-2 text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 min-w-[60px] flex items-center justify-center"
                  >
                    {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : status === 'success' ? 'Joined!' : 'Join'}
                  </button>
                </form>
                {status === 'invalid' && (
                  <p className="text-red-500 text-[10px] mt-2">Please enter a valid email address.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-500 text-[10px] mt-2">Something went wrong. Try again.</p>
                )}
              </div>
            )}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' },
                  { label: 'Disclaimer', href: '/disclaimer' },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-xs"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © {currentYear} StratAI. Not financial advice. Test strategies on demo accounts.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Secure SSL Encryption
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
