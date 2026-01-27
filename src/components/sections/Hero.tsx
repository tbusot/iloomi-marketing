'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export function Hero() {
  return (
    <section className="min-h-screen bg-off-white pt-24 pb-16 flex items-center overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark-green leading-tight mb-6"
            >
              The Collaborative{' '}
              <span className="text-purple">Biographer</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-2xl text-dark-green/80 mb-4 font-serif italic"
            >
              Stories told together. Memories cherished forever.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-xl text-dark-green/70 mb-8 max-w-lg"
            >
              Capture and preserve your life story with the help of AI and your
              loved ones. Create a lasting legacy for generations to come.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#download"
                className="inline-flex items-center gap-2 bg-purple text-white px-8 py-4 rounded-full font-medium hover:bg-purple/90 hover:scale-105 transition-all duration-200 text-lg shadow-lg shadow-purple/25"
              >
                Download App
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 border-2 border-dark-green text-dark-green px-8 py-4 rounded-full font-medium hover:bg-dark-green hover:text-white hover:scale-105 transition-all duration-200 text-lg"
              >
                See How It Works
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8"
            >
              <div className="flex items-center gap-3 text-dark-green/60">
                <svg className="w-5 h-5 text-marine-teal" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">End-to-end encrypted</span>
              </div>
              <div className="flex items-center gap-3 text-dark-green/60">
                <svg className="w-5 h-5 text-marine-teal" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Free during beta</span>
              </div>
              <div className="flex items-center gap-3 text-dark-green/60">
                <svg className="w-5 h-5 text-marine-teal" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="text-sm">Collaborate with family</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Animated decorative elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-marine-teal/30 rounded-full blur-2xl"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple/30 rounded-full blur-2xl"
              />

              {/* Phone mockup */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-marine-teal/20 rounded-[3rem] shadow-2xl">
                  <div className="absolute inset-4 bg-white rounded-[2.5rem] shadow-inner flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-purple/10 rounded-full flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-purple"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <p className="text-dark-green/40 text-sm">
                        App screenshot placeholder
                      </p>
                      <p className="text-dark-green/30 text-xs mt-2">
                        Replace with actual app UI
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                  className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-lg p-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-marine-teal/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-marine-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-dark-green">Chapter saved!</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: 'spring' }}
                  className="absolute -right-4 bottom-1/3 bg-white rounded-xl shadow-lg p-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-dark-green">Mom contributed</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
