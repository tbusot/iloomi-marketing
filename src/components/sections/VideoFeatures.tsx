'use client';

import { motion } from 'framer-motion';
import { StoryVideo } from '@/components/ui/StoryVideo';

/* ──────────────────────────────────────────────
   Feature videos – one vertical product video per feature, beside its copy.
   Sides alternate on desktop; on mobile the copy comes first.
   ────────────────────────────────────────────── */

const videoFeatures = [
  {
    video: 'iloomi-listen',
    videoLabel: 'The Iloomi audio player: every story narrated, playing one after another like a podcast.',
    label: 'Press Play on Your Life',
    heading: 'Every story, narrated. Your whole collection, like a podcast.',
    body: 'Each story you finish is read aloud by a warm narrator voice. Swipe up and your collection plays chapter by chapter, perfect for the drive to Grandma’s.',
    videoPosition: 'left' as 'left' | 'right',
  },
];

export function VideoFeatures() {
  return (
    <section id="see-it" className="bg-off-white">
      {videoFeatures.map((feature) => (
        <div key={feature.video} className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <div className={feature.videoPosition === 'right' ? 'lg:order-2' : ''}>
              <StoryVideo
                name={feature.video}
                label={feature.videoLabel}
                className="mx-auto w-full max-w-[300px] lg:max-w-[340px]"
              />
            </div>
            <div className={`order-first ${feature.videoPosition === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
              <p className="section-eyebrow-md mb-4">{feature.label}</p>
              <h2 className="section-heading-md mb-6">{feature.heading}</h2>
              <p className="text-lg text-charcoal leading-relaxed">{feature.body}</p>
            </div>
          </motion.div>
        </div>
      ))}
    </section>
  );
}
