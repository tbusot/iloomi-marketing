import { groq } from 'next-sanity';

// Blog queries
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    readingTime,
    publishedAt,
    author,
    tags,
    isFeatured,
    topic,
    seoTitle,
    seoDescription,
    photoCredit,
    photoCreditLink
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    content,
    readingTime,
    publishedAt,
    author,
    tags,
    isFeatured,
    topic,
    seoTitle,
    seoDescription,
    photoCredit,
    photoCreditLink,
    quote,
    quoteAuthor,
    summary,
    keyTakeaways
  }
`;

export const latestBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc)[0...5] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    readingTime,
    publishedAt,
    author,
    tags,
    isFeatured,
    topic
  }
`;

export const featuredBlogPostQuery = groq`
  *[_type == "blogPost" && isFeatured == true] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    readingTime,
    publishedAt,
    author,
    tags,
    topic,
    photoCredit,
    photoCreditLink
  }
`;

export const blogTopicsQuery = groq`
  array::unique(*[_type == "blogPost" && defined(topic)].topic)
`;

export const blogPostsByTopicQuery = groq`
  *[_type == "blogPost" && topic == $topic] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    readingTime,
    publishedAt,
    author,
    tags,
    isFeatured,
    topic,
    seoTitle,
    seoDescription,
    photoCredit,
    photoCreditLink
  }
`;

// FAQ queries
export const faqsQuery = groq`
  *[_type == "faq"] | order(category->order asc, order asc) {
    _id,
    question,
    answer,
    category->{
      _id,
      name,
      slug
    }
  }
`;

export const faqCategoriesQuery = groq`
  *[_type == "faqCategory"] | order(order asc) {
    _id,
    name,
    slug
  }
`;

export const faqsByCategoryQuery = groq`
  *[_type == "faq" && category._ref == $categoryId] | order(order asc) {
    _id,
    question,
    answer
  }
`;
