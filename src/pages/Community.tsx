import Seo from '@/components/docs/Seo';
import DocLayout from '@/components/docs/DocLayout';

export default function Community() {
  return (
    <>
      <Seo title="Community | StratAI" description="Community links and channels for StratAI." />
      <DocLayout title="Community" subtitle="Connect and collaborate">
        <div className="rounded-xl border bg-card px-6 py-6">
          <h4 className="mb-2">Social</h4>
          <ul className="list-disc ml-4 text-sm text-gray-600">
            <li><a href="https://x.com/_StratAI" className="text-purple-600">Twitter/X</a></li>
            <li><a href="https://www.tiktok.com/@_stratai" className="text-purple-600">TikTok</a></li>
            <li><a href="https://www.instagram.com/_stratai" className="text-purple-600">Instagram</a></li>
          </ul>
        </div>
      </DocLayout>
    </>
  );
}
