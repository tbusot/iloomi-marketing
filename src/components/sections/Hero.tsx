'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

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
  const deviceRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Track the device collage entering the viewport
  const { scrollYProgress: deviceProgress } = useScroll({
    target: deviceRef,
    offset: ['start end', 'end end'],
  });

  // Hero text fades out and drifts upward as the user scrolls
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  // Device collage grows from 85% to 100% as it scrolls into view
  const deviceScale = useTransform(deviceProgress, [0, 1], [0.85, 1]);

  return (
    <section ref={sectionRef} className="relative bg-white">
      {/* Dark background — photo album image + warm charcoal overlay.
          Extends behind the device collage area with a gradient fade to off-white. */}
      <div className="absolute inset-x-0 top-0 bottom-[15%] overflow-hidden">
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

      {/* Hero text content — fills the viewport, vertically centered */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 min-h-[100svh] flex flex-col items-center justify-center pt-16">
        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center"
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
              className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto"
            >
              Iloomi helps you collaborate with friends and loved ones to tell
              your story in a way that is both authentic and meaningful.
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
      </div>

      {/* Device Collage — Key Visual (iPad + iPhone) */}
      <motion.div
        ref={deviceRef}
        style={{ scale: deviceScale }}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 mx-auto max-w-6xl px-6 pb-16 origin-top"
      >
        <div className="relative w-full flex justify-center">
          <Image
            src="/images/iloomi-kv.webp"
            alt="Iloomi app shown on iPad and iPhone — collaborative biography interface"
            width={1200}
            height={800}
            className="w-full max-w-[1000px] h-auto"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
