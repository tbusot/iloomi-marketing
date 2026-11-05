'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { VIDEO_BASE } from '@/lib/media';
import type { WatchVideo } from '@/lib/watch';

/**
 * A vertical video behind its poster. Tapping the poster starts it with sound;
 * from then on the browser's own controls take over.
 */
export function WatchPlayer({ video, priority = false }: { video: WatchVideo; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    // Play inside the tap itself, so the browser allows sound.
    videoRef.current?.play().catch(() => {});
  };

  return (
    <div className="relative mx-auto aspect-[9/16] w-[min(100%,400px,calc((100dvh-150px)*0.5625))] overflow-hidden rounded-[22px] bg-[#12101f] shadow-[0_30px_70px_rgba(13,77,64,0.28)]">
      <video
        ref={videoRef}
        src={`${VIDEO_BASE}/${video.video}`}
        poster={video.poster}
        aria-label={video.alt}
        controls={playing}
        playsInline
        preload="none"
        onPause={(e) => e.currentTarget.ended && setPlaying(false)}
        className="absolute inset-0 h-full w-full object-contain"
      />
      {!playing && (
        <button
          type="button"
          onClick={play}
          aria-label={`Play the video, ${video.durationLabel}, with sound`}
          className="group absolute inset-0 block"
        >
          <Image src={video.poster} alt="" fill priority={priority} sizes="400px" className="object-cover" />
          <span className="absolute top-1/2 left-1/2 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-off-white/92 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-105">
            <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="#0D4D40">
              <path d="M8 5.5v13l10.5-6.5z" />
            </svg>
          </span>
          <span className="absolute right-3.5 bottom-3.5 rounded-md bg-black/60 px-2 py-0.5 text-[13px] font-semibold text-white">
            {video.duration}
          </span>
        </button>
      )}
    </div>
  );
}
