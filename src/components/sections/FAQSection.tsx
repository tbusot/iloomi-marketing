'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import type { FAQ } from '@/types';

const placeholderFAQs = [
  { id: '1', title: 'Why should I use Iloomi?', content: 'Iloomi preserves your stories for future generations, creating professionally-written biographies with multimedia elements like photos and videos. It\'s the perfect way to document your life and create a lasting legacy.' },
  { id: '2', title: 'How does Iloomi work?', content: 'Our AI biographer guides you through conversations to capture your life story. It identifies key events, people, and places, then helps you organize everything into a compelling narrative. You work at your own pace with drafts you can edit anytime.' },
  { id: '3', title: 'Is my data private?', content: 'Absolutely. All conversations and data are encrypted with state-of-the-art security measures. You maintain full control over who can view your story, and your data is never shared without your explicit permission.' },
  { id: '4', title: 'Can I collaborate with others on my story?', content: 'Yes! You can invite family and friends to contribute their memories, photos, and perspectives. Collaborators can have customizable viewing and editing permissions to create a richer, more complete narrative.' },
  { id: '5', title: 'How do I know that my story will be accurate?', content: 'You have complete editorial control over your biography. Review and edit every detail, add context, and ensure your authentic voice comes through. Our AI assists but you make all final decisions.' },
  { id: '6', title: 'Can I share my story with others?', content: 'Stories can be exported as EPUB or PDF, or shared via a private link with controlled access levels. Keep it private for family or share publicly — you decide who reads your story.' },
  { id: '7', title: 'How long does it take to create a memoir?', content: 'The time it takes to create a memoir depends on the complexity of your story and how much time you have to devote to it. On average, it can take a few weeks to a few months to complete a memoir. However, the time frame can vary depending on the scope of the story and the level of detail you want to include.' },
  { id: '8', title: 'Can I update my story?', content: 'Yes! Your biography is a living document. Add new chapters, update existing content, or include new photos and memories anytime. Your story grows with you.' },
  { id: '9', title: 'Can I use Iloomi for my family history research?', content: 'Absolutely! Iloomi is perfect for capturing family histories, preserving stories from multiple generations, and creating a comprehensive family archive that can be passed down.' },
  { id: '10', title: 'Is Iloomi only for older people?', content: 'Not at all! Anyone can benefit from documenting their life story. Young adults, parents, professionals — everyone has experiences worth preserving for future generations.' },
  { id: '11', title: 'Can I use Iloomi for my business or organization?', content: 'Yes! Iloomi can be used to create company histories, founder stories, organizational narratives, and more. Contact us for enterprise solutions.' },
  { id: '12', title: 'How much does Iloomi cost?', content: 'Iloomi is free to use while we are in Beta. We expect to launch as a paid service with a basic free version after the beta period ends.' },
];

function FAQItem({ title, content, isOpen, onToggle }: {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-dark-green/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className={`text-lg font-medium pr-4 transition-colors ${isOpen ? 'text-purple' : 'text-charcoal group-hover:text-purple'}`}>
          {title}
        </span>
        <svg
          className={`w-5 h-5 shrink-0 text-dark-green/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-black leading-relaxed text-lg">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FAQSectionProps {
  faqs?: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const items = faqs && faqs.length > 0
    ? faqs.map((faq) => ({
        id: faq._id,
        title: faq.question,
        content: <PortableText value={faq.answer} />,
      }))
    : placeholderFAQs.map((faq) => ({
        id: faq.id,
        title: faq.title,
        content: faq.content,
      }));

  const midpoint = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, midpoint);
  const rightColumn = items.slice(midpoint);

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading-h2 mb-6">
            Frequently Asked
            <br />
            Questions
          </h2>
          <Link
            href="/faq"
              className="inline-flex items-center px-6 py-3 rounded-full border-2 border-dark-green text-dark-green bg-white font-medium hover:bg-dark-green hover:text-white transition-colors"
          >
            View All
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-x-16"
        >
          <div>
            {leftColumn.map((item) => (
              <FAQItem
                key={item.id}
                title={item.title}
                content={item.content}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
          <div>
            {rightColumn.map((item) => (
              <FAQItem
                key={item.id}
                title={item.title}
                content={item.content}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
