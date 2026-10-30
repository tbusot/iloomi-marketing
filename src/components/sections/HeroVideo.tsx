'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { VIDEO_BASE } from '@/lib/media';

const POSTER = '/images/family-walkway.webp';

/** The play pill: a thumbnail with a play mark, the label and the running time. */
function WatchPillBody() {
  return (
    <>
      <span className="relative block h-11 w-16 shrink-0 overflow-hidden rounded-full sm:h-14 sm:w-23">
        <Image src={POSTER} alt="" fill sizes="92px" className="object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-purple/55">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M8 5v14l11.5-7z" />
          </svg>
        </span>
      </span>
      <span className="whitespace-nowrap">Watch how it works</span>
      <span className="hidden font-normal text-[#cfc4b6] sm:inline">1:41</span>
    </>
  );
}

/**
 * The explainer, as a card that straddles the bottom of the hero. Once the
 * card scrolls out of view, a pill in the corner keeps it one tap away: it
 * scrolls back to the card and starts the video with sound.
 */
export function HeroVideo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pastCard, setPastCard] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    // Only once the card has gone off the top, not before it's been seen.
    const observer = new IntersectionObserver(([entry]) =>
      setPastCard(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setPlaying(true);
    // Play inside the tap itself, so the browser allows sound.
    video.play().catch(() => {});
  };

  const playFromPill = () => {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    play();
  };

  const showPill = pastCard && !dismissed;

  return (
    <>
      <div ref={cardRef} className="relative mx-auto -mt-[120px] max-w-[960px] px-4 sm:px-6 md:-mt-[300px]">
        <div className="relative aspect-video overflow-hidden rounded-[14px] bg-umber shadow-[0_40px_100px_rgba(36,28,22,0.35)] md:rounded-[18px]">
          <video
            ref={videoRef}
            src={`${VIDEO_BASE}/explainer-v5.mp4`}
            controls={playing}
            playsInline
            preload="none"
            onPause={(e) => e.currentTarget.ended && setPlaying(false)}
            className="absolute inset-0 h-full w-full bg-black object-contain"
          />
          {!playing && (
            <button
              type="button"
              onClick={play}
              aria-label="Play the video: what is Iloomi? 1 minute 41 seconds, with sound"
              className="group absolute inset-0 block text-left"
            >
              <Image
                src={POSTER}
                alt=""
                fill
                priority
                sizes="(min-width: 1008px) 912px, 100vw"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,16,12,0.7)_0%,rgba(20,16,12,0)_45%)]" />
              <span className="absolute top-1/2 left-1/2 inline-flex min-h-[56px] -translate-x-1/2 -translate-y-1/2 items-center gap-3.5 rounded-full bg-umber p-1.5 pr-5.5 font-semibold text-off-white shadow-[0_18px_50px_rgba(36,28,22,0.35)] transition-transform group-hover:scale-[1.03] sm:min-h-[68px] sm:text-lg">
                <WatchPillBody />
              </span>
              <span className="absolute bottom-5 left-7 hidden text-off-white sm:block">
                <span className="block text-[13px] font-bold uppercase tracking-[0.14em] text-sand">
                  What is Iloomi?
                </span>
                <span className="mt-1 block font-serif text-[26px]">A storyteller in your pocket.</span>
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Sits left of the scroll-to-top button. */}
      <div
        className={`fixed right-[84px] bottom-6 left-4 z-40 flex items-center gap-1 rounded-full bg-umber p-1.5 shadow-[0_18px_50px_rgba(36,28,22,0.4)] transition-all duration-300 sm:left-auto sm:right-[96px] sm:bottom-8 ${
          showPill ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-hidden={!showPill}
      >
        <button
          type="button"
          onClick={playFromPill}
          tabIndex={showPill ? 0 : -1}
          className="flex min-h-[44px] flex-1 items-center gap-3 rounded-full pr-2 text-[15px] font-semibold text-off-white sm:min-h-[56px] sm:gap-3.5 sm:pr-5 sm:text-base"
        >
          <WatchPillBody />
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          tabIndex={showPill ? 0 : -1}
          aria-label="Hide the video button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-off-white/12 text-off-white transition-colors hover:bg-off-white/20"
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </>
  );
}
