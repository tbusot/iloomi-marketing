import Link from 'next/link';

const questions = [
  {
    question: 'Is there a limit on talking?',
    answer: 'Free includes 10 minutes of talking with Iloomi. With Pro, talk as much as you like. Typing is never limited.',
  },
  {
    question: 'What happens to my stories if I stop Pro?',
    answer: 'Every story you’ve told stays yours to read. To start new stories or edit the ones you have, you’ll need Pro again.',
  },
  {
    question: 'Can I subscribe on the web?',
    answer: 'Pro is in the iPhone and Android apps for now. The web is free for reading and adding to stories.',
  },
  {
    question: 'How do I cancel?',
    answer: 'In your App Store or Google Play subscriptions, anytime.',
  },
];

export function PricingQuestions() {
  return (
    <section id="questions" className="px-6 pt-24 pb-28">
      <div className="mx-auto max-w-[820px]">
        <h2 className="mb-7 font-serif text-4xl text-ink">Questions</h2>
        <dl className="border-t border-[#ddd6cb]">
          {questions.map((item) => (
            <div key={item.question} className="border-b border-[#ddd6cb] py-5.5">
              <dt className="mb-2 text-lg font-semibold text-ink">{item.question}</dt>
              <dd className="text-base leading-relaxed text-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-7 text-[15px] text-muted">
          More in the{' '}
          <Link href="/faq" className="font-medium text-dark-green underline underline-offset-4 hover:text-purple">
            FAQ
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
