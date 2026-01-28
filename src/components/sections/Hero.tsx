'use client';

import { motion } from 'framer-motion';

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
  return (
    <section className="bg-off-white pt-28 pb-16 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        {/* Centered Text */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center"
        >
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-[0.2em] uppercase text-dark-green/70 mb-6"
          >
            The Collaborative Biographer
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark-green leading-tight mb-8 font-serif"
          >
            Stories told together.
            <br />
            Memories cherished forever.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl text-dark-green/70 mb-10 max-w-2xl mx-auto"
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
              className="inline-flex items-center gap-2 bg-dark-green text-white px-8 py-4 rounded-full font-medium hover:bg-dark-green/90 hover:scale-105 transition-all duration-200 text-lg"
            >
              Download App
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Device Collage */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-5xl px-6 mt-16"
      >
        <div className="relative flex items-end justify-center gap-4">
          {/* iPad / Tablet mockup */}
          <div className="relative w-[55%] max-w-[500px]">
            <div className="aspect-[4/3] bg-white rounded-2xl shadow-2xl border border-dark-green/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-off-white to-white p-6">
                {/* App UI mockup */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-xl font-bold text-dark-green font-serif">iloomi</div>
                </div>
                <div className="flex gap-4 mb-4">
                  {['Story', 'Topic', 'Media', 'Invite', 'Edit'].map((tab) => (
                    <div key={tab} className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-marine-teal/20 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-marine-teal/40" />
                      </div>
                      <span className="text-[10px] text-dark-green/60">{tab}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-marine-teal/10 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-dark-green/20" />
                    <span className="text-sm font-medium text-dark-green">Start a Story</span>
                  </div>
                  <p className="text-xs text-dark-green/50">
                    Have a special story to share? You can even work with friends and family to draft it.
                  </p>
                </div>
                <div className="text-[10px] tracking-widest text-dark-green/40 uppercase mb-2">Early Childhood</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-serif font-bold text-dark-green">The Bald Eagle Companion</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative w-[28%] max-w-[220px] -ml-12 z-10">
            <div className="aspect-[9/18] bg-dark-green rounded-3xl shadow-2xl overflow-hidden border-4 border-dark-green">
              <div className="absolute inset-0 p-3">
                {/* Phone status bar */}
                <div className="flex justify-between items-center text-white/60 text-[8px] mb-4 px-1">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-2 bg-white/40 rounded-sm" />
                    <div className="w-3 h-2 bg-white/40 rounded-sm" />
                  </div>
                </div>
                {/* Book cover content */}
                <div className="relative h-[60%] rounded-xl overflow-hidden bg-gradient-to-b from-dark-green/60 to-dark-green/90 flex flex-col items-center justify-center p-3">
                  <div className="absolute inset-0 bg-[url('/globe.svg')] opacity-5 bg-cover" />
                  <p className="text-[8px] text-white/50 tracking-widest uppercase mb-1">Chapter 7</p>
                  <p className="text-center font-serif text-white text-sm leading-tight italic">
                    The Bald Eagle
                    <br />
                    Companion
                  </p>
                </div>
                {/* Author info */}
                <div className="mt-3 px-1">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-4 h-4 rounded-full bg-marine-teal/30" />
                    <span className="text-[8px] text-white/60">by John</span>
                  </div>
                  <p className="text-[7px] text-white/40 leading-relaxed">
                    My son was only a few months old when I decided to take him on his first hike...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
