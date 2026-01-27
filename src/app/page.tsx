import { client } from '@/lib/sanity/client';
import { latestBlogPostsQuery, faqsQuery } from '@/lib/sanity/queries';
import {
  Hero,
  ProductFeatures,
  HowItWorks,
  BlogPreview,
  FAQSection,
  CTASection,
} from '@/components/sections';
import { Ticker } from '@/components/ui';
import type { BlogPost, FAQ } from '@/types';

async function getHomePageData() {
  try {
    const [blogPosts, faqs] = await Promise.all([
      client.fetch<BlogPost[]>(latestBlogPostsQuery),
      client.fetch<FAQ[]>(faqsQuery),
    ]);
    return { blogPosts, faqs };
  } catch {
    return { blogPosts: undefined, faqs: undefined };
  }
}

export default async function Home() {
  const { blogPosts, faqs } = await getHomePageData();

  return (
    <>
      <Hero />
      <Ticker />
      <ProductFeatures />
      <HowItWorks />
      <BlogPreview posts={blogPosts} />
      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
}
