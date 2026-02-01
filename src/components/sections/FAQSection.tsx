'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import type { FAQ } from '@/types';

const categories = [
  'All',
  'Getting Started',
  'AI Biographer & Story Creation',
  'Editing & Media',
  'Collaboration & Sharing',
  'Privacy & Security',
] as const;

const placeholderFAQs = [
  // Getting Started
  { id: '1', category: 'Getting Started', title: 'Why should I use Iloomi?', content: 'Iloomi is a unique and personalized way to preserve your life story for future generations. With the help of our AI biographer, you can create a professionally written biography that captures the essence of your experiences, memories, and wisdom. Plus, you can add photos and other multimedia to make your story even more engaging.' },
  { id: '2', category: 'Getting Started', title: 'How does Iloomi work?', content: 'Iloomi uses cutting-edge AI technology to analyze your conversations and create a detailed biography. Our platform uses natural language processing (NLP) and machine learning (ML) algorithms to understand your stories and identify key events, people, and places. You can also invite family and friends to contribute their own memories and perspectives to your story.' },
  { id: '3', category: 'Getting Started', title: 'How much does Iloomi cost?', content: 'Iloomi is free to use while we are in Beta. We expect to launch as a paid service with a basic free version after the beta period ends.' },
  { id: '4', category: 'Getting Started', title: 'Is Iloomi only for older people?', content: 'No, Iloomi is for anyone who wants to preserve their life story. Whether you\'re a young adult just starting out or a retiree looking to document your life experiences, Iloomi can help you create a meaningful and personalized biography.' },
  { id: '5', category: 'Getting Started', title: 'Can I use Iloomi for my business or organization?', content: 'Yes, Iloomi can be used for businesses and organizations to document their history, mission, and achievements. You can use the platform to create a company history, document your team\'s accomplishments, and preserve important milestones.' },
  { id: '6', category: 'Getting Started', title: 'Can I use Iloomi for my family history research?', content: 'Yes, Iloomi is a great tool for family history research. You can use the platform to document your family\'s stories, traditions, and memories. You can also invite family members to contribute their own memories and perspectives, helping to create a more complete picture of your family\'s history. Plus, our AI technology can help identify patterns and connections between different family members\' stories.' },

  // AI Biographer & Story Creation
  { id: '7', category: 'AI Biographer & Story Creation', title: 'How does the AI Biographer Chat work?', content: 'The chat interface is designed to mimic a casual conversation. You simply talk about your life, and the AI captures and processes the information, turning it into an organized narrative. It\'s like talking to a friend who happens to be an expert biographer!' },
  { id: '8', category: 'AI Biographer & Story Creation', title: 'Will the AI correct or critique what I say during the chat?', content: 'No, Iloomi won\'t provide feedback or corrections during the chat. Instead, it focuses on understanding and organizing your stories. Any restructuring or rephrasing is done based on expert knowledge to enhance the narrative flow of your biography.' },
  { id: '9', category: 'AI Biographer & Story Creation', title: 'How does Iloomi generate story previews?', content: 'Iloomi\'s AI analyzes your conversations, understanding the context, emotions, and key events. It then crafts a preliminary story preview, giving you a glimpse of what your biography could look like. Think of it as a first draft that you can then personalize further.' },
  { id: '10', category: 'AI Biographer & Story Creation', title: 'Can I make changes to the generated story previews?', content: 'Absolutely! The preview is just a starting point. You can customize, edit, and refine it using the Story Editor to make it truly yours. Add personal touches, rearrange sections, or dive deeper into specific memories.' },
  { id: '11', category: 'AI Biographer & Story Creation', title: 'How long does it take to create a memoir?', content: 'The time it takes to create a memoir depends on the complexity of your story and how much time you have to devote to it. On average, it can take a few weeks to a few months to complete a memoir. However, the time frame can vary depending on the scope of the story and the level of detail you want to include.' },
  { id: '12', category: 'AI Biographer & Story Creation', title: 'How do I know that my story will be accurate?', content: 'Iloomi\'s AI technology is trained to analyze your conversations and identify the most important details. It uses a combination of AI and human expertise to ensure that your story is accurate and complete. Plus, you can always review and edit your story to make sure it\'s just right.' },

  // Editing & Media
  { id: '13', category: 'Editing & Media', title: 'What features does the Rich Text Editor offer?', content: 'The Rich Text Editor gives you complete control over your story. You can edit, format, and enhance your text, add emphasis, adjust formatting, and more. It\'s designed to be user-friendly while offering the tools you need to craft a polished narrative.' },
  { id: '14', category: 'Editing & Media', title: 'Can I incorporate my own writing style into the story?', content: 'Absolutely! The Rich Text Editor allows you to infuse your personal writing style into the story. Whether you want to add a poetic touch, inject humor, or maintain a formal tone, the editor supports all your creative needs.' },
  { id: '15', category: 'Editing & Media', title: 'How can I upload photos and images to the Media Manager?', content: 'It\'s simple! Within the Media Manager, you\'ll find an option to upload images. Just select the files from your device, and they\'ll be added to your media library, ready to be incorporated into your biography.' },
  { id: '16', category: 'Editing & Media', title: 'Can I upload images directly from my phone?', content: 'You can upload photos from your computer or any device with an internet connection. Currently, we are working on adding support for video and document uploads as well.' },
  { id: '17', category: 'Editing & Media', title: 'Can I upload videos or documents to the Media Manager?', content: 'Currently, Iloomi supports image uploads only. However, we\'re actively expanding our features and hope to support video and document uploads in the future.' },
  { id: '18', category: 'Editing & Media', title: 'Is there a limit to the number of images I can upload?', content: 'Currently, there\'s no strict limit on the number of images you can upload. However, we recommend selecting the most meaningful images that complement your story to ensure a cohesive and engaging narrative.' },

  // Collaboration & Sharing
  { id: '19', category: 'Collaboration & Sharing', title: 'How can I invite others to collaborate on my biography?', content: 'When you start a new draft, you can invite friends and family to contribute via their email. They\'ll be able to add their memories, photos, and perspectives to create a richer, more complete biography. It\'s like a collaborative storytelling experience!' },
  { id: '20', category: 'Collaboration & Sharing', title: 'Do invited collaborators need an Iloomi account?', content: 'Yes, collaborators will need to have a free Iloomi account. This ensures that contributions are tracked and the collaborative process is smooth and organized. It also adds security measures to help prevent unauthorized access.' },
  { id: '21', category: 'Collaboration & Sharing', title: 'Can I collaborate with others on my story?', content: 'Yes, you can invite friends and family to contribute their own memories and perspectives to your story. You can also assign different levels of permissions to collaborators, such as read-only or full editing access.' },
  { id: '22', category: 'Collaboration & Sharing', title: 'Can I share my story with others?', content: 'Yes, you can share your story with anyone you want. You can download a EPUB or PDF version of your story, or you can share a link to your story online. You can also control who can access your story by setting up privacy settings.' },
  { id: '23', category: 'Collaboration & Sharing', title: 'Can I update my story?', content: 'Yes, you can update your story at any time. Simply log in to your account and make any changes you want. You can also add new stories, photos, and other media to your biography.' },

  // Privacy & Security
  { id: '24', category: 'Privacy & Security', title: 'Is my data private?', content: 'Yes, your data is completely private. We use state-of-the-art security measures to protect your data and ensure that it is not shared with any third parties. Your data is encrypted and stored securely on our servers.' },
  { id: '25', category: 'Privacy & Security', title: 'How can I control the privacy of my stories?', content: 'You have three privacy options: keep your stories completely private, share them with a select group of people, or make them public for anyone to read. You can adjust your privacy settings at any time from your account settings.' },
  { id: '26', category: 'Privacy & Security', title: 'Can I change the privacy settings after I\'ve created my story?', content: 'Yes, you can adjust the privacy settings of your story at any time. Whether you want to make it more private or share it with a wider audience, you have full control over who sees your biography.' },
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
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const allItems = faqs && faqs.length > 0
    ? faqs.map((faq) => ({
        id: faq._id,
        title: faq.question,
        content: <PortableText value={faq.answer} />,
        category: faq.category?.name || '',
      }))
    : placeholderFAQs.map((faq) => ({
        id: faq.id,
        title: faq.title,
        content: faq.content,
        category: faq.category,
      }));

  const items = activeCategory === 'All'
    ? allItems
    : allItems.filter((item) => item.category === activeCategory);

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
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenId(null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors ${
                  activeCategory === cat
                    ? 'bg-dark-green text-white'
                    : 'bg-off-white text-dark-green/60 hover:bg-dark-green/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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
