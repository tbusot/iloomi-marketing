'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    id: 'track',
    title: 'Intelligent Cycle Tracking',
    description:
      'Log your symptoms, mood, and flow with our intuitive interface. Our AI learns your unique patterns to provide increasingly accurate predictions.',
    color: 'purple',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'predict',
    title: 'Fertility Predictions',
    description:
      'Get precise predictions for your fertile window and ovulation day. Plan with confidence using our science-backed algorithms.',
    color: 'marine-teal',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'insights',
    title: 'Personalized Insights',
    description:
      'Receive tailored health insights based on your cycle data. Understand how your hormones affect your energy, mood, and wellbeing.',
    color: 'purple',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'privacy',
    title: 'Complete Privacy',
    description:
      'Your data stays on your device. We use end-to-end encryption and never sell your personal health information to third parties.',
    color: 'marine-teal',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
        isReversed ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className={isReversed ? 'md:order-2' : ''}>
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
            feature.color === 'purple'
              ? 'bg-purple/10 text-purple'
              : 'bg-marine-teal/10 text-marine-teal'
          }`}
        >
          {feature.icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-dark-green mb-4">
          {feature.title}
        </h3>
        <p className="text-lg text-dark-green/70 leading-relaxed">
          {feature.description}
        </p>
      </div>
      <div className={isReversed ? 'md:order-1' : ''}>
        {/* Feature image placeholder */}
        <div
          className={`aspect-square rounded-3xl flex items-center justify-center ${
            feature.color === 'purple'
              ? 'bg-gradient-to-br from-purple/10 to-purple/5'
              : 'bg-gradient-to-br from-marine-teal/10 to-marine-teal/5'
          }`}
        >
          <div className="text-center p-8">
            <div
              className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                feature.color === 'purple'
                  ? 'bg-purple/20 text-purple'
                  : 'bg-marine-teal/20 text-marine-teal'
              }`}
            >
              {feature.icon}
            </div>
            <p className="text-dark-green/40 text-sm">Feature image placeholder</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductFeatures() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-dark-green mb-6"
          >
            Everything You Need to{' '}
            <span className="text-purple">Understand Your Cycle</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-dark-green/60 max-w-2xl mx-auto"
          >
            Powerful features designed to give you complete insight into your
            reproductive health.
          </motion.p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
