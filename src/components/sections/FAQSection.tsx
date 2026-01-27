'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { Accordion } from '@/components/ui/Accordion';
import type { FAQ } from '@/types';

// Placeholder FAQs for initial render - matches iloomi.com
const placeholderFAQs = [
  {
    id: '1',
    title: 'Why should I use Iloomi?',
    content:
      'Iloomi preserves your stories for future generations, creating professionally-written biographies with multimedia elements like photos and videos. It\'s the perfect way to document your life and create a lasting legacy.',
  },
  {
    id: '2',
    title: 'How does Iloomi work?',
    content:
      'Our AI biographer guides you through conversations to capture your life story. It identifies key events, people, and places, then helps you organize everything into a compelling narrative. You work at your own pace with drafts you can edit anytime.',
  },
  {
    id: '3',
    title: 'Is my data private and secure?',
    content:
      'Absolutely. All conversations and data are encrypted with state-of-the-art security measures. You maintain full control over who can view your story, and your data is never shared without your explicit permission.',
  },
  {
    id: '4',
    title: 'Can I collaborate with others on my story?',
    content:
      'Yes! You can invite family and friends to contribute their memories, photos, and perspectives. Collaborators can have customizable viewing and editing permissions to create a richer, more complete narrative.',
  },
  {
    id: '5',
    title: 'How do I know if my story is accurate?',
    content:
      'You have complete editorial control over your biography. Review and edit every detail, add context, and ensure your authentic voice comes through. Our AI assists but you make all final decisions.',
  },
  {
    id: '6',
    title: 'How can I share my finished story?',
    content:
      'Stories can be exported as EPUB or PDF, or shared via a private link with controlled access levels. Keep it private for family or share publicly—you decide who reads your story.',
  },
  {
    id: '7',
    title: 'How long does it take to create a memoir?',
    content:
      'There\'s no set timeline—work at your own pace. Some complete their story in weeks, others take months or years. Iloomi saves your progress so you can pick up whenever inspiration strikes.',
  },
  {
    id: '8',
    title: 'Can I update my story after publishing?',
    content:
      'Yes! Your biography is a living document. Add new chapters, update existing content, or include new photos and memories anytime. Your story grows with you.',
  },
  {
    id: '9',
    title: 'Can I use Iloomi for family history research?',
    content:
      'Absolutely! Iloomi is perfect for capturing family histories, preserving stories from multiple generations, and creating a comprehensive family archive that can be passed down.',
  },
  {
    id: '10',
    title: 'Is Iloomi only for older people?',
    content:
      'Not at all! Anyone can benefit from documenting their life story. Young adults, parents, professionals—everyone has experiences worth preserving for future generations.',
  },
  {
    id: '11',
    title: 'Can I use Iloomi for my business or organization?',
    content:
      'Yes! Iloomi can be used to create company histories, founder stories, organizational narratives, and more. Contact us for enterprise solutions.',
  },
  {
    id: '12',
    title: 'What is the cost?',
    content:
      'Iloomi is free to use while we are in Beta. We expect to launch as a paid service with a basic free version after the beta period ends.',
  },
];

interface FAQSectionProps {
  faqs?: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  // Use CMS data if available, otherwise use placeholders
  const accordionItems = faqs && faqs.length > 0
    ? faqs.slice(0, 6).map((faq) => ({
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
