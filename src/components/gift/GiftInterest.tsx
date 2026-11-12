'use client';

import { useEffect } from 'react';
import { giftRef, trackGiftInterest } from '@/lib/gift';

/** Real time on the page: this long with the page showing, or starting the gift form (in #send). */
const ENGAGED_AFTER_MS = 30_000;

/**
 * For people who came from one of our emails' gift links: records the visit,
 * and that they spent real time on the page, so we can remind the ones who
 * looked but didn't buy. Renders nothing.
 */
export function GiftInterest() {
  useEffect(() => {
    if (!giftRef()) return;
    trackGiftInterest('visit');

    let done = false;
    const engaged = () => {
      if (done) return;
      done = true;
      trackGiftInterest('engaged');
    };
    const timer = window.setTimeout(() => {
      if (document.visibilityState === 'visible') engaged();
    }, ENGAGED_AFTER_MS);
    const onFocus = (event: FocusEvent) => {
      if ((event.target as HTMLElement | null)?.closest?.('#send form')) engaged();
    };
    document.addEventListener('focusin', onFocus);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('focusin', onFocus);
    };
  }, []);
  return null;
}
