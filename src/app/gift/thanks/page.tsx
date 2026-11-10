import type { Metadata } from 'next';
import { Suspense } from 'react';
import { GiftThanks } from '@/components/gift/GiftThanks';

export const metadata: Metadata = {
  title: 'Thank you for your gift | Iloomi',
  robots: { index: false, follow: false },
};

export default function GiftThanksPage() {
  return (
    <Suspense>
      <GiftThanks />
    </Suspense>
  );
}
