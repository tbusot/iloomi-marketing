import type { Metadata } from 'next';
import Link from 'next/link';
import { StoreBadges } from '@/components/ui/StoreBadges';

export const metadata: Metadata = {
  title: 'How to update Iloomi | Iloomi',
  description: 'Get the latest version of Iloomi on your iPhone, and have updates install on their own.',
};

const STEPS = [
  {
    title: 'Open the App Store',
    body: 'Tap the blue App Store icon on your iPhone.',
  },
  {
    title: 'Find Iloomi',
    body: 'Tap Search, type “Iloomi”, and tap it in the results. Or tap the App Store button below on your iPhone.',
  },
  {
    title: 'Tap Update',
    body: 'If the button says Update, tap it and wait for it to finish. If it says Open, you already have the latest version.',
  },
] as const;

export default function UpdateFAQPage() {
  return (
    <section className="px-6 pt-28 pb-24 md:pt-30">
      <div className="mx-auto max-w-[720px]">
        <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-marine-teal">
          <Link href="/faq" className="hover:text-dark-green">FAQ</Link>
        </p>
        <h1 className="font-serif text-4xl leading-[1.05] text-ink md:text-[56px]">
          How to update <em className="font-normal text-dark-green">Iloomi</em>
        </h1>
        <p className="mt-5.5 text-lg leading-relaxed text-muted">
          Iloomi 2.0 brings talking with Iloomi, Your Circle, and family who can add what they remember. To get it, update
          the app on your iPhone. It takes about a minute.
        </p>

        <ol className="mt-10 space-y-7">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dark-green font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h2 className="text-[19px] font-semibold text-ink">{step.title}</h2>
                <p className="mt-1 text-base leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <StoreBadges />
        </div>

        <div className="mt-14 space-y-8 border-t border-[#ddd6cb] pt-10">
          <div>
            <h2 className="font-serif text-2xl text-ink">Update automatically from now on</h2>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Open Settings, tap Apps, then App Store, and turn on App Updates. (On iOS 17 and earlier, it&apos;s
              Settings, then App Store.) Your iPhone will install new versions of Iloomi overnight.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-ink">Don&apos;t see Iloomi, or the update won&apos;t start?</h2>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Make sure you&apos;re connected to Wi-Fi and signed in to the App Store with the same Apple Account you used
              to download Iloomi. If it still won&apos;t update, restart your iPhone and try again, or email us at{' '}
              <a href="mailto:info@iloomi.com" className="font-medium text-dark-green underline underline-offset-4 hover:text-purple">
                info@iloomi.com
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-ink">Will I lose my stories?</h2>
            <p className="mt-2 text-base leading-relaxed text-muted">
              No. Your stories, photos and Circle are saved to your account, not the phone. They&apos;re all there
              when you open the new version.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
