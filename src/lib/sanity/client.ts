import { createClient, type SanityClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const rawApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const apiVersion =
  rawApiVersion && /^\d{4}-\d{2}-\d{2}$/.test(rawApiVersion)
    ? rawApiVersion
    : '2024-01-01';

function buildClient(): SanityClient {
  if (projectId && projectId !== 'undefined') {
    return createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    });
  }

  // Return a stub client when Sanity is not configured.
  // All pages have try/catch with placeholder fallbacks.
  return {
    fetch: () => Promise.resolve(null),
    config: () => ({ projectId: '', dataset, apiVersion }),
  } as unknown as SanityClient;
}

export const client = buildClient();
