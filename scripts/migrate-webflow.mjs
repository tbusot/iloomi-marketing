/**
 * Webflow → Sanity migration script for iloomi.com articles
 *
 * Usage:
 *   node scripts/migrate-webflow.mjs            # migrate all articles
 *   node scripts/migrate-webflow.mjs --dry-run   # preview without writing to Sanity
 *   node scripts/migrate-webflow.mjs --slug how-to-write-a-memoir-in-5-steps  # migrate one article
 */

import { createClient } from '@sanity/client';
import * as cheerio from 'cheerio';
import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Config ───────────────────────────────────────────────────────────────────

const SANITY_TOKEN = readFileSync(
  resolve(__dirname, '../_references/assets/sanity/sanity-token-Claude-Editor.txt'),
  'utf-8',
).trim();

const sanity = createClient({
  projectId: 'zkgoltal',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN,
  useCdn: false,
});

const BASE_URL = 'https://www.iloomi.com';
const DELAY_MS = 1500; // polite delay between fetches

// ── All article slugs ────────────────────────────────────────────────────────

const ARTICLE_SLUGS = [
  'how-to-write-a-memoir-in-5-steps',
  'how-to-write-an-obituary-in-5-steps',
  'how-to-organize-a-life-story-in-5-steps',
  'how-to-set-tone-voice-in-your-memoir-in-5-steps',
  'how-to-collaborate-on-a-memoir-in-5-steps',
  'crafting-your-life-tale-a-guide-to-structuring-your-story-and-finding-narrative-flow',
  'crafting-resilience-navigating-the-depths-of-memoir-writing-without-losing-light',
  'navigating-family-drama-and-sensitive-relationships-in-your-memoir',
  'rediscovering-life-the-art-of-resurrecting-forgotten-moments-in-your-memoir',
  'unsure-if-your-story-matters-finding-relevance-significance-in-the-ordinary',
  'embracing-your-story-silencing-the-inner-critic-when-writing-your-memoir',
  'cultivating-narratives-creative-strategies-to-draft-your-experiences-into-complete-life-stories',
  'crafting-legacies-building-an-online-memoir-with-tools-like-iloomi',
  'memoirs-unbound-navigating-the-choice-between-hosting-and-printing--a-physical-artifact-for-now-or-forever-as-digital',
  'unveiling-narratives-navigating-the-choice-between-self-authoring-and-traditional-ghost-writing-for-biographies',
  'refining-brilliance-mastering-clarity-and-flow-in-your-story-editing',
  'crafting-cohesion-organizing-your-narrative-for-engagement-and-insight',
  'crafting-authenticity-unveiling-your-unique-voice-in-writing',
  'cultural-echoes-weaving-heritage-into-your-narrative-tapestry',
  'unveiling-connections-enriching-your-narrative-tapestry-with-friends-colleagues-and-mentors',
  'unveiling-narratives-masterful-techniques-for-interviewing-and-memoir-crafting',
  'ancestral-resonance-enriching-narratives-through-family-voices',
  'echoes-of-love-a-guide-on-capturing-the-voices-of-your-loved-ones',
  'family-chronicles-navigating-memoir-conflicts-with-healing-truths',
  'nurturing-narratives-writing-about-mental-health-with-empathy-and-awareness',
  'laughter-in-the-dark-infusing-humor-and-hope-into-adversity',
  'transformative-narratives-turning-negative-experiences-into-powerful-stories',
  'honesty-and-privacy-dance-navigating-the-delicate-balance-in-sharing-your-truth',
  'navigating-the-unseen-a-guide-on-writing-about-difficult-or-painful-experiences',
  'unveiling-the-power-within-crafting-an-authentic-narrative-through-vulnerability',
  'conversations-that-resonate-crafting-compelling-dialogue-to-bring-characters-to-life',
  'unleashing-creativity-techniques-for-engaging-storytelling-beyond-chronology',
  'discovering-your-essence-crafting-a-cohesive-memoir-through-central-themes',
  'how-to-tell-your-life-story-without-sounding-self-indulgent',
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const key = () => randomUUID().slice(0, 12);

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'iloomi-migration/1.0 (internal content migration)',
      Accept: 'text/html',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ── Image upload ─────────────────────────────────────────────────────────────

const imageCache = new Map(); // url → asset._id

async function uploadImage(imageUrl) {
  if (imageCache.has(imageUrl)) return imageCache.get(imageUrl);

  try {
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const filename = imageUrl.split('/').pop().split('?')[0] || 'image.jpg';

    const asset = await sanity.assets.upload('image', buffer, {
      filename,
      contentType,
    });

    imageCache.set(imageUrl, asset._id);
    return asset._id;
  } catch (err) {
    console.warn(`  ⚠ Failed to upload image: ${imageUrl} — ${err.message}`);
    return null;
  }
}

// ── HTML → PortableText ──────────────────────────────────────────────────────

function htmlToPortableText($, $container) {
  const blocks = [];

  function extractSpans($el) {
    const spans = [];
    const markDefs = [];

    function walk(node, activeMarks = []) {
      if (node.type === 'text') {
        const text = node.data;
        if (text) {
          spans.push({ _type: 'span', _key: key(), text, marks: [...activeMarks] });
        }
        return;
      }

      if (node.type !== 'tag') return;

      const $node = $(node);
      const tag = node.tagName?.toLowerCase();
      let marks = [...activeMarks];

      if (tag === 'strong' || tag === 'b') {
        marks.push('strong');
      } else if (tag === 'em' || tag === 'i') {
        marks.push('em');
      } else if (tag === 'u') {
        marks.push('underline');
      } else if (tag === 'a') {
        const href = $node.attr('href');
        if (href) {
          const markKey = key();
          markDefs.push({ _type: 'link', _key: markKey, href });
          marks.push(markKey);
        }
      }

      $node.contents().each((_, child) => walk(child, marks));
    }

    $el.contents().each((_, child) => walk(child));

    // Ensure at least one span
    if (spans.length === 0) {
      spans.push({ _type: 'span', _key: key(), text: '', marks: [] });
    }

    return { spans, markDefs };
  }

  function processElement(el) {
    const $el = $(el);
    const tag = el.tagName?.toLowerCase();

    if (!tag) return;

    // Skip empty elements
    const text = $el.text().trim();

    if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4') {
      if (!text) return;
      const { spans, markDefs } = extractSpans($el);
      blocks.push({
        _type: 'block',
        _key: key(),
        style: tag,
        markDefs,
        children: spans,
      });
    } else if (tag === 'p') {
      // Check if this paragraph only contains an image
      const $img = $el.find('img');
      if ($img.length > 0 && !text.replace(/\s/g, '')) {
        const src = $img.attr('src') || $img.attr('data-src');
        if (src) {
          blocks.push({ _type: '__pendingImage', _key: key(), src: resolveUrl(src) });
        }
        return;
      }
      // Skip empty paragraphs and zero-width joiners
      if (!text || text === '\u200D' || text === '‍') return;
      const { spans, markDefs } = extractSpans($el);
      blocks.push({
        _type: 'block',
        _key: key(),
        style: 'normal',
        markDefs,
        children: spans,
      });
    } else if (tag === 'blockquote') {
      if (!text) return;
      const { spans, markDefs } = extractSpans($el);
      blocks.push({
        _type: 'block',
        _key: key(),
        style: 'blockquote',
        markDefs,
        children: spans,
      });
    } else if (tag === 'ul' || tag === 'ol') {
      const listItem = tag === 'ul' ? 'bullet' : 'number';
      $el.children('li').each((_, li) => {
        const liText = $(li).text().trim();
        if (!liText) return;
        const { spans, markDefs } = extractSpans($(li));
        blocks.push({
          _type: 'block',
          _key: key(),
          style: 'normal',
          listItem,
          level: 1,
          markDefs,
          children: spans,
        });
      });
    } else if (tag === 'figure') {
      const $img = $el.find('img');
      const src = $img.attr('src') || $img.attr('data-src');
      if (src) {
        blocks.push({ _type: '__pendingImage', _key: key(), src: resolveUrl(src) });
      }
    } else if (tag === 'img') {
      const src = $el.attr('src') || $el.attr('data-src');
      if (src) {
        blocks.push({ _type: '__pendingImage', _key: key(), src: resolveUrl(src) });
      }
    } else if (tag === 'div') {
      // Recurse into divs
      $el.children().each((_, child) => processElement(child));
    }
  }

  $container.children().each((_, el) => processElement(el));
  return blocks;
}

function resolveUrl(url) {
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('/')) return `${BASE_URL}${url}`;
  if (url.startsWith('http')) return url;
  return `${BASE_URL}/${url}`;
}

// ── Upload pending images in PortableText blocks ─────────────────────────────

async function resolvePendingImages(blocks) {
  const resolved = [];
  for (const block of blocks) {
    if (block._type === '__pendingImage') {
      const assetId = await uploadImage(block.src);
      if (assetId) {
        resolved.push({
          _type: 'image',
          _key: block._key,
          asset: { _type: 'reference', _ref: assetId },
        });
      }
    } else {
      resolved.push(block);
    }
  }
  return resolved;
}

// ── Parse a single article page ──────────────────────────────────────────────

function parseArticle(html, slug) {
  const $ = cheerio.load(html);

  // ── JSON-LD structured data ──
  let jsonLd = {};
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html());
      // Handle array wrapper (Webflow outputs [{ "@type": "BlogPosting", ... }])
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item['@type'] === 'BlogPosting') {
          jsonLd = item;
          break;
        }
        if (item['@graph']) {
          const post = item['@graph'].find((n) => n['@type'] === 'BlogPosting');
          if (post) { jsonLd = post; break; }
        }
      }
    } catch {}
  });

  // ── Title ──
  const title =
    $('h1').first().text().trim() ||
    jsonLd.headline ||
    $('meta[property="og:title"]').attr('content') ||
    '';

  // ── Excerpt / description ──
  const excerpt =
    jsonLd.abstract ||
    jsonLd.description ||
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
    '';

  // ── SEO meta ──
  const seoTitle = $('meta[property="og:title"]').attr('content') || '';
  const seoDescription =
    $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    '';

  // ── Author ──
  const author = 'Iloomi';

  // ── Published date ──
  let publishedAt = jsonLd.datePublished || '';
  if (publishedAt) {
    // Try to parse and normalize to ISO
    const d = new Date(publishedAt);
    if (!isNaN(d.getTime())) {
      publishedAt = d.toISOString();
    }
  }

  // ── Reading time ──
  let readingTime = null;
  const readingMatch = $('body').text().match(/(\d+)\s*min\s*read/i);
  if (readingMatch) readingTime = parseInt(readingMatch[1], 10);

  // ── Featured image ──
  const featuredImageUrl =
    jsonLd.image?.[0] ||
    jsonLd.image ||
    $('meta[property="og:image"]').attr('content') ||
    '';

  // ── Photo credit ──
  let photoCredit = '';
  let photoCreditLink = '';
  // Look for photographer credit pattern: usually near the top
  $('a').each((_, el) => {
    const $a = $(el);
    const href = $a.attr('href') || '';
    const text = $a.text().trim();
    // Webflow often has photo credit as a link to unsplash or instagram
    if (
      (href.includes('unsplash.com') || href.includes('instagram.com')) &&
      text &&
      !photoCredit
    ) {
      photoCredit = text;
      photoCreditLink = href;
    }
  });
  // Also check for explicit "Photo by" or "Photographer:" text
  if (!photoCredit) {
    const bodyText = $('body').text();
    const creditMatch = bodyText.match(/(?:Photo(?:grapher)?(?:\s*:|\s+by)\s*)([^\n,]+)/i);
    if (creditMatch) photoCredit = creditMatch[1].trim();
  }

  // ── Tags ──
  const tags = [];
  $('a[href*="/tag/"], a[href*="/tags/"]').each((_, el) => {
    const text = $(el).text().trim();
    if (text && !tags.includes(text)) tags.push(text);
  });

  // ── Topic / category ──
  let topic = '';
  $('a[href*="/topic/"], a[href*="/category/"]').each((_, el) => {
    const text = $(el).text().trim();
    if (text && !topic) topic = text;
  });
  // Try breadcrumb or explicit category links
  if (!topic) {
    $('a[href*="/articles"]').each((_, el) => {
      const text = $(el).text().trim();
      if (text && text !== 'Articles' && text !== 'All' && !topic) {
        topic = text;
      }
    });
  }

  // ── Body content, summary, and key takeaways ──
  // Webflow splits article content across multiple .article-body divs,
  // each containing a .w-richtext. We parse them all, routing blocks
  // that fall under "Summary" or "Key Takeaways" h2s into separate arrays.
  const contentBlocks = [];
  const summaryBlocks = [];
  const keyTakeawaysBlocks = [];
  const skipHeadings = ['frequently asked questions', 'related articles'];

  $('[class*="article-body"]').each((_, bodyEl) => {
    const $bodyEl = $(bodyEl);

    // Check if this section starts with a heading we should skip entirely
    const firstHeading = $bodyEl.find('h1, h2').first().text().trim().toLowerCase();
    if (skipHeadings.some((h) => firstHeading.includes(h))) return;

    // Check if this section contains Summary / Key Takeaways
    const hasSummary = $bodyEl.find('h2').toArray().some(
      (h) => $(h).text().trim().toLowerCase() === 'summary',
    );
    const hasKeyTakeaways = $bodyEl.find('h2').toArray().some(
      (h) => $(h).text().trim().toLowerCase() === 'key takeaways',
    );

    if (hasSummary || hasKeyTakeaways) {
      // Parse all blocks from this section, then split by heading
      const $richTexts = $bodyEl.find('.w-richtext');
      const allBlocks = [];
      if ($richTexts.length > 0) {
        $richTexts.each((_, rt) => {
          allBlocks.push(...htmlToPortableText($, $(rt)));
        });
      } else {
        allBlocks.push(...htmlToPortableText($, $bodyEl));
      }

      // Split blocks into summary and key takeaways by finding h2 markers
      let target = contentBlocks; // default to main content
      for (const block of allBlocks) {
        if (block._type === 'block' && (block.style === 'h2' || block.style === 'h1')) {
          const text = (block.children || []).map((c) => c.text || '').join('').trim().toLowerCase();
          if (text === 'summary') {
            target = summaryBlocks;
            continue; // skip the h2 itself
          } else if (text === 'key takeaways') {
            target = keyTakeawaysBlocks;
            continue; // skip the h2 itself
          }
        }
        target.push(block);
      }
    } else {
      // Regular content section
      const $richTexts = $bodyEl.find('.w-richtext');
      if ($richTexts.length > 0) {
        $richTexts.each((_, rt) => {
          contentBlocks.push(...htmlToPortableText($, $(rt)));
        });
      } else {
        contentBlocks.push(...htmlToPortableText($, $bodyEl));
      }
    }
  });

  // ── Quote + quote author (testimonial section) ──
  let quote = '';
  let quoteAuthor = '';

  // The testimonial is in a .w-dyn-item that contains .rich-text-quote
  // and a sibling .font-600 for the author name
  $('.w-dyn-item').each((_, item) => {
    const $item = $(item);
    const $quoteEl = $item.find('.rich-text-quote');
    if ($quoteEl.length && !quote) {
      quote = $quoteEl.text().trim().replace(/^[""\u201C]+|[""\u201D]+$/g, '').trim();
      // Author is in a sibling .font-600 element
      const authorText = $item.find('.font-600').text().trim();
      if (authorText) quoteAuthor = authorText;
    }
  });

  return {
    title,
    slug,
    excerpt,
    seoTitle,
    seoDescription,
    author,
    publishedAt,
    readingTime,
    featuredImageUrl: resolveUrl(featuredImageUrl),
    photoCredit,
    photoCreditLink,
    tags,
    topic,
    quote,
    quoteAuthor,
    contentBlocks,
    summaryBlocks,
    keyTakeawaysBlocks,
  };
}

// ── Build Sanity document ────────────────────────────────────────────────────

async function buildSanityDocument(parsed) {
  // Upload featured image
  let featuredImageRef = null;
  if (parsed.featuredImageUrl) {
    featuredImageRef = await uploadImage(parsed.featuredImageUrl);
  }

  // Resolve inline images in body content, summary, and key takeaways
  const content = await resolvePendingImages(parsed.contentBlocks);
  const summary = await resolvePendingImages(parsed.summaryBlocks);
  const keyTakeaways = await resolvePendingImages(parsed.keyTakeawaysBlocks);

  const doc = {
    _type: 'blogPost',
    title: parsed.title,
    slug: { _type: 'slug', current: parsed.slug },
    excerpt: parsed.excerpt || undefined,
    seoTitle: parsed.seoTitle || undefined,
    seoDescription: parsed.seoDescription || undefined,
    author: 'Iloomi',
    publishedAt: parsed.publishedAt || undefined,
    readingTime: parsed.readingTime || undefined,
    tags: parsed.tags.length > 0 ? parsed.tags : undefined,
    topic: parsed.topic || undefined,
    isFeatured: false,
    photoCredit: parsed.photoCredit || undefined,
    photoCreditLink: parsed.photoCreditLink || undefined,
    quote: parsed.quote || undefined,
    quoteAuthor: parsed.quoteAuthor || undefined,
    content,
    summary: summary.length > 0 ? summary : undefined,
    keyTakeaways: keyTakeaways.length > 0 ? keyTakeaways : undefined,
  };

  if (featuredImageRef) {
    doc.featuredImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: featuredImageRef },
    };
  }

  return doc;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const singleSlugIdx = args.indexOf('--slug');
  const singleSlug = singleSlugIdx !== -1 ? args[singleSlugIdx + 1] : null;

  const slugs = singleSlug ? [singleSlug] : ARTICLE_SLUGS;

  console.log(`\n🚀 Webflow → Sanity migration`);
  console.log(`   Articles: ${slugs.length}`);
  console.log(`   Mode: ${dryRun ? 'DRY RUN (no writes)' : 'LIVE'}\n`);

  const results = { success: 0, failed: 0, errors: [] };

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const url = `${BASE_URL}/articles/${slug}`;
    console.log(`[${i + 1}/${slugs.length}] ${slug}`);

    try {
      // Fetch page
      console.log(`  Fetching...`);
      const html = await fetchPage(url);

      // Parse
      console.log(`  Parsing...`);
      const parsed = parseArticle(html, slug);
      console.log(`  Title: "${parsed.title}"`);
      console.log(`  Topic: ${parsed.topic || '(none)'}`);
      console.log(`  Tags: ${parsed.tags.join(', ') || '(none)'}`);
      console.log(`  Content blocks: ${parsed.contentBlocks.length}`);
      console.log(`  Summary blocks: ${parsed.summaryBlocks.length}`);
      console.log(`  Key Takeaways blocks: ${parsed.keyTakeawaysBlocks.length}`);
      console.log(`  Photo credit: ${parsed.photoCredit || '(none)'}`);
      console.log(`  Quote: ${parsed.quote ? parsed.quote.slice(0, 60) + '...' : '(none)'}`);
      console.log(`  Quote author: ${parsed.quoteAuthor || '(none)'}`);

      if (dryRun) {
        console.log(`  ✓ DRY RUN — would create document\n`);
        results.success++;
        await sleep(300);
        continue;
      }

      // Build and push to Sanity
      console.log(`  Uploading images & building document...`);
      const doc = await buildSanityDocument(parsed);

      // Check if document already exists (by slug)
      const existing = await sanity.fetch(
        `*[_type == "blogPost" && slug.current == $slug][0]._id`,
        { slug },
      );

      if (existing) {
        console.log(`  Updating existing document ${existing}...`);
        await sanity.patch(existing).set(doc).commit();
      } else {
        console.log(`  Creating new document...`);
        await sanity.create(doc);
      }

      console.log(`  ✓ Done\n`);
      results.success++;
    } catch (err) {
      console.error(`  ✗ FAILED: ${err.message}\n`);
      results.failed++;
      results.errors.push({ slug, error: err.message });
    }

    // Polite delay
    if (i < slugs.length - 1) await sleep(DELAY_MS);
  }

  // Summary
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✓ Success: ${results.success}`);
  console.log(`✗ Failed:  ${results.failed}`);
  if (results.errors.length > 0) {
    console.log(`\nErrors:`);
    results.errors.forEach(({ slug, error }) => {
      console.log(`  - ${slug}: ${error}`);
    });
  }
  console.log();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
