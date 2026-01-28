'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const steps = [
  {
    label: 'Get Started',
    description: 'Create an account and draft the first chapter of your story.',
    mockup: 'story-list',
  },
  {
    label: 'Find Inspiration',
    description: 'Read stories from other ILOOMI users to get inspired.',
    mockup: 'discover',
  },
  {
    label: 'Capture Your Memories',
    description: 'Organize your thoughts and memories into a cohesive narrative.',
    mockup: 'chat',
  },
  {
    label: 'Collaborate',
    description: 'Invite your friends and family to contribute to your biography.',
    mockup: 'collab',
  },
  {
    label: 'Draft Your Story',
    description: 'Use Iloomi to organize and edit your draft into a cohesive story.',
    mockup: 'draft',
  },
  {
    label: 'Get Feedback',
    description: "We'll provide feedback and help you polish it to perfection.",
    mockup: 'feedback',
  },
  {
    label: 'Publish Your Biography',
    description: 'Share your story with the world, or keep it private for your loved ones.',
    mockup: 'publish',
  },
];

function StepMockup({ type }: { type: string }) {
  const mockupStyles = "w-full h-full flex flex-col items-center justify-center p-4";

  switch (type) {
    case 'story-list':
      return (
        <div className={mockupStyles}>
          <div className="w-full space-y-3">
            <div className="text-sm font-bold text-dark-green">Toddlers&apos; Imaginations Take Flig...</div>
            <p className="text-xs text-dark-green/50 leading-relaxed">
              A story about early settlers sparks her toddlers&apos; imaginations, leading them on
              fantastical adventures in the wilderness.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-marine-teal/20 text-marine-teal px-2 py-0.5 rounded-full font-medium">Draft</span>
              <div className="w-4 h-4 rounded-full bg-dark-green/20" />
              <span className="text-[10px] text-dark-green/40">by John</span>
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-dark-green/10 pt-4">
              <div className="w-8 h-8 rounded-lg border-2 border-dashed border-dark-green/20 flex items-center justify-center">
                <span className="text-dark-green/30 text-lg">+</span>
              </div>
              <div>
                <p className="text-sm font-medium text-dark-green">Add a Story</p>
                <p className="text-[10px] text-dark-green/40">Create a new chapter in Family Year...</p>
              </div>
            </div>
          </div>
        </div>
      );
    case 'discover':
      return (
        <div className={mockupStyles}>
          <div className="grid grid-cols-3 gap-1.5 w-full">
            {['Bald Eagle Companion', 'in Northern California', 'Mother and Daughter', 'Homeward Bound', 'The Magical Flatirons', 'Sharing a Spirit'].map((title, i) => (
              <div key={i} className="aspect-square rounded-lg bg-gradient-to-b from-dark-green/40 to-dark-green/70 flex items-end p-1.5">
                <p className="text-[7px] text-white/80 leading-tight font-serif italic">{title}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'chat':
      return (
        <div className={mockupStyles}>
          <div className="w-full space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-marine-teal to-purple" />
            </div>
            <div className="bg-white rounded-lg p-2 shadow-sm">
              <p className="text-[10px] text-dark-green/70">Hi John,</p>
            </div>
            <div className="bg-marine-teal/10 rounded-lg p-2">
              <p className="text-[10px] text-dark-green/70">
                I&apos;m your biographer and I&apos;ll be asking you questions that help you recall moments and
                various details.
              </p>
            </div>
            <div className="bg-white rounded-lg p-2 shadow-sm">
              <p className="text-[10px] text-dark-green/70">Would you like to begin?</p>
            </div>
            <div className="flex justify-end">
              <span className="text-[10px] bg-marine-teal text-white px-3 py-1 rounded-full">Yes, let&apos;s begin</span>
            </div>
          </div>
        </div>
      );
    case 'collab':
      return (
        <div className={mockupStyles}>
          <div className="w-full relative">
            <div className="text-4xl font-serif text-dark-green/10 leading-none mb-2">Ilu<br />Ca</div>
            <div className="absolute top-2 right-4 bg-purple/10 rounded-full px-2 py-0.5 flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-purple/40" />
              <span className="text-[8px] text-purple">Zoe D</span>
            </div>
            <div className="absolute top-12 left-8 bg-marine-teal/10 rounded-full px-2 py-0.5 flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-marine-teal/40" />
              <span className="text-[8px] text-marine-teal">Kate A</span>
            </div>
            <div className="mt-4 bg-blue-100/50 rounded-lg p-2">
              <p className="text-[10px] text-dark-green/70">Kathy and I were always looking for...</p>
            </div>
            <div className="absolute bottom-0 right-2 bg-blue-500/10 rounded-full px-2 py-0.5 flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-400/40" />
              <span className="text-[8px] text-blue-600">Mark L</span>
            </div>
          </div>
        </div>
      );
    case 'draft':
      return (
        <div className={mockupStyles}>
          <div className="w-full">
            <p className="font-serif text-lg text-dark-green/80 italic leading-tight mb-3">
              The Bald Eagle Companion
            </p>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-dark-green/20" />
              <span className="text-[10px] text-dark-green/50">by John</span>
              <span className="text-[10px] text-dark-green/30">Jun 27 • 9 min read</span>
            </div>
            <p className="text-[10px] text-dark-green/50 leading-relaxed">
              My son was only a few months old when I decided to take him on his first hike. I&apos;d
              always been an avid hiker, and I wanted to share my love of the outdoors with him at a...
            </p>
          </div>
        </div>
      );
    case 'feedback':
      return (
        <div className={mockupStyles}>
          <div className="aspect-[4/3] rounded-lg bg-gradient-to-b from-dark-green/30 to-dark-green/60 w-full flex items-end p-3">
            <p className="text-[9px] text-white/70 font-serif italic">Family walking together</p>
          </div>
        </div>
      );
    case 'publish':
      return (
        <div className={mockupStyles}>
          <div className="w-full bg-white rounded-lg shadow-sm p-3 space-y-2">
            <div className="flex gap-2">
              {['Story', 'People', 'Discover'].map((tab) => (
                <div key={tab} className="flex flex-col items-center gap-0.5">
                  <div className="w-5 h-5 rounded-full bg-marine-teal/20" />
                  <span className="text-[7px] text-dark-green/40">{tab}</span>
                </div>
              ))}
            </div>
            <div className="text-[10px] font-medium text-dark-green">Start a Story</div>
            <div className="text-[8px] text-dark-green/40">The Bald Eagle Companion</div>
          </div>
        </div>
      );
    default:
      return <div className={mockupStyles}><div className="w-8 h-8 bg-dark-green/10 rounded-full" /></div>;
  }
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-[0.2em] uppercase text-marine-teal mb-4"
          >
            How it Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-dark-green mb-6 font-serif"
          >
            Tell your story,
            <br />
            step by step
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-dark-green/60 max-w-xl mx-auto"
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
            className="how-it-works-swiper pb-14"
          >
            {steps.map((step, i) => (
              <SwiperSlide key={i}>
                <div className="bg-off-white/70 rounded-2xl overflow-hidden h-full flex flex-col">
                  {/* Mockup area */}
                  <div className="h-64 p-4 overflow-hidden">
                    <StepMockup type={step.mockup} />
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

      <style jsx global>{`
        .how-it-works-swiper .swiper-pagination-bullet {
          background: #0D4D40;
          opacity: 0.3;
        }
        .how-it-works-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #0D4D40;
        }
      `}</style>
    </section>
  );
}
