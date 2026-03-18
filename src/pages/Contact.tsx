import Seo from '@/components/docs/Seo';
import DocLayout from '@/components/docs/DocLayout';

export default function Contact() {
  return (
    <>
      <Seo title="Contact Us | StratAI" description="Contact StratAI support and business inquiries." />
      <DocLayout title="Contact Us" subtitle="We are here to help">
        <div className="rounded-xl border bg-card px-6 py-6">
          <h4 className="mb-2">Support</h4>
          <p className="text-sm text-gray-600">Email: <a href="mailto:support@stratai.com" className="text-purple-600">support@stratai.com</a></p>
        </div>
      </DocLayout>
    </>
  );
}
