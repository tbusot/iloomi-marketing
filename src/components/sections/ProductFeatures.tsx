'use client';

import { motion } from 'framer-motion';

/* ──────────────────────────────────────────────
   Feature 1 – "Capture Your Life Story"
   Centered heading + horizontal chapter cards
   ────────────────────────────────────────────── */

const chapterCards = [
  { chapter: 2, title: 'Sharing a Spirit of Creativity', authors: 'by Laura and Sue', time: '10 min read' },
  { chapter: 6, title: 'Tying the Knot with a Twist', authors: 'by Pam and Justin', time: '8 min read' },
  { chapter: 3, title: "A Mother and Daughter's Unforgettable Journey", authors: 'by Kara', time: '16 min read' },
  { chapter: 7, title: 'Homeward Bound: The Siblings Reunite', authors: 'by Stewart', time: '7 min read' },
  { chapter: 7, title: 'The Magical Flatirons', authors: 'by Kara, Jake, and Anna', time: '10 min read' },
  { chapter: 12, title: "Toddlers' Imaginations Take Flight", authors: 'by Lauren and Paul', time: '9 min read' },
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
    imageContent: 'chat',
  },
  {
    label: 'Create a Lasting Legacy',
    heading: 'Write your biography, leave your mark for future generations',
    body: 'Your biography is a chance to share your experiences, and your unique perspective on the world.',
    imagePosition: 'left' as const,
    imageContent: 'book',
  },
  {
    label: '24/7 Expert Biographer',
    heading: 'Work on your own schedule — or whenever inspiration strikes',
    body: 'You can work on your biography at your own pace, at your own time. You only need to check whenever is most convenient for you.',
    imagePosition: 'right' as const,
    imageContent: 'lifestyle',
  },
  {
    label: 'Create a Legacy',
    heading: 'Keep your story safe and secure for generations',
    body: 'We use state-of-the-art security measures to protect your data. You can choose to keep your story alive for generations.',
    imagePosition: 'left' as const,
    imageContent: 'family',
  },
];

function ChatMockup() {
  return (
    <div className="bg-off-white rounded-2xl p-6 shadow-sm h-full flex flex-col justify-center max-w-lg mx-auto">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-marine-teal to-purple flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          <p className="text-sm text-dark-green">What other things do you remember from the trip?</p>
        </div>
      </div>
      <div className="flex justify-end mb-3">
        <div className="bg-marine-teal/10 rounded-2xl rounded-tr-sm px-4 py-3 max-w-sm">
          <p className="text-sm text-dark-green">
            One thing I&apos;ll never forget is the time we were surrounded by wolves. We were hiking in the
            backcountry when we heard a pack of wolves howling. We stopped and listened, and then
            we saw them emerge from the trees. There were at least a dozen of them, and they were
            circling us.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 self-end text-xs text-dark-green/40">
        <span>I was so scared, but I&apos;m glad I got to experience that. It was ...</span>
        <div className="w-6 h-6 rounded-full bg-purple/30 shrink-0" />
      </div>
    </div>
  );
}

function BookCoverMockup() {
  return (
    <div className="relative aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-dark-green/70 to-dark-green">
      <div className="absolute inset-0 bg-gradient-to-b from-marine-teal/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
        <p className="text-xs tracking-widest uppercase opacity-60 mb-4">Chapter 7</p>
        <h3 className="text-3xl md:text-4xl font-serif italic text-center leading-tight mb-8">
          The
          <br />
          Magical
          <br />
          Flatirons
        </h3>
        <div className="flex items-center gap-2 mt-auto">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-marine-teal/40 border-2 border-white/20" />
            <div className="w-8 h-8 rounded-full bg-purple/40 border-2 border-white/20" />
            <div className="w-8 h-8 rounded-full bg-dark-green/40 border-2 border-white/20" />
          </div>
          <div className="text-sm">
            <p className="text-white/80">by Kara, Jake, and Anna</p>
            <p className="text-white/50 text-xs">Aug 12 • 10 min read</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImagePlaceholder({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-dark-green/8 to-marine-teal/8 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-3 bg-dark-green/10 rounded-full flex items-center justify-center text-dark-green/30">
          {icon}
        </div>
        <p className="text-dark-green/30 text-sm">{label}</p>
      </div>
    </div>
  );
}

function getImageComponent(type: string) {
  switch (type) {
    case 'chat': return <ChatMockup />;
    case 'book': return <BookCoverMockup />;
    case 'lifestyle': return (
      <ImagePlaceholder
        label="Lifestyle image"
        icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
      />
    );
    case 'family': return (
      <ImagePlaceholder
        label="Family image"
        icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
      />
    );
    default: return null;
  }
}

export function ProductFeatures() {
  return (
    <section id="features">
      {/* ── Feature 1: Capture Your Life Story ── */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-marine-teal mb-4">
              Capture Your Life Story
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-dark-green mb-6 font-serif">
              Your expert biographer.
              <br />
              On-demand.
            </h2>
            <p className="text-lg text-dark-green/60 max-w-2xl mx-auto">
              Iloomi helps you write your life story, one step at a time. With our guided
              experience, you can capture your life story in a way that is both accurate
              and meaningful.
            </p>
          </motion.div>

          {/* Chapter Cards Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
              {chapterCards.map((card, i) => (
                <div key={i} className="shrink-0 w-[200px] snap-start">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden relative bg-gradient-to-b from-dark-green/60 to-dark-green shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-green/90 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                      <p className="text-[10px] tracking-widest uppercase bg-marine-teal/30 self-start px-2 py-0.5 rounded">
                        Chapter {card.chapter}
                      </p>
                      <div>
                        <h4 className="font-serif text-base leading-tight mb-3 italic">
                          {card.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white/30 border border-white/20 shrink-0" />
                          <div className="text-[10px]">
                            <p className="text-white/80">{card.authors}</p>
                            <p className="text-white/50">{card.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Features 2–5: Alternating two-column blocks ── */}
      {twoColFeatures.map((feature, i) => (
        <div key={i} className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
            >
              {/* Image side */}
              <div className={feature.imagePosition === 'right' ? 'lg:order-2' : ''}>
                {getImageComponent(feature.imageContent)}
              </div>

              {/* Text side */}
              <div className={feature.imagePosition === 'right' ? 'lg:order-1' : ''}>
                <p className="text-sm font-semibold tracking-[0.2em] uppercase text-marine-teal mb-4">
                  {feature.label}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-dark-green mb-6">
                  {feature.heading}
                </h2>
                <p className="text-lg text-dark-green/60 leading-relaxed">
                  {feature.body}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
