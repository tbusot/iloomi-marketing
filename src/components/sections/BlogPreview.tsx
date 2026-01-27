'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { BlogPost } from '@/types';

// Placeholder blog posts for initial render
const placeholderPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'Understanding Your Fertile Window',
    slug: { current: 'understanding-fertile-window' },
    excerpt:
      'Learn how to identify your most fertile days and maximize your chances of conception.',
    readingTime: 5,
    publishedAt: '2024-01-15',
    author: 'Dr. Sarah Chen',
  },
  {
    _id: '2',
    title: 'The Science Behind Cycle Tracking',
    slug: { current: 'science-behind-cycle-tracking' },
    excerpt:
      'Discover how modern technology and ancient wisdom combine for accurate predictions.',
    readingTime: 7,
    publishedAt: '2024-01-10',
    author: 'Emma Williams',
  },
  {
    _id: '3',
    title: 'Nutrition Tips for Each Cycle Phase',
    slug: { current: 'nutrition-tips-cycle-phase' },
    excerpt:
      'Optimize your diet throughout your menstrual cycle for better energy and mood.',
    readingTime: 6,
    publishedAt: '2024-01-05',
    author: 'Dr. Maria Lopez',
  },
];

interface BlogPreviewProps {
  posts?: BlogPost[];
}

export function BlogPreview({ posts = placeholderPosts }: BlogPreviewProps) {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-dark-green mb-4"
            >
              From Our <span className="text-purple">Blog</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-dark-green/60 max-w-lg"
            >
              Expert insights and tips for your fertility journey.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-purple font-medium hover:text-purple/80 transition-colors mt-4 md:mt-0"
            >
              View All Articles
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
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
                  {post.author && <span>{post.author}</span>}
                  {post.author && post.readingTime && <span>•</span>}
                  {post.readingTime && <span>{post.readingTime} min read</span>}
                </div>

                <h3 className="text-xl font-bold text-dark-green mb-3 group-hover:text-purple transition-colors">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-dark-green/60 line-clamp-2">{post.excerpt}</p>
                )}
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
