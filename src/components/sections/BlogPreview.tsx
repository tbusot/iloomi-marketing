'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { urlFor } from '@/lib/sanity/image';
import type { BlogPost } from '@/types';

// Placeholder blog posts for initial render - matches iloomi.com articles
const placeholderPosts: (BlogPost & { image: string })[] = [
  {
    _id: '1',
    title: 'How to Write a Memoir in 5 Steps',
    slug: { current: 'how-to-write-memoir-5-steps' },
    excerpt:
      'A comprehensive guide to getting started with your memoir, from finding your voice to organizing your stories.',
    readingTime: 8,
    publishedAt: '2024-01-15',
    author: 'ILOOMI Team',
    image: '/images/blog-01.jpg',
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
    image: '/images/blog-02.jpg',
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
    image: '/images/blog-03.jpg',
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
    image: '/images/blog-04.jpg',
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
    image: '/images/blog-05.jpg',
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
    image: '/images/blog-06.jpg',
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
    image: '/images/blog-07.jpg',
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
    image: '/images/blog-08.jpg',
  },
];

interface BlogPreviewProps {
  posts?: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const displayPosts = posts && posts.length > 0 ? posts : placeholderPosts;

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto px-6">
        
        <div className="text-center mx-auto max-w-2xl  mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow-lg mb-4"
          >
            Resources
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading-h2 mb-4"
          >
            Looking for help to get started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-charcoal max-w-lg mx-auto mb-8"
          >
            Resources & guides to help you get started writing your memoir and biography.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 rounded-full border-2 border-dark-green text-dark-green bg-white font-medium hover:bg-dark-green hover:text-white transition-colors"
            >
              View More
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
            className="blog-preview-swiper"
          >
            {displayPosts.map((post) => {
              const blogImage = post.featuredImage
                ? urlFor(post.featuredImage).width(800).quality(80).url()
                : 'image' in post
                  ? (post as (typeof placeholderPosts)[number]).image
                  : null;

              return (
                <SwiperSlide key={post._id}>
                  <article className="group h-full">
                    <Link href={`/blog/${post.slug.current}`} className="block h-full">
                      {/* Blog image */}
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 relative">
                        {blogImage ? (
                          <Image
                            src={blogImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-purple/10 to-marine-teal/10" />
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-sm text-dark-green/50 mb-3">
                        {post.author && <span>{post.author}</span>}
                        {post.author && post.readingTime && <span>&bull;</span>}
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
              );
            })}
          </Swiper>
        </motion.div>
      </div>

{/* Swiper overrides are in globals.css */}
    </section>
  );
}
