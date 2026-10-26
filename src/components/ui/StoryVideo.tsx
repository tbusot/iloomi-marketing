'use client';

import { useEffect, useRef, useState } from 'react';

interface StoryVideoProps {
  /** Base name in /public/videos: {name}.mp4 and {name}-poster.jpg */
  name: string;
  /** Describes the video for screen readers. */
  label: string;
  className?: string;
}

/**
 * A vertical product video. It loops muted while on screen (browsers only
 * autoplay muted), and "Watch with sound" restarts it with the narration and
 * controls. Off screen it pauses, and nothing beyond metadata loads until it's
 * near the viewport.
 */
export function StoryVideo({ name, label, className = '' }: StoryVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [withSound, setWithSound] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React doesn't apply the muted attribute, and browsers only autoplay
    // muted video, so set it here before the first play().
    video.muted = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reducedMotion || !video.muted) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const playWithSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = false;
    video.loop = false;
    video.controls = true;
    setWithSound(true);
    video.play().catch(() => {});
  };

  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-dark-green shadow-2xl ${className}`}>
      <video
        ref={videoRef}
        className="block h-auto w-full aspect-[9/16]"
        poster={`/videos/${name}-poster.jpg`}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
      >
        <source src={`/videos/${name}.mp4`} type="video/mp4" />
      </video>

      {!withSound && (
        <button
          type="button"
          onClick={playWithSound}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-black/55 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch with sound
        </button>
      )}
    </div>
  );
}
