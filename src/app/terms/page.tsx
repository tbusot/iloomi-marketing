import { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/layout/LegalPage';
import { COMPANY_MAILING_ADDRESS } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Iloomi',
  description: 'The terms that apply to your use of Iloomi.',
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" lastModified="November 2, 2026">
      <p>
        Please read our terms carefully. It is important to understand the steps that we take to
        secure your information and the people that you care about. Please direct questions to
        info@iloomi.com or use the Customer Support Chat feature in Settings inside the Iloomi App.
      </p>

      <h2>Acceptance of Terms</h2>
      <p>
        By accessing and using the Iloomi mobile and web applications (&quot;the App&quot;), you
        agree to comply with these Terms of Service. If you do not agree with any part of these
        terms, please refrain from using the App.
      </p>

      <h2>User Generated Content</h2>
      <p>
        The App allows users to upload video, photos, and audio content. By uploading content, you
        affirm that you have the necessary rights or permissions to do so and grant Iloomi a
        non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute the
        uploaded content for the purpose of providing and improving the App.
      </p>

      <h2>User Account Requirements</h2>
      <p>
        You must be at least 13 years old to use the App.
      </p>

      <h2>Chat Feature</h2>
      <p>
        The App includes a chat feature. Users are solely responsible for their interactions and
        communications through the chat feature and must comply with all applicable laws and
        guidelines. Iloomi reserves the right to monitor and moderate user communications to
        maintain a safe and respectful environment.
      </p>

      <h2>AI Features</h2>
      <p>
        The App uses artificial intelligence (AI) to talk with you, ask questions, write your
        stories, and read them aloud. AI-generated content can be inaccurate or incomplete, and it
        may not reflect exactly what you said. Please review your stories before you share them. You
        are responsible for the content you choose to share.
      </p>
      <p>
        To provide these features, your content is processed by third-party AI providers, as
        described in our <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>

      <h2>Subscriptions</h2>
      <p>
        Iloomi Pro is an optional paid subscription, billed monthly or yearly. The price and what is
        included are shown before you subscribe. Free features, including any free talking time, may
        have limits.
      </p>
      <p>
        Subscriptions renew automatically at the end of each billing period until you cancel. If you
        subscribe through the Apple App Store or Google Play, payment is charged to that account, and
        you manage or cancel your subscription in that account&apos;s settings. To avoid being
        charged for the next period, cancel at least 24 hours before the current period ends. If you
        subscribe on our website, you can manage or cancel your subscription in your billing
        settings.
      </p>
      <p>
        When you cancel, your subscription stays active until the end of the period you have paid
        for. Refunds for App Store and Google Play purchases are handled by Apple and Google under
        their policies. Except where required by law, payments made on our website are
        non-refundable.
      </p>
      <p>
        We may change subscription prices or what is included. We will give you notice of any price
        change, and it will apply from your next billing period.
      </p>

      <h2>Account Cancellation</h2>
      <p>
        You can delete your account at any time from Settings in the App. Deleting your account does
        not cancel a subscription purchased through the Apple App Store or Google Play, so please
        cancel it there as well.
      </p>

      <h2>Disclaimer of Warranties and Limitation of Liability</h2>
      <p>
        Iloomi provides the App on an &quot;as is&quot; basis, and makes no warranties or
        representations regarding its functionality, accuracy, or availability. Iloomi shall not be
        liable for any damages arising out of the use or inability to use the App.
      </p>

      <h2>Intellectual Property Rights</h2>
      <p>
        All intellectual property rights related to the App and its content are owned by Iloomi or
        its licensors. Users must respect these rights and refrain from unauthorized use, copying,
        or distribution of the App&apos;s content.
      </p>

      <h2>Governing Law and Jurisdiction</h2>
      <p>
        These Terms of Service shall be governed by and construed in accordance with the laws of the
        State of Delaware. Any disputes arising from or in connection with these terms shall be subject
        to the exclusive jurisdiction of the courts of Colorado.
      </p>

      <h2>Modifications to the Terms</h2>
      <p>
        Iloomi reserves the right to modify or update these Terms of Service at any time. Users will
        be notified of any material changes, and continued use of the App after such changes
        constitutes acceptance of the modified terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about these terms can go to info@iloomi.com, or by mail to{" "}
        {COMPANY_MAILING_ADDRESS}.
      </p>
    </LegalPage>
  );
}
