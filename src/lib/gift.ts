/**
 * The $99 gift: one year of Iloomi Pro, bought on the web. Checkout and status
 * are Firebase Functions (giftCheckout, giftStatus); Stripe Checkout takes the
 * payment and sends the buyer back to /gift/thanks.
 */
export const GIFT_API_BASE =
  process.env.NEXT_PUBLIC_GIFT_API_BASE ?? 'https://us-central1-iloomi-b34f8.cloudfunctions.net';

export const GIFT_PRICE = 99;
export const GIFT_CURRENCY = 'USD';
export const GIFT_CLAIM_HOST = 'app.iloomi.com/gift';
export const GIFT_CLAIM_URL = `https://${GIFT_CLAIM_HOST}`;

/**
 * Gift codes are 8 letters and numbers, shown as XXXX-XXXX. Formats what's
 * typed or pasted so nobody has to type the dash.
 */
export function formatGiftCode(input: string) {
  const raw = input.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  return raw.length > 4 ? `${raw.slice(0, 4)}-${raw.slice(4)}` : raw;
}
export const GIFT_SUPPORT_EMAIL = 'support@iloomi.com';

export const NAME_MAX = 80;
export const MESSAGE_MAX = 500;
/** How far ahead the buyer can schedule the recipient's email. */
export const DELIVER_MAX_DAYS = 60;

export interface GiftCheckoutRequest {
  buyerName: string;
  buyerEmail: string;
  recipientName: string;
  recipientEmail: string;
  /** YYYY-MM-DD */
  deliverOn: string;
  message: string;
}

export type GiftStatusValue = 'pending' | 'paid' | 'claimed' | 'refunded';

export interface GiftStatus {
  status: GiftStatusValue;
  buyerName: string;
  recipientName: string;
  deliverOn: string;
  message?: string;
  /** XXXX-XXXX, present once paid. */
  code?: string;
  claimUrl?: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** A date as YYYY-MM-DD in the buyer's own time zone. */
export function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** Reads YYYY-MM-DD as a local date, so it doesn't slip a day west of UTC. */
export function parseIsoDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "today", or "Friday, November 27". */
export function describeDeliverOn(value: string) {
  const date = parseIsoDate(value);
  if (!date) return value;
  if (value === toIsoDate(new Date())) return 'today';
  return `on ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type GiftFormErrors = Partial<Record<keyof GiftCheckoutRequest, string>>;

export function validateGift(form: GiftCheckoutRequest, today = new Date()): GiftFormErrors {
  const errors: GiftFormErrors = {};
  const name = (value: string, missing: string) => {
    if (!value.trim()) return missing;
    if (value.trim().length > NAME_MAX) return `Keep it under ${NAME_MAX} characters.`;
    return undefined;
  };
  const email = (value: string, missing: string) => {
    if (!value.trim()) return missing;
    if (!EMAIL_PATTERN.test(value.trim())) return 'That email doesn’t look right.';
    return undefined;
  };

  errors.buyerName = name(form.buyerName, 'Add your name, so they know who it’s from.');
  errors.buyerEmail = email(form.buyerEmail, 'Add your email for the receipt and the card.');
  errors.recipientName = name(form.recipientName, 'Add their name.');
  errors.recipientEmail = email(form.recipientEmail, 'Add their email, so we can send the gift.');

  const min = toIsoDate(today);
  const max = toIsoDate(addDays(today, DELIVER_MAX_DAYS));
  if (!parseIsoDate(form.deliverOn)) errors.deliverOn = 'Pick a date.';
  else if (form.deliverOn < min) errors.deliverOn = 'Pick today or a day after.';
  else if (form.deliverOn > max) errors.deliverOn = `Pick a date in the next ${DELIVER_MAX_DAYS} days.`;

  if (form.message.length > MESSAGE_MAX) errors.message = `Keep the note under ${MESSAGE_MAX} characters.`;

  for (const key of Object.keys(errors) as (keyof GiftFormErrors)[]) {
    if (!errors[key]) delete errors[key];
  }
  return errors;
}

/**
 * Called once per gift on /gift/thanks, after giftStatus confirms payment.
 *
 * TODO(meta-pixel): the Meta Pixel isn't installed yet. Once it is, fire the
 * Purchase event here, deduped by the gift id:
 *   window.fbq?.('track', 'Purchase', { value: GIFT_PRICE, currency: GIFT_CURRENCY }, { eventID: giftId });
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function trackGiftPurchase(giftId: string) {}
