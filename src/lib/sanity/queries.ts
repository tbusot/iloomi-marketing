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
    author
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
    author
  }
`;

export const latestBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    readingTime,
    publishedAt,
    author
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
