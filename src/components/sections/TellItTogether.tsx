import Link from 'next/link';
import { WatchPlayer } from '@/components/ui/WatchPlayer';
import { getWatchVideo } from '@/lib/watch';

/** Inviting family into a story, the one 2.0 feature the talk/Circle/write loops don't show. */
export function TellItTogether() {
  const video = getWatchVideo('family')!;

  return (
    <section id="together" className="px-6 pt-8 pb-26">
      <div className="mx-auto grid max-w-[1080px] items-center gap-12 md:grid-cols-[1fr_minmax(0,360px)] md:gap-16">
        <div>
          <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-marine-teal">
            {video.kicker}
          </p>
          <h2 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
            {video.title}
            <br />
            <em className="font-normal text-dark-green">{video.titleEm}</em>
          </h2>
          <p className="mt-5.5 max-w-[560px] text-lg leading-relaxed text-muted">{video.summary}</p>

          <dl className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {video.points.map((point) => (
              <div key={point.title}>
                <dt className="mb-1 text-[17px] font-semibold text-ink">{point.title}</dt>
                <dd className="text-base leading-relaxed text-muted">{point.body}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-9 text-[15px] text-muted">
            See how{' '}
            <Link href="/watch/circle" className="font-medium text-dark-green underline underline-offset-4 hover:text-purple">
              your Circle
            </Link>{' '}
            and{' '}
            <Link href="/watch/voice" className="font-medium text-dark-green underline underline-offset-4 hover:text-purple">
              talking with Iloomi
            </Link>{' '}
            work, too.
          </p>
        </div>

        <WatchPlayer video={video} />
      </div>
    </section>
  );
}
