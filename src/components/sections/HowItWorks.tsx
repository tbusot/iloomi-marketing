'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const steps = [
  {
    label: 'Get Started',
    description: 'Create an account and draft the first chapter of your story.',
    image: '/images/hiw-add-story.webp',
    imageAlt: 'Iloomi app — add a story screen',
  },
  {
    label: 'Find Inspiration',
    description: 'Read stories from other ILOOMI users to get inspired.',
    image: '/images/hiw-stories.webp',
    imageAlt: 'Iloomi app — discover stories grid',
  },
  {
    label: 'Capture Your Memories',
    description: 'Organize your thoughts and memories into a cohesive narrative.',
    image: '/images/hiw-chat.webp',
    imageAlt: 'Iloomi app — AI biographer chat',
  },
  {
    label: 'Collaborate',
    description: 'Invite your friends and family to contribute to your biography.',
    image: '/images/hiw-collaborate.webp',
    imageAlt: 'Iloomi app — collaborative editing with cursors',
  },
  {
    label: 'Draft Your Story',
    description: 'Use Iloomi to organize and edit your draft into a cohesive story.',
    image: '/images/hiw-preview.webp',
    imageAlt: 'Iloomi app — story preview with The Bald Eagle Companion',
  },
  {
    label: 'Get Feedback',
    description: "We'll provide feedback and help you polish it to perfection.",
    image: '/images/hiw-preview.webp',
    imageAlt: 'Iloomi app — story feedback view',
  },
  {
    label: 'Publish Your Biography',
    description: 'Share your story with the world, or keep it private for your loved ones.',
    image: '/images/hiw-preview.webp',
    imageAlt: 'Iloomi app — publish your story',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mx-auto max-w-2xl  mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow-lg mb-4"
          >
            How it Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading-h2 mb-4"
          >
            Tell your story,<br />step by step
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-charcoal max-w-lg mx-auto mb-8"
          >
            We&apos;ll help you capture your life&apos;s milestones and stories, one step at a time.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={false}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
              1280: { slidesPerView: 4 },
            }}
            className="how-it-works-swiper"
          >
            {steps.map((step, i) => (
              <SwiperSlide key={i}>
                <div className="bg-off-white/70 rounded-2xl overflow-hidden h-full flex flex-col">
                  {/* Image area */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
                    />
                  </div>
                  {/* Label + description */}
                  <div className="p-6 pt-2">
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-marine-teal mb-2">
                      {step.label}
                    </p>
                    <p className="text-sm text-dark-green/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

    </section>
  );
}
