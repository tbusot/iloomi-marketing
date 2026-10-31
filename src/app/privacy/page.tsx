import { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Iloomi',
  description: 'How Iloomi collects, uses and protects your information.',
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastModified="October 30, 2026">
      <p>
        Please read our privacy policy carefully. It is important to understand the steps that we
        take to secure your information and the people that you care about. Please direct questions
        to info@iloomi.com or use the Customer Support Chat feature in Settings inside the Iloomi
        App.
      </p>

      <h2>1. Information We Collect</h2>
      <h3>1.1 Personal Information</h3>
      <p>
        When you create an account, we may collect your name, email address, date of birth, and
        other identifying information.
      </p>
      <p>
        If you contact us for support or feedback, we may collect the information you provide during
        those interactions.
      </p>

      <h3>1.2 User-Generated Content</h3>
      <p>
        The App allows you to create, upload and share content such as stories, photos, videos, and
        audio recordings, including what you say or type when you talk with Iloomi. This content may
        contain personal information, including information about other people.
      </p>
      <p>
        New stories are private by default, which means only you and the people you invite can see
        them. You choose who can see each story and can change this at any time. If you make a story
        available to your connections or to the public, the people you make it available to can see
        it, including any personal information it contains.
      </p>

      <h3>1.3 Usage and Device Information</h3>
      <p>
        We collect information about your use of the App, such as your interactions, preferences,
        and settings.
      </p>
      <p>
        We may collect device-specific information, including your device type, operating system,
        unique device identifiers, and mobile network information.
      </p>

      <h2>2. How We Use Your Information</h2>
      <h3>2.1 Provide &amp; Improve the App</h3>
      <p>
        We use your information to provide and maintain the functionality of the App, personalize
        your experience, and improve our services.
      </p>

      <h3>2.2 Communications</h3>
      <p>
        We may use your email address or other provided contact information to send you updates,
        announcements, or respond to your inquiries.
      </p>

      <h3>2.3 Analytics and Aggregated Data</h3>
      <p>
        We may analyze user behavior and usage patterns within the App to improve our services. This
        information is anonymized and aggregated to ensure individuals cannot be identified.
      </p>

      <h3>2.4 AI Features</h3>
      <p>
        Iloomi uses artificial intelligence (AI) to talk with you, ask questions, remember details
        from your stories, identify the people, places, things and pets you mention, write your
        stories, and read them aloud. To provide these features, we process what you say, type and
        upload, along with details you have shared in earlier stories.
      </p>

      <h2>3. Information Sharing &amp; Disclosures</h2>
      <h3>3.1 Service Providers</h3>
      <p>
        We may engage third-party service providers to assist us in providing and maintaining the
        App. These service providers are obligated to handle your information in a secure and
        confidential manner.
      </p>

      <h3>3.2 AI Service Providers</h3>
      <p>
        We send information to third-party AI providers so that our AI features can work. These
        providers currently include OpenAI (voice conversations, transcription, AI text features and
        narration), Anthropic (typed conversations and AI text features), Google (AI text features)
        and Fish Audio (narration).
      </p>
      <p>
        The information we send may include your messages, voice audio, transcripts, story text, the
        photos you share in a conversation, and details from your earlier stories. These providers
        process this information to deliver the feature you are using, under their own terms and
        privacy policies. We will ask for your permission before you first use these features, and
        before anything you say, type or share is sent to these providers.
      </p>

      <h3>3.3 Legal Compliances</h3>
      <p>
        We may disclose your information if required by law or in response to valid legal requests
        from government authorities or other third parties.
      </p>

      <h3>3.4 Business Transfers</h3>
      <p>
        In the event of a merger, acquisition, or sale of our assets, your information may be
        transferred as part of the transaction. We will notify you of any such change and provide
        choices regarding your information.
      </p>

      <h2>4. Data Retention and Deletion</h2>
      <p>
        We retain your personal information for as long as necessary to fulfill the purposes
        outlined in this Privacy Policy, unless a longer retention period is required or permitted
        by law.
      </p>

      <h2>5. Security</h2>
      <p>
        We implement reasonable security measures to protect your information from unauthorized
        access, disclosure, alteration, or destruction. However, no method of transmission over the
        internet or electronic storage is 100% secure.
      </p>

      <h2>6. Children&apos;s Policy</h2>
      <p>
        The App is not intended for children under the age of 13. If we become aware that we have
        collected personal information from a child under 13, we will take steps to remove that
        information.
      </p>

      <h2>7. Your Choices</h2>
      <p>
        You may review, update, or delete your personal information by accessing your account
        settings within the App. You may also contact us for assistance with any privacy-related
        inquiries.
      </p>

      <h2>8. Changes to this Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any material
        changes by posting the updated policy within the App or via other communication channels.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy Policy or our
        privacy practices, please contact us at info@iloomi.com.
      </p>
    </LegalPage>
  );
}
