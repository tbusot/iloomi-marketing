import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { WatchPlayer } from '@/components/ui/WatchPlayer';
import { getWatchVideo, watchVideos } from '@/lib/watch';

const SITE_URL = 'https://www.iloomi.com';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return watchVideos.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = getWatchVideo(slug);
  if (!video) return {};
  const title = `${video.title} ${video.titleEm} | Iloomi`;
  return {
    title,
    description: video.summary,
    openGraph: {
      title,
      description: video.summary,
      type: 'video.other',
      url: `${SITE_URL}/watch/${video.slug}`,
      images: [{ url: `${SITE_URL}${video.poster}`, width: 720, height: 1280 }],
    },
    twitter: { card: 'summary_large_image', title, description: video.summary },
  };
}

export default async function WatchPage({ params }: PageProps) {
  const { slug } = await params;
  const video = getWatchVideo(slug);
  if (!video) notFound();
  const others = watchVideos.filter((other) => other.slug !== video.slug);

  return (
    <>
      <section className="px-6 pt-28 pb-24 md:pt-30">
        <div className="mx-auto grid max-w-[1080px] items-center gap-12 md:grid-cols-[minmax(0,400px)_1fr] md:gap-16">
          <WatchPlayer video={video} priority />

          <div>
            <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-marine-teal">
              {video.kicker}
            </p>
            <h1 className="font-serif text-4xl leading-[1.05] text-ink md:text-[56px]">
              {video.title}
              <br />
              <em className="font-normal text-dark-green">{video.titleEm}</em>
            </h1>
            <p className="mt-5.5 max-w-[560px] text-lg leading-relaxed text-muted">{video.summary}</p>

            <dl className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {video.points.map((point) => (
                <div key={point.title}>
                  <dt className="mb-1 text-[17px] font-semibold text-ink">{point.title}</dt>
                  <dd className="text-base leading-relaxed text-muted">{point.body}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <StoreBadges />
              <p className="mt-4 text-[15px] text-muted">
                Your first two stories are free.{' '}
                <Link href="/#pricing" className="font-medium text-dark-green underline underline-offset-4 hover:text-purple">
                  See pricing
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-[1080px] border-t border-[#ddd6cb] pt-12">
          <h2 className="mb-7 font-serif text-3xl text-ink">More to watch</h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={`/watch/${other.slug}`} className="group flex items-center gap-5">
                  <span className="relative block aspect-[9/16] w-24 shrink-0 overflow-hidden rounded-xl bg-[#12101f]">
                    <Image src={other.poster} alt="" fill sizes="96px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-marine-teal">
                      {other.kicker} · {other.duration}
                    </span>
                    <span className="mt-1.5 block font-serif text-2xl leading-tight text-ink group-hover:text-dark-green">
                      {other.title} <em>{other.titleEm}</em>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
