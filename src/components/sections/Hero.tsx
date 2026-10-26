'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { StoryVideo } from '@/components/ui/StoryVideo';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Hero text fades out and drifts upward as the user scrolls
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  return (
    <section ref={sectionRef} className="relative bg-white">
      {/* Dark background — photo album image + warm charcoal overlay.
          Covers the whole hero, behind the copy and the video. */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/photo-album.webp"
          alt=""
          fill
          className="object-cover saturate-[70%]"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(49, 47, 39, 0.7)', filter: 'saturate(200%)' }}
        />
        {/* Smooth gradient fade to off-white at the bottom edge */}
        {/* <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(to bottom, transparent, #F5F3EF)' }}
        /> */}
      </div>

      {/* Copy on the left, the main product video on the right; stacked on mobile. */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-20 lg:min-h-[100svh] lg:pt-24 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-12 lg:gap-20 items-center">
        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left"
          >
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 mb-6"
            >
              The Collaborative Biographer
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 font-serif"
            >
              Stories told together.
              <br />
              Memories cherished forever.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              Iloomi asks the questions no one ever thought to ask, then writes the
              story in your words. Your family reads it, and adds what they remember.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <a
                href="#download"
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-200 text-xl"
                style={{ backgroundColor: 'rgba(22, 36, 37, 0.5)' }}
              >
                Download App
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
          className="mx-auto w-full max-w-[300px] lg:max-w-[340px]"
        >
          <StoryVideo
            name="iloomi-story"
            label="Iloomi in action: a conversation with Iloomi becomes a written story your family can read."
          />
        </motion.div>
      </div>
    </section>
  );
}
