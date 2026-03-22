import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from './docs/Seo';
import { Button } from './ui/button';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=REPLACE_ME';
const APP_STORE_URL = 'https://apps.apple.com/app/idREPLACE_ME';

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
  const isDownloadRoute = location.pathname === '/download';

  const queryRef = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return normalizeRef(params.get('ref'));
  }, [location.search]);

  const [effectiveRef, setEffectiveRef] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);

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
    if (!isDownloadRoute) return;

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
  }, [isDownloadRoute, queryRef]);

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

  if (!isDownloadRoute) return null;

  const playUrl = queryRef ? withRef(PLAY_STORE_URL, queryRef) : PLAY_STORE_URL;
  const appUrl = queryRef ? withRef(APP_STORE_URL, queryRef) : APP_STORE_URL;
  const canShowReferralUI = Boolean(effectiveRef);

  return (
    <div className="min-h-[calc(100vh-81px)] px-6 py-12">
      <Seo title="Download StratAI" description="Download StratAI and start building AI trading strategies." />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Download StratAI</h1>
        <p className="text-muted-foreground mb-8">
          Download StratAI and start building AI trading strategies.
        </p>

        {canShowReferralUI && (
          <div className="rounded-2xl border border-border bg-card p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-foreground font-semibold">Referral code: {effectiveRef}</div>
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={async () => {
                  if (!effectiveRef) return;
                  try {
                    await navigator.clipboard.writeText(effectiveRef);
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1500);
                  } catch {}
                }}
              >
                {copied ? 'Copied' : 'Copy code'}
              </Button>
            </div>
            <div className="text-sm text-muted-foreground mt-4">
              If the app doesn’t auto-apply it, paste this code in the Profile → ‘Have a code? Paste it’ field.
            </div>
          </div>
        )}

        {queryRef && (
          <div className="mb-6">
            <Button
              variant="outline"
              className="w-full rounded-xl h-12"
              onClick={() => {
                window.location.href = `stratai://download?ref=${encodeURIComponent(queryRef)}`;
              }}
            >
              Open in App
            </Button>
            {showHint && (
              <div className="mt-3 text-sm text-muted-foreground">
                App not installed? Use the buttons below.
              </div>
            )}
          </div>
        )}

        <div className="grid gap-3">
          <a href={playUrl} className="w-full" rel="noopener noreferrer">
            <Button className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 text-white">
              Get it on Google Play
            </Button>
          </a>
          <a href={appUrl} className="w-full" rel="noopener noreferrer">
            <Button variant="outline" className="w-full rounded-xl h-12">
              Download on the App Store
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
