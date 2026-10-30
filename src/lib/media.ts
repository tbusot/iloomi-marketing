/**
 * Videos are hosted on the iloomi-media Firebase Hosting site; see media/README.md.
 * Set NEXT_PUBLIC_VIDEO_BASE to serve media/public locally.
 */
export const VIDEO_BASE = process.env.NEXT_PUBLIC_VIDEO_BASE ?? 'https://media.iloomi.com/videos';
