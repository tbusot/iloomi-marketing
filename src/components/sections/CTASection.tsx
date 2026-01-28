'use client';

import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section id="download" className="py-24 bg-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-purple mb-4">
            Try Iloomi Today
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-green mb-12 font-serif">
            Start your Story
          </h2>
        </motion.div>

        {/* Phone Mockups */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center items-end mb-12"
        >
          {/* Phone 1 — Story list */}
          <div className="w-[200px] md:w-[240px] relative z-10">
            <div className="aspect-[9/19] bg-dark-green rounded-3xl shadow-2xl overflow-hidden border-4 border-dark-green/80">
              <div className="absolute inset-0 p-3">
                <div className="flex justify-between items-center text-white/60 text-[8px] mb-3 px-1">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-2 bg-white/40 rounded-sm" />
                    <div className="w-3 h-2 bg-white/40 rounded-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-sm font-medium">My Story</span>
                  <span className="text-white text-lg">+</span>
                </div>
                <div className="flex gap-1 mb-3">
                  {['All', 'Drafts', 'Published', 'Contributors'].map((tab, i) => (
                    <span key={tab} className={`text-[7px] px-2 py-0.5 rounded-full ${i === 1 ? 'bg-marine-teal text-white' : 'text-white/50'}`}>
                      {tab}
                    </span>
                  ))}
                </div>
                {/* Story cards */}
                <div className="space-y-2">
                  <div className="bg-white/10 rounded-lg p-2">
                    <p className="text-[9px] text-white font-medium">Toddlers&apos; Imaginations Take Flight</p>
                    <p className="text-[7px] text-white/50 mt-0.5">A story about early settlers sparks her toddlers&apos;...</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[6px] bg-marine-teal/30 text-marine-teal px-1.5 py-0.5 rounded-full">Draft</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2">
                    <p className="text-[9px] text-white font-medium">Father and Son Hike in the Foothills</p>
                    <p className="text-[7px] text-white/50 mt-0.5">Jake and Ryan embark on a hike to the foothills...</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[6px] bg-marine-teal/30 text-marine-teal px-1.5 py-0.5 rounded-full">Draft</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phone 2 — Story detail */}
          <div className="w-[200px] md:w-[240px] -ml-8 relative">
            <div className="aspect-[9/19] bg-dark-green rounded-3xl shadow-2xl overflow-hidden border-4 border-dark-green/80">
              <div className="absolute inset-0 p-3">
                <div className="flex justify-between items-center text-white/60 text-[8px] mb-3 px-1">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-2 bg-white/40 rounded-sm" />
                    <div className="w-3 h-2 bg-white/40 rounded-sm" />
                  </div>
                </div>
                <div className="text-[8px] text-white/40 mb-2">← My Stories</div>
                <div className="h-[40%] rounded-xl bg-gradient-to-b from-dark-green/60 to-dark-green/40 flex flex-col items-center justify-center p-3 mb-3">
                  <p className="font-serif text-white text-sm italic text-center leading-tight">
                    Toddlers&apos;
                    <br />
                    imaginations
                    <br />
                    take flight
                  </p>
                </div>
                <p className="text-[7px] text-white/50 leading-relaxed">
                  A story about early settlers sparks her toddlers&apos; imaginations, leading them on
                  fantastical adventures in the wilderness.
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-marine-teal/30 border border-dark-green" />
                    <div className="w-4 h-4 rounded-full bg-purple/30 border border-dark-green" />
                  </div>
                  <span className="text-[7px] text-white/40">by Helen, Carl, Kara...</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-dark-green/60 mb-8">
            Iloomi is available on iOS. Android coming soon.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-purple text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-purple/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-purple/25"
          >
            Download App
          </a>
        </motion.div>
      </div>
    </section>
  );
}
