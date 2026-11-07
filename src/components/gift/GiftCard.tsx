import Image from 'next/image';
import { GIFT_CLAIM_HOST } from '@/lib/gift';

interface GiftCardProps {
  recipientName: string;
  buyerName: string;
  message?: string;
  code: string;
  claimUrl: string;
}

/**
 * The card the buyer prints or hands over. When printing /gift/thanks, only this
 * prints (see the .gift-card-print rules in globals.css), on one letter page.
 */
export function GiftCard({ recipientName, buyerName, message, code, claimUrl }: GiftCardProps) {
  // A long note gets smaller type, so the card still prints on one page.
  const longNote = (message?.length ?? 0) > 240;
  return (
    <div className="gift-card-print mx-auto w-full max-w-[680px] rounded-md border-[1.5px] border-dark-green bg-white p-3 shadow-[0_30px_80px_rgba(13,77,64,0.14)]">
      <div className="rounded-[3px] border border-[#ddd6cb] px-5 py-10 text-center sm:px-7 md:px-14 md:py-14 print:py-10">
        <Image src="/images/iloomi-logo.svg" alt="Iloomi" width={96} height={28} className="mx-auto brightness-0" />

        <p className="mt-9 text-xs font-bold uppercase tracking-[0.18em] text-marine-teal print:mt-7">
          A gift for you
        </p>
        <h2 className="mx-auto mt-3 max-w-[520px] text-balance font-serif text-[34px] leading-[1.1] text-ink md:text-[44px]">
          {recipientName}, {buyerName} gave you
          <br />
          <em className="font-normal text-dark-green">a year of Iloomi.</em>
        </h2>

        {message && (
          <blockquote
            className={`mx-auto mt-7 whitespace-pre-line font-book leading-normal text-ink italic ${
              longNote ? 'max-w-[560px] text-[17px]' : 'max-w-[500px] text-xl'
            }`}
          >
            “{message}”
            <footer className="mt-2 text-base not-italic text-muted">— {buyerName}</footer>
          </blockquote>
        )}

        <p className="mx-auto mt-8 max-w-[480px] text-[17px] leading-relaxed text-muted print:mt-6">
          Tell your stories just by talking. Iloomi asks the questions and writes each one down
          for the family to keep.
        </p>

        <div className="mx-auto mt-9 max-w-[420px] rounded-md bg-mint px-4 py-6 sm:px-6 print:mt-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-dark-green">Your code</p>
          <p className="mt-2 font-sans text-[34px] leading-none font-semibold tracking-[0.06em] whitespace-nowrap text-ink sm:text-[44px] md:text-[52px] md:tracking-[0.08em]">
            {code}
          </p>
        </div>

        <ol className="mx-auto mt-8 print:mt-6 max-w-[440px] list-decimal space-y-1.5 pl-5 text-left text-[17px] leading-relaxed text-ink">
          <li>
            Open <strong className="font-semibold">{GIFT_CLAIM_HOST}</strong> on a phone or computer.
          </li>
          <li>Enter your code.</li>
          <li>Start talking. Iloomi asks the first question.</li>
        </ol>

        <p className="mt-7 text-sm break-all text-muted">Or go straight to {claimUrl.replace(/^https?:\/\//, '')}</p>
      </div>
    </div>
  );
}
