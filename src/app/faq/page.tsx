import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { client } from '@/lib/sanity/client';
import { faqsQuery, faqCategoriesQuery } from '@/lib/sanity/queries';
import { Accordion } from '@/components/ui/Accordion';
import type { FAQ, FAQCategory } from '@/types';

export const metadata: Metadata = {
  title: 'FAQ | Iloomi',
  description: 'Frequently asked questions about Iloomi — The Collaborative Biographer.',
};

// Real FAQs from iloomi.com
const placeholderFAQs = [
  // Getting Started
  { id: '1', category: 'Getting Started', question: 'Why should I use Iloomi?', answer: 'Iloomi is a unique and personalized way to preserve your life story for future generations. With the help of our AI biographer, you can create a professionally written biography that captures the essence of your experiences, memories, and wisdom. Plus, you can add photos and other multimedia to make your story even more engaging.' },
  { id: '2', category: 'Getting Started', question: 'How does Iloomi work?', answer: 'Iloomi uses cutting-edge AI technology to analyze your conversations and create a detailed biography. Our platform uses natural language processing (NLP) and machine learning (ML) algorithms to understand your stories and identify key events, people, and places. You can also invite family and friends to contribute their own memories and perspectives to your story.' },
  { id: '3', category: 'Getting Started', question: 'How much does Iloomi cost?', answer: 'Iloomi is free to use while we are in Beta. We expect to launch as a paid service with a basic free version after the beta period ends.' },
  { id: '4', category: 'Getting Started', question: 'Is Iloomi only for older people?', answer: 'No, Iloomi is for anyone who wants to preserve their life story. Whether you\'re a young adult just starting out or a retiree looking to document your life experiences, Iloomi can help you create a meaningful and personalized biography.' },
  { id: '5', category: 'Getting Started', question: 'Can I use Iloomi for my business or organization?', answer: 'Yes, Iloomi can be used for businesses and organizations to document their history, mission, and achievements. You can use the platform to create a company history, document your team\'s accomplishments, and preserve important milestones.' },
  { id: '6', category: 'Getting Started', question: 'Can I use Iloomi for my family history research?', answer: 'Yes, Iloomi is a great tool for family history research. You can use the platform to document your family\'s stories, traditions, and memories. You can also invite family members to contribute their own memories and perspectives, helping to create a more complete picture of your family\'s history. Plus, our AI technology can help identify patterns and connections between different family members\' stories.' },

  // AI Biographer & Story Creation
  { id: '7', category: 'AI Biographer & Story Creation', question: 'How does the AI Biographer Chat work?', answer: 'The chat interface is designed to mimic a casual conversation. You simply talk about your life, and the AI captures and processes the information, turning it into an organized narrative. It\'s like talking to a friend who happens to be an expert biographer!' },
  { id: '8', category: 'AI Biographer & Story Creation', question: 'Will the AI correct or critique what I say during the chat?', answer: 'No, Iloomi won\'t provide feedback or corrections during the chat. Instead, it focuses on understanding and organizing your stories. Any restructuring or rephrasing is done based on expert knowledge to enhance the narrative flow of your biography.' },
  { id: '9', category: 'AI Biographer & Story Creation', question: 'How does Iloomi generate story previews?', answer: 'Iloomi\'s AI analyzes your conversations, understanding the context, emotions, and key events. It then crafts a preliminary story preview, giving you a glimpse of what your biography could look like. Think of it as a first draft that you can then personalize further.' },
  { id: '10', category: 'AI Biographer & Story Creation', question: 'Can I make changes to the generated story previews?', answer: 'Absolutely! The preview is just a starting point. You can customize, edit, and refine it using the Story Editor to make it truly yours. Add personal touches, rearrange sections, or dive deeper into specific memories.' },
  { id: '11', category: 'AI Biographer & Story Creation', question: 'How long does it take to create a memoir?', answer: 'The time it takes to create a memoir depends on the complexity of your story and how much time you have to devote to it. On average, it can take a few weeks to a few months to complete a memoir. However, the time frame can vary depending on the scope of the story and the level of detail you want to include.' },
  { id: '12', category: 'AI Biographer & Story Creation', question: 'How do I know that my story will be accurate?', answer: 'Iloomi\'s AI technology is trained to analyze your conversations and identify the most important details. It uses a combination of AI and human expertise to ensure that your story is accurate and complete. Plus, you can always review and edit your story to make sure it\'s just right.' },

  // Editing & Media
  { id: '13', category: 'Editing & Media', question: 'What features does the Rich Text Editor offer?', answer: 'The Rich Text Editor gives you complete control over your story. You can edit, format, and enhance your text, add emphasis, adjust formatting, and more. It\'s designed to be user-friendly while offering the tools you need to craft a polished narrative.' },
  { id: '14', category: 'Editing & Media', question: 'Can I incorporate my own writing style into the story?', answer: 'Absolutely! The Rich Text Editor allows you to infuse your personal writing style into the story. Whether you want to add a poetic touch, inject humor, or maintain a formal tone, the editor supports all your creative needs.' },
  { id: '15', category: 'Editing & Media', question: 'How can I upload photos and images to the Media Manager?', answer: 'It\'s simple! Within the Media Manager, you\'ll find an option to upload images. Just select the files from your device, and they\'ll be added to your media library, ready to be incorporated into your biography.' },
  { id: '16', category: 'Editing & Media', question: 'Can I upload images directly from my phone?', answer: 'You can upload photos from your computer or any device with an internet connection. Currently, we are working on adding support for video and document uploads as well.' },
  { id: '17', category: 'Editing & Media', question: 'Can I upload videos or documents to the Media Manager?', answer: 'Currently, Iloomi supports image uploads only. However, we\'re actively expanding our features and hope to support video and document uploads in the future.' },
  { id: '18', category: 'Editing & Media', question: 'Is there a limit to the number of images I can upload?', answer: 'Currently, there\'s no strict limit on the number of images you can upload. However, we recommend selecting the most meaningful images that complement your story to ensure a cohesive and engaging narrative.' },

  // Collaboration & Sharing
  { id: '19', category: 'Collaboration & Sharing', question: 'How can I invite others to collaborate on my biography?', answer: 'When you start a new draft, you can invite friends and family to contribute via their email. They\'ll be able to add their memories, photos, and perspectives to create a richer, more complete biography. It\'s like a collaborative storytelling experience!' },
  { id: '20', category: 'Collaboration & Sharing', question: 'Do invited collaborators need an Iloomi account?', answer: 'Yes, collaborators will need to have a free Iloomi account. This ensures that contributions are tracked and the collaborative process is smooth and organized. It also adds security measures to help prevent unauthorized access.' },
  { id: '21', category: 'Collaboration & Sharing', question: 'Can I collaborate with others on my story?', answer: 'Yes, you can invite friends and family to contribute their own memories and perspectives to your story. You can also assign different levels of permissions to collaborators, such as read-only or full editing access.' },
  { id: '22', category: 'Collaboration & Sharing', question: 'Can I share my story with others?', answer: 'Yes, you can share your story with anyone you want. You can download a EPUB or PDF version of your story, or you can share a link to your story online. You can also control who can access your story by setting up privacy settings.' },
  { id: '23', category: 'Collaboration & Sharing', question: 'Can I update my story?', answer: 'Yes, you can update your story at any time. Simply log in to your account and make any changes you want. You can also add new stories, photos, and other media to your biography.' },

  // Privacy & Security
  { id: '24', category: 'Privacy & Security', question: 'Is my data private?', answer: 'Yes, your data is completely private. We use state-of-the-art security measures to protect your data and ensure that it is not shared with any third parties. Your data is encrypted and stored securely on our servers.' },
  { id: '25', category: 'Privacy & Security', question: 'How can I control the privacy of my stories?', answer: 'You have three privacy options: keep your stories completely private, share them with a select group of people, or make them public for anyone to read. You can adjust your privacy settings at any time from your account settings.' },
  { id: '26', category: 'Privacy & Security', question: 'Can I change the privacy settings after I\'ve created my story?', answer: 'Yes, you can adjust the privacy settings of your story at any time. Whether you want to make it more private or share it with a wider audience, you have full control over who sees your biography.' },
];

// Group FAQs by category
function groupByCategory(faqs: typeof placeholderFAQs) {
  return faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof placeholderFAQs>);
}

async function getFAQs() {
  try {
    const [faqs, categories] = await Promise.all([
      client.fetch(faqsQuery),
      client.fetch(faqCategoriesQuery),
    ]);

    if (faqs?.length > 0) {
      return { faqs, categories };
    }
    return null;
  } catch {
    return null;
  }
}

export default async function FAQPage() {
  const data = await getFAQs();
  const groupedFAQs = groupByCategory(placeholderFAQs);
  const categories = Object.keys(groupedFAQs);

  return (
    <div className="min-h-screen bg-off-white pt-24">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-dark-green mb-6">
            Frequently Asked <span className="text-marine-teal">Questions</span>
          </h1>
          <p className="text-xl text-dark-green/60 max-w-2xl mx-auto">
            Find answers to common questions about Iloomi — The Collaborative Biographer.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 bg-white rounded-full text-dark-green hover:bg-purple hover:text-white transition-colors shadow-sm"
            >
              {category}
            </a>
          ))}
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {categories.map((category) => (
            <section
              key={category}
              id={category.toLowerCase().replace(/\s+/g, '-')}
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-bold text-dark-green mb-6">{category}</h2>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <Accordion
                  items={groupedFAQs[category].map((faq) => ({
                    id: faq.id,
                    title: faq.question,
                    content: faq.answer,
                  }))}
                />
              </div>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h3 className="text-2xl font-bold text-dark-green mb-4">
            Still have questions?
          </h3>
          <p className="text-dark-green/60 mb-6">
            Can&apos;t find the answer you&apos;re looking for? We&apos;re here to help.
          </p>
          <a
            href="mailto:info@iloomi.com"
            className="inline-flex items-center gap-2 bg-purple text-white px-6 py-3 rounded-full font-medium hover:bg-purple/90 transition-colors"
          >
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
