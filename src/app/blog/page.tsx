import { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { blogPostsQuery } from '@/lib/sanity/queries';
import type { BlogPost } from '@/types';

export const metadata: Metadata = {
  title: 'Blog | Iloomi',
  description: 'Expert insights and tips for your fertility journey from the Iloomi team.',
};

// Placeholder posts for when Sanity is not configured
const placeholderPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'Understanding Your Fertile Window',
    slug: { current: 'understanding-fertile-window' },
    excerpt: 'Learn how to identify your most fertile days and maximize your chances of conception.',
    readingTime: 5,
    publishedAt: '2024-01-15',
    author: 'Dr. Sarah Chen',
  },
  {
    _id: '2',
    title: 'The Science Behind Cycle Tracking',
    slug: { current: 'science-behind-cycle-tracking' },
    excerpt: 'Discover how modern technology and ancient wisdom combine for accurate predictions.',
    readingTime: 7,
    publishedAt: '2024-01-10',
    author: 'Emma Williams',
  },
  {
    _id: '3',
    title: 'Nutrition Tips for Each Cycle Phase',
    slug: { current: 'nutrition-tips-cycle-phase' },
    excerpt: 'Optimize your diet throughout your menstrual cycle for better energy and mood.',
    readingTime: 6,
    publishedAt: '2024-01-05',
    author: 'Dr. Maria Lopez',
  },
  {
    _id: '4',
    title: 'Managing PMS Symptoms Naturally',
    slug: { current: 'managing-pms-naturally' },
    excerpt: 'Natural remedies and lifestyle changes to help you feel your best all month long.',
    readingTime: 8,
    publishedAt: '2024-01-01',
    author: 'Dr. Sarah Chen',
  },
  {
    _id: '5',
    title: 'How Stress Affects Your Cycle',
    slug: { current: 'stress-affects-cycle' },
    excerpt: 'Understanding the connection between stress and menstrual health.',
    readingTime: 5,
    publishedAt: '2023-12-28',
    author: 'Emma Williams',
  },
  {
    _id: '6',
    title: 'Exercise and Your Menstrual Cycle',
    slug: { current: 'exercise-menstrual-cycle' },
    excerpt: 'How to sync your workouts with your cycle for optimal results.',
    readingTime: 6,
    publishedAt: '2023-12-20',
    author: 'Dr. Maria Lopez',
  },
];

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(blogPostsQuery);
    return posts?.length > 0 ? posts : placeholderPosts;
  } catch {
    return placeholderPosts;
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-off-white pt-24">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-dark-green mb-6">
            Our <span className="text-purple">Blog</span>
          </h1>
          <p className="text-xl text-dark-green/60 max-w-2xl mx-auto">
            Expert insights, tips, and stories to support your fertility journey.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post._id} className="group">
              <Link href={`/blog/${post.slug.current}`}>
                {/* Image placeholder */}
                <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-purple/10 to-marine-teal/10 mb-6 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 mx-auto mb-2 bg-purple/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-purple"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                          />
                        </svg>
                      </div>
                      <p className="text-dark-green/30 text-xs">Blog image</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-dark-green/50 mb-3">
                  {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                  {post.publishedAt && post.readingTime && <span>•</span>}
                  {post.readingTime && <span>{post.readingTime} min read</span>}
                </div>

                <h2 className="text-xl font-bold text-dark-green mb-3 group-hover:text-purple transition-colors">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="text-dark-green/60 line-clamp-2 mb-3">{post.excerpt}</p>
                )}

                {post.author && (
                  <p className="text-sm text-dark-green/50">By {post.author}</p>
                )}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
