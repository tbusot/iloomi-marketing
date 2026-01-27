import type { PortableTextBlock } from '@portabletext/types';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  featuredImage?: SanityImage;
  content?: PortableTextBlock[];
  readingTime?: number;
  publishedAt?: string;
  author?: string;
}

export interface FAQCategory {
  _id: string;
  name: string;
  slug?: {
    current: string;
  };
  order?: number;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  category?: FAQCategory;
  order?: number;
}
