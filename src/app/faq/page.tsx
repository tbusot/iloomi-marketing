import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { client } from '@/lib/sanity/client';
import { faqsQuery, faqCategoriesQuery } from '@/lib/sanity/queries';
import { Accordion } from '@/components/ui/Accordion';
import type { FAQ, FAQCategory } from '@/types';

export const metadata: Metadata = {
  title: 'FAQ | Iloomi',
  description: 'Frequently asked questions about Iloomi fertility tracking app.',
};

// Placeholder FAQs
const placeholderFAQs = [
  {
    id: '1',
    category: 'Getting Started',
    question: 'How do I get started with Iloomi?',
    answer: 'Download the app from the App Store or Google Play, create your profile, and start logging your cycle. The app will guide you through the setup process and begin learning your unique patterns.',
  },
  {
    id: '2',
    category: 'Getting Started',
    question: 'Is Iloomi free to use?',
    answer: 'Yes! Iloomi offers a free version with all essential tracking features. Our premium subscription unlocks advanced insights, detailed analytics, and personalized health recommendations.',
  },
  {
    id: '3',
    category: 'Getting Started',
    question: 'What devices is Iloomi available on?',
    answer: 'Iloomi is available on iOS (iPhone and iPad) and Android devices. We also offer web access for premium subscribers.',
  },
  {
    id: '4',
    category: 'Tracking & Predictions',
    question: 'How accurate are the fertility predictions?',
    answer: 'Our predictions become more accurate over time as we learn your unique cycle patterns. After tracking 3 cycles, most users see 95%+ accuracy for period predictions and highly reliable fertile window estimates.',
  },
  {
    id: '5',
    category: 'Tracking & Predictions',
    question: 'Can I use Iloomi if I have irregular cycles?',
    answer: "Absolutely! Iloomi is designed to work with all cycle types, including irregular ones. Our AI adapts to your unique patterns and provides predictions even when your cycle varies month to month.",
  },
  {
    id: '6',
    category: 'Tracking & Predictions',
    question: 'What symptoms can I track?',
    answer: 'You can track flow intensity, mood, energy levels, sleep quality, exercise, cervical mucus, basal body temperature, physical symptoms (cramps, headaches, bloating), and much more.',
  },
  {
    id: '7',
    category: 'Tracking & Predictions',
    question: 'How does Iloomi predict my fertile window?',
    answer: 'We use a combination of your logged data, including cycle length history, symptom patterns, and optional temperature data, combined with our AI algorithms to predict your fertile window.',
  },
  {
    id: '8',
    category: 'Privacy & Security',
    question: 'Is my data private and secure?',
    answer: 'Absolutely. We use end-to-end encryption and your data is stored locally on your device. We never sell your personal health information to third parties, and you can delete your data at any time.',
  },
  {
    id: '9',
    category: 'Privacy & Security',
    question: 'Can anyone else see my data?',
    answer: 'No. Your health data is completely private. We do not share any personal information with third parties. You have full control over your data and can export or delete it at any time.',
  },
  {
    id: '10',
    category: 'Privacy & Security',
    question: 'What happens to my data if I delete the app?',
    answer: 'If you delete the app without backing up your data, it will be permanently removed from your device. We recommend exporting your data before uninstalling if you want to keep your history.',
  },
  {
    id: '11',
    category: 'Premium Features',
    question: 'What is included in Iloomi Premium?',
    answer: 'Premium includes advanced cycle analytics, personalized health insights, detailed symptom correlations, unlimited history access, priority support, and ad-free experience.',
  },
  {
    id: '12',
    category: 'Premium Features',
    question: 'Can I try Premium before subscribing?',
    answer: 'Yes! We offer a 7-day free trial of all Premium features. Cancel anytime during the trial and you won\'t be charged.',
  },
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
            Find answers to common questions about Iloomi and fertility tracking.
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
            href="mailto:support@iloomi.com"
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
