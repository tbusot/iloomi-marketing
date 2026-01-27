'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { Accordion } from '@/components/ui/Accordion';
import type { FAQ } from '@/types';

// Placeholder FAQs for initial render
const placeholderFAQs = [
  {
    id: '1',
    title: 'How accurate are the fertility predictions?',
    content:
      'Our predictions become more accurate over time as we learn your unique cycle patterns. After tracking 3 cycles, most users see 95%+ accuracy for period predictions and highly reliable fertile window estimates.',
  },
  {
    id: '2',
    title: 'Is my data private and secure?',
    content:
      'Absolutely. We use end-to-end encryption and your data is stored locally on your device. We never sell your personal health information to third parties, and you can delete your data at any time.',
  },
  {
    id: '3',
    title: 'Can I use Iloomi if I have irregular cycles?',
    content:
      "Yes! Iloomi is designed to work with all cycle types, including irregular ones. Our AI adapts to your unique patterns and provides predictions even when your cycle varies.",
  },
  {
    id: '4',
    title: 'Is the app free to use?',
    content:
      'Iloomi offers a free version with essential tracking features. Our premium subscription unlocks advanced insights, detailed analytics, and personalized health recommendations.',
  },
  {
    id: '5',
    title: 'How do I get started?',
    content:
      'Simply download the app from the App Store or Google Play, create your profile, and start logging your cycle. The app will guide you through the setup process.',
  },
];

interface FAQSectionProps {
  faqs?: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  // Use CMS data if available, otherwise use placeholders
  const accordionItems = faqs && faqs.length > 0
    ? faqs.slice(0, 5).map((faq) => ({
        id: faq._id,
        title: faq.question,
        content: <PortableText value={faq.answer} />,
      }))
    : placeholderFAQs.map((faq) => ({
        id: faq.id,
        title: faq.title,
        content: faq.content,
      }));

  return (
    <section id="faq" className="py-24 bg-off-white">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-dark-green mb-6"
          >
            Frequently Asked <span className="text-marine-teal">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-dark-green/60"
          >
            Everything you need to know about Iloomi.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
        >
          <Accordion items={accordionItems} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-dark-green/60 mb-4">Still have questions?</p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-purple font-medium hover:text-purple/80 transition-colors"
          >
            View All FAQs
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
