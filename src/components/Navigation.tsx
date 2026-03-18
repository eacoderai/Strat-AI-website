import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import logo from '../assets/StratAI Logo.png';

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const items = ['Pricing', 'Docs', 'Blog', 'Contact'];

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen]);

  // Handle hash scrolling after navigation
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const handleLinkClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    
    if (slug === 'home') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      setMobileOpen(false);
      return;
    }

    if (slug === 'features') {
      navigate('/features');
      setMobileOpen(false);
      return;
    }

    if (slug === 'pricing') {
      navigate('/pricing');
      setMobileOpen(false);
      return;
    }

    if (slug === 'docs') {
      navigate('/docs');
      setMobileOpen(false);
      return;
    }

    if (slug === 'blog') {
      navigate('/resources');
      setMobileOpen(false);
      return;
    }

    if (slug === 'contact') {
      navigate('/contact');
      setMobileOpen(false);
      return;
    }

    if (location.pathname === '/') {
      const element = document.getElementById(slug);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = slug;
      }
    } else {
      navigate(`/#${slug}`);
    }
    
    setMobileOpen(false);
  };

  const pathname = location.pathname;
  const isHomeActive = pathname === '/';
  const isFeaturesActive = pathname.startsWith('/features');
  const activeBySlug: Record<string, boolean> = {
    pricing: pathname.startsWith('/pricing'),
    docs: pathname.startsWith('/docs'),
    blog: pathname.startsWith('/resources'),
    contact: pathname.startsWith('/contact'),
  };

  const desktopLinkClass = (active: boolean) =>
    `text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm font-medium ${active ? 'text-primary' : ''}`;

  const mobileLinkClass = (active: boolean) =>
    `px-4 py-3 text-foreground hover:bg-white/5 hover:text-primary transition-colors ${active ? 'bg-white/5 text-primary' : ''}`;

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img 
            src={logo} 
            alt="StratAI" 
            className="h-8 sm:h-9 lg:h-10 w-auto object-contain relative z-10" 
            decoding="async" 
            fetchPriority="high" 
          />
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8 rounded-2xl bg-primary/5 ring-1 ring-primary/20 px-4 py-2">
          <motion.a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={desktopLinkClass(isHomeActive)}
            aria-current={isHomeActive ? 'page' : undefined}
          >
            Home
          </motion.a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <a
                href="/features"
                onClick={(e) => e.preventDefault()}
                className={desktopLinkClass(isFeaturesActive)}
                aria-current={isFeaturesActive ? 'page' : undefined}
              >
                Features
              </a>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-border">
              <DropdownMenuItem onClick={() => {
                if (location.pathname === '/features') {
                  const el = document.getElementById('planner');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.hash = 'planner';
                } else {
                  navigate('/features#planner');
                }
              }}>Strategy Planner</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                if (location.pathname === '/features') {
                  const el = document.getElementById('generator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.hash = 'generator';
                } else {
                  navigate('/features#generator');
                }
              }}>Code Engine</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                if (location.pathname === '/features') {
                  const el = document.getElementById('journal-analyzer');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.hash = 'journal-analyzer';
                } else {
                  navigate('/features#journal-analyzer');
                }
              }}>Performance Auditor</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {items.map((item, index) => {
            const slug = item.toLowerCase().trim().replace(/\s+/g, '-');
            const active = activeBySlug[slug] ?? false;
            return (
              <motion.a
                key={item}
                href={`#${slug}`}
                onClick={(e) => handleLinkClick(e, slug)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.1 }}
                className={desktopLinkClass(active)}
                aria-current={active ? 'page' : undefined}
              >
                {item}
              </motion.a>
            );
          })}
        </div>
        
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button 
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
              onClick={() => navigate('/waitlist')}
            >
              Get Started
            </Button>
          </motion.div>
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>
      {/* Mobile dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden px-6 pb-4"
        >
          <div className="mt-2 rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
            <div className="flex flex-col divide-y divide-border">
              <a
                href="#home"
                className={mobileLinkClass(isHomeActive)}
                onClick={(e) => handleLinkClick(e, 'home')}
                aria-current={isHomeActive ? 'page' : undefined}
              >
                Home
              </a>
              <div className="px-4 py-3">
                <div className="text-muted-foreground text-xs mb-2">Features</div>
                <div className="flex flex-col gap-2">
                  <button className="text-foreground text-left hover:text-primary" onClick={() => { navigate('/features#planner'); setMobileOpen(false); }}>
                    Strategy Planner
                  </button>
                  <button className="text-foreground text-left hover:text-primary" onClick={() => { navigate('/features#generator'); setMobileOpen(false); }}>
                    Code Engine
                  </button>
                  <button className="text-foreground text-left hover:text-primary" onClick={() => { navigate('/features#journal-analyzer'); setMobileOpen(false); }}>
                    Performance Auditor
                  </button>
                </div>
              </div>
              {items.map((item) => {
                const slug = item.toLowerCase().trim().replace(/\s+/g, '-');
                const active = activeBySlug[slug] ?? false;
                return (
                  <a
                    key={item}
                    href={`#${slug}`}
                    className={mobileLinkClass(active)}
                    onClick={(e) => handleLinkClick(e, slug)}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
