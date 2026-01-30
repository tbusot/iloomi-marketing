'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

/* ──────────────────────────────────────────────
   Feature 1 – "Capture Your Life Story"
   Centered heading + full-width auto-scrolling chapter cards
   ────────────────────────────────────────────── */

const chapterCards = [
  { chapter: 3, title: "A Mother and Daughter's Unforgettable Journey", image: '/images/story-04.webp' },
  { chapter: 7, title: 'Homeward Bound: The Siblings Reunite', image: '/images/story-05.webp' },
  { chapter: 7, title: 'The Magical Flatirons', image: '/images/story-06.webp' },
  { chapter: 12, title: "Toddlers' Imaginations Take Flight", image: '/images/story-01.webp' },
  { chapter: 5, title: 'The Bald Eagle Companion', image: '/images/story-02.webp' },
  { chapter: 2, title: 'Reconnecting in Northern California', image: '/images/story-03.webp' },
  { chapter: 2, title: 'Sharing a Spirit of Creativity', image: '/images/story-07.webp' },
  { chapter: 6, title: 'Tying the Knot with a Twist', image: '/images/story-08.webp' },
];

/* ──────────────────────────────────────────────
   Features 2–5 – alternating two-column blocks
   ────────────────────────────────────────────── */

const twoColFeatures = [
  {
    label: 'Share Your Story',
    heading: 'Collaborate with friends and family to tell your story',
    body: 'Your friends and family can contribute memories, photos, and stories to help create a complete and accurate picture of your life.',
    imagePosition: 'right' as const,
    image: '/images/chat.webp',
    imageAlt: 'Iloomi AI biographer chat interface',
  },
  {
    label: 'Create a Lasting Legacy',
    heading: 'Write your biography, leave your mark for future generations',
    body: 'Your biography is a chance to share your experiences, and your unique perspective on the world.',
    imagePosition: 'left' as const,
    image: '/images/cover.webp',
    imageAlt: 'Book cover preview — The Magical Flatirons',
  },
  {
    label: '24/7 Expert Biographer',
    heading: 'Work on your own schedule — or whenever inspiration strikes',
    body: 'You can work on your biography at your own pace, at your own time. You only need to check whenever is most convenient for you.',
    imagePosition: 'right' as const,
    image: '/images/coffee-shop.webp',
    imageAlt: 'Woman working on her biography from a coffee shop',
  },
  {
    label: 'Create a Legacy',
    heading: 'Keep your story safe and secure for generations',
    body: 'We use state-of-the-art security measures to protect your data. You can choose to keep your story alive for generations.',
    imagePosition: 'left' as const,
    image: '/images/vp-safe.webp',
    imageAlt: 'Family sitting together on a bench — Iloomi keeps your story safe',
  },
];

function FeatureBlock({ feature }: { feature: (typeof twoColFeatures)[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <motion.div ref={ref} style={{ scale }} className="py-24 bg-white origin-top">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image side */}
          <div className={feature.imagePosition === 'right' ? 'lg:order-2' : ''}>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={feature.image}
                alt={feature.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Text side */}
          <div className={feature.imagePosition === 'right' ? 'lg:order-1' : ''}>
            <p className="section-eyebrow-md mb-4">
              {feature.label}
            </p>
            <h2 className="section-heading-md mb-6">
              {feature.heading}
            </h2>
            <p className="text-lg text-charcoal leading-relaxed">
              {feature.body}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ProductFeatures() {
  return (
    <section id="features">
      {/* ── Feature 1: Capture Your Life Story ── */}
      <div className="py-24 bg-white overflow-hidden">
        {/* Heading text — centered within max-width container */}
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-eyebrow-lg mb-4">
              Capture Your Life Story
            </p>
            <h2 className="section-heading-h2 mb-6">
              Your expert biographer.
              <br />
              On-demand.
            </h2>
            <p className="text-lg text-charcoal max-w-2xl mx-auto">
              Iloomi helps you write your life story, one step at a time. With our guided
              experience, you can capture your life story in a way that is both accurate
              and meaningful.
            </p>
          </motion.div>
        </div>

        {/* Full-width auto-scrolling chapter card carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex marquee-scroll">
            {[...chapterCards, ...chapterCards].map((card, i) => (
              <div key={i} className="shrink-0 w-[320px] px-2.5">
                <div className="aspect-[2/3] rounded-2xl overflow-hidden relative">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Features 2–5: Alternating two-column blocks ── */}
      {twoColFeatures.map((feature, i) => (
        <FeatureBlock key={i} feature={feature} />
      ))}
    </section>
  );
}
