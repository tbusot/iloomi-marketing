import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { GiftForm, GiftFormPlaceholder } from '@/components/gift/GiftForm';
import { WatchPlayer } from '@/components/ui/WatchPlayer';
import { GIFT_PRICE, GIFT_SUPPORT_EMAIL } from '@/lib/gift';
import { getWatchVideo } from '@/lib/watch';

const SITE_URL = 'https://www.iloomi.com';
const title = 'Give Mom her story: a year of Iloomi Pro | Iloomi';
const description =
  'A gift for a parent or grandparent: a year of talking with Iloomi, which writes their stories down for the family to keep. $99 plus applicable sales tax, paid once.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/gift` },
  openGraph: { title, description, type: 'website', url: `${SITE_URL}/gift` },
  twitter: { card: 'summary_large_image', title, description },
};

const fading = [
  { text: 'The house on Alder Street', className: '' },
  { text: 'Dancing at the Legion hall', className: 'opacity-[0.66]' },
  { text: 'Her mother’s biscuit recipe', className: 'opacity-[0.38] blur-[0.6px]' },
  { text: 'What she named the first car', className: 'opacity-[0.18] blur-[1.4px]' },
];

const included = [
  {
    title: 'They just talk',
    body: 'Iloomi asks good questions out loud, one at a time, at their pace. No typing, and no limit on talking all year.',
  },
  {
    title: 'It writes their stories',
    body: 'When they’re done, Iloomi writes the story up the way they told it, ready to read and keep.',
  },
  {
    title: 'The family reads and adds',
    body: 'They can invite you in to read each story or add your side of it, from any browser.',
  },
  {
    title: 'iPhone or the web',
    body: 'Use it in the iPhone app, or at app.iloomi.com on a computer or tablet.',
  },
];

const questions = [
  {
    question: 'How do they get it?',
    answer:
      'We email them on the date you pick, with their code and how to start. Right after checkout you also get a card to print, if you’d rather hand it over yourself.',
  },
  {
    question: 'What if they’re not good with technology?',
    answer:
      'They just talk. Iloomi asks a question, they answer out loud, and it asks the next one. If you can sit with them the first time to enter the code, that’s usually all it takes.',
  },
  {
    question: 'When does the year start?',
    answer: 'When they enter their code, not when you buy it. So it’s fine to buy now for a birthday or the holidays.',
  },
  {
    question: 'What happens after a year?',
    answer:
      'Nothing is charged and nothing renews. They can keep going with Pro at the regular price if they like, and every story they told stays theirs to read.',
  },
  {
    question: 'Can I get a refund?',
    answer: `Unclaimed gifts can be refunded. Email ${GIFT_SUPPORT_EMAIL}.`,
  },
];

export default function GiftPage() {
  const video = getWatchVideo('voice')!;

  return (
    <>
      <section className="px-6 pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center gap-x-14 gap-y-12">
          <div className="min-w-0 flex-[1_1_560px]">
            <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-marine-teal">
              The gift · One year of Iloomi Pro
            </p>
            <h1 className="max-w-[860px] font-serif text-[42px] leading-[1.04] text-ink md:text-[68px]">
              Give Mom her story,
              <br />
              <em className="font-normal text-dark-green">in her own words.</em>
            </h1>
            <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-muted md:text-[19px]">
              Your parents remember things nobody else does: the street they grew up on, how they
              met, what the kitchen smelled like on Sundays. The details fade first. A year of Iloomi
              gives them someone to tell, and it writes every story down for the family to keep.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#send"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-dark-green px-7 text-[17px] font-semibold text-white transition-colors hover:bg-dark-green/90"
              >
                Give Iloomi
              </a>
              <span className="text-[15px] text-muted">
                ${GIFT_PRICE} plus applicable sales tax, paid once. No subscription, nothing renews.
              </span>
            </div>
          </div>

          {/* The details of her stories, fading the way memories do (as on the home page) */}
          <div className="min-w-0 flex-[0_1_380px] rounded-md bg-white px-9 py-8 shadow-[0_24px_60px_rgba(60,40,20,0.1)]">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-taupe">
              Only Mom remembers
            </p>
            <ul className="flex flex-col gap-2.5 font-book text-[21px] leading-normal text-ink">
              {fading.map((detail) => (
                <li key={detail.text} className={detail.className}>
                  {detail.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-[1080px] items-center gap-12 border-t border-[#ddd6cb] pt-16 md:grid-cols-[minmax(0,360px)_1fr] md:gap-16">
          <WatchPlayer video={video} />

          <div>
            <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-marine-teal">
              What they get
            </p>
            <h2 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
              A year of talking,
              <br />
              <em className="font-normal text-dark-green">and every story kept.</em>
            </h2>
            <dl className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {included.map((point) => (
                <div key={point.title}>
                  <dt className="mb-1 text-[17px] font-semibold text-ink">{point.title}</dt>
                  <dd className="text-base leading-relaxed text-muted">{point.body}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-9 text-[15px] leading-relaxed text-muted">
              After the year, they can keep going at the regular Pro price, or not. Either way, the
              stories stay.
            </p>
          </div>
        </div>
      </section>

      <section id="send" className="bg-mint/60 px-6 pt-20 pb-24 md:pt-24 md:pb-28">
        <div className="mx-auto grid max-w-[1080px] gap-12 md:grid-cols-[1fr_minmax(0,600px)] md:gap-16">
          <div>
            <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-marine-teal">
              Send the gift
            </p>
            <h2 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
              ${GIFT_PRICE} + tax
              <br />
              <em className="font-normal text-dark-green">for a whole year.</em>
            </h2>
            <ul className="mt-7 flex flex-col gap-3 font-book text-lg leading-snug text-ink">
              {[
                'One year of Iloomi Pro',
                'Starts when they enter their code',
                'An email to them on the day you pick',
                'A card for you to print and give',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="text-marine-teal">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Suspense fallback={<GiftFormPlaceholder />}>
            <GiftForm />
          </Suspense>
        </div>
      </section>

      <section className="px-6 pt-24 pb-28">
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
            See the{' '}
            <Link href="/terms#gifts" className="font-medium text-dark-green underline underline-offset-4 hover:text-purple">
              gift terms
            </Link>
            , or write to{' '}
            <a href={`mailto:${GIFT_SUPPORT_EMAIL}`} className="font-medium text-dark-green underline underline-offset-4 hover:text-purple">
              {GIFT_SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
