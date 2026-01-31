import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { blogPostsQuery } from '@/lib/sanity/queries';
import type { BlogPost } from '@/types';

export const metadata: Metadata = {
  title: 'Resources & Articles | Iloomi',
  description:
    'Our blog is an online library committed to your memoir writing.',
};

// Placeholder posts for when Sanity is not configured
const placeholderPosts: (BlogPost & { image: string; category: string })[] = [
  {
    _id: '1',
    title: 'How to Write a Memoir in 5 Steps',
    slug: { current: 'how-to-write-memoir-5-steps' },
    excerpt:
      'A comprehensive guide to getting started with your memoir, from finding your voice to organizing your stories.',
    readingTime: 8,
    publishedAt: '2024-02-15',
    author: 'ILOOMI Team',
    image: '/images/blog-01.jpg',
    category: 'How-to Guides',
  },
  {
    _id: '2',
    title: 'How to Write an Obituary in 5 Steps',
    slug: { current: 'how-to-write-obituary-5-steps' },
    excerpt:
      'Learn how to craft a meaningful obituary that honors a life well-lived and celebrates lasting memories.',
    readingTime: 6,
    publishedAt: '2024-02-09',
    author: 'ILOOMI Team',
    image: '/images/blog-02.jpg',
    category: 'How-to Guides',
  },
  {
    _id: '3',
    title: 'How to Organize a Life Story in 5 Steps',
    slug: { current: 'how-to-organize-life-story-5-steps' },
    excerpt:
      'Discover effective strategies for structuring your life experiences into a compelling narrative arc.',
    readingTime: 7,
    publishedAt: '2024-02-01',
    author: 'ILOOMI Team',
    image: '/images/blog-03.jpg',
    category: 'How-to Guides',
  },
  {
    _id: '4',
    title: 'How to Set Tone & Voice in Your Memoir',
    slug: { current: 'how-to-set-tone-voice-memoir' },
    excerpt:
      'Master the art of finding your authentic voice and setting the right tone for your life story.',
    readingTime: 6,
    publishedAt: '2024-01-25',
    author: 'ILOOMI Team',
    image: '/images/blog-04.jpg',
    category: 'Memoirs',
  },
  {
    _id: '5',
    title: 'How to Collaborate on a Memoir in 5 Steps',
    slug: { current: 'how-to-collaborate-memoir-5-steps' },
    excerpt:
      'Tips for working with family members to create a richer, more complete narrative together.',
    readingTime: 5,
    publishedAt: '2024-01-20',
    author: 'ILOOMI Team',
    image: '/images/blog-05.jpg',
    category: 'Collaboration',
  },
  {
    _id: '6',
    title: 'Crafting Your Life Tale: A Guide to Structuring Your Story',
    slug: { current: 'crafting-your-life-tale' },
    excerpt:
      'Learn the fundamentals of narrative structure and how to apply them to your own life story.',
    readingTime: 9,
    publishedAt: '2024-01-15',
    author: 'ILOOMI Team',
    image: '/images/blog-06.jpg',
    category: 'Life Stories',
  },
  {
    _id: '7',
    title: 'Navigating Family Drama in Your Memoir',
    slug: { current: 'navigating-family-drama-memoir' },
    excerpt:
      'How to handle sensitive relationships and difficult memories with grace and honesty.',
    readingTime: 7,
    publishedAt: '2024-01-10',
    author: 'ILOOMI Team',
    image: '/images/blog-07.jpg',
    category: 'Memoirs',
  },
  {
    _id: '8',
    title: 'Embracing Your Story: Silencing the Inner Critic',
    slug: { current: 'embracing-your-story-inner-critic' },
    excerpt:
      'Overcome self-doubt and imposter syndrome when writing your memoir.',
    readingTime: 6,
    publishedAt: '2024-01-05',
    author: 'ILOOMI Team',
    image: '/images/blog-08.jpg',
    category: 'Life Stories',
  },
  {
    _id: '9',
    title: 'Preserving Family Recipes as Memoir Chapters',
    slug: { current: 'preserving-family-recipes-memoir' },
    excerpt:
      'How to weave your family\'s culinary traditions into a meaningful memoir narrative.',
    readingTime: 5,
    publishedAt: '2023-12-28',
    author: 'ILOOMI Team',
    image: '/images/blog-09.jpg',
    category: 'Preservation',
  },
  {
    _id: '10',
    title: 'The Power of Photos in Memoir Writing',
    slug: { current: 'power-of-photos-memoir-writing' },
    excerpt:
      'Using photographs to unlock forgotten memories and bring your story to life.',
    readingTime: 6,
    publishedAt: '2023-12-20',
    author: 'ILOOMI Team',
    image: '/images/blog-10.jpg',
    category: 'Preservation',
  },
  {
    _id: '11',
    title: 'Writing Your Parents\' Story Before It\'s Too Late',
    slug: { current: 'writing-parents-story' },
    excerpt:
      'A heartfelt guide to capturing your parents\' life stories while you still can.',
    readingTime: 8,
    publishedAt: '2023-12-15',
    author: 'ILOOMI Team',
    image: '/images/blog-11.jpg',
    category: 'Collaboration',
  },
  {
    _id: '12',
    title: 'From Memories to Manuscript: Your First Draft',
    slug: { current: 'memories-to-manuscript-first-draft' },
    excerpt:
      'Practical steps for turning your collection of memories into a cohesive first draft.',
    readingTime: 7,
    publishedAt: '2023-12-10',
    author: 'ILOOMI Team',
    image: '/images/blog-12.jpg',
    category: 'How-to Guides',
  },
];

const categories = [
  'All',
  'How-to Guides',
  'Memoirs',
  'Collaboration',
  'Life Stories',
  'Preservation',
  'Miscellaneous',
];

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(blogPostsQuery);
    return posts?.length > 0 ? posts : placeholderPosts;
  } catch {
    return placeholderPosts;
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [featuredPost, ...gridPosts] = posts;

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-heading-h1">
            Resources & Articles
          </h1>
          <p className="text-lg text-charcoal max-w-2xl mx-auto">
            Our blog is an online library committed to your memoir writing.
          </p>
        </div>

        {/* Featured Article */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug.current}`} className="block mb-12 group">
            <div className="relative aspect-[16/7] rounded-2xl overflow-hidden">
              <Image
                src={
                  featuredPost.featuredImage
                    ? urlFor(featuredPost.featuredImage).width(1400).quality(85).url()
                    : 'image' in featuredPost
                      ? (featuredPost as (typeof placeholderPosts)[number]).image
                      : '/images/blog-01.jpg'
                }
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-10">
                {(featuredPost.topic || ('category' in featuredPost)) && (
                  <span className="article-tile-eyebrow-featured text-white mb-2 block">
                    {featuredPost.topic || (featuredPost as (typeof placeholderPosts)[number]).category}
                  </span>
                )}
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                  {featuredPost.title}
                </h2>
                {featuredPost.readingTime && (
                  <span className="text-sm text-white/70">{featuredPost.readingTime} min read</span>
                )}
              </div>
            </div>
          </Link>
        )}

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors ${
                i === 0
                  ? 'bg-dark-green text-white'
                  : 'bg-off-white text-dark-green/60 hover:bg-dark-green/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {gridPosts.map((post) => {
            const postImage = post.featuredImage
              ? urlFor(post.featuredImage).width(800).quality(80).url()
              : 'image' in post
                ? (post as (typeof placeholderPosts)[number]).image
                : null;
            const postCategory =
              post.topic ||
              ('category' in post
                ? (post as (typeof placeholderPosts)[number]).category
                : '');

            return (
              <article key={post._id} className="article-tile group">
                <Link href={`/blog/${post.slug.current}`} className="block">
                  {/* Image */}
                  <div className="article-tile-img rounded-xl overflow-hidden mb-4">
                    {postImage ? (
                      <Image
                        src={postImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple/10 to-marine-teal/10" />
                    )}
                  </div>

                  {/* Category eyebrow */}
                  {postCategory && (
                    <p className="article-tile-eyebrow mb-2">{postCategory}</p>
                  )}

                  {/* Title */}
                  <h2 className="article-tile-heading text-dark-green mb-2 group-hover:text-purple transition-colors">
                    {post.title}
                  </h2>

                  {/* Synopsis */}
                  {post.excerpt && (
                    <p className="article-tile-synopsis text-charcoal line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
