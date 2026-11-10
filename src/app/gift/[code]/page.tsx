import { redirect } from 'next/navigation';
import { GIFT_CLAIM_URL, formatGiftCode } from '@/lib/gift';

/**
 * Codes are claimed on app.iloomi.com, but people type www.iloomi.com/gift/CODE
 * too. Send them on to the claim page instead of a 404.
 */
export default async function GiftCodeRedirect({ params }: { params: Promise<{ code: string }> }) {
  const code = formatGiftCode(decodeURIComponent((await params).code));
  redirect(code.length === 9 ? `${GIFT_CLAIM_URL}/${code}` : GIFT_CLAIM_URL);
}
