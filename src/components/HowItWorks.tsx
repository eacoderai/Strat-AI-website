import { motion } from 'motion/react';
import { MessageSquareText, Zap, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <MessageSquareText className="w-8 h-8" />,
    title: 'Describe',
    description: 'Type your strategy in plain English. No complicated syntax or code required.',
    color: 'var(--primary)',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Generate',
    description: 'AI creates your professional trading plan or production-ready code in seconds.',
    color: 'var(--accent)',
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: 'Execute',
    description: 'Trade manually with discipline using your plan or deploy your automated bot instantly.',
    color: '#f59e0b',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Turn your trading ideas into reality in three simple steps.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector lines (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-border"
                style={{ 
                  backgroundColor: 'var(--background)',
                  color: step.color 
                }}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {index + 1}. {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-3xl aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/3iAd3jja5SY?autoplay=1&mute=1" 
              title="StratAI Demo Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[120px]" />
      </div>
    </section>
  );
}
