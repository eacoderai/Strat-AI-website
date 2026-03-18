import Seo from '@/components/docs/Seo';
import DocLayout from '@/components/docs/DocLayout';

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy | StratAI" description="Privacy practices and data handling for StratAI." />
      <DocLayout title="Privacy Policy" subtitle="How we handle your data">
        <div className="rounded-xl border bg-card px-6 py-6">
          <h4 className="mb-2">Introduction</h4>
          <p className="text-sm text-gray-600">We value privacy and only collect data necessary to operate the service. Contact support@stratai.com for requests.</p>
        </div>
      </DocLayout>
    </>
  );
}
