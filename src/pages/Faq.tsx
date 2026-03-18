import Seo from '@/components/docs/Seo';
import DocLayout from '@/components/docs/DocLayout';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function Faq() {
  return (
    <>
      <Seo title="FAQ | StratAI" description="Frequently asked questions about StratAI website, product and usage." />
      <DocLayout title="Frequently Asked Questions" subtitle="Answers to common questions">
        <div className="rounded-xl border bg-card px-6 py-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="what-is-stratai">
              <AccordionTrigger>What is StratAI?</AccordionTrigger>
              <AccordionContent>
                StratAI is an AI strategy engine that helps you design structured plans and generate executable logic across platforms (MQL4, MQL5, Pine Script).
              </AccordionContent>
            </AccordionItem>
          <AccordionItem value="how-to-start">
            <AccordionTrigger>How do I get started?</AccordionTrigger>
            <AccordionContent>
                Create an account and log in via the StratAI application to unlock full access to all platform features.
            </AccordionContent>
          </AccordionItem>
            <AccordionItem value="billing">
              <AccordionTrigger>How does billing work?</AccordionTrigger>
              <AccordionContent>
                You can subscribe through the Pricing page. Choose between our basic and premium plans to suit your needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger>Where can I get support?</AccordionTrigger>
              <AccordionContent>
                Contact us via support@stratai.com or visit the Resources section for documentation and community links.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DocLayout>
    </>
  );
}
