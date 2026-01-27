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
    title: 'Why should I use ILOOMI?',
    content:
      'ILOOMI preserves your stories for future generations, creating professionally-written biographies with multimedia elements like photos and videos. It\'s the perfect way to document your life and create a lasting legacy.',
  },
  {
    id: '2',
    title: 'How does ILOOMI work?',
    content:
      'Our AI analyzes your conversations using natural language processing and machine learning to identify key life events, people, and places. Human editors then refine the content to ensure quality while maintaining your authentic voice.',
  },
  {
    id: '3',
    title: 'Is my data private and secure?',
    content:
      'Absolutely. All conversations and data are encrypted with state-of-the-art security measures. Access is restricted to authorized personnel only, and you maintain full control over who can view your story.',
  },
  {
    id: '4',
    title: 'Can family members contribute to my story?',
    content:
      'Yes! You can invite collaborators with customizable viewing and editing permissions. Family and friends can add their own memories, photos, and perspectives to create a richer, more complete narrative.',
  },
  {
    id: '5',
    title: 'How can I share my finished story?',
    content:
      'Stories can be exported as EPUB or PDF, or shared via a private link with controlled access levels. You decide who gets to read your story and how they can access it.',
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
            Everything you need to know about ILOOMI.
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
