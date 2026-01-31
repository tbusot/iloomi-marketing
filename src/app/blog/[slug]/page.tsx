import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { blogPostBySlugQuery, blogPostsQuery } from '@/lib/sanity/queries';
import type { BlogPost } from '@/types';

// Placeholder content for demo
const placeholderContent = [
  {
    _type: 'block',
    _key: '1',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Understanding your fertility window is crucial for anyone trying to conceive. This comprehensive guide will walk you through everything you need to know about identifying your most fertile days.',
      },
    ],
  },
  {
    _type: 'block',
    _key: '2',
    style: 'h2',
    children: [{ _type: 'span', text: 'What is the Fertile Window?' }],
  },
  {
    _type: 'block',
    _key: '3',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'The fertile window refers to the days in your menstrual cycle when pregnancy is possible. This window typically spans about 6 days: the 5 days before ovulation and the day of ovulation itself. Sperm can survive in the female reproductive tract for up to 5 days, while an egg is only viable for 12-24 hours after release.',
      },
    ],
  },
  {
    _type: 'block',
    _key: '4',
    style: 'h2',
    children: [{ _type: 'span', text: 'Signs of Ovulation' }],
  },
  {
    _type: 'block',
    _key: '5',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Your body provides several signs that ovulation is approaching or occurring. Learning to recognize these signs can help you identify your fertile window more accurately.',
      },
    ],
  },
  {
    _type: 'block',
    _key: '6',
    style: 'h3',
    children: [{ _type: 'span', text: 'Cervical Mucus Changes' }],
  },
  {
    _type: 'block',
    _key: '7',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'As you approach ovulation, your cervical mucus becomes clearer, more slippery, and stretchy – often described as having an "egg white" consistency. This type of mucus helps sperm survive and travel to meet the egg.',
      },
    ],
  },
  {
    _type: 'block',
    _key: '8',
    style: 'h3',
    children: [{ _type: 'span', text: 'Basal Body Temperature' }],
  },
  {
    _type: 'block',
    _key: '9',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Your basal body temperature (BBT) rises slightly after ovulation, typically by about 0.5°F. While this confirms ovulation has occurred, tracking BBT over several cycles can help you predict when ovulation is likely to occur.',
      },
    ],
  },
  {
    _type: 'block',
    _key: '10',
    style: 'h2',
    children: [{ _type: 'span', text: 'Using Iloomi to Track Your Cycle' }],
  },
  {
    _type: 'block',
    _key: '11',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Iloomi makes tracking your fertile window simple and accurate. By logging your symptoms, cervical mucus observations, and other data points, our AI learns your unique patterns and provides increasingly accurate predictions over time.',
      },
    ],
  },
];

const placeholderPosts: Record<string, BlogPost> = {
  'understanding-fertile-window': {
    _id: '1',
    title: 'Understanding Your Fertile Window',
    slug: { current: 'understanding-fertile-window' },
    excerpt: 'Learn how to identify your most fertile days and maximize your chances of conception.',
    content: placeholderContent,
    readingTime: 5,
    publishedAt: '2024-01-15',
    author: 'Dr. Sarah Chen',
  },
  'science-behind-cycle-tracking': {
    _id: '2',
    title: 'The Science Behind Cycle Tracking',
    slug: { current: 'science-behind-cycle-tracking' },
    excerpt: 'Discover how modern technology and ancient wisdom combine for accurate predictions.',
    content: placeholderContent,
    readingTime: 7,
    publishedAt: '2024-01-10',
    author: 'Emma Williams',
  },
  'nutrition-tips-cycle-phase': {
    _id: '3',
    title: 'Nutrition Tips for Each Cycle Phase',
    slug: { current: 'nutrition-tips-cycle-phase' },
    excerpt: 'Optimize your diet throughout your menstrual cycle for better energy and mood.',
    content: placeholderContent,
    readingTime: 6,
    publishedAt: '2024-01-05',
    author: 'Dr. Maria Lopez',
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await client.fetch(blogPostBySlugQuery, { slug });
    return post || placeholderPosts[slug] || null;
  } catch {
    return placeholderPosts[slug] || null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: 'Post Not Found | Iloomi' };
  }

  return {
    title: post.seoTitle || `${post.title} | Iloomi Blog`,
    description: post.seoDescription || post.excerpt,
  };
}

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(blogPostsQuery);
    return posts?.map((post: BlogPost) => ({ slug: post.slug.current })) || [];
  } catch {
    return Object.keys(placeholderPosts).map((slug) => ({ slug }));
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-bold text-dark-green mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-bold text-dark-green mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-dark-green/80 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-purple pl-6 my-6 italic text-dark-green/70">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-dark-green/80">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-dark-green/80">{children}</ol>
    ),
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-off-white pt-24">
      <article className="mx-auto max-w-3xl px-6 py-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-purple hover:text-purple/80 transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-dark-green/50 mb-4">
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            {post.publishedAt && post.readingTime && <span>•</span>}
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-dark-green mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-dark-green/60 mb-6">{post.excerpt}</p>
          )}

          {post.author && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center">
                <span className="text-purple font-medium">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-dark-green">{post.author}</p>
                <p className="text-sm text-dark-green/50">Author</p>
              </div>
            </div>
          )}
        </header>

        {/* Featured image */}
        {post.featuredImage ? (
          <figure className="mb-12">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <Image
                src={urlFor(post.featuredImage).width(1200).quality(85).url()}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            {post.photoCredit && (
              <figcaption className="mt-2 text-sm text-dark-green/40 text-right">
                Photo by{' '}
                {post.photoCreditLink ? (
                  <a
                    href={post.photoCreditLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-dark-green/60 transition-colors"
                  >
                    {post.photoCredit}
                  </a>
                ) : (
                  post.photoCredit
                )}
              </figcaption>
            )}
          </figure>
        ) : (
          <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-purple/10 to-marine-teal/10 mb-12" />
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {post.content && (
            <PortableText value={post.content} components={portableTextComponents} />
          )}
        </div>

        {/* Quote */}
        {post.quote && (
          <div className="my-16 text-center">
            <p className="rich-text-quote">&ldquo;{post.quote}&rdquo;</p>
            {post.quoteAuthor && (
              <p className="mt-4 text-dark-green/60 font-medium">{post.quoteAuthor}</p>
            )}
          </div>
        )}

        {/* Summary */}
        {post.summary && post.summary.length > 0 && (
          <div className="mt-12">
            <p className="section-eyebrow-md mb-4">Summary</p>
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.summary} components={portableTextComponents} />
            </div>
          </div>
        )}

        {/* Key Takeaways */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="mt-12">
            <p className="section-eyebrow-md mb-4">Key Takeaways</p>
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.keyTakeaways} components={portableTextComponents} />
            </div>
          </div>
        )}

        {/* Share & Navigation */}
        <footer className="mt-16 pt-8 border-t border-dark-green/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-dark-green/50">Share:</span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-dark-green/5 hover:bg-purple/10 hover:text-purple flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-dark-green/5 hover:bg-purple/10 hover:text-purple flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-dark-green/5 hover:bg-purple/10 hover:text-purple flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
            </div>
            <Link
              href="/blog"
              className="text-purple hover:text-purple/80 font-medium transition-colors"
            >
              View All Articles →
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
