'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { VIDEO_BASE } from '@/lib/media';

const features = [
  {
    kicker: 'YOU TALK',
    title: 'Speak naturally. Or type.',
    body: 'No blank page and no prompts to fill in. Iloomi listens, then asks the question a good friend would.',
    name: 'feature-talk',
    video: 'feature-talk-v1.mp4',
    alt: 'Video: Walt talks with Iloomi about the night Karen was born',
  },
  {
    kicker: 'IT LEARNS',
    title: 'It remembers who was there.',
    body: 'People you mention join your Circle. Places, things and pets are offered for you to keep. Next time, Iloomi picks up the thread.',
    name: 'feature-circle',
    video: 'feature-circle-v1.mp4',
    alt: 'Video: Lyle and Margaret join Walt’s Circle as he talks',
  },
  {
    kicker: 'IT WRITES',
    title: 'Your story, in your words.',
    body: 'When you’re done, Iloomi writes it up the way you told it, with your photos. You can listen to it read aloud.',
    name: 'feature-writes',
    video: 'feature-writes-v1.mp4',
    alt: 'Video: Iloomi writes The Night Karen Arrived',
  },
];

/** The round badge in the middle of a card: play, or unmute on the muted loop. */
function CenterBadge({ icon }: { icon: 'play' | 'unmute' }) {
  return (
    <span className="absolute top-1/2 left-1/2 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-off-white/92">
      {icon === 'play' ? (
        <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="#0D4D40">
          <path d="M8 5.5v13l10.5-6.5z" />
        </svg>
      ) : (
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0D4D40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5 6 9H3v6h3l5 4z" fill="#0D4D40" />
          <path d="m16 9 5 6M21 9l-5 6" />
        </svg>
      )}
    </span>
  );
}

/**
 * Three product videos, cropped to fill their cards. The live card loops muted
 * while the section is on screen, with an unmute button where the others show
 * play. Tapping any card opens its video uncropped in a modal, with sound, and
 * that card becomes the live one. With reduced motion nothing loops.
 */
export function FeatureLoops() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Loop the live card while the section is on screen and the modal is closed.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React doesn't apply the muted attribute, and browsers only autoplay muted video.
    video.muted = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (inView && !modalOpen && !reducedMotion) video.play().catch(() => {});
    else video.pause();
  }, [active, inView, modalOpen]);

  // A modal dialog doesn't stop the page behind it from scrolling.
  useEffect(() => {
    if (!modalOpen) return;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = '';
    };
  }, [modalOpen]);

  const open = (index: number) => {
    const dialog = dialogRef.current;
    const video = modalVideoRef.current;
    if (!dialog || !video) return;
    const feature = features[index];
    setActive(index);
    setModalOpen(true);
    // Start playback inside the tap itself, so the browser allows sound.
    video.src = `${VIDEO_BASE}/${feature.video}`;
    video.poster = `/videos/${feature.name}-poster.jpg`;
    video.setAttribute('aria-label', feature.alt);
    video.muted = false;
    dialog.showModal();
    video.play().catch(() => {});
  };

  const onModalClose = () => {
    modalVideoRef.current?.pause();
    setModalOpen(false);
  };

  return (
    <section ref={sectionRef} id="how-it-works" className="px-6 pt-8 pb-26">
      <div className="mx-auto max-w-[1180px]">
        <h2 className="mb-3 font-serif text-4xl leading-[1.1] text-ink md:text-5xl">
          Three things happen while you talk
        </h2>
        <p className="mb-10 max-w-[640px] text-lg text-muted">
          You don’t need to be a writer, or even a typist.
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {features.map((feature, index) => {
            const isActive = index === active;
            return (
              <figure key={feature.name} className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => open(index)}
                  aria-label={`${isActive ? 'Unmute' : 'Play'}: ${feature.title}`}
                  aria-haspopup="dialog"
                  className={`relative h-[520px] overflow-hidden rounded-[22px] bg-[#12101f] transition-shadow duration-300 ${
                    isActive ? 'shadow-[0_30px_70px_rgba(13,77,64,0.28)]' : ''
                  }`}
                >
                  {isActive ? (
                    <>
                      <video
                        ref={videoRef}
                        src={`${VIDEO_BASE}/${feature.video}`}
                        poster={`/videos/${feature.name}-poster.jpg`}
                        aria-hidden="true"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="block h-full w-full object-cover object-[50%_40%]"
                      />
                      <CenterBadge icon="unmute" />
                    </>
                  ) : (
                    <>
                      <Image
                        src={`/videos/${feature.name}-poster.jpg`}
                        alt=""
                        fill
                        sizes="(min-width: 1228px) 377px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-[50%_40%] opacity-45 saturate-[0.6]"
                      />
                      <CenterBadge icon="play" />
                    </>
                  )}
                </button>
                <figcaption className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-55'}`}>
                  <p className="mb-1.5 text-xs font-bold tracking-[0.14em] text-marine-teal">{feature.kicker}</p>
                  <p className="mb-1.5 text-[21px] font-semibold text-ink">{feature.title}</p>
                  <p className="text-base leading-relaxed text-muted">{feature.body}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Escape and the close button close it natively; so does a tap on the backdrop. */}
      <dialog
        ref={dialogRef}
        onClose={onModalClose}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        aria-label="Video"
        className="m-auto overflow-visible bg-transparent p-0 backdrop:bg-black/85"
      >
        <video
          ref={modalVideoRef}
          controls
          playsInline
          className="block aspect-[9/16] h-[min(88dvh,calc(88vw*16/9))] rounded-[18px] bg-black"
        />
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close video"
          className="fixed top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-off-white/92 text-dark-green transition-colors hover:bg-off-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </dialog>
    </section>
  );
}
