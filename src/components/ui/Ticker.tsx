'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Finally, a way to preserve my grandmother's stories for future generations.",
    author: "Sarah M.",
  },
  {
    quote: "The AI biographer helped me organize 80 years of memories into a beautiful narrative.",
    author: "Robert K.",
  },
  {
    quote: "My whole family contributed - it became a collaborative family project we all treasure.",
    author: "Maria L.",
  },
  {
    quote: "I never thought I could write my own biography. Iloomi made it possible.",
    author: "James T.",
  },
  {
    quote: "The perfect gift for my parents' 50th anniversary - their love story in their own words.",
    author: "Jennifer H.",
  },
  {
    quote: "Simple, intuitive, and deeply meaningful. This is how stories should be preserved.",
    author: "David C.",
  },
];

export function Ticker() {
  // Double the testimonials for seamless loop
  const items = [...testimonials, ...testimonials];

  return (
    <div className="bg-dark-green py-4 overflow-hidden">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: [0, -50 * testimonials.length + '%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6"
          >
            <span className="text-white/90 text-sm md:text-base">
              "{item.quote}"
            </span>
            <span className="text-marine-teal text-sm font-medium">
              — {item.author}
            </span>
            <span className="text-white/30 mx-4">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
