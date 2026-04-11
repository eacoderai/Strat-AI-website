import { useEffect } from 'react';

export default function Seo({ title, description, keywords, schema }: { title: string; description: string; keywords?: string; schema?: Record<string, any> }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta) {
      meta.setAttribute('content', description);
    } else {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      m.setAttribute('content', description);
      document.head.appendChild(m);
    }
    if (keywords) {
      const k = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
      if (k) {
        k.setAttribute('content', keywords);
      } else {
        const mk = document.createElement('meta');
        mk.setAttribute('name', 'keywords');
        mk.setAttribute('content', keywords);
        document.head.appendChild(mk);
      }
    }

    if (schema) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }
  }, [title, description, keywords, schema]);
  return null;
}
