'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { BlogPost } from '@/types';

// Placeholder blog posts for initial render - matches iloomi.com articles
const placeholderPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'How to Write a Memoir in 5 Steps',
    slug: { current: 'how-to-write-memoir-5-steps' },
    excerpt:
      'A comprehensive guide to getting started with your memoir, from finding your voice to organizing your stories.',
    readingTime: 8,
    publishedAt: '2024-01-15',
    author: 'ILOOMI Team',
  },
  {
    _id: '2',
    title: 'How to Write an Obituary in 5 Steps',
    slug: { current: 'how-to-write-obituary-5-steps' },
    excerpt:
      'Learn how to craft a meaningful obituary that honors a life well-lived and celebrates lasting memories.',
    readingTime: 6,
    publishedAt: '2024-01-10',
    author: 'ILOOMI Team',
  },
  {
    _id: '3',
    title: 'How to Organize a Life Story in 5 Steps',
    slug: { current: 'how-to-organize-life-story-5-steps' },
    excerpt:
      'Discover effective strategies for structuring your life experiences into a compelling narrative arc.',
    readingTime: 7,
    publishedAt: '2024-01-05',
    author: 'ILOOMI Team',
  },
  {
    _id: '4',
    title: 'How to Set Tone & Voice in Your Memoir',
    slug: { current: 'how-to-set-tone-voice-memoir' },
    excerpt:
      'Master the art of finding your authentic voice and setting the right tone for your life story.',
    readingTime: 6,
    publishedAt: '2024-01-03',
    author: 'ILOOMI Team',
  },
  {
    _id: '5',
    title: 'How to Collaborate on a Memoir in 5 Steps',
    slug: { current: 'how-to-collaborate-memoir-5-steps' },
    excerpt:
      'Tips for working with family members to create a richer, more complete narrative together.',
    readingTime: 5,
    publishedAt: '2024-01-01',
    author: 'ILOOMI Team',
  },
  {
    _id: '6',
    title: 'Crafting Your Life Tale: A Guide to Structuring Your Story',
    slug: { current: 'crafting-your-life-tale' },
    excerpt:
      'Learn the fundamentals of narrative structure and how to apply them to your own life story.',
    readingTime: 9,
    publishedAt: '2023-12-28',
    author: 'ILOOMI Team',
  },
  {
    _id: '7',
    title: 'Navigating Family Drama in Your Memoir',
    slug: { current: 'navigating-family-drama-memoir' },
    excerpt:
      'How to handle sensitive relationships and difficult memories with grace and honesty.',
    readingTime: 7,
    publishedAt: '2023-12-25',
    author: 'ILOOMI Team',
  },
  {
    _id: '8',
    title: 'Embracing Your Story: Silencing the Inner Critic',
    slug: { current: 'embracing-your-story-inner-critic' },
    excerpt:
      'Overcome self-doubt and imposter syndrome when writing your memoir.',
    readingTime: 6,
    publishedAt: '2023-12-20',
    author: 'ILOOMI Team',
  },
];

interface BlogPreviewProps {
  posts?: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const displayPosts = posts && posts.length > 0 ? posts : placeholderPosts;

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
              Looking for help to <span className="text-purple">get started?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-dark-green/60 max-w-lg"
            >
              Resources & guides to help you get started writing your memoir and biography.
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="blog-preview-swiper pb-14"
          >
            {displayPosts.map((post) => (
              <SwiperSlide key={post._id}>
                <article className="group h-full">
                  <Link href={`/blog/${post.slug.current}`} className="block h-full">
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
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style jsx global>{`
        .blog-preview-swiper .swiper-button-next,
        .blog-preview-swiper .swiper-button-prev {
          color: #0D4D40;
          background: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .blog-preview-swiper .swiper-button-next:after,
        .blog-preview-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        .blog-preview-swiper .swiper-pagination-bullet {
          background: #0D4D40;
          opacity: 0.3;
        }
        .blog-preview-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #7C3AED;
        }
      `}</style>
    </section>
  );
}
