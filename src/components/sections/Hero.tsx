'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BetaSignupModal } from '@/components/ui';

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

// Placeholder screenshots - replace with actual app images
const screenshots = [
  { id: 1, label: 'Write your story', color: 'purple' },
  { id: 2, label: 'Collaborate', color: 'marine-teal' },
  { id: 3, label: 'AI Biographer', color: 'purple' },
  { id: 4, label: 'Share & Publish', color: 'marine-teal' },
];

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="min-h-screen bg-off-white pt-24 pb-16 flex items-center overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
                className="text-xl md:text-2xl text-dark-green/70 mb-8 max-w-lg"
              >
                Stories told together. Memories cherished forever. Create your life
                story collaboratively with friends and loved ones, guided by an AI
                biographer available whenever you need it.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => setIsModalOpen(true)}
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
                </button>
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

            {/* Hero Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="relative"
            >
              {/* Decorative background elements */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-marine-teal/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-purple/20 rounded-full blur-3xl" />

              {/* Screenshot Collage Grid */}
              <div className="relative grid grid-cols-2 gap-4 max-w-lg mx-auto">
                {screenshots.map((screenshot, index) => (
                  <motion.div
                    key={screenshot.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className={`relative ${index % 2 === 1 ? 'mt-8' : ''}`}
                  >
                    <motion.div
                      animate={{ y: [0, index % 2 === 0 ? -6 : 6, 0] }}
                      transition={{
                        duration: 4 + index,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className={`aspect-[9/16] rounded-2xl shadow-xl overflow-hidden ${
                        screenshot.color === 'purple'
                          ? 'bg-gradient-to-br from-purple/10 to-purple/5 border border-purple/20'
                          : 'bg-gradient-to-br from-marine-teal/10 to-marine-teal/5 border border-marine-teal/20'
                      }`}
                    >
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                          screenshot.color === 'purple' ? 'bg-purple/20' : 'bg-marine-teal/20'
                        }`}>
                          <svg
                            className={`w-6 h-6 ${screenshot.color === 'purple' ? 'text-purple' : 'text-marine-teal'}`}
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
                        <p className="text-dark-green/60 text-xs text-center font-medium">
                          {screenshot.label}
                        </p>
                        <p className="text-dark-green/30 text-[10px] mt-1">
                          App screenshot
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Floating notification badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: 'spring' }}
                  className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-lg p-3 z-10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-marine-teal/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-marine-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-dark-green whitespace-nowrap">Chapter saved!</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: 'spring' }}
                  className="absolute -right-4 top-1/2 bg-white rounded-xl shadow-lg p-3 z-10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-dark-green whitespace-nowrap">Mom contributed</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, type: 'spring' }}
                  className="absolute left-1/2 -translate-x-1/2 -bottom-4 bg-white rounded-xl shadow-lg p-3 z-10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-marine-teal/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-marine-teal" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-dark-green whitespace-nowrap">Biography published!</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BetaSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
