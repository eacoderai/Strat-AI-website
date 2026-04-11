import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useState } from 'react';
import { CheckCircle2, Sparkles, Smartphone, ArrowRight } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { enqueue, submitNow } from '../utils/submissionQueue';
import { isValidEmail } from '../utils/validation';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter an email address');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address (e.g., name@example.com)');
      return;
    }

    setIsSubmitting(true);
    const payload = { email, source: 'Waitlist Page' };
    const ok = await submitNow(payload);
    if (!ok) enqueue(payload);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-3 pb-3 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                <Sparkles className="w-3 h-3" />
                Coming Soon to iOS & Android
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                Get Early Access to the <span className="text-primary">Future of Trading.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Join 5,000+ users on the waitlist for StratAI. Be the first to know when we launch and get an exclusive 30% discount on your first Builder month.
              </p>

              {!submitted ? (
                <div className="space-y-2">
                  <form onSubmit={handleSubmit} className="flex flex-col sm:row gap-3">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      required
                      disabled={isSubmitting}
                      className={`h-12 bg-card border-border text-foreground rounded-xl flex-grow ${error ? 'border-red-500' : ''}`}
                    />
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="h-12 px-8 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold"
                    >
                      {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                  {error && (
                    <p className="text-red-500 text-sm pl-1">{error}</p>
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">You're on the list!</h3>
                    <p className="text-sm text-muted-foreground text-balance">
                      We've added {email} to our early access list. Keep an eye on your inbox for updates.
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="mt-10 space-y-4">
                {[
                  'Priority access to Code Engine',
                  'Exclusive early-bird pricing',
                  'Beta testing opportunities',
                  'Direct support from our strategy team',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative lg:block mt-12 lg:mt-0"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="relative max-w-[320px] mx-auto lg:max-w-none">
                <img 
                  src="/Apple iPhone 16 Pro Max (1320x2868)/Apple iPhone 16 Pro Max Screenshot 3.png" 
                  alt="StratAI App Screenshot" 
                  className="w-full relative z-10 rounded-[3rem] shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-4 py-3 sm:px-6 sm:py-4 rounded-2xl font-bold shadow-xl flex items-center gap-2 z-20 text-sm sm:text-base">
                  <Smartphone className="w-4 h-4 sm:w-5 h-5" />
                  App Launching Soon
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
