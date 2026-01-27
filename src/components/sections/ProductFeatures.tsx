'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    id: 'capture',
    title: 'Capture Your Life Story',
    description:
      'Our guided experience helps you document your life events accurately and meaningfully. With an expert AI biographer available on-demand, you\'ll never face a blank page alone.',
    color: 'purple',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    id: 'collaborate',
    title: 'Share Your Story',
    description:
      'Invite friends and family to contribute their memories, photos, and perspectives. Create a comprehensive, multi-viewpoint narrative that captures the full picture of your life.',
    color: 'marine-teal',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 'legacy',
    title: 'Create a Lasting Legacy',
    description:
      'Your experiences and unique worldview deserve to be preserved for generations. Create memoirs, biographies, eulogies, or family heirlooms that will be treasured forever.',
    color: 'purple',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'biographer',
    title: '24/7 Expert Biographer',
    description:
      'Work at your own pace with our AI-powered biographer always ready to help. Save drafts, pick up where you left off, and receive guidance whenever you need it.',
    color: 'marine-teal',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
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
            <span className="text-purple">Tell Your Story</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-dark-green/60 max-w-2xl mx-auto"
          >
            Powerful features designed to help you preserve your memories and
            create a meaningful legacy.
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
