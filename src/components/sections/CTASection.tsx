'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function CTASection() {
  return (
    <section id="download" className="py-24 bg-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow-lg mb-4">
            Try Iloomi Today
          </p>
          <h2 className="section-heading-h2 mb-12">
            Start your Story
          </h2>
        </motion.div>

        {/* Phone Mockups */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="w-full md:w-[650px] max-w-[650px]">
            <Image
              src="/images/download-screenshot.png"
              alt="Iloomi app — My Story list and story detail screens"
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xl text-dark-green mb-8">
            Iloomi is available on Web, iOS, and Android.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://apps.apple.com/us/app/iloomi/id6467228839" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Image
                src="/images/app-store-button.svg"
                alt="Download on the App Store"
                width={160}
                height={48}
                className="h-[48px] w-auto"
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.iloomi.app.prod" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Image
                src="/images/google-play-button.svg"
                alt="Get it on Google Play"
                width={160}
                height={48}
                className="h-[48px] w-auto"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
