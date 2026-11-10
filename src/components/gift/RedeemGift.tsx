'use client';

import { useState } from 'react';
import { GIFT_CLAIM_URL, formatGiftCode } from '@/lib/gift';

/**
 * For people who were given Iloomi and landed here, the page for buying it.
 * Codes are claimed on app.iloomi.com, so this sends them there.
 */
export function RedeemGift() {
  const [code, setCode] = useState('');
  const complete = code.length === 9;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        window.location.href = complete ? `${GIFT_CLAIM_URL}/${code}` : GIFT_CLAIM_URL;
      }}
      className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-dark-green/15 bg-mint/60 px-5 py-4"
    >
      <p className="min-w-[220px] flex-1 text-[15px] text-ink">
        <strong className="font-semibold">Oops, were you given Iloomi?</strong>{' '}
        <span className="text-muted">Enter your code to start your year.</span>
      </p>
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(event) => setCode(formatGiftCode(event.target.value))}
          placeholder="ABCD-2345"
          aria-label="Gift code"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={9}
          className="h-11 w-[150px] rounded-full border border-dark-green/25 bg-white px-4 text-center font-mono text-base tracking-widest text-ink uppercase outline-none focus:border-dark-green"
        />
        <button
          type="submit"
          className="h-11 rounded-full bg-dark-green px-5 text-[15px] font-semibold text-white transition-colors hover:bg-dark-green/90"
        >
          Redeem
        </button>
      </div>
    </form>
  );
}
