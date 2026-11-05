/**
 * The narrated feature videos, one /watch page each. The win-back emails link
 * here, so keep the slugs stable. Videos are on media.iloomi.com (never
 * overwrite one: add a -vN); posters are in public/videos.
 */
export interface WatchVideo {
  slug: string;
  kicker: string;
  title: string;
  /** Second line of the headline, set in italic. */
  titleEm: string;
  summary: string;
  points: { title: string; body: string }[];
  video: string;
  poster: string;
  /** As shown on the play button, e.g. 0:42. */
  duration: string;
  /** Read out by screen readers, e.g. 42 seconds. */
  durationLabel: string;
  alt: string;
}

export const watchVideos: WatchVideo[] = [
  {
    slug: 'circle',
    kicker: 'Your Circle',
    title: 'Everyone in your stories,',
    titleEm: 'in one place.',
    summary:
      'As you talk, Iloomi notices who was there. The people you mention join your Circle, and the places, things and pets you loved come along as suggestions for you to keep.',
    points: [
      { title: 'It fills itself in', body: 'People are added as you mention them, and you can undo any of them.' },
      { title: 'Places, things and pets', body: 'The lake house, the old truck, the family dog. They arrive as suggestions; tap Add to keep one.' },
      { title: 'A page for each person', body: 'Everything you’ve shared about them, and every story they’re in.' },
      { title: 'Invite them in', body: 'Send them a link so they can read your stories or add their side.' },
    ],
    video: 'watch-circle-v1.mp4',
    poster: '/videos/watch-circle-poster.jpg',
    duration: '0:42',
    durationLabel: '42 seconds',
    alt: 'Video: as Walt talks, Lyle and Margaret join his Circle',
  },
  {
    slug: 'voice',
    kicker: 'Just talk',
    title: 'Talk with Iloomi',
    titleEm: 'like you would with a friend.',
    summary:
      'No typing and no blank page. Tell your story out loud. Iloomi listens, asks the next question, and learns as you go, so the next conversation picks up something you shared before.',
    points: [
      { title: 'It asks good questions', body: 'The kind a friend would ask, one at a time, at your pace.' },
      { title: 'It learns as you talk', body: 'Mention that Karen came three weeks early, and Iloomi remembers.' },
      { title: 'It writes the story', body: 'When you’re done, Iloomi writes it up the way you told it.' },
      { title: 'Try it free', body: 'Your first 10 minutes of talking are free. With Pro, talk as much as you like.' },
    ],
    video: 'watch-voice-v1.mp4',
    poster: '/videos/watch-voice-poster.jpg',
    duration: '0:38',
    durationLabel: '38 seconds',
    alt: 'Video: Walt tells Iloomi about the night Karen was born, out loud',
  },
  {
    slug: 'family',
    kicker: 'Tell it together',
    title: 'Every story',
    titleEm: 'has two sides.',
    summary:
      'Send a story to someone who was there. They open the link in their browser, answer a few of Iloomi’s questions, and their memories go into your story, with their name on it.',
    points: [
      { title: 'No app needed', body: 'They read and add from any browser, with a free Iloomi account.' },
      { title: 'Read, or add to it', body: 'You choose whether each person can read the story or add their side.' },
      { title: 'You decide what stays', body: 'You choose which of their memories go into the story.' },
      { title: 'They join your Circle', body: 'Everyone who accepts your invite becomes part of your Circle.' },
    ],
    video: 'watch-family-v1.mp4',
    poster: '/videos/watch-family-poster.jpg',
    duration: '0:39',
    durationLabel: '39 seconds',
    alt: 'Video: Karen opens Walt’s story in her browser and adds her side',
  },
];

export function getWatchVideo(slug: string) {
  return watchVideos.find((video) => video.slug === slug);
}
