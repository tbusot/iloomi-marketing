'use client';

import { useEffect, useId, useState, useSyncExternalStore, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  DELIVER_MAX_DAYS,
  GIFT_API_BASE,
  GIFT_PRICE,
  MESSAGE_MAX,
  NAME_MAX,
  addDays,
  toIsoDate,
  validateGift,
  type GiftCheckoutRequest,
  type GiftFormErrors,
} from '@/lib/gift';

/** Kept for the session, so a canceled checkout comes back to a filled-in form. */
const DRAFT_KEY = 'iloomi-gift-draft';

const emptyForm = (): GiftCheckoutRequest => ({
  buyerName: '',
  buyerEmail: '',
  recipientName: '',
  recipientEmail: '',
  deliverOn: toIsoDate(new Date()),
  message: '',
});

/** A canceled checkout comes back to the form as it was, with a date that's still valid. */
function initialForm(): GiftCheckoutRequest {
  const blank = emptyForm();
  if (typeof window === 'undefined') return blank;
  try {
    const saved = sessionStorage.getItem(DRAFT_KEY);
    if (!saved) return blank;
    const draft = { ...blank, ...JSON.parse(saved) } as GiftCheckoutRequest;
    if (draft.deliverOn < blank.deliverOn) draft.deliverOn = blank.deliverOn;
    return draft;
  } catch {
    return blank;
  }
}

const noSubscribe = () => () => {};

/**
 * Rendered only in the browser, so today's date is the buyer's (not the
 * server's) and a saved draft can fill it in without a hydration mismatch.
 */
export function GiftForm() {
  const inBrowser = useSyncExternalStore(noSubscribe, () => true, () => false);
  return inBrowser ? <GiftFormFields /> : <GiftFormPlaceholder />;
}

export function GiftFormPlaceholder() {
  return <div className="min-h-[720px] rounded-md bg-white shadow-[0_30px_80px_rgba(13,77,64,0.14)]" />;
}

function GiftFormFields() {
  const canceled = useSearchParams().get('canceled') === '1';
  const [form, setForm] = useState<GiftCheckoutRequest>(initialForm);
  const [errors, setErrors] = useState<GiftFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState('');
  const [range] = useState(() => {
    const today = new Date();
    return { min: toIsoDate(today), max: toIsoDate(addDays(today, DELIVER_MAX_DAYS)) };
  });

  useEffect(() => {
    // Coming back from Stripe with the back button restores this page from cache.
    const onShow = (event: PageTransitionEvent) => event.persisted && setSending(false);
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  const update = (key: keyof GiftCheckoutRequest) => (value: string) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (submitted) setErrors(validateGift(next));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setServerError('');
    const found = validateGift(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`gift-${first}`)?.focus();
      return;
    }

    const body: GiftCheckoutRequest = {
      buyerName: form.buyerName.trim(),
      buyerEmail: form.buyerEmail.trim(),
      recipientName: form.recipientName.trim(),
      recipientEmail: form.recipientEmail.trim(),
      deliverOn: form.deliverOn,
      message: form.message.trim(),
    };

    setSending(true);
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(body));
    } catch {
      // Fine without it.
    }
    try {
      const response = await fetch(`${GIFT_API_BASE}/giftCheckout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
      if (response.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      setServerError(data.error || 'Something went wrong on our side. Please try again in a minute.');
    } catch {
      setServerError('We couldn’t reach checkout. Check your connection and try again.');
    }
    setSending(false);
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-md bg-white p-7 shadow-[0_30px_80px_rgba(13,77,64,0.14)] md:p-10">
      {canceled && (
        <p role="status" className="mb-7 rounded-md bg-mint px-4.5 py-3.5 text-[15px] leading-relaxed text-dark-green">
          No charge was made. Your gift is still here whenever you’re ready.
        </p>
      )}

      <fieldset>
        <legend className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-taupe">From you</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="buyerName" label="Your name" error={errors.buyerName}>
            {(props) => (
              <input {...props} type="text" autoComplete="name" maxLength={NAME_MAX} value={form.buyerName} onChange={(e) => update('buyerName')(e.target.value)} />
            )}
          </Field>
          <Field id="buyerEmail" label="Your email" hint="For your receipt and the printable card." error={errors.buyerEmail}>
            {(props) => (
              <input {...props} type="email" autoComplete="email" inputMode="email" value={form.buyerEmail} onChange={(e) => update('buyerEmail')(e.target.value)} />
            )}
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-taupe">For them</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="recipientName" label="Their name" hint="As you’d write it on a card: Mom, Grandpa Joe." error={errors.recipientName}>
            {(props) => (
              <input {...props} type="text" autoComplete="off" maxLength={NAME_MAX} value={form.recipientName} onChange={(e) => update('recipientName')(e.target.value)} />
            )}
          </Field>
          <Field id="recipientEmail" label="Their email" hint="Where we send the gift." error={errors.recipientEmail}>
            {(props) => (
              <input {...props} type="email" autoComplete="off" inputMode="email" value={form.recipientEmail} onChange={(e) => update('recipientEmail')(e.target.value)} />
            )}
          </Field>
          <Field id="deliverOn" label="When should it arrive?" hint="We email them on this day. Up to 60 days ahead." error={errors.deliverOn}>
            {(props) => (
              <input {...props} type="date" min={range.min} max={range.max} value={form.deliverOn} onChange={(e) => update('deliverOn')(e.target.value)} />
            )}
          </Field>
        </div>
        <div className="mt-5">
          <Field
            id="message"
            label="A note from you"
            optional
            hint={`${form.message.length} of ${MESSAGE_MAX}`}
            error={errors.message}
          >
            {(props) => (
              <textarea
                {...props}
                rows={4}
                maxLength={MESSAGE_MAX}
                placeholder="I want to hear about the farm again, and this time I want to keep it."
                value={form.message}
                onChange={(e) => update('message')(e.target.value)}
                className={`${props.className} resize-y font-book text-lg leading-snug`}
              />
            )}
          </Field>
        </div>
      </fieldset>

      {serverError && (
        <p role="alert" className="mt-7 rounded-md border border-[#e5b9a8] bg-[#fbeee8] px-4.5 py-3.5 text-[15px] text-[#7a2e14]">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-8 inline-flex min-h-[56px] w-full items-center justify-center rounded-full bg-dark-green px-7 text-[17px] font-semibold text-white transition-colors hover:bg-dark-green/90 disabled:cursor-wait disabled:opacity-70"
      >
        {sending ? 'Taking you to checkout…' : `Continue to payment · $${GIFT_PRICE} + tax`}
      </button>
      <p className="mt-3.5 text-center text-sm text-muted">
        Sales tax is added at checkout where it applies. Secure payment with Stripe. Paid once, nothing renews.
      </p>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  optional?: boolean;
  error?: string;
  children: (props: {
    id: string;
    name: string;
    'aria-invalid': boolean;
    'aria-describedby'?: string;
    className: string;
  }) => ReactNode;
}

function Field({ id, label, hint, optional, error, children }: FieldProps) {
  const describedBy = useId();
  const inputId = `gift-${id}`;
  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-[15px] font-semibold text-ink">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children({
        id: inputId,
        name: id,
        'aria-invalid': Boolean(error),
        'aria-describedby': error || hint ? describedBy : undefined,
        className: `block w-full rounded-md border bg-off-white/60 px-3.5 py-3 text-base text-ink placeholder:text-taupe/80 focus:bg-white focus:outline-2 focus:outline-offset-0 focus:outline-dark-green ${
          error ? 'border-[#b8441f]' : 'border-[#d8d0c4]'
        }`,
      })}
      {(error || hint) && (
        <p id={describedBy} className={`mt-1.5 text-sm ${error ? 'text-[#a33a17]' : 'text-muted'}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
