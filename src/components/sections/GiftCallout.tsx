import Link from 'next/link';
import { GIFT_PRICE } from '@/lib/gift';

/** A small pointer from pricing to /gift, for people buying it for a parent. */
export function GiftCallout() {
  return (
    <section id="gift" className="px-6 pb-26">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-10 gap-y-6 rounded-md bg-mint px-8 py-8 md:px-12 md:py-10">
        <div className="min-w-0 flex-[1_1_480px]">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-dark-green">A gift for a parent</p>
          <p className="font-serif text-3xl leading-tight text-ink md:text-[38px]">
            Give Mom her story, <em className="font-normal text-dark-green">in her own words.</em>
          </p>
          <p className="mt-2.5 text-[17px] text-muted">
            A year of Iloomi Pro for ${GIFT_PRICE} plus applicable sales tax, paid once. They talk, Iloomi writes it down.
          </p>
        </div>
        <Link
          href="/gift"
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-dark-green px-7 text-[17px] font-semibold text-white transition-colors hover:bg-dark-green/90"
        >
          Give Iloomi
        </Link>
      </div>
    </section>
  );
}
