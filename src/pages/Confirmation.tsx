import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Confirmation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpeningApp, setIsOpeningApp] = useState(false);

  useEffect(() => {
    // Simulate verification delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleDashboardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLoading) return;

    const ua = navigator.userAgent || '';
    const isAndroid = /Android/i.test(ua);
    const isIOS =
      /iPad|iPhone|iPod/i.test(ua) ||
      (navigator.platform === 'MacIntel' && (navigator as unknown as { maxTouchPoints?: number }).maxTouchPoints && (navigator as unknown as { maxTouchPoints: number }).maxTouchPoints > 1);

    if (!isAndroid && !isIOS) return;

    e.preventDefault();
    setIsOpeningApp(true);

    const webFallbackUrl = `${window.location.origin}/download`;
    const deepLinkUrl = `stratai://open?redirect_url=${encodeURIComponent(webFallbackUrl)}`;

    let didHide = false;
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        didHide = true;
        cleanup();
      }
    };

    const cleanup = () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.clearTimeout(timeoutId);
      setIsOpeningApp(false);
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    const timeoutId = window.setTimeout(() => {
      cleanup();
      if (!didHide) {
        window.location.assign(webFallbackUrl);
      }
    }, 1500);

    try {
      window.location.href = deepLinkUrl;
    } catch {
      cleanup();
      window.location.assign(webFallbackUrl);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-t-4 border-t-purple-600">
          <CardHeader className="text-center pb-2">
            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${isLoading ? 'bg-gray-100' : 'bg-green-100'}`}>
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-600" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold">
              {isLoading ? 'Verifying...' : 'Account Confirmed!'}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {isLoading 
                ? 'Please wait while we verify your account details.' 
                : 'Your email has been successfully verified. You can now access all features of the app.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Additional content could go here if needed */}
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-2">
            <div className="w-full space-y-3">
              <Button 
                asChild={!isLoading} 
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 h-11 text-base"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
                  </span>
                ) : (
                  <Link to="/login" onClick={handleDashboardClick} aria-label="Go to Dashboard (opens StratAI app if installed)">
                    {isOpeningApp ? 'Opening StratAI…' : 'Go to Dashboard'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </Button>
              <p className="text-xs text-center text-gray-500">
                You can also open the mobile app to sign in.
              </p>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
