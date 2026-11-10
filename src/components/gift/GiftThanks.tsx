'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { GiftCard } from '@/components/gift/GiftCard';
import {
  GIFT_API_BASE,
  GIFT_SUPPORT_EMAIL,
  describeDeliverOn,
  trackGiftPurchase,
  type GiftStatus,
} from '@/lib/gift';

const POLL_MS = 2000;
/** The Stripe webhook usually lands in a few seconds; past this, stop and point to email. */
const POLL_LIMIT_MS = 30000;

type View =
  | { kind: 'loading' }
  | { kind: 'ready'; gift: GiftStatus }
  | { kind: 'slow' }
  | { kind: 'missing' };

export function GiftThanks() {
  const params = useSearchParams();
  const giftId = params.get('gift');
  const sessionId = params.get('session_id');
  const [view, setView] = useState<View>(() => (giftId && sessionId ? { kind: 'loading' } : { kind: 'missing' }));

  useEffect(() => {
    if (!giftId || !sessionId) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const started = Date.now();
    const url = `${GIFT_API_BASE}/giftStatus?gift=${encodeURIComponent(giftId)}&session=${encodeURIComponent(sessionId)}`;

    const poll = async () => {
      try {
        const response = await fetch(url, { cache: 'no-store' });
        if (stopped) return;
        if (response.status === 404) {
          setView({ kind: 'missing' });
          return;
        }
        if (response.ok) {
          const gift = (await response.json()) as GiftStatus;
          if (stopped) return;
          if (gift.status !== 'pending') {
            setView({ kind: 'ready', gift });
            return;
          }
        }
      } catch {
        // A network blip: keep trying until the time limit.
      }
      if (stopped) return;
      if (Date.now() - started >= POLL_LIMIT_MS) setView({ kind: 'slow' });
      else timer = setTimeout(poll, POLL_MS);
    };

    poll();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [giftId, sessionId]);

  const paid = view.kind === 'ready' && view.gift.status !== 'refunded';

  useEffect(() => {
    if (!paid || !giftId) return;
    try {
      sessionStorage.removeItem('iloomi-gift-draft');
      const firedKey = `iloomi-gift-purchase-${giftId}`;
      if (sessionStorage.getItem(firedKey)) return;
      sessionStorage.setItem(firedKey, '1');
    } catch {
      // Without storage a reload could fire it twice; the pixel's eventID dedupes that.
    }
    trackGiftPurchase(giftId);
  }, [paid, giftId]);

  if (view.kind === 'loading') {
    return (
      <Shell kicker="One moment" title="Confirming your payment…">
        <p className="mt-5 flex items-center gap-3 text-lg text-muted" role="status">
          <span
            aria-hidden="true"
            className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-dark-green/25 border-t-dark-green"
          />
          This usually takes a few seconds.
        </p>
      </Shell>
    );
  }

  if (view.kind === 'slow') {
    return (
      <Shell kicker="Almost there" title="This is taking longer than usual.">
        <p className="mt-5 max-w-[600px] text-lg leading-relaxed text-muted">
          We’re still confirming your payment. Check your email in a few minutes, or try this
          page again. If nothing arrives, write to <SupportLink /> and we’ll sort it out.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-dark-green px-7 text-[17px] font-semibold text-dark-green transition-colors hover:bg-dark-green/5"
        >
          Check again
        </button>
      </Shell>
    );
  }

  if (view.kind === 'missing') {
    return (
      <Shell kicker="Gift" title="We couldn’t find that gift.">
        <p className="mt-5 max-w-[600px] text-lg leading-relaxed text-muted">
          The link may be incomplete. If you’ve paid, check your email, and if anything looks
          wrong, write to <SupportLink />.
        </p>
        <Link
          href="/gift"
          className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-dark-green px-7 text-[17px] font-semibold text-white transition-colors hover:bg-dark-green/90"
        >
          Back to the gift page
        </Link>
      </Shell>
    );
  }

  const { gift } = view;

  if (gift.status === 'refunded') {
    return (
      <Shell kicker="Gift" title="This gift was refunded.">
        <p className="mt-5 max-w-[600px] text-lg leading-relaxed text-muted">
          The code no longer works. If that’s a surprise, write to <SupportLink />.
        </p>
      </Shell>
    );
  }

  const when = describeDeliverOn(gift.deliverOn);

  return (
    <>
      <Shell kicker="Thank you" title="Your gift is ready." em={`${gift.recipientName} is going to have a lot to say.`}>
        <p className="mt-5 max-w-[620px] text-lg leading-relaxed text-muted md:text-[19px]">
          {gift.status === 'claimed'
            ? `${gift.recipientName} has already entered the code. You can still print the card below as a keepsake.`
            : `We’ll email ${gift.recipientName} ${when} with their code and how to start. If you’d rather hand it over yourself, print the card below. The year starts when they enter the code.`}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-dark-green px-7 text-[17px] font-semibold text-white transition-colors hover:bg-dark-green/90"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-2" />
              <path d="M6 14h12v7H6z" />
            </svg>
            Print the card
          </button>
          <span className="text-[15px] text-muted">Prints on one letter-size page.</span>
        </div>
      </Shell>

      {gift.code && gift.claimUrl && (
        <section className="px-6 pb-28 print:p-0">
          <GiftCard
            recipientName={gift.recipientName}
            buyerName={gift.buyerName}
            message={gift.message}
            code={gift.code}
            claimUrl={gift.claimUrl}
          />
        </section>
      )}
    </>
  );
}

function Shell({ kicker, title, em, children }: { kicker: string; title: string; em?: string; children: React.ReactNode }) {
  return (
    <section className="px-6 pt-28 pb-14 md:pt-36 print:hidden [&:only-child]:min-h-[60vh]">
      <div className="mx-auto max-w-[1080px]">
        <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-marine-teal">{kicker}</p>
        <h1 className="max-w-[860px] font-serif text-[40px] leading-[1.05] text-ink md:text-[60px]">
          {title}
          {em && (
            <>
              <br />
              <em className="font-normal text-dark-green">{em}</em>
            </>
          )}
        </h1>
        {children}
      </div>
    </section>
  );
}

function SupportLink() {
  return (
    <a href={`mailto:${GIFT_SUPPORT_EMAIL}`} className="font-medium text-dark-green underline underline-offset-4 hover:text-purple">
      {GIFT_SUPPORT_EMAIL}
    </a>
  );
}
